import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { readConsent, saveConsent } from "@/lib/tracking/consent";

const OPEN_EVENT = "pdf:open-consent";

/** Reabre o painel de preferências (link no rodapé). */
export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Aviso de cookies com Google Consent Mode v2.
 * Nada além do essencial é liberado até o visitante escolher.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = readConsent();
    if (!stored) setVisible(true);
    else {
      setAnalytics(stored.analytics);
      setMarketing(stored.marketing);
    }
    const reopen = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setCustomizing(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  // Sobe o botão do WhatsApp enquanto o aviso estiver aberto.
  useIsoLayoutEffect(() => {
    const body = document.body;
    if (!visible) {
      body.removeAttribute("data-consent-open");
      return;
    }
    body.setAttribute("data-consent-open", "true");
    const update = () =>
      body.style.setProperty("--consent-h", `${(ref.current?.offsetHeight ?? 140) + 16}px`);
    update();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
    if (ref.current && observer) observer.observe(ref.current);
    return () => observer?.disconnect();
  }, [visible, customizing]);

  if (!visible) return null;

  const decide = (choice: { analytics: boolean; marketing: boolean }) => {
    saveConsent(choice);
    setVisible(false);
    setCustomizing(false);
  };

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-border bg-card text-foreground shadow-[0_-12px_40px_-20px_rgba(0,0,0,0.35)] sm:inset-x-auto sm:bottom-4 sm:left-4 sm:max-w-md sm:rounded-xl sm:border"
    >
      <div className="p-5">
        <p className="text-base font-semibold text-primary">Sua privacidade</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Usamos cookies para medir as visitas e, se você permitir, para mostrar anúncios do Parque
          das Flores. Você pode mudar sua escolha quando quiser em “Preferências de cookies”, no
          rodapé.
        </p>

        {customizing && (
          <fieldset className="mt-4 space-y-3">
            <legend className="sr-only">Escolha os tipos de cookies</legend>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" checked disabled className="mt-0.5 size-4" />
              <span>
                <span className="font-semibold text-primary">Essenciais</span>
                <span className="block text-muted-foreground">
                  Necessários para o site funcionar. Sempre ativos.
                </span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
                className="mt-0.5 size-4 accent-[var(--leaf)]"
              />
              <span>
                <span className="font-semibold text-primary">Medição</span>
                <span className="block text-muted-foreground">
                  Estatísticas de visitas (Google Analytics).
                </span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
                className="mt-0.5 size-4 accent-[var(--leaf)]"
              />
              <span>
                <span className="font-semibold text-primary">Marketing</span>
                <span className="block text-muted-foreground">
                  Anúncios e remarketing (Google Ads).
                </span>
              </span>
            </label>
          </fieldset>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {customizing ? (
            <button
              type="button"
              onClick={() => decide({ analytics, marketing })}
              className="btn-base btn-primary !min-h-11 flex-1 text-sm"
            >
              Salvar escolhas
            </button>
          ) : (
            <button
              type="button"
              onClick={() => decide({ analytics: true, marketing: true })}
              className="btn-base btn-primary !min-h-11 flex-1 text-sm"
            >
              Aceitar todos
            </button>
          )}
          <button
            type="button"
            onClick={() => decide({ analytics: false, marketing: false })}
            className="btn-base btn-outline !min-h-11 flex-1 text-sm"
          >
            Recusar opcionais
          </button>
          {!customizing && (
            <button
              type="button"
              onClick={() => setCustomizing(true)}
              className="min-h-11 w-full text-sm font-semibold text-primary underline underline-offset-4"
            >
              Personalizar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
