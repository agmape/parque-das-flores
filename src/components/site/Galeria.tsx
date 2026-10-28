import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Maximize2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { SiteVideo } from "./SiteVideo";
import sunset from "@/assets/panorama-por-do-sol.png.asset.json";
import lifeVideo from "@/assets/parque-das-flores-sua-vida.mp4.asset.json";
import locationVideo from "@/assets/parque-das-flores-ponto-de-partida.mp4.asset.json";
import presentationVideo from "@/assets/parque-das-flores-apresentacao.mp4.asset.json";
import lifePoster from "@/assets/parque-video-poster-1.jpg.asset.json";
import locationPoster from "@/assets/parque-video-poster-2.jpg.asset.json";
import presentationPoster from "@/assets/parque-video-poster-3.jpg.asset.json";
import a1 from "@/assets/DJI_0126.jpg.asset.json";
import a2 from "@/assets/DJI_0154.jpg.asset.json";
import a3 from "@/assets/DJI_0152.jpg.asset.json";
import a4 from "@/assets/DJI_0155.jpg.asset.json";
import marked from "@/assets/area-marcada.jpg.asset.json";
import planta from "@/assets/planta.jpg.asset.json";
import recente01 from "@/assets/whatsapp-image-2026-09-10-at-18-27-49.jpg.asset.json";
import recente02 from "@/assets/whatsapp-image-2026-09-10-at-18-27-49-1.jpg.asset.json";
import recente03 from "@/assets/whatsapp-image-2026-09-10-at-18-27-49-2.jpg.asset.json";
import recente04 from "@/assets/whatsapp-image-2026-09-10-at-18-27-50.jpg.asset.json";
import recente05 from "@/assets/whatsapp-image-2026-09-10-at-18-27-50-1.jpg.asset.json";
import recente06 from "@/assets/whatsapp-image-2026-09-10-at-18-27-50-2.jpg.asset.json";
import recente07 from "@/assets/whatsapp-image-2026-09-10-at-18-27-50-3.jpg.asset.json";
import recente08 from "@/assets/whatsapp-image-2026-09-10-at-18-27-51.jpg.asset.json";
import recente09 from "@/assets/whatsapp-image-2026-09-10-at-18-27-51-1.jpg.asset.json";
import recente10 from "@/assets/whatsapp-image-2026-09-10-at-18-27-51-2.jpg.asset.json";

const images = [
  {
    url: sunset.url,
    alt: "Panorama ilustrativo do Parque das Flores ao pôr do sol",
    caption: "Pôr do sol — imagem ilustrativa",
  },
  {
    url: recente04.url,
    alt: "Vista aérea recente das vias abertas no Parque das Flores",
    caption: "Obras recentes — visão geral do loteamento",
    recent: true,
  },
  {
    url: recente01.url,
    alt: "Abertura das novas vias internas do Parque das Flores",
    caption: "Obras recentes — implantação das vias",
    recent: true,
  },
  {
    url: recente02.url,
    alt: "Vista aérea das obras e acessos do Parque das Flores",
    caption: "Obras recentes — acessos e infraestrutura",
    recent: true,
  },
  {
    url: recente05.url,
    alt: "Acesso em implantação junto à área urbana de Sacramento",
    caption: "Obras recentes — conexão com a cidade",
    recent: true,
  },
  {
    url: recente06.url,
    alt: "Área do Parque das Flores com novas vias em implantação",
    caption: "Obras recentes — avanço da implantação",
    recent: true,
  },
  {
    url: recente07.url,
    alt: "Panorama recente do terreno e das vias do Parque das Flores",
    caption: "Obras recentes — panorama do empreendimento",
    recent: true,
  },
  {
    url: recente08.url,
    alt: "Entorno urbano e acesso ao Parque das Flores",
    caption: "Obras recentes — localização e entorno",
    recent: true,
  },
  {
    url: recente09.url,
    alt: "Vista aérea recente do entorno comercial do loteamento",
    caption: "Obras recentes — entorno consolidado",
    recent: true,
  },
  {
    url: recente10.url,
    alt: "Via interna recém-aberta no Parque das Flores",
    caption: "Obras recentes — abertura de ruas",
    recent: true,
  },
  {
    url: recente03.url,
    alt: "Vista aérea recente da implantação do Parque das Flores",
    caption: "Obras recentes — infraestrutura em andamento",
    recent: true,
  },
  {
    url: a1.url,
    alt: "Vista aérea 01 — Parque das Flores e a cidade de Sacramento-MG ao fundo",
    caption: "Vista aérea 01 — o empreendimento e a cidade",
  },
  {
    url: a2.url,
    alt: "Vista aérea 02 — proximidade do loteamento com a malha urbana de Sacramento",
    caption: "Vista aérea 02 — proximidade com a cidade",
  },
  {
    url: a3.url,
    alt: "Vista aérea da região de expansão urbana de Sacramento-MG",
    caption: "Região de expansão urbana",
  },
  {
    url: a4.url,
    alt: "Vista aérea vertical do entorno do Parque das Flores",
    caption: "Entorno e acessos principais",
  },
  {
    url: marked.url,
    alt: "Foto aérea com a área do Parque das Flores destacada",
    caption: "Área do Parque das Flores em destaque",
  },
  {
    url: planta.url,
    alt: "Planta urbanística do loteamento Parque das Flores",
    caption: "Projeto urbanístico oficial",
  },
];

