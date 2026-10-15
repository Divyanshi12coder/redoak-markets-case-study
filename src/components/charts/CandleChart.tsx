import { useMemo, useRef, useState, type PointerEvent } from 'react'
import { makeSeries, sma, toPath } from '../../data/market'

const W = 640
const H = 250

/** Compact candlestick chart with SMA overlay and per-candle readout. */
export function CandleChart({ seed }: { seed: number }) {
  const [hover, setHover] = useState<number | null>(null)
  const ref = useRef<SVGSVGElement>(null)
  const { c, sm, lo, hi } = useMemo(() => {
    const bars = makeSeries(64, seed)
    const cs = bars.map((b, i) => {
      const o = i === 0 ? b.close - 0.5 : bars[i - 1].close
      return { o, c: b.close, h: Math.max(o, b.close, b.high - 0.4), l: Math.min(o, b.close, b.low + 0.4) }
    })
    return {
      c: cs,
      sm: sma(bars.map((b) => b.close), 10),
      lo: Math.min(...cs.map((k) => k.l)) - 1,
      hi: Math.max(...cs.map((k) => k.h)) + 1,
    }
  }, [seed])
  const n = c.length
  const x = (i: number) => 14 + (i / (n - 1)) * (W - 28)
  const y = (v: number) => 10 + (1 - (v - lo) / (hi - lo)) * (H - 20)
  const move = (e: PointerEvent<SVGSVGElement>) => {
    const r = ref.current!.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * W
    setHover(Math.max(0, Math.min(n - 1, Math.round(((px - 14) / (W - 28)) * (n - 1)))))
  }
  const k = hover !== null ? c[hover] : null
  return (
    <div>
      <div className="mb-1 h-4 font-mono text-[10px] text-bone/50" aria-live="off">
        {k ? `O ${k.o.toFixed(2)}  H ${k.h.toFixed(2)}  L ${k.l.toFixed(2)}  C ${k.c.toFixed(2)}` : 'Hover chart for candle values · representative data'}
      </div>
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full touch-pan-y" role="img" aria-label="Representative candlestick chart with 10-period moving average" onPointerMove={move} onPointerLeave={() => setHover(null)}>
        {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2={W} y1={10 + g * (H - 20)} y2={10 + g * (H - 20)} stroke="rgba(246,242,236,0.06)" />)}
        {c.map((k2, i) => {
          const col = k2.c >= k2.o ? '#3f9468' : '#c2334a'
          return (
            <g key={i} opacity={hover === null || hover === i ? 1 : 0.55}>
              <line x1={x(i)} x2={x(i)} y1={y(k2.h)} y2={y(k2.l)} stroke={col} />
              <rect x={x(i) - 3.6} width="7.2" y={Math.min(y(k2.o), y(k2.c))} height={Math.max(1.5, Math.abs(y(k2.o) - y(k2.c)))} fill={col} />
            </g>
          )
        })}
        <path d={toPath(sm, x, y)} fill="none" stroke="#e8c27a" strokeWidth="1.5" />
        {hover !== null && <line x1={x(hover)} x2={x(hover)} y1="0" y2={H} stroke="rgba(246,242,236,0.3)" strokeDasharray="3 3" />}
      </svg>
    </div>
  )
}
