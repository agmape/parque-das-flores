import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { SectionHeading } from "./Brand";
import { SiteVideo } from "./SiteVideo";
import {
  GALLERY,
  GALLERY_CATEGORIES,
  REELS,
  srcAt,
  srcSet,
  type GalleryCategory,
} from "@/lib/media";
import { track } from "@/lib/tracking/datalayer";

type Filter = GalleryCategory | "todas";

export function Galeria() {
  const [filter, setFilter] = useState<Filter>("todas");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const items = useMemo(
    () => (filter === "todas" ? GALLERY : GALLERY.filter((item) => item.category === filter)),
    [filter],
  );
  const current = openIndex === null ? null : items[openIndex];

  const open = (index: number, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setOpenIndex(index);
    const item = items[index];
    if (item) track("gallery_view", { content_name: item.id, content_type: item.category });
  };

  const close = useCallback(() => {
    setOpenIndex(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const step = useCallback(
    (delta: number) => {
      if (openIndex === null) return;
      const next = (openIndex + delta + items.length) % items.length;
      setOpenIndex(next);
      const item = items[next];
      if (item) track("gallery_view", { content_name: item.id, content_type: item.category });
    },
    [items, openIndex],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [openIndex, close, step]);

  // Gestos de deslizar no celular.
  const touchX = useRef<number | null>(null);

  return (
    <section id="galeria" aria-labelledby="galeria-title" className="section-y bg-background">
      <div className="container-site">
        <SectionHeading
          id="galeria-title"
          kicker="Fotos e vídeos"
          title="Veja o Parque das Flores de perto"
        >
          <p>
            Imagens reais feitas com drone sobre o loteamento, vídeos de apresentação e os materiais
            de divulgação do empreendimento.
          </p>
        </SectionHeading>

        <div
          role="group"
          aria-label="Filtrar fotos"
          className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {GALLERY_CATEGORIES.map((category) => {
            const selected = filter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(category.id)}
                className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors ${
                  selected
                    ? "border-forest bg-forest text-cream"
                    : "border-border bg-card text-primary hover:border-forest/50"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {items.map((item, index) => {
            const featured = index === 0;
            return (
              <li key={item.id} className={featured ? "col-span-2 row-span-2" : ""}>
                <button
                  type="button"
                  onClick={(event) => open(index, event.currentTarget)}
                  className="group relative block size-full overflow-hidden rounded-lg bg-secondary"
                  aria-label={`Ampliar: ${item.caption}`}
                >
                  <img
                    src={srcAt(item, featured ? 1280 : 640)}
                    srcSet={srcSet(item)}
                    sizes={
                      featured
                        ? "(min-width: 1024px) 600px, 100vw"
                        : "(min-width: 1024px) 300px, 50vw"
                    }
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${featured ? "aspect-[4/3] h-full" : "aspect-[4/3]"}`}
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-[linear-gradient(0deg,rgba(10,30,20,0.78),transparent)] p-3 pt-10 text-left">
                    <span className="text-xs font-medium leading-snug text-cream sm:text-sm">
                      {item.caption}
                    </span>
                    <Expand className="size-4 shrink-0 text-cream/80" aria-hidden />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-16">
          <h3 className="font-display text-3xl text-primary sm:text-4xl">Vídeos de apresentação</h3>
          <ul className="-mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:thin] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {REELS.map((video) => (
              <li key={video.id} className="w-[72%] shrink-0 snap-start sm:w-auto">
                <SiteVideo video={video} />
                <p className="mt-3 text-base font-semibold text-primary">{video.title}</p>
                <p className="text-sm text-muted-foreground">{video.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {current && openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${openIndex + 1} de ${items.length}: ${current.caption}`}
          className="fixed inset-0 z-[90] flex flex-col bg-[rgba(8,22,15,0.96)] text-cream"
          onTouchStart={(event) => (touchX.current = event.touches[0]?.clientX ?? null)}
          onTouchEnd={(event) => {
            const start = touchX.current;
            const end = event.changedTouches[0]?.clientX;
            touchX.current = null;
            if (start === null || end === undefined || Math.abs(end - start) < 50) return;
            step(end < start ? 1 : -1);
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <span className="text-sm text-cream/75">
              {openIndex + 1} de {items.length}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              autoFocus
              className="grid size-11 place-items-center rounded-full hover:bg-cream/10"
            >
              <X className="size-6" aria-hidden />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
            <img
              key={current.id}
              src={srcAt(current, 1920)}
              srcSet={srcSet(current)}
              sizes="100vw"
              alt={current.alt}
              width={current.width}
              height={current.height}
              decoding="async"
              className="max-h-full w-auto max-w-full object-contain"
            />
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Foto anterior"
              className="absolute left-1 grid size-11 place-items-center rounded-full bg-black/40 hover:bg-black/60 sm:left-4 sm:size-12"
            >
              <ChevronLeft className="size-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Próxima foto"
              className="absolute right-1 grid size-11 place-items-center rounded-full bg-black/40 hover:bg-black/60 sm:right-4 sm:size-12"
            >
              <ChevronRight className="size-6" aria-hidden />
            </button>
          </div>
          <p className="px-6 py-4 text-center text-sm text-cream/85">
            {current.caption}
            {current.illustrative
              ? ""
              : current.category === "materiais"
                ? ""
                : " · Foto real do loteamento"}
          </p>
        </div>
      )}
    </section>
  );
}
