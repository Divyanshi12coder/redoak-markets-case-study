import { ChevronRight, Target } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { funnel, objectives } from '../data/content'

export default function Results() {
  return (
    <section className="on-dark section-pad bg-charcoal" aria-labelledby="results-title">
      <div className="container-page">
        <SectionHeading id="results-title" dark eyebrow="Measuring Progress" title="Outcomes We Aim to Support, and How We Measure Them.">
          We don’t publish made-up numbers. Instead, here is the framework we use to connect marketing activity to business progress.
        </SectionHeading>

        <Reveal className="mt-14">
          <ol className="grid gap-3 md:grid-cols-5" aria-label="Measurement framework">
            {funnel.map((f, i) => (
              <li key={f.label} className="relative">
                <div className="h-full rounded-2xl border border-white/10 bg-midnight p-5 transition-colors duration-300 hover:border-emerald/50">
                  <span className="text-xs font-bold text-emerald">0{i + 1}</span>
                  <h3 className="mt-2 text-lg text-white">{f.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-grey-cool">{f.hint}</p>
                </div>
                {i < funnel.length - 1 && (
                  <ChevronRight className="absolute -right-3.5 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-emerald md:block" aria-hidden />
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h3 className="text-lg text-white">What our work aims to improve</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {objectives.map((o) => (
                <li key={o} className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-grey-cool">
                  <Target className="h-4 w-4 shrink-0 text-emerald" aria-hidden /> {o}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-white/5 p-6 leading-relaxed text-grey-cool">
              <p className="font-bold text-white">Targets are agreed, not promised.</p>
              <p className="mt-2">
                Specific goals are agreed with each client after discovery. Actual results depend on the business, offer, audience and campaign, and we never guarantee rankings, traffic or revenue.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
