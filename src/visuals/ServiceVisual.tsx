import type { ServiceVisual as Kind } from '../data/services'

/** Small abstract preview tiles for each service card. Decorative. */
export default function ServiceVisual({ kind }: { kind: Kind }) {
  const frame = 'relative h-40 overflow-hidden rounded-xl bg-midnight/[0.04] p-4'
  switch (kind) {
    case 'social':
      return (
        <div className={`${frame} flex items-center justify-center gap-3`} aria-hidden>
          <div className="h-28 w-24 -rotate-3 rounded-lg bg-gradient-to-br from-[#d9c6b5] to-[#b9a08d] p-2 shadow-card transition-transform duration-500 group-hover:-rotate-6">
            <div className="mt-8 h-2 w-3/4 rounded bg-midnight/60" />
            <div className="mt-1.5 h-2 w-1/2 rounded bg-midnight/60" />
          </div>
          <div className="h-28 w-24 rotate-2 rounded-lg bg-midnight p-2 shadow-card transition-transform duration-500 group-hover:rotate-6">
            <div className="h-2 w-1/3 rounded bg-emerald" />
            <div className="mt-8 h-2 w-3/4 rounded bg-offwhite" />
            <div className="mt-1.5 h-2 w-1/2 rounded bg-offwhite" />
          </div>
        </div>
      )
    case 'web':
      return (
        <div className={frame} aria-hidden>
          <div className="mx-auto h-full w-4/5 rounded-lg border border-midnight/10 bg-white shadow-card transition-transform duration-500 group-hover:-translate-y-1">
            <div className="flex gap-1 border-b border-midnight/10 p-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-midnight/20" /><span className="h-1.5 w-1.5 rounded-full bg-midnight/20" />
            </div>
            <div className="space-y-1.5 p-3">
              <div className="h-2.5 w-2/3 rounded bg-midnight" />
              <div className="h-1.5 w-full rounded bg-midnight/15" />
              <div className="h-5 w-14 rounded-full bg-emerald" />
            </div>
          </div>
        </div>
      )
    case 'performance':
      return (
        <div className={`${frame} flex items-end justify-center gap-5`} aria-hidden>
          {['Ad', 'Page', 'Form', 'Lead'].map((l, i) => (
            <div key={l} className="flex flex-col items-center gap-1.5">
              <div className="w-8 rounded-t-md bg-midnight/80 transition-all duration-500 group-hover:bg-emerald" style={{ height: `${96 - i * 20}px` }} />
              <span className="text-[10px] font-semibold text-midnight/50">{l}</span>
            </div>
          ))}
        </div>
      )
    case 'seo':
      return (
        <div className={`${frame} space-y-2`} aria-hidden>
          <div className="flex items-center gap-2 rounded-full border border-midnight/10 bg-white px-3 py-1.5">
            <span className="h-2 w-2 rounded-full border-2 border-midnight/40" />
            <span className="h-1.5 w-1/2 rounded bg-midnight/20" />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className={`space-y-1 rounded-lg bg-white p-2 shadow-card transition-transform duration-500 ${i === 0 ? 'group-hover:translate-x-1' : ''}`}>
              <div className={`h-1.5 w-2/5 rounded ${i === 0 ? 'bg-emerald' : 'bg-midnight/30'}`} />
              <div className="h-1 w-full rounded bg-midnight/10" />
            </div>
          ))}
        </div>
      )
    case 'automation':
      return (
        <div className={`${frame} flex items-center justify-between`} aria-hidden>
          {['Enquiry', 'Route', 'Review', 'Reply'].map((l, i) => (
            <div key={l} className="flex items-center gap-1">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-[9px] font-bold ${i === 2 ? 'bg-emerald text-midnight' : 'bg-white text-midnight/70 shadow-card'}`}>{l}</div>
              {i < 3 && <span className="h-px w-3 bg-midnight/30" />}
            </div>
          ))}
        </div>
      )
  }
}
