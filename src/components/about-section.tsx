import { Section } from '@/components/section'
import { content } from '@/lib/content'

export const AboutSection = () => {
  const { profile, skills } = content
  const groups = [
    { label: 'Expert', items: skills.expert },
    { label: 'Experienced', items: skills.experienced },
    { label: 'Learning', items: skills.learning },
  ]

  return (
    <Section
      id="about-detail"
      index="01"
      label="About"
      statement="I really enjoy working where design and engineering meet."
      intro={<p>{profile.bio}</p>}
    >
      <div className="flex flex-col gap-10">
        <blockquote className="font-serif text-[clamp(1.6rem,2.8vw,2.4rem)] leading-tight text-balance">
          “{profile.quote}”
        </blockquote>

        <dl className="rule-t">
          {groups.map((group) => (
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
      </div>
    </Section>
  )
}
