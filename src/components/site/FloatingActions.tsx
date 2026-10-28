import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export function FloatingActions() {
  return (
    <a
      href={whatsappLink("Olá! Quero informações sobre os lotes do Parque das Flores.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      data-cta="flutuante_whatsapp"
      className="floating-whatsapp btn-base btn-whatsapp fixed bottom-4 right-4 z-[70] !min-h-14 !px-4 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.45)] transition-[bottom] duration-300 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="size-6" aria-hidden />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
