import { Logo } from "./Brand";
import { CONTACT_EMAIL, CONTACT_NAME, WHATSAPP_DISPLAY } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-forest-deep py-12 text-cream/70">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Logo className="w-[200px] rounded-sm" />
            <p className="mt-4 text-sm text-cream">Seu futuro floresce aqui.</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold">
              Loteamento · Sacramento — MG
            </p>
          </div>
          <div className="text-sm">
            <p>{CONTACT_NAME} · {WHATSAPP_DISPLAY}</p>
            <p className="mt-1">{CONTACT_EMAIL}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between"><nav className="flex flex-wrap gap-5 text-sm">{[["#sobre","O Parque"],["#lotes","Lotes"],["#localizacao","Localização"],["#contato","Contato"]].map(([href,label])=><a key={href} href={href} className="hover:text-cream">{label}</a>)}</nav><div><p className="mb-3 text-xs text-cream/80">Um empreendimento</p><Logo developer className="w-28 rounded-sm"/></div></div>
        <p className="mt-10 border-t border-cream/10 pt-6 text-xs leading-relaxed text-cream/50">
          Imagens aéreas do local e planta urbanística do projeto aprovado. Valores e condições
          sujeitos a alteração sem aviso prévio. As parcelas residenciais divulgadas são iniciais,
          com reajuste anual pelo IPCA, conforme contrato. Este material não constitui promessa de
          rentabilidade.
        </p>
      </div>
    </footer>
  );
}
