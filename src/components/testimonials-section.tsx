import { CodeXmlIcon, PenToolIcon, UsersIcon } from 'lucide-react'
import { Band, Reveal, SectionTitle } from '@/components/frame'
import { content, type Testimonial, type Tone } from '@/lib/content'

const TONES: Tone[] = ['pink', 'sky', 'peach', 'lime']

// Quotes are attributed by role, not by name or photo, so the role gets the badge.
const RoleBadge = ({ role }: { role: string }) => {
  const Icon = /design/i.test(role) ? PenToolIcon : /manager/i.test(role) ? UsersIcon : CodeXmlIcon
  return (
    <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/70 shadow-sm">
      <Icon className="size-6" />
    </span>
  )
}

const QuoteCard = ({ testimonial, tone }: { testimonial: Testimonial; tone: Tone }) => (
  <figure data-tone={tone} className="mesh grain flex flex-col gap-5 p-6">
    <figcaption className="flex items-center gap-4">
      <RoleBadge role={testimonial.role} />
      <span>
        <span className="block font-heading text-2xl leading-tight tracking-[-0.01em]">
          {testimonial.name ?? testimonial.role}
        </span>
        <span className="block text-sm opacity-80">
          {testimonial.name ? `${testimonial.role} at ${testimonial.org}` : testimonial.org}
        </span>
      </span>
    </figcaption>
    <blockquote className="leading-relaxed text-pretty">{testimonial.quote}</blockquote>
  </figure>
)

export const TestimonialsSection = () => (
  <section aria-labelledby="testimonials-heading" className="relative isolate overflow-hidden">
    <div
      aria-hidden
      className="absolute inset-x-0 top-24 -z-10 h-[34rem] bg-[linear-gradient(100deg,var(--pink),var(--band))] opacity-80 [clip-path:polygon(0_0,100%_38%,100%_100%,0_62%)] dark:opacity-30"
    />
    <SectionTitle id="testimonials-heading">A few kind words from colleagues</SectionTitle>
    <Band className="p-3 sm:p-7">
      <ul className="columns-1 gap-7 md:columns-2 lg:columns-3">
        {content.testimonials.map((testimonial, index) => (
          <li key={testimonial.quote} className="mb-7 break-inside-avoid last:mb-0">
            <Reveal delay={(index % 3) * 0.08}>
              <QuoteCard testimonial={testimonial} tone={TONES[index % TONES.length]} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Band>
  </section>
)
