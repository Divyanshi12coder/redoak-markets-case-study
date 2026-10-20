import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { chapter } from '../../data/content'

const LESSONS = [
  { t: 'Financial data needs careful validation', d: 'Gaps, bad bars and provider quirks quietly corrupt every indicator downstream. Validate at the boundary.' },
  { t: 'Indicators are contextual, not predictive guarantees', d: 'RSI above 70 describes momentum conditions; it does not promise a reversal. The UI should say so.' },
  { t: 'Time-aware ML validation matters', d: 'Random splits flatter a time-series model. Walk-forward folds plus a baseline keep the claims honest.' },
  { t: 'UX is critical for complex financial information', d: 'Hierarchy, labels and restraint decide whether dense data feels clear or overwhelming.' },
  { t: 'AI should interpret evidence, not replace it', d: 'Letting the model phrase structured facts — and rejecting invented numbers — keeps trust intact.' },
  { t: 'Fallback and demo modes improve reliability', d: 'A seeded demo provider made development, testing and public demos independent of API quotas.' },
]

export function Lessons() {
  return (
    <Section
      id="lessons"
      eyebrow={chapter(11)}
      title={<>What building it <em className="text-gradient-crimson">taught me.</em></>}
    >
      <div className="grid gap-5 md:grid-cols-2">
        {LESSONS.map((l, i) => (
          <Reveal key={l.t} delay={(i % 2) * 0.08}>
            <div className="glass group flex gap-5 rounded-2xl p-6 transition-colors hover:border-crimson-light/40">
              <span className="font-display text-4xl font-light text-crimson-light/60 transition-colors group-hover:text-crimson-light">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-display text-xl">{l.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone/60">{l.d}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
