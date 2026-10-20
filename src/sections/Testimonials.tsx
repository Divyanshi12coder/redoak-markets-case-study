import { site } from '../config/site'
import { testimonials } from '../data/content'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

/** Hidden unless site.features.showTestimonials is true AND genuine testimonials exist. */
export default function Testimonials() {
  if (!site.features.showTestimonials || testimonials.length === 0) return null
  return (
    <section className="section-pad bg-white" aria-labelledby="testimonials-title">
      <div className="container-page">
        <SectionHeading id="testimonials-title" eyebrow="Kind Words" title="What Clients Say" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="card h-full p-7">
                <blockquote className="leading-relaxed text-midnight/80">“{t.quote}”</blockquote>
                <figcaption className="mt-5 text-sm font-bold">
                  {t.name} <span className="font-medium text-midnight/55">· {t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
