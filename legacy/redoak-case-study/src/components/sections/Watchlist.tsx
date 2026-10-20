import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { IllustrativeTag } from '../ui/Tag'
import { Sparkline } from '../charts/Sparkline'
import { STOCKS, regimeColor } from '../../data/stocks'

export function Watchlist() {
  const [open, setOpen] = useState<string | null>('NVDA')
  return (
    <Section
      id="watchlist"
      tone="light"
      eyebrow="Watchlist experience"
      title={<>Your market, <em className="text-crimson">at a glance.</em></>}
      lead="Accounts keep personal, orderable watchlists. Each row condenses trend, regime, volatility and signal strength into something readable in a second."
    >
      <Reveal className="mb-6"><IllustrativeTag light>Representative values — not live prices</IllustrativeTag></Reveal>
      <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STOCKS.map((s, i) => {
          const isOpen = open === s.t
          const col = regimeColor[s.regime]
          return (
            <Reveal key={s.t} delay={i * 0.05}>
              <motion.div
                layout
                onPointerEnter={() => setOpen(s.t)}
                className={`overflow-hidden rounded-2xl border bg-white transition-shadow ${isOpen ? 'border-crimson/40 shadow-[0_20px_50px_-20px_rgba(155,28,46,0.45)]' : 'border-wine/10'}`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(s.t)}
                  onFocus={() => setOpen(s.t)}
                  className="w-full p-5 text-left"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-lg font-medium text-charcoal">{s.t}</p>
                      <p className="text-xs text-charcoal/50">{s.name}</p>
                    </div>
                    <span className="rounded-full px-2.5 py-1 font-mono text-[10px] tracking-widest text-white" style={{ background: col }}>{s.regime}</span>
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <Sparkline seed={s.seed} color={col} w={120} h={38} up={s.chg >= 0} />
                    <span className={`font-mono text-sm ${s.chg >= 0 ? 'text-forest' : 'text-crimson'}`}>{s.chg >= 0 ? '+' : ''}{s.chg}%</span>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div className="space-y-3 border-t border-wine/10 px-5 pb-5 pt-4 text-sm">
                        <div className="flex justify-between"><span className="text-charcoal/50">Volatility</span><span className="font-medium">{s.vol}</span></div>
                        <div>
                          <div className="mb-1 flex justify-between"><span className="text-charcoal/50">Signal strength</span><span className="font-mono">{s.strength}/100</span></div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-wine/10"><motion.div className="h-full rounded-full" style={{ background: col }} initial={{ width: 0 }} animate={{ width: `${s.strength}%` }} transition={{ duration: 0.7 }} /></div>
                        </div>
                        <p className="text-xs leading-relaxed text-charcoal/60">{s.note}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
