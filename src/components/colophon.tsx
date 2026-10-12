import { Link } from 'react-router'
import { Emphasis, Prose, Reveal, SectionLabel, Slash } from '@/components/primitives'
import { asset, content } from '@/lib/content'
import { displayUrl, pad } from '@/lib/format'
import { cn } from '@/lib/utils'

const SOURCE_URL = 'https://github.com/aricallen/aricallen.github.io'
const INSPIRATION_URL = 'https://samgoddard.co.uk'

const rowLink = 'text-muted-foreground transition-colors hover:text-foreground'

export const Colophon = () => {
  const { profile, skills } = content
  const email = profile.links.find((link) => link.icon === 'mail')
  const groups = [
    { label: 'Expert', items: skills.expert },
    { label: 'Experienced', items: skills.experienced },
    { label: 'Learning', items: skills.learning },
  ]

  return (
    <>
      <section aria-labelledby="toolkit-heading" className="grid gap-x-6 gap-y-16 px-3 py-16 lg:py-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-5 lg:col-start-2">
          <SectionLabel id="toolkit-heading" index="04">
            Toolkit
          </SectionLabel>
          <dl className="mt-4 border-t border-border">
            {groups.map((group) => (
              <div
                key={group.label}
                className="type-label grid gap-x-6 gap-y-1 border-b border-border py-2.5 sm:grid-cols-[8.5rem_1fr]"
              >
                <dt>
                  {group.label} <span className="text-muted-foreground">[{pad(group.items.length)}]</span>
                </dt>
                <dd className="leading-5 text-muted-foreground">
                  {group.items.map((item, index) => (
                    <span key={item}>
                      {index > 0 && <Slash className="text-muted-foreground/50" />}
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="lg:col-span-5">
          <SectionLabel index="05">Colophon</SectionLabel>
          <Prose className="mt-4">
            Built with React 19 and its compiler, TypeScript, Vite, Tailwind and Motion, and served as static files from
            GitHub Pages. Set in Instrument Serif and Geist Mono. The portrait is a canvas halftone and the sequencer is
            raw Web Audio — no samples, no audio libraries. The design language is a nod to{' '}
            <a
              href={INSPIRATION_URL}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Sam Goddard’s site
            </a>
            .
          </Prose>
          <ul className="type-label mt-6 border-t border-border">
            <li className="flex justify-between gap-6 border-b border-border py-2.5">
              Source
              <a href={SOURCE_URL} target="_blank" rel="noreferrer" className={cn(rowLink, 'text-right break-all')}>
                {displayUrl(SOURCE_URL)} ↗
              </a>
            </li>
            <li className="flex justify-between gap-6 border-b border-border py-2.5">
              Resume
              <span>
                <Link to="/resume" viewTransition className={rowLink}>
                  Read →
                </Link>
                <Slash />
                <a href={asset(profile.resumeUrl)} download={`${profile.name} Resume.pdf`} className={rowLink}>
                  PDF ↓
                </a>
              </span>
            </li>
          </ul>
        </Reveal>
      </section>

      {email && (
        <section aria-label="Contact" className="px-3 pt-12 pb-10">
          <Reveal>
            <a href={email.url} className="group block border-y border-border py-8 text-center">
              <span className="type-label text-muted-foreground">Say hello</span>
              <span className="type-display mt-4 block text-[clamp(2.9rem,9vw,10rem)] text-balance">
                <Emphasis text="Let’s build something people _love to use._" />
              </span>
              <span className="type-label mt-6 inline-block text-muted-foreground transition-colors group-hover:text-foreground">
                {displayUrl(email.url)} →
              </span>
            </a>
          </Reveal>
          <p className="type-label mt-3 flex justify-between text-muted-foreground">
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <a href="#main" className="transition-colors hover:text-foreground">
              Back to top ↑
            </a>
          </p>
        </section>
      )}
    </>
  )
}
