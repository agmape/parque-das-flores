# Notas para quem for alterar este projeto

- Dados comerciais (preços, entrada, parcelas, IPCA, contato) ficam só em `src/lib/site.ts`. Não altere valores sem confirmação do proprietário.
- Manter um único formulário de contato perto do início da página (seção `#contato`), com envio pelo Formspree já existente (`src/lib/leads.ts`).
- Rastreamento: o site carrega apenas o Google Tag Manager (`src/lib/tracking/config.ts`). GA4 e Google Ads são configurados dentro do GTM. Nunca enviar dados pessoais ao `dataLayer`. `generate_lead` só após envio confirmado.
- Consentimento: padrão negado (Consent Mode v2); o estado muda apenas pela escolha do visitante no aviso de cookies.
- Imagens e vídeos reais ficam em `public/media` e são catalogados em `src/lib/media.ts`. Não usar placeholders nem imagens inventadas; materiais de campanha são marcados como ilustrativos.
- Vídeos: `preload="none"` e pôster leve; o vídeo de fundo do topo só toca em telas largas sem economia de dados.
- Não alterar domínio/DNS nem fazer deploy de produção sem autorização.
