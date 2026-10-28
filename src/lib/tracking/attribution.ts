// Preserva parâmetros de campanha (Google Ads, UTM) durante a visita para que
// possam acompanhar o lead até o CRM. Não altera nem remove nada da URL.
import { ATTRIBUTION_STORAGE_KEY } from "./config";

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type Attribution = Partial<Record<AttributionKey, string>> & {
  landing_page?: string;
  referrer?: string;
  captured_at?: string;
};

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(
      window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}",
    ) as Attribution;
  } catch {
    return {};
  }
}

/** Lê os parâmetros da URL atual e guarda os presentes (os mais recentes prevalecem). */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const found: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value.slice(0, 200);
  }
  const current = readAttribution();
  const isFirstVisit = !current.landing_page;
  if (!Object.keys(found).length && !isFirstVisit) return;
  const next: Attribution = {
    ...current,
    ...found,
    landing_page: current.landing_page || `${window.location.pathname}${window.location.search}`,
    referrer: current.referrer ?? (document.referrer || ""),
  };
  if (Object.keys(found).length) next.captured_at = new Date().toISOString();
  try {
    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // sessionStorage indisponível: segue sem atribuição.
  }
}
