import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import type { Tone } from '@/lib/content'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

type BandProps = {
  children: ReactNode
  /** Classes for the framed column */
  className?: string
  /** Classes for the full-bleed strip the column sits in */
  outerClassName?: string
}

/**
 * The page is a stack of bands. Each band's bottom rule runs edge to edge, while its content sits
 * in a centred column with a rule down either side, so the whole site reads as one ruled sheet.
 */
export const Band = ({ children, className, outerClassName }: BandProps) => (
  <div className={cn('border-b border-border px-3 sm:px-8 lg:px-[3.875rem]', outerClassName)}>
    <div className={cn('mx-auto max-w-[84rem] border-x border-border', className)}>{children}</div>
  </div>
)

/** Highlighter behind a word or two. */
export const Pill = ({ tone, children, className }: { tone: Tone; children: ReactNode; className?: string }) => (
  <span data-tone={tone} className={cn('pill', className)}>
    {children}
  </span>
)

const Sparkle = ({ tone, className }: { tone: Tone; className?: string }) => (
  <svg aria-hidden data-tone={tone} viewBox="0 0 24 24" className={cn('inline-block size-6', className)}>
    <path
      d="M12 1c.9 5.6 4.4 9.1 10 10-5.6.9-9.100 4.400-10 10-.9-5.600-4.400-9.100-10-10 5.600-.9 9.100-4.400 10-10Z"
      fill="var(--tone)"
      stroke="var(--tone-ink)"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
)

export const SectionTitle = ({ id, children }: { id: string; children: ReactNode }) => (
  <Band className="px-4 py-14 text-center sm:py-20">
    <h2 id={id} className="font-heading text-[clamp(1.9rem,3.2vw,2.75rem)] tracking-[-0.02em]">
      <Sparkle tone="pink" className="mr-3 -rotate-12 align-[-0.1em]" />
      {children}
      <Sparkle tone="lime" className="ml-3 rotate-12 align-[-0.1em]" />
    </h2>
  </Band>
)

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export const Reveal = ({ children, className, delay = 0 }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.7, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
)
