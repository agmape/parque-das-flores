import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { SectionHeading } from "./Brand";
import { GALLERY, srcSet } from "@/lib/media";
import { track } from "@/lib/tracking/datalayer";

// A busca usa a cidade, como no site original. Quando houver o endereço ou as
// coordenadas exatas do loteamento, troque somente MAP_QUERY.
const MAP_QUERY = "Sacramento, MG, Brasil";
const ROUTE_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`;

const access = [
  { title: "Área do loteamento", text: "66.982 m² de lotes em 12 quadras." },
  { title: "Acessos principais", text: "Corredor municipal após a rotatória MGC-464 / MG-190." },
  { title: "Cidade de Sacramento", text: "Minutos do centro, comércio e serviços." },
  {
    title: "Expansão urbana",
    text: "Vizinho a novos bairros já em ocupação, no vetor de crescimento da cidade.",
  },
];

const aerial = GALLERY.find((item) => item.id === "avenida-rotatoria-quadras") ?? GALLERY[0]!;

export function Localizacao() {
  const [showMap, setShowMap] = useState(false);

  return (
    <section
      id="localizacao"
      aria-labelledby="localizacao-title"
      className="section-y surface-forest on-dark"
    >
      <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div>
          <SectionHeading
            id="localizacao-title"
            tone="dark"
            kicker="Localização"
            title="Em área estratégica de Sacramento-MG"
          >
            <p>Próximo ao acesso principal da cidade, com a malha urbana a poucos minutos.</p>
          </SectionHeading>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            {access.map((item) => (
              <div key={item.title} className="border-t border-cream/15 pt-4">
                <dt className="flex items-center gap-2 font-semibold text-cream">
                  <MapPin className="size-4 text-gold" aria-hidden /> {item.title}
                </dt>
                <dd className="mt-1.5 text-base leading-relaxed text-cream/75">{item.text}</dd>
              </div>
            ))}
          </dl>
          <a
            href={ROUTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track("map_click", { cta_name: "localizacao_tracar_rota", contact_method: "map" })
            }
            className="btn-base btn-gold mt-10"
          >
            <Navigation className="size-4" aria-hidden /> Traçar rota no Google Maps
          </a>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-cream/15 bg-forest">
          {showMap ? (
            <iframe
              title="Mapa de Sacramento-MG, cidade do Parque das Flores"
              src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=13&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0"
            />
          ) : (
            <>
              <img
                src={`${aerial.base}-1280.webp`}
                srcSet={srcSet(aerial)}
                sizes="(min-width: 1024px) 620px, 100vw"
                alt={aerial.alt}
                width={aerial.width}
                height={aerial.height}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,30,20,0.7),transparent_60%)]" />
              <button
                type="button"
                onClick={() => {
                  setShowMap(true);
                  track("map_click", { cta_name: "localizacao_abrir_mapa", contact_method: "map" });
                }}
                className="btn-base absolute bottom-5 left-5 bg-cream text-forest hover:bg-white"
              >
                <MapPin className="size-4" aria-hidden /> Abrir mapa interativo
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
