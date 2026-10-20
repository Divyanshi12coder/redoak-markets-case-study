import { Clock, Globe2, ShieldCheck } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

const points = [
  { icon: Clock, text: 'Tell us a little about your project; no commitment required.' },
  { icon: Globe2, text: 'Working with clients in the US, UK, India and beyond.' },
  { icon: ShieldCheck, text: 'Your details are used only to respond to your enquiry.' },
]

export default function Contact() {
  return (
    <section id="contact" className="on-dark section-pad bg-midnight" aria-labelledby="contact-title">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading id="contact-title" dark eyebrow="Contact" title="Have a Project in Mind?">
            Tell us what you’re building, where you want to go, and how we can help.
          </SectionHeading>
          <Reveal delay={0.1}>
            <ul className="mt-10 space-y-5">
              {points.map(({ icon: Icon, text }) => (
                <li key={text} className="flex gap-4 text-grey-cool">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-emerald">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="self-center">{text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
