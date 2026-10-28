import { useMemo, useState } from "react";
import { MessageCircle, BadgeCheck, Landmark } from "lucide-react";
import { Reveal } from "./Reveal";
import {
  DOWN_PAYMENT,
  PRICE,
  RESIDENTIAL_IPCA_DETAILS,
  RESIDENTIAL_IPCA_SHORT_NOTICE,
  RESIDENTIAL_PLANS,
  RESIDENTIAL_PROJECTION_NOTICE,
  brl,
  residentialInstallmentNotice,
  whatsappLink,
} from "@/lib/site";

const COMMERCIAL_INITIAL = 300_000;
const COMMERCIAL_MAX = 360_000;
const COMMERCIAL_DOWN_INITIAL = 60_000;
const COMMERCIAL_MAX_MONTHS = 60;

type LotType = "residencial" | "comercial";

export function Condicoes() {
  const [tipo, setTipo] = useState<LotType>("residencial");
  const [lote, setLote] = useState(PRICE);
  const [entrada, setEntrada] = useState(DOWN_PAYMENT);
  const [meses, setMeses] = useState<number>(RESIDENTIAL_PLANS[0].months);

  const minLote = tipo === "residencial" ? PRICE : COMMERCIAL_INITIAL;
  const maxLote = tipo === "residencial" ? PRICE : COMMERCIAL_MAX;
  const minEntrada = tipo === "residencial" ? DOWN_PAYMENT : Math.round(lote * 0.2);
  const maxEntrada = Math.round(lote * 0.5);

  const saldo = lote - entrada;

  const parcela = useMemo(() => {
    if (tipo === "residencial") {
      const parcelaBase = RESIDENTIAL_PLANS.find((plan) => plan.months === meses)?.installment ?? 0;
      const saldoBase = PRICE - DOWN_PAYMENT;
      return parcelaBase * (saldo / saldoBase);
    }
    return saldo / meses;
  }, [tipo, saldo, meses]);

  const residentialPlanIndex = Math.max(
    0,
    RESIDENTIAL_PLANS.findIndex((plan) => plan.months === meses),
  );

  const handleTipoChange = (next: LotType) => {
    setTipo(next);
    if (next === "residencial") {
      setLote(PRICE);
      setEntrada(DOWN_PAYMENT);
      setMeses(RESIDENTIAL_PLANS[0].months);
    } else {
      setLote(COMMERCIAL_INITIAL);
      setEntrada(COMMERCIAL_DOWN_INITIAL);
      setMeses(COMMERCIAL_MAX_MONTHS);
    }
  };

  const handleLoteChange = (value: number) => {
    setLote(value);
    const min = Math.round(value * (tipo === "comercial" ? 0.2 : 0.1));
    const max = Math.round(value * 0.5);
    setEntrada((prev) => Math.min(Math.max(prev, min), max));
  };

  const whatsappMessage =
    tipo === "residencial"
      ? `Olá, tenho interesse em um lote residencial de ${brl(lote)}, com entrada de ${brl(entrada)} e ${meses} parcelas iniciais de ${brl(parcela)}, ${RESIDENTIAL_IPCA_SHORT_NOTICE}. Gostaria de saber mais sobre as condições de pagamento.`
      : `Olá! Quero receber a simulação completa do Parque das Flores. Lote comercial de ${brl(lote)}, entrada de ${brl(entrada)} e saldo de ${brl(saldo)} em ${meses} meses.`;

  return (
    <section id="condicoes" className="surface-forest py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="eyebrow">Condições comerciais</p>
            <h2 className="mt-4 font-display text-4xl text-cream sm:text-5xl">Condição Especial</h2>
            <div className="mt-10 border border-gold/50 bg-cream/5 p-8">
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-cream/60">
                Valor do lote
              </p>
              <p className="mt-2 font-display text-5xl text-gold">{brl(PRICE)}</p>
              <p className="mt-1 text-sm text-cream/60">A partir de R$ 90.000</p>

              <dl className="mt-8 space-y-5">
                <div className="flex items-baseline justify-between border-b border-cream/15 pb-4">
                  <dt className="text-sm text-cream/75">Entrada</dt>
                  <dd className="font-display text-2xl text-cream">{brl(DOWN_PAYMENT)}</dd>
                </div>
                <div className="flex items-baseline justify-between border-b border-cream/15 pb-4">
                  <dt className="text-sm text-cream/75">Parcelamento</dt>
                  <dd className="text-right font-display text-2xl text-cream">De 36x a 240x</dd>
                </div>
                <div className="grid grid-cols-1 gap-x-5 gap-y-3 border-b border-cream/15 pb-5 min-[430px]:grid-cols-2">
                  {RESIDENTIAL_PLANS.map((plan) => (
                    <div key={plan.months} className="flex items-baseline justify-between gap-2">
                      <dt className="text-sm text-cream/70">{plan.months}x iniciais</dt>
                      <dd className="font-medium text-cream">{brl(plan.installment)}</dd>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <Landmark className="size-5 text-gold" />
                  <span className="text-sm uppercase tracking-[0.14em] text-gold">
                    Financiamento direto com o loteador
                  </span>
                </div>
              </dl>
              <p className="mt-6 text-xs text-cream/60">
                Parcelas iniciais com reajuste anual pelo IPCA, conforme contrato. Valores sujeitos
                a alteração sem aviso prévio.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="bg-background p-8 shadow-[var(--shadow-elegant)]">
              <p className="eyebrow">Simulador de pagamento</p>
              <h3 className="mt-3 font-display text-3xl text-primary">Simule seu lote</h3>

              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-2 gap-3 rounded-md bg-muted p-1">
                  <button
                    type="button"
                    onClick={() => handleTipoChange("residencial")}
                    className={`rounded-sm py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
                      tipo === "residencial"
                        ? "bg-forest text-cream"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    Lote Residencial
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTipoChange("comercial")}
                    className={`rounded-sm py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
                      tipo === "comercial"
                        ? "bg-forest text-cream"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    Lote Comercial
                  </button>
                </div>

                {tipo === "comercial" && (
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <label htmlFor="lote" className="text-muted-foreground">
                        Valor do lote
                      </label>
                      <span className="font-display text-xl text-primary">{brl(lote)}</span>
                    </div>
                    <input
                      id="lote"
                      type="range"
                      min={minLote}
                      max={maxLote}
                      step={5_000}
                      value={lote}
                      onChange={(e) => handleLoteChange(Number(e.target.value))}
                      className="mt-3 w-full accent-[var(--gold)]"
                    />
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>{brl(minLote)}</span>
                      <span>{brl(maxLote)}</span>
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between text-sm">
                    <label htmlFor="entrada" className="text-muted-foreground">
                      Entrada
                    </label>
                    <span className="font-display text-xl text-primary">{brl(entrada)}</span>
                  </div>
                  <input
                    id="entrada"
                    type="range"
                    min={minEntrada}
                    max={maxEntrada}
                    step={500}
                    value={entrada}
                    onChange={(e) => setEntrada(Number(e.target.value))}
                    className="mt-3 w-full accent-[var(--gold)]"
                  />
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>{brl(minEntrada)}</span>
                    <span>{brl(maxEntrada)}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Entrada mínima de {tipo === "residencial" ? "10%" : "20%"} do valor do lote.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm">
                    <label htmlFor="meses" className="text-muted-foreground">
                      Parcelamento
                    </label>
                    <span className="font-display text-xl text-primary">{meses}x</span>
                  </div>
                  <input
                    id="meses"
                    type="range"
                    min={tipo === "residencial" ? 0 : 1}
                    max={
                      tipo === "residencial"
                        ? RESIDENTIAL_PLANS.length - 1
                        : COMMERCIAL_MAX_MONTHS
                    }
                    step={1}
                    value={tipo === "residencial" ? residentialPlanIndex : meses}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setMeses(
                        tipo === "residencial"
                          ? RESIDENTIAL_PLANS[value]?.months ?? RESIDENTIAL_PLANS[0].months
                          : value,
                      );
                    }}
                    className="mt-3 w-full accent-[var(--gold)]"
                  />
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>{tipo === "residencial" ? `${RESIDENTIAL_PLANS[0].months}x` : "1x"}</span>
                    <span>
                      {tipo === "residencial"
                        ? `${RESIDENTIAL_PLANS.at(-1)?.months ?? 240}x`
                        : `${COMMERCIAL_MAX_MONTHS}x`}
                    </span>
                  </div>
                  {tipo === "residencial" && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Prazos disponíveis: {RESIDENTIAL_PLANS.map((plan) => `${plan.months}x`).join(", ")}.
                    </p>
                  )}
                </div>

                <dl className="divide-y divide-border border-y border-border">
                  {[
                    ["Valor do lote", brl(lote)],
                    ["Entrada", brl(entrada)],
                    ["Saldo a financiar", brl(saldo)],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between py-4">
                      <dt className="text-sm text-muted-foreground">{k}</dt>
                      <dd className="text-base font-medium text-primary">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="bg-secondary p-6 text-center">
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {tipo === "residencial" ? "Parcela inicial" : "Parcelamento"}
                  </p>
                  <p className="mt-2 font-display text-4xl text-primary">
                    {meses}x {brl(parcela)}{tipo === "residencial" ? "*" : ""}
                  </p>
                  {tipo === "residencial" && (
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      *{residentialInstallmentNotice(parcela)}
                    </p>
                  )}
                </div>

                {tipo === "residencial" && (
                  <div className="border border-border bg-muted/50 p-5">
                    <p className="text-sm font-medium text-primary">Como funciona o reajuste</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {RESIDENTIAL_IPCA_DETAILS}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {RESIDENTIAL_PROJECTION_NOTICE}
                    </p>
                  </div>
                )}

                <a
                  href={whatsappLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-base btn-gold w-full"
                >
                  <MessageCircle className="size-4" /> Receber Simulação Completa
                </a>
                <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <BadgeCheck className="size-4 text-gold" /> Atendimento direto com{" "}
                  Aglemon Ribeiro
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <div className="border-t border-cream/20 pt-10">
            <p className="eyebrow">Perguntas frequentes</p>
            <h3 className="mt-3 font-display text-3xl text-cream">Parcelas residenciais e IPCA</h3>
            <div className="mt-8 grid gap-x-10 gap-y-7 md:grid-cols-2">
              {[
                [
                  "A parcela fica igual durante todo o financiamento?",
                  "Não. O valor divulgado é inicial e permanece durante cada período de 12 meses. Depois, as parcelas futuras são reajustadas anualmente pelo IPCA, conforme contrato.",
                ],
                [
                  "Como é calculado cada reajuste?",
                  "A parcela vigente é multiplicada por 1 mais o IPCA acumulado aplicável ao período. Cada reajuste incide sobre a parcela já corrigida no ciclo anterior.",
                ],
                [
                  "As parcelas já pagas são corrigidas novamente?",
                  "Não. O reajuste não retroage e incide somente sobre as parcelas futuras vigentes.",
                ],
                [
                  "A simulação garante o valor futuro?",
                  "Não. O site mostra valores iniciais. Projeções futuras são apenas hipóteses e dependem do IPCA e das regras contratuais aplicáveis a cada período.",
                ],
                [
                  "Existem juros ou outros encargos?",
                  "O site não acrescenta juros nem outros encargos sem previsão expressa no contrato.",
                ],
                [
                  "O que ainda depende do contrato?",
                  "A data-base exata, o período de referência do IPCA, a defasagem de divulgação e o tratamento de índice negativo devem seguir a cláusula contratual.",
                ],
              ].map(([question, answer]) => (
                <div key={question} className="border-b border-cream/15 pb-6">
                  <h4 className="font-medium text-cream">{question}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
