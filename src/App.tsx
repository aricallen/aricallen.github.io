import { MotionConfig } from 'motion/react'
import { createBrowserRouter, Navigate, Outlet, RouterProvider, ScrollRestoration } from 'react-router'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { HomePage } from '@/pages/home-page'
import { ProjectPage } from '@/pages/project-page'
import { ResumePage } from '@/pages/resume-page'

const Layout = () => (
  <MotionConfig reducedMotion="user">
    <a
      href="#main"
      className="type-label fixed top-2 left-3 z-50 -translate-y-20 rounded-md bg-foreground px-3 py-1.5 text-background focus-visible:translate-y-0"
    >
      Skip to content
    </a>
    <SiteHeader />
    {/* Padded clear of the fixed header. */}
    <main id="main" className="scroll-mt-13 pt-13">
      <Outlet />
    </main>
    <SiteFooter />
    {/* Every hard load starts with the same history key, so key those by path: a refresh restores
        its place, but a deep link doesn't inherit the scroll position of the last page loaded. */}
    <ScrollRestoration getKey={(location) => (location.key === 'default' ? location.pathname : location.key)} />
  </MotionConfig>
)

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'work/:id', element: <ProjectPage /> },
        { path: 'resume', element: <ResumePage /> },
        { path: '*', element: <Navigate to="/" replace /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)

export const App = () => <RouterProvider router={router} />
