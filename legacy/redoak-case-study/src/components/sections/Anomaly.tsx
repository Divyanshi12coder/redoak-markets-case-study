import { Section } from '../ui/Section'
import { AnomalyChart } from '../charts/AnomalyChart'
import { Reveal } from '../ui/Reveal'

export function Anomaly() {
  return (
    <Section
      id="anomaly"
      tone="green"
      eyebrow="05 — The Quantitative Engine · Anomalies"
      title={<>Spotting what <em className="text-gradient-crimson">doesn't look normal.</em></>}
      lead="The application combines rolling z-scores with an Isolation Forest to flag unusual price and volume behaviour. This demo applies the z-score idea to a synthetic series, so you can see what a flag actually means."
    >
      <Reveal><AnomalyChart /></Reveal>
    </Section>
  )
}
