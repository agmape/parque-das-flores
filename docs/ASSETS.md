# Inventário de imagens e vídeos

## Por que as imagens quebraram fora da Lovable

O ZIP exportado da Lovable não trazia as imagens nem os vídeos: em `src/assets` havia
**38 arquivos `.asset.json`**, que são apenas ponteiros. Cada um aponta para um caminho
`/__l5e/assets-v1/<id>/<arquivo>` que só existe na hospedagem da Lovable. Na Vercel esses
caminhos retornam 404. Os ponteiros foram movidos para `docs/lovable-asset-pointers/`
(referência para recuperação) e não são mais usados pelo código.

Arquivos reais que já vinham no ZIP: 4 logos PNG (originais em `docs/originais/`) e o favicon.

## Recuperados de forma idêntica (mesmo tamanho em bytes do original da Lovable)

| Original na Lovable | Arquivo no projeto | Uso |
| --- | --- | --- |
| `parque-das-flores-sua-vida.mp4` | `public/media/videos/parque-das-flores-sua-vida.mp4` | Galeria → vídeos |
| `parque-das-flores-ponto-de-partida.mp4` | `public/media/videos/parque-das-flores-ponto-de-partida.mp4` | Galeria → vídeos |
| `parque-das-flores-apresentacao.mp4` | `public/media/videos/parque-das-flores-apresentacao.mp4` (recomprimido de 15,9 MB para 10,2 MB) | Galeria → vídeos |
| `campanha-por-do-sol.png` | `public/media/materiais/campanha-por-do-sol-*.webp` | Galeria → Materiais |

## Substituídos por material real enviado pelo proprietário

| Original na Lovable | Substituto | Observação |
| --- | --- | --- |
| `parque-das-flores-horizontal.mp4`, `parque-das-flores-promocional.mp4` | `parque-das-flores-aereo.mp4` | Vídeo de drone real (4 min 15 s, 1080p, 256 MB) recomprimido para 720p, 22 MB |
| `DJI_0126/0152/0154/0155.jpg` (fotos de drone) | 11 quadros do vídeo de drone, em `public/media/galeria/` | Topo, "O empreendimento", localização e galeria |
| `parque-video-poster-0..3.jpg` | Pôsteres gerados dos próprios vídeos | `public/media/videos/poster-*.webp` |
| `campanha-seu-futuro.png` / `material-horizontal.webp` | `campanha-seu-futuro-horizontal` (arte 2048×768) | Arte equivalente enviada; não é o mesmo arquivo |
| `material-lotes.webp` | `material-lotes-vertical` (arte 1024×1536) | Arte equivalente enviada; não é o mesmo arquivo |
| — (novo) | `vista-aerea-identidade` (1672×941) | Foto aérea com as marcas; também gera a imagem de compartilhamento (Open Graph) |
| `queiroz-original.webp`, `queiroz-50-anos-logo.webp` | `src/assets/logo-queiroz-50-anos.webp` | Recorte do logo Queiroz do PNG original do projeto |
| `logo-original.webp`, `parque-das-flores-logo.webp` | `src/assets/logo-parque-das-flores-creme.webp`, `logo-parque-queiroz-escuro.webp` | Convertidos dos PNG originais |
| `public/favicon.png` (recorte com uma letra "R" cortada) | `favicon.ico`, `favicon-32/48.png`, `apple-touch-icon.png`, `icon-512.png` | Gerados a partir da flor do logo original |

## Ainda faltando (não estavam no ZIP nem nos arquivos enviados)

Para recuperar: abrir no navegador `https://parquedasflores.life` + o caminho da coluna
"Referência" enquanto o domínio ainda aponta para a Lovable, salvar o arquivo e adicionar
em `public/media/`.

| Arquivo esperado | Componente original | Posição no site antigo | Referência original |
| --- | --- | --- | --- |
| `whatsapp-image-2026-09-10-at-18-27-49.jpg` e mais 9 fotos (`-49-1`, `-49-2`, `-50`, `-50-1`, `-50-2`, `-50-3`, `-51`, `-51-1`, `-51-2`) | `Galeria.tsx` | Galeria, fotos "Obras recentes" (posições 2 a 11) | `/__l5e/assets-v1/<id>/whatsapp-image-…jpg` — ids em `docs/lovable-asset-pointers/` |
| `planta-parque-das-flores.jpg` (`planta.jpg`) | `Planta.tsx`, `Galeria.tsx` | Seção "Planta urbanística oficial" e última foto da galeria | `/__l5e/assets-v1/464a0e56-e37a-4aaa-b213-4a836afb7fa5/planta-parque-das-flores.jpg` |
| `area-marcada.jpg` | `TourAereo.tsx`, `Galeria.tsx` | "Tour aéreo", foto com a área demarcada em dourado | `/__l5e/assets-v1/b4636abc-6a17-46b5-8940-b96762b57524/area-marcada.jpg` |
| `panorama-por-do-sol.png` | `Galeria.tsx` | Primeira foto da galeria (ilustrativa) | `/__l5e/assets-v1/aeb05e24-17f7-4d8c-acec-b192115ddfa8/panorama-por-do-sol.png` |
| `identidade-institucional.jpeg` | `BrandSections.tsx` (`DeveloperSection`) | Botão "Ver material completo" na seção Queiroz | `/__l5e/assets-v1/9117406d-542e-4c63-b151-6b44d0d7ef30/identidade-institucional.jpeg` |
| `DJI_0126.jpg`, `DJI_0152.jpg`, `DJI_0154.jpg`, `DJI_0155.jpg` | `Hero`, `Sobre`, `TourAereo`, `Galeria` | Fundo do topo, foto do "Sobre", tour aéreo | ver `docs/lovable-asset-pointers/DJI_*.json` |

Removidos a pedido do proprietário (seção "Disponibilidade dos lotes" / espelho de vendas):
`mapa-disponibilidade-13-10-2026.jpg`, `mapa-disponibilidade-29-09-2026.jpg`, `disponibilidade-parque-das-flores.jpg`.

## Otimização

- Fotos: WebP em 640, 1280 e 1920 px (`srcset`), carregamento tardio fora da primeira tela.
- Topo: imagem com `fetchpriority="high"` + vídeo curto (12 s, 0,4 MB, sem som) só em telas largas sem economia de dados.
- Vídeos: H.264 + AAC, `faststart`, `preload="none"` e pôster leve; nada é baixado antes do play.
