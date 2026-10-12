import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

const EMPHASIS = /(_[^_]+_)/g

/** Content strings mark emphasis with underscores: "people _love to use_". */
export const Emphasis = ({ text }: { text: string }) => (
  <>{text.split(EMPHASIS).map((part, index) => (index % 2 ? <em key={index}>{part.slice(1, -1)}</em> : part))}</>
)

/**
 * The "//" that separates everything. Decorative, so hidden from assistive tech. Its spacing is real
 * spaces (so lists can wrap at it), which a flex container would trim: keep it in inline flow.
 */
export const Slash = ({ className }: { className?: string }) => (
  <span aria-hidden className={cn('text-muted-foreground', className)}>
    {' // '}
  </span>
)

/** Status LED. */
export const Dot = ({ live = false, className }: { live?: boolean; className?: string }) => (
  <span
    aria-hidden
    className={cn(
      'mr-2 inline-block size-1.5 rounded-full align-middle',
      live ? 'bg-signal' : 'bg-muted-foreground',
      className,
    )}
  />
)

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export const Reveal = ({ children, className, delay = 0 }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.7, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
)

type SectionLabelProps = {
  id?: string
  index: string
  children: ReactNode
  className?: string
}

export const SectionLabel = ({ id, index, children, className }: SectionLabelProps) => (
  <h2 id={id} className={cn('type-label', className)}>
    <span aria-hidden className="text-muted-foreground">
      {index} //{' '}
    </span>
    {children}
  </h2>
)

/** A display-serif pull statement set between two hairlines. */
export const Statement = ({ text, className }: { text: string; className?: string }) => (
  <Reveal>
    <p
      className={cn(
        'type-display border-y border-border py-6 text-center text-[clamp(1.9rem,3.2vw,3rem)] text-balance',
        className,
      )}
    >
      <Emphasis text={text} />
    </p>
  </Reveal>
)

/** Body copy: sentence case, for anything longer than a label. */
export const Prose = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={cn('max-w-[68ch] leading-relaxed text-pretty text-muted-foreground', className)}>{children}</p>
)
