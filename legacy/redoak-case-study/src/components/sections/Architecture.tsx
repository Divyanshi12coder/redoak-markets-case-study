import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { SystemArchitecture } from '../architecture/SystemArchitecture'
import { DataFlow } from '../architecture/DataFlow'
import { chapter } from '../../data/content'

export function Architecture() {
  return (
    <>
      <Section
        id="architecture"
        tone="dark"
        eyebrow={chapter(8)}
        title={<>A modular stack, <em className="text-gradient-crimson">end to end.</em></>}
        lead="A typed React frontend, a FastAPI service doing the quantitative work, and a database abstraction that runs on SQLite locally and PostgreSQL in production. Connections draw themselves as you scroll."
      >
        <SystemArchitecture />
        <Reveal className="mt-12">
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-bone/60">
            <span className="font-medium text-bone/85">This case-study site</span> is a separate project — React, TypeScript, Vite, Tailwind CSS, Framer Motion, Recharts and Lucide. Its charts use representative, seeded demo data; the application uses TradingView Lightweight Charts.
          </p>
        </Reveal>
      </Section>

      <Section
        id="dataflow"
        tone="green"
        eyebrow="08 — Architecture · Data flow"
        title={<>One request, <em className="text-gradient-crimson">ten stages.</em></>}
        lead="Follow a ticker search from the user's keystroke to an interactive visualization."
      >
        <DataFlow />
      </Section>
    </>
  )
}
