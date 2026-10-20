import type { ReactNode } from 'react'
import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  children,
  align = 'left',
  dark,
  id,
}: {
  eyebrow: string
  title: string
  children?: ReactNode
  align?: 'left' | 'center'
  dark?: boolean
  id?: string
}) {
  return (
    <Reveal className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} ${dark ? 'on-dark' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className={`mt-4 text-3xl leading-[1.1] sm:text-4xl lg:text-5xl ${dark ? 'text-white' : 'text-midnight'}`}>
        {title}
      </h2>
      {children && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-grey-cool' : 'text-midnight/70'}`}>{children}</p>
      )}
    </Reveal>
  )
}
