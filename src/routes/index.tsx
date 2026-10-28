import { createFileRoute } from "@tanstack/react-router";
import { LotTypes, BrandBenefits, DeveloperSection, PromotionalMaterials, CTASection } from "@/components/site/BrandSections";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Sobre } from "@/components/site/Sobre";
import { Valores } from "@/components/site/Valores";
import { Galeria } from "@/components/site/Galeria";
import { TourAereo } from "@/components/site/TourAereo";
import { Planta } from "@/components/site/Planta";
import { Disponibilidade } from "@/components/site/Disponibilidade";
import { Localizacao } from "@/components/site/Localizacao";
import { Oportunidade } from "@/components/site/Oportunidade";
import { Contato } from "@/components/site/Contato";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Footer } from "@/components/site/Footer";

const title = "Parque das Flores | Loteamento em Sacramento-MG";
const description =
  "Lotes residenciais e comerciais no Parque das Flores em Sacramento-MG. Entrada residencial de R$ 9.000 e parcelas iniciais de 36 a 240 meses, com reajuste anual pelo IPCA.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "loteamento em Sacramento MG, lotes em Sacramento, terreno parcelado, lote residencial, lote comercial, Parque das Flores, investimento imobiliário",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          name: "Parque das Flores — Loteamento em Sacramento-MG",
          description,
          url: "/",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Sacramento",
            addressRegion: "MG",
            addressCountry: "BR",
          },
          offers: {
            "@type": "Offer",
            price: 90000,
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
          },
          telephone: "+5511948132388",
          email: "digitalfistpower@gmail.com",
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <main>
      <Header />
      <Hero />
      <Contato />
      <Disponibilidade />
      <Sobre />
      <LotTypes />
      <BrandBenefits />
      <TourAereo />
      <Valores />
      <Galeria />
      <Planta />
      <Localizacao />
      <Oportunidade />
      <DeveloperSection />
      <PromotionalMaterials />
      <CTASection />
      <FloatingActions />
      <Footer />
    </main>
  );
}
