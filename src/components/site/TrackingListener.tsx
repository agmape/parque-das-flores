import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { captureAttribution } from "@/lib/tracking/attribution";
import { safeLinkUrl, track } from "@/lib/tracking/datalayer";

/**
 * - Guarda os parâmetros de campanha (UTM, gclid, gbraid, wbraid) da visita.
 * - Envia page_view a cada mudança de rota.
 * - Escuta cliques em todo o site e envia cta_click, click_whatsapp e click_phone.
 *   Para nomear um botão, use o atributo data-cta="nome_do_cta".
 */
export function TrackingListener() {
  const location = useLocation();

  useEffect(() => {
    captureAttribution();
  }, []);

  useEffect(() => {
    track("page_view");
  }, [location.pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const element = target?.closest<HTMLAnchorElement | HTMLButtonElement>("a, button");
      if (!element) return;
      const ctaName = element.getAttribute("data-cta") || undefined;
      const href = element instanceof HTMLAnchorElement ? element.getAttribute("href") || "" : "";

      if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)/i.test(href)) {
        track("click_whatsapp", {
          cta_name: ctaName ?? "whatsapp",
          contact_method: "whatsapp",
          link_url: safeLinkUrl(href),
        });
        return;
      }
      if (href.startsWith("tel:")) {
        track("click_phone", { cta_name: ctaName ?? "telefone", contact_method: "phone" });
        return;
      }
      if (ctaName) {
        track("cta_click", {
          cta_name: ctaName,
          ...(href.startsWith("mailto:") ? { contact_method: "email" as const } : {}),
          ...(href ? { link_url: safeLinkUrl(href) } : {}),
        });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
