import logo from "@/assets/logo-completo-creme.png";
import queiroz from "@/assets/queiroz-original.webp.asset.json";
import type { ReactNode } from "react";

export function Logo({ developer = false, className = "" }: { developer?: boolean; className?: string }) {
  return <img src={developer ? queiroz.url : logo} alt={developer ? "Queiroz Construtora e Loteadora — 50 anos" : "Parque das Flores · Um empreendimento Queiroz — 50 anos"} width={developer ? 508 : 1881} height={developer ? 427 : 592} className={`object-contain ${className}`} />;
}

export function SectionTitle({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return <div className="max-w-3xl"><p className="eyebrow">{eyebrow}</p><h2 className="mt-4 font-display text-3xl leading-tight text-primary sm:text-4xl">{children}</h2></div>;
}