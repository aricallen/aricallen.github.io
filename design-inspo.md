# Design inspiration

**Picked: [samgoddard.co.uk](https://samgoddard.co.uk)** — the portfolio of Sam Goddard, a staff design engineer at Fin (formerly Intercom). Found on the [Awwwards portfolio listing](https://www.awwwards.com/websites/portfolio/) ([entry](https://www.awwwards.com/sites/sam-goddard-2)).

## What else I looked at

I went through the current Awwwards portfolio page and opened the entries that belong to people who build interfaces for a living, rather than studios, film reels, or 3D showpieces:

| Site                                             | What it does well                                                               | Why it wasn't the pick                                                                                                |
| ------------------------------------------------ | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [nahiyan.codes](https://nahiyan.codes)           | All-mono, three short columns, a draggable nav pill. Calm and confident.        | Almost no room for work. It suits someone whose name already opens doors; this site has six case studies to carry.    |
| [aengel.io](https://aengel.io)                   | Blueprint grid, WebGL "enter the experience" gate, very long-form case studies. | The gate and the 3D are the portfolio. For a product engineer that is a costume, and a gate costs recruiters a click. |
| [eddy-naboulet.dev](https://eddy-naboulet.dev)   | A whole fake operating system with a boot sequence. Memorable.                  | The joke is in the way of the content, and it takes a keypress to get past it.                                        |
| [mariavasilyeva.com](https://mariavasilyeva.com) | Site of the Day. Hand-drawn annotations over a horizontal reel of thumbnails.   | Built around visual work at thumbnail size. Product UI screenshots need to be read, not glanced at.                   |
| [twks.ch](https://twks.ch/en)                    | Site of the Day. Excellent agency site.                                         | An agency's structure (services, articles, careers), not a person's.                                                  |

## Why this site was interesting

Four things stood out, in the order I noticed them.

1. **Two typefaces doing two different jobs.** A high-contrast display serif, set huge, uppercase and tight, says the things that are meant to be felt. A small monospace says everything else. There is no third voice, no weights, no colour doing the work that type should do. The hero is a single sentence at about 100px, and it is the entire pitch: name, title, what he does, where.

2. **Everything is a row.** Projects, awards, the colophon and even the site's own stats are hairline-ruled index rows with `//` as the only separator. It reads like a well-kept ledger. That makes the page scannable in a way card grids are not: nine projects fit in the height of one card, and the eye runs straight down the left edge.

3. **Dot-matrix instead of decoration.** The portrait is a halftone, and where another site would put stock imagery there are small interactive dot-matrix scenes. The whole visual language comes from one primitive, a grid of dots at different sizes, so the page feels designed rather than assembled.

4. **Chrome that is alive but quiet.** A fixed hairline bar top and bottom: nav above (the current page is struck through, not highlighted), socials, live status and a "last played" ticker below. It is a tiny amount of UI and it makes the page feel like a running program instead of a document.

The thing underneath all four: it is monochrome, has almost no "effects", and still obviously took a great deal of care. The craft is in spacing, type and behaviour, which is exactly the craft a frontend engineer is hired for.

## Why it is a good candidate for this portfolio

- **Same job, same story.** Sam is a design engineer who sits between design and code. The testimonials on this site say the same of Aric nearly word for word ("a strong advocate for good design and accessibility", "empower teams to ship faster, more consistent, more accessible experiences"). A design that argues "I care about the details between design and engineering" fits the evidence already on the page.
- **The content is already this shape.** The existing site was stats, a list of skills, six projects with outcomes, and six quotes. Those are rows and pull quotes. Nothing had to be invented or padded to fill the layout; `portfolio.json` maps onto it almost one to one.
- **It gives the music somewhere to live.** Sam's nav has a Music page and a last-played ticker. Aric studied electronic production at Berklee, which the old site mentioned in one clause. This layout has a natural slot for something better than a clause (see below).
- **It replaces the look most portfolios share.** The previous design was gradient text, aurora blobs, glass cards and tilt-on-hover. It was well made, and it is also what a large share of developer portfolios look like this year. Moving to ink, paper, a serif and a mono is the fastest way out of that crowd.
- **It is achievable as static files.** No WebGL, no CMS, no backend. Everything here ships from GitHub Pages.

## Why it should help Aric stand out

- **The first screen is a sentence, not a layout.** A recruiter with thirty tabs open gets name, level and point of view in the time it takes to read one line, set large enough that it cannot be skimmed past.
- **There is something to play with, and it is on-brand.** The centrepiece is a working 16-step sequencer. It is a small, complete piece of frontend engineering (an accessible grid with roving focus, audio scheduled on the Web Audio clock, no libraries, no samples) and it is also the most honest "about me" on the page. People remember the portfolio with the instrument in it.
- **The only colour on the page is the work.** The chrome is monochrome, so the product screenshots are the one saturated thing on screen. Each one "develops" out of a dot matrix into the real screenshot as you move down the project list, which pulls the eye to exactly what a hiring manager came to see.
- **Case studies are now pages, not modals.** Each project has its own URL (`/work/mcp-apps`), which means Aric can link a specific case study in an application or a message, and the reader can use the back button.
- **It demonstrates restraint.** Senior frontend hiring is mostly a judgment test. A design with two fonts, one accent colour and no gratuitous motion shows that judgment before a single case study is opened.

## What I took, and what I changed

Taken more or less directly: the serif-plus-mono pairing, the giant one-sentence hero with a halftone portrait behind it, hairline index rows with `//` separators, pull statements set between two rules, the fixed top and bottom bars with a struck-through current page, the colophon.

Changed on purpose:

| Inspiration                                                  | Here                                                                                                                 | Why                                                                                                                                                       |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| All copy is uppercase mono, including paragraphs             | Uppercase only for labels and rows; anything longer than a line is sentence case                                     | Long uppercase mono is tiring to read, and the case studies are long. An accessibility advocate's site should be easy to read.                            |
| Dark only                                                    | Two themes, "ink" and "paper", following the system preference                                                       | The old site had both, and the halftone works in both: light dots on ink, ink dots on paper.                                                              |
| Multiplayer dot-matrix scenes (birds, garden, fireworks)     | One playable step sequencer                                                                                          | Multiplayer needs a backend this site doesn't have. The sequencer is self-contained and says something true about Aric instead of borrowing Sam's whimsy. |
| "N humans are visiting" presence and a Spotify "last played" | A live Oakland clock, and a ticker that shows the toolkit, or what the sequencer is playing                          | No fake presence counters. Everything in the status bar is real and computed in the browser.                                                              |
| Projects shown as abstract dithered shapes                   | Real product screenshots that develop out of a dot matrix                                                            | The work is product UI. It should be shown.                                                                                                               |
| Editorial Old (a commercial face) with decorative ligatures  | Instrument Serif (open source), with italics doing the job of the ligatures                                          | Free to ship, self-hosted, and the italic gives the same "someone set this by hand" feel. Emphasis is authored in the content as `_like this_`.           |
| Pure monochrome with a faint status dot                      | Monochrome plus one "signal" orange, used only for things that are live (status LED, sequencer playhead, focus ring) | One colour with one meaning.                                                                                                                              |

## How it maps to the code

- `src/index.css` — the two themes, the type utilities (`type-display`, `type-label`, `type-quote`), the `[ bracket ]` control style, the dither mask, and route-transition rules.
- `src/components/primitives.tsx` — the shared vocabulary: `Slash`, `Dot`, `SectionLabel`, `Statement`, `Prose`, `Reveal`.
- `src/components/hero.tsx` + `halftone-portrait.tsx` — the one-sentence hero with a word-by-word masked reveal, and the canvas halftone that swells under the pointer.
- `src/components/sequencer.tsx` + `src/lib/sequencer-audio.ts` — the instrument: grid UI and keyboard handling in one, the look-ahead audio scheduler and three synthesised voices in the other.
- `src/components/work-section.tsx` + `src/pages/project-page.tsx` — the project index with its developing preview, and the per-project case-study route. The preview image and the case-study lead image share a view-transition name, so one morphs into the other.
- `src/components/site-header.tsx` + `status-bar.tsx` — the two fixed bars.
- Content still comes entirely from `src/content/portfolio.json`.
