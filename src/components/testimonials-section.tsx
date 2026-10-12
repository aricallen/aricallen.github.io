import { Reveal, SectionLabel, Slash, Statement } from '@/components/primitives'
import { content, type Testimonial } from '@/lib/content'
import { pad } from '@/lib/format'

const Attribution = ({ testimonial }: { testimonial: Testimonial }) => (
  <figcaption className="type-label text-muted-foreground">
    {testimonial.name && (
      <>
        {testimonial.name}
        <Slash />
      </>
    )}
    {testimonial.role}
    <Slash />
    {testimonial.org}
  </figcaption>
)

export const TestimonialsSection = () => {
  const [featured, ...rest] = content.testimonials

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="grid gap-x-6 gap-y-10 px-3 py-16 lg:py-20 lg:grid-cols-12"
    >
      <div className="lg:col-span-8 lg:col-start-3">
        <Reveal>
          <SectionLabel id="testimonials-heading" index="03" className="mb-6 text-center">
            Kind words
          </SectionLabel>
        </Reveal>
        <figure>
          <blockquote>
            <Statement text={`“${featured.quote}”`} className="text-[clamp(2.1rem,4.6vw,4.5rem)]" />
          </blockquote>
          <div className="mt-3 text-center">
            <Attribution testimonial={featured} />
          </div>
        </figure>
      </div>

      <ul className="grid gap-x-6 border-t border-border sm:grid-cols-2 lg:col-span-10 lg:col-start-2">
        {rest.map((testimonial, index) => (
          <li key={testimonial.quote} className="border-b border-border py-6 sm:odd:last:col-span-2">
            <Reveal delay={(index % 2) * 0.08}>
              <figure className="grid grid-cols-[2rem_1fr] gap-y-4">
                <span aria-hidden className="type-label pt-1.5 text-muted-foreground">
                  {pad(index + 2)}
                </span>
                <blockquote className="type-quote max-w-[38ch] text-2xl text-pretty sm:text-[1.7rem]">
                  “{testimonial.quote}”
                </blockquote>
                <div className="col-start-2">
                  <Attribution testimonial={testimonial} />
                </div>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
