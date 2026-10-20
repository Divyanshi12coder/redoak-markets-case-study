import { Hero } from '../components/hero/Hero'
import { Overview } from '../components/sections/Overview'
import { Problem } from '../components/sections/Problem'
import { Solution } from '../components/sections/Solution'
import { Dashboard } from '../components/sections/Dashboard'
import { Watchlist } from '../components/sections/Watchlist'
import { Intelligence } from '../components/sections/Intelligence'
import { Anomaly } from '../components/sections/Anomaly'
import { ML } from '../components/sections/ML'
import { Dia } from '../components/sections/Dia'
import { Architecture } from '../components/sections/Architecture'
import { Security } from '../components/sections/Security'
import { Responsive } from '../components/sections/Responsive'
import { Engineering } from '../components/sections/Engineering'
import { Results } from '../components/sections/Results'
import { Lessons } from '../components/sections/Lessons'
import { Roadmap } from '../components/sections/Roadmap'
import { Closing, Disclaimer, Footer } from '../components/sections/Closing'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Overview />
      <Problem />
      <Solution />
      <Dashboard />
      <Watchlist />
      <Intelligence />
      <Anomaly />
      <ML />
      <Dia />
      <Architecture />
      <Security />
      <Responsive />
      <Engineering />
      <Results />
      <Lessons />
      <Roadmap />
      <Disclaimer />
      <Closing />
      <Footer />
    </main>
  )
}
