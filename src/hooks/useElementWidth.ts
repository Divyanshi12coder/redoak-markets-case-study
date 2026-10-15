import { useEffect, useRef, useState } from 'react'

/** Measures an element's content width (container-query style layout switching). */
export function useElementWidth<T extends HTMLElement>(initial = 1000) {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(initial)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    setWidth(el.clientWidth || initial)
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [initial])
  return [ref, width] as const
}
