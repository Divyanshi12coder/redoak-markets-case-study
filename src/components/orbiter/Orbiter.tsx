import { useRef, useState } from 'react'
import { motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useTransform, type MotionValue } from 'framer-motion'
import { Activity, Bot, Brain, Database, Eye, LineChart, type LucideIcon } from 'lucide-react'
import { LogoMark } from '../ui/Logo'

interface NodeDef { id: string; label: string; icon: LucideIcon; ring: number; phase: number; blurb: string }

const RADII = [21, 32, 43]
const SPEEDS = [0.007, -0.0045, 0.003] // degrees per millisecond

const NODES: NodeDef[] = [
  { id: 'data', label: 'Market Data', icon: Database, ring: 0, phase: 200, blurb: 'Demo or Twelve Data provider, normalised and cached server-side.' },
  { id: 'watch', label: 'Watchlists', icon: Eye, ring: 0, phase: 20, blurb: 'Personal, ordered lists persisted per account.' },
  { id: 'tech', label: 'Technical Indicators', icon: LineChart, ring: 1, phase: 110, blurb: 'SMA, EMA, RSI, MACD, Bollinger Bands and ATR.' },
  { id: 'ai', label: 'AI Analyst', icon: Bot, ring: 1, phase: 290, blurb: 'Dia turns structured facts into plain-language context.' },
  { id: 'ml', label: 'Machine Learning', icon: Brain, ring: 2, phase: 45, blurb: 'Walk-forward Random Forest regime classification.' },
  { id: 'anom', label: 'Anomaly Detection', icon: Activity, ring: 2, phase: 225, blurb: 'Rolling z-scores and Isolation Forest flag unusual moves.' },
]

function OrbitNode({ node, t, activeId, onActive, reduced }: { node: NodeDef; t: MotionValue<number>; activeId: string | null; onActive: (id: string | null) => void; reduced: boolean }) {
  const r = RADII[node.ring]
  const angle = useTransform(t, (v) => ((node.phase + v * SPEEDS[node.ring]) * Math.PI) / 180)
  const cx = useTransform(angle, (a) => 50 + r * Math.cos(a))
  const cy = useTransform(angle, (a) => 50 + r * Math.sin(a))
  const left = useTransform(cx, (v) => `${v}%`)
  const top = useTransform(cy, (v) => `${v}%`)
  const [side, setSide] = useState({ below: false, right: false })
  const isActive = activeId === node.id
  const Icon = node.icon

  const syncSide = () => setSide({ below: cy.get() < 50, right: cx.get() > 50 })
  const show = () => { syncSide(); onActive(node.id) }

  return (
    <>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
        <motion.line x1="50" y1="50" x2={cx} y2={cy} stroke={isActive ? '#e0546b' : '#9b1c2e'} strokeWidth={isActive ? 0.45 : 0.15} strokeOpacity={isActive ? 1 : 0.35} strokeDasharray={isActive ? undefined : '0.8 1.2'} style={{ transition: 'stroke-width .3s, stroke-opacity .3s' }} />
      </svg>
      <motion.div className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left, top }}>
        <button
          type="button"
          aria-label={`${node.label}: ${node.blurb}`}
          onPointerEnter={show}
          onPointerLeave={() => onActive(null)}
          onFocus={show}
          onBlur={() => onActive(null)}
          className={`glass relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 sm:h-14 sm:w-14 ${isActive ? 'scale-125 border-crimson-light bg-crimson/40 shadow-glow' : 'hover:scale-110'}`}
        >
          <Icon size={19} className={isActive ? 'text-white' : 'text-bone/80'} aria-hidden="true" />
          {!reduced && isActive && <span className="pulse-ring absolute inset-0 rounded-full border border-crimson-light" />}
        </button>
        <span className="pointer-events-none absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-bone/55 md:block">
          {node.label}
        </span>
        {isActive && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: side.below ? -6 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass absolute z-30 w-52 rounded-xl p-3.5 text-left shadow-soft ${side.below ? 'top-full mt-9' : 'bottom-full mb-3'} ${side.right ? 'right-0' : 'left-0'}`}
            style={{ background: 'rgba(20,10,13,0.88)' }}
          >
            <p className="font-display text-sm text-white">{node.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-bone/65">{node.blurb}</p>
          </motion.div>
        )}
      </motion.div>
    </>
  )
}

export function Orbiter() {
  const reduce = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '100px' })
  const t = useMotionValue(0)
  const speed = useRef(1)
  const [activeId, setActiveId] = useState<string | null>(null)

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return
    const target = activeId ? 0.04 : 1
    speed.current += (target - speed.current) * 0.08
    t.set(t.get() + delta * speed.current)
  })

  return (
    <div ref={ref} role="group" aria-label="Interactive market intelligence orbiter" className="relative mx-auto aspect-square w-full max-w-[640px]">
      <div className="absolute inset-[-8%] rounded-full bg-[radial-gradient(circle,rgba(155,28,46,0.35),transparent_62%)]" aria-hidden="true" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
        {RADII.map((r, i) => (
          <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="rgba(246,242,236,0.14)" strokeWidth="0.2" strokeDasharray={i === 1 ? '0.6 1.4' : undefined} />
        ))}
        {Array.from({ length: 36 }, (_, i) => {
          const a = (i / 36) * Math.PI * 2
          return <line key={i} x1={50 + 46 * Math.cos(a)} y1={50 + 46 * Math.sin(a)} x2={50 + 47.4 * Math.cos(a)} y2={50 + 47.4 * Math.sin(a)} stroke="rgba(246,242,236,0.2)" strokeWidth="0.2" />
        })}
      </svg>

      <div className="absolute left-1/2 top-1/2 z-0 flex h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-crimson-light/40 bg-[radial-gradient(circle_at_35%_30%,rgba(194,51,74,0.5),rgba(42,10,16,0.95)_70%)] shadow-glow">
        {!reduce && <span className="pulse-ring absolute inset-0 rounded-full border border-crimson-light/60" aria-hidden="true" />}
        <LogoMark size={44} className="h-[62%] w-[62%]" />
      </div>

      {NODES.map((n) => (
        <OrbitNode key={n.id} node={n} t={t} activeId={activeId} onActive={setActiveId} reduced={reduce} />
      ))}
    </div>
  )
}
