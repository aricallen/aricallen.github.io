import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Block } from '@/components/block'
import { Panel, PanelItem } from '@/components/panel'
import { rise } from '@/lib/motion'
import { content, type Testimonial } from '@/lib/content'

const attribution = ({ name, role, org }: Testimonial) => [name, role, org].filter(Boolean).join(', ')

/** Player-style chrome for cycling through testimonials: previous, play/pause (auto-advance), next. */
const KindWordsPlayer = () => {
  const { testimonials } = content
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(!reduceMotion)
  const count = testimonials.length
  const current = testimonials[index]

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 7000)
    return () => clearInterval(id)
  }, [playing, count])

  const step = (delta: number) => setIndex((i) => (i + delta + count) % count)

  return (
    <Block
      label="in the background"
      aside={
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="min-h-[7.5rem]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2"
            >
              <blockquote className="text-pretty">“{current.quote}”</blockquote>
              <figcaption className="block-label">{attribution(current)}</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-1" role="group" aria-label="Testimonial controls">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous quote"
            className="rounded-md px-2 py-1 text-lg leading-none text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            ⏮
          </button>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause auto-advance' : 'Play auto-advance'}
            aria-pressed={playing}
            className="rounded-md px-2 py-1 text-lg leading-none text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            {playing ? '⏸' : '▶'}
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next quote"
            className="rounded-md px-2 py-1 text-lg leading-none text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            ⏭
          </button>
        </div>
      </div>
    </Block>
  )
}

export const RootPanel = () => {
  const { profile, projects, resume, stats } = content
  const currentOrg = projects[0].org
  const currentProjects = projects.filter((project) => project.org === currentOrg).slice(0, 3)
  const earlier = resume.experience.filter((entry) => entry.company !== currentOrg && !entry.role.includes('Contract'))

  return (
    <Panel title={profile.name} as="h1">
      <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
        <PanelItem variants={rise} className="lg:col-start-1">
          <Block label="tldr">
            <p className="text-pretty">{profile.bio}</p>
          </Block>
        </PanelItem>

        <PanelItem variants={rise} className="lg:col-start-2 lg:row-start-2">
          <Block label="today">
            <p className="text-pretty">
              At {currentOrg}, I ship{' '}
              {currentProjects.map((project, index) => (
                <span key={project.id}>
                  {index > 0 && (index === currentProjects.length - 1 ? ', and ' : ', ')}
                  <Link
                    to={`/work?project=${project.id}`}
                    className="link-dotted rounded-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {project.title.toLowerCase()}
                  </Link>
                </span>
              ))}
              . My work spans interface design, frontend architecture, and the platform work that keeps a team fast.
            </p>
          </Block>
        </PanelItem>

        <PanelItem variants={rise} className="lg:col-start-3 lg:row-start-2">
          <Block label="yesterday">
            <ul className="flex flex-col gap-2">
              {earlier.map((entry) => (
                <li key={entry.company} className="flex flex-wrap items-baseline gap-x-2">
                  <span>{entry.company}</span>
                  <span className="text-muted-foreground">
                    {entry.role} · {entry.dates}
                  </span>
                </li>
              ))}
            </ul>
          </Block>
        </PanelItem>

        <PanelItem variants={rise} className="lg:col-start-1 lg:row-start-3">
          <KindWordsPlayer />
        </PanelItem>

        <PanelItem variants={rise} className="md:col-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-3">
          <Block label="by the numbers">
            <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="headline text-3xl sm:text-4xl">
                    {stat.value}
                    {stat.suffix}
                  </dt>
                  <dd className="text-xs leading-relaxed text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Block>
        </PanelItem>
      </div>
    </Panel>
  )
}
