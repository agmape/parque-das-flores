import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Contato } from "@/components/site/Contato";
import { Sobre } from "@/components/site/Sobre";
import { Lotes } from "@/components/site/Lotes";
import { Galeria } from "@/components/site/Galeria";
import { Localizacao } from "@/components/site/Localizacao";
import { Queiroz } from "@/components/site/Queiroz";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Footer } from "@/components/site/Footer";
import {
  CONTACT_EMAIL,
  PHONE_TEL,
  SITE_LOCALITY,
  SITE_NAME,
  SITE_REGION,
  SITE_URL,
} from "@/lib/site";

const title = "Parque das Flores | Loteamento em Sacramento-MG";
const description =
  "Lotes residenciais de 200 m² e comerciais de 600 m² no Parque das Flores, em Sacramento-MG. Entrada residencial de R$ 9.000 e parcelas iniciais de 36 a 240 meses, com reajuste anual pelo IPCA.";
const canonical = `${SITE_URL}/`;
const ogImage = `${SITE_URL}/og-parque-das-flores.jpg`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: canonical,
      logo: `${SITE_URL}/icon-512.png`,
      email: CONTACT_EMAIL,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE_LOCALITY,
        addressRegion: SITE_REGION,
        addressCountry: "BR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: PHONE_TEL,
        contactType: "sales",
        areaServed: "BR",
        availableLanguage: "pt-BR",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: canonical,
      name: SITE_NAME,
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Vista aérea do Parque das Flores com as marcas Parque das Flores e Queiroz",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(structuredData) }],
  }),
});

function Index() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-cream focus:px-4 focus:py-2 focus:text-primary"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Contato />
        <Sobre />
        <Lotes />
        <Galeria />
        <Localizacao />
        <Queiroz />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
