import { Link } from 'react-router'
import { Section } from '@/components/section'
import { asset, content } from '@/lib/content'

/** Show the bare address ("github.com/aricallen") rather than the full URL. */
const displayUrl = (url: string) => url.replace(/^(mailto:|https?:\/\/(www\.)?)/, '').replace(/\/$/, '')

const rowClass =
  'rule-b group grid grid-cols-[8rem_1fr_auto] items-baseline gap-x-4 py-4 outline-none transition-colors hover:text-foreground focus-visible:bg-muted/60 sm:grid-cols-[10rem_1fr_auto]'

export const ContactSection = () => {
  const { profile } = content

  return (
    <Section
      id="contact"
      index="04"
      label="Contact"
      statement="Open to senior and staff frontend roles. Let's build something people love to use."
      intro={<p>Based in {profile.location}. Remote-friendly, happy to travel.</p>}
    >
      <div className="label rule-t text-muted-foreground">
        {profile.links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target={link.url.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className={rowClass}
          >
            <span className="text-foreground">{link.label}</span>
            <span className="truncate">{displayUrl(link.url)}</span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>
        ))}
        <Link to="/resume" className={rowClass}>
          <span className="text-foreground">Resume</span>
          <span>Experience, highlights, and skills</span>
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
        <a href={asset(profile.resumeUrl)} download={`${profile.name} Resume.pdf`} className={rowClass}>
          <span className="text-foreground">PDF</span>
          <span>Download the one-page version</span>
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">
            ↓
          </span>
        </a>
      </div>
    </Section>
  )
}
