import { PauseIcon, PlayIcon } from 'lucide-react'
import { toggleAmbientMotion, useAmbientPaused } from '@/lib/ambient'

/** Freezes every looping animation on the site (drifting dots, bobbing cards, the card vignettes). */
export const PauseToggle = () => {
  const paused = useAmbientPaused()
  const Icon = paused ? PlayIcon : PauseIcon

  return (
    <button
      type="button"
      onClick={toggleAmbientMotion}
      aria-pressed={paused}
      aria-label="Pause animations"
      className="type-label flex cursor-pointer items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
    >
      <Icon aria-hidden className="size-3" />
      <span aria-hidden className="max-sm:hidden">
        {paused ? 'play animations' : 'pause animations'}
      </span>
    </button>
  )
}
