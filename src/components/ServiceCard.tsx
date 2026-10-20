import { Check } from 'lucide-react'
import type { Service } from '../data/services'
import { prefillService } from '../lib/prefill'
import ServiceVisual from '../visuals/ServiceVisual'
import Button from './Button'

export default function ServiceCard({ service, featured }: { service: Service; featured?: boolean }) {
  const Icon = service.icon
  return (
    <article
      className={`group card flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-lift sm:p-7 ${
        featured ? 'lg:flex-row lg:gap-10' : ''
      }`}
    >
      <div className={featured ? 'lg:w-5/12' : ''}>
        <ServiceVisual kind={service.visual} />
      </div>
      <div className={`flex flex-1 flex-col ${featured ? '' : 'mt-6'}`}>
        <div className="flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-midnight text-emerald transition-colors duration-300 group-hover:bg-emerald group-hover:text-midnight">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-sm font-bold text-midnight/30">{service.number}</span>
        </div>
        <h3 className="mt-5 text-xl">{service.title}</h3>
        <p className="mt-2 leading-relaxed text-midnight/70">{service.description}</p>
        <ul className="mt-5 space-y-2.5">
          {service.capabilities.map((c) => (
            <li key={c} className="flex gap-2.5 text-[0.95rem] text-midnight/80">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-deep" aria-hidden />
              {c}
            </li>
          ))}
        </ul>
        {service.note && <p className="mt-5 rounded-lg bg-midnight/[0.04] p-3 text-sm leading-relaxed text-midnight/65">{service.note}</p>}
        <div className="mt-auto pt-6">
          <Button href="#contact" variant="secondary" arrow onNavigate={() => prefillService(service.interest)}>
            Discuss this service
          </Button>
        </div>
      </div>
    </article>
  )
}
