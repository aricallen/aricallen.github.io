import { content } from '@/lib/content'

export const SiteFooter = () => {
  const { profile } = content
  const year = new Date().getFullYear()

  return (
    <footer className="rule-t grid grid-cols-1 gap-x-6 gap-y-6 px-4 py-10 pb-[calc(var(--bar-height)+2.5rem)] sm:px-6 lg:grid-cols-[2fr_3fr]">
      <h2 className="label text-muted-foreground">
        <span aria-hidden className="text-accent-ink">
          05
        </span>
        <span aria-hidden> // </span>
        <span className="text-foreground">Colophon</span>
      </h2>
      <div className="label flex max-w-xl flex-col gap-4 leading-relaxed text-muted-foreground">
        <p>
          This website was designed and built by {profile.name}. Set in Instrument Serif and Geist Mono. Built with
          React 19 (with the Compiler), TypeScript, Vite, Tailwind v4, and motion; hosted on GitHub Pages. The portrait
          is printed as a halftone on a canvas at runtime.
        </p>
        <p>
          © {year} {profile.name}
          <span aria-hidden> // </span>
          <a
            href="https://github.com/aricallen/aricallen.github.io"
            target="_blank"
            rel="noreferrer"
            className="link-rule rounded-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View source
          </a>
        </p>
      </div>
    </footer>
  )
}
