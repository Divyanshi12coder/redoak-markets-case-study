import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface Props {
  id: string
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  tone?: 'dark' | 'light' | 'green'
  children: ReactNode
  align?: 'left' | 'center'
}

const tones = {
  dark: 'bg-ink text-bone',
  light: 'bg-bone text-charcoal',
  green: 'bg-forest-deep text-bone',
}

export function Section({ id, eyebrow, title, lead, tone = 'dark', children, align = 'left' }: Props) {
  const light = tone === 'light'
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`relative isolate overflow-hidden section-pad ${tones[tone]}`}>
      {tone === 'green' && <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_0%,rgba(63,148,104,0.18),transparent_60%)]" />}
      {tone === 'dark' && <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_10%_0%,rgba(155,28,46,0.16),transparent_55%)]" />}
      <div className={`pointer-events-none absolute inset-0 -z-10 ${light ? 'grid-bg-light' : 'grid-bg'}`} aria-hidden="true" />
      <div className="container-x">
        <div className={`mb-14 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
          <Reveal>
            <p className={`eyebrow mb-5 ${light ? 'text-crimson' : 'text-crimson-light'}`}>{eyebrow}</p>
            <h2 id={`${id}-h`} className="font-display text-4xl font-light leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h2>
            {lead && <p className={`mt-6 text-base leading-relaxed sm:text-lg ${light ? 'text-charcoal/70' : 'text-bone/65'}`}>{lead}</p>}
          </Reveal>
        </div>
        {children}
      </div>
    </section>
  )
}
