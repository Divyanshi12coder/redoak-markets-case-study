import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { ReactNode, PointerEvent } from 'react'

interface Props {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'light'
  external?: boolean
  icon?: ReactNode
}

const styles = {
  primary: 'bg-crimson text-white border-crimson-light/50 shadow-glow hover:bg-crimson-light',
  ghost: 'glass text-bone hover:border-white/30',
  light: 'bg-bone text-ink border-white/40 hover:bg-white',
}

/** Link-styled button with a subtle magnetic pull toward the cursor. */
export function Button({ href, children, variant = 'primary', external, icon }: Props) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16 })
  const sy = useSpring(y, { stiffness: 220, damping: 16 })
  const move = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28)
  }
  const reset = () => { x.set(0); y.set(0) }
  return (
    <motion.a
      href={href}
      onPointerMove={move}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors ${styles[variant]}`}
    >
      {children}
      {icon && <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">{icon}</span>}
    </motion.a>
  )
}
