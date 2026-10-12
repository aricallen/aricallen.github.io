import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type HalftonePortraitProps = {
  src: string
  alt: string
  className?: string
}

// Roughly a hundred dots across, so the face still reads on a phone.
const MIN_CELL = 4
const MAX_CELL = 6
const BASE_ALPHA = 0.58
const LENS_RADIUS = 120
const REVEAL_MS = 1600
const TAU = Math.PI * 2

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

/**
 * Renders a photo as a halftone: one dot per cell, sized by the tone underneath it. Dots swell
 * under the pointer like a lens. The canvas only animates while it is revealing or being touched.
 */
export const HalftonePortrait = ({ src, alt, className }: HalftonePortraitProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const sampler = document.createElement('canvas')
    const samplerCtx = sampler.getContext('2d', { willReadFrequently: true })
    if (!canvas || !ctx || !samplerCtx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const image = new Image()
    const pointer = { x: 0, y: 0, power: 0, over: false }
    let tones = new Float32Array(0)
    let grain = new Float32Array(0)
    let cell = MAX_CELL
    let cols = 0
    let rows = 0
    let width = 0
    let height = 0
    let frame = 0
    let reveal = reduceMotion ? 1 : 0
    let revealStart = 0

    const sample = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      if (!width || !height || !image.naturalWidth) return

      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cell = Math.min(MAX_CELL, Math.max(MIN_CELL, width / 100))
      cols = Math.floor(width / cell)
      rows = Math.floor(height / cell)
      sampler.width = cols
      sampler.height = rows
      const scale = Math.max(cols / image.naturalWidth, rows / image.naturalHeight)
      const w = image.naturalWidth * scale
      const h = image.naturalHeight * scale
      samplerCtx.drawImage(image, (cols - w) / 2, (rows - h) / 2, w, h)

      const { data } = samplerCtx.getImageData(0, 0, cols, rows)
      tones = new Float32Array(cols * rows)
      grain = new Float32Array(cols * rows)
      for (let i = 0; i < tones.length; i++) {
        tones[i] = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255
        const hash = Math.sin(i * 12.9898) * 43758.5453
        grain[i] = hash - Math.floor(hash)
      }
    }

    const draw = () => {
      if (!cols) return
      // Light dots on ink, ink dots on paper: the dot always stands for "not background".
      const dark = document.documentElement.classList.contains('dark')
      const lensed: number[] = []

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = getComputedStyle(canvas).color
      ctx.globalAlpha = BASE_ALPHA
      ctx.beginPath()
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x
          const tone = dark ? tones[i] : 1 - tones[i]
          const nx = ((x + 0.5) / cols) * 2 - 1
          const ny = ((y + 0.5) / rows) * 2 - 1
          const vignette = clamp01((1.06 - Math.hypot(nx, ny * 0.94)) / 0.36)
          const appear = clamp01(reveal * 2 - grain[i])
          let radius = cell * 0.48 * Math.pow(tone, 1.4) * vignette * appear
          const cx = x * cell + cell / 2
          const cy = y * cell + cell / 2

          if (pointer.power > 0.01) {
            const distance = Math.hypot(cx - pointer.x, cy - pointer.y)
            if (distance < LENS_RADIUS) {
              const lens = Math.pow(1 - distance / LENS_RADIUS, 2) * pointer.power * vignette
              radius = Math.min(cell * 0.62, radius * (1 + lens) + lens * 1.2)
              if (lens > 0.02) {
                lensed.push(cx, cy, radius, lens)
                continue
              }
            }
          }

          if (radius < 0.3) continue
          ctx.moveTo(cx + radius, cy)
          ctx.arc(cx, cy, radius, 0, TAU)
        }
      }
      ctx.fill()

      for (let i = 0; i < lensed.length; i += 4) {
        ctx.globalAlpha = BASE_ALPHA + (1 - BASE_ALPHA) * Math.min(1, lensed[i + 3] * 1.5)
        ctx.beginPath()
        ctx.arc(lensed[i], lensed[i + 1], lensed[i + 2], 0, TAU)
        ctx.fill()
      }
    }

    const tick = (now: number) => {
      frame = 0
      if (reveal < 1) {
        revealStart ||= now
        reveal = Math.min(1, (now - revealStart) / REVEAL_MS)
      }
      pointer.power += ((pointer.over ? 1 : 0) - pointer.power) * 0.12
      draw()
      if (reveal < 1 || pointer.over || pointer.power > 0.01) requestFrame()
    }

    const requestFrame = () => {
      frame ||= requestAnimationFrame(tick)
    }

    // Listened for on the window because the hero headline overlaps the portrait.
    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.over =
        !reduceMotion && pointer.x > 0 && pointer.y > 0 && pointer.x < rect.width && pointer.y < rect.height
      if (pointer.over || pointer.power > 0.01) requestFrame()
    }

    const refresh = () => {
      sample()
      requestFrame()
    }

    image.addEventListener('load', refresh)
    image.src = src
    const resizeObserver = new ResizeObserver(refresh)
    resizeObserver.observe(canvas)
    // The dot colour follows the theme, which is a class on <html>.
    const themeObserver = new MutationObserver(requestFrame)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      image.removeEventListener('load', refresh)
      resizeObserver.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [src])

  return <canvas ref={canvasRef} role="img" aria-label={alt} className={cn('text-foreground', className)} />
}
