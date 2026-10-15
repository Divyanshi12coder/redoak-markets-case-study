import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Database, EyeOff, Layers, Radio, ScanSearch, UserX } from 'lucide-react'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { LogoMark } from '../ui/Logo'
import { chapter } from '../../data/content'

const PAIN = [
  { t: 'Too much market data', d: 'Thousands of tickers, endless bars, no obvious starting point.', icon: Database, from: { x: -60, y: -40, r: -6 } },
  { t: 'Fragmented indicators', d: 'Every indicator lives in a different tool, on a different scale.', icon: Layers, from: { x: 0, y: -60, r: 4 } },
  { t: 'Difficult technical analysis', d: 'Reading RSI, MACD and bands together takes practice.', icon: ScanSearch, from: { x: 60, y: -30, r: 7 } },
  { t: 'Noisy signals', d: 'Single indicators fire constantly and often disagree.', icon: Radio, from: { x: -50, y: 40, r: 5 } },
  { t: 'Hard-to-interpret patterns', d: 'A pattern without context is just a shape on a chart.', icon: EyeOff, from: { x: 0, y: 55, r: -4 } },
  { t: 'Limited personalised context', d: 'Generic dashboards ignore the stocks you actually follow.', icon: UserX, from: { x: 55, y: 45, r: -7 } },
]

export function Problem() {
  const reduce = useReducedMotion()
  return (
    <Section
      id="problem"
      tone="light"
      eyebrow={chapter(1)}
      title={<>Markets generate data faster than <em className="text-crimson">people can interpret it.</em></>}
      lead="The raw material is abundant. What is scarce is context — knowing what a reading means, how unusual it is, and how it fits with everything else."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PAIN.map((p, i) => {
          const Icon = p.icon
          return (
            <motion.div
              key={p.t}
              initial={reduce ? false : { opacity: 0, x: p.from.x * 3, y: p.from.y * 3, rotate: p.from.r * 2, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1.1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl border border-wine/10 bg-white p-6 transition-shadow hover:shadow-[0_18px_40px_-18px_rgba(110,15,30,0.4)]"
            >
              <Icon size={22} className="text-crimson transition-transform group-hover:-translate-y-0.5 group-hover:scale-110" aria-hidden="true" />
              <h3 className="font-display mt-5 text-xl">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{p.d}</p>
            </motion.div>
          )
        })}
      </div>

      <Reveal className="mt-10 flex flex-col items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-wine/20 text-crimson"><ArrowDown size={20} aria-hidden="true" /></span>
        <div className="flex w-full max-w-3xl flex-col items-center gap-4 rounded-3xl bg-burgundy p-8 text-center text-bone shadow-soft sm:flex-row sm:text-left">
          <LogoMark size={64} />
          <div>
            <p className="eyebrow text-crimson-light">The convergence</p>
            <p className="font-display mt-1 text-2xl sm:text-3xl">RedOak Markets brings the fragments into one readable view.</p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
