import { site } from '../config/site'
import { testimonials } from '../data/content'
import Reveal from '../components/Reveal'

/** Shown instead of testimonials while no genuine ones exist. */
export default function Partnership() {
  if (site.features.showTestimonials && testimonials.length > 0) return null
  return (
    <section className="bg-white py-16 sm:py-20" aria-label="Our approach to partnerships">
      <Reveal className="container-page">
        <p className="mx-auto max-w-3xl text-center text-2xl font-bold leading-snug tracking-tight text-midnight sm:text-3xl">
          Building meaningful partnerships through thoughtful work and transparent collaboration.
        </p>
      </Reveal>
    </section>
  )
}
