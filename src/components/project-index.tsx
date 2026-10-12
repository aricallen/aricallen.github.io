import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { type PointerEvent, useState } from 'react'
import { asset, type Project } from '@/lib/content'
import { cn } from '@/lib/utils'

type ProjectIndexProps = {
  projects: Project[]
  onOpen: (project: Project) => void
}

const springConfig = { stiffness: 260, damping: 28, mass: 0.6 }
const PREVIEW_WIDTH = 352
const PREVIEW_HEIGHT = 256
const PREVIEW_GAP = 24

const pad = (n: number) => String(n + 1).padStart(2, '0')

/**
 * Text-first index of projects. Each row is a button that opens the detail view. On
 * pointer devices a preview image floats beside the cursor for the hovered row; on
 * touch and narrow screens a thumbnail is shown inline instead.
 */
export const ProjectIndex = ({ projects, onOpen }: ProjectIndexProps) => {
  const [hovered, setHovered] = useState<Project | null>(null)
  const x = useSpring(useMotionValue(0), springConfig)
  const y = useSpring(useMotionValue(0), springConfig)

  // Keep the preview inside the viewport: flip to the left near the right edge, clamp between the bars.
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bar = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--bar-height')) * 16 || 44
    const fitsRight = event.clientX + PREVIEW_GAP + PREVIEW_WIDTH < window.innerWidth
    x.set(fitsRight ? event.clientX + PREVIEW_GAP : event.clientX - PREVIEW_GAP - PREVIEW_WIDTH)
    const maxY = window.innerHeight - bar - PREVIEW_HEIGHT - 8
    y.set(Math.min(maxY, Math.max(bar + 8, event.clientY - PREVIEW_HEIGHT / 2)))
  }

  return (
    <div className="relative" onPointerMove={handlePointerMove} onPointerLeave={() => setHovered(null)}>
      <ol className="rule-t">
        {projects.map((project, index) => {
          const active = hovered?.id === project.id
          return (
            <li key={project.id} className="rule-b">
              <button
                type="button"
                onClick={() => onOpen(project)}
                onPointerEnter={() => setHovered(project)}
                onFocus={() => setHovered(project)}
                onBlur={() => setHovered(null)}
                aria-haspopup="dialog"
                className={cn(
                  'group grid w-full grid-cols-[2.5rem_1fr] items-center gap-x-4 gap-y-2 py-4 text-left outline-none transition-colors sm:grid-cols-[2.5rem_1fr_auto] sm:py-5',
                  'focus-visible:bg-muted/60 hover:bg-muted/60 md:hover:bg-transparent md:focus-visible:bg-transparent',
                  hovered && !active && 'md:text-muted-foreground/60',
                )}
              >
                <span aria-hidden className="label self-start pt-1 text-muted-foreground sm:self-center">
                  {pad(index)}
                </span>

                <span className="flex min-w-0 flex-col gap-1.5">
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-serif text-2xl leading-none tracking-tight sm:text-3xl lg:text-4xl">
                      {project.title}
                    </span>
                    <span className="label text-muted-foreground">
                      <span aria-hidden>// </span>[{project.period}]
                    </span>
                  </span>
                  <span className="label text-muted-foreground sm:hidden">{project.org}</span>
                  <span className="text-sm leading-relaxed text-pretty text-muted-foreground sm:max-w-xl md:hidden">
                    {project.summary}
                  </span>
                </span>

                <span className="label hidden items-center gap-3 text-muted-foreground sm:flex">
                  <span className="text-right">{project.org}</span>
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5"
                  >
                    ↗
                  </span>
                </span>

                <img
                  src={asset(project.image)}
                  alt=""
                  loading="lazy"
                  className="col-span-2 aspect-[16/10] w-full rounded-sm object-cover ring-1 ring-foreground/10 sm:col-span-3 md:hidden"
                />
              </button>
            </li>
          )
        })}
      </ol>

      {/* Floating preview: pointer-driven position via springs, swapped image via AnimatePresence. */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-30 hidden w-[22rem] md:block"
      >
        <AnimatePresence>
          {hovered && (
            <motion.figure
              key={hovered.id}
              initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.96, rotate: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 w-full overflow-hidden rounded-sm bg-card shadow-2xl shadow-black/30 ring-1 ring-foreground/15"
            >
              <img src={asset(hovered.image)} alt="" className="aspect-[16/10] w-full object-cover" />
              <figcaption className="label flex items-center justify-between gap-3 px-3 py-2 text-muted-foreground">
                <span className="truncate">{hovered.summary}</span>
              </figcaption>
            </motion.figure>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
