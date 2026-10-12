import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router'
import { Band, SectionTitle } from '@/components/frame'
import { asset, content, type Project, topicOf } from '@/lib/content'
import { pad } from '@/lib/format'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

type WorkSectionProps = {
  /** `id` of the topic being shown, or null for everything */
  topicId: string | null
  onTopicChange: (topicId: string | null) => void
}

const filterCell =
  'type-label flex cursor-pointer items-center gap-2.5 border-border px-4 py-3.5 text-left transition-colors hover:bg-muted sm:px-6 aria-pressed:mesh aria-pressed:hover:bg-(--tone) max-sm:odd:border-r max-sm:nth-[-n+2]:border-b sm:not-last:border-r'

const ProjectTile = ({ project }: { project: Project }) => {
  const topic = topicOf(project)

  return (
    <Link to={`/work/${project.id}`} viewTransition data-tone={topic.tone} className="group block">
      <div className="mesh grain relative aspect-[16/10] overflow-hidden">
        <img
          src={asset(project.image)}
          alt=""
          loading="lazy"
          className="absolute top-[11%] left-[8%] w-[84%] rounded-lg shadow-[0_24px_50px_-20px_oklch(0.25_0.1_320/0.6)] transition-transform duration-500 ease-out group-hover:-translate-y-3 group-hover:-rotate-1 group-focus-visible:-translate-y-3"
        />
      </div>
      <div className="type-label flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-x border-b border-border bg-background px-5 py-5">
        <h3>{project.title}</h3>
        <p className="font-semibold text-tone-ink">
          {topic.title}
          <span className="font-medium text-muted-foreground"> — {project.period}</span>
        </p>
      </div>
    </Link>
  )
}

export const WorkSection = ({ topicId, onTopicChange }: WorkSectionProps) => {
  const { projects, topics } = content
  const active = topics.find((topic) => topic.id === topicId)
  const shown = projects.filter((project) => !active || project.topic === active.id)

  return (
    <section id="work" aria-labelledby="work-heading" className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute top-0 right-0 -z-10 h-[38rem] w-[70%] bg-[linear-gradient(200deg,var(--pink),transparent_62%)] opacity-70 [clip-path:polygon(18%_0,100%_0,100%_100%)] dark:opacity-25"
      />
      <SectionTitle id="work-heading">Work</SectionTitle>

      <Band className="grid grid-cols-2 bg-background sm:flex">
        <button
          type="button"
          aria-pressed={topicId === null}
          data-tone="peach"
          onClick={() => onTopicChange(null)}
          className={filterCell}
        >
          Everything
          <span className="opacity-60">{pad(projects.length)}</span>
        </button>
        {topics.map((topic) => (
          <button
            key={topic.id}
            type="button"
            aria-pressed={topicId === topic.id}
            data-tone={topic.tone}
            onClick={() => onTopicChange(topicId === topic.id ? null : topic.id)}
            className={filterCell}
          >
            <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-tone ring-1 ring-tone-ink" />
            {topic.title}
            <span className="opacity-60">{pad(projects.filter((project) => project.topic === topic.id).length)}</span>
          </button>
        ))}
        <p
          aria-live="polite"
          className="ml-auto flex items-center px-6 text-[0.95rem] text-muted-foreground italic max-lg:hidden"
        >
          {active?.blurb}
        </p>
      </Band>

      <Band>
        <ul className="-mb-px grid md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((project) => (
              <motion.li
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: EASE }}
                className={cn('border-b border-border p-3 sm:p-7 md:odd:border-r')}
              >
                <ProjectTile project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </Band>
    </section>
  )
}
