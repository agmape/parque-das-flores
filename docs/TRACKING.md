# Rastreamento: GTM, GA4, Google Ads e consentimento

## Visão geral

O site carrega **um único script**: o Google Tag Manager.
Tudo o mais (GA4, Google Ads, remarketing, pixels) é configurado **dentro do GTM**.

| Item | Onde |
| --- | --- |
| ID do contêiner | `src/lib/tracking/config.ts` (`GTM-PLJLPM8D`, o contêiner já usado no site) ou variável `VITE_GTM_ID` na Vercel |
| Instalação (head + noscript) | `src/routes/__root.tsx` |
| Consent Mode v2 (padrão negado) | `src/lib/tracking/consent.ts` → script inline executado antes do GTM |
| Aviso de cookies | `src/components/site/CookieConsent.tsx` |
| Helper do dataLayer | `src/lib/tracking/datalayer.ts` → `track(evento, parâmetros)` |
| Escuta de cliques e page_view | `src/components/site/TrackingListener.tsx` |
| Parâmetros de campanha | `src/lib/tracking/attribution.ts` |

## Eventos enviados ao `window.dataLayer`

Todos incluem `page_location` e `page_title`. **Nenhum inclui nome, telefone, e-mail ou CPF.**

| Evento | Quando | Parâmetros |
| --- | --- | --- |
| `page_view` | Carregamento da página (e mudança de rota) | — |
| `cta_click` | Clique em botão/link com `data-cta` (exceto WhatsApp e telefone) | `cta_name`, `link_url`, `contact_method` (e-mail) |
| `click_whatsapp` | Clique em qualquer link `wa.me` | `cta_name`, `contact_method: whatsapp`, `link_url` (sem número/mensagem) |
| `click_phone` | Clique em link `tel:` | `cta_name`, `contact_method: phone` |
| `form_start` | Primeira interação com o formulário | `form_name` |
| `generate_lead` | **Somente após** o Formspree confirmar o envio | `form_name`, `contact_method: form` |
| `map_click` | "Abrir mapa interativo" ou "Traçar rota" | `cta_name`, `contact_method: map` |
| `gallery_view` | Foto ampliada na galeria (inclui navegar entre fotos) | `content_name`, `content_type` |
| `video_play` | Primeiro play de cada vídeo | `content_name`, `content_type: video` |
| `consent_update` | Visitante salva a escolha de cookies | `consent_analytics`, `consent_marketing` |

Nomes de CTA usados: `header_whatsapp`, `menu_whatsapp`, `hero_whatsapp`, `hero_receber_informacoes`,
`hero_assistir_video`, `contato_whatsapp`, `contato_telefone`, `contato_email`, `contato_sucesso_whatsapp`,
`lotes_residencial_whatsapp`, `lotes_comercial_whatsapp`, `lotes_tabela_whatsapp`, `queiroz_whatsapp`,
`rodape_whatsapp`, `rodape_telefone`, `rodape_email`, `flutuante_whatsapp`, `404_whatsapp`.

## Configuração sugerida no GTM

1. **Variáveis da camada de dados**: `cta_name`, `form_name`, `contact_method`, `content_name`, `content_type`, `link_url`.
2. **Acionadores** do tipo *Evento personalizado* com os nomes da tabela acima.
3. **GA4**: tag do Google com o ID de medição (`G-…`). Como o site envia `page_view` próprio, desative o page_view automático da tag do Google *ou* não crie uma tag para o evento `page_view` — use um dos dois para não contar em dobro.
4. **Google Ads** (quando houver Conversion ID e Label reais):
   - Tag *Conversion Linker* em todas as páginas;
   - Tag *Acompanhamento de conversões do Google Ads* acionada por `generate_lead` (e, se quiser, `click_whatsapp`);
   - Remarketing só se autorizado e com consentimento de marketing.
5. **Consentimento**: em *Admin → Configurações do contêiner*, ative a visão geral de consentimento e marque as tags do Google com "consentimento integrado". Os sinais `analytics_storage`, `ad_storage`, `ad_user_data` e `ad_personalization` já chegam corretos do site.

## Consent Mode v2

- Padrão antes de qualquer tag: tudo **negado**, exceto `functionality_storage` e `security_storage`.
- `ads_data_redaction` e `url_passthrough` ativos (preserva o `gclid` nas URLs sem cookies de anúncio).
- A escolha do visitante fica em `localStorage` (`pdf_consent_v1`) e é reaplicada no próximo carregamento.
- "Preferências de cookies", no rodapé, reabre o painel.
- Nada é considerado aceito automaticamente.

## Parâmetros de campanha

`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `gbraid`, `wbraid`
são lidos da URL e guardados na sessão (`sessionStorage`), além da página de entrada e do referenciador.
A URL **não é alterada** e não há redirects que removam parâmetros.
No envio do formulário eles seguem junto com o lead como campos `origem_*` (Formspree) e
`attribution` (webhook do CRM). Eles **não** são enviados ao dataLayer.

## Formulário: envio e logs

O formulário chama a função do servidor `submitLeadServer` (`src/lib/leads.functions.ts`).
Ela envia pelo Resend (se `RESEND_API_KEY`, `LEAD_EMAIL_TO` e `LEAD_EMAIL_FROM` existirem) ou pelo Formspree (`FORMSPREE_FORM_ID`, padrão `mbgjjlle`).
Cada envio grava em Vercel → Logs uma linha `{"scope":"lead","step":"send","ref":…,"provider":…,"ok":…,"status":…}` sem nome, telefone nem e-mail completo.
O código `ref` aparece para o visitante quando o envio falha, para localizar o log.

## CRM / webhook

Defina `LEAD_WEBHOOK_URL` (e opcionalmente `LEAD_WEBHOOK_SECRET`) nas variáveis da Vercel.
Cada lead confirmado é encaminhado pelo servidor (`src/lib/leads.functions.ts`) como JSON.
Sem a variável, nada é enviado. Nenhum endpoint é presumido.
