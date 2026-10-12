# Design inspiration

**Picked: [eemonroy.com](https://eemonroy.com)** — the portfolio of Eemon Roy, a product designer at Microsoft who works on Copilot. Found on the [Awwwards portfolio listing](https://www.awwwards.com/websites/portfolio/) ([entry](https://www.awwwards.com/sites/eemons-portfolio)).

This is a second, independent exploration. The first one went dark, monochrome and editorial; this one was chosen to be its opposite, so the two can be judged against each other rather than as variations on a theme.

## What else I looked at

For this round I opened every entry on the listing that I had not opened the first time, and re-read the two strongest leftovers from round one.

| Site                                                                                                                       | What it does well                                                               | Why it wasn't the pick                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [mariavasilyeva.com](https://mariavasilyeva.com)                                                                           | Site of the Day. Ruled paper, hand-drawn annotations you can switch on and off. | The whole site is one horizontal reel of thumbnails. Lovely for visual work; product screenshots need room to be read. |
| [aengel.io](https://aengel.io)                                                                                             | Blueprint grid, spec-sheet labels, very long technical case studies.            | Dark, technical and behind a WebGL gate. Too close in mood to the first exploration, and the gate costs a click.       |
| [mikewilcockdesign.com](https://mikewilcockdesign.com)                                                                     | Enormous grotesque wordmark, confident and fast.                                | Dark with giant type again, and built to sell services ("start a project") rather than to get one person hired.        |
| [mijobello.com](https://mijobello.com)                                                                                     | Sage and oxblood colour-blocking, ruled cells, a world-clock ticker.            | The strongest runner-up for colour. It leans on full-bleed photography, which this portfolio doesn't have.             |
| [dejiajetomobi.com](https://dejiajetomobi.com)                                                                             | Four plain columns over a blackletter wordmark. Almost no design, on purpose.   | A link list. It suits someone with a long public trail of talks and features to link to.                               |
| [rubens.design](https://rubens.design), [haroonrashidi.com](https://haroonrashidi.com), [zesiger.net](https://zesiger.net) | A fake desktop, a seven-"edition" dial, a driving game. All memorable.          | The conceit sits between the visitor and the work. A recruiter has to play before they can read.                       |

## Why this site was interesting

1. **It is unmistakably a person.** Most portfolios on the listing could swap names and nobody would notice. This one opens with "Hi i'm Eemon, a Product Designer at Microsoft, and here's everything i know about", and then three topic cards spill out of an open box. The first screen answers who, where and what in one sentence and then makes a small joke about it. It reads as warm and sure of itself rather than cool.

2. **The ruled sheet.** Under all the colour is a strict structure: two hairlines run down the page as margins, and every section is a row ruled edge to edge, with cells inside. The nav is three ruled cells. Work is a two-column table of cells. It looks like a planner page, and it is why so much colour doesn't turn into mess: the colour always sits inside a box that the grid drew.

3. **Highlighter and grain.** Two cheap effects carry the whole look. Key words in the headline are swiped with a highlighter, and every colour surface is a soft mesh gradient with a risograph grain over it. Together they feel printed and hand-marked, not rendered.

4. **Two voices, clearly split.** A soft, slightly rounded serif does everything you read. A wide, all-caps grotesque does everything you scan: nav, captions, tags, case-study titles. You can tell what kind of text something is before you read it.

5. **A "pause animations" button.** There is a lot of ambient motion, and there is one visible control that stops it. That is an accessibility requirement most playful sites skip, and here it is part of the design.

6. **"Kind words from colleagues" is a section, not a footnote.** Six quotes on bright cards, given as much room as the work. For someone whose strength is being good to work with, that is the right emphasis.

## Why it is a good candidate for this portfolio

- **The content is the same shape.** A list of work with a tag and a year each, a wall of quotes from colleagues, and AI product work at a large company. `portfolio.json` already had all of it; only the grouping into topics is new.
- **The quotes on this site describe this tone.** "Always willing to jump in and help", "I want Aric on my team", "he unblocks me constantly", and Aric lists "Serial Optimist" as a role. A dark, austere site undersells that. A bright, generous one says it before anyone reads a quote.
- **"Here's everything I know about" fits a senior engineer better than a designer.** Six projects fall into three areas of depth: AI agent interfaces, design systems, and platforms and tooling. Naming them up front tells a hiring manager which conversations Aric can lead.
- **It suits what Aric builds.** His work is themes, tokens and component systems. A design that is literally a token system on display (four tones, each a three-colour recipe, used for cards, tags, pills and case studies) is the portfolio making the same argument as the résumé.
- **It can be done as static files.** No 3D, no backend: gradients, SVG and a little spring physics.

## Why it should help Aric stand out

- **It will not be mistaken for a template.** Developer portfolios are overwhelmingly dark, with a gradient headline and glass cards. A white ruled page with crayon colours and a cardboard box on it is remembered.
- **The illustrations are code.** The inspiration's cards carry hand-drawn art. Here each topic card carries a tiny live scene built from markup: an agent turn streaming in with tool calls and a chart, a scrap of UI flipping between light and dark tokens, a render-time bar shrinking by the real 54% from the content file. A frontend engineer's portfolio should show interface, not pictures of interface.
- **The hero is the navigation.** Cards can be dragged around with a mouse and spring back; clicking one files the work list under that topic and scrolls to it. The first thing a visitor plays with is also the fastest route to the relevant case studies.
- **Topic colour carries through.** A project's tag, its tile, its case-study page and its figures all use its topic's tone, so the site teaches its own colour code in one scroll.
- **Accessibility is visible, not claimed.** Pause control in the header (and paused by default if the OS asks for reduced motion), every highlight keeps dark ink on a light tone in both themes, one tab stop per control, a skip link. The testimonials call Aric an accessibility advocate; the site shows it.
- **Case studies have their own URLs** (`/work/mcp-apps`), so one can go straight into an application or a message.

## What I took, and what I changed

Taken more or less directly: the ruled sheet with margin lines and ruled nav cells, the one-sentence greeting with highlighted words and a scribble under it, topic cards rising out of an open box among drifting dots, mesh-gradient cards with grain, the work grid with a caption bar (title left, coloured tag and year right), the kind-words wall, the pause control, the pink footer with a folder, and the case-study layout of ruled cells with centred all-caps beats between them.

Changed on purpose:

| Inspiration                                      | Here                                                                                                                             | Why                                                                                                                                |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Topic cards carry hand-drawn illustrations       | Topic cards carry small live UI scenes built in markup and CSS                                                                   | Aric's medium is interface, and nothing has to be drawn or downloaded.                                                             |
| Cards are links to nothing in particular         | Cards filter the work list by topic; with a mouse they can also be dragged                                                       | Makes the hero useful as well as charming.                                                                                         |
| Work is one flat grid                            | Work has a ruled filter row: everything, or one topic                                                                            | Lets a reader who only cares about, say, agent UIs see just those.                                                                 |
| Testimonials have names and photos               | Attributed by role with a role badge (engineer, designer, manager)                                                               | These quotes are shared by role, not by name. The badge fills the place a photo would take.                                        |
| Light only                                       | Light and dark, following the system preference                                                                                  | The existing site had both. The colour cards keep dark ink on light tones in either theme, so contrast never depends on the theme. |
| Pink box                                         | A cardboard-orange box stamped with the monogram and a "handle with optimism" label                                              | Same joke, Aric's own.                                                                                                             |
| Averia Serif Libre and Plaak (a commercial face) | Fraunces (soft axis turned up) and Archivo at its widest                                                                         | Both open source and variable, so one file each covers every weight and width used.                                                |
| Pixel-art emoji beside headings                  | Small four-point sparkles in two of the tones                                                                                    | Keeps the ornament inside the colour system.                                                                                       |
| Case studies are long hand-written narratives    | Built from existing fields: the three highlights become the all-caps beats; role, stack, story, outcomes, figures fill the cells | No new copy had to be invented, and adding a project stays a JSON edit.                                                            |
| A separate "sidequests" page                     | A toolkit band ("What's in the box") and a résumé page                                                                           | There is no side-project content to show yet; the skills list is real.                                                             |

## How it maps to the code

- `src/index.css` — the two themes, the tone recipes (`[data-tone]`), `mesh`, `grain`, `pill`, the two type utilities, and every looping animation, all of which carry `.ambient` so one attribute can pause them.
- `src/components/frame.tsx` — `Band` (the ruled-sheet primitive every section is built from), `Pill`, `SectionTitle`, `Reveal`.
- `src/components/hero.tsx`, `open-box.tsx`, `topic-vignettes.tsx` — the greeting, the box, the draggable topic cards and their live scenes.
- `src/components/work-section.tsx` — the filter row and the project grid.
- `src/pages/project-page.tsx` — the case-study route.
- `src/lib/ambient.ts` + `src/components/pause-toggle.tsx` — the pause control; `index.html` sets its initial state before first paint.
- `src/content/portfolio.json` — new `topics` list, and a `topic` on each project.
