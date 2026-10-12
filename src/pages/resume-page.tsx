import { DownloadIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Band, Pill } from '@/components/frame'
import { asset, content, type ResumeEntry, type Tone } from '@/lib/content'
import { displayUrl } from '@/lib/format'

const TONES: Tone[] = ['lime', 'sky', 'pink', 'peach']

const Heading = ({ id, children }: { id: string; children: ReactNode }) => (
  <h2 id={id} className="type-label mb-5 text-muted-foreground">
    {children}
  </h2>
)

const ExperienceEntry = ({ entry, tone }: { entry: ResumeEntry; tone: Tone }) => (
  <li data-tone={tone} className="border-border py-8 not-last:border-b first:pt-0">
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <h3 className="font-heading text-3xl tracking-[-0.02em]">{entry.company}</h3>
      <p className="type-label text-tone-ink">{entry.dates}</p>
    </div>
    <p className="type-label mt-1 text-muted-foreground">{entry.role}</p>
    <ul className="mt-4 flex flex-col gap-2.5">
      {entry.bullets.map((bullet) => (
        <li key={bullet} className="flex gap-3 leading-relaxed">
          <span aria-hidden className="mt-[0.6em] size-2 shrink-0 rounded-full bg-tone ring-1 ring-tone-ink" />
          {bullet}
        </li>
      ))}
    </ul>
  </li>
)

export const ResumePage = () => {
  const { profile, resume } = content

  return (
    <>
      <Band className="grid lg:grid-cols-[1.4fr_1fr]">
        <header className="border-border px-5 py-10 sm:px-11 sm:py-16 max-lg:border-b lg:border-r">
          <h1 className="font-heading text-[clamp(2.6rem,6vw,5rem)] leading-none tracking-[-0.035em]">
            {profile.name}
          </h1>
          <p className="mt-5 font-heading text-2xl tracking-[-0.01em] sm:text-3xl">
            <Pill tone="lime">{resume.title}</Pill>
          </p>
          <p className="mt-6 max-w-[30ch] font-heading text-xl text-muted-foreground italic">“{profile.quote}”</p>
        </header>
        <div className="flex flex-col justify-between gap-8 px-5 py-10 sm:px-11 sm:py-16">
          <ul className="flex flex-col gap-2 text-[1.05rem]">
            <li className="text-muted-foreground">{profile.location}</li>
            {profile.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
                >
                  {displayUrl(link.url)}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={asset(profile.resumeUrl)}
            download={`${profile.name} Resume.pdf`}
            className="type-label flex w-fit items-center gap-2.5 rounded-full bg-foreground px-5 py-3 text-background transition-transform hover:-translate-y-0.5"
          >
            <DownloadIcon aria-hidden className="size-4" />
            Download PDF
          </a>
        </div>
      </Band>

      <Band outerClassName="border-b-0" className="grid lg:grid-cols-[1.4fr_1fr]">
        <section
          aria-labelledby="experience"
          className="border-border px-5 py-10 sm:px-11 sm:py-14 max-lg:border-b lg:border-r"
        >
          <Heading id="experience">Experience</Heading>
          <ol>
            {resume.experience.map((entry, index) => (
              <ExperienceEntry key={entry.company} entry={entry} tone={TONES[index % TONES.length]} />
            ))}
          </ol>
        </section>

        <div className="flex flex-col">
          <section aria-labelledby="highlights" className="border-b border-border px-5 py-10 sm:px-11 sm:py-14">
            <Heading id="highlights">Highlights</Heading>
            <ul className="flex flex-col gap-4">
              {resume.highlights.map((highlight) => (
                <li key={highlight} className="leading-relaxed">
                  {highlight}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="skills" className="border-b border-border px-5 py-10 sm:px-11 sm:py-14">
            <Heading id="skills">Skills</Heading>
            <div className="flex flex-col gap-6">
              {resume.skills.map((group, index) => (
                <div key={group.label} data-tone={TONES[index % TONES.length]}>
                  <h3 className="type-label mb-2.5 flex items-center gap-2.5">
                    <span aria-hidden className="size-2.5 rounded-full bg-tone ring-1 ring-tone-ink" />
                    {group.label}
                  </h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {group.items.map((skill) => (
                      <li key={skill} className="rounded-full border border-border px-3 py-0.5 text-[0.92rem]">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="education" className="px-5 py-10 sm:px-11 sm:py-14">
            <Heading id="education">Education</Heading>
            <p className="font-heading text-2xl tracking-[-0.01em]">{resume.education.degree}</p>
            <p className="mt-1 text-muted-foreground">
              {resume.education.school} · {resume.education.dates}
            </p>
          </section>
        </div>
      </Band>
    </>
  )
}
