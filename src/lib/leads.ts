// Envio de leads do formulário (lado do navegador).
//
// O navegador só chama a função do servidor (src/lib/leads.functions.ts), que
// envia o e-mail, registra o resultado nos logs da Vercel e devolve sucesso
// somente depois que o serviço de e-mail confirma o recebimento.
import { readAttribution } from "./tracking/attribution";
import { submitLeadServer, type LeadPayload, type LeadResult } from "./leads.functions";

export type LeadInput = Pick<LeadPayload, "nome" | "telefone" | "email" | "perfil">;

export class LeadSubmitError extends Error {
  constructor(
    message: string,
    readonly ref?: string,
  ) {
    super(message);
  }
}

export async function submitLead(input: LeadInput, formName: string) {
  const attribution = Object.fromEntries(
    Object.entries(readAttribution()).filter(
      ([, value]) => typeof value === "string" && value !== "",
    ),
  ) as Record<string, string>;

  let result: LeadResult;
  try {
    result = await submitLeadServer({
      data: { ...input, form_name: formName, page_location: window.location.href, attribution },
    });
  } catch {
    throw new LeadSubmitError("Não foi possível falar com o servidor.");
  }

  if (!result.ok) throw new LeadSubmitError(result.message, result.ref);
  return result;
}
