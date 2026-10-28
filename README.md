# Parque das Flores — site do loteamento

Site do loteamento **Parque das Flores** (Sacramento-MG), um empreendimento Queiroz.
Migrado da Lovable para **GitHub + Vercel**, sem dependências da infraestrutura da Lovable.

- Framework: [TanStack Start](https://tanstack.com/start) (React 19, SSR) + Vite + Tailwind CSS 4
- Servidor: Nitro (na Vercel, o preset `vercel` é detectado automaticamente)
- Gerenciador de pacotes: Bun (`bun.lock`); npm também funciona

## Rodar localmente

```sh
bun install        # ou: npm install
bun run dev        # http://localhost:3000
bun run typecheck  # verificação de tipos
bun run lint       # ESLint
bun run build      # build de produção
```

## Estrutura

| Pasta / arquivo | Conteúdo |
| --- | --- |
| `src/routes/__root.tsx` | `<head>` global, Consent Mode, GTM, página 404 |
| `src/routes/index.tsx` | Página inicial, SEO (title, canonical, Open Graph, JSON-LD) |
| `src/components/site/` | Seções do site |
| `src/lib/site.ts` | **Dados comerciais e de contato** (preços, parcelas, WhatsApp) |
| `src/lib/media.ts` | Catálogo de fotos e vídeos |
| `src/lib/leads.ts` | Envio do formulário (Formspree) + encaminhamento opcional ao CRM |
| `src/lib/tracking/` | GTM, dataLayer, Consent Mode v2 e parâmetros de campanha |
| `public/media/` | Fotos (WebP em 3 tamanhos) e vídeos (MP4 H.264) |
| `docs/` | Rastreamento, inventário de assets e originais |

## Variáveis de ambiente

Veja `.env.example`. Nenhuma é obrigatória para o site funcionar.
Segredos (por exemplo, a URL do webhook do CRM) ficam só nas variáveis da Vercel.

## Deploy

Cada push numa branch gera um **Preview** na Vercel. A produção só deve ser
atualizada com merge na `main`, após aprovação.

Documentação complementar:
- [docs/TRACKING.md](docs/TRACKING.md) — GTM, GA4, Google Ads, eventos e consentimento
- [docs/ASSETS.md](docs/ASSETS.md) — origem de cada imagem/vídeo e o que ainda falta recuperar
