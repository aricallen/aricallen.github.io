import { content } from '@/lib/content'

export const SiteFooter = () => {
  const { profile } = content
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center sm:px-6">
        <p className="font-mono text-sm text-muted-foreground italic">“{profile.quote}”</p>
        <p className="text-sm text-muted-foreground">
          © {year} {profile.name} · Designed & built with React, Tailwind & motion ·{' '}
          <a
            href="https://github.com/aricallen/aricallen.github.io"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            View source
          </a>
        </p>
      </div>
    </footer>
  )
}
