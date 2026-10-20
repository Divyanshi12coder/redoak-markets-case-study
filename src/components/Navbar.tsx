import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { site } from '../config/site'
import { useActiveSection } from '../hooks/useActiveSection'
import Button from './Button'
import Logo from './Logo'
import SmartLink from './SmartLink'

const ids = site.nav.map((n) => n.href.slice(1))

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(ids, pathname === '/')

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-white/10 bg-midnight/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between lg:h-[4.5rem]">
        <Logo onNavigate={() => setOpen(false)} />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((n) => {
            const isActive = active === n.href.slice(1)
            return (
              <SmartLink
                key={n.href}
                href={n.href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive ? 'text-white' : 'text-grey-cool hover:text-white'
                }`}
              >
                {n.label}
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded bg-emerald transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </SmartLink>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="#contact" className="hidden !min-h-[42px] !px-5 !py-2 text-sm sm:inline-flex">
            Let’s Talk
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto bg-midnight lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex flex-col py-6">
          {site.nav.map((n) => (
            <SmartLink
              key={n.href}
              href={n.href}
              onNavigate={() => setOpen(false)}
              className="border-b border-white/10 py-5 text-2xl font-bold text-white"
            >
              {n.label}
            </SmartLink>
          ))}
          <Button href="#contact" onNavigate={() => setOpen(false)} className="mt-8" arrow>
            Let’s Talk
          </Button>
        </nav>
      </div>
    </header>
  )
}
