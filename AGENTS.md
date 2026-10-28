<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Centralize valores e planos residenciais em `src/lib/site.ts` para manter todas as ofertas consistentes.

- Reuse Brand and BrandSections components for institutional identity and campaign materials; shared assets prevent inconsistent logos and repeated layouts.

- Keep a single contact form near the beginning of the homepage using the existing Formspree submission flow; avoid duplicate lead forms and preserve the established delivery service.

- Read public analytics configuration through a server function and install tracking in the root shell; secrets stay server-side and every page shares one GTM installation and one explicit GA4 page-view sender.

- Use SiteVideo for embedded campaign videos with CDN pointers, native controls, full-frame proportions and no preloading; pause other videos during playback to prevent competing audio and unnecessary downloads.
