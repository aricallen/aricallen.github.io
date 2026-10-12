import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Panel, PanelItem } from '@/components/panel'
import { rise } from '@/lib/motion'
import { ProjectDetailDialog } from '@/components/project-detail-dialog'
import { asset, content, type Project, type ProjectMedia } from '@/lib/content'

/** Still frames for the rail: the cover image first, then gallery images and video posters, deduped. */
const frames = (project: Project): { src: string; alt: string }[] => {
  const seen = new Set<string>()
  const out: { src: string; alt: string }[] = []
  const push = (src: string, alt: string) => {
    if (seen.has(src)) return
    seen.add(src)
    out.push({ src, alt })
  }
  push(project.image, `Screenshot of ${project.title}`)
  project.details.media.forEach((item: ProjectMedia) => {
    const src = item.type === 'video' ? item.poster : item.src
    if (src) push(src, item.alt)
  })
  return out
}

const pad = (n: number) => String(n + 1).padStart(2, '0')

export const WorkPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const openProject = (project: Project) => {
    setActiveProject(project)
    setDetailOpen(true)
  }

  // Deep link from the root panel ("today") or a shared URL: /work?project=<id>
  const requested = searchParams.get('project')
  useEffect(() => {
    if (!requested) return
    const project = content.projects.find((p) => p.id === requested)
    if (project) openProject(project)
    setSearchParams({}, { replace: true })
  }, [requested, setSearchParams])

  return (
    <Panel title="work">
      <div className="flex flex-col gap-20">
        {content.projects.map((project, index) => (
          <PanelItem key={project.id} variants={rise} className="flex flex-col gap-6">
            <div className="grid grid-cols-[auto_1fr] items-start gap-x-4 sm:gap-x-6">
              <span
                aria-hidden
                className="headline text-[clamp(2.5rem,6vw,5rem)] text-muted-foreground/40 tabular-nums"
              >
                {pad(index)}
              </span>
              <div className="flex flex-col gap-2 pt-1 sm:pt-2">
                <h3 className="headline text-[clamp(1.5rem,3.6vw,3rem)]">
                  <button
                    type="button"
                    onClick={() => openProject(project)}
                    aria-haspopup="dialog"
                    className="rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {project.title}
                  </button>
                </h3>
                <p className="max-w-2xl text-pretty text-muted-foreground">{project.summary}</p>
                <p className="block-label">
                  {project.org} · {project.period}
                </p>
              </div>
            </div>

            <ul
              aria-label={`${project.title} screenshots`}
              className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-pl-5 px-5 pb-2 sm:-mx-8 sm:scroll-pl-8 sm:px-8"
            >
              {frames(project).map((frame, i) => (
                <li key={frame.src} className="w-[85vw] shrink-0 snap-start sm:w-[36rem] lg:w-[44rem]">
                  <button
                    type="button"
                    onClick={() => openProject(project)}
                    aria-label={`Open ${project.title}: ${frame.alt}`}
                    className="group block w-full overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <img
                      src={asset(frame.src)}
                      alt=""
                      loading={index === 0 && i === 0 ? 'eager' : 'lazy'}
                      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </PanelItem>
        ))}
      </div>

      <ProjectDetailDialog project={activeProject} open={detailOpen} onOpenChange={setDetailOpen} />
    </Panel>
  )
}
