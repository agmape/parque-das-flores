/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** ID público do Google Tag Manager (ex.: GTM-XXXXXXX). */
  readonly VITE_GTM_ID?: string;
  /** URL canônica do site, sem barra final. */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
