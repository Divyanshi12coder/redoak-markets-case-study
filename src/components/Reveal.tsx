import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** Fade-and-rise on scroll. Renders statically when the user prefers reduced motion. */
export default function Reveal({
  children,
  delay = 0,
  className,
  y = 18,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
