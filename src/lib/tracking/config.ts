// Ponto central de configuração de rastreamento.
//
// O site carrega APENAS o Google Tag Manager. GA4, Google Ads (tag do Google,
// Conversion Linker, conversões e remarketing) e qualquer outra ferramenta de
// marketing devem ser configurados DENTRO do contêiner do GTM, nunca como
// scripts soltos no código. Veja docs/TRACKING.md.
//
// GTM-PLJLPM8D é o contêiner já usado pelo site na Lovable (ver roadmap.md).
// Para trocar sem alterar código, defina VITE_GTM_ID nas variáveis da Vercel.
const DEFAULT_GTM_ID = "GTM-PLJLPM8D";

const fromEnv = import.meta.env.VITE_GTM_ID?.trim();

export const GTM_ID: string | null = /^GTM-[A-Z0-9]+$/i.test(fromEnv || DEFAULT_GTM_ID)
  ? (fromEnv || DEFAULT_GTM_ID).toUpperCase()
  : null;

/** Chave do localStorage onde a escolha de cookies do visitante é guardada. */
export const CONSENT_STORAGE_KEY = "pdf_consent_v1";

/** Chave do sessionStorage com os parâmetros de campanha (UTM, gclid…). */
export const ATTRIBUTION_STORAGE_KEY = "pdf_attribution_v1";
