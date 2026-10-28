import { MapPin, Navigation } from "lucide-react";
import { Reveal } from "./Reveal";

const MAP_QUERY = "Sacramento, MG, Brasil";

export function Localizacao() {
  return (
    <section id="localizacao" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Localização</p>
            <h2 className="rule-gold mt-4 font-display text-4xl text-primary sm:text-5xl">
              Localização Estratégica
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Empreendimento localizado em área estratégica de Sacramento-MG, próximo ao acesso
              principal da cidade.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Corredor municipal após a rotatória MGC-464 / MG-190",
                "Minutos do centro, comércio e serviços",
                "Vizinho a novos bairros já em ocupação",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> {t}
                </li>
              ))}
            </ul>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-forest mt-9"
            >
              <Navigation className="size-4" /> Traçar rota até o empreendimento
            </a>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden border border-border shadow-[var(--shadow-card)]">
              <iframe
                title="Mapa da localização do Parque das Flores em Sacramento-MG"
                src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=13&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[420px] w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
