// Google Consent Mode v2.
//
// O padrão é "negado" para tudo que não é essencial. O estado só muda quando o
// visitante escolhe no banner de cookies. A escolha fica no localStorage do
// navegador dele e é reaplicada no carregamento (ver consentBootstrapScript).
import { CONSENT_STORAGE_KEY } from "./config";
import { pushDataLayer } from "./datalayer";

export type ConsentChoice = {
  v: 1;
  analytics: boolean;
  marketing: boolean;
  /** Data ISO da escolha. */
  at: string;
};

type ConsentState = "granted" | "denied";

// Mesmo formato do gtag() oficial: o GTM lê o objeto "arguments", não um array.
function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  pushDataLayer(arguments as unknown as Record<string, unknown>);
}

export function consentSignals(choice: Pick<ConsentChoice, "analytics" | "marketing">) {
  const a: ConsentState = choice.analytics ? "granted" : "denied";
  const m: ConsentState = choice.marketing ? "granted" : "denied";
  return {
    analytics_storage: a,
    ad_storage: m,
    ad_user_data: m,
    ad_personalization: m,
  };
}

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentChoice>;
    if (parsed.v !== 1) return null;
    return {
      v: 1,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      at: String(parsed.at ?? ""),
    };
  } catch {
    return null;
  }
}

/** Grava a escolha do visitante e atualiza o Consent Mode imediatamente. */
export function saveConsent(choice: Pick<ConsentChoice, "analytics" | "marketing">) {
  const value: ConsentChoice = { v: 1, ...choice, at: new Date().toISOString() };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Armazenamento bloqueado: a escolha vale só para esta visita.
  }
  gtag("consent", "update", consentSignals(choice));
  pushDataLayer({
    event: "consent_update",
    consent_analytics: choice.analytics,
    consent_marketing: choice.marketing,
  });
  window.dispatchEvent(new CustomEvent("pdf:consent", { detail: value }));
  return value;
}

/**
 * Script inline executado no <head> ANTES do GTM:
 * define o padrão "negado" e reaplica uma escolha já salva.
 */
export function consentBootstrapScript() {
  const key = JSON.stringify(CONSENT_STORAGE_KEY);
  return [
    "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}",
    "gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});",
    "gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);",
    `try{var c=JSON.parse(localStorage.getItem(${key})||'null');if(c&&c.v===1){var a=c.analytics?'granted':'denied',m=c.marketing?'granted':'denied';gtag('consent','update',{analytics_storage:a,ad_storage:m,ad_user_data:m,ad_personalization:m});}}catch(e){}`,
  ].join("");
}

export function gtmScript(gtmId: string) {
  return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});`;
}
