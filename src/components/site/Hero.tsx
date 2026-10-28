import { MessageCircle, ChevronDown, MapPin, Play } from "lucide-react";
import heroAsset from "@/assets/DJI_0126.jpg.asset.json";
import { whatsappLink } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[88svh] w-full overflow-hidden">
      <img
        src={heroAsset.url}
        alt="Vista aérea do Parque das Flores e da cidade de Sacramento-MG"
        className="absolute inset-0 size-full object-cover"
        width={1920}
        height={1080}
        fetchPriority="high"
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-center px-5 pb-24 pt-32 lg:px-10">
        <p className="eyebrow flex items-center gap-2">
          <MapPin className="size-3.5" /> PARQUE DAS FLORES · Sacramento-MG
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-[2.6rem] leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
          Seu futuro<br />floresce aqui.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/85 sm:text-lg">
          Um novo lugar para morar, investir e construir seu futuro.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={whatsappLink(
              "Olá! Quero falar com um consultor sobre os lotes do Parque das Flores em Sacramento-MG.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base btn-forest"
          >
            <MessageCircle className="size-4" /> Falar com um Consultor
          </a>
          <a href="#lotes" className="btn-base btn-outline-light">
            Conhecer os lotes
          </a>
          <a href="#video-empreendimento" className="btn-base btn-outline-light">
            <Play className="size-4" fill="currentColor" /> Assistir vídeo
          </a>
        </div>

        <p className="mt-8 text-sm text-cream/80">Um empreendimento Queiroz · 50 anos</p>
        <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-6 border-t border-cream/20 pt-8 sm:grid-cols-4">
          {[
            ["235", "lotes planejados"],
            ["189", "residenciais"],
            ["46", "comerciais"],
            ["até 240x", "parcelas iniciais · IPCA anual"],
          ].map(([n, l]) => (
            <div key={l}>
              <dt className="font-display text-3xl text-gold">{n}</dt>
              <dd className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-cream/70">{l}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#sobre"
        aria-label="Rolar para o conteúdo"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/70 transition-colors hover:text-gold"
      >
        <ChevronDown className="size-7 animate-bounce" />
      </a>
    </section>
  );
}
