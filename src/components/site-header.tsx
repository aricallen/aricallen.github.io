import { Link, NavLink, useLocation } from 'react-router'
import { PauseToggle } from '@/components/pause-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { asset, content } from '@/lib/content'

// Each nav item is a ruled cell; the current one is filled in with highlighter.
const cell =
  'flex cursor-pointer items-center border-l border-border px-4 transition-colors hover:bg-muted sm:px-6 aria-[current=page]:bg-(--lime) aria-[current=page]:text-ink'

export const SiteHeader = () => {
  const { profile } = content
  const { pathname } = useLocation()
  const email = profile.links.find((link) => link.icon === 'mail')

  return (
    <header className="vt-header fixed inset-x-0 top-0 z-40 border-b border-border bg-background px-3 sm:px-8 lg:px-[3.875rem]">
      <div className="mx-auto flex h-13 max-w-[84rem] items-stretch justify-between border-x border-border">
        <div className="flex items-center gap-4 px-4">
          <Link to="/" viewTransition aria-label={`${profile.name}, home`} className="rounded-full">
            <img
              src={asset(profile.avatar)}
              alt=""
              className="size-8 rounded-full object-cover ring-2 ring-(--pink) ring-offset-2 ring-offset-background"
            />
          </Link>
          <PauseToggle />
        </div>
        <nav aria-label="Primary" className="type-label flex items-stretch">
          <Link
            to={{ pathname: '/', hash: '#work' }}
            viewTransition
            aria-current={pathname.startsWith('/work') ? 'page' : undefined}
            className={cell}
          >
            Work
          </Link>
          <NavLink to="/resume" viewTransition className={cell}>
            Resume
          </NavLink>
          {email && (
            <a href={email.url} className={`${cell} max-sm:hidden`}>
              Contact
            </a>
          )}
          <ThemeToggle className={cell} />
        </nav>
      </div>
    </header>
  )
}
