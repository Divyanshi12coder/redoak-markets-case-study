import { UserRound } from 'lucide-react'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { site } from '../config/site'

export default function About() {
  const f = site.founder
  return (
    <section id="about" className="section-pad" aria-labelledby="about-title">
      <div className="container-page grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <div>
          <SectionHeading id="about-title" eyebrow="About" title="An Independent Agency Built for Modern Businesses." />
          <Reveal delay={0.1} className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-midnight/75">
            <p>{site.name} is being built around a simple idea: businesses deserve digital experiences that look exceptional, communicate clearly, and support meaningful growth.</p>
            <p>We bring together creative content, website development, marketing strategy, and intelligent tools to help businesses build a stronger online presence.</p>
            <p>Our approach is collaborative, practical, and focused on delivering work with a clear purpose.</p>
            <div className="pt-3">
              <Button href="#contact" variant="dark" arrow>Let’s Work Together</Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <aside className="card overflow-hidden" aria-label="Founder profile">
            {f.photo ? (
              <img src={f.photo} alt={f.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-midnight to-charcoal">
                <UserRound className="h-16 w-16 text-emerald/70" aria-hidden />
              </div>
            )}
            <div className="p-6">
              {f.name ? (
                <>
                  <h3 className="text-xl">{f.name}</h3>
                  {f.role && <p className="mt-1 text-sm font-semibold text-emerald-deep">{f.role}</p>}
                  {f.bio && <p className="mt-3 leading-relaxed text-midnight/70">{f.bio}</p>}
                </>
              ) : (
                <>
                  <h3 className="text-xl">Founder profile</h3>
                  <p className="mt-2 leading-relaxed text-midnight/70">
                    A short, genuine introduction from the person you’ll work with will appear here.
                  </p>
                </>
              )}
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  )
}
