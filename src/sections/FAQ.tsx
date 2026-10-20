import FAQAccordion from '../components/FAQAccordion'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { faqs } from '../data/faqs'

export default function FAQ() {
  return (
    <section className="section-pad bg-white" aria-labelledby="faq-title">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions, Answered Plainly.">
          Can’t find what you’re looking for? Send us a message and we’ll help.
        </SectionHeading>
        <Reveal delay={0.1}>
          <FAQAccordion items={faqs} />
        </Reveal>
      </div>
    </section>
  )
}
