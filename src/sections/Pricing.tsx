import { Check } from 'lucide-react'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { packages } from '../data/content'
import { prefillService } from '../lib/prefill'

export default function Pricing() {
  return (
    <section className="section-pad" aria-labelledby="pricing-title">
      <div className="container-page">
        <SectionHeading id="pricing-title" eyebrow="Engagement Options" title="Let’s Find the Right Starting Point." align="center">
          Scope, pricing and timelines are agreed after a discovery conversation, so you only pay for what fits your goals.
        </SectionHeading>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <article
                className={`flex h-full flex-col rounded-2xl p-8 transition duration-300 hover:-translate-y-1.5 ${
                  p.featured ? 'on-dark bg-midnight text-white shadow-dark' : 'card hover:shadow-lift'
                }`}
              >
                <h3 className="text-2xl">{p.name}</h3>
                <p className={`mt-2 leading-relaxed ${p.featured ? 'text-grey-cool' : 'text-midnight/70'}`}>{p.audience}</p>
                <ul className="mt-6 space-y-3">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2.5">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.featured ? 'text-emerald' : 'text-emerald-deep'}`} aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Button href="#contact" variant={p.featured ? 'primary' : 'secondary'} arrow className="w-full" onNavigate={() => prefillService(p.interest)}>
                    Request a Proposal
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-midnight/60">
          Deliverables listed are typical examples and can be adjusted. Final scope, pricing and timelines are confirmed in a written proposal after discovery.
        </p>
      </div>
    </section>
  )
}
