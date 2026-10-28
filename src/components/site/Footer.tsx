import { MessageCircle } from "lucide-react";
import { Logo } from "./Brand";
import { CONTACT_EMAIL, CONTACT_NAME, PHONE_TEL, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site";
import { openConsentPreferences } from "./CookieConsent";

const nav = [
  ["#o-parque", "O Parque"],
  ["#lotes", "Lotes e valores"],
  ["#galeria", "Fotos e vídeos"],
  ["#localizacao", "Localização"],
  ["#contato", "Contato"],
] as const;

export function Footer() {
  return (
    <footer className="on-dark bg-forest-deep pb-28 pt-16 text-cream/75 sm:pb-16">
      <div className="container-site">
        <div className="grid gap-12 border-b border-cream/10 pb-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div>
            <h2 className="font-display text-4xl text-cream sm:text-5xl">
              Seu futuro floresce aqui.
            </h2>
            <p className="mt-4 max-w-md text-base">
              Encontre o espaço para a sua próxima conquista em Sacramento-MG.
            </p>
            <a
              href={whatsappLink("Olá! Quero falar com um consultor do Parque das Flores.")}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="rodape_whatsapp"
              className="btn-base btn-whatsapp mt-8"
            >
              <MessageCircle className="size-5" aria-hidden /> Falar com um consultor
            </a>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <nav aria-label="Rodapé">
              <p className="text-sm font-semibold text-cream">Navegue</p>
              <ul className="mt-3 space-y-2 text-base">
                {nav.map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="hover:text-cream">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="text-sm font-semibold text-cream">Atendimento</p>
              <ul className="mt-3 space-y-2 text-base">
                <li>{CONTACT_NAME}</li>
                <li>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    data-cta="rodape_telefone"
                    className="hover:text-cream"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    data-cta="rodape_email"
                    className="break-all hover:text-cream"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 pt-10 sm:flex-row sm:items-end sm:justify-between">
          <Logo variant="creme" className="w-[200px]" />
          <button
            type="button"
            onClick={openConsentPreferences}
            className="self-start text-sm underline underline-offset-4 hover:text-cream sm:self-auto"
          >
            Preferências de cookies
          </button>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-cream/55">
          Imagens aéreas reais do local, feitas com drone. Imagens marcadas como ilustrativas são
          materiais de campanha. Valores e condições sujeitos a alteração sem aviso prévio. As
          parcelas residenciais divulgadas são iniciais, com reajuste anual pelo IPCA, conforme
          contrato. Este material não constitui promessa de rentabilidade.
        </p>
      </div>
    </footer>
  );
}
