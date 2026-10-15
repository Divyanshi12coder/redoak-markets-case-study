import { ArrowUpRight, Globe, Scale } from 'lucide-react'
import { Github } from '../ui/GithubIcon'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { LogoMark, Logo } from '../ui/Logo'
import { BranchGeometry } from '../ui/Backdrops'
import { GITHUB_APP, GITHUB_CASE, LIVE_APP } from '../../data/content'

export function Disclaimer() {
  return (
    <section id="disclaimer" aria-labelledby="disc-h" className="bg-bone px-5 py-16 text-charcoal sm:px-8 lg:px-12">
      <Reveal className="container-x">
        <div className="mx-auto flex max-w-4xl gap-5 rounded-3xl border border-crimson/25 bg-white p-7 shadow-[0_20px_50px_-30px_rgba(110,15,30,0.5)] sm:p-9">
          <Scale size={26} className="mt-1 shrink-0 text-crimson" aria-hidden="true" />
          <div>
            <h2 id="disc-h" className="eyebrow text-crimson">Financial disclaimer</h2>
            <p className="font-display mt-3 text-xl leading-snug sm:text-2xl">
              RedOak Markets is an educational and analytical software project. Market signals and AI-generated insights are informational only and are not financial advice, investment recommendations, or guarantees of future performance.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export function Closing() {
  return (
    <Section id="explore" tone="dark" eyebrow="Explore" title={<>Explore the <em className="text-gradient-crimson">build.</em></>} lead="The application is open source. This case study is its companion — the story, the decisions and the design behind it." align="center">
      <Reveal className="flex flex-wrap items-center justify-center gap-4">
        <Button href={LIVE_APP} external icon={<ArrowUpRight size={16} aria-hidden="true" />}><Globe size={16} aria-hidden="true" /> View Application</Button>
        <Button href={GITHUB_APP} variant="ghost" external icon={<ArrowUpRight size={16} aria-hidden="true" />}><Github size={16} aria-hidden="true" /> View GitHub</Button>
        <Button href="#top" variant="ghost">Explore Case Study</Button>
      </Reveal>
      <Reveal className="mt-6 text-center font-mono text-xs text-bone/40">
        Case study repository: <a className="underline underline-offset-4 hover:text-bone" href={GITHUB_CASE} target="_blank" rel="noopener noreferrer">redoak-markets-case-study</a>
      </Reveal>

      <Reveal delay={0.1} className="mt-20">
        <article aria-label="About the author" className="glass relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] p-8 text-center sm:p-14">
          <BranchGeometry className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 text-crimson-light/20" />
          <LogoMark size={56} className="relative mx-auto" />
          <p className="eyebrow relative mt-8 text-bone/45">Author</p>
          <h3 className="font-display relative mt-3 text-3xl font-light sm:text-5xl">Built &amp; Created By <span className="text-gradient-crimson italic">Divyanshi</span></h3>
          <p className="relative mt-5 font-mono text-xs uppercase tracking-[0.18em] text-bone/60 sm:text-sm">Full-Stack Developer • AI/ML Enthusiast • Product Builder</p>
          <div className="relative mt-8 flex justify-center">
            <a href="https://github.com/Divyanshi12coder" target="_blank" rel="noopener noreferrer" className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-bone/80 transition-colors hover:text-white">
              <Github size={15} aria-hidden="true" /> Divyanshi12coder
            </a>
          </div>
        </article>
      </Reveal>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink px-5 py-10 sm:px-8 lg:px-12">
      <div className="container-x flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <Logo size={30} />
        <p className="max-w-xl text-xs leading-relaxed text-bone/40">
          See the market. Understand the trend. · Educational project — not financial advice. · Built &amp; Created By Divyanshi.
        </p>
      </div>
    </footer>
  )
}
