# Design inspiration

**Chosen reference:** [Sam Goddard — Staff Design Engineer](https://samgoddard.co.uk/)
(Awwwards portfolio gallery, `awwwards.com/sites/sam-goddard-2`).

## How I got here

I went through the Awwwards portfolio gallery and opened the ones that looked like they
belonged to individual engineers or designers rather than studios: Sam Goddard, Nahiyan
Khan (`nahiyan.codes`), Eddy Naboulet (`eddy-naboulet.dev`), Maria Vasilyeva, Deji
Ajetomobi, Haroon Rashidi, and Justin Lerner.

A few of them are genuinely impressive but wrong for this site:

- **Eddy Naboulet's "EddyOS"** is a full retro operating-system simulation with a boot
  screen and sound. It is a delight, but it is a theme-park: the gimmick is the point, and
  it says "creative coder" more than "senior product engineer".
- **Haroon Rashidi** ships seven complete editions of the same portfolio behind a rotary
  dial. Fun, but the site is about the dial, not the work.
- **Maria Vasilyeva** and **Justin Lerner** are visual-designer portfolios: image-first,
  text-light. Aric's strongest material is the _story_ behind each project (RFC to GA,
  migration numbers, rollout strategy), so an image-wall layout buries the best content.
- **Nahiyan Khan** is the closest cousin: a principal design engineer working on agentic
  products, mono type, a dock-style nav. It was a strong second. I borrowed its numbered
  "01 / 02" index treatment, but its layout is sparser and less distinctive than Sam's.

## Why Sam Goddard's site stood out

1. **A typographic system, not a template.** The entire site is two fonts doing clearly
   separated jobs: a high-contrast display serif, set in uppercase at enormous sizes, for
   anything that should be _read as a statement_; and a small, tracked, uppercase
   monospace for everything else (nav, labels, metadata, body copy). There are no cards,
   no gradients, no drop shadows. The hierarchy comes entirely from type size and 1px
   rules. That restraint is hard to pull off and reads as confidence.

2. **Fixed top and bottom bars as a "frame".** The nav lives in a thin fixed bar at the top
   (`SG // SINCE '89` on the left, `HOME // WORK // MUSIC // CONTACT` on the right) and a
   second fixed bar at the bottom holds socials, a live "humans visiting" counter, and a
   Spotify "last played" ticker. The page scrolls _inside_ this frame. It makes the site
   feel like an instrument panel and gives it a persistent, recognizable identity on
   every scroll position.

3. **The `//` delimiter as a brand mark.** One typographic device, used everywhere: in nav,
   in project rows (`FIN // [CURRENT]`), in awards (`AWWWARDS // SITE OF THE DAY`). It
   turns plain lists into something that looks designed, for free.

4. **A text-first project index.** Projects are rows in a ledger, not cards in a grid:
   name, year in brackets, one-line description, hairline rule. It puts six projects in
   the space a card grid gives to two, and it invites the eye to scan.

5. **Treating the portrait as print, not a photo.** The photo is rendered as a dot screen.
   It stops the page from looking like a LinkedIn profile and ties the image to the
   typographic system instead of fighting it.

6. **Small live details.** The visitor counter and "last played" ticker are tiny, but they
   say "this person builds things that are alive", which is exactly what a hiring manager
   is trying to assess.

## Why it is a good fit for this portfolio

- **Same job, same pitch.** Sam's headline is "helping humans bridge the gap between design
  and code". Aric's is "I build interfaces people love to use — and codebases people love
  to work in." The site's whole visual argument (design taste _and_ engineering rigor) is
  the argument Aric is making.
- **Content-shaped.** Aric's `portfolio.json` is rich in text: project overviews, outcomes
  with numbers, role descriptions, six testimonials, a full resume. The previous design
  put that behind a card flip; an editorial, text-first layout surfaces it. The project
  screenshots and videos still get a home (hover preview, and the full-screen detail view).
- **Musician angle.** Sam's bottom bar carries a music ticker. Aric went to Berklee; the
  bottom bar here carries a ticker of career stats instead, but the "status bar with a
  pulse" device is the same and the `MUSICIAN` role sits right in the hero.
- **Cheap to maintain.** The system is type + rules + a handful of tokens. Every section
  is the same two-column grid (`label + statement` on the left, content on the right).
  Adding a project or a testimonial is still just editing JSON.
- **Works in both themes.** Paper-and-ink in light mode, bone-on-black in dark mode. The
  halftone portrait re-samples itself when the theme flips so the dots invert correctly.

## Why it will help Aric stand out

Most engineer portfolios, including the previous version of this one, are built from the
same kit: gradient hero, floating tech chips, three-column card grid, count-up stats,
testimonial masonry. Recruiters see fifty of them a week. They are fine, and they are
invisible.

The editorial system does three things that kit doesn't:

1. **It signals design judgment by what it leaves out.** No shadows, no gradients, no
   chips. A reviewer who knows design will clock that restraint immediately; one who
   doesn't will just feel that it looks "expensive".
2. **It foregrounds the words.** Aric's outcomes are the strongest thing on the site
   ("RFC to GA in about two months", "~54% less React render time", "dark mode shipped to
   every customer tier"). Giant serif statements and a scannable index put those in front
   of the reader instead of behind a click.
3. **It includes real engineering flexes that are visible but not gimmicky.** The halftone
   portrait is sampled and drawn on a canvas at runtime with a top-to-bottom "print"
   reveal. The floating project preview follows the cursor on springs and flips sides
   near the viewport edge. The theme toggle, reduced-motion handling, keyboard focus, and
   screen-reader labelling are all intact. These are the kinds of details a design
   engineer notices in a code review, and the source is linked from the colophon.

## What was adapted rather than copied

- Sam's site is dark only; this one keeps light/dark with a warm paper light theme.
- Sam's project rows are plain text; here they open a full-screen detail sheet with the
  existing media gallery, because the screenshots and videos are worth showing.
- The live visitor counter and Spotify ticker need a backend; replaced with a local-time
  clock and a stats ticker driven by `portfolio.json`.
- Body copy inside the project detail view and the resume bullets use Inter at normal
  case for readability; uppercase mono is reserved for labels, nav, and short intros.
- The numbered `01 // 02` section and row indices come from Nahiyan Khan's site.
