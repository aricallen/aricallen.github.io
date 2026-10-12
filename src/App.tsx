import { MotionConfig } from 'motion/react'
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from 'react-router'
import { Background } from '@/components/background'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { HomePage } from '@/pages/home-page'
import { ResumePage } from '@/pages/resume-page'

const Layout = () => (
  <MotionConfig reducedMotion="user">
    <div id="top" className="relative min-h-dvh">
      <Background />
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
    <ScrollRestoration />
  </MotionConfig>
)

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'resume', element: <ResumePage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)

export const App = () => <RouterProvider router={router} />
