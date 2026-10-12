# Portfolio

Personal portfolio site — React 19 (with Compiler) + TypeScript + Vite + Tailwind v4 + shadcn/ui (Base UI primitives) + [motion](https://motion.dev). Deployed to GitHub Pages at https://aricallen.github.io/.

## Development

```bash
pnpm install
pnpm dev       # local dev server
pnpm build     # typecheck + production build
pnpm preview   # serve the production build locally
pnpm lint      # oxlint
```

## Updating content

All copy renders from **`src/content/portfolio.json`** — edit it and the UI updates; no component changes needed. Types live in `src/lib/content.ts`.

| Key | What it drives |
| --- | --- |
| `profile` | Hero: name, cycling roles, bio, quote, avatar, social links, floating tech `chips` (first 6 form the inner ring; the rest show from `sm` up), `resumeUrl` (the PDF under `public/`) |
| `stats` | Animated count-up strip (`value` + `suffix`, e.g. `54` + `"%"`) |
| `skills` | Scrolling tech marquee (`expert` + `experienced` are shown) |
| `projects` | Card grid and the fullscreen detail view |
| `resume` | The `/resume` page. Mirrors the single-column resume build; keep them in sync, and replace `public/resume.pdf` when the resume changes |

Per project:

- `hue` — 0–360 oklch hue tinting that card's accent, glow, and detail view (pick distinct hues so the grid feels varied)
- `image` — path under `public/` shown on the card and detail banner
- `highlights` — the 3 bullets on the card face
- `details` — fullscreen view: `overview`, `role`, `stack`, `outcomes`, `media`, optional `links`
- `details.media` — "In action" gallery: `{ type: 'image' | 'video', src, poster?, alt, caption }`. The first item spans full width. Images open in a lightbox. Keep assets under `public/projects/<id>/` as WebP (≤1600px) and H.264 MP4 (≤1280px, no audio) with a WebP poster.

## Deploying to GitHub Pages

1. Push the repo to GitHub (default branch `main`).
2. In the repo settings: **Settings → Pages → Source → GitHub Actions**.
3. Push to `main` — `.github/workflows/deploy.yml` builds and deploys automatically.

The workflow derives the Vite `base` path from the repo name (`/<repo>/` for project sites, `/` for `<user>.github.io`). For a custom domain, set `VITE_BASE=/` and add a `CNAME` file to `public/`.

Routes use React Router. Pages has no SPA rewrites, so the workflow copies `index.html` to `404.html` so deep links like `/resume` still load. Unknown paths (including old `/portfolio/...` links) redirect home.

## Notes

- Dark/light theme follows system preference, toggleable in the header; the choice persists in `localStorage`. An inline script in `index.html` applies the class before paint to avoid a flash.
- All animation respects `prefers-reduced-motion` (motion's `MotionConfig reducedMotion="user"` + CSS `motion-safe`/`motion-reduce` variants).
