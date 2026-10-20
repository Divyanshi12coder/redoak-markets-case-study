import { Mail } from 'lucide-react'
import { Instagram, Linkedin } from './SocialIcons'
import { site, socialLinks } from '../config/site'
import { services } from '../data/services'
import Logo from './Logo'
import SmartLink from './SmartLink'

const icons = { linkedin: Linkedin, instagram: Instagram }

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="on-dark bg-midnight text-grey-cool">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs leading-relaxed">{site.description}</p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">Navigate</h2>
            <ul className="mt-5 space-y-3">
              {site.nav.map((n) => (
                <li key={n.href}>
                  <SmartLink href={n.href} className="transition-colors hover:text-emerald">
                    {n.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <SmartLink href="#services" className="transition-colors hover:text-emerald">
                    {s.title}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">Contact</h2>
            <ul className="mt-5 space-y-3">
              <li>
                {site.email ? (
                  <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-emerald">
                    <Mail className="h-4 w-4" aria-hidden /> {site.email}
                  </a>
                ) : (
                  <SmartLink href="#contact" className="inline-flex items-center gap-2 transition-colors hover:text-emerald">
                    <Mail className="h-4 w-4" aria-hidden /> Send us an enquiry
                  </SmartLink>
                )}
              </li>
              {socialLinks.map((s) => {
                const Icon = icons[s.key]
                return (
                  <li key={s.key}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-emerald">
                      <Icon className="h-4 w-4" aria-hidden /> {s.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-grey-cool/80">Thoughtfully built for ambitious businesses.</p>
        </div>
      </div>
    </footer>
  )
}
