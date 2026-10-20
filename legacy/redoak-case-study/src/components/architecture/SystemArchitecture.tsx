import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

function Chip({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'crimson' | 'green' }) {
  const t = { neutral: 'border-white/15 text-bone/75', crimson: 'border-crimson-light/40 text-bone bg-crimson/15', green: 'border-forest-light/40 text-bone bg-forest-light/10' }[tone]
  return <span className={`rounded-md border px-2.5 py-1 font-mono text-[11px] ${t}`}>{children}</span>
}

function Box({ title, sub, children, className = '', delay = 0 }: { title: string; sub?: string; children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay }}
      className={`glass rounded-2xl p-5 ${className}`}
    >
      <p className="eyebrow text-crimson-light">{title}</p>
      {sub && <p className="mt-1 text-xs text-bone/45">{sub}</p>}
      <div className="mt-4 flex flex-wrap gap-2">{children}</div>
    </motion.div>
  )
}

/** Connector that draws itself when scrolled into view, with a travelling dash. */
function Link({ label, horizontal, delay = 0 }: { label: string; horizontal?: boolean; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <div className={`relative flex items-center justify-center ${horizontal ? 'hidden lg:flex lg:h-full lg:min-h-[60px] lg:w-20' : 'h-14'}`}>
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : horizontal ? { scaleX: 0 } : { scaleY: 0 }}
        whileInView={horizontal ? { scaleX: 1 } : { scaleY: 1 }}
        viewport={{ once: true, margin: '-5% 0px' }}
        transition={{ duration: 0.8, delay }}
        className={`${horizontal ? 'h-px w-full origin-left' : 'h-full w-px origin-top'} bg-gradient-to-r from-crimson-light to-forest-light`}
      />
      <span className={`absolute rounded-full border border-white/10 bg-ink px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-bone/50 ${horizontal ? '-top-3' : 'left-1/2 ml-3 -translate-x-0'}`}>{label}</span>
    </div>
  )
}

export function SystemArchitecture() {
  return (
    <div className="grid gap-0 lg:grid-cols-[1fr_auto_0.8fr] lg:items-stretch">
      <div className="flex flex-col">
        <Box title="Frontend" sub="Deployed on Vercel" className="border-crimson-light/30">
          <Chip tone="crimson">React 19</Chip><Chip tone="crimson">TypeScript</Chip><Chip tone="crimson">Vite</Chip><Chip tone="crimson">Tailwind CSS</Chip>
          <Chip tone="crimson">Lightweight Charts</Chip><Chip tone="crimson">TanStack Query</Chip>
        </Box>
        <Link label="HTTPS · JSON · JWT" delay={0.2} />
        <Box title="Backend API" sub="Python · Docker · deployed on Render" delay={0.1} className="border-forest-light/30">
          <Chip tone="green">FastAPI</Chip><Chip tone="green">Pydantic v2</Chip><Chip tone="green">httpx</Chip><Chip tone="green">PyJWT · bcrypt</Chip>
          <div className="mt-2 grid w-full gap-2 sm:grid-cols-2">
            {[
              ['Data', 'Pandas · NumPy'],
              ['ML', 'scikit-learn · joblib'],
              ['Dia', 'templated + optional LLM'],
              ['Cache', 'TTL cache · stale-on-error'],
            ].map(([a, b]) => (
              <div key={a} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"><p className="font-mono text-[10px] uppercase tracking-widest text-bone/40">{a}</p><p className="text-xs text-bone/80">{b}</p></div>
            ))}
          </div>
        </Box>
        <Link label="SQLAlchemy 2" delay={0.3} />
        <Box title="Persistence" sub="PostgreSQL in production · SQLite locally" delay={0.2}>
          <Chip>SQLAlchemy 2</Chip><Chip>Alembic migrations</Chip><Chip>Watchlists</Chip><Chip>Analysis history</Chip><Chip>Model metadata</Chip>
        </Box>
      </div>

      <Link label="REST" horizontal delay={0.4} />

      <div className="mt-6 flex flex-col gap-6 lg:mt-0 lg:justify-between">
        <Box title="Market data" sub="Provider abstraction with demo fallback" delay={0.15}>
          <Chip tone="green">Demo provider (default)</Chip><Chip tone="green">Twelve Data</Chip>
        </Box>
        <Box title="AI layer" sub="Optional" delay={0.25}>
          <Chip>LLM (optional)</Chip><Chip>Fact-checked output</Chip>
        </Box>
        <Box title="Infrastructure & delivery" delay={0.3}>
          <Chip>Docker Compose</Chip><Chip>nginx</Chip><Chip>GitHub Actions</Chip><Chip>Vercel</Chip><Chip>Render</Chip>
        </Box>
      </div>
    </div>
  )
}
