import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { ArrowLeftIcon } from 'lucide-react'
import { useRef } from 'react'
import { Block } from '@/components/block'
import { ProjectMediaGallery } from '@/components/project-media-gallery'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog'
import { asset, type Project } from '@/lib/content'

type ProjectDetailDialogProps = {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Full-screen project page: back button, big lowercase title, `role / date / team / my part` list, then the story. */
export const ProjectDetailDialog = ({ project, open, onOpenChange }: ProjectDetailDialogProps) => {
  const closeRef = useRef<HTMLButtonElement>(null)

  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-background/70 supports-backdrop-filter:backdrop-blur-sm" />
        <DialogPrimitive.Popup
          // The default (first tabbable element) is a gallery image, which scrolls the dialog past the overview.
          initialFocus={closeRef}
          data-slot="dialog-content"
          className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-background outline-none motion-safe:data-open:animate-slide-up motion-safe:data-closed:animate-slide-down motion-reduce:duration-100 motion-reduce:data-open:animate-in motion-reduce:data-open:fade-in-0 motion-reduce:data-closed:animate-out motion-reduce:data-closed:fade-out-0"
        >
          <div aria-hidden className="bg-matrix pointer-events-none fixed inset-0 opacity-70" />
          <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-12 px-5 pt-8 pb-24 sm:px-8 sm:pt-10">
            <DialogClose
              ref={closeRef}
              className="flex size-10 items-center justify-center rounded-full bg-foreground text-background outline-none transition-transform hover:-translate-x-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ArrowLeftIcon className="size-4" />
              <span className="sr-only">Back to work</span>
            </DialogClose>

            <DialogTitle className="headline text-[clamp(2.5rem,8vw,6.5rem)]">{project.title}</DialogTitle>

            <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-2">
              <dl className="grid grid-cols-[6rem_1fr] gap-x-6 gap-y-4 self-start text-[15px] leading-relaxed">
                <dt className="block-label">role</dt>
                <dd>{project.details.role}</dd>
                <dt className="block-label">date</dt>
                <dd>{project.period}</dd>
                <dt className="block-label">team</dt>
                <dd>{project.org}</dd>
                <dt className="block-label">stack</dt>
                <dd>{project.details.stack.join(', ')}</dd>
                <dt className="block-label">my part</dt>
                <dd>
                  <ul className="flex flex-col gap-1">
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </dd>
              </dl>

              <div className="flex flex-col gap-10 lg:pt-24">
                <Block label="overview" as="h3">
                  <DialogDescription className="sr-only">{project.summary}</DialogDescription>
                  <p className="text-pretty">{project.details.overview}</p>
                </Block>
                <Block label="outcomes" as="h3">
                  <ul className="flex flex-col gap-3">
                    {project.details.outcomes.map((outcome, i) => (
                      <li key={outcome} className="grid grid-cols-[2rem_1fr] gap-2">
                        <span aria-hidden className="text-muted-foreground tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-pretty">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </Block>
                {project.details.links.length > 0 && (
                  <Block label="links" as="h3">
                    <ul className="flex flex-col gap-1">
                      {project.details.links.map((link) => (
                        <li key={link.url}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="link-dotted rounded-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {link.label} ↗
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Block>
                )}
              </div>
            </div>

            {project.details.media.length > 0 ? (
              <Block label="in action" as="h3">
                <ProjectMediaGallery media={project.details.media} />
              </Block>
            ) : (
              <img
                src={asset(project.image)}
                alt={`Screenshot of ${project.title}`}
                className="w-full rounded-2xl ring-1 ring-foreground/10"
              />
            )}
          </div>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  )
}
