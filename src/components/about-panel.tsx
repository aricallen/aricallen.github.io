import { Block } from '@/components/block'
import { Panel, PanelItem } from '@/components/panel'
import { rise } from '@/lib/motion'
import { asset, content } from '@/lib/content'

export const AboutPanel = () => {
  const { profile, skills } = content
  const groups = [
    { label: 'expert', items: skills.expert },
    { label: 'experienced', items: skills.experienced },
    { label: 'learning', items: skills.learning },
  ]

  return (
    <Panel title="about">
      <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-[1fr_1fr_1.2fr] lg:gap-y-16">
        <PanelItem variants={rise} className="lg:col-start-1">
          <Block label="how I work">
            <div className="flex flex-col gap-4">
              <p className="text-pretty">{profile.bio}</p>
              <p className="text-pretty">
                I develop ideas through working prototypes and stay involved through production: writing the RFC,
                building the first version, and doing the rollout, docs, and lint rules that make it stick.
              </p>
              <p className="text-pretty text-muted-foreground">“{profile.quote}”</p>
            </div>
          </Block>
        </PanelItem>

        <PanelItem variants={rise} className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:justify-self-end">
          <figure className="relative overflow-hidden rounded-2xl ring-1 ring-foreground/10">
            <img
              src={asset(profile.avatar)}
              alt={`Portrait of ${profile.name}`}
              className="aspect-square w-full max-w-md object-cover grayscale contrast-110"
            />
            <span aria-hidden className="bg-grain absolute inset-0 opacity-30 mix-blend-overlay" />
          </figure>
        </PanelItem>

        <PanelItem variants={rise} className="lg:col-start-1 lg:row-start-2">
          <Block label="what I do">
            <dl className="flex flex-col gap-4">
              {groups.map((group) => (
                <div key={group.label} className="flex flex-col gap-1">
                  <dt className="block-label">{group.label}</dt>
                  <dd className="text-pretty">{group.items.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </Block>
        </PanelItem>

        <PanelItem variants={rise} className="lg:col-start-2 lg:row-start-3">
          <Block label="currently">
            <ul className="flex flex-col gap-1">
              {profile.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </Block>
        </PanelItem>

        <PanelItem variants={rise} className="lg:col-start-3 lg:row-start-3">
          <Block label="based in">
            <p>{profile.location}</p>
          </Block>
        </PanelItem>
      </div>
    </Panel>
  )
}
