import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'
import { makeSeries, toPath, sma } from '../../data/market'

const TICKERS = ['AAPL', 'MSFT', 'NVDA', 'AMZN', 'GOOGL', 'META', 'TSLA', 'SPY', 'QQQ', 'RSI 58.2', 'MACD +0.34', 'ATR 2.1', 'REGIME · NEUTRAL', 'Z-SCORE 3.1']

/** Animated financial scene: grid, glowing line, candlesticks, moving points, ticker labels. */
export function HeroBackdrop() {
  const reduce = useReducedMotion()
  const { line, avg, candles } = useMemo(() => {
    const s = makeSeries(90, 21)
    const closes = s.map((b) => b.close)
    const lo = Math.min(...s.map((b) => b.low))
    const hi = Math.max(...s.map((b) => b.high))
    const x = (i: number) => (i / 89) * 1200
    const y = (v: number) => 520 - ((v - lo) / (hi - lo)) * 330
    return {
      line: toPath(closes, x, y),
      avg: toPath(sma(closes, 12), x, y),
      candles: s.filter((_, i) => i % 3 === 0).map((b, k, arr) => {
        const prev = k === 0 ? b.close : arr[k - 1].close
        return { x: x(b.i), up: b.close >= prev, hi: y(b.high), lo: y(b.low), top: y(Math.max(b.close, prev)), h: Math.max(3, Math.abs(y(b.close) - y(prev))) }
      }),
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(155,28,46,0.35),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(31,90,61,0.28),transparent_55%)]" />
      <div className="grid-bg absolute inset-0" />
      <svg className="absolute bottom-0 left-0 h-[52%] w-full sm:h-[60%]" viewBox="0 0 1200 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="hero-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c2334a" stopOpacity="0.28" />
            <stop offset="1" stopColor="#c2334a" stopOpacity="0" />
          </linearGradient>
          <filter id="hero-glow"><feGaussianBlur stdDeviation="5" /></filter>
        </defs>
        {candles.map((c, i) => (
          <motion.g key={i} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 0.6 + i * 0.03, duration: 0.6 }} stroke={c.up ? '#3f9468' : '#9b1c2e'} fill={c.up ? '#3f9468' : '#9b1c2e'}>
            <line x1={c.x} x2={c.x} y1={c.hi} y2={c.lo} strokeWidth="1" />
            <rect x={c.x - 5} y={c.top} width="10" height={c.h} />
          </motion.g>
        ))}
        <path d={`${line}L1200,600L0,600Z`} fill="url(#hero-fill)" />
        <motion.path d={line} fill="none" stroke="#e0546b" strokeWidth="6" opacity="0.5" filter="url(#hero-glow)" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: 'easeInOut' }} />
        <motion.path d={line} fill="none" stroke="#f6f2ec" strokeWidth="2" strokeLinejoin="round" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: 'easeInOut' }} />
        <path d={avg} fill="none" stroke="#3f9468" strokeWidth="1.6" strokeDasharray="5 6" className="flow-dash" />
        {!reduce && (
          <circle r="5" fill="#fff">
            <animateMotion dur="9s" repeatCount="indefinite" path={line} />
          </circle>
        )}
      </svg>

      <div className="absolute inset-x-0 bottom-4 hidden overflow-hidden opacity-40 md:block">
        <div className="ticker-track flex w-max gap-10 font-mono text-[11px] tracking-widest text-bone/60">
          {[...TICKERS, ...TICKERS].map((t, i) => (
            <span key={i} className="whitespace-nowrap">{t}</span>
          ))}
        </div>
      </div>

      <div className="float-y glass absolute right-[7%] top-[26%] hidden rounded-xl px-4 py-3 xl:block">
        <p className="eyebrow text-bone/40">RSI · demo</p>
        <p className="font-mono text-xl text-forest-light">58.2</p>
      </div>
      <div className="float-y glass absolute right-[22%] top-[58%] hidden rounded-xl px-4 py-3 xl:block" style={{ animationDelay: '-3s' }}>
        <p className="eyebrow text-bone/40">Regime · demo</p>
        <p className="font-mono text-sm text-bone">NEUTRAL</p>
      </div>
    </div>
  )
}
