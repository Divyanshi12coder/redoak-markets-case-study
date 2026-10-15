/**
 * Representative, seeded, synthetic market data used ONLY for the case-study visuals.
 * Nothing here is live or real market data.
 */
export interface Bar { i: number; close: number; high: number; low: number; volume: number }

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const ANOMALY_IDX = [58, 96, 131]

export function makeSeries(n = 160, seed = 7): Bar[] {
  const rnd = mulberry32(seed)
  const out: Bar[] = []
  let p = 100
  for (let i = 0; i < n; i++) {
    const drift = i < 50 ? 0.12 : i < 100 ? -0.02 : 0.18
    let shock = (rnd() - 0.5) * 2.2
    let vol = 1 + rnd() * 0.6
    if (i === ANOMALY_IDX[0]) { shock = -6.5; vol = 3.4 }
    if (i === ANOMALY_IDX[1]) { shock = 5.2; vol = 2.9 }
    if (i === ANOMALY_IDX[2]) { shock = (rnd() - 0.5) * 2; vol = 3.8 }
    const prev = p
    p = Math.max(20, p + drift + shock)
    const range = Math.abs(shock) * 0.4 + 0.6 + rnd() * 0.8
    out.push({ i, close: p, high: Math.max(p, prev) + range, low: Math.min(p, prev) - range, volume: vol })
  }
  return out
}

export function sma(v: number[], n: number): (number | null)[] {
  return v.map((_, i) => (i < n - 1 ? null : v.slice(i - n + 1, i + 1).reduce((a, b) => a + b, 0) / n))
}

export function ema(v: number[], n: number): (number | null)[] {
  const k = 2 / (n + 1)
  const out: (number | null)[] = []
  let prev: number | null = null
  v.forEach((x, i) => {
    if (i < n - 1) { out.push(null); return }
    prev = prev === null ? v.slice(0, n).reduce((a, b) => a + b, 0) / n : x * k + prev * (1 - k)
    out.push(prev)
  })
  return out
}

export function rsi(v: number[], n = 14): (number | null)[] {
  const out: (number | null)[] = Array(v.length).fill(null)
  let g = 0
  let l = 0
  for (let i = 1; i < v.length; i++) {
    const d = v[i] - v[i - 1]
    const up = Math.max(d, 0)
    const dn = Math.max(-d, 0)
    if (i <= n) {
      g += up
      l += dn
      if (i === n) { g /= n; l /= n }
    } else {
      g = (g * (n - 1) + up) / n
      l = (l * (n - 1) + dn) / n
    }
    if (i >= n) out[i] = l === 0 ? 100 : 100 - 100 / (1 + g / l)
  }
  return out
}

export function macd(v: number[]) {
  const f = ema(v, 12)
  const s = ema(v, 26)
  const line = v.map((_, i) => (f[i] !== null && s[i] !== null ? (f[i] as number) - (s[i] as number) : null))
  const valid = line.filter((x): x is number => x !== null)
  const sigVals = ema(valid, 9)
  const off = line.length - valid.length
  const signal = line.map((_, i) => (i < off ? null : sigVals[i - off]))
  const hist = line.map((x, i) => (x !== null && signal[i] !== null ? x - (signal[i] as number) : null))
  return { line, signal, hist }
}

export function bollinger(v: number[], n = 20, k = 2) {
  const mid = sma(v, n)
  const up: (number | null)[] = []
  const lo: (number | null)[] = []
  v.forEach((_, i) => {
    if (mid[i] === null) { up.push(null); lo.push(null); return }
    const w = v.slice(i - n + 1, i + 1)
    const m = mid[i] as number
    const sd = Math.sqrt(w.reduce((a, b) => a + (b - m) ** 2, 0) / n)
    up.push(m + k * sd)
    lo.push(m - k * sd)
  })
  return { mid, up, lo }
}

export function atr(bars: Bar[], n = 14): (number | null)[] {
  const tr = bars.map((b, i) =>
    i === 0 ? b.high - b.low : Math.max(b.high - b.low, Math.abs(b.high - bars[i - 1].close), Math.abs(b.low - bars[i - 1].close)),
  )
  return sma(tr, n)
}

export function toPath(vals: (number | null)[], x: (i: number) => number, y: (v: number) => number) {
  let d = ''
  let pen = false
  vals.forEach((v, i) => {
    if (v === null) return
    d += `${pen ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`
    pen = true
  })
  return d
}
