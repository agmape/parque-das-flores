import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Encaminhamento opcional de leads para um CRM / webhook.
//
// Só faz algo se LEAD_WEBHOOK_URL estiver definida nas variáveis de ambiente da
// Vercel. A URL e o segredo ficam no servidor e nunca chegam ao navegador.
// Nenhum endpoint é presumido: sem a variável, a função apenas retorna.

const leadSchema = z.object({
  nome: z.string().trim().min(2).max(100),
  telefone: z.string().trim().max(20),
  email: z.string().trim().email().max(120),
  perfil: z.enum(["Comprador", "Corretor"]),
  form_name: z.string().max(60),
  page_location: z.string().max(500),
  attribution: z.record(z.string().max(500)).optional(),
});

export type LeadPayload = z.infer<typeof leadSchema>;

export const forwardLead = createServerFn({ method: "POST" })
  .inputValidator(leadSchema)
  .handler(async ({ data }) => {
    const url = process.env["LEAD_WEBHOOK_URL"]?.trim();
    if (!url) return { forwarded: false as const };
    const secret = process.env["LEAD_WEBHOOK_SECRET"]?.trim();
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(secret ? { "x-webhook-secret": secret } : {}),
        },
        body: JSON.stringify({
          ...data,
          source: "parquedasflores-site",
          received_at: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(8000),
      });
      return { forwarded: response.ok };
    } catch (error) {
      console.error("Falha ao encaminhar lead para o webhook", error);
      return { forwarded: false as const };
    }
  });
