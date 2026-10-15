import { Section } from '../ui/Section'
import { IndicatorChart } from '../charts/IndicatorChart'
import { Reveal } from '../ui/Reveal'
import { chapter } from '../../data/content'

export function Intelligence() {
  return (
    <Section
      id="intelligence"
      eyebrow={chapter(5)}
      title={<>Technical <em className="text-gradient-crimson">intelligence.</em></>}
      lead="Six indicators, one chart. Toggle them on and off, click one to focus it, and watch the chart highlight the part that matters. Hover the chart to read exact values."
    >
      <Reveal><IndicatorChart /></Reveal>
    </Section>
  )
}
