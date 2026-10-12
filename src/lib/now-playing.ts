import { useSyncExternalStore } from 'react'

type NowPlaying = { bpm: number } | null

// The sequencer lives in the page and the status bar lives in the layout; this is the wire between them.
let current: NowPlaying = null
const listeners = new Set<() => void>()

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const setNowPlaying = (next: NowPlaying) => {
  if (next?.bpm === current?.bpm) return
  current = next
  listeners.forEach((listener) => listener())
}

export const useNowPlaying = () => useSyncExternalStore(subscribe, () => current)
