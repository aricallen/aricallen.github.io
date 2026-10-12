import { MotionConfig } from 'motion/react'
import { createBrowserRouter, Navigate, Outlet, RouterProvider, ScrollRestoration } from 'react-router'
import { SiteHeader } from '@/components/site-header'
import { StatusBar } from '@/components/status-bar'
import { HomePage } from '@/pages/home-page'
import { ProjectPage } from '@/pages/project-page'
import { ResumePage } from '@/pages/resume-page'

const Layout = () => (
  <MotionConfig reducedMotion="user">
    <a
      href="#main"
      className="type-label fixed top-1.5 left-3 z-50 -translate-y-16 bg-foreground px-2 py-1 text-background focus-visible:translate-y-0"
    >
      Skip to content
    </a>
    <SiteHeader />
    {/* Padded clear of the fixed header and status bar. */}
    <main id="main" className="mx-auto max-w-[120rem] scroll-mt-9 py-9">
      <Outlet />
    </main>
    <StatusBar />
    <ScrollRestoration />
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
