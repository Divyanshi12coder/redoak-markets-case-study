import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props { children: ReactNode; delay?: number; y?: number; className?: string }

export function Reveal({ children, delay = 0, y = 28, className }: Props) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
