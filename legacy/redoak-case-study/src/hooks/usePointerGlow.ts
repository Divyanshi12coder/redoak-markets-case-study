import { useCallback, type PointerEvent } from 'react'

/** Sets --mx/--my CSS vars on the element so CSS radial gradients can follow the cursor. */
export function usePointerGlow() {
  return useCallback((e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])
}
