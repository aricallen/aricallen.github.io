import { GraduationCapIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { Sequencer } from '@/components/sequencer'
import { content } from '@/lib/content'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

export const PlaySection = () => {
  const { education } = content.resume
  // "Bachelor of Arts, Electronic Production & Design" → the field of study.
  const field = education.degree.split(', ').at(-1)

  return (
    <section
      id="play"
      aria-labelledby="play-heading"
      className="mx-auto grid max-w-6xl scroll-mt-20 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.55fr] lg:gap-14"
    >
      <motion.div {...reveal}>
        <p className="mb-2 font-mono text-sm text-primary">// off the clock</p>
        <h2 id="play-heading" className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Something to play with
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          I trained in electronic production before I shipped interfaces, so here's an instrument instead of a paragraph
          about it. Sixteen steps, tuned to A minor pentatonic so every note works, synthesised live in your browser.
        </p>
        <p className="mt-6 flex items-start gap-2 font-mono text-xs text-muted-foreground">
          <GraduationCapIcon aria-hidden className="mt-px size-3.5 shrink-0 text-primary" />
          <span>
            {education.school} · {field}
          </span>
        </p>
      </motion.div>

      <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
        <Sequencer />
      </motion.div>
    </section>
  )
}
