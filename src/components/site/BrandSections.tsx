import { Home, Store, MapPin, ShieldCheck, Leaf, TrendingUp, ArrowUpRight, Expand, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Logo, SectionTitle } from "./Brand";
import { Reveal } from "./Reveal";
import { whatsappLink } from "@/lib/site";
import flyer from "@/assets/material-lotes.webp.asset.json";
import banner from "@/assets/material-horizontal.webp.asset.json";
import institutional from "@/assets/identidade-institucional.jpeg.asset.json";
import sunsetCampaign from "@/assets/campanha-por-do-sol.png.asset.json";
import futureCampaign from "@/assets/campanha-seu-futuro.png.asset.json";

export function LotTypes() {
  return <section id="lotes" className="bg-secondary py-20 sm:py-24"><div className="mx-auto max-w-7xl px-5 lg:px-10"><SectionTitle eyebrow="Residenciais e comerciais">Escolha o espaço para o seu futuro</SectionTitle><div className="mt-10 grid gap-6 md:grid-cols-2">{[
    { icon: Home, name: "Residencial", area: "200 m²", text: "Espaço para construir sua casa e viver com mais tranquilidade." },
    { icon: Store, name: "Comercial", area: "600 m²", text: "Espaço para investir, empreender e crescer em uma região com potencial de valorização." },
  ].map(lot => <Reveal key={lot.name}><article className="card-premium flex h-full flex-col p-7 sm:p-10"><lot.icon className="size-9 text-primary" strokeWidth={1.5}/><h3 className="mt-6 text-lg font-medium text-primary">Lote {lot.name.toLowerCase()}</h3><p className="mt-3 font-display text-5xl text-primary">{lot.area}</p><p className="mt-5 max-w-md leading-relaxed text-muted-foreground">{lot.text}</p><Button asChild variant="outline" className="mt-8 h-auto self-start whitespace-normal border-primary px-5 py-4 text-primary hover:bg-secondary"><a href={whatsappLink(`Olá! Quero conhecer os lotes ${lot.name.toLowerCase() === "residencial" ? "residenciais" : "comerciais"} do Parque das Flores.`)} target="_blank" rel="noopener noreferrer">Conhecer lotes {lot.name.toLowerCase() === "residencial" ? "residenciais" : "comerciais"}<ArrowUpRight/></a></Button></article></Reveal>)}</div></div></section>;
}

export function BrandBenefits() {
  return <section className="bg-background py-20"><div className="mx-auto max-w-7xl px-5 lg:px-10"><SectionTitle eyebrow="O seu próximo capítulo">Um lugar completo para viver bem</SectionTitle><div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{[{icon:MapPin,title:"Localização privilegiada"},{icon:ShieldCheck,title:"Segurança e tranquilidade"},{icon:Leaf,title:"Qualidade de vida"},{icon:TrendingUp,title:"Excelente potencial de valorização"}].map(item=><div key={item.title} className="border-t border-border pt-7"><item.icon className="size-8 text-leaf" strokeWidth={1.5}/><h3 className="mt-5 text-xl leading-relaxed text-primary">{item.title}</h3></div>)}</div></div></section>;
}

function ImageLightbox({ src, label }: { src: string; label: string }) {
  return <Dialog><DialogTrigger asChild><Button variant="outline" className="mt-6 h-auto whitespace-normal border-primary px-5 py-4 text-primary"><Expand/>Ver material completo</Button></DialogTrigger><DialogContent className="z-[100] max-h-[92svh] w-[calc(100%-2rem)] max-w-6xl overflow-auto"><DialogTitle>{label}</DialogTitle><DialogDescription className="sr-only">Material original do Parque das Flores.</DialogDescription><img src={src} alt={label} className="max-h-[76svh] w-full object-contain"/></DialogContent></Dialog>;
}

export function DeveloperSection() {
  return <section id="queiroz" className="bg-secondary py-20 sm:py-24"><div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-[minmax(0,1fr)_300px] lg:px-10"><div><SectionTitle eyebrow="Um empreendimento Queiroz">50 anos construindo histórias</SectionTitle><p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">Parque das Flores é um empreendimento realizado pela Queiroz Construtora e Loteadora.</p><p className="mt-4 leading-relaxed text-muted-foreground">Um empreendimento com a experiência de quem constrói há 50 anos.</p><ImageLightbox src={institutional.url} label="Parque das Flores e Queiroz — identidade institucional"/></div><Logo developer className="mx-auto w-56 rounded-md"/></div></section>;
}

export function PromotionalMaterials() {
  return <section id="material" className="bg-background py-20 sm:py-24"><div className="mx-auto max-w-7xl px-5 lg:px-10"><div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"><div><SectionTitle eyebrow="Seu futuro floresce aqui">Conheça o Parque das Flores</SectionTitle><p className="mt-6 leading-relaxed text-muted-foreground">Lotes residenciais de 200 m² e comerciais de 600 m² em Sacramento-MG. Um novo lugar para morar, investir e construir seu futuro.</p><ImageLightbox src={flyer.url} label="Parque das Flores — lotes residenciais e comerciais"/></div><img src={flyer.url} alt="Parque das Flores — material promocional dos lotes residenciais e comerciais" loading="lazy" width={1080} height={1920} className="mx-auto h-auto w-full max-w-[420px] object-contain lg:max-w-[480px]"/></div><div className="mt-16 border-t border-border pt-10"><img src={banner.url} alt="Parque das Flores — Seu futuro floresce aqui, campanha horizontal" width={1920} height={720} loading="lazy" className="h-auto w-full object-contain"/><ImageLightbox src={banner.url} label="Seu futuro floresce aqui — campanha Parque das Flores"/></div><div className="mt-12 grid gap-10 lg:grid-cols-2">{[{asset:sunsetCampaign,label:"Parque das Flores ao pôr do sol",width:1365,height:768},{asset:futureCampaign,label:"Seu futuro floresce aqui — lotes residenciais e comerciais",width:1920,height:720}].map(item=><figure key={item.asset.url} className="min-w-0"><img src={item.asset.url} alt={item.label} width={item.width} height={item.height} loading="lazy" className="h-auto w-full object-contain"/><figcaption className="mt-3 text-xs text-muted-foreground">Imagem ilustrativa · Material promocional</figcaption><ImageLightbox src={item.asset.url} label={item.label}/></figure>)}</div></div></section>;
}

export function CTASection() {
  return <section className="surface-forest py-20"><div className="mx-auto max-w-7xl px-5 text-center lg:px-10"><p className="eyebrow">Parque das Flores · Sacramento-MG</p><h2 className="mt-5 font-display text-4xl text-cream sm:text-5xl">Seu futuro floresce aqui.</h2><p className="mt-5 text-cream/85">Encontre o espaço para a sua próxima conquista.</p><Button asChild className="mt-8 h-auto whitespace-normal bg-cream px-7 py-4 text-primary hover:bg-secondary"><a href={whatsappLink("Olá! Quero falar com um consultor do Parque das Flores.")} target="_blank" rel="noopener noreferrer"><MessageCircle/>Falar com um consultor</a></Button></div></section>;
}