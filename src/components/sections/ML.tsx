import { lazy, Suspense, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { IllustrativeTag } from '../ui/Tag'
import { chapter } from '../../data/content'
import { useInViewOnce } from '../../hooks/useInViewOnce'

const FeatureImportance = lazy(() => import('../charts/FeatureImportance'))

const STEPS = ['Feature Engineering', 'Time-Aware Validation', 'Model Training', 'Market Regime Classification', 'Anomaly Detection', 'Feature Importance']
const FEATURES = ['RSI', 'MACD', 'Volatility', 'Momentum', 'Volume', 'Moving-average distance', 'ATR']

const REGIMES = {
  BULLISH: { p: [58, 27, 15], c: '#3f9468', text: 'Quantitative signals lean positive. Probability is spread across classes — this is context, not a forecast.' },
  NEUTRAL: { p: [24, 52, 24], c: '#e8c27a', text: 'Signals are mixed. The classifier has no strong lean, which is itself useful information.' },
  BEARISH: { p: [16, 28, 56], c: '#c2334a', text: 'Quantitative signals lean negative. Again: probabilistic context, not certainty.' },
} as const
type R = keyof typeof REGIMES

function WalkForward() {
  const reduce = useReducedMotion()
  const [ref, seen] = useInViewOnce<HTMLDivElement>()
  const folds = [0, 1, 2, 3]
  return (
    <div ref={ref} className="space-y-3" role="img" aria-label="Walk-forward validation: four folds, each trains on an expanding window, skips an embargo gap, then tests on later data.">
      {folds.map((f) => {
        const train = 34 + f * 14
        return (
          <div key={f} className="flex items-center gap-3">
            <span className="w-12 font-mono text-[10px] text-bone/40">FOLD {f + 1}</span>
            <div className="flex h-6 flex-1 overflow-hidden rounded-md bg-white/5">
              <motion.div className="h-full bg-crimson" initial={reduce ? false : { width: 0 }} animate={{ width: seen ? `${train}%` : 0 }} transition={{ duration: 0.9, delay: f * 0.15 }} />
              <motion.div className="h-full bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.25)_0_2px,transparent_2px_5px)]" initial={reduce ? false : { width: 0 }} animate={{ width: seen ? '3%' : 0 }} transition={{ delay: 0.9 + f * 0.15 }} />
              <motion.div className="h-full bg-forest-light" initial={reduce ? false : { width: 0 }} animate={{ width: seen ? '14%' : 0 }} transition={{ duration: 0.7, delay: 1 + f * 0.15 }} />
            </div>
          </div>
        )
      })}
      <div className="flex flex-wrap gap-4 pt-1 font-mono text-[10px] text-bone/50">
        <span className="inline-flex items-center gap-1.5"><i className="h-2 w-3 bg-crimson" />train (expanding)</span>
        <span className="inline-flex items-center gap-1.5"><i className="h-2 w-3 bg-white/30" />embargo gap</span>
        <span className="inline-flex items-center gap-1.5"><i className="h-2 w-3 bg-forest-light" />test (future only)</span>
      </div>
    </div>
  )
}

export function ML() {
  const [regime, setRegime] = useState<R>('NEUTRAL')
  const cur = REGIMES[regime]
  const keys = Object.keys(REGIMES) as R[]

  return (
    <Section
      id="ml"
      eyebrow={chapter(6)}
      title={<>Machine learning that <em className="text-gradient-crimson">knows its limits.</em></>}
      lead="The ML layer classifies the current market regime — bullish, neutral or bearish — and reports class probabilities next to an honest baseline. It does not claim to see the future."
    >
      <Reveal>
        <ol className="mb-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-6" aria-label="ML pipeline">
          {STEPS.map((s, i) => (
            <li key={s} className="glass relative rounded-xl p-4">
              <span className="font-mono text-[10px] text-crimson-light">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-1 text-sm leading-snug">{s}</p>
              {i < STEPS.length - 1 && <span aria-hidden="true" className="absolute -right-2.5 top-1/2 z-10 hidden h-px w-5 bg-crimson-light lg:block" />}
            </li>
          ))}
        </ol>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="glass h-full rounded-3xl p-6 sm:p-8">
            <p className="eyebrow text-crimson-light">Feature engineering</p>
            <h3 className="font-display mt-2 text-2xl">22 scale-free, causal features</h3>
            <p className="mt-2 text-sm text-bone/60">Returns, volatility ratios, price/SMA ratios, RSI, normalised MACD, Bollinger %B and width, volume and ATR — computed with no look-ahead.</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Example features">
              {FEATURES.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -3 }}
                  className="rounded-full border border-crimson-light/35 bg-crimson/15 px-4 py-2 font-mono text-xs text-bone/90"
                >
                  {f}
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="eyebrow text-crimson-light">Time-aware validation</p>
              <p className="mb-5 mt-2 text-sm text-bone/60">Expanding-window walk-forward folds with an embargo gap, so the model is only ever tested on data that comes after what it trained on.</p>
              <WalkForward />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass h-full rounded-3xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow text-crimson-light">Market regime classifier</p>
                <h3 className="font-display mt-2 text-2xl">Regime classification</h3>
              </div>
              <IllustrativeTag>Illustrative</IllustrativeTag>
            </div>
            <div role="radiogroup" aria-label="Choose a regime to preview" className="mt-6 grid grid-cols-3 gap-2">
              {keys.map((k) => (
                <button
                  key={k}
                  type="button"
                  role="radio"
                  aria-checked={regime === k}
                  onClick={() => setRegime(k)}
                  className={`rounded-xl border px-2 py-3 font-mono text-[11px] tracking-widest transition-all ${regime === k ? 'text-white' : 'border-white/10 text-bone/50 hover:border-white/30'}`}
                  style={regime === k ? { borderColor: REGIMES[k].c, background: `${REGIMES[k].c}33` } : undefined}
                >
                  {k}
                </button>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              {keys.map((k, i) => (
                <div key={k} className="flex items-center gap-3 font-mono text-[11px] text-bone/60">
                  <span className="w-16">{k}</span>
                  <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/8"><span className="block h-full rounded-full transition-all duration-700" style={{ width: `${cur.p[i]}%`, background: REGIMES[k].c }} /></span>
                  <span className="w-9 text-right">{cur.p[i]}%</span>
                </div>
              ))}
            </div>
            <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-bone/70" aria-live="polite">{cur.text}</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-[10px] text-bone/45">
              <li>Random Forest · 150 trees</li><li>Max depth 5</li><li>Balanced class weights</li><li>4 walk-forward folds</li>
            </ul>
            <p className="mt-3 text-[11px] text-bone/35">Model parameters as documented in the application README.</p>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-6">
        <div className="glass rounded-3xl p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="eyebrow text-crimson-light">Feature importance</p>
              <h3 className="font-display mt-2 text-2xl">Which signals shape a classification</h3>
              <p className="mt-2 max-w-2xl text-sm text-bone/60">The application reports global impurity importance and per-prediction occlusion, so a regime label can be traced back to its drivers.</p>
            </div>
            <IllustrativeTag>Illustrative weights — not model output</IllustrativeTag>
          </div>
          <div className="mt-6">
            <Suspense fallback={<div className="h-72 animate-pulse rounded-xl bg-white/5" aria-label="Loading chart" />}>
              <FeatureImportance />
            </Suspense>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
