import { useState } from "react";
import { MapPin, Building2, Navigation, Expand } from "lucide-react";
import { Reveal } from "./Reveal";
import { SiteVideo } from "./SiteVideo";
import promotionalVideo from "@/assets/parque-das-flores-promocional.mp4.asset.json";
import marked from "@/assets/area-marcada.jpg.asset.json";
import plain from "@/assets/DJI_0154.jpg.asset.json";
import wide from "@/assets/DJI_0152.jpg.asset.json";
import vertical from "@/assets/DJI_0155.jpg.asset.json";

const pontos = [
  { icon: MapPin, label: "Área do loteamento", text: "66.982 m² de lotes em 12 quadras." },
  { icon: Building2, label: "Cidade de Sacramento", text: "Malha urbana a poucos minutos." },
  { icon: Navigation, label: "Acessos principais", text: "Corredor municipal e rotatória MGC-464." },
  { icon: Expand, label: "Expansão urbana", text: "Vetor de crescimento da cidade." },
];

export function TourAereo() {
  const [showMark, setShowMark] = useState(true);

  return (
    <section id="tour" className="surface-forest py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Tour aéreo</p>
          <h2 className="mt-4 font-display text-4xl text-cream sm:text-5xl">
            Conheça o Parque das Flores do alto
          </h2>
          <p className="mt-6 text-cream/80">
            Explore o empreendimento, seus acessos e toda a região pelas imagens aéreas.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <SiteVideo src={promotionalVideo.url} poster={wide.url} label="Tour em vídeo do Parque das Flores" />
        </Reveal>

        <Reveal delay={140} className="mt-14">
          <div className="mb-5">
            <p className="eyebrow">Explore a área</p>
            <p className="mt-3 text-sm text-cream/75">
              Alterne entre a imagem original e a versão com a área demarcada em dourado.
            </p>
          </div>
          <div className="relative overflow-hidden border border-gold/40">
            <img
              src={showMark ? marked.url : plain.url}
              alt={
                showMark
                  ? "Área do Parque das Flores destacada na foto aérea"
                  : "Foto aérea original da área do Parque das Flores"
              }
              loading="lazy"
              className="aspect-[16/9] w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
            />
            <span className="absolute left-4 top-4 bg-[rgba(6,20,14,0.7)] px-3 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-gold">
              Área do Parque das Flores
            </span>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowMark(true)}
              className={`btn-base !py-3 !text-[0.7rem] ${showMark ? "btn-gold" : "btn-outline-light"}`}
            >
              Com marcação
            </button>
            <button
              type="button"
              onClick={() => setShowMark(false)}
              className={`btn-base !py-3 !text-[0.7rem] ${!showMark ? "btn-gold" : "btn-outline-light"}`}
            >
              Sem marcação
            </button>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pontos.map((p, i) => (
            <Reveal key={p.label} delay={i * 70}>
              <div className="h-full border border-cream/15 bg-[rgba(255,255,255,0.04)] p-6 transition-colors hover:border-gold/60">
                <p.icon className="size-6 text-gold" strokeWidth={1.4} />
                <h3 className="mt-4 font-display text-lg text-cream">{p.label}</h3>
                <p className="mt-2 text-sm text-cream/70">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[wide, vertical].map((img, i) => (
            <Reveal key={img.url} delay={i * 90}>
              <div className="overflow-hidden">
                <img
                  src={img.url}
                  alt="Vista aérea da região do Parque das Flores em Sacramento-MG"
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-[1200ms] hover:scale-110"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
