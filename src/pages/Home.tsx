import { useSeo } from '../hooks/useSeo'
import About from '../sections/About'
import Contact from '../sections/Contact'
import FAQ from '../sections/FAQ'
import Hero from '../sections/Hero'
import Partnership from '../sections/Partnership'
import Portfolio from '../sections/Portfolio'
import Pricing from '../sections/Pricing'
import Process from '../sections/Process'
import Results from '../sections/Results'
import Services from '../sections/Services'
import Testimonials from '../sections/Testimonials'
import WhyUs from '../sections/WhyUs'

export default function Home() {
  useSeo({})
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <WhyUs />
      <Process />
      <Results />
      <About />
      <Testimonials />
      <Partnership />
      <Pricing />
      <FAQ />
      <Contact />
    </>
  )
}
