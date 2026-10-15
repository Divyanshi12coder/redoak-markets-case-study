import { useMemo, useRef, useState, type PointerEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { atr, bollinger, ema, macd, makeSeries, rsi, sma, toPath } from '../../data/market'
import { IllustrativeTag } from '../ui/Tag'

export type IndKey = 'SMA' | 'EMA' | 'RSI' | 'MACD' | 'BB' | 'ATR'

export const INDICATORS: { key: IndKey; label: string; kind: 'overlay' | 'panel'; title: string; text: string; read: string }[] = [
  { key: 'SMA', label: 'SMA', kind: 'overlay', title: 'Simple Moving Average (20)', text: 'The arithmetic mean of the last 20 closes. It smooths noise so the underlying direction is easier to see.', read: 'Markers show where price crossed the average — a change in short-term trend context, not a guarantee.' },
  { key: 'EMA', label: 'EMA', kind: 'overlay', title: 'Exponential Moving Average (12 / 26)', text: 'Weights recent prices more heavily than an SMA, so it reacts faster. The 12/26 pair is the basis of MACD.', read: 'Markers show where the fast EMA crossed the slow EMA.' },
  { key: 'RSI', label: 'RSI', kind: 'panel', title: 'Relative Strength Index (14)', text: 'Bounded 0–100 momentum oscillator comparing average gains to average losses.', read: 'Shaded zones: above 70 reads as elevated momentum, below 30 as depressed momentum. Context, not a prediction.' },
  { key: 'MACD', label: 'MACD', kind: 'panel', title: 'MACD (12, 26, 9)', text: 'The gap between two EMAs, with a signal line and a histogram showing the difference between them.', read: 'Markers show histogram sign changes — momentum shifting direction.' },
  { key: 'BB', label: 'Bollinger', kind: 'overlay', title: 'Bollinger Bands (20, 2σ)', text: 'A moving average wrapped by bands two standard deviations away. Band width tracks volatility.', read: 'The shaded window is the narrowest band width — a volatility "squeeze".' },
  { key: 'ATR', label: 'ATR', kind: 'panel', title: 'Average True Range (14)', text: 'The average of true range — how far price typically travels per bar, including gaps.', read: 'The shaded window marks the highest-volatility stretch of this sample.' },
]

const W = 800
const PRICE_H = 260
const PANEL_H = 110
const PAD = { l: 8, r: 8, t: 14, b: 14 }

export function IndicatorChart() {
  const reduce = useReducedMotion()
  const bars = useMemo(() => makeSeries(160, 7), [])
  const data = useMemo(() => {
    const c = bars.map((b) => b.close)
    return { c, sma: sma(c, 20), e12: ema(c, 12), e26: ema(c, 26), rsi: rsi(c), macd: macd(c), bb: bollinger(c), atr: atr(bars) }
  }, [bars])

  const [on, setOn] = useState<Set<IndKey>>(new Set(['SMA', 'BB', 'RSI']))
  const [focus, setFocus] = useState<IndKey>('RSI')
  const [hover, setHover] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const panels = INDICATORS.filter((i) => i.kind === 'panel' && on.has(i.key)).map((i) => i.key)
  const H = PRICE_H + panels.length * PANEL_H
  const n = bars.length
  const x = (i: number) => PAD.l + (i / (n - 1)) * (W - PAD.l - PAD.r)

  const lo = Math.min(...bars.map((b) => b.low)) - 2
  const hi = Math.max(...bars.map((b) => b.high)) + 2
  const y = (v: number) => PAD.t + (1 - (v - lo) / (hi - lo)) * (PRICE_H - PAD.t - PAD.b)
  const priceLine = toPath(data.c, x, y)

  const toggle = (k: IndKey) => {
    setFocus(k)
    setOn((prev) => {
      const nx = new Set(prev)
      if (nx.has(k) && prev.size > 1 && focus === k) nx.delete(k)
      else nx.add(k)
      return nx
    })
  }

  // Highlights for the focused indicator
  const hl = useMemo(() => {
    const ranges: { a: number; b: number; col: string }[] = []
    const marks: number[] = []
    const runs = (test: (i: number) => boolean, col: string) => {
      let s: number | null = null
      for (let i = 0; i <= n; i++) {
        const t = i < n && test(i)
        if (t && s === null) s = i
        if (!t && s !== null) { ranges.push({ a: s, b: i - 1, col }); s = null }
      }
    }
    if (focus === 'SMA') data.c.forEach((v, i) => { const a = data.sma[i], p = data.sma[i - 1]; if (a !== null && p !== null && (data.c[i - 1] - p) * (v - a) < 0) marks.push(i) })
    if (focus === 'EMA') data.e12.forEach((v, i) => { const s = data.e26[i], ps = data.e26[i - 1], pf = data.e12[i - 1]; if (v !== null && s !== null && ps !== null && pf !== null && (pf - ps) * (v - s) < 0) marks.push(i) })
    if (focus === 'RSI') { runs((i) => (data.rsi[i] ?? 50) > 70, 'rgba(194,51,74,0.22)'); runs((i) => (data.rsi[i] ?? 50) < 30, 'rgba(63,148,104,0.25)') }
    if (focus === 'MACD') data.macd.hist.forEach((v, i) => { const p = data.macd.hist[i - 1]; if (v !== null && p !== null && p * v < 0) marks.push(i) })
    if (focus === 'BB') {
      let best = 1e9, at = 30
      data.bb.up.forEach((u, i) => { const l = data.bb.lo[i]; if (u !== null && l !== null && u - l < best) { best = u - l; at = i } })
      ranges.push({ a: Math.max(0, at - 6), b: Math.min(n - 1, at + 6), col: 'rgba(246,242,236,0.13)' })
    }
    if (focus === 'ATR') {
      let best = 0, at = 60
      data.atr.forEach((v, i) => { if (v !== null && v > best) { best = v; at = i } })
      ranges.push({ a: Math.max(0, at - 8), b: Math.min(n - 1, at + 8), col: 'rgba(194,51,74,0.2)' })
    }
    return { ranges, marks }
  }, [focus, data, n])

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const r = svgRef.current!.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * W
    setHover(Math.max(0, Math.min(n - 1, Math.round(((px - PAD.l) / (W - PAD.l - PAD.r)) * (n - 1)))))
  }

  const info = INDICATORS.find((i) => i.key === focus)!
  const h = hover ?? n - 1
  const fmt = (v: number | null | undefined, d = 2) => (v === null || v === undefined ? '—' : v.toFixed(d))

  const panelTop = (k: IndKey) => PRICE_H + panels.indexOf(k) * PANEL_H

  return (
    <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
      <div className="glass rounded-3xl p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div role="group" aria-label="Toggle indicators" className="flex flex-wrap gap-2">
            {INDICATORS.map((i) => {
              const active = on.has(i.key)
              return (
                <button
                  key={i.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle(i.key)}
                  className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-all ${active ? 'border-crimson-light bg-crimson/30 text-white' : 'border-white/15 text-bone/60 hover:border-white/40'} ${focus === i.key ? 'ring-1 ring-bone/60' : ''}`}
                >
                  {i.label}
                </button>
              )
            })}
          </div>
          <IllustrativeTag>Representative demo data — not live</IllustrativeTag>
        </div>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full touch-pan-y select-none"
          role="img"
          aria-label={`Representative price chart with ${[...on].join(', ')} shown. Focused indicator: ${info.title}.`}
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        >
          {[0.2, 0.4, 0.6, 0.8].map((g) => <line key={g} x1={PAD.l} x2={W - PAD.r} y1={PAD.t + g * (PRICE_H - PAD.t - PAD.b)} y2={PAD.t + g * (PRICE_H - PAD.t - PAD.b)} stroke="rgba(246,242,236,0.06)" />)}

          {hl.ranges.map((r, k) => <rect key={k} x={x(r.a)} width={Math.max(3, x(r.b) - x(r.a))} y={0} height={H} fill={r.col} />)}

          {on.has('BB') && data.bb.up.length > 0 && (
            <path d={`${toPath(data.bb.up, x, y)}${[...data.bb.lo].map((v, i) => [v, i] as const).reverse().filter(([v]) => v !== null).map(([v, i]) => `L${x(i).toFixed(1)},${y(v as number).toFixed(1)}`).join('')}Z`} fill="rgba(63,148,104,0.10)" stroke="none" />
          )}
          {on.has('BB') && <><path d={toPath(data.bb.up, x, y)} stroke="#3f9468" strokeWidth="1" fill="none" opacity=".8" /><path d={toPath(data.bb.lo, x, y)} stroke="#3f9468" strokeWidth="1" fill="none" opacity=".8" /></>}
          {on.has('SMA') && <path d={toPath(data.sma, x, y)} stroke="#e8c27a" strokeWidth="1.6" fill="none" />}
          {on.has('EMA') && <><path d={toPath(data.e12, x, y)} stroke="#e0546b" strokeWidth="1.5" fill="none" /><path d={toPath(data.e26, x, y)} stroke="#b8a9c9" strokeWidth="1.5" fill="none" strokeDasharray="4 3" /></>}

          <motion.path d={priceLine} fill="none" stroke="#f6f2ec" strokeWidth="2" strokeLinejoin="round" initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: 'easeInOut' }} />

          {hl.marks.map((i) => <circle key={i} cx={x(i)} cy={y(data.c[i])} r="5" fill="none" stroke="#e0546b" strokeWidth="2" />)}

          {panels.map((k) => {
            const top = panelTop(k)
            const ph = PANEL_H - 22
            const base = top + 14
            const label = INDICATORS.find((i) => i.key === k)!.label
            return (
              <g key={k}>
                <line x1={PAD.l} x2={W - PAD.r} y1={top} y2={top} stroke="rgba(246,242,236,0.12)" />
                <text x={PAD.l + 2} y={top + 12} fill="rgba(246,242,236,0.5)" fontSize="10" fontFamily="JetBrains Mono, monospace">{label}</text>
                {k === 'RSI' && (() => {
                  const ry = (v: number) => base + (1 - v / 100) * ph
                  return <>
                    <rect x={PAD.l} width={W - PAD.l - PAD.r} y={ry(70)} height={ry(30) - ry(70)} fill="rgba(246,242,236,0.04)" />
                    <line x1={PAD.l} x2={W - PAD.r} y1={ry(70)} y2={ry(70)} stroke="#c2334a" strokeDasharray="3 4" opacity=".6" />
                    <line x1={PAD.l} x2={W - PAD.r} y1={ry(30)} y2={ry(30)} stroke="#3f9468" strokeDasharray="3 4" opacity=".6" />
                    <path d={toPath(data.rsi, x, ry)} stroke="#e0546b" strokeWidth="1.6" fill="none" />
                  </>
                })()}
                {k === 'MACD' && (() => {
                  const vals = [...data.macd.line, ...data.macd.hist].filter((v): v is number => v !== null)
                  const m = Math.max(...vals.map(Math.abs)) || 1
                  const my = (v: number) => base + ph / 2 - (v / m) * (ph / 2)
                  return <>
                    {data.macd.hist.map((v, i) => v === null ? null : <rect key={i} x={x(i) - 1.6} width="3.2" y={Math.min(my(v), my(0))} height={Math.abs(my(v) - my(0))} fill={v >= 0 ? 'rgba(63,148,104,0.7)' : 'rgba(194,51,74,0.7)'} />)}
                    <path d={toPath(data.macd.line, x, my)} stroke="#f6f2ec" strokeWidth="1.3" fill="none" />
                    <path d={toPath(data.macd.signal, x, my)} stroke="#e8c27a" strokeWidth="1.3" fill="none" />
                  </>
                })()}
                {k === 'ATR' && (() => {
                  const vals = data.atr.filter((v): v is number => v !== null)
                  const mx = Math.max(...vals), mn = Math.min(...vals)
                  const ay = (v: number) => base + (1 - (v - mn) / (mx - mn || 1)) * ph
                  return <path d={toPath(data.atr, x, ay)} stroke="#e0546b" strokeWidth="1.6" fill="none" />
                })()}
              </g>
            )
          })}

          {hover !== null && (
            <g pointerEvents="none">
              <line x1={x(hover)} x2={x(hover)} y1={0} y2={H} stroke="rgba(246,242,236,0.35)" strokeDasharray="3 3" />
              <circle cx={x(hover)} cy={y(data.c[hover])} r="4.5" fill="#f6f2ec" stroke="#9b1c2e" strokeWidth="2" />
            </g>
          )}
        </svg>

        <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-[11px] text-bone/60 sm:grid-cols-4">
          <div><dt className="inline text-bone/35">Close </dt><dd className="inline text-bone">{fmt(data.c[h])}</dd></div>
          <div><dt className="inline text-bone/35">SMA20 </dt><dd className="inline text-bone">{fmt(data.sma[h])}</dd></div>
          <div><dt className="inline text-bone/35">RSI14 </dt><dd className="inline text-bone">{fmt(data.rsi[h], 1)}</dd></div>
          <div><dt className="inline text-bone/35">ATR14 </dt><dd className="inline text-bone">{fmt(data.atr[h])}</dd></div>
        </dl>
      </div>

      <motion.aside key={focus} initial={reduce ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} className="glass flex flex-col rounded-3xl p-6 sm:p-8" aria-live="polite">
        <p className="eyebrow text-crimson-light">Indicator focus</p>
        <h3 className="font-display mt-3 text-2xl sm:text-3xl">{info.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-bone/70">{info.text}</p>
        <div className="mt-5 rounded-xl border border-crimson-light/25 bg-crimson/10 p-4 text-sm leading-relaxed text-bone/80">
          <span className="eyebrow mb-1 block text-bone/50">Highlighted on chart</span>
          {info.read}
        </div>
        <p className="mt-auto pt-6 text-xs leading-relaxed text-bone/40">
          RedOak Markets presents indicators as context. In the application, a rule-based signal meter shows the exact conditions that fired.
        </p>
      </motion.aside>
    </div>
  )
}
