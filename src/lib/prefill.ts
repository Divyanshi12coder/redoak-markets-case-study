/** Tiny pub/sub so CTAs elsewhere on the page can preselect the contact form's service. */
let pending = ''
const EVENT = 'growthora:prefill'

export function prefillService(value: string) {
  pending = value
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }))
}

export function takePrefill() {
  const v = pending
  return v
}

export function onPrefill(cb: (value: string) => void) {
  const h = (e: Event) => cb((e as CustomEvent<string>).detail)
  window.addEventListener(EVENT, h)
  return () => window.removeEventListener(EVENT, h)
}
