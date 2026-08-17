import { ArrowUpRightIcon } from 'lucide-react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import type { CSSProperties, PointerEvent } from 'react'
import { asset, type Project } from '@/lib/content'

type ProjectCardProps = {
  project: Project
  onOpen: () => void
}

const springConfig = { stiffness: 180, damping: 22 }

export const ProjectCard = ({ project, onOpen }: ProjectCardProps) => {
  const reduceMotion = useReducedMotion()
  const rotateX = useSpring(useMotionValue(0), springConfig)
  const rotateY = useSpring(useMotionValue(0), springConfig)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${pointerX}px ${pointerY}px, oklch(0.75 0.15 ${project.hue} / 0.14), transparent 70%)`

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    pointerX.set(x)
    pointerY.set(y)
    if (reduceMotion) return
    rotateY.set((x / rect.width - 0.5) * 8)
    rotateX.set((y / rect.height - 0.5) * -8)
  }

  const handlePointerLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.article
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      style={
        {
          rotateX,
          rotateY,
          transformPerspective: 1100,
          '--accent-c': `oklch(0.7 0.16 ${project.hue})`,
        } as CSSProperties
      }
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10 transition-shadow duration-300 has-focus-visible:ring-3 has-focus-visible:ring-ring/60 hover:shadow-xl hover:shadow-black/10 hover:ring-(--accent-c)/50 dark:hover:shadow-black/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={asset(project.image)}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="font-mono text-xs tracking-wide text-muted-foreground">
          <span className="text-(--accent-c)">{project.org}</span> · {project.period}
        </p>
        <h3 className="flex items-start justify-between gap-2 font-heading text-xl font-semibold">
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="text-left outline-none after:absolute after:inset-0 after:cursor-pointer"
          >
            {project.title}
            <span className="sr-only"> — view project details</span>
          </button>
          <ArrowUpRightIcon
            aria-hidden
            className="mt-1 size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--accent-c)"
          />
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
        <ul className="mt-auto flex flex-col gap-1.5 pt-2 text-sm">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span aria-hidden className="text-(--accent-c)">
                ▹
              </span>
              <span className="text-muted-foreground">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.article>
  )
}
