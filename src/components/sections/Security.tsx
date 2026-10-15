import { Database, Gauge, Globe, KeyRound, LifeBuoy, ListChecks, Lock, RefreshCw, TriangleAlert, type LucideIcon } from 'lucide-react'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { StatusTag } from '../ui/Tag'

type Kind = 'implemented' | 'consideration'
const ITEMS: { t: string; d: string; k: Kind; icon: LucideIcon }[] = [
  { t: 'Environment variables', d: 'Secrets and provider keys are read from the environment; .env files are git-ignored.', k: 'implemented', icon: Lock },
  { t: 'JWT authentication', d: 'Tokens require exp, sub and typ claims; passwords are hashed with bcrypt; a strong secret is enforced in production.', k: 'implemented', icon: KeyRound },
  { t: 'CORS configuration', d: 'An explicit origin allow-list — no wildcard — plus security headers.', k: 'implemented', icon: Globe },
  { t: 'API validation', d: 'Pydantic models on every route and a whitelist pattern for tickers.', k: 'implemented', icon: ListChecks },
  { t: 'Database abstraction', d: 'SQLAlchemy 2 with parameterised ORM queries only; Alembic migrations; SQLite locally, PostgreSQL in production.', k: 'implemented', icon: Database },
  { t: 'Rate limiting', d: 'Signup and login are rate-limited and provider rate limits are handled. Broader per-client API throttling is a design consideration.', k: 'consideration', icon: Gauge },
  { t: 'Error handling', d: 'Typed error responses and graceful skeleton/empty states on the client.', k: 'implemented', icon: TriangleAlert },
  { t: 'Caching', d: 'Server-side market-data cache with a one-hour TTL and stale-on-error fallback.', k: 'implemented', icon: RefreshCw },
  { t: 'Provider fallback / demo mode', d: 'Seeded synthetic data is the default and is labelled "DEMO DATA"; Twelve Data is opt-in via API key.', k: 'implemented', icon: LifeBuoy },
]

export function Security() {
  return (
    <Section
      id="reliability"
      tone="green"
      eyebrow="08 — Architecture · Security & reliability"
      title={<>Built to fail <em className="text-gradient-crimson">gracefully.</em></>}
      lead="Each item is labelled by what the application documents today and what remains an architectural consideration. Nothing here is claimed beyond that."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((it, i) => {
          const Icon = it.icon
          return (
            <Reveal key={it.t} delay={(i % 3) * 0.06}>
              <div className="glass group h-full rounded-2xl p-6 transition-colors hover:border-forest-light/50">
                <div className="flex items-start justify-between gap-3">
                  <Icon size={22} className="text-forest-light transition-transform group-hover:scale-110" aria-hidden="true" />
                  <StatusTag kind={it.k} />
                </div>
                <h3 className="font-display mt-5 text-xl">{it.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone/60">{it.d}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
      <p className="mt-8 text-xs text-bone/40">Source: the application's README. See the repository for the authoritative, current implementation.</p>
    </Section>
  )
}
