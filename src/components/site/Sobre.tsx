import { Check } from "lucide-react";
import { SectionHeading } from "./Brand";
import { SiteVideo } from "./SiteVideo";
import { GALLERY, MAIN_VIDEO, srcSet } from "@/lib/media";
import { DOWN_PAYMENT, MAX_RESIDENTIAL_INSTALLMENTS, PROJECT_FACTS, brl } from "@/lib/site";

const image = GALLERY.find((item) => item.id === "quadras-vias-abertas") ?? GALLERY[0]!;

const numbers = [
  { value: String(PROJECT_FACTS.totalLots), label: "lotes no total" },
  { value: String(PROJECT_FACTS.residentialLots), label: "lotes residenciais" },
  { value: String(PROJECT_FACTS.commercialLots), label: "lotes comerciais" },
  { value: String(PROJECT_FACTS.blocks), label: "quadras com sistema viário planejado" },
  { value: PROJECT_FACTS.lotsArea, label: "em lotes" },
  { value: PROJECT_FACTS.greenArea, label: "de áreas verdes" },
  { value: PROJECT_FACTS.institutionalArea, label: "de área institucional" },
];

const highlights = [
  "Projeto urbanístico aprovado",
  "Junto ao corredor de entrada da cidade",
  "Bairro novo em região consolidada",
  "Áreas verdes e área institucional",
  `Entrada de ${brl(DOWN_PAYMENT).replace(",00", "")} e parcelas iniciais em até ${MAX_RESIDENTIAL_INSTALLMENTS} meses, com reajuste anual pelo IPCA`,
  "Fase inicial de implantação",
];

export function Sobre() {
  return (
    <section id="o-parque" aria-labelledby="sobre-title" className="section-y bg-background">
      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="sobre-title"
              kicker="O empreendimento"
              title="Um bairro planejado para morar, construir ou investir"
            >
              <p>
                O Parque das Flores é um loteamento planejado em Sacramento-MG, com infraestrutura,
                qualidade de vida e potencial de valorização em uma das regiões que mais crescem na
                cidade.
              </p>
            </SectionHeading>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-snug text-foreground/85">
                  <Check className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden /> {item}
                </li>
              ))}
            </ul>
          </div>
          <figure className="relative">
            <img
              src={`${image.base}-1280.webp`}
              srcSet={srcSet(image)}
              sizes="(min-width: 1024px) 560px, 100vw"
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-xl object-cover shadow-[var(--shadow-elegant)]"
            />
            <figcaption className="mt-3 text-sm text-muted-foreground">
              Imagem real do loteamento, feita com drone.
            </figcaption>
          </figure>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-border py-10 sm:grid-cols-4 lg:grid-cols-7">
          {numbers.map((item) => (
            <div key={item.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm leading-snug text-muted-foreground">{item.label}</dt>
              <dd className="font-display text-3xl font-semibold text-primary">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div
          id="video-aereo"
          className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:items-end"
        >
          <div>
            <p className="kicker">Vídeo real do loteamento</p>
            <h3 className="mt-2 font-display text-3xl text-primary sm:text-4xl">
              {MAIN_VIDEO.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {MAIN_VIDEO.description} O vídeo só carrega quando você aperta o play.
            </p>
          </div>
          <SiteVideo video={MAIN_VIDEO} />
        </div>
      </div>
    </section>
  );
}
