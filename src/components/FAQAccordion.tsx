import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import type { FAQ } from '../data/faqs'

export default function FAQAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const base = useId()
  return (
    <div className="divide-y divide-midnight/10 rounded-2xl border border-midnight/10 bg-white shadow-card">
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${base}-b${i}`
        const panelId = `${base}-p${i}`
        return (
          <div key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-bold text-midnight transition-colors hover:text-emerald-deep sm:px-7 sm:text-lg"
              >
                {item.q}
                <Plus
                  className={`h-5 w-5 shrink-0 text-emerald-deep transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 leading-relaxed text-midnight/70 sm:px-7">{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
