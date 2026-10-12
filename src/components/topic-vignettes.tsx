import { content } from '@/lib/content'

// Tiny looping scenes, one per topic, drawn in markup rather than shipped as images. They are
// decoration (the card's title says what it is), so the whole thing is hidden from assistive tech.

const chip = 'rounded-full bg-white/75 px-2.5 py-0.5 font-mono text-[0.68rem] leading-5'

/** A streaming agent turn: question, reasoning, tool calls, then a chart draws itself. */
const AgentsVignette = () => (
  <div className="flex h-full flex-col justify-between">
    <span className="ambient v-step-1 self-end rounded-full bg-ink px-3 py-0.5 font-mono text-[0.68rem] leading-5 text-white">
      revenue by month?
    </span>
    <span className="ambient v-step-2 flex items-center gap-1.5">
      <span className={chip}>✓ list_metrics</span>
      <span className={chip}>✓ query</span>
    </span>
    <svg viewBox="0 0 220 26" preserveAspectRatio="none" className="h-7 w-full overflow-visible">
      <path
        d="M2 22 L30 18 L58 20 L86 12 L114 14 L142 7 L170 9 L218 2"
        pathLength={1}
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ambient v-chart"
      />
    </svg>
  </div>
)

/** A scrap of UI built from tokens, flipping between light and dark. */
const SystemsVignette = () => (
  <div className="flex h-full items-center gap-3">
    <div className="ambient v-invert flex flex-1 flex-col gap-2 rounded-lg bg-white p-3 shadow-sm">
      <span className="h-2 w-2/5 rounded-full bg-neutral-900" />
      <span className="h-2 w-4/5 rounded-full bg-neutral-300" />
      <span className="flex gap-2 pt-0.5">
        <span className="h-5 w-14 rounded bg-indigo-600" />
        <span className="h-5 w-14 rounded border border-neutral-300" />
      </span>
    </div>
    <div className="flex flex-col items-center gap-1.5">
      <span className="flex h-4 w-7.5 items-center rounded-full bg-ink p-0.5">
        <span className="ambient v-knob size-3 rounded-full bg-white" />
      </span>
      <span className="font-mono text-[0.68rem]">--bg</span>
    </div>
  </div>
)

/** Render time before and after the compiler migration, using the stat from the content file. */
const PlatformVignette = () => {
  const cut = content.stats.find((stat) => stat.suffix === '%')?.value ?? 50

  return (
    <div className="flex h-full flex-col justify-center gap-2 font-mono text-[0.68rem] leading-none">
      <span className="flex items-center justify-between">
        render time
        <span className="ambient v-pop rounded-full bg-white/75 px-2.5 py-1 font-semibold">−{cut}%</span>
      </span>
      <span className="h-3.5 rounded-sm bg-ink/25" />
      <span
        style={{ '--v-to': (100 - cut) / 100 } as React.CSSProperties}
        className="ambient v-shrink h-3.5 rounded-sm bg-ink"
      />
    </div>
  )
}

const VIGNETTES: Record<string, () => React.JSX.Element> = {
  agents: AgentsVignette,
  systems: SystemsVignette,
  platform: PlatformVignette,
}

export const TopicVignette = ({ topicId }: { topicId: string }) => {
  const Vignette = VIGNETTES[topicId]
  return (
    <span aria-hidden className="block h-[5.75rem]">
      {Vignette && <Vignette />}
    </span>
  )
}
