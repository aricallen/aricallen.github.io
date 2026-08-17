# Portfolio

Personal portfolio site — React 19 (with Compiler) + TypeScript + Vite + Tailwind v4 + shadcn/ui (Base UI primitives) + [motion](https://motion.dev). Deployed to GitHub Pages.

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
| `profile` | Hero: name, cycling roles, bio, quote, avatar, social links, resume URL |
| `stats` | Animated count-up strip (`value` + `suffix`, e.g. `54` + `"%"`) |
| `skills` | Scrolling tech marquee (`expert` + `experienced` are shown) |
| `projects` | Card grid and the fullscreen detail view |

Per project:

- `hue` — 0–360 oklch hue tinting that card's accent, glow, and detail view (pick distinct hues so the grid feels varied)
- `image` — path under `public/` shown on the card and detail banner
- `highlights` — the 3 bullets on the card face
- `details` — fullscreen view: `overview`, `role`, `stack`, `outcomes`, optional `links`

### Placeholders to replace

- [ ] `public/projects/*.svg` — generated mockups; replace with real product screenshots (16:10 or wider, ~1200px). Update each project's `image` path if you change filenames.
- [ ] `public/avatar.svg` — replace with a real photo (square, ≥512px) and update `profile.avatar`.
- [ ] `profile.resumeUrl` — currently `"#"`. Drop a PDF in `public/` (e.g. `public/resume.pdf`) and set to `resume.pdf`, or link externally.
- [ ] Footer "View source" URL in `src/components/site-footer.tsx` if the repo name isn't `portfolio`.
- [ ] `public/favicon.svg` — generated monogram; replace if you want.

## Deploying to GitHub Pages

1. Push the repo to GitHub (default branch `main`).
2. In the repo settings: **Settings → Pages → Source → GitHub Actions**.
3. Push to `main` — `.github/workflows/deploy.yml` builds and deploys automatically.

The workflow derives the Vite `base` path from the repo name (`/<repo>/` for project sites, `/` for `<user>.github.io`). For a custom domain, set `VITE_BASE=/` and add a `CNAME` file to `public/`.

## Notes

- Dark/light theme follows system preference, toggleable in the header; the choice persists in `localStorage`. An inline script in `index.html` applies the class before paint to avoid a flash.
- All animation respects `prefers-reduced-motion` (motion's `MotionConfig reducedMotion="user"` + CSS `motion-safe`/`motion-reduce` variants).
