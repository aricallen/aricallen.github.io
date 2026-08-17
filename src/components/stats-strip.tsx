import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { content, type Stat } from '@/lib/content'

const CountUp = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || !inView) return
    if (reduceMotion) {
      node.textContent = String(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest))
      },
    })
    return () => controls.stop()
  }, [inView, value, reduceMotion])

  return <span ref={ref}>0</span>
}

const StatItem = ({ stat, index }: { stat: Stat; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    className="flex flex-col gap-1"
  >
    <span className="font-heading text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
      <CountUp value={stat.value} />
      {stat.suffix}
    </span>
    <span className="max-w-[16rem] text-sm text-muted-foreground">{stat.label}</span>
  </motion.div>
)

export const StatsStrip = () => (
  <section aria-label="Career stats" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <div className="grid grid-cols-2 gap-8 border-y border-border/60 py-10 md:grid-cols-4">
      {content.stats.map((stat, index) => (
        <StatItem key={stat.label} stat={stat} index={index} />
      ))}
    </div>
  </section>
)
