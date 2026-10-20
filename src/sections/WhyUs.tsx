import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { whyUs } from '../data/content'

export default function WhyUs() {
  return (
    <section className="section-pad" aria-labelledby="why-title">
      <div className="container-page">
        <SectionHeading id="why-title" eyebrow="Why Growthora" title="Small Details. Smarter Decisions. Better Digital Experiences." />
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-midnight/10 bg-midnight/10 sm:grid-cols-2">
          {whyUs.map((w, i) => {
            const Icon = w.icon
            return (
              <Reveal key={w.title} delay={i * 0.06} className="bg-white">
                <div className="group h-full p-8 transition-colors duration-300 hover:bg-offwhite sm:p-10">
                  <Icon className="h-7 w-7 text-emerald-deep transition-transform duration-300 group-hover:scale-110" aria-hidden />
                  <h3 className="mt-6 text-xl">{w.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-midnight/70">{w.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
