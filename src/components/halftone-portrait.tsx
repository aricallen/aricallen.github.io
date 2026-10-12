import { useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type HalftonePortraitProps = {
  src: string
  alt: string
  /** Number of dot columns across the image. More columns = finer screen. */
  columns?: number
  className?: string
}

const CELL_SCALE = 1.15

/** Reads the current ink color so dots match the theme (bone on black, ink on paper). */
const getInk = (node: HTMLElement) => getComputedStyle(node).color

const isDark = () => document.documentElement.classList.contains('dark')

/**
 * Renders a photo as a halftone dot screen on a canvas. The screen is re-sampled whenever
 * the theme flips so the dots invert correctly: on paper, dark areas are the big dots;
 * on black, the highlights are.
 */
export const HalftonePortrait = ({ src, alt, columns = 88, className }: HalftonePortraitProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const image = new Image()
    image.decoding = 'async'
    image.src = src

    let frame = 0
    let samples: Float32Array | null = null
    let rows = 0

    // Sample luminance once per cell from a downscaled copy of the image.
    const sample = () => {
      rows = Math.round((columns * image.naturalHeight) / image.naturalWidth)
      const offscreen = document.createElement('canvas')
      offscreen.width = columns
      offscreen.height = rows
      const octx = offscreen.getContext('2d', { willReadFrequently: true })
      if (!octx) return
      octx.drawImage(image, 0, 0, columns, rows)
      const { data } = octx.getImageData(0, 0, columns, rows)
      samples = new Float32Array(columns * rows)
      for (let i = 0; i < samples.length; i++) {
        const r = data[i * 4]
        const g = data[i * 4 + 1]
        const b = data[i * 4 + 2]
        samples[i] = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
      }
    }

    const draw = (progress: number) => {
      if (!samples) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = canvas.clientWidth
      const height = (width * rows) / columns
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = getInk(canvas)

      const cell = width / columns
      const dark = isDark()
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const lum = samples[y * columns + x]
          const weight = dark ? lum : 1 - lum
          // Reveal sweeps top to bottom so the portrait "prints" in.
          const rowProgress = Math.min(1, Math.max(0, progress * (rows + 12) - y) / 12)
          const radius = Math.pow(weight, 1.35) * (cell / 2) * CELL_SCALE * rowProgress
          if (radius < 0.15) continue
          ctx.beginPath()
          ctx.arc(x * cell + cell / 2, y * cell + cell / 2, radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const render = () => {
      cancelAnimationFrame(frame)
      if (reduceMotion) {
        draw(1)
        return
      }
      const start = performance.now()
      const duration = 1100
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        draw(1 - Math.pow(1 - t, 3))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    const resize = () => draw(1)

    image.onload = () => {
      sample()
      render()
    }

    const observer = new MutationObserver(() => draw(1))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [src, columns, reduceMotion])

  return (
    <canvas ref={canvasRef} role="img" aria-label={alt} className={cn('block w-full text-foreground', className)} />
  )
}
