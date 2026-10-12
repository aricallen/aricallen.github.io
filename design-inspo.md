# Design inspiration

**Chosen reference:** [Nahiyan Khan — Personal site](https://nahiyan.codes/)
(Awwwards portfolio gallery, `awwwards.com/sites/nahiyan-khan-personal-site`).

This is the second exploration. The first (`frontier-design`) took Sam Goddard's editorial
serif-and-mono system. This one takes the runner-up from that same survey, which is a
very different answer to the same question: instead of a magazine, a small operating
system.

## Why Nahiyan Khan's site stood out

Nahiyan is a principal design engineer working on agentic products at Block, so the
subject matter is almost exactly Aric's: agent environments, tools for guiding model
behavior, design systems, prototypes. That made it the most relevant site in the gallery,
and it is well-built on its own terms:

1. **One screen, four pages, a dock.** There is no header and no scrolling nav. A floating
   dock at the bottom, `root / about / work / contact`, switches between panels. The
   active item is a blue pill that slides between labels. You can also _drag_ the pill
   across the dock like a radio tuner: the page under your finger previews live,
   releasing opens it, Escape cancels. It is a small interaction, and it is the kind of
   thing that makes a design engineer's site feel engineered.

2. **Labelled blocks on a staggered grid.** The root page is not a hero; it is four small
   blocks placed on a three-column grid so they don't line up: `tldr` top-left, `today`
   and `yesterday` lower-right, `in the background` back at the bottom-left. Each block
   is a lowercase mono label over a hairline rule, then a short paragraph. It reads like a
   dashboard someone actually uses rather than a landing page.

3. **Two typefaces with distinct jobs.** A very wide display sans (Widescreen Ex) set
   lowercase and huge for page titles and work entries, and a monospace (Commit Mono) for
   literally everything else, including body copy. Mono body text is a strong choice; it
   makes the whole site feel like it was written in an editor.

4. **The dot-matrix background.** Near-black with a fine dot grid whose density varies in
   patches, plus grain. It gives the page texture and a slightly worn, hardware feel
   without any imagery or gradients.

5. **Work as a rail of screenshots.** Each project on the work page is `01` + a big
   lowercase title + a one-line mono description, then a horizontal rail of large,
   rounded screenshot cards. The images are the content; the text just labels them.

6. **A tiny ambient widget.** `in the background` is a music player with prev / play /
   next controls. It is a personality cue that costs almost nothing.

## Why it is a good fit for this portfolio

- **The content maps block-for-block.** `tldr` is the bio. `today` is the dbt Labs work
  with inline links to the three agent projects. `yesterday` is Reddit, Sysdig, and Apple
  straight from the resume data. `in the background` becomes a player that cycles through
  the six testimonials with the same prev / play / next chrome. `by the numbers` holds the
  stats. Nothing in `portfolio.json` had to change.
- **Screenshots become first-class.** Aric's projects come with real product screenshots
  and videos. A rail of large cards per project shows them off far better than a card
  thumbnail did, and far better than the first exploration's text-only index.
- **The "agentic products" framing is Aric's framing.** MCP Apps, the Insights agent, and
  the dev-agent workspace sit in the same category as Nahiyan's work, so the site reads
  as a peer rather than an imitation.
- **The dock solves the mobile nav problem for free.** A thumb-reachable, always-visible
  nav with big targets, no hamburger.
- **Cheap to maintain.** Every page is `Panel` (headline) + `Block` (label + content) on a
  grid. Adding a block is one component.

## Why it will help Aric stand out

The first exploration stands out through typographic restraint. This one stands out
through _interaction_: the site behaves like a small product, and the person reviewing it
is a product person.

1. **The dock is a demo of craft.** Spring-animated pill via shared layout, pointer
   capture for the drag, live preview of the destination page without touching history,
   keyboard arrow navigation, an `aria-live` hint while tuning, Escape to cancel. A
   reviewer who drags it will notice; a reviewer who reads the source will notice more.
2. **It looks like the tools Aric builds.** Agent workspaces, side panes, review surfaces.
   A portfolio that feels like a well-made internal tool is on-brand for someone whose
   best work is well-made internal tools.
3. **It is unmistakable.** Lowercase wide display type, mono body, dot-matrix black, blue
   pill. None of those are in the default portfolio kit, and together they are a
   signature.

## What was adapted rather than copied

- Nahiyan's site is dark only; this keeps the light theme (dot matrix on off-white).
- Fonts are free lookalikes: Unbounded for Widescreen Ex, Commit Mono is the same face.
- The music player became a testimonial player, since there is no audio to play and
  fabricating a "now playing" would be dishonest.
- The dock gains a fifth item, `resume`, because the resume page is a real route here.
- Project detail is a full-screen sheet rather than a separate route, so the existing
  media gallery (with video and lightbox) is reused as-is. Its header mirrors Nahiyan's
  project page: back button, big lowercase title, `role / date / team / my part`.
- `today` links deep-link to a project (`/work?project=<id>`) and open its sheet.
- Panels crossfade with a short stagger; all motion honors reduced-motion preferences.
