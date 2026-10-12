import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { Maximize2Icon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { Dialog, DialogClose, DialogOverlay, DialogPortal, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { asset, type ProjectMedia } from '@/lib/content'

type ProjectMediaGalleryProps = {
  media: ProjectMedia[]
}

type MediaFigureProps = {
  item: ProjectMedia
  featured: boolean
  onExpand: () => void
}

const MediaFigure = ({ item, featured, onExpand }: MediaFigureProps) => (
  <figure className={cn('flex flex-col gap-2', featured && 'sm:col-span-2')}>
    <div className="overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10">
      {item.type === 'video' ? (
        <video
          src={asset(item.src)}
          poster={item.poster && asset(item.poster)}
          aria-label={item.alt}
          controls
          muted
          loop
          playsInline
          preload="none"
          className="w-full"
        />
      ) : (
        <button
          type="button"
          onClick={onExpand}
          className="group/media relative block w-full cursor-zoom-in outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
        >
          <img src={asset(item.src)} alt={item.alt} loading="lazy" className="w-full" />
          <span className="absolute top-2 right-2 rounded-md bg-background/80 p-1.5 opacity-0 shadow-sm ring-1 ring-foreground/10 transition-opacity group-hover/media:opacity-100 group-focus-visible/media:opacity-100">
            <Maximize2Icon aria-hidden className="size-3.5" />
            <span className="sr-only">Expand image</span>
          </span>
        </button>
      )}
    </div>
    <figcaption className="text-sm leading-relaxed text-muted-foreground">{item.caption}</figcaption>
  </figure>
)

export const ProjectMediaGallery = ({ media }: ProjectMediaGalleryProps) => {
  const [expanded, setExpanded] = useState<ProjectMedia | null>(null)

  if (media.length === 0) return null

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        {media.map((item, index) => (
          <MediaFigure key={item.src} item={item} featured={index === 0} onExpand={() => setExpanded(item)} />
        ))}
      </div>

      <Dialog open={expanded !== null} onOpenChange={(open) => !open && setExpanded(null)}>
        <DialogPortal>
          <DialogOverlay className="bg-black/80 supports-backdrop-filter:backdrop-blur-sm" />
          <DialogPrimitive.Popup className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 p-4 outline-none sm:p-10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0">
            {expanded && (
              <>
                <img
                  src={asset(expanded.src)}
                  alt={expanded.alt}
                  className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl ring-1 ring-white/10"
                />
                <DialogTitle className="max-w-3xl text-center text-sm font-normal text-white/80">
                  {expanded.caption}
                </DialogTitle>
              </>
            )}
            <DialogClose
              render={<Button variant="secondary" size="icon" className="absolute top-4 right-4 shadow-md" />}
            >
              <XIcon />
              <span className="sr-only">Close image</span>
            </DialogClose>
          </DialogPrimitive.Popup>
        </DialogPortal>
      </Dialog>
    </>
  )
}
