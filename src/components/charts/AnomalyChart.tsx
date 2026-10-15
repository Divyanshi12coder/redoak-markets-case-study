import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { makeSeries, toPath } from '../../data/market'
import { IllustrativeTag } from '../ui/Tag'

const W = 900
const PH = 240
const VH = 70
const H = PH + VH + 20

function zscores(v: number[], win = 20) {
  return v.map((_, i) => {
    if (i < win) return 0
    const w = v.slice(i - win, i)
    const m = w.reduce((a, b) => a + b, 0) / win
    const sd = Math.sqrt(w.reduce((a, b) => a + (b - m) ** 2, 0) / win) || 1
    return (v[i] - m) / sd
  })
}

export function AnomalyChart() {
  const reduce = useReducedMotion()
  const bars = useMemo(() => makeSeries(160, 7), [])
  const calc = useMemo(() => {
    const closes = bars.map((b) => b.close)
    const rets = closes.map((c, i) => (i === 0 ? 0 : c - closes[i - 1]))
    const zr = zscores(rets)
    const zv = zscores(bars.map((b) => b.volume))
    const flags = bars
      .map((_, i) => {
        const pz = Math.abs(zr[i]), vz = zv[i]
        if (pz < 3 && vz < 3) return null
        const kind = pz >= 3 && vz >= 3 ? 'Price + volume spike' : pz >= 3 ? 'Unusual price movement' : 'Volume anomaly'
        return { i, kind, pz, vz }
      })
      .filter((f): f is { i: number; kind: string; pz: number; vz: number } => f !== null)
    return { closes, flags }
  }, [bars])

  const [active, setActive] = useState<number | null>(null)
  const n = bars.length
  const x = (i: number) => 10 + (i / (n - 1)) * (W - 20)
  const lo = Math.min(...calc.closes) - 4
  const hi = Math.max(...calc.closes) + 4
  const y = (v: number) => 10 + (1 - (v - lo) / (hi - lo)) * (PH - 20)
  const vmax = Math.max(...bars.map((b) => b.volume))
  const flagSet = new Set(calc.flags.map((f) => f.i))
  const sel = calc.flags.find((f) => f.i === active)

  return (
    <div className="glass relative rounded-3xl p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-4 font-mono text-[11px] text-bone/60">
          <span className="inline-flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-bone/70" /> Normal behaviour</span>
          <span className="inline-flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-crimson-light" /> Flagged (|z| ≥ 3)</span>
          <span className="inline-flex items-center gap-2"><i className="h-2 w-2 bg-forest-light/70" /> Volume</span>
        </div>
        <IllustrativeTag>Representative demo data — not live</IllustrativeTag>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Representative price and volume chart with ${calc.flags.length} statistically unusual points highlighted. Focus a highlighted point for details.`}>
          {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="10" x2={W - 10} y1={10 + g * (PH - 20)} y2={10 + g * (PH - 20)} stroke="rgba(246,242,236,0.06)" />)}
          <motion.path d={toPath(calc.closes, x, y)} fill="none" stroke="rgba(246,242,236,0.8)" strokeWidth="1.8" strokeLinejoin="round" initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8 }} />
          {bars.map((b, i) => (
            <rect key={i} x={x(i) - 1.8} width="3.6" y={PH + 10 + VH - (b.volume / vmax) * VH} height={(b.volume / vmax) * VH} fill={flagSet.has(i) ? 'rgba(194,51,74,0.85)' : 'rgba(63,148,104,0.45)'} />
          ))}
          {calc.flags.map((f) => (
            <g key={f.i}>
              {active === f.i && <line x1={x(f.i)} x2={x(f.i)} y1="0" y2={H} stroke="rgba(224,84,107,0.5)" strokeDasharray="3 3" />}
              <circle cx={x(f.i)} cy={y(calc.closes[f.i])} r="12" fill="rgba(194,51,74,0.15)" className={reduce ? '' : 'pulse-ring'} style={{ transformOrigin: `${x(f.i)}px ${y(calc.closes[f.i])}px` }} />
              <circle
                cx={x(f.i)}
                cy={y(calc.closes[f.i])}
                r={active === f.i ? 8 : 6}
                fill="#c2334a"
                stroke="#f6f2ec"
                strokeWidth="2"
                tabIndex={0}
                role="button"
                aria-label={`Anomaly at bar ${f.i}: ${f.kind}`}
                className="cursor-pointer outline-none transition-all focus-visible:stroke-[4]"
                onPointerEnter={() => setActive(f.i)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(f.i)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(f.i)}
              />
            </g>
          ))}
        </svg>

        <AnimatePresence>
          {sel && (
            <motion.div
              key={sel.i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className="absolute z-10 w-60 rounded-xl border border-crimson-light/50 p-4 shadow-soft"
              style={{ left: `clamp(0%, ${(x(sel.i) / W) * 100 - 12}%, 62%)`, top: `${Math.max(2, (y(calc.closes[sel.i]) / H) * 100 + 8)}%`, background: 'rgba(20,10,13,0.94)' }}
            >
              <p className="flex items-center gap-2 text-sm font-medium text-white"><AlertTriangle size={14} className="text-crimson-light" aria-hidden="true" /> Unusual movement detected</p>
              <p className="mt-1 text-xs text-bone/70">{sel.kind}</p>
              <p className="mt-2 font-mono text-[11px] text-bone/50">price z {sel.pz.toFixed(1)} · volume z {sel.vz.toFixed(1)}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-bone/60">
        Hover or focus a highlighted point. The system flags statistically unusual behaviour — measured against a rolling baseline — for further investigation. A flag is a prompt to look closer, not a verdict.
      </p>
    </div>
  )
}
