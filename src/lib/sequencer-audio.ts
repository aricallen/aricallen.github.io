export const STEPS = 16

export type Voice = { label: string; name: string } & ({ kind: 'tone'; freq: number } | { kind: 'hat' | 'kick' })

/** Top row first. The tones are A minor pentatonic, so no combination of cells can clash. */
export const VOICES: Voice[] = [
  { label: 'C5', name: 'C5', kind: 'tone', freq: 523.25 },
  { label: 'A4', name: 'A4', kind: 'tone', freq: 440 },
  { label: 'G4', name: 'G4', kind: 'tone', freq: 392 },
  { label: 'E4', name: 'E4', kind: 'tone', freq: 329.63 },
  { label: 'D4', name: 'D4', kind: 'tone', freq: 293.66 },
  { label: 'C4', name: 'C4', kind: 'tone', freq: 261.63 },
  { label: 'HAT', name: 'Hi-hat', kind: 'hat' },
  { label: 'KCK', name: 'Kick', kind: 'kick' },
]

export type SequencerSnapshot = { pattern: boolean[][]; bpm: number }

type Graph = {
  ctx: AudioContext
  master: GainNode
  echo: GainNode
  noise: AudioBuffer
}

// The timer wakes far more often than a step lasts and schedules a little way ahead on the
// audio clock, so timing stays sample-accurate even when the main thread is busy.
const TICK_MS = 25
const SCHEDULE_AHEAD_S = 0.12
const SILENCE = 0.0001

const createGraph = (): Graph => {
  const ctx = new AudioContext()
  const master = ctx.createGain()
  master.gain.value = 0.55
  master.connect(ctx.createDynamicsCompressor()).connect(ctx.destination)

  const echo = ctx.createGain()
  echo.gain.value = 0.28
  const delay = ctx.createDelay(1)
  delay.delayTime.value = 0.28
  const feedback = ctx.createGain()
  feedback.gain.value = 0.32
  echo.connect(delay)
  delay.connect(feedback).connect(delay)
  delay.connect(master)

  const noise = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.2), ctx.sampleRate)
  const samples = noise.getChannelData(0)
  for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1

  return { ctx, master, echo, noise }
}

const trigger = ({ ctx, master, echo, noise }: Graph, voice: Voice, time: number) => {
  const amp = ctx.createGain()

  if (voice.kind === 'tone') {
    const osc = ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.value = voice.freq
    amp.gain.setValueAtTime(SILENCE, time)
    amp.gain.exponentialRampToValueAtTime(0.5, time + 0.008)
    amp.gain.exponentialRampToValueAtTime(SILENCE, time + 0.5)
    osc.connect(amp)
    amp.connect(master)
    amp.connect(echo)
    osc.start(time)
    osc.stop(time + 0.55)
    return
  }

  if (voice.kind === 'hat') {
    const source = ctx.createBufferSource()
    source.buffer = noise
    const highpass = ctx.createBiquadFilter()
    highpass.type = 'highpass'
    highpass.frequency.value = 7000
    amp.gain.setValueAtTime(0.2, time)
    amp.gain.exponentialRampToValueAtTime(SILENCE, time + 0.06)
    source.connect(highpass).connect(amp).connect(master)
    source.start(time)
    source.stop(time + 0.08)
    return
  }

  const osc = ctx.createOscillator()
  osc.frequency.setValueAtTime(150, time)
  osc.frequency.exponentialRampToValueAtTime(45, time + 0.12)
  amp.gain.setValueAtTime(0.9, time)
  amp.gain.exponentialRampToValueAtTime(SILENCE, time + 0.3)
  osc.connect(amp).connect(master)
  osc.start(time)
  osc.stop(time + 0.32)
}

/** A 16-step sequencer on the Web Audio clock. Nothing is created until the first user gesture. */
export const createSequencerEngine = () => {
  let graph: Graph | null = null
  let timer: number | undefined
  const uiTimers = new Set<number>()

  const getGraph = () => {
    graph ??= createGraph()
    void graph.ctx.resume()
    return graph
  }

  const stop = () => {
    window.clearInterval(timer)
    timer = undefined
    uiTimers.forEach((id) => window.clearTimeout(id))
    uiTimers.clear()
  }

  return {
    /** `read` is called for every step so edits made while playing are heard on the next pass. */
    start(read: () => SequencerSnapshot, onStep: (step: number) => void) {
      stop()
      const active = getGraph()
      let step = 0
      let nextTime = active.ctx.currentTime + 0.06

      const schedule = () => {
        while (nextTime < active.ctx.currentTime + SCHEDULE_AHEAD_S) {
          const { pattern, bpm } = read()
          VOICES.forEach((voice, row) => {
            if (pattern[row][step]) trigger(active, voice, nextTime)
          })

          const shown = step
          const id = window.setTimeout(
            () => {
              uiTimers.delete(id)
              onStep(shown)
            },
            Math.max(0, (nextTime - active.ctx.currentTime) * 1000),
          )
          uiTimers.add(id)

          nextTime += 60 / bpm / 4
          step = (step + 1) % STEPS
        }
      }

      schedule()
      timer = window.setInterval(schedule, TICK_MS)
    },
    stop,
    /** Sound a single voice now, for feedback when a cell is switched on. */
    preview(row: number) {
      const active = getGraph()
      trigger(active, VOICES[row], active.ctx.currentTime + 0.01)
    },
    dispose() {
      stop()
      void graph?.ctx.close()
      graph = null
    },
  }
}

export type SequencerEngine = ReturnType<typeof createSequencerEngine>
