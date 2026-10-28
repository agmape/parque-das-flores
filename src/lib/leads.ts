// Envio de leads do formulário.
//
// Destino principal: Formspree (mesmo formulário "mbgjjlle" já usado no site).
// Destino opcional: webhook/CRM configurado por variável de ambiente no servidor
// (ver src/lib/leads.functions.ts). Para trocar o destino principal, altere
// apenas submitLead().
import { readAttribution } from "./tracking/attribution";
import { forwardLead, type LeadPayload } from "./leads.functions";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbgjjlle";

export type LeadInput = Pick<LeadPayload, "nome" | "telefone" | "email" | "perfil">;

export class LeadSubmitError extends Error {}

export async function submitLead(input: LeadInput, formName: string) {
  const attribution = Object.fromEntries(
    Object.entries(readAttribution()).filter(
      ([, value]) => typeof value === "string" && value !== "",
    ),
  ) as Record<string, string>;

  const body = {
    ...input,
    form_name: formName,
    page_location: window.location.href,
    ...Object.fromEntries(
      Object.entries(attribution).map(([key, value]) => [`origem_${key}`, value]),
    ),
  };

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let message = "Não foi possível enviar agora.";
    try {
      const data = (await response.json()) as { errors?: { message?: string }[] };
      message = data.errors?.[0]?.message || message;
    } catch {
      // resposta sem JSON
    }
    throw new LeadSubmitError(message);
  }

  // Encaminhamento opcional ao CRM: não bloqueia nem quebra o envio principal.
  void forwardLead({
    data: { ...input, form_name: formName, page_location: window.location.href, attribution },
  }).catch(() => undefined);
}
