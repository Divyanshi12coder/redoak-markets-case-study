import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import { services } from '../data/services'

export default function Services() {
  return (
    <section id="services" className="section-pad" aria-labelledby="services-title">
      <div className="container-page">
        <SectionHeading id="services-title" eyebrow="Services" title="Everything Your Brand Needs to Grow.">
          From your first impression to your next customer, we help connect every part of your digital presence.
        </SectionHeading>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.08} className={i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
