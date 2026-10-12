import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { Prose, Reveal, SectionLabel, Statement } from '@/components/primitives'
import { Sequencer } from '@/components/sequencer'
import { content } from '@/lib/content'
import { EASE } from '@/lib/motion'

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

export const AboutSection = () => {
  const { profile, stats } = content

  return (
    <section aria-labelledby="about-heading" className="grid gap-x-6 gap-y-16 px-3 py-16 lg:py-20 lg:grid-cols-12">
      <Reveal className="lg:col-span-5 lg:col-start-2">
        <Sequencer />
        <Prose className="mt-4 text-xs">
          I studied electronic production at Berklee before I wrote software, so here's an instrument instead of a stock
          photo. It's sixteen steps of A minor pentatonic — every note works — synthesised live in your browser.
        </Prose>
      </Reveal>

      <div className="flex flex-col gap-10 lg:col-span-5">
        <Reveal>
          <SectionLabel id="about-heading" index="01">
            About
          </SectionLabel>
          <Prose className="mt-4">{profile.bio}</Prose>
        </Reveal>

        <Statement text={`“${profile.quote}”`} />

        <Reveal>
          <dl className="border-t border-border">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-border py-2"
              >
                <dt className="type-label order-2 text-muted-foreground">{stat.label}</dt>
                <dd className="type-display order-1 text-4xl tabular-nums">
                  <CountUp value={stat.value} />
                  {stat.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
