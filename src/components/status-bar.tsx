import { useEffect, useState } from 'react'
import { Dot, Slash } from '@/components/primitives'
import { content } from '@/lib/content'
import { useNowPlaying } from '@/lib/now-playing'

const LocalTime = ({ timeZone }: { timeZone: string }) => {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  }).format(now)

  return <time dateTime={now.toISOString()}>{time}</time>
}

export const StatusBar = () => {
  const { profile, skills } = content
  const nowPlaying = useNowPlaying()
  const ticker = nowPlaying
    ? ['A minor pentatonic', `${nowPlaying.bpm} BPM`, 'Web Audio', 'No samples']
    : [...skills.expert, ...skills.experienced]

  return (
    <footer className="vt-status fixed inset-x-0 bottom-0 z-40 bg-background px-3">
      <div className="type-label flex h-9 items-center justify-between gap-6 border-t border-border whitespace-nowrap">
        <p>
          <span className="hidden sm:inline">
            Socials
            <Slash />
          </span>
          {profile.links.map((link, index) => (
            <span key={link.label}>
              {index > 0 && <Slash />}
              <a
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </span>
          ))}
        </p>

        {/* Ticks every second, so it's kept out of the accessibility tree rather than announced. */}
        <p aria-hidden className="text-muted-foreground tabular-nums">
          <Dot live />
          <span className="hidden sm:inline">
            {profile.location.split(',')[0]}
            <Slash />
          </span>
          <LocalTime timeZone={profile.timeZone} />
        </p>

        <p aria-hidden className="hidden w-[30%] max-w-md gap-[1ch] md:flex">
          <span className="shrink-0">{nowPlaying ? '♪ Now playing' : '◊ Toolkit'}</span>
          <span className="shrink-0 text-muted-foreground">//</span>
          <span className="overflow-hidden text-muted-foreground">
            <span className="animate-marquee inline-block">
              {[...ticker, ...ticker].map((item, index) => (
                <span key={index}>
                  {item}
                  <Slash className="text-muted-foreground/60" />
                </span>
              ))}
            </span>
          </span>
        </p>
      </div>
    </footer>
  )
}
