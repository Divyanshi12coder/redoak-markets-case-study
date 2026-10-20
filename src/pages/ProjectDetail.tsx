import { ArrowLeft, ArrowRight, Info } from 'lucide-react'
import { useParams } from 'react-router-dom'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import SmartLink from '../components/SmartLink'
import { getProject, projects, type Project } from '../data/projects'
import { useSeo } from '../hooks/useSeo'
import ProjectCover, { beautyPalette } from '../visuals/ProjectVisuals'
import NotFound from './NotFound'

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-4 border-t border-midnight/10 py-10 lg:grid-cols-[14rem_1fr] lg:gap-12">
      <h2 className="text-xl">{title}</h2>
      <div className="max-w-2xl space-y-3 text-lg leading-relaxed text-midnight/75">{children}</div>
    </Reveal>
  )
}

function Extras({ p }: { p: Project }) {
  if (p.visual === 'beauty')
    return (
      <Block title="Brand palette">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {beautyPalette.map((c) => (
            <li key={c.hex} className="overflow-hidden rounded-xl border border-midnight/10 bg-white text-sm">
              <div className="h-16" style={{ background: c.hex }} />
              <div className="p-3"><b>{c.name}</b><br /><span className="text-midnight/55">{c.hex}</span></div>
            </li>
          ))}
        </ul>
      </Block>
    )
  if (p.visual === 'leadgen')
    return (
      <Block title="Campaign tracking concept">
        <p className="rounded-xl bg-offwhite p-4 text-base">
          Illustrative plan only. No campaign has been run, and no real metrics or advertising results are represented here.
        </p>
        <ol className="space-y-2 text-base">
          {['Ad click: record source and creative variant', 'Landing page view: record page and device type', 'Form start and submit: record as a lead event', 'Enquiry follow-up: mark as qualified or not in a simple tracker', 'Monthly review: compare stages and decide what to change'].map((t, i) => (
            <li key={t} className="flex gap-3"><span className="font-bold text-emerald-deep">{i + 1}.</span>{t}</li>
          ))}
        </ol>
      </Block>
    )
  return null
}

export default function ProjectDetail() {
  const { slug = '' } = useParams()
  const p = getProject(slug)
  useSeo({ title: p ? `${p.title} (Concept Project)` : 'Project', description: p?.summary, path: `/work/${slug}` })
  if (!p) return <NotFound />

  const idx = projects.indexOf(p)
  const next = projects[(idx + 1) % projects.length]

  return (
    <>
      <section className="on-dark bg-midnight pb-16 pt-28 sm:pt-32">
        <div className="container-page">
          <SmartLink href="/#work" className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-grey-cool hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden /> All work
          </SmartLink>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="eyebrow">{p.category} · Concept Project</p>
              <h1 className="mt-4 text-4xl text-white sm:text-5xl lg:text-6xl">{p.title}</h1>
              <p className="mt-2 text-grey-cool">{p.brand}</p>
              <p className="mt-6 text-lg leading-relaxed text-grey-cool">{p.summary}</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-dark">
              <ProjectCover kind={p.visual} />
            </div>
          </div>
          <div className="mt-8 flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-grey-cool">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald" aria-hidden />
            <p>{p.disclaimer}</p>
          </div>
        </div>
      </section>

      <article className="container-page py-12 sm:py-16">
        <Block title="The scenario"><p>{p.scenario}</p></Block>
        <Block title="The problem"><p>{p.problem}</p></Block>
        <Block title="Creative strategy">
          <ul className="list-disc space-y-2 pl-5 marker:text-emerald-deep">{p.strategy.map((s) => <li key={s}>{s}</li>)}</ul>
        </Block>
        <Block title="Proposed solution">
          <ul className="list-disc space-y-2 pl-5 marker:text-emerald-deep">{p.solution.map((s) => <li key={s}>{s}</li>)}</ul>
        </Block>
        <Extras p={p} />
        <Block title="Design decisions">
          <div className="grid gap-4 sm:grid-cols-3">
            {p.decisions.map((d) => (
              <div key={d.title} className="card p-5">
                <h3 className="text-base">{d.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-midnight/70">{d.body}</p>
              </div>
            ))}
          </div>
        </Block>
        <Block title="Intended business objective"><p>{p.objective}</p></Block>
        <Block title="Concept deliverables">
          <ul className="flex flex-wrap gap-2">
            {p.deliverables.map((d) => (
              <li key={d} className="rounded-full border border-midnight/10 bg-white px-4 py-1.5 text-base font-semibold text-midnight/75">{d}</li>
            ))}
          </ul>
        </Block>
      </article>

      <section className="on-dark bg-midnight py-16">
        <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl text-white sm:text-3xl">Want something like this for your business?</h2>
            <p className="mt-2 text-grey-cool">Tell us about your goals and we’ll suggest a sensible starting point.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" arrow>Start a conversation</Button>
            <Button href={`/work/${next.slug}`} variant="secondary-dark">
              Next: {next.title} <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
