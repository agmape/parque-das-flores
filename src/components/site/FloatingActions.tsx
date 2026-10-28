import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-[80] flex flex-col items-end gap-3">
      <a
        href={whatsappLink("Olá! Quero informações sobre os lotes do Parque das Flores.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="btn-base btn-whatsapp !px-4 !py-3 !text-sm shadow-[var(--shadow-elegant)]"
      >
        <MessageCircle className="size-5" /><span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
