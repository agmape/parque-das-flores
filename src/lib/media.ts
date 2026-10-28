// Catálogo de imagens e vídeos reais do empreendimento.
//
// Fotos aéreas: quadros extraídos do vídeo de drone original do loteamento
// (arquivo enviado pelo proprietário). Materiais: artes de campanha enviadas
// pelo proprietário. Arquivos em public/media, otimizados em WebP.

export type GalleryCategory = "aereas" | "lotes" | "acessos" | "obras" | "materiais";

export const GALLERY_CATEGORIES: { id: GalleryCategory | "todas"; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "aereas", label: "Vista aérea" },
  { id: "lotes", label: "Quadras e lotes" },
  { id: "acessos", label: "Acessos e entorno" },
  { id: "obras", label: "Obras" },
  { id: "materiais", label: "Materiais" },
];

export type GalleryImage = {
  id: string;
  base: string; // caminho sem o sufixo "-{largura}.webp"
  widths: number[];
  width: number; // dimensões da maior versão
  height: number;
  alt: string;
  caption: string;
  category: GalleryCategory;
  illustrative?: boolean;
};

const AERIAL = { widths: [640, 1280, 1920], width: 1920, height: 1080 };

export const GALLERY: GalleryImage[] = [
  {
    id: "vista-aerea-cidade-ao-fundo",
    base: "/media/galeria/vista-aerea-cidade-ao-fundo",
    ...AERIAL,
    alt: "Vista aérea das quadras do Parque das Flores com a cidade de Sacramento-MG ao fundo",
    caption: "O loteamento e a cidade de Sacramento ao fundo",
    category: "aereas",
  },
  {
    id: "quadras-vias-abertas",
    base: "/media/galeria/quadras-vias-abertas",
    ...AERIAL,
    alt: "Quadras do Parque das Flores com as vias internas abertas, vistas do alto",
    caption: "Quadras com as vias internas abertas",
    category: "lotes",
  },
  {
    id: "panorama-loteamento-sacramento",
    base: "/media/galeria/panorama-loteamento-sacramento",
    ...AERIAL,
    alt: "Panorama aéreo do loteamento e da malha urbana de Sacramento-MG",
    caption: "Panorama do loteamento e da malha urbana",
    category: "aereas",
  },
  {
    id: "vias-internas-quadras",
    base: "/media/galeria/vias-internas-quadras",
    ...AERIAL,
    alt: "Vias internas abertas entre as quadras do Parque das Flores",
    caption: "Vias internas entre as quadras",
    category: "lotes",
  },
  {
    id: "quadras-avenida-rotatoria",
    base: "/media/galeria/quadras-avenida-rotatoria",
    ...AERIAL,
    alt: "Quadras do loteamento ao lado da avenida e da rotatória de acesso",
    caption: "Quadras junto à avenida e à rotatória",
    category: "acessos",
  },
  {
    id: "avenida-rotatoria-quadras",
    base: "/media/galeria/avenida-rotatoria-quadras",
    ...AERIAL,
    alt: "Avenida e rotatória vistas do alto, ao lado das quadras do Parque das Flores",
    caption: "Avenida e rotatória ao lado do loteamento",
    category: "acessos",
  },
  {
    id: "avenida-acesso-quadras",
    base: "/media/galeria/avenida-acesso-quadras",
    ...AERIAL,
    alt: "Avenida de acesso margeando as quadras do loteamento",
    caption: "Avenida de acesso e quadras",
    category: "acessos",
  },
  {
    id: "quadras-cidade-ao-fundo",
    base: "/media/galeria/quadras-cidade-ao-fundo",
    ...AERIAL,
    alt: "Quadras do Parque das Flores com bairros de Sacramento ao fundo",
    caption: "Quadras e bairros vizinhos",
    category: "aereas",
  },
  {
    id: "vista-de-cima-quadras",
    base: "/media/galeria/vista-de-cima-quadras",
    ...AERIAL,
    alt: "Vista de cima das quadras e das vias do loteamento",
    caption: "Vista de cima das quadras",
    category: "lotes",
  },
  {
    id: "obras-terraplenagem-rotatoria",
    base: "/media/galeria/obras-terraplenagem-rotatoria",
    ...AERIAL,
    alt: "Caminhões e máquinas em obra perto da rotatória, ao lado do loteamento",
    caption: "Máquinas em obra perto da rotatória",
    category: "obras",
  },
  {
    id: "caminhoes-escavadeira-obra",
    base: "/media/galeria/caminhoes-escavadeira-obra",
    ...AERIAL,
    alt: "Caminhões e escavadeira trabalhando junto à via asfaltada",
    caption: "Caminhões e escavadeira em obra",
    category: "obras",
  },
  {
    id: "vista-aerea-identidade",
    base: "/media/materiais/vista-aerea-identidade",
    widths: [640, 1280, 1672],
    width: 1672,
    height: 941,
    alt: "Foto aérea do loteamento com as marcas Parque das Flores e Queiroz",
    caption: "Material de divulgação",
    category: "materiais",
  },
  {
    id: "campanha-por-do-sol",
    base: "/media/materiais/campanha-por-do-sol",
    widths: [640, 1280, 1672],
    width: 1672,
    height: 941,
    alt: "Arte de campanha do Parque das Flores ao pôr do sol",
    caption: "Campanha · imagem ilustrativa",
    category: "materiais",
    illustrative: true,
  },
  {
    id: "campanha-seu-futuro-horizontal",
    base: "/media/materiais/campanha-seu-futuro-horizontal",
    widths: [640, 1280, 2048],
    width: 2048,
    height: 768,
    alt: "Arte Seu futuro floresce aqui: lotes comerciais de 600 m² e residenciais de 200 m²",
    caption: "Campanha · imagem ilustrativa",
    category: "materiais",
    illustrative: true,
  },
  {
    id: "material-lotes-vertical",
    base: "/media/materiais/material-lotes-vertical",
    widths: [480, 960],
    width: 960,
    height: 1440,
    alt: "Material vertical com os lotes comerciais de 600 m² e residenciais de 200 m²",
    caption: "Material dos lotes · imagem ilustrativa",
    category: "materiais",
    illustrative: true,
  },
];

