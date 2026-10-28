export const WHATSAPP_NUMBER = "5511948132388";
export const WHATSAPP_DISPLAY = "(11) 94813-2388";
export const CONTACT_EMAIL = "digitalfistpower@gmail.com";
export const CONTACT_NAME = "Aglemon Ribeiro";

export const PRICE = 90000;
export const DOWN_PAYMENT = 9000;
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
export const RESIDENTIAL_IPCA_SHORT_NOTICE =
  "com reajuste anual pelo IPCA, conforme contrato";
export const RESIDENTIAL_IPCA_DETAILS =
  "A parcela inicial é mantida durante cada período de 12 meses. O primeiro reajuste ocorre após 12 meses da data-base contratual e os seguintes são anuais, incidindo somente sobre as parcelas futuras vigentes, sem recalcular parcelas já pagas. Não há acréscimo de juros ou outros encargos sem previsão expressa no contrato.";
export const RESIDENTIAL_PROJECTION_NOTICE =
  "Os valores exibidos são iniciais, não projeções. Uma eventual projeção futura será apenas uma hipótese de simulação e dependerá das regras do contrato e do IPCA acumulado aplicável a cada período.";

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
