import { EraserIcon, MinusIcon, PlayIcon, PlusIcon, ShuffleIcon, SquareIcon } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { type CSSProperties, type KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { createSequencerEngine, type SequencerEngine, STEPS, VOICES } from '@/lib/sequencer-audio'
import { cn } from '@/lib/utils'

type Pattern = boolean[][]

const MIN_BPM = 60
const MAX_BPM = 160
const BPM_STEP = 4
const TONE_ROWS = VOICES.filter((voice) => voice.kind === 'tone').length

/** Tone rows sweep the brand gradient, top to bottom; the drum rows stay neutral. */
const cellColor = (row: number) =>
  VOICES[row].kind === 'tone' ? `oklch(0.7 0.16 ${195 + (row / (TONE_ROWS - 1)) * 110})` : 'var(--foreground)'

const fromSteps = (stepsByRow: number[][]): Pattern =>
  VOICES.map((_, row) => Array.from({ length: STEPS }, (_, step) => stepsByRow[row]?.includes(step) ?? false))

// One list of steps per voice, top row (C5) first.
const DEFAULT_PATTERN = fromSteps([[10], [8], [6, 11], [3, 12], [14], [0], [2, 6, 10, 14, 15], [0, 6, 8, 14]])
const EMPTY_PATTERN = fromSteps([])

const randomPattern = (): Pattern => {
  const melody = Array.from({ length: STEPS }, () =>
    Math.random() < 0.45 ? Math.floor(Math.random() * TONE_ROWS) : -1,
  )
  return VOICES.map((voice, row) =>
    Array.from({ length: STEPS }, (_, step) => {
      if (voice.kind === 'tone') return melody[step] === row
      if (voice.kind === 'hat') return step % 2 === 0 ? Math.random() < 0.3 : Math.random() < 0.6
      return step % 8 === 0 || Math.random() < 0.15
    }),
  )
}

const ARROWS: Record<string, [row: number, col: number]> = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1],
}

/**
 * A playable 16-step sequencer. The grid is real toggle buttons (one tab stop, arrow keys to move,
 * Space to toggle) and the sound is synthesised on the fly, so nothing is downloaded and nothing
 * plays until the visitor asks for it.
 */
