import { MessageCircle } from "lucide-react";
import { Logo } from "./Brand";
import { whatsappLink } from "@/lib/site";

export function Queiroz() {
  return (
    <section id="queiroz" aria-labelledby="queiroz-title" className="section-y bg-cream">
      <div className="container-site grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_260px] lg:gap-20">
        <div>
          <p className="kicker">Quem realiza</p>
          <h2
            id="queiroz-title"
            className="mt-2 font-display text-[2.25rem] text-primary sm:text-5xl"
          >
            50 anos construindo histórias
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            O Parque das Flores é um empreendimento realizado pela Queiroz Construtora e Loteadora,
            com a experiência de quem constrói há 50 anos.
          </p>
          <a
            href={whatsappLink("Olá! Quero falar com um consultor do Parque das Flores.")}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="queiroz_whatsapp"
            className="btn-base btn-primary mt-8"
          >
            <MessageCircle className="size-5" aria-hidden /> Falar com um consultor
          </a>
        </div>
        <Logo variant="queiroz" className="mx-auto w-52 md:w-full" />
      </div>
    </section>
  );
}
