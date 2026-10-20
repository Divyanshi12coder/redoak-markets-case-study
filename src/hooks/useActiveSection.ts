import { useEffect, useState } from 'react'

/** Returns the id of the section currently crossing the upper-middle of the viewport. */
export function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState('')
  const key = ids.join('|')
  useEffect(() => {
    if (!enabled) {
      setActive('')
      return
    }
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    const onTop = () => window.scrollY < 200 && setActive('')
    window.addEventListener('scroll', onTop, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onTop)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled])
  return active
}
