import { useEffect, useState } from 'react'
import { content } from '@/lib/content'

const TIME_ZONE = 'America/Los_Angeles'

const formatTime = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: TIME_ZONE,
    timeZoneName: 'short',
  }).format(date)

/** Live local clock for the author's time zone; a small "someone is here" signal. */
const LocalClock = () => {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="flex items-center gap-2">
      <span aria-hidden className="animate-blink size-1.5 rounded-full bg-accent-ink" />
      <span>Local time // {formatTime(now)}</span>
    </span>
  )
}

/** Fixed bottom bar: socials on the left, clock in the middle, a ticker of career stats on the right. */
export const StatusBar = () => {
  const { profile, stats } = content
  const ticker = stats.map((stat) => `${stat.value}${stat.suffix} ${stat.label}`)

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 h-bar rule-t bg-background/85 backdrop-blur-md">
      <div className="label grid h-full grid-cols-[auto_1fr] items-center gap-4 px-4 text-muted-foreground sm:px-6 md:grid-cols-[1fr_auto_1fr]">
        <nav aria-label="Social links" className="flex items-center gap-2">
          <span className="hidden text-foreground sm:inline">Socials</span>
          <span aria-hidden className="hidden sm:inline">
            //
          </span>
          {profile.links.map((link, index) => (
            <span key={link.label} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden>//</span>}
              <a
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="link-rule rounded-xs py-1 outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </a>
            </span>
          ))}
        </nav>

        <div className="hidden justify-center md:flex">
          <LocalClock />
        </div>

        <div
          aria-label="Career stats"
          className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        >
          <ul className="animate-marquee flex w-max gap-8 whitespace-nowrap motion-reduce:w-full motion-reduce:justify-end motion-reduce:overflow-hidden">
            {[...ticker, ...ticker].map((item, index) => (
              <li key={`${item}-${index}`} aria-hidden={index >= ticker.length || undefined} className="flex gap-8">
                <span aria-hidden className="text-accent-ink">
                  ◊
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
