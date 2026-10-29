import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Envio de leads pelo SERVIDOR (função serverless na Vercel).
//
// O navegador nunca fala direto com o serviço de e-mail. O servidor valida os
// dados, envia, registra o resultado nos logs da Vercel (sem dados pessoais) e só
// devolve sucesso quando o serviço confirma o recebimento.
//
// Serviço usado, em ordem:
// 1. Resend — se RESEND_API_KEY, LEAD_EMAIL_TO e LEAD_EMAIL_FROM estiverem definidas.
// 2. Formspree — caso contrário (formulário FORMSPREE_FORM_ID, padrão "mbgjjlle",
//    o mesmo que o site já usava). O e-mail de destino do Formspree é configurado
//    no painel do Formspree, não aqui.
// Opcional: LEAD_WEBHOOK_URL (+ LEAD_WEBHOOK_SECRET) recebe uma cópia do lead (CRM).

export const leadSchema = z.object({
  nome: z.string().trim().min(2).max(100),
  telefone: z
    .string()
    .trim()
    .max(20)
    .regex(/^[+\d\s().-]+$/)
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 13;
    }),
  email: z.string().trim().email().max(120),
  perfil: z.enum(["Comprador", "Corretor"]),
  form_name: z.string().max(60),
  page_location: z.string().max(500),
  attribution: z.record(z.string().max(500)).optional(),
});

export type LeadPayload = z.infer<typeof leadSchema>;

export type LeadResult =
  | { ok: true; ref: string; provider: "resend" | "formspree" }
  | { ok: false; ref: string; message: string };

const DEFAULT_FORMSPREE_FORM_ID = "mbgjjlle";

function env(name: string) {
  return process.env[name]?.trim() || "";
}

function newRef() {
  return `L${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

/** Log estruturado sem dados pessoais (aparece em Vercel → Logs). */
function log(level: "info" | "error", entry: Record<string, unknown>) {
  const line = JSON.stringify({ scope: "lead", ...entry });
  if (level === "error") console.error(line);
  else console.info(line);
}

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char);
}

function leadRows(data: LeadPayload) {
  return [
    ["Nome", data.nome],
    ["Telefone / WhatsApp", data.telefone],
    ["E-mail", data.email],
    ["Perfil", data.perfil],
    ["Formulário", data.form_name],
    ["Página", data.page_location],
    ...Object.entries(data.attribution ?? {}).map(([key, value]) => [`Origem: ${key}`, value]),
  ] as const;
}

async function sendWithResend(data: LeadPayload, ref: string) {
  const rows = leadRows(data);
  const html = `<h2>Novo contato pelo site Parque das Flores</h2><table cellpadding="6">${rows
    .map(
      ([label, value]) =>
        `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(String(value))}</td></tr>`,
    )
    .join("")}</table><p style="color:#666">Referência: ${ref}</p>`;
  const text = `${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nReferência: ${ref}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env("RESEND_API_KEY")}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env("LEAD_EMAIL_FROM"),
      to: env("LEAD_EMAIL_TO")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      reply_to: data.email,
      subject: `Novo lead — Parque das Flores (${data.perfil}) · ${ref}`,
      html,
      text,
    }),
    signal: AbortSignal.timeout(10000),
  });
  const body = (await response.json().catch(() => ({}))) as {
    id?: string;
    message?: string;
    name?: string;
  };
  return {
    ok: response.ok && Boolean(body.id),
    status: response.status,
    id: body.id,
    error: body.name || body.message,
  };
}

async function sendWithFormspree(data: LeadPayload, ref: string) {
  const formId = env("FORMSPREE_FORM_ID") || DEFAULT_FORMSPREE_FORM_ID;
  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      referer: data.page_location,
    },
    body: JSON.stringify({
      nome: data.nome,
      telefone: data.telefone,
      email: data.email,
      perfil: data.perfil,
      form_name: data.form_name,
      page_location: data.page_location,
      referencia: ref,
      _subject: `Novo lead — Parque das Flores (${data.perfil}) · ${ref}`,
      _replyto: data.email,
      ...Object.fromEntries(
        Object.entries(data.attribution ?? {}).map(([key, value]) => [`origem_${key}`, value]),
      ),
    }),
    signal: AbortSignal.timeout(10000),
  });
  const body = (await response.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
    errors?: { message?: string; code?: string }[];
  };
  return {
    ok: response.ok && body.ok === true,
    status: response.status,
    id: formId,
    error:
      body.error || body.errors?.map((item) => item.code || item.message).join(",") || undefined,
  };
}

async function forwardToWebhook(data: LeadPayload, ref: string) {
  const url = env("LEAD_WEBHOOK_URL");
  if (!url) return;
  const secret = env("LEAD_WEBHOOK_SECRET");
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(secret ? { "x-webhook-secret": secret } : {}),
      },
      body: JSON.stringify({
        ...data,
        ref,
        source: "parquedasflores-site",
        received_at: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8000),
    });
    log(response.ok ? "info" : "error", { step: "webhook", ref, status: response.status });
  } catch (error) {
    log("error", { step: "webhook", ref, error: error instanceof Error ? error.name : "unknown" });
  }
}

export const submitLeadServer = createServerFn({ method: "POST" })
  .validator(leadSchema)
  .handler(async ({ data }): Promise<LeadResult> => {
    const ref = newRef();
    const started = Date.now();
    const useResend = Boolean(
      env("RESEND_API_KEY") && env("LEAD_EMAIL_TO") && env("LEAD_EMAIL_FROM"),
    );
    const provider = useResend ? "resend" : "formspree";
    const emailDomain = data.email.split("@")[1] ?? "";

    try {
      const result = useResend
        ? await sendWithResend(data, ref)
        : await sendWithFormspree(data, ref);
      log(result.ok ? "info" : "error", {
        step: "send",
        ref,
        provider,
        ok: result.ok,
        status: result.status,
        id: result.id,
        error: result.error,
        ms: Date.now() - started,
        form: data.form_name,
        perfil: data.perfil,
        emailDomain,
      });
      if (!result.ok) {
        return {
          ok: false,
          ref,
          message: "O serviço de e-mail recusou o envio.",
        };
      }
      await forwardToWebhook(data, ref);
      return { ok: true, ref, provider };
    } catch (error) {
      log("error", {
        step: "send",
        ref,
        provider,
        ok: false,
        error: error instanceof Error ? error.name : "unknown",
        ms: Date.now() - started,
      });
      return { ok: false, ref, message: "O serviço de e-mail não respondeu a tempo." };
    }
  });
