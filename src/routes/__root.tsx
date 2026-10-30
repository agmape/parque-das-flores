import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { GTM_ID } from "../lib/tracking/config";
import { consentBootstrapScript, gtmScript } from "../lib/tracking/consent";
import { SITE_NAME, whatsappLink } from "../lib/site";
import { TrackingListener } from "../components/site/TrackingListener";
import { CookieConsent } from "../components/site/CookieConsent";

function NotFoundComponent() {
  return (
    <main className="flex min-h-screen items-center bg-forest-deep px-5 text-cream">
      <div className="mx-auto max-w-lg">
        <p className="text-sm font-semibold text-gold-soft">Erro 404</p>
        <h1 className="mt-3 font-display text-5xl text-cream sm:text-6xl">
          Esta página não existe
        </h1>
        <p className="mt-4 text-lg text-cream/80">
          O endereço pode ter mudado. Volte para a página inicial do Parque das Flores ou fale com
          nossa equipe.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/" className="btn-base btn-gold">
            Ir para a página inicial
          </a>
          <a
            href={whatsappLink(
              "Olá! Vim do site do Parque das Flores e quero falar com um consultor.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="404_whatsapp"
            className="btn-base btn-outline-light"
          >
            Falar pelo WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-primary">A página não carregou</h1>
        <p className="mt-3 text-muted-foreground">
          Houve uma falha ao abrir esta página. Tente carregar de novo ou volte para o início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-base btn-primary"
          >
            Carregar de novo
          </button>
          <a href="/" className="btn-base btn-outline">
            Ir para o início
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Ordem importa: o Consent Mode (padrão "negado") precisa vir antes do GTM.
    scripts: [
      { children: consentBootstrapScript() },
      ...(GTM_ID ? [{ children: gtmScript(GTM_ID) }] : []),
      // Vercel Web Analytics (sem cookies, sem dados pessoais). Instalação oficial
      // por script, servida pela própria Vercel em /_vercel/insights.
      {
        children:
          "window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};",
      },
      { src: "/_vercel/insights/script.js", defer: true },
    ],
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#14291f" },
      // Verificação do Google Search Console já existente no site original.
      { name: "google-site-verification", content: "google83a0145380294087" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "pt_BR" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Manrope:wght@400;500;600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <TrackingListener />
      <Outlet />
      <CookieConsent />
    </QueryClientProvider>
  );
}
