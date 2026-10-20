import { Info } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/projects'

export default function Portfolio() {
  return (
    <section id="work" className="on-dark section-pad bg-midnight" aria-labelledby="work-title">
      <div className="container-page">
        <SectionHeading id="work-title" dark eyebrow="Selected Work" title="Good Strategy Deserves Great Execution.">
          Three concept projects that show how we think and what we build.
        </SectionHeading>
        <Reveal className="mt-6 flex max-w-3xl gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-grey-cool">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald" aria-hidden />
          <p>
            These are demonstration projects for fictional brands, not client engagements. They contain no real clients, testimonials, campaign results or performance metrics.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
