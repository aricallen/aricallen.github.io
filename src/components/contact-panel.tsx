import { Link } from 'react-router'
import { Block } from '@/components/block'
import { Panel, PanelItem } from '@/components/panel'
import { rise } from '@/lib/motion'
import { asset, content } from '@/lib/content'

/** Show the bare address ("github.com/aricallen") rather than the full URL. */
const displayUrl = (url: string) => url.replace(/^(mailto:|https?:\/\/(www\.)?)/, '').replace(/\/$/, '')

const linkClass =
  'link-dotted rounded-xs outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring'

export const ContactPanel = () => {
  const { profile } = content
  const email = profile.links.find((link) => link.icon === 'mail')

  return (
    <Panel title="contact">
      <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
        <PanelItem variants={rise} className="md:col-span-2 lg:col-span-2">
          <p className="headline text-[clamp(1.5rem,3.4vw,2.75rem)] text-pretty normal-case">
            Open to senior and staff frontend roles.{' '}
            {email && (
              <a href={email.url} className={`${linkClass} text-dock-active`}>
                Say hi
              </a>
            )}
            .
          </p>
        </PanelItem>

        <PanelItem variants={rise} className="lg:col-start-1 lg:row-start-2">
          <Block label="find me">
            <ul className="flex flex-col gap-2">
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
            </ul>
          </Block>
        </PanelItem>

        <PanelItem variants={rise} className="lg:col-start-2 lg:row-start-2">
          <Block label="resume">
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/resume" className={linkClass}>
                  Read it here →
                </Link>
              </li>
              <li>
                <a href={asset(profile.resumeUrl)} download={`${profile.name} Resume.pdf`} className={linkClass}>
                  Download the PDF ↓
                </a>
              </li>
            </ul>
          </Block>
        </PanelItem>

        <PanelItem variants={rise} className="lg:col-start-3 lg:row-start-2">
          <Block label="based in">
            <p>{profile.location}. Remote-friendly, happy to travel.</p>
          </Block>
        </PanelItem>
      </div>
    </Panel>
  )
}
