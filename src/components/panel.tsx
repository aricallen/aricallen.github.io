import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { rise } from '@/lib/motion'
import { cn } from '@/lib/utils'

type PanelProps = {
  /** Page headline, rendered lowercase in the display face. */
  title: string
  /** Heading level for the headline; the root panel uses h1 for the name. */
  as?: 'h1' | 'h2'
  children: ReactNode
  className?: string
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

/** A dock "page": big lowercase headline, then whatever grid the page needs, with staggered reveal. */
export const Panel = ({ title, as: Heading = 'h2', children, className }: PanelProps) => (
  <motion.div
    variants={stagger}
    initial="hidden"
    animate="visible"
    className={cn(
      'mx-auto flex w-full max-w-[1400px] flex-col gap-12 px-5 pt-14 pb-40 sm:px-8 sm:pt-20 lg:gap-16',
      className,
    )}
  >
    <motion.div variants={rise}>
      <Heading className="headline text-[clamp(3rem,9vw,7.5rem)]">{title}</Heading>
    </motion.div>
    {children}
  </motion.div>
)

/** A staggered child of a Panel. Pass `variants={rise}` from `@/lib/motion`. */
export const PanelItem = motion.div
