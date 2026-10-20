import { Brain, CheckCircle2, Layers, LayoutDashboard, LineChart, Puzzle, type LucideIcon } from 'lucide-react'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { chapter } from '../../data/content'

const OUTCOMES: { t: string; d: string; icon: LucideIcon }[] = [
  { t: 'Unified market analysis', d: 'Charts, indicators, regime, anomalies and commentary in one place.', icon: Layers },
  { t: 'Interactive technical intelligence', d: 'Overlay and oscillator indicators with candlestick, line and area charts.', icon: LineChart },
  { t: 'Explainable quantitative signals', d: 'A rule-based meter shows exactly which conditions fired.', icon: CheckCircle2 },
  { t: 'Modular ML pipeline', d: 'Causal features, walk-forward validation and a baseline comparison.', icon: Puzzle },
  { t: 'AI-assisted interpretation', d: 'Dia explains structured facts and rejects fabricated numbers.', icon: Brain },
  { t: 'Responsive financial interface', d: 'A dense workspace that reflows from desktop to mobile.', icon: LayoutDashboard },
]

export function Results() {
  return (
    <Section
      id="results"
      tone="light"
      eyebrow={chapter(10)}
      title={<>Outcomes, <em className="text-crimson">stated plainly.</em></>}
      lead="Project outcomes are presented qualitatively because production usage metrics are not publicly available."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OUTCOMES.map((o, i) => {
          const Icon = o.icon
          return (
            <Reveal key={o.t} delay={(i % 3) * 0.07}>
              <div className="group h-full rounded-2xl border border-wine/10 bg-white p-6 transition-all hover:-translate-y-1 hover:border-crimson/40 hover:shadow-[0_18px_40px_-20px_rgba(110,15,30,0.45)]">
                <Icon size={22} className="text-crimson" aria-hidden="true" />
                <h3 className="font-display mt-5 text-xl">{o.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{o.d}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
