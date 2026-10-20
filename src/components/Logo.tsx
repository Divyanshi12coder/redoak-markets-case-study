import { site } from '../config/site'
import SmartLink from './SmartLink'

export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" rx="16" fill="#171C26" stroke="#ffffff22" />
      <path d="M18 44 L30 30 L38 37 L48 22" fill="none" stroke="#62B69A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="48" cy="22" r="4" fill="#F7F7F2" />
    </svg>
  )
}

export default function Logo({ dark = true, onNavigate }: { dark?: boolean; onNavigate?: () => void }) {
  return (
    <SmartLink href="/" onNavigate={onNavigate} aria-label={`${site.name} home`} className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className={`text-lg font-extrabold tracking-tight ${dark ? 'text-white' : 'text-midnight'}`}>
        {site.shortName}
        <span className="font-medium text-grey-cool"> Digital</span>
      </span>
    </SmartLink>
  )
}
