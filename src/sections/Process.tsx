import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { process } from '../data/content'

export default function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="process" className="section-pad bg-white" aria-labelledby="process-title">
      <div className="container-page">
        <SectionHeading id="process-title" eyebrow="Our Process" title="A Clear Path From First Conversation to Measurable Progress." />

        <ol ref={ref} className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-8">
          {/* track: vertical on mobile, horizontal on desktop */}
          <span aria-hidden className="absolute bottom-2 left-[19px] top-2 w-px bg-midnight/10 lg:bottom-auto lg:left-0 lg:right-0 lg:top-5 lg:h-px lg:w-auto" />
          <motion.span
            aria-hidden
            style={reduce ? undefined : { scaleY: progress, transformOrigin: 'top' }}
            className="absolute bottom-2 left-[19px] top-2 w-px bg-emerald lg:hidden"
          />
          <motion.span
            aria-hidden
            style={reduce ? undefined : { scaleX: progress, transformOrigin: 'left' }}
            className="absolute left-0 right-0 top-5 hidden h-px bg-emerald lg:block"
          />
          {process.map((s, i) => (
            <li key={s.n} className="relative pl-14 lg:pl-0 lg:pt-14">
              <Reveal delay={i * 0.1}>
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald bg-white text-sm font-extrabold text-emerald-deep">
                  {s.n}
                </span>
                <h3 className="text-xl">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-midnight/70">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
