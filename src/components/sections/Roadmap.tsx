import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { StatusTag } from '../ui/Tag'
import { chapter } from '../../data/content'

const PHASES = [
  { t: 'Live market data expansion', d: 'Broaden provider coverage, intraday granularity and resilience beyond the current demo and Twelve Data modes.' },
  { t: 'Advanced portfolio analytics', d: 'Move from single-stock analysis to holdings-level views: exposure, correlation and risk context.' },
  { t: 'Backtesting engine', d: 'Let users test rule-based signals on history — with costs, slippage and regime caveats made explicit.' },
  { t: 'More sophisticated ML models', d: 'Evaluate richer models against the existing baseline using the same walk-forward discipline.' },
  { t: 'Personalized research workflows', d: 'Notes, saved analyses and alerts tied to each user\'s watchlists.' },
  { t: 'Mobile experience', d: 'A touch-first interface designed specifically for small screens.' },
]

export function Roadmap() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  return (
    <Section
      id="roadmap"
      tone="green"
      eyebrow={chapter(12)}
      title={<>Where it goes <em className="text-gradient-crimson">next.</em></>}
      lead="Directions under consideration. None of these are implemented yet."
    >
      <Reveal>
        <div role="tablist" aria-label="Roadmap phases" className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <div aria-hidden="true" className="absolute left-0 right-0 top-[19px] hidden h-px bg-white/10 lg:block" />
          <motion.div aria-hidden="true" className="absolute left-0 top-[19px] hidden h-px origin-left bg-gradient-to-r from-crimson-light to-forest-light lg:block" style={{ width: '100%' }} animate={{ scaleX: (i + 0.5) / PHASES.length }} transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 20 }} />
          {PHASES.map((p, k) => (
            <button
              key={p.t}
              type="button"
              role="tab"
              aria-selected={i === k}
              aria-controls="roadmap-panel"
              id={`road-${k}`}
              onClick={() => setI(k)}
              onPointerEnter={() => setI(k)}
              className="group relative flex flex-col items-start gap-3 rounded-xl text-left"
            >
              <span className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border font-mono text-xs transition-all ${k <= i ? 'border-crimson-light bg-crimson text-white' : 'border-white/20 bg-forest-deep text-bone/50'} ${i === k ? 'scale-110 shadow-glow' : ''}`}>{String(k + 1).padStart(2, '0')}</span>
              <span className={`text-sm leading-snug transition-colors ${i === k ? 'text-white' : 'text-bone/50 group-hover:text-bone/80'}`}>
                <span className="eyebrow mb-1 block text-bone/35">Phase {String(k + 1).padStart(2, '0')}</span>{p.t}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      <div id="roadmap-panel" role="tabpanel" aria-labelledby={`road-${i}`} className="mt-12 min-h-[150px]">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="glass rounded-3xl p-7 sm:p-10">
            <StatusTag kind="planned" />
            <h3 className="font-display mt-4 text-3xl sm:text-4xl">{PHASES[i].t}</h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-bone/65">{PHASES[i].d}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  )
}
