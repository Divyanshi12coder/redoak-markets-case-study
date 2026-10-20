export type Regime = 'BULLISH' | 'NEUTRAL' | 'BEARISH'

export interface Stock {
  t: string
  name: string
  seed: number
  regime: Regime
  vol: 'Low' | 'Moderate' | 'Elevated' | 'High'
  strength: number // 0..100 representative signal strength
  chg: number // representative % over the sample window
  note: string
}

/** Representative values for illustration only — not live data, not recommendations. */
export const STOCKS: Stock[] = [
  { t: 'AAPL', name: 'Apple Inc.', seed: 11, regime: 'BULLISH', vol: 'Low', strength: 72, chg: 6.4, note: 'Price above rising 50-day average; momentum conditions firm.' },
  { t: 'MSFT', name: 'Microsoft Corp.', seed: 23, regime: 'BULLISH', vol: 'Low', strength: 66, chg: 4.1, note: 'Steady trend with contained volatility.' },
  { t: 'NVDA', name: 'NVIDIA Corp.', seed: 37, regime: 'BULLISH', vol: 'High', strength: 81, chg: 12.8, note: 'Strong momentum with wide ranges; ATR well above its average.' },
  { t: 'AMZN', name: 'Amazon.com', seed: 41, regime: 'NEUTRAL', vol: 'Moderate', strength: 48, chg: 1.2, note: 'Signals mixed; price oscillating around its moving average.' },
  { t: 'GOOGL', name: 'Alphabet Inc.', seed: 53, regime: 'NEUTRAL', vol: 'Moderate', strength: 52, chg: 2.3, note: 'RSI near midline; MACD histogram flattening.' },
  { t: 'META', name: 'Meta Platforms', seed: 67, regime: 'BULLISH', vol: 'Elevated', strength: 63, chg: 7.5, note: 'Uptrend intact; volume above its rolling baseline.' },
  { t: 'TSLA', name: 'Tesla Inc.', seed: 79, regime: 'BEARISH', vol: 'High', strength: 69, chg: -8.7, note: 'Price below falling averages; volatility elevated.' },
]

export const regimeColor: Record<Regime, string> = {
  BULLISH: '#3f9468',
  NEUTRAL: '#e8c27a',
  BEARISH: '#c2334a',
}
