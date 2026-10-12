import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { type CSSProperties, useRef } from 'react'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog'
import { ProjectMediaGallery } from '@/components/project-media-gallery'
import { asset, type Project } from '@/lib/content'

type ProjectDetailDialogProps = {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const Label = ({ id, children }: { id: string; children: string }) => (
  <h3 id={id} className="label mb-3 text-muted-foreground">
    <span aria-hidden>// </span>
    {children}
  </h3>
)

/** Full-screen editorial sheet: slides up from the bottom bar, scrolls internally. */
export const ProjectDetailDialog = ({ project, open, onOpenChange }: ProjectDetailDialogProps) => {
  const closeRef = useRef<HTMLButtonElement>(null)

  if (!project) return null

  const index = String(project.id).toUpperCase()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-background/60 supports-backdrop-filter:backdrop-blur-sm" />
        <DialogPrimitive.Popup
          // The default (first tabbable element) is a gallery image, which scrolls the dialog past the overview.
          initialFocus={closeRef}
          data-slot="dialog-content"
          className="fixed inset-x-0 top-bar bottom-0 z-50 flex flex-col overflow-hidden bg-background outline-none motion-safe:data-open:animate-slide-up motion-safe:data-closed:animate-slide-down motion-reduce:duration-100 motion-reduce:data-open:animate-in motion-reduce:data-open:fade-in-0 motion-reduce:data-closed:animate-out motion-reduce:data-closed:fade-out-0"
        >
          {/* Sheet header mirrors the site's top bar so the two read as one system. */}
          <div className="label rule-t rule-b flex h-bar shrink-0 items-center justify-between gap-4 px-4 text-muted-foreground sm:px-6">
            <span className="flex items-center gap-2 truncate">
              <span aria-hidden style={{ color: `oklch(0.75 0.15 ${project.hue})` } as CSSProperties}>
                ◊
              </span>
              <span className="text-foreground">{project.org}</span>
              <span aria-hidden>//</span>
              <span>[{project.period}]</span>
              <span aria-hidden className="hidden sm:inline">
                //
              </span>
              <span className="hidden sm:inline">{index}</span>
            </span>
            <DialogClose
              ref={closeRef}
              className="link-rule flex items-center gap-2 rounded-xs py-1 outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>Close</span>
              <span aria-hidden>[esc]</span>
            </DialogClose>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 px-4 py-10 sm:px-6 lg:grid-cols-[2fr_3fr]">
              <div className="flex flex-col gap-6 lg:sticky lg:top-0 lg:self-start">
                <DialogTitle className="display text-[clamp(2.4rem,5.5vw,5rem)] text-balance">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="label max-w-md leading-relaxed text-muted-foreground">
                  {project.summary}
                </DialogDescription>
                <dl className="label rule-t grid grid-cols-[6rem_1fr] gap-x-4 gap-y-3 pt-4 text-muted-foreground">
                  <dt className="text-foreground">Role</dt>
                  <dd className="leading-relaxed">{project.details.role}</dd>
                  <dt className="text-foreground">Stack</dt>
                  <dd className="leading-relaxed">{project.details.stack.join(' // ')}</dd>
                  <dt className="text-foreground">In short</dt>
                  <dd>
                    <ul className="flex flex-col gap-1.5 leading-relaxed">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="grid grid-cols-[1rem_1fr] gap-1">
                          <span aria-hidden className="text-accent-ink">
                            ▹
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                  {project.details.links.length > 0 && (
                    <>
                      <dt className="text-foreground">Links</dt>
                      <dd className="flex flex-col gap-1">
                        {project.details.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="link-rule w-fit rounded-xs outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {link.label} ↗
                          </a>
                        ))}
                      </dd>
                    </>
                  )}
                </dl>
              </div>

              <div className="flex flex-col gap-10">
                <img
                  src={asset(project.image)}
                  alt={`Screenshot of ${project.title}`}
                  className="aspect-[16/10] w-full rounded-sm object-cover ring-1 ring-foreground/10"
                />

                <section aria-labelledby={`${project.id}-overview`}>
                  <Label id={`${project.id}-overview`}>Overview</Label>
                  <p className="font-sans text-base leading-relaxed text-pretty">{project.details.overview}</p>
                </section>

                <section aria-labelledby={`${project.id}-outcomes`}>
                  <Label id={`${project.id}-outcomes`}>Outcomes</Label>
                  <ol className="rule-t">
                    {project.details.outcomes.map((outcome, i) => (
                      <li key={outcome} className="rule-b grid grid-cols-[2.5rem_1fr] gap-x-4 py-3">
                        <span aria-hidden className="label pt-1 text-muted-foreground">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-sans leading-relaxed text-pretty">{outcome}</span>
                      </li>
                    ))}
                  </ol>
                </section>

                {project.details.media.length > 0 && (
                  <section aria-labelledby={`${project.id}-gallery`}>
                    <Label id={`${project.id}-gallery`}>In action</Label>
                    <ProjectMediaGallery media={project.details.media} />
                  </section>
                )}
              </div>
            </div>
          </div>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  )
}
