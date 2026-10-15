import { Info } from 'lucide-react'

/** Labels any non-live visual honestly. */
export function IllustrativeTag({ children = 'Representative demo data — not live', light }: { children?: string; light?: boolean }) {
  return (
    <span className={`chip ${light ? 'border-wine/20 text-wine/70' : 'border-white/15 text-bone/55'}`}>
      <Info size={11} aria-hidden="true" /> {children}
    </span>
  )
}

export function StatusTag({ kind }: { kind: 'implemented' | 'consideration' | 'planned' }) {
  const map = {
    implemented: ['Implemented', 'border-forest-light/50 text-forest-light bg-forest-light/10'],
    consideration: ['Design consideration', 'border-amber-200/30 text-amber-200/80 bg-amber-200/5'],
    planned: ['Planned · not built', 'border-white/20 text-bone/60'],
  } as const
  const [label, cls] = map[kind]
  return <span className={`chip ${cls}`}>{label}</span>
}
