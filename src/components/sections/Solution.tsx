import { Bot, Calculator, Cpu, Database, LayoutDashboard, LineChart, Radar, Sigma } from 'lucide-react'
import { Section } from '../ui/Section'
import { FlowPipeline, type Step } from '../architecture/FlowPipeline'
import { chapter } from '../../data/content'

const STEPS: Step[] = [
  { title: 'Market Data', text: 'Daily bars from a demo provider (default) or Twelve Data, cached server-side.', icon: Database },
  { title: 'Data Processing', text: 'Pandas and NumPy clean, align and validate the series.', icon: Calculator },
  { title: 'Technical Indicators', text: 'SMA, EMA, RSI, MACD, Bollinger Bands and ATR computed and tested against hand-worked values.', icon: LineChart },
  { title: 'Feature Engineering', text: '22 scale-free, causal features — no look-ahead.', icon: Sigma },
  { title: 'ML Analysis', text: 'Walk-forward Random Forest regime classification with an honest baseline.', icon: Cpu },
  { title: 'Anomaly Detection', text: 'Rolling z-scores and Isolation Forest flag statistically unusual behaviour.', icon: Radar },
  { title: 'AI Interpretation', text: 'Dia turns structured facts into plain-language context.', icon: Bot },
  { title: 'Interactive Dashboard', text: 'Charts, signal meter, regime and insights in one responsive interface.', icon: LayoutDashboard },
]

export function Solution() {
  return (
    <Section
      id="solution"
      tone="green"
      eyebrow={chapter(3) + ' · ' + chapter(4)}
      title={<>One pipeline, from raw bars to <em className="text-gradient-crimson">readable insight.</em></>}
      lead="Scroll to follow the data. Each stage is a distinct, testable layer — which is what keeps the quantitative signals separate from the interpretation built on top of them."
    >
      <FlowPipeline steps={STEPS} />
    </Section>
  )
}
