import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Renders children at a fixed design width and scales them to fit the parent. Content is non-interactive. */
export function ScaledFrame({ designWidth, maxHeight, children }: { designWidth: number; maxHeight?: number; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.5)
  const [h, setH] = useState(400)

  useEffect(() => {
    const o = outer.current
    const i = inner.current
    if (!o || !i) return
    i.setAttribute('inert', '')
    const measure = () => {
      setScale(o.clientWidth / designWidth)
      setH(i.scrollHeight)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(o)
    ro.observe(i)
    return () => ro.disconnect()
  }, [designWidth])

  const shown = maxHeight ? Math.min(h, maxHeight) : h
  return (
    <div ref={outer} className="relative w-full overflow-hidden" style={{ height: shown * scale }} aria-hidden="true">
      <div ref={inner} className="absolute left-0 top-0" style={{ width: designWidth, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  )
}
