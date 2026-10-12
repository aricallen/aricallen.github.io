import { LayoutGroup, motion } from 'motion/react'
import { type KeyboardEvent, type PointerEvent, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { PAGES, type PagePath } from '@/lib/pages'
import { cn } from '@/lib/utils'

const DRAG_THRESHOLD = 6

type DockProps = {
  /** Called while the user drags the highlight across pages; null when the drag ends. */
  onPreview: (path: PagePath | null) => void
}

/**
 * Floating dock that switches pages. Click a label, use arrow keys, or drag the active
 * highlight like a radio tuner: the page under the pointer previews live, releasing opens
 * it, and Escape cancels back to where you started.
 */
export const Dock = ({ onPreview }: DockProps) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const navRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [preview, setPreview] = useState<PagePath | null>(null)
  const dragRef = useRef<{ startX: number; dragging: boolean; pointerId: number } | null>(null)

  const current = (PAGES.find((page) => page.path === pathname)?.path ?? '/') as PagePath
  const active = preview ?? current

  const pageAt = (clientX: number): PagePath | null => {
    for (let i = 0; i < PAGES.length; i++) {
      const rect = itemRefs.current[i]?.getBoundingClientRect()
      if (rect && clientX >= rect.left && clientX <= rect.right) return PAGES[i].path
    }
    return null
  }

  const setPreviewPath = (path: PagePath | null) => {
    setPreview(path)
    onPreview(path)
  }

  const endDrag = (commit: boolean) => {
    const drag = dragRef.current
    if (!drag) return
    navRef.current?.releasePointerCapture(drag.pointerId)
    dragRef.current = null
    if (drag.dragging) {
      if (commit && preview && preview !== current) navigate(preview)
      setPreviewPath(null)
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    dragRef.current = { startX: event.clientX, dragging: false, pointerId: event.pointerId }
    navRef.current?.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const drag = dragRef.current
    if (!drag) return
    if (!drag.dragging && Math.abs(event.clientX - drag.startX) < DRAG_THRESHOLD) return
    drag.dragging = true
    const path = pageAt(event.clientX)
    if (path && path !== preview) setPreviewPath(path)
  }

  const handleClick = (event: React.MouseEvent) => {
    // A click that ends a drag has already been handled by pointerup.
    if (dragRef.current?.dragging) event.preventDefault()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    const index = PAGES.findIndex((page) => page.path === current)
    const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + PAGES.length) % PAGES.length
    navigate(PAGES[next].path)
    itemRefs.current[next]?.focus()
  }

  useEffect(() => {
    if (!preview) return
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') endDrag(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex flex-col items-center gap-2 px-4 sm:bottom-6">
      <p
        aria-live="polite"
        className={cn(
          'font-mono text-xs text-muted-foreground transition-opacity duration-200',
          preview ? 'opacity-100' : 'opacity-0',
        )}
      >
        {preview ? `tuning to ${PAGES.find((p) => p.path === preview)?.label} · release to open · esc to cancel` : ' '}
      </p>
      <nav
        ref={navRef}
        aria-label="Pages"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={() => endDrag(true)}
        onPointerCancel={() => endDrag(false)}
        onKeyDown={handleKeyDown}
        className="pointer-events-auto flex touch-none items-center gap-1 rounded-2xl bg-dock p-1.5 shadow-2xl shadow-black/30 ring-1 ring-foreground/10 backdrop-blur-xl select-none"
      >
        <LayoutGroup id="dock">
          {PAGES.map((page, index) => {
            const isActive = active === page.path
            return (
              <Link
                key={page.path}
                ref={(node) => {
                  itemRefs.current[index] = node
                }}
                to={page.path}
                draggable={false}
                onClick={handleClick}
                aria-current={current === page.path ? 'page' : undefined}
                className={cn(
                  'relative rounded-xl px-3 py-2.5 font-mono text-xs tracking-wide lowercase outline-none transition-colors sm:px-6 sm:text-sm',
                  isActive ? 'text-dock-active-foreground' : 'text-muted-foreground hover:text-foreground',
                  'focus-visible:ring-2 focus-visible:ring-ring',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="dock-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    className="absolute inset-0 -z-10 rounded-xl bg-dock-active shadow-lg shadow-dock-active/30"
                  />
                )}
                {page.label}
              </Link>
            )
          })}
        </LayoutGroup>
      </nav>
    </div>
  )
}
