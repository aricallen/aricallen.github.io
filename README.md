# Portfolio

Personal portfolio site — React 19 (with Compiler) + TypeScript + Vite + Tailwind v4 + shadcn/ui (Base UI primitives) + [motion](https://motion.dev). Deployed to GitHub Pages at https://aricallen.github.io/.

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

| Key            | What it drives                                                                                                                                                                                                                                                                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `profile`      | Hero statement (`name`, `roles[0]`, `headline`), portrait (`avatar`, rendered as a halftone on a canvas), the "Currently" line (`roles[1..]`), the "Stack" line (`chips`), top-bar monogram and location, social links in the bottom bar and contact section, `resumeUrl` (the PDF under `public/`). `bio` and `quote` drive the About section |
| `stats`        | Ticker in the fixed bottom bar (`value` + `suffix` + `label`, e.g. `54` + `"%"`)                                                                                                                                                                                                                                                               |
| `skills`       | Expert / Experienced / Learning rows in the About section                                                                                                                                                                                                                                                                                      |
| `projects`     | The numbered project index (hover preview on pointer devices, inline thumbnail on touch) and the full-screen detail sheet                                                                                                                                                                                                                      |
| `testimonials` | Numbered pull quotes. Attributed by `role` + `org`; add `name` only with the person's OK                                                                                                                                                                                                                                                       |
| `resume`       | The `/resume` page. Mirrors the single-column resume build; keep them in sync, and replace `public/resume.pdf` when the resume changes                                                                                                                                                                                                         |

Per project:

- `hue` — 0–360 oklch hue; tints the marker in the detail sheet's header
- `image` — path under `public/` shown in the hover preview, the inline thumbnail, and the detail sheet
- `highlights` — the 3 short bullets in the detail sheet's "In short" row
- `details` — fullscreen view: `overview`, `role`, `stack`, `outcomes`, `media`, optional `links`
- `details.media` — "In action" gallery: `{ type: 'image' | 'video', src, poster?, alt, caption }`. The first item spans full width. Images open in a lightbox. Keep assets under `public/projects/<id>/` as WebP (≤1600px) and H.264 MP4 (≤1280px, no audio) with a WebP poster.

## Deploying to GitHub Pages

1. Push the repo to GitHub (default branch `main`).
2. In the repo settings: **Settings → Pages → Source → GitHub Actions**.
3. Push to `main` — `.github/workflows/deploy.yml` builds and deploys automatically.

The workflow derives the Vite `base` path from the repo name (`/<repo>/` for project sites, `/` for `<user>.github.io`). For a custom domain, set `VITE_BASE=/` and add a `CNAME` file to `public/`.

Routes use React Router. Pages has no SPA rewrites, so the workflow copies `index.html` to `404.html` so deep links like `/resume` still load. Unknown paths (including old `/portfolio/...` links) redirect home.

## Notes

- `public/og-image.jpg` is the 1200×630 link-preview card (Open Graph tags in `index.html`). Regenerate it if the name or title changes.
- Dark/light theme follows system preference, toggleable in the top bar; the choice persists in `localStorage`. An inline script in `index.html` applies the class before paint to avoid a flash.
- The design direction and the reasoning behind it are written up in `design-inspo.md`.
- All animation respects `prefers-reduced-motion` (motion's `MotionConfig reducedMotion="user"` + CSS `motion-safe`/`motion-reduce` variants).
