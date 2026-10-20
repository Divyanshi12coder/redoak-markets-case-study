import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import SmartLink from './SmartLink'

type Variant = 'primary' | 'secondary' | 'secondary-dark' | 'dark' | 'ghost'

const variants: Record<Variant, string> = {
  primary: 'bg-emerald text-midnight hover:bg-[#74c4a9] shadow-[0_10px_30px_-12px_rgba(98,182,154,0.8)]',
  secondary: 'border border-midnight/20 text-midnight hover:border-midnight hover:bg-midnight hover:text-white',
  'secondary-dark': 'border border-white/25 text-white hover:border-white hover:bg-white/10',
  dark: 'bg-midnight text-white hover:bg-charcoal',
  ghost: 'text-midnight hover:text-emerald-deep',
}

interface Common {
  variant?: Variant
  arrow?: boolean
  className?: string
  children: ReactNode
}
type AsLink = Common & { href: string; onNavigate?: () => void } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Common>
type AsButton = Common & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(props: AsLink | AsButton) {
  const { variant = 'primary', arrow, className = '', children } = props
  const cls = `group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold transition duration-300 active:scale-[0.98] ${variants[variant]} ${className}`
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />}
    </>
  )
  if (props.href !== undefined) {
    return (
      <SmartLink href={props.href} onNavigate={props.onNavigate} className={cls}>
        {inner}
      </SmartLink>
    )
  }
  const { variant: _v, arrow: _a, className: _c, children: _ch, href: _h, ...rest } = props as AsButton
  void _v; void _a; void _c; void _ch; void _h
  return (
    <button type="button" className={cls} {...rest}>
      {inner}
    </button>
  )
}
