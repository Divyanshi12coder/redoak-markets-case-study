import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Github } from '../ui/GithubIcon'
import { Logo } from '../ui/Logo'
import { NAV, GITHUB_APP } from '../../data/content'
import { useActiveSection } from '../../hooks/useActiveSection'

const IDS = NAV.map((n) => n.id)

export function Navbar() {
  const active = useActiveSection(IDS)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-ink/65 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" aria-label="RedOak Markets — back to top" className="rounded-lg">
          <Logo size={32} />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? 'true' : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[13px] transition-colors ${active === n.id ? 'text-white' : 'text-bone/55 hover:text-bone'}`}
              >
                {active === n.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full border border-crimson-light/40 bg-crimson/25" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{n.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={GITHUB_APP}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View RedOak Markets on GitHub"
            className="glass hidden h-10 items-center gap-2 rounded-full px-4 text-[13px] text-bone/80 transition-colors hover:text-white sm:inline-flex"
          >
            <Github size={15} aria-hidden="true" /> GitHub
          </a>
          <button
            type="button"
            className="glass inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-b border-white/10 bg-ink/95 px-5 pb-6 pt-2 backdrop-blur-xl lg:hidden"
          >
            <ul className="grid grid-cols-2 gap-2">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === n.id ? 'true' : undefined}
                    className={`block rounded-xl border px-4 py-3 text-sm ${active === n.id ? 'border-crimson-light/50 bg-crimson/20 text-white' : 'border-white/10 text-bone/70'}`}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li className="col-span-2">
                <a href={GITHUB_APP} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-bone/80">
                  <Github size={15} aria-hidden="true" /> View on GitHub
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
