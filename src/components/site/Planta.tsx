import { useRef, useState } from "react";
import { Plus, Minus, RotateCcw } from "lucide-react";
import { Reveal } from "./Reveal";
import planta from "@/assets/planta.jpg.asset.json";

const legenda = [
  ["235", "lotes totais"],
  ["189", "lotes residenciais"],
  ["46", "lotes comerciais"],
  ["14.015 m²", "de áreas verdes"],
  ["5.489 m²", "de área institucional"],
  ["12", "quadras com sistema viário planejado"],
];

export function Planta() {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number } | null>(null);

  const reset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <section id="planta" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Mapa do loteamento</p>
          <h2 className="rule-gold mt-4 font-display text-4xl text-primary sm:text-5xl">
            Planta urbanística oficial
          </h2>
          <p className="mt-6 text-muted-foreground">
            Quadras, lotes, ruas, áreas verdes e área institucional. Use o zoom e arraste para
            explorar o projeto.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <div
              className="relative select-none overflow-hidden border border-border bg-white"
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
                src={planta.url}
                alt="Planta urbanística do loteamento Parque das Flores em Sacramento-MG"
                loading="lazy"
                draggable={false}
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                  cursor: zoom > 1 ? "grab" : "default",
                }}
                className="w-full origin-center transition-transform duration-200 ease-out"
              />
              <div className="absolute bottom-3 right-3 flex gap-2">
                {[
                  { icon: Plus, action: () => setZoom((z) => Math.min(4, +(z + 0.4).toFixed(2))), label: "Aproximar" },
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
            <div className="surface-forest h-full p-8">
              <p className="eyebrow">Legenda</p>
              <ul className="mt-6 space-y-5">
                {legenda.map(([n, l]) => (
                  <li key={l} className="border-b border-cream/15 pb-4 last:border-0">
                    <p className="font-display text-2xl text-gold">{n}</p>
                    <p className="mt-1 text-sm text-cream/75">{l}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
