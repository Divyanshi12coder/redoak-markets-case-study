import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string
  onNavigate?: () => void
}

/**
 * Handles three link kinds:
 *  - "#section"  → smooth-scrolls on the home page, or routes home first from other pages
 *  - "/path"     → client-side route
 *  - anything else (https:, mailto:) → normal anchor
 */
export default function SmartLink({ href, onNavigate, onClick, children, ...rest }: Props) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  if (href.startsWith('#')) {
    const handle = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e)
      if (e.defaultPrevented) return
      e.preventDefault()
      onNavigate?.()
      const id = href.slice(1)
      if (pathname === '/') {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
        history.replaceState(null, '', `${import.meta.env.BASE_URL}${href}`)
      } else {
        navigate({ pathname: '/', hash: href })
      }
    }
    return (
      <a href={`${import.meta.env.BASE_URL}${href}`} onClick={handle} {...rest}>
        {children}
      </a>
    )
  }
  if (href.startsWith('/')) {
    return (
      <Link to={href} onClick={(e) => { onClick?.(e); onNavigate?.() }} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} onClick={onClick} {...rest}>
      {children}
    </a>
  )
}
