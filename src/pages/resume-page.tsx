import { DownloadIcon, MapPinIcon } from 'lucide-react'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { SocialIcon } from '@/components/brand-icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { asset, content, type ResumeEntry } from '@/lib/content'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

/** Show the bare address ("github.com/aricallen") rather than the full URL. */
const displayUrl = (url: string) => url.replace(/^(mailto:|https?:\/\/(www\.)?)/, '').replace(/\/$/, '')

const SectionHeading = ({ id, children }: { id: string; children: ReactNode }) => (
  <h2 id={id} className="mb-5 font-mono text-sm tracking-widest text-muted-foreground uppercase">
    {children}
  </h2>
)

const ExperienceEntry = ({ entry }: { entry: ResumeEntry }) => (
  <li className="relative pl-8">
    <span
      aria-hidden
      className="absolute top-2 -left-[5px] size-2.5 rounded-full bg-primary ring-4 ring-background"
    />
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <h3 className="font-heading text-xl font-semibold">
        {entry.company}
        <span className="font-normal text-muted-foreground"> · {entry.role}</span>
      </h3>
      <p className="font-mono text-sm text-muted-foreground">{entry.dates}</p>
    </div>
    <ul className="mt-3 flex flex-col gap-2">
      {entry.bullets.map((bullet) => (
        <li key={bullet} className="flex gap-2 leading-relaxed">
          <span aria-hidden className="text-primary">
            ▹
          </span>
          <span className="text-muted-foreground">{bullet}</span>
        </li>
      ))}
    </ul>
  </li>
)

export const ResumePage = () => {
  const { profile, resume } = content

  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <motion.header {...fadeUp} className="flex flex-col gap-6 border-b border-border/60 pb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 font-mono text-sm text-primary">// resume</p>
          <h1 className="font-heading text-5xl font-semibold tracking-tight sm:text-6xl">{profile.name}</h1>
          <p className="mt-2 font-heading text-2xl font-medium text-gradient sm:text-3xl">{resume.title}</p>
          <p className="mt-4 font-mono text-sm text-muted-foreground italic">“{profile.quote}”</p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <MapPinIcon aria-hidden className="size-4" />
              {profile.location}
            </li>
            {profile.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-foreground hover:underline [&_svg]:size-4"
                >
                  <SocialIcon icon={link.icon} />
                  {displayUrl(link.url)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Button
          size="lg"
          className="w-fit"
          nativeButton={false}
          render={<a href={asset(profile.resumeUrl)} download={`${profile.name} Resume.pdf`} />}
        >
          <DownloadIcon data-icon="inline-start" />
          Download PDF
        </Button>
      </motion.header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.7fr_1fr]">
        <motion.section {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} aria-labelledby="experience">
          <SectionHeading id="experience">Experience</SectionHeading>
          <ol className="flex flex-col gap-10 border-l border-border">
            {resume.experience.map((entry) => (
              <ExperienceEntry key={entry.company} entry={entry} />
            ))}
          </ol>
        </motion.section>

        <motion.aside {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="flex flex-col gap-10">
          <section aria-labelledby="highlights" className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
            <SectionHeading id="highlights">Highlights</SectionHeading>
            <ul className="flex flex-col gap-3 text-sm leading-relaxed">
              {resume.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span aria-hidden className="text-primary">
                    ▹
                  </span>
                  <span className="text-muted-foreground">{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="skills">
            <SectionHeading id="skills">Skills</SectionHeading>
            <div className="flex flex-col gap-5">
              {resume.skills.map((group) => (
                <div key={group.label}>
                  <h3 className="mb-2 text-sm font-medium">{group.label}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((skill) => (
                      <Badge key={skill} variant="secondary" className="font-mono">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="education">
            <SectionHeading id="education">Education</SectionHeading>
            <p className="font-medium">{resume.education.degree}</p>
            <p className="text-sm text-muted-foreground">
              {resume.education.school} · <span className="font-mono">{resume.education.dates}</span>
            </p>
          </section>
        </motion.aside>
      </div>
    </div>
  )
}
