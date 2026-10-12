import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { useState } from 'react'
import { createBrowserRouter, Navigate, RouterProvider, ScrollRestoration, useLocation } from 'react-router'
import { AboutPanel } from '@/components/about-panel'
import { Background } from '@/components/background'
import { ContactPanel } from '@/components/contact-panel'
import { Dock } from '@/components/dock'
import { RootPanel } from '@/components/root-panel'
import { SiteFooter } from '@/components/site-footer'
import { WorkPanel } from '@/components/work-panel'
import { isPagePath, type PagePath } from '@/lib/pages'
import { ResumePage } from '@/pages/resume-page'

const PANELS: Record<PagePath, () => React.JSX.Element> = {
  '/': RootPanel,
  '/about': AboutPanel,
  '/work': WorkPanel,
  '/resume': ResumePage,
  '/contact': ContactPanel,
}

/**
 * One shell for every page. The URL picks the panel; while the dock is being dragged the
 * previewed panel is shown instead, so "tuning" feels live without touching history.
 */
const Shell = () => {
  const { pathname } = useLocation()
  const [preview, setPreview] = useState<PagePath | null>(null)

  if (!isPagePath(pathname)) return <Navigate to="/" replace />

  const shown = preview ?? pathname
  const Panel = PANELS[shown]

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="relative min-h-dvh">
        <Background />
        <main className={preview ? 'pointer-events-none' : undefined} aria-busy={preview ? true : undefined}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={shown}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: preview ? 0.6 : 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <Panel />
            </motion.div>
          </AnimatePresence>
        </main>
        <SiteFooter />
        <Dock onPreview={setPreview} />
      </div>
      <ScrollRestoration />
    </MotionConfig>
  )
}

const router = createBrowserRouter(
  [
    { path: '/', element: <Shell /> },
    { path: '/about', element: <Shell /> },
    { path: '/work', element: <Shell /> },
    { path: '/resume', element: <Shell /> },
    { path: '/contact', element: <Shell /> },
    { path: '*', element: <Navigate to="/" replace /> },
  ],
  { basename: import.meta.env.BASE_URL },
)

export const App = () => <RouterProvider router={router} />
