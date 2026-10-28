// Camada de eventos padronizada (window.dataLayer) para o Google Tag Manager.
//
// Regras:
// - Nunca envie dados pessoais (nome, telefone, e-mail, CPF etc.).
// - generate_lead só deve ser disparado após o envio do formulário dar certo.
// - Os nomes de evento seguem as recomendações do GA4.

export type TrackingEvent =
  | "page_view"
  | "cta_click"
  | "click_whatsapp"
  | "click_phone"
  | "form_start"
  | "generate_lead"
  | "map_click"
  | "gallery_view"
  | "video_play";

export type TrackingParams = {
  cta_name?: string;
  form_name?: string;
  contact_method?: "whatsapp" | "phone" | "email" | "form" | "map";
  content_name?: string;
  content_type?: string;
  link_url?: string;
};

type DataLayerWindow = Window & { dataLayer?: unknown[] };

const PII_KEYS = /nome|name|email|e-mail|telefone|phone|cpf|whats/i;

function sanitize(params: TrackingParams): Record<string, string> {
  const clean: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    const text = String(value).slice(0, 120);
    // Proteção extra: descarta valores com cara de e-mail ou telefone.
    const looksLikeEmail = /@/.test(text);
    const looksLikePhone = key !== "link_url" && /\d{8,}/.test(text.replace(/\D/g, ""));
    if (looksLikeEmail || looksLikePhone) continue;
    if (PII_KEYS.test(key) && key !== "contact_method") continue;
    clean[key] = text;
  }
  return clean;
}

export function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
}

export function track(event: TrackingEvent, params: TrackingParams = {}) {
  if (typeof window === "undefined") return;
  pushDataLayer({
    event,
    page_location: window.location.href,
    page_title: document.title,
    ...sanitize(params),
  });
}

/** Remove o número de telefone e a mensagem pré-preenchida de links do WhatsApp. */
export function safeLinkUrl(href: string): string {
  try {
    const url = new URL(href, window.location.href);
    if (/wa\.me|whatsapp\.com/i.test(url.hostname)) return "https://wa.me/";
    if (url.protocol === "tel:" || url.protocol === "mailto:") return `${url.protocol}`;
    return `${url.origin}${url.pathname}`;
  } catch {
    return "";
  }
}
