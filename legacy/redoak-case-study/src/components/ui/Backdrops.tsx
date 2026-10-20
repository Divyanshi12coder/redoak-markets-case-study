import { useMemo } from 'react'

/** Faint candlestick field, seeded so it is stable across renders. */
export function CandleField({ className = '' }: { className?: string }) {
  const candles = useMemo(() => {
    let s = 3
    const r = () => (s = (s * 16807) % 2147483647) / 2147483647
    let y = 120
    return Array.from({ length: 48 }, (_, i) => {
      const o = y
      const c = y + (r() - 0.46) * 22
      y = c
      return { x: i * 26 + 8, o, c, h: Math.max(o, c) + r() * 12, l: Math.min(o, c) - r() * 12 }
    })
  }, [])
  return (
    <svg className={className} viewBox="0 0 1260 240" preserveAspectRatio="none" aria-hidden="true">
      {candles.map((k, i) => {
        const col = k.c >= k.o ? '#3f9468' : '#c2334a'
        return (
          <g key={i} stroke={col} fill={col} opacity=".55">
            <line x1={k.x + 6} x2={k.x + 6} y1={k.h} y2={k.l} strokeWidth="1" />
            <rect x={k.x} width="12" y={Math.min(k.o, k.c)} height={Math.max(2, Math.abs(k.c - k.o))} />
          </g>
        )
      })}
    </svg>
  )
}

/** Abstract oak-branch geometry. */
export function BranchGeometry({ className = '' }: { className?: string }) {
  const nodes = [[80, 190], [120, 170], [45, 185], [90, 135], [285, 120], [320, 85], [335, 145], [370, 150], [200, 210]]
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M200 400V210M200 300l-70-60M200 260l80-70M130 240l-50-50M130 240l-10-70M280 190l55-45M280 190l5-70M80 190l-35-5M120 170l-30-35M285 120l35-35M335 145l35 5" />
      {nodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="currentColor" />)}
      <circle cx="200" cy="200" r="150" strokeDasharray="2 6" opacity=".5" />
    </svg>
  )
}

/** Tiny drifting data particles (CSS animation, few nodes). */
export function Particles({ count = 18 }: { count?: number }) {
  const dots = useMemo(
    () => Array.from({ length: count }, (_, i) => ({ left: (i * 53) % 100, top: (i * 37) % 100, d: 6 + (i % 5) * 2, s: 2 + (i % 3) })),
    [count],
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {dots.map((p, i) => (
        <span
          key={i}
          className="float-y absolute rounded-full bg-crimson-light/50"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.s, height: p.s, animationDuration: `${p.d}s`, animationDelay: `${-i}s` }}
        />
      ))}
    </div>
  )
}
