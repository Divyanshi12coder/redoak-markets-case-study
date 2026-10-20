import { useState, type ReactNode } from 'react'
import { Activity, AlertTriangle, Bot, Search, Star } from 'lucide-react'
import { STOCKS, regimeColor } from '../../data/stocks'
import { CandleChart } from '../charts/CandleChart'
import { Sparkline } from '../charts/Sparkline'
import { LogoMark } from '../ui/Logo'
import { useElementWidth } from '../../hooks/useElementWidth'
import { usePointerGlow } from '../../hooks/usePointerGlow'

const INDEXES = [
  { t: 'SPY', v: '+0.42%', up: true },
  { t: 'QQQ', v: '+0.71%', up: true },
  { t: 'DIA', v: '-0.18%', up: false },
  { t: 'IWM', v: '+0.09%', up: true },
]

function Panel({ title, icon, children, className = '' }: { title: string; icon?: ReactNode; children: ReactNode; className?: string }) {
  const glow = usePointerGlow()
  return (
    <div
      onPointerMove={glow}
      className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition-colors hover:border-crimson-light/40 ${className}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: 'radial-gradient(240px circle at var(--mx,50%) var(--my,50%), rgba(194,51,74,0.14), transparent 70%)' }} />
      <h4 className="relative mb-2.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/50">{icon}{title}</h4>
      <div className="relative">{children}</div>
    </div>
  )
}

