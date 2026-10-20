import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { IllustrativeTag } from '../ui/Tag'
import { DashboardMock } from './DashboardMock'
import { LIVE_APP } from '../../data/content'
import { ExternalLink } from 'lucide-react'

export function Dashboard() {
  return (
    <Section
      id="product"
      tone="dark"
      eyebrow="03 — The Product"
      title={<>The interface, <em className="text-gradient-crimson">in motion.</em></>}
      lead="A mockup of the RedOak Markets experience — market overview, search, watchlist, price chart, indicators, regime, anomaly signals and Dia's insight. Pick a stock from the watchlist or try the search."
    >
      <Reveal>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <IllustrativeTag>Design mockup · representative values</IllustrativeTag>
          <a href={LIVE_APP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-bone/60 underline-offset-4 hover:text-white hover:underline">
            See the real application <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>
        <DashboardMock />
      </Reveal>
    </Section>
  )
}
