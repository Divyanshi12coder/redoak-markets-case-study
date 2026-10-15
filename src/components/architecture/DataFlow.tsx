import { Fragment, useEffect, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Calculator, CloudDownload, Cpu, LineChart, MessageSquareText, Monitor, Send, Server, User, type LucideIcon } from 'lucide-react'

const NODES: { t: string; s: string; icon: LucideIcon }[] = [
  { t: 'User', s: 'searches a ticker', icon: User },
  { t: 'React Frontend', s: 'typed API client', icon: Monitor },
  { t: 'FastAPI', s: 'validates & routes', icon: Server },
  { t: 'Market Data Provider', s: 'demo or Twelve Data', icon: CloudDownload },
  { t: 'Pandas / NumPy', s: 'clean & shape bars', icon: Calculator },
  { t: 'Technical Indicators', s: 'SMA · RSI · MACD …', icon: LineChart },
  { t: 'ML Pipeline', s: 'regime + anomalies', icon: Cpu },
  { t: 'AI Interpretation', s: 'Dia explains facts', icon: Brain },
  { t: 'Response', s: 'typed JSON payload', icon: Send },
  { t: 'Interactive Visualization', s: 'charts & signals', icon: MessageSquareText },
]

function Connector({ lit, vertical }: { lit: boolean; vertical?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`${vertical ? 'h-7 w-px md:hidden' : 'hidden h-px flex-1 md:block'} ${lit ? 'bg-gradient-to-r from-crimson-light to-forest-light' : 'bg-white/10'} relative transition-colors duration-500`}
    >
      {lit && <span className={`absolute rounded-full bg-white shadow-[0_0_10px_#fff] ${vertical ? 'left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2' : 'left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2'}`} />}
    </span>
  )
}

function Node({ i, active }: { i: number; active: number }) {
  const n = NODES[i]
  const Icon = n.icon
  const isNow = active === i
  return (
    <div className={`glass flex w-full shrink-0 flex-col items-center gap-1.5 rounded-2xl px-3 py-4 text-center transition-all duration-500 md:w-[148px] ${isNow ? 'scale-105 border-crimson-light bg-crimson/20 shadow-glow' : active > i ? 'border-forest-light/30' : ''}`}>
      <Icon size={20} className={isNow ? 'text-white' : active > i ? 'text-forest-light' : 'text-bone/50'} aria-hidden="true" />
      <p className="text-[13px] font-medium leading-tight">{n.t}</p>
      <p className="text-[11px] leading-tight text-bone/45">{n.s}</p>
    </div>
  )
}

/** A request travelling through the stack; nodes and links light up in sequence. */
export function DataFlow() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10%' })
  const [active, setActive] = useState(reduce ? NODES.length : 0)

  useEffect(() => {
    if (reduce || !inView) return
    const id = window.setInterval(() => setActive((a) => (a >= NODES.length + 2 ? 0 : a + 1)), 900)
    return () => window.clearInterval(id)
  }, [inView, reduce])

  const row = (from: number, to: number, reverse = false) => (
    <div className={`flex flex-col items-center md:flex-row ${reverse ? 'md:flex-row-reverse' : ''}`}>
      {NODES.slice(from, to).map((_, k) => {
        const i = from + k
        return (
          <Fragment key={i}>
            <Node i={i} active={active} />
            {k < to - from - 1 && <><Connector lit={active > i} /><Connector lit={active > i} vertical /></>}
          </Fragment>
        )
      })}
    </div>
  )

  return (
    <div ref={ref} aria-label="Request data flow from user to interactive visualization" role="group">
      {row(0, 5)}
      <div className="flex justify-center py-2 md:justify-end md:pr-[74px]"><Connector lit={active > 4} vertical /><span aria-hidden="true" className={`hidden h-8 w-px md:block ${active > 4 ? 'bg-gradient-to-b from-crimson-light to-forest-light' : 'bg-white/10'}`} /></div>
      {row(5, 10, true)}
      <p className="mt-8 text-center text-sm text-bone/45">
        {reduce ? 'Animation paused (reduced motion preference).' : 'A single request, left to right then back — each stage enriches the one before it.'}
      </p>
    </div>
  )
}
