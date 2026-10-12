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

| Key            | What it drives                                                                                                                                                                                                             |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `profile`      | `root` headline (`name`), `tldr` block (`bio`), `about` page (`bio`, `quote`, `avatar`, `roles`, `location`), `contact` and `resume` links, `resumeUrl` (the PDF under `public/`). `chips` are not rendered in this design |
| `stats`        | The `by the numbers` block on `root` (`value` + `suffix` + `label`, e.g. `54` + `"%"`)                                                                                                                                     |
| `skills`       | The `what I do` block on `about`                                                                                                                                                                                           |
| `projects`     | The `work` page (numbered entries with a horizontal screenshot rail per project) and the full-screen detail sheet. The first three projects from the most recent `org` are linked from the `today` block on `root`         |
| `testimonials` | The `in the background` player on `root` (prev / play / next). Attributed by `role` + `org`; add `name` only with the person's OK                                                                                          |
| `resume`       | The `/resume` page, and the `yesterday` block on `root` (every `experience` entry except the current org and contracts)                                                                                                    |

Per project:

- `hue` — 0–360 oklch hue; kept for content compatibility, not rendered in this design
- `image` — path under `public/`; the first card in the project's rail
- `highlights` — the `my part` list in the detail sheet
- `details` — fullscreen view: `overview`, `role`, `stack`, `outcomes`, `media`, optional `links`
- `details.media` — "in action" gallery in the detail sheet: `{ type: 'image' | 'video', src, poster?, alt, caption }`. The first item spans full width. Images open in a lightbox. Image entries and video posters also appear as cards in the project's rail on the `work` page. Keep assets under `public/projects/<id>/` as WebP (≤1600px) and H.264 MP4 (≤1280px, no audio) with a WebP poster.

## Deploying to GitHub Pages

1. Push the repo to GitHub (default branch `main`).
2. In the repo settings: **Settings → Pages → Source → GitHub Actions**.
3. Push to `main` — `.github/workflows/deploy.yml` builds and deploys automatically.

The workflow derives the Vite `base` path from the repo name (`/<repo>/` for project sites, `/` for `<user>.github.io`). For a custom domain, set `VITE_BASE=/` and add a `CNAME` file to `public/`.

Routes use React Router: `/`, `/about`, `/work`, `/resume`, `/contact`, switched by the floating dock (click, arrow keys, or drag the pill to "tune" between pages). Pages has no SPA rewrites, so the workflow copies `index.html` to `404.html` so deep links still load. Unknown paths (including old `/portfolio/...` links) redirect home. `/work?project=<id>` opens that project's detail sheet.

## Notes

- `public/og-image.jpg` is the 1200×630 link-preview card (Open Graph tags in `index.html`). Regenerate it if the name or title changes.
- Dark/light theme follows system preference, toggleable from the footer ("lights on / off"); the choice persists in `localStorage`. An inline script in `index.html` applies the class before paint to avoid a flash.
- The design direction and the reasoning behind it are written up in `design-inspo.md`.
- All animation respects `prefers-reduced-motion` (motion's `MotionConfig reducedMotion="user"` + CSS `motion-safe`/`motion-reduce` variants).
