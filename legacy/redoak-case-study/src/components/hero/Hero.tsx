import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import { Github } from '../ui/GithubIcon'
import { HeroBackdrop } from './HeroBackdrop'
import { Logo } from '../ui/Logo'
import { Button } from '../ui/Button'
import { GITHUB_APP } from '../../data/content'

export function Hero() {
  const reduce = useReducedMotion()
  const item = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  })
  return (
    <section id="top" aria-labelledby="hero-h" className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink px-5 pb-20 pt-28 sm:px-8 lg:px-12">
      <HeroBackdrop />
      <div className="container-x">
        <motion.div {...item(0.05)} className="mb-8 flex flex-wrap items-center gap-4">
          <Logo size={44} />
          <span className="chip border-crimson-light/40 bg-crimson/15 text-bone/85">
            <Sparkles size={11} aria-hidden="true" /> AI-Powered Market Intelligence
          </span>
        </motion.div>

        <motion.h1 {...item(0.15)} id="hero-h" className="font-display max-w-5xl text-[2.9rem] font-light leading-[0.98] sm:text-7xl lg:text-[6.5rem]">
          See the market.
          <br />
          <span className="text-gradient-crimson italic">Understand the trend.</span>
        </motion.h1>

        <motion.p {...item(0.3)} className="mt-8 max-w-2xl text-base leading-relaxed text-bone/65 sm:text-xl">
          RedOak Markets transforms market data into technical intelligence, visual signals, machine-learning insights, and actionable context.
        </motion.p>

        <motion.div {...item(0.45)} className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="#overview" icon={<ArrowDown size={16} aria-hidden="true" />}>Explore the Case Study</Button>
          <Button href={GITHUB_APP} variant="ghost" external icon={<Github size={16} aria-hidden="true" />}>View GitHub</Button>
        </motion.div>

        <motion.dl {...item(0.6)} className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-6 text-sm">
          {[
            ['Technical', 'indicators & signals'],
            ['Machine learning', 'regime classification'],
            ['Dia', 'explained analysis'],
          ].map(([a, b]) => (
            <div key={a}>
              <dt className="font-display text-lg text-bone sm:text-xl">{a}</dt>
              <dd className="mt-1 text-xs text-bone/45 sm:text-sm">{b}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
