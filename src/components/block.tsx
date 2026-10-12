import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BlockProps = {
  label: string
  children: ReactNode
  className?: string
  /** Pass a heading level when the label should be a heading (default h2). */
  as?: 'h2' | 'h3'
  /** Extra content rendered inline at the right end of the label row. */
  aside?: ReactNode
}

/** A labelled block: lowercase mono label over a rule, then content. The unit everything is built from. */
export const Block = ({ label, children, className, as: Heading = 'h2', aside }: BlockProps) => (
  <section className={cn('flex flex-col gap-4', className)}>
    <div className="rule-b flex items-baseline justify-between gap-4 pb-2">
      <Heading className="block-label">{label}</Heading>
      {aside}
    </div>
    <div className="text-[15px] leading-relaxed">{children}</div>
  </section>
)
