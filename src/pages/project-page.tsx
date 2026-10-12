import { Link, Navigate, useParams } from 'react-router'
import { Dot, Prose, Reveal, SectionLabel, Slash, Statement } from '@/components/primitives'
import { ProjectMediaGallery } from '@/components/project-media-gallery'
import { asset, content } from '@/lib/content'
import { pad } from '@/lib/format'

export const ProjectPage = () => {
  const { id } = useParams()
  const { projects } = content
  const index = projects.findIndex((project) => project.id === id)

  if (index === -1) return <Navigate to="/" replace />

  const project = projects[index]
  const next = projects[(index + 1) % projects.length]
  const { details } = project
  // The lead image is shown on its own under the title, so the gallery picks up from the second figure.
  const lead = details.media.find((item) => item.src === project.image)
  const gallery = details.media.filter((item) => item !== lead)
  const meta = [
    { label: 'Org', value: project.org },
    { label: 'When', value: project.period },
    { label: 'Role', value: details.role },
  ]

  return (
    <article className="px-3 pb-24">
      <nav aria-label="Project" className="type-label flex justify-between gap-6 border-b border-border py-2.5">
        <Link
          to={{ pathname: '/', hash: '#work' }}
          viewTransition
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Index
        </Link>
        <p className="text-muted-foreground">
          Project {pad(index + 1)}/{pad(projects.length)}
        </p>
      </nav>

      <header className="pt-10 pb-14">
        <p className="type-label">
          {project.org}
          <span className="text-muted-foreground">
            <Slash />[{project.period}]
          </span>
        </p>
        <h1 className="type-display mt-3 text-[clamp(3rem,10.5vw,11rem)] text-balance">{project.title}</h1>
      </header>

      <div className="grid gap-x-6 gap-y-12 lg:grid-cols-12">
        <figure className="lg:col-span-10 lg:col-start-2">
          <div className="type-label flex justify-between gap-6 border-y border-border py-2 text-muted-foreground">
            <p>
              <Dot live />
              Fig. 01
            </p>
            <p>{project.title}</p>
          </div>
          <img
            src={asset(project.image)}
            alt={lead?.alt ?? `Screenshot of ${project.title}`}
            style={{ viewTransitionName: 'project-media' }}
            className="w-full bg-muted"
          />
          {lead && <figcaption className="mt-3 leading-relaxed text-muted-foreground">{lead.caption}</figcaption>}
        </figure>

        <div className="lg:col-span-5 lg:col-start-2">
          <Statement text={project.summary} className="text-left text-[clamp(1.9rem,3vw,2.75rem)]" />
          <Reveal>
            <dl className="type-label">
              {meta.map((item) => (
                <div key={item.label} className="grid grid-cols-[4rem_1fr] gap-4 border-b border-border py-2.5">
                  <dt className="text-muted-foreground">{item.label}</dt>
                  <dd className="leading-5">{item.value}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[4rem_1fr] gap-4 border-b border-border py-2.5">
                <dt className="text-muted-foreground">Stack</dt>
                <dd className="leading-5">
                  {details.stack.map((tech, techIndex) => (
                    <span key={tech}>
                      {techIndex > 0 && <Slash />}
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
              {details.links.map((link) => (
                <div key={link.url} className="grid grid-cols-[4rem_1fr] gap-4 border-b border-border py-2.5">
                  <dt className="text-muted-foreground">Link</dt>
                  <dd>
                    <a href={link.url} target="_blank" rel="noreferrer" className="hover:underline">
                      {link.label} ↗
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="flex flex-col gap-12 lg:col-span-5">
          <Reveal>
            <SectionLabel id={`${project.id}-overview`} index="01">
              Overview
            </SectionLabel>
            <Prose className="mt-4 text-foreground">{details.overview}</Prose>
          </Reveal>
          <Reveal>
            <SectionLabel id={`${project.id}-outcomes`} index="02">
              Outcomes
            </SectionLabel>
            <ol className="mt-4 border-t border-border">
              {details.outcomes.map((outcome, outcomeIndex) => (
                <li key={outcome} className="grid grid-cols-[2rem_1fr] border-b border-border py-2.5 leading-relaxed">
                  <span aria-hidden className="type-label pt-0.5 text-muted-foreground">
                    {pad(outcomeIndex + 1)}
                  </span>
                  {outcome}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        {gallery.length > 0 && (
          <section aria-labelledby={`${project.id}-gallery`} className="lg:col-span-10 lg:col-start-2">
            <SectionLabel id={`${project.id}-gallery`} index="03" className="mb-4">
              In action
            </SectionLabel>
            <ProjectMediaGallery media={gallery} startAt={lead ? 2 : 1} />
          </section>
        )}
      </div>

      <Link
        to={`/work/${next.id}`}
        viewTransition
        className="group mt-24 block border-y border-border py-8 text-center"
      >
        <span className="type-label text-muted-foreground">
          Next project
          <Slash />
          {next.org}
        </span>
        <span className="type-display mt-4 block text-[clamp(2.75rem,8vw,8.5rem)] text-balance">
          {next.title}{' '}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-3">→</span>
        </span>
      </Link>
    </article>
  )
}
