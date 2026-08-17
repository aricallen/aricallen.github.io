import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { CheckIcon, ExternalLinkIcon, XIcon } from 'lucide-react'
import type { CSSProperties } from 'react'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { asset, type Project } from '@/lib/content'

type ProjectDetailDialogProps = {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ProjectDetailDialog = ({ project, open, onOpenChange }: ProjectDetailDialogProps) => {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/40 supports-backdrop-filter:backdrop-blur-sm" />
        <DialogPrimitive.Popup
          data-slot="dialog-content"
          style={{ '--accent-c': `oklch(0.7 0.16 ${project.hue})` } as CSSProperties}
          className="fixed inset-2 z-50 overflow-hidden rounded-2xl bg-background ring-1 ring-foreground/15 outline-none sm:inset-6 lg:inset-x-16 lg:inset-y-10 motion-safe:data-open:animate-flip-in motion-safe:data-closed:animate-flip-out motion-reduce:duration-100 motion-reduce:data-open:animate-in motion-reduce:data-open:fade-in-0 motion-reduce:data-closed:animate-out motion-reduce:data-closed:fade-out-0"
        >
          <div className="h-full overflow-y-auto overscroll-contain">
            <div className="relative aspect-[21/9] max-h-80 w-full overflow-hidden">
              <img
                src={asset(project.image)}
                alt={`Screenshot of ${project.title}`}
                className="size-full object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            </div>

            <div className="mx-auto max-w-4xl px-5 pt-2 pb-12 sm:px-8">
              <p className="font-mono text-sm tracking-wide text-muted-foreground">
                <span className="text-(--accent-c)">{project.org}</span> · {project.period}
              </p>
              <DialogTitle className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                {project.title}
              </DialogTitle>
              <DialogDescription className="mt-3 max-w-2xl text-base">
                {project.summary}
              </DialogDescription>

              <Separator className="my-8" />

              <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
                <div className="flex flex-col gap-8">
                  <section aria-labelledby={`${project.id}-overview`}>
                    <h3 id={`${project.id}-overview`} className="mb-3 font-mono text-sm tracking-widest text-muted-foreground uppercase">
                      Overview
                    </h3>
                    <p className="leading-relaxed">{project.details.overview}</p>
                  </section>
                  <section aria-labelledby={`${project.id}-outcomes`}>
                    <h3 id={`${project.id}-outcomes`} className="mb-3 font-mono text-sm tracking-widest text-muted-foreground uppercase">
                      Outcomes
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {project.details.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-3">
                          <CheckIcon aria-hidden className="mt-1 size-4 shrink-0 text-(--accent-c)" />
                          <span className="leading-relaxed">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <aside className="flex h-fit flex-col gap-6 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
                  <section aria-labelledby={`${project.id}-role`}>
                    <h3 id={`${project.id}-role`} className="mb-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                      Role
                    </h3>
                    <p className="text-sm leading-relaxed">{project.details.role}</p>
                  </section>
                  <section aria-labelledby={`${project.id}-stack`}>
                    <h3 id={`${project.id}-stack`} className="mb-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                      Stack
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.details.stack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="font-mono">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </section>
                  {project.details.links.length > 0 && (
                    <section aria-labelledby={`${project.id}-links`}>
                      <h3 id={`${project.id}-links`} className="mb-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                        Links
                      </h3>
                      <div className="flex flex-col gap-2">
                        {project.details.links.map((link) => (
                          <Button
                            key={link.url}
                            variant="outline"
                            size="sm"
                            className="justify-start"
                            nativeButton={false}
                            render={<a href={link.url} target="_blank" rel="noreferrer" />}
                          >
                            <ExternalLinkIcon data-icon="inline-start" />
                            {link.label}
                          </Button>
                        ))}
                      </div>
                    </section>
                  )}
                </aside>
              </div>
            </div>
          </div>

          <DialogClose
            render={
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 shadow-md ring-1 ring-foreground/10"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close project details</span>
          </DialogClose>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  )
}
