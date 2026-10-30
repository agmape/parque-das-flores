import { useEffect, useState } from "react";
import { MessageCircle, Play } from "lucide-react";
import { HERO_IMAGE, HERO_LOOP, srcSet } from "@/lib/media";
import { PROJECT_FACTS, whatsappLink } from "@/lib/site";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/** Vídeo de fundo só em telas largas, sem economia de dados e sem "reduzir movimento". */
function canPlayBackgroundVideo() {
  if (typeof window === "undefined") return false;
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && /(^|-)(2g|3g)$/.test(connection.effectiveType)) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return window.matchMedia("(min-width: 768px)").matches;
}

const facts = [
  { value: String(PROJECT_FACTS.totalLots), label: "lotes planejados" },
  { value: PROJECT_FACTS.residentialSize, label: "lotes residenciais" },
  { value: PROJECT_FACTS.commercialSize, label: "lotes comerciais" },
  { value: String(PROJECT_FACTS.blocks), label: "quadras com sistema viário planejado" },
];

export function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (!canPlayBackgroundVideo()) return;
    // Espera a página carregar para não competir com a imagem principal (LCP).
    const start = () => setShowVideo(true);
    if (document.readyState === "complete") {
      const id = window.setTimeout(start, 600);
      return () => window.clearTimeout(id);
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-forest-deep"
    >
      <img
        src={`${HERO_IMAGE.base}-1280.webp`}
        srcSet={srcSet(HERO_IMAGE)}
        sizes="100vw"
        alt=""
        width={HERO_IMAGE.width}
        height={HERO_IMAGE.height}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 size-full object-cover object-[50%_60%]"
      />
      {showVideo && (
        <video
          aria-hidden
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          poster={`${HERO_IMAGE.base}-1280.webp`}
          onPlaying={() => setVideoReady(true)}
          className={`absolute inset-0 -z-10 size-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
        >
          <source src={HERO_LOOP} type="video/mp4" />
        </video>
      )}
      <div className="hero-shade absolute inset-0 -z-10" />

      <div className="container-site flex flex-1 flex-col justify-end pb-10 pt-[calc(var(--header-h)+3rem)] sm:pb-14">
        <p className="text-sm font-semibold text-gold-soft sm:text-base">
          Loteamento em Sacramento-MG · Um empreendimento Queiroz, 50 anos
        </p>
        <h1
          id="hero-title"
          className="mt-4 max-w-[14ch] font-display text-[3rem] font-semibold leading-[0.98] text-cream sm:text-7xl lg:text-[5.5rem]"
        >
          Seu futuro floresce aqui.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85">
          Lotes residenciais de {PROJECT_FACTS.residentialSize} e comerciais de{" "}
          {PROJECT_FACTS.commercialSize} no Parque das Flores, um novo lugar para morar, investir e
          construir.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={whatsappLink(
              "Olá! Quero falar com um consultor sobre os lotes do Parque das Flores em Sacramento-MG.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="hero_whatsapp"
            className="btn-base btn-whatsapp sm:!px-7"
          >
            <MessageCircle className="size-5" aria-hidden /> Fale com nossa equipe
          </a>
          <a href="#contato" data-cta="hero_receber_informacoes" className="btn-base btn-gold">
            Quero saber mais
          </a>
          <a
            href="#video-aereo"
            data-cta="hero_assistir_video"
            className="btn-base btn-outline-light"
          >
            <Play className="size-4" fill="currentColor" aria-hidden /> Ver o loteamento do alto
          </a>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-cream/20 pt-6 sm:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="sr-only">{fact.label}</dt>
              <dd className="font-display text-3xl font-semibold text-cream sm:text-4xl">
                {fact.value}
              </dd>
              <dd className="mt-1 text-sm leading-snug text-cream/70">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