export function Galeria() {
  const [index, setIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);

  const close = useCallback(() => {
    setIndex(null);
    setZoom(false);
  }, []);
  const next = useCallback(() => {
    setZoom(false);
    setIndex((i) => (i === null ? i : (i + 1) % images.length));
  }, []);
  const prev = useCallback(() => {
    setZoom(false);
    setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  }, []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, next, prev]);

  const fullscreen = () => {
    const el = document.getElementById("lightbox-shell");
    if (el?.requestFullscreen) void el.requestFullscreen();
  };

  return (
    <section id="galeria" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Galeria</p>
          <h2 className="rule-gold mt-4 font-display text-4xl text-primary sm:text-5xl">
            Imagens do empreendimento
          </h2>
          <p className="mt-6 text-muted-foreground">
            Acompanhe as obras mais recentes e explore o empreendimento em imagens aéreas.
          </p>
        </Reveal>

        <div className="mt-12 border-b border-border pb-12">
          <h3 className="font-display text-2xl text-primary">Parque das Flores em vídeo</h3>
          <div className="mt-6 grid items-start gap-6 sm:grid-cols-3">
            {[
              { src: lifeVideo.url, poster: lifePoster.url, label: "Sua vida no Parque das Flores" },
              { src: locationVideo.url, poster: locationPoster.url, label: "Um novo ponto de partida" },
              { src: presentationVideo.url, poster: presentationPoster.url, label: "Apresentação do Parque das Flores" },
            ].map((video) => (
              <figure key={video.src} className="mx-auto w-full max-w-[360px]">
                <SiteVideo {...video} portrait />
                <figcaption className="mt-4 text-sm font-medium text-primary">{video.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <Reveal key={img.url} delay={i * 60}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden bg-primary/5"
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(8,28,20,0.85))] opacity-80" />
                {img.recent && (
                  <span className="absolute left-3 top-3 bg-gold px-3 py-1 text-[0.65rem] font-medium uppercase text-primary">
                    Atualização recente
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 text-left">
                  <span className="text-xs uppercase tracking-[0.14em] text-cream">
                    {img.caption}
                  </span>
                  <ZoomIn className="size-5 shrink-0 text-gold" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {index !== null && (
        <div
          id="lightbox-shell"
          className="fixed inset-0 z-[90] flex flex-col bg-[rgba(6,20,14,0.96)] animate-fade-in"
        >
          <div className="flex items-center justify-between px-5 py-4 text-cream">
            <span className="text-xs uppercase tracking-[0.18em] text-cream/70">
              {index + 1} / {images.length}
            </span>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => setZoom((z) => !z)} aria-label="Zoom">
                <ZoomIn className={`size-6 ${zoom ? "text-gold" : ""}`} />
              </button>
              <button type="button" onClick={fullscreen} aria-label="Tela cheia">
                <Maximize2 className="size-6" />
              </button>
              <button type="button" onClick={close} aria-label="Fechar">
                <X className="size-7" />
              </button>
            </div>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-auto px-3 pb-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Anterior"
              className="absolute left-2 z-10 rounded-full bg-black/40 p-2 text-cream hover:bg-black/70"
            >
              <ChevronLeft className="size-7" />
            </button>
            <img
              src={images[index]?.url}
              alt={images[index]?.alt ?? "Imagem do Parque das Flores"}
              onClick={() => setZoom((z) => !z)}
              className={`transition-transform duration-500 ${
                zoom
                  ? "max-h-none max-w-none scale-[1.8] cursor-zoom-out"
                  : "max-h-[78vh] max-w-full cursor-zoom-in object-contain"
              }`}
            />
            <button
              type="button"
              onClick={next}
              aria-label="Próxima"
              className="absolute right-2 z-10 rounded-full bg-black/40 p-2 text-cream hover:bg-black/70"
            >
              <ChevronRight className="size-7" />
            </button>
          </div>
          <p className="pb-6 text-center text-sm text-cream/80">{images[index]?.caption}</p>
        </div>
      )}
    </section>
  );
}
