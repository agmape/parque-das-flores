import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SiteVideoItem } from "@/lib/media";
import { track } from "@/lib/tracking/datalayer";

/**
 * Vídeo com pôster leve. Nada do arquivo é baixado até o visitante tocar no play
 * (preload="none"); ao tocar, os outros vídeos da página são pausados.
 */
export function SiteVideo({ video, className }: { video: SiteVideoItem; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const tracked = useRef(false);

  const start = () => {
    setActive(true);
    requestAnimationFrame(() => void ref.current?.play().catch(() => undefined));
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-forest-deep",
        video.portrait ? "aspect-[9/16]" : "aspect-video",
        className,
      )}
    >
      <video
        ref={ref}
        controls={active}
        playsInline
        preload="none"
        poster={video.poster}
        aria-label={video.title}
        className="absolute inset-0 size-full bg-forest-deep object-cover"
        onError={() => setFailed(true)}
        onPlay={(event) => {
          setActive(true);
          document.querySelectorAll("video").forEach((other) => {
            if (other !== event.currentTarget && !other.muted) other.pause();
          });
          if (!tracked.current) {
            tracked.current = true;
            track("video_play", { content_name: video.title, content_type: "video" });
          }
        }}
      >
        <source src={video.src} type="video/mp4" />
      </video>

      {!active && (
        <button
          type="button"
          onClick={start}
          aria-label={`Assistir: ${video.title}`}
          className="group absolute inset-0 grid place-items-center bg-[linear-gradient(0deg,rgba(10,30,20,0.55),transparent_55%)]"
        >
          <span className="grid size-16 place-items-center rounded-full bg-cream/95 text-forest shadow-lg transition-transform group-hover:scale-105 sm:size-20">
            <Play className="ml-1 size-7 sm:size-8" fill="currentColor" aria-hidden />
          </span>
        </button>
      )}

      {failed && (
        <p className="absolute inset-x-0 bottom-0 bg-forest-deep/90 p-3 text-sm text-cream">
          Não foi possível carregar o vídeo.{" "}
          <a href={video.src} target="_blank" rel="noopener noreferrer" className="underline">
            Abrir em outra aba
          </a>
        </p>
      )}
    </div>
  );
}
