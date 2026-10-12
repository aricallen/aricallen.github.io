import { Block } from '@/components/block'
import { Panel, PanelItem } from '@/components/panel'
import { rise } from '@/lib/motion'
import { asset, content, type ResumeEntry } from '@/lib/content'

/** Show the bare address ("github.com/aricallen") rather than the full URL. */
const displayUrl = (url: string) => url.replace(/^(mailto:|https?:\/\/(www\.)?)/, '').replace(/\/$/, '')

const linkClass =
  'link-dotted rounded-xs outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring'

const ExperienceEntry = ({ entry }: { entry: ResumeEntry }) => (
  <li className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-[9rem_1fr]">
    <p className="block-label normal-case">{entry.dates}</p>
    <div className="flex flex-col gap-2">
      <h3 className="headline text-xl normal-case sm:text-2xl">
        {entry.company} <span className="font-mono text-sm font-normal text-muted-foreground">· {entry.role}</span>
      </h3>
      <ul className="flex flex-col gap-1.5">
        {entry.bullets.map((bullet) => (
          <li key={bullet} className="grid grid-cols-[1rem_1fr] gap-1 text-pretty">
            <span aria-hidden className="text-muted-foreground">
              –
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  </li>
)

export const ResumePage = () => {
  const { profile, resume } = content

  return (
    <Panel title="resume">
      <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-3 lg:gap-y-16">
        <PanelItem variants={rise} className="lg:col-span-2">
          <Block label="tldr">
            <div className="flex flex-col gap-3">
              <p className="headline text-xl normal-case sm:text-2xl">
                {profile.name} · {resume.title}
              </p>
              <ul className="flex flex-col gap-1.5">
                {resume.highlights.map((highlight) => (
                  <li key={highlight} className="grid grid-cols-[1rem_1fr] gap-1 text-pretty">
                    <span aria-hidden className="text-muted-foreground">
                      –
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Block>
        </PanelItem>

        <PanelItem variants={rise}>
          <Block label="reach me">
            <ul className="flex flex-col gap-2">
              <li className="flex flex-wrap items-baseline gap-x-3">
                <span className="w-20 text-muted-foreground">based in</span>
                <span>{profile.location}</span>
              </li>
              {profile.links.map((link) => (
                <li key={link.label} className="flex flex-wrap items-baseline gap-x-3">
                  <span className="w-20 text-muted-foreground">{link.label.toLowerCase()}</span>
                  <a
                    href={link.url}
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className={linkClass}
                  >
                    {displayUrl(link.url)}
                  </a>
                </li>
              ))}
              <li className="flex flex-wrap items-baseline gap-x-3">
                <span className="w-20 text-muted-foreground">pdf</span>
                <a href={asset(profile.resumeUrl)} download={`${profile.name} Resume.pdf`} className={linkClass}>
                  Download ↓
                </a>
              </li>
            </ul>
          </Block>
        </PanelItem>

        <PanelItem variants={rise} className="lg:col-span-3">
          <Block label="experience">
            <ol className="flex flex-col gap-10">
              {resume.experience.map((entry) => (
                <ExperienceEntry key={`${entry.company}-${entry.dates}`} entry={entry} />
              ))}
            </ol>
          </Block>
        </PanelItem>

        <PanelItem variants={rise} className="lg:col-span-2">
          <Block label="skills">
            <dl className="flex flex-col gap-4">
              {resume.skills.map((group) => (
                <div key={group.label} className="flex flex-col gap-1">
                  <dt className="block-label">{group.label}</dt>
                  <dd className="text-pretty">{group.items.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </Block>
        </PanelItem>

        <PanelItem variants={rise}>
          <Block label="education">
            <p>{resume.education.school}</p>
            <p className="text-muted-foreground">
              {resume.education.degree} · {resume.education.dates}
            </p>
          </Block>
        </PanelItem>
      </div>
    </Panel>
  )
}
