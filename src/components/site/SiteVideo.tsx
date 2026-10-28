import { useState } from "react";
import { cn } from "@/lib/utils";

type SiteVideoProps = {
  src: string;
  poster: string;
  label: string;
  portrait?: boolean;
};

export function SiteVideo({ src, poster, label, portrait = false }: SiteVideoProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="overflow-hidden border border-border bg-forest-deep">
      <video
        controls
        playsInline
        preload="none"
        poster={poster}
        aria-label={label}
        className={cn("block w-full bg-forest-deep object-contain", portrait ? "aspect-[9/16]" : "aspect-video")}
        onError={() => setFailed(true)}
        onPlay={(event) => {
          document.querySelectorAll("video").forEach((video) => {
            if (video !== event.currentTarget) video.pause();
          });
        }}
      >
        <source src={src} type="video/mp4" />
        Seu navegador não suporta a reprodução deste vídeo.
      </video>
      {failed && (
        <p className="p-4 text-sm text-cream">
          Não foi possível carregar o vídeo. <a href={src} target="_blank" rel="noopener noreferrer" className="underline">Abrir vídeo</a>
        </p>
      )}
    </div>
  );
}