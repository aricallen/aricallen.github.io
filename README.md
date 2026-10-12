# Portfolio

Personal portfolio site — React 19 (with Compiler) + TypeScript + Vite + Tailwind v4 + shadcn/ui (Base UI primitives) + [motion](https://motion.dev). Deployed to GitHub Pages at https://aricallen.github.io/.

The design — a ruled white sheet, highlighter headline, grainy colour cards and topic cards that come out of a box — is explained in [`design-inspo.md`](design-inspo.md).

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

| Key            | What it drives                                                                                                                                                        |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `profile`      | Hero greeting (first name, first of `roles`), header avatar, quote (footer and resume), social links, `resumeUrl` (the PDF under `public/`)                           |
| `stats`        | Count-up cells under the hero (`value` + `suffix`, e.g. `54` + `"%"`)                                                                                                 |
| `topics`       | The cards that come out of the box, the work filter, and the colour of everything filed under each: `id`, `title`, `tone` (`sky`, `lime`, `pink` or `peach`), `blurb` |
| `skills`       | The "What's in the box" band                                                                                                                                          |
| `projects`     | The work grid on the home page and one case-study page each at `/work/<id>`                                                                                           |
| `testimonials` | The kind-words wall. Attributed by `role` + `org`; add `name` only with the person's OK                                                                               |
| `resume`       | The `/resume` page. Mirrors the single-column resume build; keep them in sync, and replace `public/resume.pdf` when the resume changes                                |

The employer in the hero ("at dbt Labs") is whichever `resume.experience` entry has a `role` equal to `resume.title`.

Each topic card shows a small looping scene. Those live in `src/components/topic-vignettes.tsx`, keyed by topic `id`; a topic without one still works, its card just has no scene.

Per project:

- `id` — the URL slug (`/work/<id>`); changing it breaks links to that case study
- `topic` — the `id` of the topic it is filed under, which sets its colour and where the filter puts it
- `image` — path under `public/` shown on the work tile and as the case study's lead figure
- `highlights` — three one-liners, set as the all-caps beats between parts of the case study
- `details` — the case study: `overview`, `role`, `stack`, `outcomes`, `media`, optional `links`
- `details.media` — the figures: `{ type: 'image' | 'video', src, poster?, alt, caption }`. The item whose `src` matches `image` becomes the lead figure (its `alt` and `caption` are used there). Images open in a lightbox. Keep assets under `public/projects/<id>/` as WebP (≤1600px) and H.264 MP4 (≤1280px, no audio) with a WebP poster.

## Deploying to GitHub Pages

1. Push the repo to GitHub (default branch `main`).
2. In the repo settings: **Settings → Pages → Source → GitHub Actions**.
3. Push to `main` — `.github/workflows/deploy.yml` builds and deploys automatically.

The workflow derives the Vite `base` path from the repo name (`/<repo>/` for project sites, `/` for `<user>.github.io`). For a custom domain, set `VITE_BASE=/` and add a `CNAME` file to `public/`.

Routes use React Router. Pages has no SPA rewrites, so the workflow copies `index.html` to `404.html` so deep links like `/resume` still load. Unknown paths (including old `/portfolio/...` links) redirect home.

## Notes

- `public/og-image.jpg` is the 1200×630 link-preview card (Open Graph tags in `index.html`). Regenerate it if the name or title changes.
- Dark/light theme follows system preference, toggleable in the header; the choice persists in `localStorage`. An inline script in `index.html` applies the class before paint to avoid a flash.
- Looping decoration (drifting dots, bobbing cards, the card scenes) can be stopped with "pause animations" in the header. It starts paused when the OS asks for reduced motion, and the choice persists in `localStorage`. Anything that loops must carry the `ambient` class so the control reaches it.
- Entrance animation respects `prefers-reduced-motion` (motion's `MotionConfig reducedMotion="user"` + CSS media queries).
- Fonts are self-hosted through Fontsource: Fraunces (everything you read) and Archivo at its widest (labels and case-study titles).
- Route changes use the View Transitions API through React Router's `viewTransition` links; browsers without it just navigate.
