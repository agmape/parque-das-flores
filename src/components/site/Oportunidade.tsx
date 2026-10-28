import { Check, TrendingUp, Home, Coins, Trees, Landmark } from "lucide-react";
import { Reveal } from "./Reveal";
import {
  brl,
  DOWN_PAYMENT,
  MAX_RESIDENTIAL_INSTALLMENTS,
  PRICE,
  RESIDENTIAL_IPCA_SHORT_NOTICE,
  whatsappLink,
} from "@/lib/site";

const faixa = [
  `Entrada a partir de ${brl(DOWN_PAYMENT)}`,
  `Parcelas iniciais em até ${MAX_RESIDENTIAL_INSTALLMENTS} meses`,
  `Reajuste anual pelo IPCA, conforme contrato`,
  `Lotes a partir de ${brl(PRICE)}`,
];

const urgencia = [
  {
    icon: TrendingUp,
    title: "Potencial de valorização",
    text: "Bairros em implantação tendem a acompanhar a evolução da infraestrutura da região.",
  },
  {
    icon: Home,
    title: "Casa própria",
    text: "Construa no seu tempo, com parcelas que cabem no orçamento da família.",
  },
  {
    icon: Coins,
    title: "Investimento inteligente",
    text: "Patrimônio real, sem taxas de financiamento bancário.",
  },
];

const pilares = [
  { icon: Home, title: "Moradia", text: "Bairro planejado para viver bem." },
  { icon: Coins, title: "Patrimônio", text: "Ativo real no seu nome." },
  { icon: TrendingUp, title: "Valorização", text: "Região em franca expansão." },
  { icon: Trees, title: "Qualidade de vida", text: "Áreas verdes e ruas arborizadas." },
];

const fases = [
  { label: "Lançamento", pct: 42 },
  { label: "Infraestrutura", pct: 62 },
  { label: "Ocupação inicial", pct: 80 },
  { label: "Bairro consolidado", pct: 100 },
];

export function Oportunidade() {
  return (
    <>
      <section className="bg-secondary py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 lg:flex-row lg:justify-between lg:px-10">
          <div>
            <p className="font-display text-2xl text-accent-foreground sm:text-3xl">
              Condições Especiais de Lançamento
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
              {faixa.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm font-medium text-accent-foreground"
                >
                  <Check className="size-4" /> {f}
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
            className="btn-base btn-forest shrink-0"
          >
            Solicitar Tabela Atualizada
          </a>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Por que comprar agora?</p>
            <h2 className="rule-gold mt-4 font-display text-4xl text-primary sm:text-5xl">
              Este é o momento certo para investir
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Empreendimentos em fase inicial geralmente apresentam maior potencial de valorização
              durante o desenvolvimento da infraestrutura e ocupação.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {urgencia.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <article className="card-premium h-full p-8">
                  <c.icon className="size-8 text-gold" strokeWidth={1.3} />
                  <h3 className="mt-5 font-display text-2xl text-primary">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="eyebrow">Investimento e valorização</p>
              <h2 className="rule-gold mt-4 font-display text-4xl text-primary sm:text-5xl">
                Invista em uma região em expansão
              </h2>
              <div className="mt-10 space-y-6">
                {fases.map((f, i) => (
                  <div key={f.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{f.label}</span>
                      <span className="text-xs uppercase tracking-[0.14em] text-gold">
                        Fase {i + 1}
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full bg-primary/10">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--forest)] to-[var(--gold)] transition-[width] duration-1000"
                        style={{ width: `${f.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-8 border-l-2 border-gold pl-5 font-display text-2xl text-primary">
                “Adquira seu lote antes da próxima fase de crescimento da região.”
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                Gráfico ilustrativo das fases de desenvolvimento de um loteamento. Não constitui
                promessa de rentabilidade.
              </p>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {pilares.map((p, i) => (
                <Reveal key={p.title} delay={i * 70}>
                  <article className="card-premium h-full p-7">
                    <p.icon className="size-7 text-gold" strokeWidth={1.4} />
                    <h3 className="mt-5 font-display text-xl text-primary">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow">Diferenciais</p>
              <h2 className="rule-gold mt-4 font-display text-4xl text-primary sm:text-5xl">
                Por que investir no Parque das Flores?
              </h2>
              <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {[
                  "Região em desenvolvimento",
                  "Forte potencial de valorização",
                  "Infraestrutura planejada",
                  "Fácil acesso",
                  "Qualidade de vida",
                  "Áreas verdes",
                  "Parcelamento facilitado",
                  "Localização estratégica",
                ].map((d) => (
                  <li
                    key={d}
                    className="flex items-center gap-3 border-b border-border pb-3 text-sm text-muted-foreground"
                  >
                    <Check className="size-4 shrink-0 text-gold" /> {d}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <div className="surface-forest h-full p-9">
                <p className="eyebrow">Credibilidade</p>
                <h3 className="mt-4 font-display text-3xl text-cream">
                  Um empreendimento planejado para o futuro
                </h3>
                <ul className="mt-8 space-y-4">
                  {[
                    "Projeto urbanístico aprovado",
                    "235 lotes planejados",
                    "Área residencial",
                    "Área comercial",
                    "Áreas verdes",
                    "Localização estratégica",
                    "Infraestrutura urbana planejada",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-3 text-sm text-cream/85">
                      <Landmark className="size-4 shrink-0 text-gold" /> {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-9 border border-gold/50 p-5 text-center font-display text-xl text-gold">
                  Mais de 235 oportunidades para morar ou investir.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
