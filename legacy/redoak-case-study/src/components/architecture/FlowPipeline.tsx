import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, type MotionValue } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

export interface Step { title: string; text: string; icon: LucideIcon }

/** Vertical pipeline whose spine draws itself as the user scrolls; nodes light up as it passes. */
export function FlowPipeline({ steps }: { steps: Step[] }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 55%'] })
  const progress: MotionValue<number> = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const [reached, setReached] = useState(reduce ? steps.length : 0)

  useMotionValueEvent(progress, 'change', (v) => {
    if (reduce) return
    setReached(Math.round(v * steps.length + 0.35))
  })

  return (
    <ol ref={ref} className="relative mx-auto max-w-4xl">
      <div className="absolute bottom-4 left-5 top-4 w-px bg-white/10 lg:left-1/2" aria-hidden="true" />
      <motion.div className="absolute bottom-4 left-5 top-4 w-px origin-top bg-gradient-to-b from-crimson-light via-crimson-light to-forest-light shadow-[0_0_12px_rgba(224,84,107,0.8)] lg:left-1/2" style={{ scaleY: reduce ? 1 : progress }} aria-hidden="true" />
      {steps.map((s, i) => {
        const on = i < reached
        const left = i % 2 === 0
        const Icon = s.icon
        return (
          <li key={s.title} className="relative flex min-h-[104px] items-center pl-14 lg:pl-0">
            <span
              className={`absolute left-5 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-500 lg:left-1/2 ${on ? 'border-crimson-light bg-crimson text-white shadow-glow' : 'border-white/15 bg-ink text-bone/40'}`}
              aria-hidden="true"
            >
              <Icon size={17} />
            </span>
            <div className={`w-full lg:w-1/2 ${left ? 'lg:pr-14 lg:text-right' : 'lg:ml-auto lg:pl-14'}`}>
              <div className={`glass rounded-2xl p-5 transition-all duration-500 ${on ? 'border-crimson-light/40 opacity-100' : 'opacity-50'}`}>
                <p className="eyebrow text-bone/40">Step {String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display mt-1 text-xl">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-bone/60">{s.text}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
