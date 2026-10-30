import { Home, Store, MessageCircle } from "lucide-react";
import { SectionHeading } from "./Brand";
import { PROJECT_FACTS, whatsappLink } from "@/lib/site";

// Valores e condições de pagamento não são publicados no site:
// são informados pela equipe no atendimento (WhatsApp ou formulário).
const lots = [
  {
    id: "residencial",
    icon: Home,
    title: "Lote residencial",
    size: PROJECT_FACTS.residentialSize,
    count: PROJECT_FACTS.residentialLots,
    text: "Espaço para construir sua casa e viver com mais tranquilidade.",
    cta: "Consultar lote residencial",
    message:
      "Olá! Tenho interesse em um Lote Residencial de 200m² no Parque das Flores (Sacramento-MG). Gostaria de receber valores e condições.",
  },
  {
    id: "comercial",
    icon: Store,
    title: "Lote comercial",
    size: PROJECT_FACTS.commercialSize,
    count: PROJECT_FACTS.commercialLots,
    text: "Espaço para investir, empreender e crescer em uma região com potencial de valorização.",
    cta: "Consultar lote comercial",
    message:
      "Olá! Tenho interesse em um Lote Comercial de 600m² no Parque das Flores (Sacramento-MG). Gostaria de receber valores e condições.",
  },
] as const;

export function Lotes() {
  return (
    <section id="lotes" aria-labelledby="lotes-title" className="section-y bg-cream">
      <div className="container-site">
        <SectionHeading
          id="lotes-title"
          kicker="Residenciais e comerciais"
          title="Escolha o lote ideal para você"
        >
          <p>
            Lotes residenciais e comerciais em Sacramento-MG. Valores e condições são informados
            pela nossa equipe no atendimento.
          </p>
        </SectionHeading>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
          {lots.map((lot) => (
            <article
              key={lot.id}
              aria-labelledby={`lote-${lot.id}`}
              className="flex flex-col bg-card p-6 sm:p-10"
            >
              <div className="flex items-center gap-3 text-leaf">
                <lot.icon className="size-6" strokeWidth={1.6} aria-hidden />
                <h3
                  id={`lote-${lot.id}`}
                  className="font-sans text-base font-semibold tracking-normal text-primary"
                >
                  {lot.title} · {lot.count} unidades
                </h3>
              </div>
              <p className="mt-5 font-display text-6xl font-semibold leading-none text-primary sm:text-7xl">
                {lot.size}
              </p>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
                {lot.text}
              </p>

              <a
                href={whatsappLink(lot.message)}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={`lotes_${lot.id}_whatsapp`}
                className="btn-base btn-primary mt-8 w-full sm:mt-auto sm:w-auto sm:self-start"
              >
                <MessageCircle className="size-5" aria-hidden /> {lot.cta}
              </a>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 rounded-xl bg-forest-deep p-6 text-cream sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <h3 className="font-display text-2xl text-cream sm:text-3xl">
              Receba a tabela de valores e condições
            </h3>
            <p className="mt-3 max-w-xl text-base text-cream/80">
              Nossa equipe envia a tabela atualizada e tira suas dúvidas sobre os lotes disponíveis.
            </p>
          </div>
          <a
            href={whatsappLink(
              "Olá! Gostaria de receber a tabela atualizada de valores e condições dos lotes do Parque das Flores.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="lotes_tabela_whatsapp"
            className="btn-base btn-gold"
          >
            Solicitar tabela atualizada
          </a>
        </div>
      </div>
    </section>
  );
}
