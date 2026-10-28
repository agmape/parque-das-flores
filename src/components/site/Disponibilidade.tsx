import { useRef, useState } from "react";
import { Plus, Minus, RotateCcw, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { whatsappLink } from "@/lib/site";
import mapa from "@/assets/mapa-disponibilidade-13-10-2026.jpg.asset.json";

export const DISPONIVEIS = 58;
export const RESERVADOS = 153;
export const VENDIDOS = 24;

const status = [
  {
    key: "disponivel",
    label: "Disponível",
    desc: "Lotes livres para compra imediata",
    count: DISPONIVEIS,
    dot: "bg-[oklch(0.72_0.19_145)]",
    ring: "border-[oklch(0.72_0.19_145)]",
    pulse: true,
  },
  {
    key: "reservado",
    label: "Reservado",
    desc: "Em processo de reserva",
    count: RESERVADOS,
    dot: "bg-[oklch(0.82_0.16_82)]",
    ring: "border-[oklch(0.82_0.16_82)]",
    pulse: false,
  },
  {
    key: "vendido",
    label: "Vendido",
    desc: "Unidades já comercializadas",
    count: VENDIDOS,
    dot: "bg-[oklch(0.58_0.21_27)]",
    ring: "border-[oklch(0.58_0.21_27)]",
    pulse: false,
  },
];

export function Disponibilidade() {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number } | null>(null);

  const reset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <section id="disponibilidade" className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Espelho de vendas — atualizado em 13/10/2026</p>
          <h2 className="rule-gold mt-4 font-display text-4xl text-primary sm:text-5xl">
            Disponibilidade dos lotes
          </h2>
          <p className="mt-6 text-muted-foreground">
            Cada lote do mapa recebe uma bolinha colorida indicando a sua situação atual. Use o zoom
            e arraste para localizar as unidades ainda disponíveis.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <div
              className="relative select-none overflow-hidden rounded-xl border border-border bg-white"
              onPointerDown={(e) => {
                drag.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
                (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (!drag.current || zoom === 1) return;
                setOffset({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y });
              }}
              onPointerUp={() => (drag.current = null)}
            >
              <img
                src={mapa.url}
                alt="Mapa de disponibilidade dos lotes do Parque das Flores em Sacramento-MG, com bolinhas verdes para lotes disponíveis, amarelas para reservados e vermelhas para vendidos"
                loading="lazy"
                draggable={false}
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                  cursor: zoom > 1 ? "grab" : "default",
                }}
                className="w-full origin-center transition-transform duration-200 ease-out"
              />

              <div className="absolute left-3 top-3 flex flex-col gap-2 rounded-lg bg-white/92 p-3 shadow-md backdrop-blur-sm sm:flex-row sm:items-center sm:gap-4">
                {status.map((s) => (
                  <span key={s.key} className="flex items-center gap-2 text-xs text-foreground">
                    <span className="relative grid size-3 place-items-center">
                      {s.pulse && (
                        <span
                          className={`absolute inline-flex size-3 animate-ping rounded-full ${s.dot} opacity-70`}
                        />
                      )}
                      <span className={`size-3 rounded-full ${s.dot}`} />
                    </span>
                    {s.label}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-3 right-3 flex gap-2">
                {[
                  {
                    icon: Plus,
                    action: () => setZoom((z) => Math.min(4, +(z + 0.4).toFixed(2))),
                    label: "Aproximar",
                  },
                  {
                    icon: Minus,
                    action: () => setZoom((z) => Math.max(1, +(z - 0.4).toFixed(2))),
                    label: "Afastar",
                  },
                  { icon: RotateCcw, action: reset, label: "Restaurar" },
                ].map((b) => (
                  <button
                    key={b.label}
                    type="button"
                    aria-label={b.label}
                    onClick={b.action}
                    className="btn-forest grid size-10 place-items-center rounded-sm"
                  >
                    <b.icon className="size-4" />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col gap-4">
              <ul className="space-y-3">
                {status.map((s) => (
                  <li
                    key={s.key}
                    className={`card-premium flex items-center gap-4 rounded-xl border-l-4 p-5 ${s.ring} ${
                      s.key === "vendido" ? "opacity-70" : ""
                    } ${s.pulse ? "bg-[oklch(0.72_0.19_145_/_0.06)]" : ""}`}
                  >
                    <span className="relative grid size-4 shrink-0 place-items-center">
                      {s.pulse && (
                        <span
                          className={`absolute inline-flex size-4 animate-ping rounded-full ${s.dot} opacity-70`}
                        />
                      )}
                      <span className={`size-4 rounded-full ${s.dot}`} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-2xl text-primary">
                        {s.count}{" "}
                        <span className="font-sans text-sm uppercase tracking-[0.16em] text-muted-foreground">
                          {s.label}
                        </span>
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="surface-forest mt-auto rounded-xl p-6">
                <p className="eyebrow">Últimas unidades</p>
                <p className="mt-3 text-sm text-cream/80">
                  Restam apenas {DISPONIVEIS} lotes disponíveis de 235. Consulte a quadra e o lote de
                  sua preferência antes que seja reservado.
                </p>
                <a
                  href={whatsappLink(
                    "Olá! Quero consultar os lotes DISPONÍVEIS (bolinha verde) no mapa do Parque das Flores em Sacramento-MG.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-base btn-gold mt-6 w-full"
                >
                  <MessageCircle className="size-4" /> Consultar lotes disponíveis
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
