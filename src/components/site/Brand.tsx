import type { ReactNode } from "react";
import logoCreme from "@/assets/logo-parque-das-flores-creme.webp";
import logoQueiroz from "@/assets/logo-queiroz-50-anos.webp";
import logoEscuro from "@/assets/logo-parque-queiroz-escuro.webp";

type LogoVariant = "creme" | "escuro" | "queiroz";

const LOGOS: Record<LogoVariant, { src: string; width: number; height: number; alt: string }> = {
  creme: {
    src: logoCreme,
    width: 640,
    height: 201,
    alt: "Parque das Flores · Um empreendimento Queiroz — 50 anos",
  },
  escuro: {
    src: logoEscuro,
    width: 640,
    height: 240,
    alt: "Parque das Flores · Um empreendimento Queiroz — 50 anos",
  },
  queiroz: {
    src: logoQueiroz,
    width: 420,
    height: 354,
    alt: "Queiroz Construtora e Loteadora — 50 anos",
  },
};

export function Logo({
  variant = "creme",
  className = "",
  priority = false,
}: {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
}) {
  const logo = LOGOS[variant];
  return (
    <img
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      className={`h-auto object-contain ${className}`}
    />
  );
}

export function SectionHeading({
  kicker,
  title,
  children,
  id,
  tone = "light",
  className = "",
}: {
  kicker?: string;
  title: string;
  children?: ReactNode;
  id?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {kicker && <p className={tone === "dark" ? "kicker !text-gold-soft" : "kicker"}>{kicker}</p>}
      <h2
        id={id}
        className={`mt-2 font-display text-[2.25rem] sm:text-5xl ${tone === "dark" ? "text-cream" : "text-primary"}`}
      >
        {title}
      </h2>
      {children && (
        <div
          className={`mt-5 text-base leading-relaxed sm:text-lg ${tone === "dark" ? "text-cream/80" : "text-muted-foreground"}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
