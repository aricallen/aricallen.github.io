import { useState } from 'react'
import { Link } from 'react-router'
import { Dot, Prose, Reveal, SectionLabel, Slash, Statement } from '@/components/primitives'
import { asset, content } from '@/lib/content'
import { pad } from '@/lib/format'
import { cn } from '@/lib/utils'

export const WorkSection = () => {
  const { projects } = content
  const [active, setActive] = useState(0)
  const project = projects[active]

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="grid gap-x-6 gap-y-10 px-3 py-16 lg:py-20 lg:grid-cols-12"
    >
      <div className="lg:col-span-5 lg:col-start-2">
        <Reveal>
          <SectionLabel id="work-heading" index="02">
            Projects
          </SectionLabel>
          <Prose className="mt-4">
            Mostly AI agent workspaces, MCP apps and the design-system plumbing underneath them. Each one opens into a
            case study: the problem, my role, what shipped and what it changed.
          </Prose>
        </Reveal>

        <Statement text="A few things I’ve shipped that I’m _particularly proud of._" className="mt-10" />

        <Reveal>
          <ol className="mt-10 border-t border-border">
            {projects.map((item, index) => (
              <li key={item.id}>
                <Link
                  to={`/work/${item.id}`}
                  viewTransition
                  onPointerEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className="group type-label grid grid-cols-[1fr_auto] gap-x-6 border-b border-border py-2.5 transition-[padding] duration-300 hover:pl-2 focus-visible:pl-2"
                >
                  <span>
                    <span aria-hidden className="text-muted-foreground">
                      {pad(index + 1)} //{' '}
                    </span>
                    {item.title}
                    <span className="text-muted-foreground">
                      <Slash />[{item.period}]
                    </span>
                  </span>
                  <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                    {item.org} <span aria-hidden>→</span>
                  </span>
                  {/* The preview pane carries this from lg up, so there it stays for screen readers only. */}
                  <span className="col-span-2 mt-1.5 text-muted-foreground normal-case lg:sr-only">{item.summary}</span>
                </Link>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      <div aria-hidden className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-14">
          <div className="type-label flex justify-between gap-6 border-y border-border py-2 text-muted-foreground">
            <p>
              <Dot live />
              Fig. {pad(active + 1)}/{pad(projects.length)}
              <Slash />
              <span className="text-foreground">{project.title}</span>
            </p>
            <p>{project.org}</p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            {projects.map((item, index) => (
              <img
                key={item.id}
                src={asset(item.image)}
                alt=""
                style={index === active ? { viewTransitionName: 'project-media' } : undefined}
                className={cn(
                  'absolute inset-0 size-full object-cover object-left-top',
                  index === active ? 'animate-colorize' : 'opacity-0',
                )}
              />
            ))}
            {/* Re-keyed so every newly hovered project develops out of the dot matrix. */}
            <div key={active} className="dither-mask animate-develop absolute inset-0" />
          </div>
          <Prose className="mt-4">{project.summary}</Prose>
          <ul className="type-label mt-4 border-t border-border">
            {project.highlights.map((highlight, index) => (
              <li key={highlight} className="flex gap-3 border-b border-border py-2">
                <span className="text-muted-foreground">{pad(index + 1)}</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
