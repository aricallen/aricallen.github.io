import { useSyncExternalStore } from 'react'

// Looping decoration (drifting dots, bobbing cards, the vignettes) can be frozen by the visitor.
// The state lives in an attribute on <html> so CSS can act on it directly; index.html sets the
// initial value before first paint, defaulting to paused when the OS asks for reduced motion.
const STORAGE_KEY = 'motion'
const listeners = new Set<() => void>()

const isPaused = () => document.documentElement.dataset.motion === 'paused'

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const toggleAmbientMotion = () => {
  const next = isPaused() ? 'playing' : 'paused'
  document.documentElement.dataset.motion = next
  localStorage.setItem(STORAGE_KEY, next)
  listeners.forEach((listener) => listener())
}

export const useAmbientPaused = () => useSyncExternalStore(subscribe, isPaused)
