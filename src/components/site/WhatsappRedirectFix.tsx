import { useEffect } from "react";

/**
 * Garante que qualquer clique em links do WhatsApp funcione, mesmo quando
 * pop-ups (target="_blank") são bloqueados — por exemplo dentro de iframes
 * de preview ou navegadores mobile mais restritivos.
 */
export function WhatsappRedirectFix() {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      if (!/^https?:\/\/(api\.whatsapp\.com|wa\.me)/i.test(href)) return;

      event.preventDefault();

      let opened: Window | null = null;
      try {
        opened = window.open(href, "_blank", "noopener,noreferrer");
      } catch {
        opened = null;
      }

      if (!opened || opened.closed) {
        try {
          if (window.top && window.top !== window.self) {
            window.top.location.href = href;
            return;
          }
        } catch {
          // cross-origin top: cai no fallback abaixo
        }
        window.location.href = href;
      }
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  return null;
}
