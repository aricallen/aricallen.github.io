import { ThemeToggle } from '@/components/theme-toggle'
import { content } from '@/lib/content'

/** Thin fixed status line at the very bottom; the dock floats above it. */
export const SiteFooter = () => {
  const { profile } = content
  const year = new Date().getFullYear()

  return (
    <footer className="rule-t fixed inset-x-0 bottom-0 z-30 h-10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-4 px-5 font-mono text-xs text-muted-foreground sm:px-8">
        <p>
          © {year} {profile.name}
        </p>
        <p className="flex items-center gap-3">
          <span className="hidden sm:inline">Built with React</span>
          <span aria-hidden className="hidden sm:inline">
            ·
          </span>
          <span className="hidden sm:inline">Hosted on GitHub Pages</span>
          <span aria-hidden className="hidden sm:inline">
            ·
          </span>
          <a
            href="https://github.com/aricallen/aricallen.github.io"
            target="_blank"
            rel="noreferrer"
            className="link-dotted rounded-xs outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            Source
          </a>
          <span aria-hidden>·</span>
          <ThemeToggle />
        </p>
      </div>
    </footer>
  )
}