/** Product-style mockup. Layout adapts to its own container width, so it can be framed at fixed sizes. */
export function DashboardMock() {
  const [ref, width] = useElementWidth<HTMLDivElement>(1100)
  const layout = width >= 900 ? 'wide' : width >= 560 ? 'medium' : 'narrow'
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(STOCKS[2])
  const list = STOCKS.filter((s) => (s.t + s.name).toLowerCase().includes(q.trim().toLowerCase()))
  const col = regimeColor[sel.regime]
  const probs = sel.regime === 'BULLISH' ? [58, 27, 15] : sel.regime === 'NEUTRAL' ? [24, 52, 24] : [16, 28, 56]

  const watch = (
    <Panel title="Watchlist" icon={<Star size={11} aria-hidden="true" />}>
      <ul className="space-y-1" aria-label="Watchlist">
        {list.length === 0 && <li className="py-3 text-center text-xs text-bone/40">No match in demo watchlist</li>}
        {list.map((s) => (
          <li key={s.t}>
            <button
              type="button"
              onClick={() => setSel(s)}
              aria-pressed={sel.t === s.t}
              className={`flex w-full items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-left transition-colors ${sel.t === s.t ? 'border-crimson-light/50 bg-crimson/20' : 'border-transparent hover:bg-white/5'}`}
            >
              <span>
                <span className="block font-mono text-xs text-white">{s.t}</span>
                <span className="block text-[10px] text-bone/40">{s.regime.toLowerCase()}</span>
              </span>
              <Sparkline seed={s.seed} color={regimeColor[s.regime]} w={52} h={20} up={s.chg >= 0} />
              <span className={`font-mono text-[11px] ${s.chg >= 0 ? 'text-forest-light' : 'text-crimson-light'}`}>{s.chg >= 0 ? '+' : ''}{s.chg}%</span>
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  )

  const chart = (
    <Panel title={`${sel.t} · Price & indicators`} icon={<Activity size={11} aria-hidden="true" />}>
      <div className="mb-2 flex flex-wrap gap-1.5">
        {['1M', '3M', '1Y', '5Y'].map((r, i) => (
          <span key={r} className={`rounded-md px-2 py-0.5 font-mono text-[10px] ${i === 1 ? 'bg-crimson/30 text-white' : 'text-bone/40'}`}>{r}</span>
        ))}
        {['SMA', 'EMA', 'BB', 'RSI', 'MACD'].map((r, i) => (
          <span key={r} className={`rounded-md border px-2 py-0.5 font-mono text-[10px] ${i < 1 ? 'border-forest-light/50 text-forest-light' : 'border-white/10 text-bone/40'}`}>{r}</span>
        ))}
      </div>
      <CandleChart seed={sel.seed} />
    </Panel>
  )

  const regime = (
    <Panel title="Market regime">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-xl" style={{ color: col }}>{sel.regime}</span>
        <span className="font-mono text-[10px] text-bone/40">classification</span>
      </div>
      <div className="mt-2.5 space-y-1.5">
        {(['BULLISH', 'NEUTRAL', 'BEARISH'] as const).map((r, i) => (
          <div key={r} className="flex items-center gap-2 font-mono text-[10px] text-bone/50">
            <span className="w-14">{r.slice(0, 4)}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"><span className="block h-full rounded-full transition-all duration-700" style={{ width: `${probs[i]}%`, background: regimeColor[r] }} /></span>
            <span className="w-7 text-right">{probs[i]}%</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-bone/35">Illustrative class probabilities</p>
    </Panel>
  )

  const anomalies = (
    <Panel title="Anomaly signals" icon={<AlertTriangle size={11} aria-hidden="true" />}>
      <ul className="space-y-1.5 text-[11px] text-bone/70">
        <li className="flex justify-between"><span>Volume z-score</span><span className="font-mono text-crimson-light">3.2σ</span></li>
        <li className="flex justify-between"><span>Return z-score</span><span className="font-mono text-bone/60">0.8σ</span></li>
        <li className="flex justify-between"><span>Isolation score</span><span className="font-mono text-bone/60">normal</span></li>
      </ul>
    </Panel>
  )

  const ai = (
    <Panel title="Dia · insight" icon={<Bot size={11} aria-hidden="true" />}>
      <p className="text-[12px] leading-relaxed text-bone/80">{sel.note}</p>
      <p className="mt-2 text-[10px] text-bone/35">Illustrative example · not advice</p>
    </Panel>
  )

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-white/12 bg-[#0f0b0c] text-left shadow-soft">
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-crimson/80" /><span className="h-2.5 w-2.5 rounded-full bg-amber-200/50" /><span className="h-2.5 w-2.5 rounded-full bg-forest-light/70" />
        <span className="ml-3 hidden truncate rounded-md bg-white/5 px-3 py-0.5 font-mono text-[10px] text-bone/40 sm:block">redoak-markets · demo interface (mockup)</span>
      </div>

      {/* app header */}
      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 px-4 py-3">
        <span className="inline-flex items-center gap-2"><LogoMark size={24} /><span className="font-display text-sm">RedOak <span className="text-crimson-light">Markets</span></span></span>
        <label className="relative ml-auto min-w-0 flex-1 sm:max-w-xs">
          <span className="sr-only">Search demo watchlist</span>
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-bone/40" aria-hidden="true" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ticker or company" className="w-full rounded-full border border-white/10 bg-white/5 py-1.5 pl-8 pr-3 text-xs text-bone placeholder:text-bone/30 focus:border-crimson-light/60 focus:outline-none" />
        </label>
        <span className="rounded-full border border-amber-200/30 bg-amber-200/5 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-amber-200/80">Demo data</span>
      </div>

      {/* market overview */}
      <div className="grid grid-cols-2 gap-2 px-4 pt-4 sm:grid-cols-4">
        {INDEXES.map((i) => (
          <div key={i.t} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
            <p className="font-mono text-[10px] text-bone/40">{i.t}</p>
            <p className={`font-mono text-sm ${i.up ? 'text-forest-light' : 'text-crimson-light'}`}>{i.v}</p>
          </div>
        ))}
      </div>

      <div className={`grid gap-3 p-4 ${layout === 'wide' ? 'grid-cols-[210px_1fr_250px]' : layout === 'medium' ? 'grid-cols-[1fr_230px]' : 'grid-cols-1'}`}>
        {layout === 'wide' && <div className="space-y-3">{watch}</div>}
        <div className={`space-y-3 ${layout === 'medium' ? 'col-span-1' : ''}`}>
          {chart}
          {layout !== 'wide' && layout === 'narrow' && watch}
        </div>
        <div className="space-y-3">
          {regime}
          {anomalies}
          {ai}
        </div>
        {layout === 'medium' && <div className="col-span-2">{watch}</div>}
      </div>
    </div>
  )
}
