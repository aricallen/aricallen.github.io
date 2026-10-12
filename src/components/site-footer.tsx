import { Link } from 'react-router'
import { content } from '@/lib/content'

const SOURCE_URL = 'https://github.com/aricallen/aricallen.github.io'
const INSPIRATION_URL = 'https://eemonroy.com'

const bigLink = 'transition-colors hover:text-foreground'

export const SiteFooter = () => {
  const { profile } = content

  return (
    <footer className="bg-band px-3 pt-14 pb-8 sm:px-8 lg:px-[3.875rem]">
      <div className="mx-auto flex max-w-[84rem] flex-col gap-12 sm:flex-row sm:items-end sm:justify-between">
        {/* A folder with the quote tucked inside. */}
        <div aria-hidden className="relative h-60 w-[19rem] max-w-full shrink-0">
          <div className="absolute inset-0 rounded-2xl bg-hot [clip-path:polygon(0_0,42%_0,50%_12%,100%_12%,100%_100%,0_100%)] dark:bg-(--pink)" />
          <div className="absolute inset-x-6 top-5 h-40 -rotate-3 rounded-md bg-white p-5 font-heading text-[1.25rem] leading-snug text-ink shadow-lg">
            “{profile.quote}”
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[4.5rem] rounded-2xl bg-(--pink) shadow-[0_-8px_24px_-12px_oklch(0.3_0.15_350/0.5)] dark:bg-hot" />
        </div>
        <p className="sr-only">“{profile.quote}”</p>

        <nav
          aria-label="Footer"
          className="font-heading text-3xl leading-snug tracking-[-0.02em] text-hot sm:text-right sm:text-4xl"
        >
          <ul>
            <li>
              <Link to={{ pathname: '/', hash: '#work' }} viewTransition className={bigLink}>
                Work
              </Link>
            </li>
            <li>
              <Link to="/resume" viewTransition className={bigLink}>
                Resume
              </Link>
            </li>
          </ul>
          <ul className="mt-5">
            {profile.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className={bigLink}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="mx-auto mt-12 max-w-[84rem] text-sm text-hot">
        © {new Date().getFullYear()} {profile.name} · Designed & built with React, Tailwind & motion ·{' '}
        <a
          href={SOURCE_URL}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:text-foreground"
        >
          View source
        </a>{' '}
        · With a tip of the hat to{' '}
        <a
          href={INSPIRATION_URL}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Eemon Roy’s site
        </a>
      </p>
    </footer>
  )
}
