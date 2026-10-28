import { Home, Store, MessageCircle, Info } from "lucide-react";
import { SectionHeading } from "./Brand";
import {
  COMMERCIAL_MAX_PRICE,
  COMMERCIAL_PRICE,
  COMMERCIAL_PRICE_PER_SQM,
  DOWN_PAYMENT,
  MAX_RESIDENTIAL_INSTALLMENTS,
  PRICE,
  PROJECT_FACTS,
  RESIDENTIAL_IPCA_SHORT_NOTICE,
  RESIDENTIAL_PLANS,
  brl,
  residentialInstallmentNotice,
  whatsappLink,
} from "@/lib/site";

const lots = [
  {
    id: "residencial",
    icon: Home,
    title: "Lote residencial",
    size: PROJECT_FACTS.residentialSize,
    count: PROJECT_FACTS.residentialLots,
    text: "Espaço para construir sua casa e viver com mais tranquilidade.",
    price: PRICE,
    priceNote: "Lotes de esquina ou pré-esquina possuem valores superiores ao inicial.",
    payment: `${residentialInstallmentNotice(RESIDENTIAL_PLANS.at(-1)?.installment ?? 0)} Opção de ${MAX_RESIDENTIAL_INSTALLMENTS} meses.`,
    cta: "Garantir lote residencial",
    message:
      "Olá! Tenho interesse em garantir um Lote Residencial de 200m² no Parque das Flores (Sacramento-MG). Gostaria de saber mais sobre as parcelas iniciais com reajuste anual pelo IPCA, conforme contrato.",
  },
  {
    id: "comercial",
    icon: Store,
    title: "Lote comercial",
    size: PROJECT_FACTS.commercialSize,
    count: PROJECT_FACTS.commercialLots,
    text: "Espaço para investir, empreender e crescer em uma região com potencial de valorização.",
    price: COMMERCIAL_PRICE,
    priceNote: `Equivalente a R$ ${COMMERCIAL_PRICE_PER_SQM.toLocaleString("pt-BR")}/m². Valores de esquina/pré-esquina podem chegar a ${brl(COMMERCIAL_MAX_PRICE)}.`,
    payment: undefined,
    cta: "Garantir lote comercial",
    message:
      "Olá! Tenho interesse em garantir um Lote Comercial de 600m² no Parque das Flores (Sacramento-MG).",
  },
] as const;

const launchConditions = [
  `Entrada a partir de ${brl(DOWN_PAYMENT)}`,
  `Parcelas iniciais em até ${MAX_RESIDENTIAL_INSTALLMENTS} meses`,
  "Reajuste anual pelo IPCA, conforme contrato",
  `Lotes a partir de ${brl(PRICE)}`,
];

export function Lotes() {
  return (
    <section id="lotes" aria-labelledby="lotes-title" className="section-y bg-cream">
      <div className="container-site">
        <SectionHeading
          id="lotes-title"
          kicker="Valores e tamanhos"
          title="Escolha o lote ideal para você"
        >
          <p>
            Lotes residenciais e comerciais com condições especiais de lançamento, a partir de 90
            mil reais.
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

              <div className="mt-8 border-t border-border pt-6">
                <p className="text-sm text-muted-foreground">Preço inicial</p>
                <p className="mt-1 font-display text-4xl font-semibold text-terra">
                  {brl(lot.price)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {lot.priceNote}
                </p>
                {lot.payment && (
                  <p className="mt-3 text-sm font-medium leading-relaxed text-primary">
                    {lot.payment}
                  </p>
                )}
              </div>

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
              Condições especiais de lançamento
            </h3>
            <ul className="mt-4 grid gap-x-8 gap-y-2 text-base text-cream/85 sm:grid-cols-2">
              {launchConditions.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={whatsappLink(
              `Olá! Gostaria de receber a tabela atualizada de lotes residenciais do Parque das Flores, com parcelas iniciais ${RESIDENTIAL_IPCA_SHORT_NOTICE}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="lotes_tabela_whatsapp"
            className="btn-base btn-gold"
          >
            Solicitar tabela atualizada
          </a>
        </div>

        <p className="mt-6 flex gap-3 text-sm leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0 text-terra" aria-hidden />
          <span>
            <strong className="font-semibold text-foreground">Ajuste de preços:</strong> os valores
            atuais são exclusivos para os primeiros clientes. Ocorrerá um aumento da tabela no
            lançamento oficial. As parcelas residenciais divulgadas são iniciais,{" "}
            {RESIDENTIAL_IPCA_SHORT_NOTICE}.
          </span>
        </p>
      </div>
    </section>
  );
}
