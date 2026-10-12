import { Link, Navigate, useParams } from 'react-router'
import { Band, Reveal } from '@/components/frame'
import { ProjectMediaGallery } from '@/components/project-media-gallery'
import { asset, content, topicOf } from '@/lib/content'
import { pad } from '@/lib/format'

/** A project highlight, set as a centred headline between two parts of the case study. */
const Beat = ({ children }: { children: string }) => (
  <Band className="px-5 py-14 text-center sm:py-20">
    <Reveal>
      <p className="type-wide mx-auto max-w-[34ch] text-lg text-balance sm:text-xl">{children}</p>
    </Reveal>
  </Band>
)

export const ProjectPage = () => {
  const { id } = useParams()
  const { projects } = content
  const index = projects.findIndex((project) => project.id === id)

  if (index === -1) return <Navigate to="/" replace />

  const project = projects[index]
  const next = projects[(index + 1) % projects.length]
  const topic = topicOf(project)
  const nextTopic = topicOf(next)
  const { details } = project
  // The lead image opens the page on its own, so the gallery picks up from the second figure.
  const lead = details.media.find((item) => item.src === project.image)
  const gallery = details.media.filter((item) => item !== lead)
  const [first, second, third] = project.highlights
  const meta = [
    { label: 'When', value: project.period },
    { label: 'Where', value: project.org },
  ]

  return (
    <article data-tone={topic.tone}>
      <Band className="grid lg:grid-cols-2">
        <header className="border-border px-5 py-10 sm:px-11 sm:py-16 lg:border-r">
          <p className="type-label flex items-center gap-2.5">
            <Link
              to={{ pathname: '/', hash: '#work' }}
              viewTransition
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Work
            </Link>
            <span aria-hidden className="text-muted-foreground">
              /
            </span>
            {topic.title}
            <span aria-hidden className="size-2 bg-tone ring-1 ring-tone-ink" />
          </p>
          <h1 className="type-wide mt-4 text-[clamp(1.9rem,3.9vw,3.4rem)] text-balance">{project.title}</h1>
        </header>
        <div className="px-5 py-10 sm:px-11 sm:py-16">
          <p className="max-w-[34ch] text-xl leading-snug text-pretty sm:text-[1.4rem]">{project.summary}</p>
          <dl className="mt-8 flex flex-wrap gap-x-14 gap-y-4">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="type-label">{item.label}</dt>
                <dd className="text-muted-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
          {details.links.length > 0 && (
            <ul className="type-label mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {details.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Band>

      <Band>
        <figure>
          <div className="mesh grain overflow-hidden px-[7%] pt-[6%]">
            <img
              src={asset(project.image)}
              alt={lead?.alt ?? `Screenshot of ${project.title}`}
              className="relative z-2 w-full rounded-t-xl shadow-[0_30px_70px_-20px_oklch(0.25_0.1_320/0.55)]"
            />
          </div>
          {lead && (
            <figcaption className="flex gap-4 border-t border-border px-5 py-4 leading-relaxed sm:px-11">
              <span className="type-label shrink-0 pt-0.5 text-tone-ink">Fig. 01</span>
              <span className="text-muted-foreground">{lead.caption}</span>
            </figcaption>
          )}
        </figure>
      </Band>

      {first && <Beat>{first}</Beat>}

      <Band className="grid lg:grid-cols-2">
        <div className="border-border px-5 py-10 sm:px-11 sm:py-14 max-lg:border-b lg:border-r">
          <h2 className="type-label mb-5 text-tone-ink">My part</h2>
          <p className="font-heading text-[1.7rem] leading-[1.25] tracking-[-0.015em] text-pretty">{details.role}</p>
          <h2 className="type-label mt-10 mb-4 text-tone-ink">Built with</h2>
          <ul className="flex flex-wrap gap-2">
            {details.stack.map((tech) => (
              <li key={tech} className="rounded-full border border-border px-3.5 py-1 text-[0.95rem]">
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-5 py-10 sm:px-11 sm:py-14">
          <h2 className="type-label mb-5 text-tone-ink">The story</h2>
          <p className="max-w-[62ch] text-[1.06rem] leading-[1.75] text-pretty">{details.overview}</p>
        </div>
      </Band>

      {second && <Beat>{second}</Beat>}

      <Band>
        <h2 className="sr-only">Outcomes</h2>
        <ol className="-mb-px grid md:grid-cols-2">
          {details.outcomes.map((outcome, outcomeIndex) => (
            <li
              key={outcome}
              className="flex gap-5 border-b border-border px-5 py-8 sm:px-11 sm:py-10 md:odd:border-r md:odd:last:col-span-2 md:odd:last:border-r-0"
            >
              <span aria-hidden className="font-heading text-4xl leading-none tracking-[-0.03em]">
                <span className="pill [animation:none] [background-size:100%_100%]">{pad(outcomeIndex + 1)}</span>
              </span>
              <span className="max-w-[46ch] text-[1.06rem] leading-relaxed text-pretty">{outcome}</span>
            </li>
          ))}
        </ol>
      </Band>

      {gallery.length > 0 && (
        <>
          {third && <Beat>{third}</Beat>}
          <Band>
            <h2 className="sr-only">In action</h2>
            <ProjectMediaGallery media={gallery} startAt={lead ? 2 : 1} />
          </Band>
        </>
      )}

      <Band outerClassName="border-b-0">
        <Link
          to={`/work/${next.id}`}
          viewTransition
          data-tone={nextTopic.tone}
          className="group grid items-center gap-6 px-5 py-12 transition-colors hover:mesh sm:grid-cols-[1fr_auto] sm:px-11 sm:py-16"
        >
          <span>
            <span className="type-label block opacity-70">
              Next up — {pad(((index + 1) % projects.length) + 1)}/{pad(projects.length)}
            </span>
            <span className="mt-2 block font-heading text-[clamp(2rem,4.4vw,3.75rem)] leading-tight tracking-[-0.03em]">
              {next.title}
            </span>
          </span>
          <span
            aria-hidden
            className="font-heading text-5xl transition-transform duration-300 group-hover:translate-x-3"
          >
            →
          </span>
        </Link>
      </Band>
    </article>
  )
}
