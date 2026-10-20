import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const DATA = [
  { f: 'RSI', v: 17 },
  { f: 'MACD', v: 15 },
  { f: 'Volatility', v: 19 },
  { f: 'Momentum', v: 16 },
  { f: 'Volume', v: 11 },
  { f: 'MA distance', v: 13 },
  { f: 'ATR', v: 9 },
].sort((a, b) => b.v - a.v)

export default function FeatureImportance() {
  return (
    <div className="h-72 w-full" role="img" aria-label="Illustrative horizontal bar chart of relative feature importance. Volatility, RSI, Momentum, MACD, MA distance, Volume, ATR in descending order.">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={DATA} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
          <XAxis type="number" hide domain={[0, 22]} />
          <YAxis type="category" dataKey="f" axisLine={false} tickLine={false} width={92} tick={{ fill: 'rgba(246,242,236,0.7)', fontSize: 12, fontFamily: 'JetBrains Mono' }} />
          <Tooltip cursor={{ fill: 'rgba(255,255,255,0.04)' }} formatter={(v) => [`${v}% (illustrative)`, 'Relative weight']} contentStyle={{ background: '#140a0d', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, color: '#f6f2ec', fontSize: 12 }} />
          <Bar dataKey="v" radius={[0, 6, 6, 0]} animationDuration={1200}>
            {DATA.map((d, i) => <Cell key={d.f} fill={i === 0 ? '#c2334a' : i < 3 ? '#9b1c2e' : '#4a0e1a'} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
