import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { TiltCard } from '../ui/TiltCard'
import { chapter } from '../../data/content'

const DECISIONS = [
  { q: 'Why FastAPI?', a: 'Pydantic models validate every request and response, async I/O suits provider calls, and the OpenAPI schema keeps the typed frontend client honest. It also sits naturally beside pandas, NumPy and scikit-learn.' },
  { q: 'Why React + TypeScript?', a: 'Dense financial UI has a lot of state — tickers, ranges, indicator toggles. Types catch shape mismatches with the API at compile time, and TanStack Query handles caching and loading states.' },
  { q: 'Why technical indicators?', a: 'They are transparent, well understood and testable against hand-worked values. They give users an interpretable baseline and form the feature set the ML layer builds on.' },
  { q: 'Why time-aware validation?', a: 'Shuffled cross-validation leaks the future into training and flatters the score. Expanding-window walk-forward folds with an embargo gap only ever test on later data — and results are compared with a naive baseline.' },
  { q: 'Why anomaly detection?', a: 'Rolling z-scores are simple and explainable; Isolation Forest catches multi-feature oddities. Together they flag when behaviour is unusual enough to deserve a closer look, without pretending to know why.' },
  { q: 'Why separate AI interpretation from quantitative signals?', a: 'Numbers come from deterministic, tested code. Dia only phrases structured facts, and any LLM output that invents figures or predictions is rejected. The AI explains the evidence; it never replaces it.' },
]

export function Engineering() {
  return (
    <Section
      id="engineering"
      tone="light"
      eyebrow={chapter(9)}
      title={<>Decisions, <em className="text-crimson">and the reasons behind them.</em></>}
      lead="Six choices that shaped the product — each made to keep the system explainable, testable and honest."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {DECISIONS.map((d, i) => (
          <Reveal key={d.q} delay={(i % 3) * 0.08}>
            <TiltCard light className="h-full p-7" tilt={4}>
              <span className="font-mono text-xs text-crimson">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display mt-4 text-2xl leading-tight">{d.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/65">{d.a}</p>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
