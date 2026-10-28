import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "./Brand";
import { whatsappLink } from "@/lib/site";

const links = [
  { href: "#o-parque", label: "O Parque" },
  { href: "#lotes", label: "Lotes e valores" },
  { href: "#galeria", label: "Fotos e vídeos" },
  { href: "#localizacao", label: "Localização" },
  { href: "#contato", label: "Contato" },
];

const WHATSAPP_MESSAGE =
  "Olá! Vi o site do Parque das Flores em Sacramento-MG e quero falar com um consultor.";

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid || open
          ? "bg-forest-deep/95 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-4">
        <a
          href="#inicio"
          aria-label="Parque das Flores — voltar ao início"
          className="block w-[150px] shrink-0 sm:w-[180px]"
        >
          <Logo variant="creme" priority className="w-full" />
        </a>

        <nav aria-label="Seções do site" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.95rem] font-medium text-cream/85 transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappLink(WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="header_whatsapp"
            className="btn-base btn-whatsapp !min-h-11 !px-5 text-sm"
          >
            <MessageCircle className="size-4" aria-hidden /> Falar com consultor
          </a>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((value) => !value)}
          className="grid size-11 place-items-center rounded-full text-cream lg:hidden"
        >
          {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </button>
      </div>

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Menu"
          className="border-t border-cream/10 bg-forest-deep lg:hidden"
        >
          <div className="container-site flex flex-col py-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-cream/10 py-4 text-base text-cream/90"
              >
                {link.label}
              </a>
            ))}
            <a
              href={whatsappLink(WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="menu_whatsapp"
              onClick={() => setOpen(false)}
              className="btn-base btn-whatsapp my-4"
            >
              <MessageCircle className="size-5" aria-hidden /> Falar com consultor
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
