import { Band, SectionTitle } from '@/components/frame'
import { content, type Tone } from '@/lib/content'
import { pad } from '@/lib/format'

export const ToolkitSection = () => {
  const { skills } = content
  const groups: { label: string; tone: Tone; items: string[] }[] = [
    { label: 'Expert', tone: 'lime', items: skills.expert },
    { label: 'Experienced', tone: 'sky', items: skills.experienced },
    { label: 'Learning', tone: 'pink', items: skills.learning },
  ]

  return (
    <section aria-labelledby="toolkit-heading">
      <SectionTitle id="toolkit-heading">What’s in the box</SectionTitle>
      <Band className="grid lg:grid-cols-[1.1fr_1.3fr_0.7fr]">
        {groups.map((group) => (
          <div
            key={group.label}
            data-tone={group.tone}
            className="border-border p-5 max-lg:not-last:border-b sm:p-8 lg:not-last:border-r"
          >
            <h3 className="type-label flex items-center gap-2.5">
              <span aria-hidden className="size-2.5 rounded-full bg-tone ring-1 ring-tone-ink" />
              {group.label}
              <span className="text-muted-foreground">{pad(group.items.length)}</span>
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border px-3.5 py-1 text-[0.95rem] transition-colors hover:border-transparent hover:bg-tone hover:text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Band>
    </section>
  )
}
