import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Brand";
import { whatsappLink } from "@/lib/site";

const links = [
  { href: "#top", label: "Início" },
  { href: "#sobre", label: "O Parque" },
  { href: "#lotes", label: "Lotes" },
  { href: "#localizacao", label: "Localização" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-forest shadow-sm" : "bg-forest/85 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto grid grid-cols-[minmax(0,1fr)_auto] max-w-[90rem] items-center justify-between gap-4 px-5 py-3 lg:px-10">
        <a href="#top" aria-label="Parque das Flores — início" className="min-w-0 w-[170px] rounded-sm sm:w-[200px] lg:w-[220px]">
          <Logo className="h-auto w-full rounded-sm" />
        </a>

        <nav className="hidden min-w-0 items-center justify-end gap-4 min-[1200px]:flex min-[1440px]:gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap text-[0.68rem] uppercase leading-none tracking-[0.12em] text-cream/85 transition-colors hover:text-gold min-[1440px]:text-[0.72rem]"
            >
              {l.label}
            </a>
          ))}
          <a
            href={whatsappLink(
              "Olá! Vi o site do Parque das Flores em Sacramento-MG e quero falar com um consultor.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base btn-whatsapp shrink-0 whitespace-nowrap !px-5 !py-3 !text-[0.72rem] !leading-none"
          >
            <MessageCircle className="size-4 shrink-0" /> Falar com consultor
          </a>
        </nav>

        <Button variant="ghost" size="icon"
          type="button"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
          className="text-cream min-[1200px]:hidden"
        >
          {open ? <X className="size-7" /> : <Menu className="size-7" />}
        </Button>
      </div>

      {open && (
        <div id="menu-mobile" className="surface-forest border-t border-cream/10 min-[1200px]:hidden">
          <div className="flex flex-col px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-cream/10 py-3 text-sm uppercase tracking-[0.16em] text-cream/85"
              >
                {l.label}
              </a>
            ))}
            <a
              href={whatsappLink(
                "Olá! Vi o site do Parque das Flores em Sacramento-MG e quero falar com um consultor.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-base btn-whatsapp mt-4 !py-4 text-center"
            >
              <MessageCircle className="size-5" /> Falar com consultor
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
