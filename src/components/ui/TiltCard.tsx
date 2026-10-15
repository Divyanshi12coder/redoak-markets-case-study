import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { ReactNode, PointerEvent } from 'react'
import { usePointerGlow } from '../../hooks/usePointerGlow'

interface Props { children: ReactNode; className?: string; light?: boolean; tilt?: number }

/** Card with perspective tilt and a cursor-following glow. */
export function TiltCard({ children, className = '', light, tilt = 6 }: Props) {
  const reduce = useReducedMotion()
  const glow = usePointerGlow()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [tilt, -tilt]), { stiffness: 180, damping: 18 })
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-tilt, tilt]), { stiffness: 180, damping: 18 })
  const move = (e: PointerEvent<HTMLDivElement>) => {
    glow(e)
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const leave = () => { px.set(0); py.set(0) }
  return (
    <motion.div
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`group relative overflow-hidden rounded-2xl border transition-colors ${light ? 'border-wine/10 bg-white hover:border-crimson/40' : 'glass hover:border-crimson-light/50'} ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(320px circle at var(--mx,50%) var(--my,50%), ${light ? 'rgba(155,28,46,0.08)' : 'rgba(194,51,74,0.16)'}, transparent 70%)` }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  )
}
