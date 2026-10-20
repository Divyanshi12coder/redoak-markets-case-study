// Generates the README / docs SVG visuals into public/assets. Run: node scripts/generate-assets.mjs
// All series are seeded synthetic data — representative, not live market data.
import { mkdirSync, writeFileSync } from 'node:fs'

const OUT = new URL('../public/assets/', import.meta.url)
mkdirSync(OUT, { recursive: true })

const C = { ink: '#0d0b0b', panel: '#140a0d', crimson: '#9b1c2e', crimsonL: '#c2334a', rose: '#e0546b', wine: '#4a0e1a', forest: '#1f5a3d', forestL: '#3f9468', bone: '#f6f2ec', amber: '#e8c27a' }
const FONT = `font-family="Inter, Segoe UI, Arial, sans-serif"`
const MONO = `font-family="JetBrains Mono, Consolas, monospace"`
const SERIF = `font-family="Fraunces, Georgia, serif"`

function rnd(seed) {
  let a = seed
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
function series(n, seed, drift = 0.1) {
  const r = rnd(seed); let p = 100
  return Array.from({ length: n }, () => (p += drift + (r() - 0.5) * 2.4))
}
function pathOf(vals, w, h, x0 = 0, y0 = 0, pad = 0.1) {
  const lo = Math.min(...vals), hi = Math.max(...vals)
  return vals.map((v, i) => `${i ? 'L' : 'M'}${(x0 + (i / (vals.length - 1)) * w).toFixed(1)},${(y0 + h - ((v - lo) / (hi - lo)) * h * (1 - pad) - h * pad / 2).toFixed(1)}`).join('')
}
function sma(v, n) { return v.map((_, i) => (i < n - 1 ? null : v.slice(i - n + 1, i + 1).reduce((a, b) => a + b) / n)) }
function pathOfNullable(vals, w, h, lo, hi, x0 = 0, y0 = 0) {
  let d = '', pen = false
  vals.forEach((v, i) => { if (v === null) return; d += `${pen ? 'L' : 'M'}${(x0 + (i / (vals.length - 1)) * w).toFixed(1)},${(y0 + h - ((v - lo) / (hi - lo)) * h).toFixed(1)}`; pen = true })
  return d
}
const logo = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect width="64" height="64" rx="16" fill="${C.panel}" stroke="rgba(255,255,255,.14)"/><path d="M32 7c-5 0-8 3-9 6-5 0-9 4-9 9 0 4 2 7 5 8 1 4 5 6 8 5 2 2 8 2 10 0 3 1 7-1 8-5 3-1 5-4 5-8 0-5-4-9-9-9-1-3-4-6-9-6z" fill="url(#lg)"/><path d="M32 58V38M32 46l-8-6M32 42l8-7" stroke="#e8dfd2" stroke-width="2.6" stroke-linecap="round" fill="none"/><path d="M19 28l6-5 5 4 6-8 9 7" stroke="${C.bone}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="46" cy="26" r="2.8" fill="${C.forestL}"/></g>`
const defs = `<defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.crimsonL}"/><stop offset="1" stop-color="${C.wine}"/></linearGradient><radialGradient id="glow"><stop offset="0" stop-color="${C.crimson}" stop-opacity=".55"/><stop offset="1" stop-color="${C.crimson}" stop-opacity="0"/></radialGradient><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.crimsonL}" stop-opacity=".35"/><stop offset="1" stop-color="${C.crimsonL}" stop-opacity="0"/></linearGradient><pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="rgba(255,255,255,.04)"/></pattern></defs>`
const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${defs}<rect width="${w}" height="${h}" fill="${C.ink}"/>${body}</svg>`
const save = (name, s) => writeFileSync(new URL(name, OUT), s)

/* ---------- 1. hero banner ---------- */
{
  const W = 1600, H = 560
  const s = series(80, 21, 0.18)
  const d = pathOf(s, W, 300, 0, 230)
  const avg = pathOfNullable(sma(s, 10), W, 300, Math.min(...s), Math.max(...s), 0, 230)
  const candles = series(46, 5, 0.05).map((v, i, a) => {
    const x = 60 + i * 34, o = a[i - 1] ?? v, hh = Math.max(o, v) + 2, ll = Math.min(o, v) - 2
    const sc = (q) => 520 - ((q - 95) / 60) * 260
    const c = v >= o ? C.forestL : C.crimson
    return `<g stroke="${c}" fill="${c}" opacity=".35"><line x1="${x + 6}" x2="${x + 6}" y1="${sc(hh)}" y2="${sc(ll)}"/><rect x="${x}" y="${Math.min(sc(o), sc(v))}" width="12" height="${Math.max(3, Math.abs(sc(o) - sc(v)))}"/></g>`
  }).join('')
  save('hero-banner.svg', svg(W, H, `
<rect width="${W}" height="${H}" fill="url(#grid)"/><circle cx="1250" cy="120" r="420" fill="url(#glow)"/>
${candles}<path d="${d}L${W},${H}L0,${H}Z" fill="url(#fill)"/><path d="${d}" fill="none" stroke="${C.rose}" stroke-width="10" opacity=".35"/><path d="${d}" fill="none" stroke="${C.bone}" stroke-width="3" stroke-linejoin="round"/><path d="${avg}" fill="none" stroke="${C.forestL}" stroke-width="2" stroke-dasharray="6 8"/>
${logo(90, 96, 1.4)}
<text x="196" y="150" ${FONT} font-size="30" fill="${C.bone}">RedOak <tspan fill="${C.crimsonL}">Markets</tspan></text>
<text x="90" y="260" ${SERIF} font-size="82" fill="${C.bone}" font-weight="300">See the market.</text>
<text x="90" y="350" ${SERIF} font-size="82" fill="${C.rose}" font-style="italic" font-weight="300">Understand the trend.</text>
<text x="92" y="404" ${FONT} font-size="22" fill="rgba(246,242,236,.6)">Technical intelligence · ML regime classification · Anomaly detection · Dia, the AI analyst</text>
<rect x="90" y="440" width="300" height="34" rx="17" fill="rgba(155,28,46,.25)" stroke="${C.crimsonL}"/><text x="240" y="462" ${MONO} font-size="13" letter-spacing="2" text-anchor="middle" fill="${C.bone}">CASE STUDY · REPRESENTATIVE DATA</text>`))
}

/* ---------- 2. architecture ---------- */
{
  const W = 1400, H = 760
  const box = (x, y, w, h, title, items, col) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="rgba(255,255,255,.04)" stroke="${col}" stroke-opacity=".5"/><text x="${x + 24}" y="${y + 36}" ${MONO} font-size="13" letter-spacing="3" fill="${col}">${title}</text>${items.map((t, i) => `<text x="${x + 24}" y="${y + 70 + i * 26}" ${FONT} font-size="17" fill="rgba(246,242,236,.82)">${t}</text>`).join('')}`
  const arrow = (x1, y1, x2, y2, label) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${C.crimsonL}" stroke-width="2" stroke-dasharray="6 6"/><circle cx="${x2}" cy="${y2}" r="5" fill="${C.crimsonL}"/>${label ? `<text x="${(x1 + x2) / 2 + 14}" y="${(y1 + y2) / 2 + 5}" ${MONO} font-size="12" fill="rgba(246,242,236,.55)">${label}</text>` : ''}`
  save('architecture.svg', svg(W, H, `<rect width="${W}" height="${H}" fill="url(#grid)"/>
<text x="60" y="64" ${SERIF} font-size="40" fill="${C.bone}" font-weight="300">System architecture</text>
${box(60, 110, 620, 170, 'FRONTEND · VERCEL', ['React 19 · TypeScript · Vite · Tailwind CSS', 'TradingView Lightweight Charts · TanStack Query'], C.rose)}
${box(60, 350, 620, 190, 'BACKEND · FASTAPI · RENDER (DOCKER)', ['Pydantic v2 · JWT + bcrypt · httpx', 'Pandas / NumPy → indicators → features', 'scikit-learn: Random Forest + Isolation Forest', 'Dia: templated summary + optional LLM'], C.forestL)}
${box(60, 610, 620, 120, 'PERSISTENCE', ['SQLAlchemy 2 · Alembic · PostgreSQL / SQLite'], C.amber)}
${box(800, 110, 540, 170, 'MARKET DATA', ['Demo provider (seeded, default)', 'Twelve Data (API key, optional)'], C.forestL)}
${box(800, 350, 540, 120, 'AI LAYER · OPTIONAL', ['LLM for Dia — fact-checked output'], C.rose)}
${box(800, 540, 540, 190, 'DELIVERY', ['Docker Compose · nginx', 'GitHub Actions', 'Vercel (frontend) · Render (backend)'], C.amber)}
${arrow(370, 280, 370, 350, 'HTTPS · JSON · JWT')}${arrow(370, 540, 370, 610, 'SQLAlchemy')}${arrow(680, 440, 800, 195, '')}${arrow(680, 460, 800, 410, '')}`))
}

