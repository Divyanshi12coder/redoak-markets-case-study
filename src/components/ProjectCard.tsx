import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/projects'
import ProjectCover from '../visuals/ProjectVisuals'
import SmartLink from './SmartLink'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group card relative flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-700 group-hover:scale-[1.04]">
          <ProjectCover kind={project.visual} />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-midnight/90 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-white">
          Concept Project
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{project.category}</p>
        <h3 className="mt-2 text-xl">{project.title}</h3>
        <p className="mt-2 leading-relaxed text-midnight/70">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Services and tags">
          {project.tags.map((t) => (
            <li key={t} className="rounded-full border border-midnight/10 bg-offwhite px-3 py-1 text-xs font-semibold text-midnight/70">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          <SmartLink
            href={`/work/${project.slug}`}
            className="inline-flex min-h-[44px] items-center gap-2 font-bold text-midnight after:absolute after:inset-0 after:content-['']"
            aria-label={`View project: ${project.title}`}
          >
            View Project
            <ArrowUpRight className="h-4 w-4 text-emerald-deep transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </SmartLink>
        </div>
      </div>
    </article>
  )
}
