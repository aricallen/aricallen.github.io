import { ArrowDownIcon, MapPinIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { type CSSProperties, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { asset, content } from '@/lib/content'
import { cn } from '@/lib/utils'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const RotatingRole = ({ roles }: { roles: string[] }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600)
    return () => clearInterval(id)
  }, [roles.length])

  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={roles[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient whitespace-nowrap"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const INNER_RING_SIZE = 6

/** Spread chips evenly around two orbits; the outer one is offset so chips don't line up. */
const orbitPosition = (index: number, total: number) => {
  const inner = index < INNER_RING_SIZE
  const ringIndex = inner ? index : index - INNER_RING_SIZE
  const ringCount = inner ? Math.min(total, INNER_RING_SIZE) : total - INNER_RING_SIZE
  const angle = ((ringIndex + (inner ? 0 : 0.5)) / ringCount) * 2 * Math.PI - Math.PI / 2
  const radius = inner ? 54 : 74
  return {
    inner,
    position: {
      '--chip-x': `${50 + radius * Math.cos(angle)}%`,
      '--chip-y': `${50 + radius * Math.sin(angle)}%`,
    } as CSSProperties,
    floatDelay: { animationDelay: `${-index * 0.9}s` },
  }
}

export const Hero = () => {
  const { profile } = content

  return (
    <section
      id="about"
      aria-label="Introduction"
      className="relative mx-auto max-w-6xl px-4 pt-36 pb-20 sm:px-6 sm:pt-44"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.p variants={item} className="mb-4 flex items-center gap-1.5 font-mono text-sm text-muted-foreground">
            <MapPinIcon aria-hidden className="size-3.5 text-primary" />
            {profile.location}
          </motion.p>
          <motion.h1
            variants={item}
            className="font-heading text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl"
          >
            {profile.name}
          </motion.h1>
          <motion.p variants={item} className="mt-3 font-heading text-2xl font-medium sm:text-3xl">
            <RotatingRole roles={profile.roles} />
          </motion.p>
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {profile.bio}
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" nativeButton={false} render={<a href="#work" />}>
              See my work
              <ArrowDownIcon data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline" nativeButton={false} render={<Link to="/resume" />}>
              Resume
            </Button>
          </motion.div>
          <motion.blockquote
            variants={item}
            className="mt-10 border-l-2 border-primary/50 pl-4 font-mono text-sm text-muted-foreground italic"
          >
            “{profile.quote}”
          </motion.blockquote>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-fit"
        >
          <div
            aria-hidden
            className="animate-spin-slow absolute -inset-1.5 rounded-full bg-[conic-gradient(from_0deg,var(--brand-a),var(--brand-b),var(--brand-c),var(--brand-a))] opacity-80 blur-[2px]"
          />
          <Avatar className="relative size-56 border-4 border-background sm:size-64">
            <AvatarImage src={asset(profile.avatar)} alt={`Portrait of ${profile.name}`} />
            <AvatarFallback className="font-heading text-5xl">
              {profile.name
                .split(' ')
                .map((part) => part[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          {profile.chips.map((chip, index) => {
            const { inner, position, floatDelay } = orbitPosition(index, profile.chips.length)
            return (
              <div
                key={chip}
                style={position}
                className={cn(
                  'absolute top-(--chip-y) left-(--chip-x) -translate-x-1/2 -translate-y-1/2',
                  !inner && 'hidden sm:block',
                )}
              >
                <Badge
                  variant="secondary"
                  style={floatDelay}
                  className="animate-float h-6 px-3 font-mono shadow-md ring-1 ring-foreground/10"
                >
                  {chip}
                </Badge>
              </div>
            )
          })}
        </motion.div>
      </div>

      <motion.a
        href="#work"
        aria-label="Scroll to work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-2 left-1/2 hidden -translate-x-1/2 rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground sm:block"
      >
        <ArrowDownIcon aria-hidden className="size-5 animate-bounce" />
      </motion.a>
    </section>
  )
}
