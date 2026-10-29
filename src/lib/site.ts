// Fonte única dos dados comerciais e de contato exibidos no site.
// Altere valores aqui para mantê-los consistentes em todas as seções.

export const SITE_NAME = "Parque das Flores";
export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://parquedasflores.life").replace(
  /\/$/,
  "",
);
export const SITE_LOCALITY = "Sacramento";
export const SITE_REGION = "MG";

// WhatsApp oficial do site — ÚNICA fonte do número.
// Links (wa.me), número exibido, telefone (tel:) e dados estruturados derivam daqui.
// Formato: 55 + DDD + número, só dígitos.
export const WHATSAPP_NUMBER = "5511941691989";

/** "5511941691989" → "(11) 94169-1989" */
export function formatBrazilPhone(digits: string) {
  const local = digits.replace(/\D/g, "").replace(/^55/, "");
  const ddd = local.slice(0, 2);
  const rest = local.slice(2);
  const split = rest.length === 9 ? 5 : 4;
  return `(${ddd}) ${rest.slice(0, split)}-${rest.slice(split)}`;
}

export const WHATSAPP_DISPLAY = formatBrazilPhone(WHATSAPP_NUMBER);
export const PHONE_TEL = `+${WHATSAPP_NUMBER}`;
export const CONTACT_EMAIL = "digitalfistpower@gmail.com";
export const CONTACT_NAME = "Aglemon Ribeiro";

export const PRICE = 90000;
export const DOWN_PAYMENT = 9000;
export const COMMERCIAL_PRICE = 300000;
export const COMMERCIAL_MAX_PRICE = 360000;
export const COMMERCIAL_PRICE_PER_SQM = 500;

export const RESIDENTIAL_PLANS = [
  { months: 36, installment: 2644.17 },
  { months: 48, installment: 2085.63 },
  { months: 60, installment: 1753.07 },
  { months: 90, installment: 1317.01 },
  { months: 120, installment: 1106.62 },
  { months: 150, installment: 986.22 },
  { months: 180, installment: 910.5 },
  { months: 240, installment: 825.08 },
] as const;
export const MAX_RESIDENTIAL_INSTALLMENTS = 240;
export const RESIDENTIAL_IPCA_SHORT_NOTICE = "com reajuste anual pelo IPCA, conforme contrato";
export const RESIDENTIAL_IPCA_DETAILS =
  "A parcela inicial é mantida durante cada período de 12 meses. O primeiro reajuste ocorre após 12 meses da data-base contratual e os seguintes são anuais, incidindo somente sobre as parcelas futuras vigentes, sem recalcular parcelas já pagas. Não há acréscimo de juros ou outros encargos sem previsão expressa no contrato.";
export const RESIDENTIAL_PROJECTION_NOTICE =
  "Os valores exibidos são iniciais, não projeções. Uma eventual projeção futura será apenas uma hipótese de simulação e dependerá das regras do contrato e do IPCA acumulado aplicável a cada período.";

// Números do projeto urbanístico (conteúdo original do site).
export const PROJECT_FACTS = {
  totalLots: 235,
  residentialLots: 189,
  commercialLots: 46,
  blocks: 12,
  lotsArea: "66.982 m²",
  greenArea: "14.015 m²",
  institutionalArea: "5.489 m²",
  residentialSize: "200 m²",
  commercialSize: "600 m²",
} as const;

export const brl = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

export const residentialInstallmentNotice = (value: number) =>
  `Parcelas iniciais de ${brl(value)}, ${RESIDENTIAL_IPCA_SHORT_NOTICE}.`;

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const mailtoLink = (subject: string, body: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
