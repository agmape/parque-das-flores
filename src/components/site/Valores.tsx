import { Home, Store, AlertTriangle, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import {
  PRICE,
  RESIDENTIAL_PLANS,
  brl,
  residentialInstallmentNotice,
  whatsappLink,
} from "@/lib/site";

const COMMERCIAL_PRICE = 300000;
const COMMERCIAL_MAX_PRICE = 360000;
const COMMERCIAL_PRICE_PER_SQM = 500;

const lots = [
  {
    icon: Home,
    type: "Lote Residencial",
    size: "200 m²",
    price: PRICE,
    note: "Lotes de esquina ou pré-esquina possuem valores superiores ao inicial.",
    cta: "Garantir Lote Residencial",
    paymentNote: residentialInstallmentNotice(
      RESIDENTIAL_PLANS.at(-1)?.installment ?? 0,
    ),
    message: `Olá! Tenho interesse em garantir um Lote Residencial de 200m² no Parque das Flores (Sacramento-MG). Gostaria de saber mais sobre as parcelas iniciais com reajuste anual pelo IPCA, conforme contrato.`,
  },
  {
    icon: Store,
    type: "Lote Comercial",
    size: "600 m²",
    price: COMMERCIAL_PRICE,
    maxPrice: COMMERCIAL_MAX_PRICE,
    pricePerSqm: COMMERCIAL_PRICE_PER_SQM,
    paymentNote: undefined,
    note: `Equivalente a R$ ${COMMERCIAL_PRICE_PER_SQM.toLocaleString("pt-BR")}/m². Valores de esquina/pré-esquina podem chegar a ${brl(COMMERCIAL_MAX_PRICE)}.`,
    cta: "Garantir Lote Comercial",
    message: `Olá! Tenho interesse em garantir um Lote Comercial de 600m² no Parque das Flores (Sacramento-MG).`,
  },
];

export function Valores() {
  return (
    <section id="valores" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal className="text-center">
          <p className="eyebrow">Valores e tamanhos</p>
          <h2 className="rule-gold mx-auto mt-4 font-display text-4xl text-primary sm:text-5xl">
            Escolha o lote ideal para você
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground">
            Opções de lotes residenciais e comerciais com condições especiais de lançamento.
          </p>
          <p className="mt-8 font-display text-4xl font-semibold text-gold sm:text-5xl">
            A PARTIR DE 90 MIL REAIS
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {lots.map((lot, i) => (
            <Reveal key={lot.type} delay={i * 100}>
              <article className="card-premium h-full rounded-lg bg-card p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-forest/10">
                    <lot.icon className="size-7 text-forest" strokeWidth={1.5} />
                  </div>
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold">
                    {lot.size}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl text-primary">{lot.type}</h3>

                <div className="mt-4">
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Preço inicial
                  </p>
                  <p className="mt-1 font-display text-4xl text-gold">{brl(lot.price)}</p>
                  {lot.maxPrice && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      Até {brl(lot.maxPrice)} para esquina/pré-esquina
                    </p>
                  )}
                </div>

                <p className="mt-5 border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-muted-foreground">
                  {lot.note}
                </p>
                {lot.paymentNote && (
                  <p className="mt-4 text-sm font-medium leading-relaxed text-primary">
                    {lot.paymentNote} Opção de 240 meses.
                  </p>
                )}

                <a
                  href={whatsappLink(lot.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-base btn-forest mt-8 w-full"
                >
                  <MessageCircle className="size-4" /> {lot.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-8 flex items-start gap-4 rounded-xl border border-gold/30 bg-gold/10 p-5 sm:items-center sm:justify-center sm:text-center">
            <AlertTriangle className="size-6 shrink-0 text-gold sm:size-5" strokeWidth={1.8} />
            <p className="text-sm leading-relaxed text-foreground">
              <strong className="font-medium">Ajuste de Preços:</strong> Os valores atuais são
              exclusivos para os primeiros clientes. Ocorrerá um aumento da tabela no lançamento
              oficial.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
