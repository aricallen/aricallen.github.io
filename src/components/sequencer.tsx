import { type KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Dot } from '@/components/primitives'
import { pad } from '@/lib/format'
import { setNowPlaying } from '@/lib/now-playing'
import { createSequencerEngine, type SequencerEngine, STEPS, VOICES } from '@/lib/sequencer-audio'
import { cn } from '@/lib/utils'

type Pattern = boolean[][]

const MIN_BPM = 60
const MAX_BPM = 160
const BPM_STEP = 4
const TONE_ROWS = VOICES.filter((voice) => voice.kind === 'tone').length

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
  const gridRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<SequencerEngine | null>(null)
  const latest = useRef({ pattern, bpm })

  useEffect(() => {
    latest.current = { pattern, bpm }
  }, [pattern, bpm])

  useEffect(() => {
    setNowPlaying(playing ? { bpm } : null)
  }, [playing, bpm])

  useEffect(
    () => () => {
      engineRef.current?.dispose()
      setNowPlaying(null)
    },
    [],
  )

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

  return (
    <div>
      <div className="type-label flex items-center justify-between border-y border-border py-2 text-muted-foreground">
        <p>
          <Dot live={playing} className={cn(playing && 'animate-blink')} />
          {playing ? 'You are playing the sequencer' : 'Sound is off — press play'}
        </p>
        <p aria-hidden className="tabular-nums">
          {playing ? `Step ${pad(step + 1)}/${STEPS}` : `${STEPS} steps`}
        </p>
      </div>

      <div
        ref={gridRef}
        role="grid"
        aria-label="Step sequencer. Rows are notes, columns are steps. Use the arrow keys to move and Space to toggle a step."
        onKeyDown={handleKeyDown}
        className="-mx-3 py-3 sm:mx-0"
      >
        {VOICES.map((voice, row) => (
          <div
            key={voice.label}
            role="row"
            className="grid grid-cols-[repeat(16,minmax(0,1fr))] items-center sm:grid-cols-[2.25rem_repeat(16,minmax(0,1fr))]"
          >
            <span role="rowheader" className="type-label hidden text-muted-foreground sm:block">
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
                    className="group/cell relative block aspect-square w-full cursor-pointer focus-visible:z-10"
                  >
                    <span
                      className={cn(
                        'absolute top-1/2 left-1/2 aspect-square -translate-1/2 rounded-full transition-[width,background-color] duration-150',
                        on
                          ? 'w-[64%] bg-foreground'
                          : 'w-[14%] bg-foreground/30 group-hover/cell:w-[34%] group-hover/cell:bg-foreground/70',
                        !on && col % 4 === 0 && 'bg-foreground/60',
                        current && (on ? 'w-[88%] bg-signal duration-75' : 'w-[22%] bg-signal'),
                      )}
                    />
                  </button>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="type-label flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-y border-border py-1">
        <div className="-ml-1.5 flex flex-wrap items-center">
          <button type="button" onClick={togglePlay} aria-pressed={playing} className="bracket">
            {playing ? '■ Stop' : '▶ Play'}
          </button>
          <button type="button" onClick={() => setPattern(randomPattern())} className="bracket">
            Shuffle
          </button>
          <button type="button" onClick={() => setPattern(EMPTY_PATTERN)} className="bracket">
            Clear
          </button>
        </div>
        <div role="group" aria-label="Tempo" className="-mr-1.5 flex items-center">
          <button
            type="button"
            onClick={() => setBpm(Math.max(MIN_BPM, bpm - BPM_STEP))}
            disabled={bpm <= MIN_BPM}
            aria-label="Slower"
            className="bracket disabled:pointer-events-none disabled:opacity-40"
          >
            −
          </button>
          <output aria-live="polite" className="px-1 tabular-nums">
            {bpm} BPM
          </output>
          <button
            type="button"
            onClick={() => setBpm(Math.min(MAX_BPM, bpm + BPM_STEP))}
            disabled={bpm >= MAX_BPM}
            aria-label="Faster"
            className="bracket disabled:pointer-events-none disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
