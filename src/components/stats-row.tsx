import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { Band } from '@/components/frame'
import { content, type Tone } from '@/lib/content'
import { EASE } from '@/lib/motion'

const TONES: Tone[] = ['lime', 'sky', 'pink', 'peach']

const CountUp = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || !inView || reduceMotion) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest))
      },
    })
    return () => controls.stop()
  }, [inView, value, reduceMotion])

  // Rendered with the final value so the number is right without JS-driven animation.
  return <span ref={ref}>{value}</span>
}

export const StatsRow = () => (
  <section aria-label="Career stats">
    <Band className="grid grid-cols-2 lg:grid-cols-4">
      {content.stats.map((stat, index) => (
        <div
          key={stat.label}
          data-tone={TONES[index % TONES.length]}
          className="border-border px-5 py-8 max-lg:odd:border-r max-lg:nth-[-n+2]:border-b sm:px-8 sm:py-10 lg:not-last:border-r"
        >
          <p className="font-heading text-5xl tracking-[-0.03em] tabular-nums sm:text-6xl">
            <span className="pill [animation:none] [background-size:100%_100%]">
              <CountUp value={stat.value} />
              {stat.suffix}
            </span>
          </p>
          <p className="type-label mt-4 max-w-[17rem] text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </Band>
  </section>
)
