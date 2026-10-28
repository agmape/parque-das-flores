import {
  Home,
  Store,
  Route as RouteIcon,
  Trees,
  TrendingUp,
  Wallet,
  Landmark,
  Sparkles,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SiteVideo } from "./SiteVideo";
import aerial from "@/assets/DJI_0152.jpg.asset.json";
import promotionalVideo from "@/assets/parque-das-flores-horizontal.mp4.asset.json";
import videoPoster from "@/assets/parque-video-poster-0.jpg.asset.json";

const destaques = [
  { icon: Home, title: "Lotes residenciais", text: "189 lotes pensados para a sua casa própria." },
  { icon: Store, title: "Lotes comerciais", text: "46 lotes em pontos de alto fluxo." },
  { icon: Landmark, title: "Infraestrutura planejada", text: "Projeto urbanístico aprovado." },
  { icon: RouteIcon, title: "Fácil acesso", text: "Junto ao corredor de entrada da cidade." },
  { icon: Trees, title: "Áreas verdes", text: "Mais de 14 mil m² de áreas verdes." },
  { icon: Sparkles, title: "Excelente investimento", text: "Bairro novo em região consolidada." },
  { icon: TrendingUp, title: "Potencial de valorização", text: "Fase inicial de implantação." },
  {
    icon: Wallet,
    title: "Parcelamento facilitado",
    text: "Entrada de R$ 9 mil e parcelas iniciais de 36 a 240 meses, com reajuste anual pelo IPCA.",
  },
];

export function Sobre() {
  return (
    <section id="sobre" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">O empreendimento</p>
            <h2 className="rule-gold mt-4 font-display text-4xl text-primary sm:text-5xl">
              Parque das Flores
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              O Parque das Flores é um loteamento planejado para oferecer infraestrutura, qualidade
              de vida e excelente potencial de valorização em uma das regiões com maior crescimento
              de Sacramento-MG.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              São 235 lotes distribuídos em 12 quadras, com sistema viário planejado, áreas verdes
              preservadas e área institucional — um bairro completo para morar, construir ou
              investir.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-3">
              {[
                ["66.982 m²", "em lotes"],
                ["12", "quadras"],
                ["1", "área institucional"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-2xl text-primary">{n}</p>
                  <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="absolute -inset-3 hidden border border-gold/50 lg:block" />
            <img
              src={aerial.url}
              alt="Área do loteamento Parque das Flores junto à malha urbana de Sacramento-MG"
              loading="lazy"
              className="relative aspect-[4/3] w-full object-cover shadow-[var(--shadow-elegant)]"
            />
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-16 sm:mt-20">
          <div id="video-empreendimento" className="scroll-mt-28">
            <div className="mb-7 max-w-2xl">
              <p className="eyebrow">Vídeo do empreendimento</p>
              <h3 className="mt-4 font-display text-3xl text-primary sm:text-4xl">
                Conheça o Parque das Flores
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Assista ao vídeo e veja de perto a localização, o projeto e o potencial desta nova
                região de Sacramento.
              </p>
            </div>
            <SiteVideo src={promotionalVideo.url} poster={videoPoster.url} label="Vídeo de apresentação do Parque das Flores — Seu futuro floresce aqui" />
          </div>
        </Reveal>

        <div className="mt-24">
          <Reveal className="text-center">
            <p className="eyebrow">Destaques</p>
            <h3 className="mt-4 font-display text-3xl text-primary sm:text-4xl">
              Tudo o que um bairro planejado oferece
            </h3>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destaques.map((d, i) => (
              <Reveal key={d.title} delay={i * 60}>
                <article className="card-premium h-full p-7">
                  <d.icon className="size-7 text-gold" strokeWidth={1.4} />
                  <h4 className="mt-5 font-display text-xl text-primary">{d.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
