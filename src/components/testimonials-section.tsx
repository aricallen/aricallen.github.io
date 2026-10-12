import { QuoteIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { content, type Testimonial } from '@/lib/content'

const attribution = ({ name, role, org }: Testimonial) => [name, role, org].filter(Boolean).join(', ')

export const TestimonialsSection = () => (
  <section aria-labelledby="testimonials-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-10"
    >
      <p className="mb-2 font-mono text-sm text-primary">// kind words</p>
      <h2 id="testimonials-heading" className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        What colleagues say
      </h2>
    </motion.div>

    <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
      {content.testimonials.map((testimonial, index) => (
        <motion.li
          key={testimonial.quote}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 break-inside-avoid"
        >
          <figure className="flex flex-col gap-4 rounded-2xl bg-card p-6 ring-1 ring-foreground/10">
            <QuoteIcon aria-hidden className="size-5 text-primary" />
            <blockquote className="leading-relaxed text-pretty">{testimonial.quote}</blockquote>
            <figcaption className="font-mono text-xs tracking-wide text-muted-foreground">
              — {attribution(testimonial)}
            </figcaption>
          </figure>
        </motion.li>
      ))}
    </ul>
  </section>
)