export const Sequencer = () => {
  const [pattern, setPattern] = useState(DEFAULT_PATTERN)
  const [bpm, setBpm] = useState(96)
  const [playing, setPlaying] = useState(false)
  const [step, setStep] = useState(-1)
  const [cursor, setCursor] = useState({ row: 0, col: 0 })
  const reduceMotion = useReducedMotion()
  const gridRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<SequencerEngine | null>(null)
  const latest = useRef({ pattern, bpm })

  useEffect(() => {
    latest.current = { pattern, bpm }
  }, [pattern, bpm])

  useEffect(() => () => engineRef.current?.dispose(), [])

  const getEngine = () => (engineRef.current ??= createSequencerEngine())

  const togglePlay = () => {
    if (playing) {
      getEngine().stop()
      setStep(-1)
    } else {
      getEngine().start(() => latest.current, setStep)
    }
    setPlaying(!playing)
  }

  const toggleCell = (row: number, col: number) => {
    const next = !pattern[row][col]
    setPattern(pattern.map((cells, r) => (r === row ? cells.map((on, c) => (c === col ? next : on)) : cells)))
    if (next && !playing) getEngine().preview(row)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let { row, col } = cursor
    if (event.key in ARROWS) {
      row = (row + ARROWS[event.key][0] + VOICES.length) % VOICES.length
      col = (col + ARROWS[event.key][1] + STEPS) % STEPS
    } else if (event.key === 'Home') {
      col = 0
    } else if (event.key === 'End') {
      col = STEPS - 1
    } else {
      return
    }
    event.preventDefault()
    setCursor({ row, col })
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-cell="${row}-${col}"]`)?.focus()
  }

  // The glow behind the card breathes on the beat, unless the visitor prefers things to hold still.
  const onBeat = playing && !reduceMotion && step % 4 === 0

  return (
    <div className="relative">
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-[conic-gradient(from_200deg,var(--brand-a),var(--brand-b),var(--brand-c),var(--brand-a))] blur-3xl transition-opacity duration-300',
          onBeat ? 'opacity-45' : playing ? 'opacity-30' : 'opacity-15',
        )}
      />
      <div className="bg-card ring-1 ring-foreground/10 max-sm:-mx-4 sm:rounded-2xl">
        <div className="flex items-center justify-between gap-4 px-4 pt-4 font-mono text-xs text-muted-foreground sm:px-5 sm:pt-5">
          <p className="flex items-center gap-2">
            <span
              aria-hidden
              className={cn(
                'size-1.5 rounded-full',
                playing ? 'bg-primary motion-safe:animate-pulse' : 'bg-muted-foreground/50',
              )}
            />
            {playing ? 'now playing' : 'sound is off — press play'}
          </p>
          <p aria-hidden className="tabular-nums">
            {playing ? `step ${String(step + 1).padStart(2, '0')}/${STEPS}` : `${STEPS} steps`}
          </p>
        </div>

        <div
          ref={gridRef}
          role="grid"
          aria-label="Step sequencer. Rows are notes, columns are steps. Use the arrow keys to move and Space to toggle a step."
          onKeyDown={handleKeyDown}
          className="py-3 sm:px-5"
        >
          {VOICES.map((voice, row) => (
            <div
              key={voice.label}
              role="row"
              className="grid grid-cols-[repeat(16,minmax(0,1fr))] items-center sm:grid-cols-[2.25rem_repeat(16,minmax(0,1fr))]"
            >
              <span role="rowheader" className="hidden font-mono text-xs text-muted-foreground sm:block">
                {voice.label}
              </span>
              {pattern[row].map((on, col) => {
                const current = col === step
                return (
                  <div key={col} role="gridcell">
                    <button
                      type="button"
                      data-cell={`${row}-${col}`}
                      tabIndex={cursor.row === row && cursor.col === col ? 0 : -1}
                      aria-pressed={on}
                      aria-label={`${voice.name}, step ${col + 1}`}
                      onClick={() => toggleCell(row, col)}
                      onFocus={() => setCursor({ row, col })}
                      style={{ '--cell': cellColor(row) } as CSSProperties}
                      className={cn(
                        'group/cell relative block aspect-square w-full cursor-pointer outline-none focus-visible:z-10 focus-visible:rounded-md focus-visible:ring-3 focus-visible:ring-ring/60',
                        // The playhead is a soft column behind the dots.
                        current && 'bg-foreground/[0.07]',
                        current && row === 0 && 'rounded-t-full',
                        current && row === VOICES.length - 1 && 'rounded-b-full',
                      )}
                    >
                      <span
                        className={cn(
                          'absolute top-1/2 left-1/2 aspect-square -translate-1/2 rounded-full transition-[width,background-color,box-shadow] duration-150 motion-reduce:transition-none',
                          on
                            ? 'w-[62%] bg-(--cell)'
                            : 'w-[16%] bg-foreground/20 group-hover/cell:w-[38%] group-hover/cell:bg-(--cell)/60',
                          !on && col % 4 === 0 && 'bg-foreground/45',
                          current && on && 'w-[86%] shadow-[0_0_18px_var(--cell)] duration-75',
                        )}
                      />
                    </button>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-border/60 px-4 py-3 sm:px-5">
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={togglePlay} aria-pressed={playing} className="min-w-20">
              {playing ? <SquareIcon data-icon="inline-start" /> : <PlayIcon data-icon="inline-start" />}
              {playing ? 'Stop' : 'Play'}
            </Button>
            <Button variant="outline" onClick={() => setPattern(randomPattern())}>
              <ShuffleIcon data-icon="inline-start" />
              Shuffle
            </Button>
            <Button variant="ghost" onClick={() => setPattern(EMPTY_PATTERN)}>
              <EraserIcon data-icon="inline-start" />
              Clear
            </Button>
          </div>
          <div role="group" aria-label="Tempo" className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setBpm(Math.max(MIN_BPM, bpm - BPM_STEP))}
              disabled={bpm <= MIN_BPM}
              aria-label="Slower"
            >
              <MinusIcon />
            </Button>
            <output aria-live="polite" className="w-[4.75rem] text-center font-mono text-sm tabular-nums">
              {bpm} BPM
            </output>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setBpm(Math.min(MAX_BPM, bpm + BPM_STEP))}
              disabled={bpm >= MAX_BPM}
              aria-label="Faster"
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
