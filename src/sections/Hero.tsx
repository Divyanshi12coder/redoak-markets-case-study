import { ChevronDown } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '../components/Button'
import HeroVisual from '../visuals/HeroVisual'

export default function Hero() {
  const reduce = useReducedMotion()
  const a = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const } }

  return (
    <section id="top" className="on-dark relative overflow-hidden bg-midnight pb-24 pt-32 sm:pt-36 lg:pb-32 lg:pt-44" aria-labelledby="hero-title">
      <div className="grain pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full bg-emerald/10 blur-[120px]" aria-hidden />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div>
          <motion.p {...a(0)} className="eyebrow">
            {`AI-powered digital growth agency`}
          </motion.p>
          <motion.h1 id="hero-title" {...a(0.08)} className="mt-5 text-[2.6rem] leading-[1.04] text-white sm:text-6xl lg:text-[4.4rem]">
            Your Next Stage of <span className="text-emerald">Growth</span> Starts Here.
          </motion.h1>
          <motion.p {...a(0.16)} className="mt-6 max-w-xl text-lg leading-relaxed text-grey-cool sm:text-xl">
            We combine creative marketing, high-performing websites, and intelligent automation to help ambitious businesses stand out and grow online.
          </motion.p>
          <motion.div {...a(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" arrow>Let’s Build Something</Button>
            <Button href="#work" variant="secondary-dark">Explore Our Work</Button>
          </motion.div>
          <motion.p {...a(0.32)} className="mt-10 border-l-2 border-emerald/60 pl-4 text-sm font-semibold tracking-wide text-grey-cool">
            Creative thinking. Strategic execution. Measurable progress.
          </motion.p>
        </div>

        <motion.div {...(reduce ? {} : { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.9, delay: 0.2 } })}>
          <HeroVisual />
        </motion.div>
      </div>

      <a href="#services" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold uppercase tracking-widest text-grey-cool/70 hover:text-white lg:flex" aria-label="Scroll to services">
        Scroll
        <ChevronDown className="scroll-cue h-4 w-4" aria-hidden />
      </a>
    </section>
  )
}
