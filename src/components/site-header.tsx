import { Link, useLocation } from 'react-router'
import { ThemeToggle } from '@/components/theme-toggle'
import { content } from '@/lib/content'
import { cn } from '@/lib/utils'

const NAV = [
  {
    label: 'Home',
    to: '/',
    match: (pathname: string, hash: string) => pathname === '/' && hash === '',
    // The monogram already links home, so this is only needed when there's room for it.
    hideOnMobile: true,
  },
  {
    label: 'Work',
    to: { pathname: '/', hash: '#work' },
    match: (pathname: string, hash: string) => pathname === '/' && hash === '#work',
  },
  { label: 'Resume', to: '/resume', match: (pathname: string) => pathname === '/resume' },
  {
    label: 'Contact',
    to: { pathname: '/', hash: '#contact' },
    match: (pathname: string, hash: string) => pathname === '/' && hash === '#contact',
  },
]

/** Fixed top bar: monogram and location on the left, primary nav on the right. */
export const SiteHeader = () => {
  const { profile } = content
  const { pathname, hash } = useLocation()

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-bar rule-b bg-background/85 backdrop-blur-md">
      <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="label flex items-center gap-2 rounded-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span aria-hidden className="text-accent-ink">
            Ø
          </span>
          <span className="font-medium">{profile.monogram}</span>
          <span aria-hidden className="hidden text-muted-foreground sm:inline">
            //
          </span>
          <span className="hidden text-muted-foreground sm:inline">{profile.location}</span>
        </Link>

        <nav aria-label="Primary" className="flex shrink-0 items-center gap-2">
          <ul className="label flex items-center gap-2 text-muted-foreground">
            {NAV.map((item, index) => {
              const active = item.match(pathname, hash)
              return (
                <li
                  key={item.label}
                  className={cn('flex items-center gap-2', 'hideOnMobile' in item && 'hidden sm:flex')}
                >
                  {index > 0 && (
                    <span aria-hidden className={cn(index === 1 && 'hidden sm:inline')}>
                      //
                    </span>
                  )}
                  <Link
                    to={item.to}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'link-rule rounded-xs py-1 outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
                      active && 'text-foreground line-through decoration-1',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
