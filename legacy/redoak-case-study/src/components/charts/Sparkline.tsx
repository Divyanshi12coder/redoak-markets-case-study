import { useMemo } from 'react'
import { makeSeries, toPath } from '../../data/market'

export function Sparkline({ seed, color, w = 96, h = 32, up = true }: { seed: number; color: string; w?: number; h?: number; up?: boolean }) {
  const d = useMemo(() => {
    const raw = makeSeries(40, seed).map((b) => b.close)
    const vals = up ? raw : raw.map((v) => 200 - v)
    const lo = Math.min(...vals)
    const hi = Math.max(...vals)
    return toPath(vals, (i) => (i / 39) * w, (v) => h - 2 - ((v - lo) / (hi - lo || 1)) * (h - 4))
  }, [seed, w, h, up])
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" className="shrink-0">
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}
