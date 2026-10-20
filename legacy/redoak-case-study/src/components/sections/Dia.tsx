import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ShieldAlert } from 'lucide-react'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { IllustrativeTag } from '../ui/Tag'
import { chapter } from '../../data/content'

const INSIGHTS = [
  { q: 'Momentum is strengthening.', facts: ['MACD histogram rising 3 sessions', 'Price above 20-day SMA', 'RSI 61 (rising)'] },
  { q: 'Volatility has increased.', facts: ['ATR above its 14-day average', 'Bollinger band width expanding', 'Return z-score 1.9σ'] },
  { q: 'RSI indicates elevated momentum conditions.', facts: ['RSI 72 (> 70 threshold)', 'Context: elevated is not a sell signal', 'Prior readings above 70 persisted'] },
  { q: 'Current signals suggest a mixed market regime.', facts: ['Trend signals: positive', 'Momentum signals: flat', 'Regime probabilities spread across classes'] },
]

export function Dia() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const cur = INSIGHTS[i]
  return (
    <Section
      id="dia"
      tone="dark"
      eyebrow={chapter(7)}
      title={<>Meet <em className="text-gradient-crimson">Dia.</em></>}
      lead="Dia is the AI-assisted analyst layer. It never invents numbers: it receives structured facts from the quantitative engine and turns them into plain language — templated by default, with an optional LLM whose output is checked against those facts."
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-[460px]" role="img" aria-label="Abstract intelligence visual: concentric analytical rings around a glowing core">
            <div className="absolute inset-[-10%] rounded-full bg-[radial-gradient(circle,rgba(155,28,46,0.3),transparent_65%)]" aria-hidden="true" />
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <radialGradient id="dia-core"><stop offset="0" stopColor="#f6f2ec" stopOpacity=".95" /><stop offset=".35" stopColor="#e0546b" /><stop offset="1" stopColor="#4a0e1a" /></radialGradient>
              </defs>
              {[88, 72, 56].map((r, k) => (
                <motion.g key={r} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} animate={reduce ? undefined : { rotate: k % 2 ? -360 : 360 }} transition={{ duration: 60 + k * 30, repeat: Infinity, ease: 'linear' }}>
                  <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(246,242,236,0.16)" strokeWidth=".5" strokeDasharray={k === 1 ? '1 3' : k === 2 ? '10 4' : undefined} />
                  {Array.from({ length: 6 + k * 2 }, (_, n) => {
                    const a = (n / (6 + k * 2)) * Math.PI * 2
                    const lit = (n + k) % 3 === 0
                    return <circle key={n} cx={100 + r * Math.cos(a)} cy={100 + r * Math.sin(a)} r={lit ? 2.4 : 1.2} fill={lit ? '#e0546b' : 'rgba(246,242,236,0.5)'} />
                  })}
                </motion.g>
              ))}
              {/* waveform ring */}
              <path d={Array.from({ length: 73 }, (_, n) => { const a = (n / 72) * Math.PI * 2; const r = 40 + Math.sin(n * 1.7 + i) * 3 + Math.sin(n * 0.5) * 2; return `${n ? 'L' : 'M'}${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}` }).join('') + 'Z'} fill="none" stroke="#c2334a" strokeWidth=".8" />
              <circle cx="100" cy="100" r="26" fill="url(#dia-core)" />
            </svg>
            <p className="absolute inset-x-0 bottom-[6%] text-center font-mono text-[10px] uppercase tracking-[0.3em] text-bone/45">Dia · analytical layer</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex items-center justify-between gap-3">
            <p className="eyebrow text-bone/50">Sample analytical cards</p>
            <IllustrativeTag>Illustrative examples</IllustrativeTag>
          </div>
          <div role="tablist" aria-label="Dia sample insights" className="mt-4 grid gap-3">
            {INSIGHTS.map((n, k) => (
              <button
                key={n.q}
                type="button"
                role="tab"
                id={`dia-tab-${k}`}
                aria-selected={i === k}
                aria-controls="dia-panel"
                onClick={() => setI(k)}
                onPointerEnter={() => setI(k)}
                className={`rounded-2xl border p-4 text-left font-display text-lg transition-all ${i === k ? 'border-crimson-light/60 bg-crimson/20 text-white' : 'glass text-bone/70 hover:text-white'}`}
              >
                “{n.q}”
              </button>
            ))}
          </div>
          <div id="dia-panel" role="tabpanel" aria-labelledby={`dia-tab-${i}`} className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="eyebrow mb-3 text-forest-light">Facts Dia was given</p>
            <ul className="space-y-1.5 font-mono text-xs text-bone/70">
              {cur.facts.map((f) => <li key={f}>→ {f}</li>)}
            </ul>
          </div>
          <p className="mt-6 flex gap-3 rounded-2xl border border-crimson-light/25 bg-crimson/10 p-4 text-sm leading-relaxed text-bone/75">
            <ShieldAlert size={18} className="mt-0.5 shrink-0 text-crimson-light" aria-hidden="true" />
            Dia interprets quantitative signals; it does not guarantee market outcomes or provide personalized financial advice.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
