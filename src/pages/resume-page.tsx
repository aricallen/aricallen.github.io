import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { asset, content, type ResumeEntry } from '@/lib/content'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
}

/** Show the bare address ("github.com/aricallen") rather than the full URL. */
const displayUrl = (url: string) => url.replace(/^(mailto:|https?:\/\/(www\.)?)/, '').replace(/\/$/, '')

const SectionLabel = ({ index, children }: { index: string; children: ReactNode }) => (
  <h2 className="label flex items-center gap-3 text-muted-foreground">
    <span aria-hidden className="text-accent-ink">
      {index}
    </span>
    <span aria-hidden>//</span>
    <span className="text-foreground">{children}</span>
  </h2>
)

const ExperienceEntry = ({ entry }: { entry: ResumeEntry }) => (
  <li className="rule-b grid grid-cols-1 gap-x-6 gap-y-3 py-6 lg:grid-cols-[10rem_1fr]">
    <p className="label text-muted-foreground">[{entry.dates}]</p>
    <div className="flex flex-col gap-3">
      <h3 className="flex flex-wrap items-baseline gap-x-3">
        <span className="font-serif text-2xl leading-none tracking-tight sm:text-3xl">{entry.company}</span>
        <span className="label text-muted-foreground">
          <span aria-hidden>// </span>
          {entry.role}
        </span>
      </h3>
      <ul className="flex flex-col gap-2">
        {entry.bullets.map((bullet) => (
          <li
            key={bullet}
            className="grid grid-cols-[1rem_1fr] gap-2 font-sans text-sm leading-relaxed text-muted-foreground"
          >
            <span aria-hidden className="text-accent-ink">
              ▹
            </span>
            <span className="text-pretty">{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  </li>
)

const Block = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`grid grid-cols-1 gap-x-6 gap-y-6 rule-t px-4 py-10 sm:px-6 lg:grid-cols-[2fr_3fr] ${className}`}>
    {children}
  </div>
)

export const ResumePage = () => {
  const { profile, resume } = content

  return (
    <div className="pt-bar">
      <motion.header
        {...fadeUp}
        className="grid grid-cols-1 gap-x-6 gap-y-8 px-4 pt-14 pb-12 sm:px-6 lg:grid-cols-[3fr_2fr]"
      >
        <h1 className="display text-[clamp(2.6rem,7vw,6.5rem)] text-balance">
          {profile.name}.
          <br />
          <span className="text-muted-foreground">{resume.title}.</span>
        </h1>
        <dl className="label grid grid-cols-[6rem_1fr] gap-x-4 gap-y-2 self-end rule-t pt-4 text-muted-foreground">
          <dt className="text-foreground">Based in</dt>
          <dd>{profile.location}</dd>
          {profile.links.map((link) => (
            <div key={link.label} className="contents">
              <dt className="text-foreground">{link.label}</dt>
              <dd>
                <a
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="link-rule rounded-xs outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {displayUrl(link.url)}
                </a>
              </dd>
            </div>
          ))}
          <dt className="text-foreground">PDF</dt>
          <dd>
            <a
              href={asset(profile.resumeUrl)}
              download={`${profile.name} Resume.pdf`}
              className="link-rule rounded-xs outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              Download the one-page version ↓
            </a>
          </dd>
        </dl>
      </motion.header>

      <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
        <Block>
          <div className="flex flex-col gap-6">
            <SectionLabel index="01">Highlights</SectionLabel>
            <p className="display text-[clamp(1.7rem,3.4vw,3rem)] text-balance lg:pr-10">
              Ten years of frontend, six of full-stack, and a habit of leaving codebases better than I found them.
            </p>
          </div>
          <ul className="rule-t">
            {resume.highlights.map((highlight, i) => (
              <li key={highlight} className="rule-b grid grid-cols-[2.5rem_1fr] gap-x-4 py-3">
                <span aria-hidden className="label pt-1 text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-sans text-sm leading-relaxed text-pretty">{highlight}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block>
          <div className="flex flex-col gap-6">
            <SectionLabel index="02">Experience</SectionLabel>
          </div>
          <ol className="rule-t">
            {resume.experience.map((entry) => (
              <ExperienceEntry key={`${entry.company}-${entry.dates}`} entry={entry} />
            ))}
          </ol>
        </Block>

        <Block>
          <div className="flex flex-col gap-6">
            <SectionLabel index="03">Skills</SectionLabel>
          </div>
          <dl className="rule-t">
            {resume.skills.map((group) => (
              <div key={group.label} className="rule-b grid grid-cols-1 gap-x-6 gap-y-2 py-4 sm:grid-cols-[8rem_1fr]">
                <dt className="label text-foreground">{group.label}</dt>
                <dd className="label leading-relaxed text-muted-foreground">
                  {group.items.map((item, index) => (
                    <span key={item}>
                      {index > 0 && <span aria-hidden> // </span>}
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block className="pb-[calc(var(--bar-height)+2.5rem)]">
          <div className="flex flex-col gap-6">
            <SectionLabel index="04">Education</SectionLabel>
          </div>
          <div className="rule-t rule-b grid grid-cols-1 gap-x-6 gap-y-3 py-6 lg:grid-cols-[10rem_1fr]">
            <p className="label text-muted-foreground">[{resume.education.dates}]</p>
            <div>
              <p className="font-serif text-2xl leading-none tracking-tight sm:text-3xl">{resume.education.school}</p>
              <p className="label mt-3 text-muted-foreground">{resume.education.degree}</p>
            </div>
          </div>
        </Block>
      </motion.div>
    </div>
  )
}
