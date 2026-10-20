import { motion, useReducedMotion } from 'framer-motion'
import { Brain, Eye, LineChart } from 'lucide-react'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { TiltCard } from '../ui/TiltCard'
import { Orbiter } from '../orbiter/Orbiter'
import { CHAPTERS, chapter } from '../../data/content'

const CARDS = [
  { n: '01', title: 'Understand', text: 'Turn raw market data into readable signals — charts, ranges and a rule-based signal meter that shows which conditions fired.', icon: Eye },
  { n: '02', title: 'Analyze', text: 'Combine technical indicators and quantitative features into a consistent, causal view of each stock.', icon: LineChart },
  { n: '03', title: 'Interpret', text: 'Use ML and AI-assisted analysis to provide context: regime probabilities, anomaly flags and plain-language summaries.', icon: Brain },
]

export function Overview() {
  const reduce = useReducedMotion()
  return (
    <Section
      id="overview"
      eyebrow={chapter(2)}
      title={<>Market intelligence, <em className="text-gradient-crimson">without the noise.</em></>}
      lead="RedOak Markets is an educational stock-analysis platform: technical indicators, machine-learning regime classification, anomaly detection and an AI analyst called Dia — built to explain the market, not to predict it."
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        <Reveal>
          <p className="max-w-lg text-bone/60 leading-relaxed">
            Hover or focus any node to see how the system is wired. Every orbit is a real layer of the application — from the data provider at the centre of the stack to the AI analyst that translates the numbers.
          </p>
          <ol className="mt-8 grid gap-x-6 gap-y-2 sm:grid-cols-2" aria-label="Case study chapters">
            {CHAPTERS.map((c, i) => (
              <li key={c} className="flex items-baseline gap-3 border-b border-white/5 py-2 text-sm text-bone/55">
                <span className="font-mono text-[11px] text-crimson-light">{String(i + 1).padStart(2, '0')}</span>{c}
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={0.1}><Orbiter /></Reveal>
      </div>

      <div className="mt-24 grid gap-5 md:grid-cols-3">
        {CARDS.map((c, i) => {
          const Icon = c.icon
          return (
            <Reveal key={c.n} delay={i * 0.1}>
              <TiltCard className="h-full p-7">
                <div className="flex items-start justify-between">
                  <motion.span whileHover={reduce ? undefined : { rotate: -8, scale: 1.12 }} className="flex h-12 w-12 items-center justify-center rounded-xl border border-crimson-light/40 bg-crimson/20 text-crimson-light">
                    <Icon size={22} aria-hidden="true" />
                  </motion.span>
                  <span className="font-mono text-xs text-bone/30">{c.n}</span>
                </div>
                <h3 className="font-display mt-8 text-3xl">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/60">{c.text}</p>
                <div className="mt-6 h-px w-full origin-left scale-x-[0.18] bg-gradient-to-r from-crimson-light to-transparent transition-transform duration-700 group-hover:scale-x-100" aria-hidden="true" />
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
