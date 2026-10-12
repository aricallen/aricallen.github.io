import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { useState } from 'react'
import { Dialog, DialogClose, DialogOverlay, DialogPortal, DialogTitle } from '@/components/ui/dialog'
import { asset, type ProjectMedia } from '@/lib/content'
import { pad } from '@/lib/format'

type ProjectMediaGalleryProps = {
  media: ProjectMedia[]
  /** Figure number of the first item, for when figures precede the gallery on the page. */
  startAt?: number
}

type MediaFigureProps = {
  item: ProjectMedia
  number: number
  onExpand: () => void
}

const MediaFigure = ({ item, number, onExpand }: MediaFigureProps) => (
  <figure className="flex flex-col">
    <p className="type-label flex justify-between gap-6 border-y border-border py-2 text-muted-foreground">
      <span>Fig. {pad(number)}</span>
      <span>{item.type === 'video' ? 'Video' : 'Still'}</span>
    </p>
    <div className="bg-muted">
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
        <button type="button" onClick={onExpand} className="group/media relative block w-full cursor-zoom-in">
          <img src={asset(item.src)} alt={item.alt} loading="lazy" className="w-full" />
          <span className="type-label absolute top-2 right-2 bg-background px-1.5 py-1 opacity-0 transition-opacity group-hover/media:opacity-100 group-focus-visible/media:opacity-100">
            <span aria-hidden>Expand ↗</span>
            <span className="sr-only">Expand image</span>
          </span>
        </button>
      )}
    </div>
    <figcaption className="mt-3 leading-relaxed text-muted-foreground">{item.caption}</figcaption>
  </figure>
)

export const ProjectMediaGallery = ({ media, startAt = 1 }: ProjectMediaGalleryProps) => {
  const [expanded, setExpanded] = useState<ProjectMedia | null>(null)

  if (media.length === 0) return null

  return (
    <>
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
        {media.map((item, index) => (
          <MediaFigure key={item.src} item={item} number={startAt + index} onExpand={() => setExpanded(item)} />
        ))}
      </div>

      <Dialog open={expanded !== null} onOpenChange={(open) => !open && setExpanded(null)}>
        <DialogPortal>
          <DialogOverlay className="bg-black/85 supports-backdrop-filter:backdrop-blur-sm" />
          <DialogPrimitive.Popup className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 p-4 outline-none sm:p-10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0">
            {expanded && (
              <>
                <img
                  src={asset(expanded.src)}
                  alt={expanded.alt}
                  className="max-h-[85vh] max-w-full object-contain ring-1 ring-white/15"
                />
                <DialogTitle className="max-w-3xl text-center font-sans text-sm leading-relaxed font-normal text-white/80">
                  {expanded.caption}
                </DialogTitle>
              </>
            )}
            <DialogClose className="bracket absolute top-3 right-3 text-white hover:bg-white hover:text-black">
              Close <span aria-hidden>×</span>
              <span className="sr-only">image</span>
            </DialogClose>
          </DialogPrimitive.Popup>
        </DialogPortal>
      </Dialog>
    </>
  )
}
