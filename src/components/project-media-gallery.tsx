import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { Maximize2Icon, XIcon } from 'lucide-react'
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
  <figure className="border-b border-border p-3 sm:p-7 md:odd:border-r md:odd:last:col-span-2 md:odd:last:border-r-0">
    <div className="mesh grain p-[5%]">
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
          className="relative z-2 w-full rounded-lg shadow-lg"
        />
      ) : (
        <button
          type="button"
          onClick={onExpand}
          className="group/media relative z-2 block w-full cursor-zoom-in rounded-lg"
        >
          <img src={asset(item.src)} alt={item.alt} loading="lazy" className="w-full rounded-lg shadow-lg" />
          <span className="absolute top-2 right-2 rounded-md bg-white/90 p-1.5 text-ink opacity-0 shadow-sm transition-opacity group-hover/media:opacity-100 group-focus-visible/media:opacity-100">
            <Maximize2Icon aria-hidden className="size-3.5" />
            <span className="sr-only">Expand image</span>
          </span>
        </button>
      )}
    </div>
    <figcaption className="mt-4 flex gap-4 leading-relaxed">
      <span className="type-label shrink-0 pt-0.5 text-tone-ink">Fig. {pad(number)}</span>
      <span className="text-muted-foreground">{item.caption}</span>
    </figcaption>
  </figure>
)

export const ProjectMediaGallery = ({ media, startAt = 1 }: ProjectMediaGalleryProps) => {
  const [expanded, setExpanded] = useState<ProjectMedia | null>(null)

  if (media.length === 0) return null

  return (
    <>
      <div className="-mb-px grid md:grid-cols-2">
        {media.map((item, index) => (
          <MediaFigure key={item.src} item={item} number={startAt + index} onExpand={() => setExpanded(item)} />
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
                <DialogTitle className="max-w-3xl text-center font-sans text-base leading-relaxed font-normal text-white/85">
                  {expanded.caption}
                </DialogTitle>
              </>
            )}
            <DialogClose className="absolute top-4 right-4 cursor-pointer rounded-full bg-white p-2 text-ink shadow-md">
              <XIcon aria-hidden className="size-4" />
              <span className="sr-only">Close image</span>
            </DialogClose>
          </DialogPrimitive.Popup>
        </DialogPortal>
      </Dialog>
    </>
  )
}
