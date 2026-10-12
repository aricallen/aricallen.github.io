# Portfolio

Personal portfolio site — React 19 (with Compiler) + TypeScript + Vite + Tailwind v4 + shadcn/ui (Base UI primitives) + [motion](https://motion.dev). Deployed to GitHub Pages at https://aricallen.github.io/.

The design — an editorial serif over a monospace, hairline index rows, a halftone portrait and a playable step sequencer — is explained in [`design-inspo.md`](design-inspo.md).

## Development

```bash
pnpm install
pnpm dev       # local dev server
pnpm build     # typecheck + production build
pnpm preview   # serve the production build locally
pnpm lint      # oxlint
pnpm format    # prettier --write .
```

`pnpm install` sets up a pre-commit hook (husky + lint-staged) that runs Prettier on staged files, so commits match the repo style whatever your editor does on save.

## Updating content

All copy renders from **`src/content/portfolio.json`** — edit it and the UI updates; no component changes needed. Types live in `src/lib/content.ts`.

| Key            | What it drives                                                                                                                                                                                                               |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `profile`      | Hero and chrome: the hero sentence is `name` + first of `roles` + `headline` (the other `roles` cycle under it), plus bio, quote, avatar, social links, `timeZone` (status-bar clock), `resumeUrl` (the PDF under `public/`) |
| `stats`        | Count-up rows in the About section (`value` + `suffix`, e.g. `54` + `"%"`)                                                                                                                                                   |
| `skills`       | Toolkit rows, and the ticker in the status bar (`expert` + `experienced`)                                                                                                                                                    |
| `projects`     | The project index on the home page and one case-study page each at `/work/<id>`                                                                                                                                              |
| `testimonials` | Kind words: the first is the large pull quote, the rest are listed under it. Attributed by `role` + `org`; add `name` only with the person's OK                                                                              |
| `resume`       | The `/resume` page. Mirrors the single-column resume build; keep them in sync, and replace `public/resume.pdf` when the resume changes                                                                                       |

Wrap a phrase in underscores in `profile.headline` to set it in italics in the hero: `"people _love to use_"`.

Per project:

- `id` — the URL slug (`/work/<id>`); changing it breaks links to that case study
- `image` — path under `public/` shown in the home page preview and as the case study's lead figure
- `highlights` — the 3 rows under the home page preview
- `details` — the case study: `overview`, `role`, `stack`, `outcomes`, `media`, optional `links`
- `details.media` — the "In action" figures: `{ type: 'image' | 'video', src, poster?, alt, caption }`. The item whose `src` matches `image` becomes the lead figure (its `alt` and `caption` are used there). Images open in a lightbox. Keep assets under `public/projects/<id>/` as WebP (≤1600px) and H.264 MP4 (≤1280px, no audio) with a WebP poster.

## Deploying to GitHub Pages

1. Push the repo to GitHub (default branch `main`).
2. In the repo settings: **Settings → Pages → Source → GitHub Actions**.
3. Push to `main` — `.github/workflows/deploy.yml` builds and deploys automatically.

The workflow derives the Vite `base` path from the repo name (`/<repo>/` for project sites, `/` for `<user>.github.io`). For a custom domain, set `VITE_BASE=/` and add a `CNAME` file to `public/`.

Routes use React Router. Pages has no SPA rewrites, so the workflow copies `index.html` to `404.html` so deep links like `/resume` still load. Unknown paths (including old `/portfolio/...` links) redirect home.

## Notes

- `public/og-image.jpg` is the 1200×630 link-preview card (Open Graph tags in `index.html`). Regenerate it if the name or title changes.
- Dark/light theme ("ink"/"paper") follows system preference, toggleable in the header; the choice persists in `localStorage`. An inline script in `index.html` applies the class before paint to avoid a flash.
- All animation respects `prefers-reduced-motion` (motion's `MotionConfig reducedMotion="user"`, CSS media queries, and the canvas portrait draws a single static frame).
- Fonts are self-hosted through Fontsource: Instrument Serif (display) and Geist Mono (everything else).
- The step sequencer makes no sound and creates no `AudioContext` until a visitor presses play or switches a step on. Voices are synthesised in `src/lib/sequencer-audio.ts`; there are no audio files.
- Route changes use the View Transitions API through React Router's `viewTransition` links; browsers without it just navigate.
