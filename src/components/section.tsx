import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionProps = {
  id: string
  /** Small mono label shown in the left column, e.g. "Selected work". */
  label: string
  /** Index shown next to the label, e.g. "01". */
  index: string
  /** Optional display-serif statement in the left column under the label. */
  statement?: ReactNode
  /** Optional mono paragraph(s) under the statement. */
  intro?: ReactNode
  children: ReactNode
  className?: string
}

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' } as const,
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
}

/**
 * Editorial two-column section: a labeled sidebar column (label, statement, intro) and a
 * content column, divided by a top rule. Stacks on small screens.
 */
export const Section = ({ id, label, index, statement, intro, children, className }: SectionProps) => (
  <section
    id={id}
    aria-labelledby={`${id}-heading`}
    className={cn(
      'scroll-mt-bar rule-t grid grid-cols-1 gap-x-6 gap-y-8 px-4 py-10 sm:px-6 lg:grid-cols-[2fr_3fr] lg:py-14',
      className,
    )}
  >
    <motion.div {...reveal} className="flex flex-col gap-6">
      <h2 id={`${id}-heading`} className="label flex items-center gap-3 text-muted-foreground">
        <span aria-hidden className="text-accent-ink">
          {index}
        </span>
        <span aria-hidden>//</span>
        <span className="text-foreground">{label}</span>
      </h2>
      {statement && (
        <p className="display max-w-xl text-[clamp(1.7rem,3.4vw,3rem)] text-balance lg:pr-10">{statement}</p>
      )}
      {intro && <div className="label flex max-w-md flex-col gap-4 leading-relaxed text-muted-foreground">{intro}</div>}
    </motion.div>
    <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
      {children}
    </motion.div>
  </section>
)