export function srcSet(image: Pick<GalleryImage, "base" | "widths">) {
  return image.widths.map((w) => `${image.base}-${w}.webp ${w}w`).join(", ");
}

export function srcAt(image: Pick<GalleryImage, "base" | "widths">, target: number) {
  const width = image.widths.find((w) => w >= target) ?? image.widths[image.widths.length - 1];
  return `${image.base}-${width}.webp`;
}

export const HERO_IMAGE = GALLERY[0]!;

export type SiteVideoItem = {
  id: string;
  src: string;
  poster: string;
  title: string;
  description: string;
  portrait: boolean;
};

export const MAIN_VIDEO: SiteVideoItem = {
  id: "aereo",
  src: "/media/videos/parque-das-flores-aereo.mp4",
  poster: "/media/videos/poster-aereo.webp",
  title: "Voo de drone sobre o Parque das Flores",
  description: "Quadras, vias abertas, acessos e a cidade de Sacramento vistos do alto.",
  portrait: false,
};

export const REELS: SiteVideoItem[] = [
  {
    id: "sua-vida",
    src: "/media/videos/parque-das-flores-sua-vida.mp4",
    poster: "/media/videos/poster-sua-vida.webp",
    title: "Sua vida no Parque das Flores",
    description: "Lotes no melhor ponto e infraestrutura do loteamento.",
    portrait: true,
  },
  {
    id: "ponto-de-partida",
    src: "/media/videos/parque-das-flores-ponto-de-partida.mp4",
    poster: "/media/videos/poster-ponto-de-partida.webp",
    title: "Um novo ponto de partida",
    description: "Lotes residenciais a partir de 200 m².",
    portrait: true,
  },
  {
    id: "apresentacao",
    src: "/media/videos/parque-das-flores-apresentacao.mp4",
    poster: "/media/videos/poster-apresentacao.webp",
    title: "Apresentação do Parque das Flores",
    description: "Vídeo de apresentação do empreendimento.",
    portrait: true,
  },
];

export const HERO_LOOP = "/media/videos/hero-loop.mp4";