/* ---------- 3. dashboard preview ---------- */
function dashboard(W, H, mobile = false) {
  const s = series(64, 41, 0.12)
  const chart = (x, y, w, h) => {
    const lo = Math.min(...s) - 2, hi = Math.max(...s) + 2
    const sc = (v) => y + h - ((v - lo) / (hi - lo)) * h
    const cs = s.map((v, i) => {
      const o = s[i - 1] ?? v - 0.5, cx = x + (i / 63) * w, col = v >= o ? C.forestL : C.crimson
      return `<g stroke="${col}" fill="${col}"><line x1="${cx}" x2="${cx}" y1="${sc(Math.max(o, v) + 0.8)}" y2="${sc(Math.min(o, v) - 0.8)}"/><rect x="${cx - 2.6}" y="${Math.min(sc(o), sc(v))}" width="5.2" height="${Math.max(1.5, Math.abs(sc(o) - sc(v)))}"/></g>`
    }).join('')
    return cs + `<path d="${pathOfNullable(sma(s, 10), w, h, lo, hi, x, y)}" fill="none" stroke="${C.amber}" stroke-width="1.6"/>`
  }
  const panel = (x, y, w, h, t) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="rgba(255,255,255,.035)" stroke="rgba(255,255,255,.1)"/><text x="${x + 14}" y="${y + 22}" ${MONO} font-size="10" letter-spacing="2" fill="rgba(246,242,236,.5)">${t.toUpperCase()}</text>`
  const rows = ['AAPL', 'MSFT', 'NVDA', 'AMZN', 'GOOGL', 'META', 'TSLA']
  const head = `<rect x="0" y="0" width="${W}" height="54" fill="rgba(255,255,255,.03)"/>${logo(16, 11, 0.5)}<text x="56" y="33" ${SERIF} font-size="16" fill="${C.bone}">RedOak <tspan fill="${C.crimsonL}">Markets</tspan></text><rect x="${W - (mobile ? 0 : 340)}" y="14" width="${mobile ? 0 : 220}" height="26" rx="13" fill="rgba(255,255,255,.06)"/><text x="${W - 322}" y="31" ${FONT} font-size="11" fill="rgba(246,242,236,.35)">${mobile ? '' : 'Search ticker or company'}</text><rect x="${W - (mobile ? 90 : 100)}" y="16" width="80" height="22" rx="11" fill="rgba(232,194,122,.08)" stroke="rgba(232,194,122,.4)"/><text x="${W - (mobile ? 50 : 60)}" y="31" ${MONO} font-size="9" letter-spacing="1.5" text-anchor="middle" fill="${C.amber}">DEMO DATA</text>`
  if (mobile) {
    return svg(W, H, `${head}${panel(14, 70, W - 28, 250, 'NVDA · price & indicators')}${chart(30, 100, W - 60, 190)}${panel(14, 332, W - 28, 100, 'Market regime')}<text x="30" y="378" ${SERIF} font-size="26" fill="${C.forestL}">BULLISH</text><rect x="30" y="396" width="${(W - 60) * 0.58}" height="8" rx="4" fill="${C.forestL}"/><rect x="30" y="410" width="${(W - 60) * 0.27}" height="8" rx="4" fill="${C.amber}"/>${panel(14, 444, W - 28, 120, 'Dia · insight')}<text x="30" y="500" ${FONT} font-size="13" fill="rgba(246,242,236,.8)">Momentum is strengthening.</text><text x="30" y="522" ${FONT} font-size="11" fill="rgba(246,242,236,.4)">Illustrative · not advice</text>${panel(14, 576, W - 28, 150, 'Watchlist')}${rows.slice(0, 4).map((r, i) => `<text x="30" y="${620 + i * 26}" ${MONO} font-size="12" fill="${C.bone}">${r}</text><path d="${pathOf(series(20, 3 + i * 7), 60, 14, W - 130, 608 + i * 26)}" fill="none" stroke="${i % 3 === 2 ? C.crimsonL : C.forestL}" stroke-width="1.4"/>`).join('')}`)
  }
  return svg(W, H, `${head}
${[['SPY', '+0.42%'], ['QQQ', '+0.71%'], ['DIA', '-0.18%'], ['IWM', '+0.09%']].map(([t, v], i) => `<rect x="${20 + i * ((W - 40) / 4)}" y="68" width="${(W - 40) / 4 - 10}" height="46" rx="10" fill="rgba(255,255,255,.035)" stroke="rgba(255,255,255,.1)"/><text x="${34 + i * ((W - 40) / 4)}" y="87" ${MONO} font-size="10" fill="rgba(246,242,236,.45)">${t}</text><text x="${34 + i * ((W - 40) / 4)}" y="105" ${MONO} font-size="15" fill="${v[0] === '-' ? C.crimsonL : C.forestL}">${v}</text>`).join('')}
${panel(20, 130, 230, H - 150, 'Watchlist')}${rows.map((r, i) => `<rect x="30" y="${160 + i * 52}" width="210" height="44" rx="8" fill="${i === 2 ? 'rgba(155,28,46,.25)' : 'transparent'}" stroke="${i === 2 ? C.crimsonL : 'transparent'}" stroke-opacity=".5"/><text x="42" y="${180 + i * 52}" ${MONO} font-size="13" fill="${C.bone}">${r}</text><path d="${pathOf(series(24, 9 + i * 5, i === 6 ? -0.12 : 0.12), 62, 18, 120, 168 + i * 52)}" fill="none" stroke="${i === 6 ? C.crimsonL : C.forestL}" stroke-width="1.5"/>`).join('')}
${panel(266, 130, W - 266 - 290, H - 150, 'NVDA · price & indicators')}${['1M', '3M', '1Y', '5Y', 'SMA', 'EMA', 'BB', 'RSI', 'MACD'].map((t, i) => `<rect x="${282 + i * 52}" y="${156}" width="44" height="20" rx="6" fill="${i === 1 ? 'rgba(155,28,46,.4)' : 'transparent'}" stroke="${i === 4 ? C.forestL : 'rgba(255,255,255,.12)'}"/><text x="${304 + i * 52}" y="170" ${MONO} font-size="10" text-anchor="middle" fill="rgba(246,242,236,.7)">${t}</text>`).join('')}${chart(286, 200, W - 266 - 290 - 40, H - 260)}
${panel(W - 274, 130, 254, 150, 'Market regime')}<text x="${W - 258}" y="186" ${SERIF} font-size="28" fill="${C.forestL}">BULLISH</text>${[[0.58, C.forestL], [0.27, C.amber], [0.15, C.crimsonL]].map(([p, c], i) => `<rect x="${W - 258}" y="${204 + i * 20}" width="${p * 220}" height="8" rx="4" fill="${c}"/>`).join('')}
${panel(W - 274, 292, 254, 120, 'Anomaly signals')}<text x="${W - 258}" y="338" ${FONT} font-size="12" fill="rgba(246,242,236,.7)">Volume z-score</text><text x="${W - 40}" y="338" ${MONO} font-size="12" text-anchor="end" fill="${C.crimsonL}">3.2σ</text><text x="${W - 258}" y="362" ${FONT} font-size="12" fill="rgba(246,242,236,.7)">Return z-score</text><text x="${W - 40}" y="362" ${MONO} font-size="12" text-anchor="end" fill="rgba(246,242,236,.6)">0.8σ</text>
${panel(W - 274, 424, 254, H - 444, 'Dia · insight')}<text x="${W - 258}" y="470" ${FONT} font-size="13" fill="rgba(246,242,236,.8)">Momentum is strengthening.</text><text x="${W - 258}" y="494" ${FONT} font-size="11" fill="rgba(246,242,236,.4)">Illustrative · not advice</text>`)
}
save('dashboard-preview.svg', dashboard(1400, 760))
save('mobile-preview.svg', dashboard(390, 760, true))

/* ---------- 4. ML visualization ---------- */
{
  const W = 1400, H = 640
  const feats = ['RSI', 'MACD', 'Volatility', 'Momentum', 'Volume', 'MA distance', 'ATR']
  const folds = [0, 1, 2, 3].map((f) => { const tr = 260 + f * 90; const y = 190 + f * 46; return `<text x="780" y="${y + 16}" ${MONO} font-size="11" fill="rgba(246,242,236,.45)">FOLD ${f + 1}</text><rect x="850" y="${y}" width="480" height="24" rx="6" fill="rgba(255,255,255,.05)"/><rect x="850" y="${y}" width="${tr * 0.9}" height="24" rx="6" fill="${C.crimson}"/><rect x="${850 + tr * 0.9 + 4}" y="${y}" width="14" height="24" fill="rgba(255,255,255,.25)"/><rect x="${850 + tr * 0.9 + 22}" y="${y}" width="70" height="24" rx="6" fill="${C.forestL}"/>` }).join('')
  save('ml-visualization.svg', svg(W, H, `<rect width="${W}" height="${H}" fill="url(#grid)"/>
<text x="60" y="64" ${SERIF} font-size="40" fill="${C.bone}" font-weight="300">Machine-learning layer</text>
<text x="60" y="96" ${FONT} font-size="16" fill="rgba(246,242,236,.55)">Regime classification — quantitative signal, probabilistic context, not a forecast.</text>
${feats.map((f, i) => `<rect x="60" y="${130 + i * 62}" width="190" height="42" rx="21" fill="rgba(155,28,46,.2)" stroke="${C.crimsonL}" stroke-opacity=".5"/><text x="155" y="${156 + i * 62}" ${MONO} font-size="13" text-anchor="middle" fill="${C.bone}">${f}</text><path d="M250 ${151 + i * 62}C340 ${151 + i * 62} 330 320 420 320" stroke="${C.crimsonL}" stroke-opacity=".45" fill="none"/>`).join('')}
<circle cx="500" cy="320" r="90" fill="url(#glow)"/><circle cx="500" cy="320" r="62" fill="${C.panel}" stroke="${C.crimsonL}"/><text x="500" y="314" ${MONO} font-size="11" letter-spacing="2" text-anchor="middle" fill="rgba(246,242,236,.5)">RANDOM</text><text x="500" y="332" ${MONO} font-size="11" letter-spacing="2" text-anchor="middle" fill="rgba(246,242,236,.5)">FOREST</text>
<text x="660" y="296" ${MONO} font-size="11" letter-spacing="2" fill="rgba(246,242,236,.5)">REGIME PROBABILITIES (ILLUSTRATIVE)</text>
${[['BULLISH', 0.24, C.forestL], ['NEUTRAL', 0.52, C.amber], ['BEARISH', 0.24, C.crimsonL]].map(([t, p, c], i) => `<text x="660" y="${334 + i * 36}" ${MONO} font-size="12" fill="${C.bone}">${t}</text><rect x="760" y="${322 + i * 36}" width="400" height="12" rx="6" fill="rgba(255,255,255,.07)"/><rect x="760" y="${322 + i * 36}" width="${p * 400 * 1.5}" height="12" rx="6" fill="${c}"/><text x="${1180}" y="${334 + i * 36}" ${MONO} font-size="12" fill="rgba(246,242,236,.6)">${Math.round(p * 100)}%</text>`).join('')}
<text x="780" y="150" ${MONO} font-size="11" letter-spacing="2" fill="rgba(246,242,236,.5)">WALK-FORWARD VALIDATION · EXPANDING WINDOW + EMBARGO</text>${folds}
<text x="780" y="440" ${MONO} font-size="10" fill="rgba(246,242,236,.4)">■ train  ▒ embargo  ■ test (future only)</text>
<text x="660" y="470" ${FONT} font-size="14" fill="rgba(246,242,236,.5)">Compared against a naive baseline; “beats baseline” requires a meaningful margin.</text>`))
}

/* ---------- 5. technical indicators ---------- */
{
  const W = 1400, H = 640
  const s = series(150, 7, 0.08)
  const lo = Math.min(...s) - 3, hi = Math.max(...s) + 3
  const x0 = 60, w = 1280, y0 = 110, h = 340
  const m = sma(s, 20)
  const up = [], dn = []
  s.forEach((_, i) => { if (i < 19) { up.push(null); dn.push(null); return } const win = s.slice(i - 19, i + 1), mm = m[i], sd = Math.sqrt(win.reduce((a, b) => a + (b - mm) ** 2, 0) / 20); up.push(mm + 2 * sd); dn.push(mm - 2 * sd) })
  const r = rnd(4); const rsi = s.map((_, i) => 50 + Math.sin(i / 9) * 28 + (r() - 0.5) * 10)
  const rp = rsi.map((v, i) => `${i ? 'L' : 'M'}${x0 + (i / 149) * w},${500 + 100 - (v / 100) * 100}`).join('')
  save('technical-indicators.svg', svg(W, H, `<rect width="${W}" height="${H}" fill="url(#grid)"/>
<text x="60" y="56" ${SERIF} font-size="38" fill="${C.bone}" font-weight="300">Technical intelligence</text>
<text x="60" y="84" ${MONO} font-size="12" letter-spacing="2" fill="rgba(246,242,236,.45)">PRICE · SMA(20) · BOLLINGER(20, 2σ) · RSI(14) — REPRESENTATIVE DEMO DATA</text>
<path d="${pathOfNullable(up, w, h, lo, hi, x0, y0)}L${x0 + w},${y0 + h}" fill="none"/><path d="${pathOfNullable(up, w, h, lo, hi, x0, y0)}" fill="none" stroke="${C.forestL}" stroke-width="1.3"/><path d="${pathOfNullable(dn, w, h, lo, hi, x0, y0)}" fill="none" stroke="${C.forestL}" stroke-width="1.3"/>
<path d="${pathOfNullable(m, w, h, lo, hi, x0, y0)}" fill="none" stroke="${C.amber}" stroke-width="2"/>
<path d="${pathOfNullable(s, w, h, lo, hi, x0, y0)}" fill="none" stroke="${C.bone}" stroke-width="2.4" stroke-linejoin="round"/>
<rect x="${x0}" y="540" width="${w}" height="30" fill="rgba(255,255,255,.04)"/><line x1="${x0}" x2="${x0 + w}" y1="530" y2="530" stroke="${C.crimsonL}" stroke-dasharray="4 5" opacity=".6"/><line x1="${x0}" x2="${x0 + w}" y1="570" y2="570" stroke="${C.forestL}" stroke-dasharray="4 5" opacity=".6"/>
<path d="${rp}" fill="none" stroke="${C.rose}" stroke-width="2"/><text x="${x0}" y="520" ${MONO} font-size="11" fill="rgba(246,242,236,.5)">RSI 14</text>`))
}

/* ---------- 6. orbiter ---------- */
{
  const W = 900, H = 900, cx = 450, cy = 450
  const nodes = [['Market Data', 190, 200], ['Watchlists', 190, 20], ['Technical Indicators', 290, 110], ['AI Analyst', 290, 290], ['Machine Learning', 390, 45], ['Anomaly Detection', 390, 225]]
  save('orbiter.svg', svg(W, H, `<circle cx="${cx}" cy="${cy}" r="430" fill="url(#glow)"/>
${[190, 290, 390].map((r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(246,242,236,.16)" ${r === 290 ? 'stroke-dasharray="3 9"' : ''}/>`).join('')}
${nodes.map(([t, r, a]) => { const x = cx + r * Math.cos((a * Math.PI) / 180), y = cy + r * Math.sin((a * Math.PI) / 180); return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${C.crimson}" stroke-opacity=".45" stroke-dasharray="3 6"/><circle cx="${x}" cy="${y}" r="30" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.25)"/><circle cx="${x}" cy="${y}" r="7" fill="${C.rose}"/><text x="${x}" y="${y + 52}" ${MONO} font-size="12" letter-spacing="1.5" text-anchor="middle" fill="rgba(246,242,236,.7)">${t.toUpperCase()}</text>` }).join('')}
<circle cx="${cx}" cy="${cy}" r="82" fill="${C.panel}" stroke="${C.crimsonL}" stroke-width="2"/>${logo(cx - 56, cy - 56, 1.75)}`))
}

console.log('assets written to public/assets')
