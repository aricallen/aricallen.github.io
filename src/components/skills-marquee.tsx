import { content } from '@/lib/content'

export const SkillsMarquee = () => {
  const skills = [...content.skills.expert, ...content.skills.experienced]

  return (
    <section aria-label="Technologies" className="relative overflow-hidden py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <ul className="animate-marquee flex w-max gap-3 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
        {[...skills, ...skills].map((skill, index) => (
          <li
            key={`${skill}-${index}`}
            aria-hidden={index >= skills.length || undefined}
            className="rounded-full border border-border/70 bg-card/60 px-4 py-1.5 font-mono text-sm whitespace-nowrap text-muted-foreground"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  )
}
