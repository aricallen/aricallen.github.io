import { motion } from 'motion/react'
import { Prose, SectionLabel, Slash } from '@/components/primitives'
import { asset, content, type ResumeEntry } from '@/lib/content'
import { displayUrl } from '@/lib/format'
import { EASE } from '@/lib/motion'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE },
}

const ExperienceEntry = ({ entry }: { entry: ResumeEntry }) => (
  <li className="border-b border-border py-6">
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <h3 className="type-display text-4xl sm:text-5xl">{entry.company}</h3>
      <p className="type-label text-muted-foreground tabular-nums">[{entry.dates}]</p>
    </div>
    <p className="type-label mt-2">{entry.role}</p>
    <ul className="mt-4 flex flex-col gap-2">
      {entry.bullets.map((bullet) => (
        <li key={bullet} className="grid grid-cols-[1.5rem_1fr] leading-relaxed text-muted-foreground">
          <span aria-hidden>—</span>
          {bullet}
        </li>
      ))}
    </ul>
  </li>
)

export const ResumePage = () => {
  const { profile, resume } = content

  return (
    <div className="px-3 pb-24">
      <motion.header {...fadeUp} className="pt-2 pb-14">
        <h1 className="type-display text-[clamp(3rem,10.5vw,11rem)]">{profile.name}</h1>
        <div className="type-label mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-y border-border py-2.5">
          <p>
            {resume.title}
            <span className="text-muted-foreground">
              <Slash />
              {profile.location}
            </span>
          </p>
          <ul>
            {profile.links.map((link, index) => (
              <li key={link.label} className="inline">
                {index > 0 && <Slash />}
                <a
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {displayUrl(link.url)}
                </a>
              </li>
            ))}
          </ul>
          <a href={asset(profile.resumeUrl)} download={`${profile.name} Resume.pdf`} className="bracket -mx-1.5">
            Download PDF ↓
          </a>
        </div>
      </motion.header>

      <div className="grid gap-x-6 gap-y-16 lg:grid-cols-12">
        <motion.section
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          aria-labelledby="experience"
          className="lg:col-span-6 lg:col-start-2"
        >
          <SectionLabel id="experience" index="01" className="border-b border-border pb-2.5">
            Experience
          </SectionLabel>
          <ol>
            {resume.experience.map((entry) => (
              <ExperienceEntry key={entry.company} entry={entry} />
            ))}
          </ol>
        </motion.section>

        <motion.aside
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="flex flex-col gap-14 lg:col-span-4"
        >
          <section aria-labelledby="highlights">
            <SectionLabel id="highlights" index="02" className="border-b border-border pb-2.5">
              Highlights
            </SectionLabel>
            <ul>
              {resume.highlights.map((highlight) => (
                <li key={highlight} className="border-b border-border py-2.5 leading-relaxed text-muted-foreground">
                  {highlight}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="skills">
            <SectionLabel id="skills" index="03" className="border-b border-border pb-2.5">
              Skills
            </SectionLabel>
            <dl className="type-label">
              {resume.skills.map((group) => (
                <div key={group.label} className="border-b border-border py-2.5">
                  <dt>{group.label}</dt>
                  <dd className="mt-1 leading-5 text-muted-foreground">
                    {group.items.map((skill, index) => (
                      <span key={skill}>
                        {index > 0 && <Slash className="text-muted-foreground/50" />}
                        {skill}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="education">
            <SectionLabel id="education" index="04" className="border-b border-border pb-2.5">
              Education
            </SectionLabel>
            <p className="type-quote mt-4 text-2xl">{resume.education.degree}</p>
            <p className="type-label mt-2 text-muted-foreground">
              {resume.education.school}
              <Slash />[{resume.education.dates}]
            </p>
          </section>

          <Prose className="type-quote text-2xl text-foreground">“{profile.quote}”</Prose>
        </motion.aside>
      </div>
    </div>
  )
}
