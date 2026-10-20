import { useEffect, useRef, useState } from 'react'

export function useInViewOnce<T extends Element>(margin = '-10% 0px') {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true)
        obs.disconnect()
      }
    }, { rootMargin: margin })
    obs.observe(el)
    return () => obs.disconnect()
  }, [seen, margin])
  return [ref, seen] as const
}
