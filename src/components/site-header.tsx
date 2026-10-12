import { Link, NavLink, useLocation } from 'react-router'
import { Slash } from '@/components/primitives'
import { ThemeToggle } from '@/components/theme-toggle'
import { content } from '@/lib/content'

// The current page is struck through rather than highlighted: you're already here, so it's crossed off.
const navLink =
  'text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:line-through'

export const SiteHeader = () => {
  const { profile } = content
  const { pathname } = useLocation()
  const email = profile.links.find((link) => link.icon === 'mail')

  return (
    <header className="vt-header fixed inset-x-0 top-0 z-40 bg-background px-3">
      <div className="type-label flex h-9 items-center justify-between gap-4 border-b border-border">
        <p className="whitespace-nowrap">
          <Link to="/" viewTransition>
            {profile.monogram}
          </Link>
          <span className="hidden text-muted-foreground sm:inline">
            <Slash />
            {profile.location}
          </span>
        </p>
        <nav aria-label="Primary" className="whitespace-nowrap">
          <NavLink to="/" end viewTransition className={navLink}>
            Home
          </NavLink>
          <Slash />
          <Link
            to={{ pathname: '/', hash: '#work' }}
            viewTransition
            aria-current={pathname.startsWith('/work') ? 'page' : undefined}
            className={navLink}
          >
            Work
          </Link>
          <Slash />
          <NavLink to="/resume" viewTransition className={navLink}>
            Resume
          </NavLink>
          {email && (
            <>
              <Slash />
              <a href={email.url} className={navLink}>
                Contact
              </a>
            </>
          )}
          <Slash />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
