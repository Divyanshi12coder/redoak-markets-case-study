import { motion, useReducedMotion } from 'framer-motion'
import { Monitor, Smartphone, Tablet } from 'lucide-react'
import { Section } from '../ui/Section'
import { ScaledFrame } from '../ui/ScaledFrame'
import { DashboardMock } from './DashboardMock'

const FRAMES = [
  { label: 'Desktop', icon: Monitor, w: 1100, max: undefined, cls: 'lg:col-span-7', from: { x: -50 } },
  { label: 'Tablet', icon: Tablet, w: 768, max: 900, cls: 'lg:col-span-3', from: { y: 50 } },
  { label: 'Mobile', icon: Smartphone, w: 390, max: 900, cls: 'lg:col-span-2', from: { x: 50 } },
] as const

export function Responsive() {
  const reduce = useReducedMotion()
  return (
    <Section
      id="responsive"
      tone="dark"
      eyebrow="03 — The Product · Responsive"
      title={<>One product, <em className="text-gradient-crimson">every screen.</em></>}
      lead="The interface reflows from a three-column desktop workspace to a stacked mobile view. These frames render the same mockup at three widths."
    >
      <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
        {FRAMES.map((f, i) => {
          const Icon = f.icon
          return (
            <motion.figure
              key={f.label}
              className={`min-w-0 ${f.cls}`}
              initial={reduce ? false : { opacity: 0, scale: 0.94, ...f.from }}
              whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-black p-1.5 shadow-soft">
                <div className="overflow-hidden rounded-xl">
                  <ScaledFrame designWidth={f.w} maxHeight={f.max}><DashboardMock /></ScaledFrame>
                </div>
              </div>
              <figcaption className="mt-4 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-bone/50">
                <Icon size={14} aria-hidden="true" /> {f.label} · {f.w}px
              </figcaption>
            </motion.figure>
          )
        })}
      </div>
    </Section>
  )
}
