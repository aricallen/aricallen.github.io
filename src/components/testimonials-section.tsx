import { Section } from '@/components/section'
import { content, type Testimonial } from '@/lib/content'

const attribution = ({ name, role, org }: Testimonial) => [name, role, org].filter(Boolean).join(' // ')

export const TestimonialsSection = () => (
  <Section
    id="testimonials"
    index="03"
    label="Kind words"
    statement="I've been lucky to work with some incredibly talented people."
    intro={
      <p>
        Pulled from peer reviews and performance feedback. Attributed by role unless the person has agreed to be named.
      </p>
    }
  >
    <ol className="rule-t">
      {content.testimonials.map((testimonial, index) => (
        <li key={testimonial.quote} className="rule-b grid grid-cols-[2.5rem_1fr] gap-x-4 py-6">
          <span aria-hidden className="label pt-1.5 text-muted-foreground">
            {String(index + 1).padStart(2, '0')}
          </span>
          <figure className="flex flex-col gap-3">
            <blockquote className="font-serif text-xl leading-snug text-pretty sm:text-2xl">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="label text-muted-foreground">{attribution(testimonial)}</figcaption>
          </figure>
        </li>
      ))}
    </ol>
  </Section>
)
