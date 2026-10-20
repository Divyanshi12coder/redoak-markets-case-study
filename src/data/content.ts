import { Cpu, Crosshair, LineChart, Palette, type LucideIcon } from 'lucide-react'

export const whyUs: { title: string; body: string; icon: LucideIcon }[] = [
  { title: 'Strategic by Design', body: 'Every deliverable has a purpose and supports an agreed business objective.', icon: Crosshair },
  { title: 'Creative Meets Technology', body: 'We combine visual storytelling, web development and practical digital tools.', icon: Palette },
  { title: 'Built Around Your Business', body: 'We adapt our approach to each client’s audience, budget and goals.', icon: Cpu },
  { title: 'Focused on Learning and Improvement', body: 'We use relevant performance data to understand what’s working and identify opportunities.', icon: LineChart },
]

export const process = [
  { n: '01', title: 'Discover', body: 'Understand the business, customers, goals, challenges and existing digital presence.' },
  { n: '02', title: 'Strategize', body: 'Develop a clear plan covering messaging, creative direction, channels and deliverables.' },
  { n: '03', title: 'Create & Launch', body: 'Build the agreed assets, develop the website or campaign, and obtain client approval before launch.' },
  { n: '04', title: 'Measure & Improve', body: 'Review relevant performance data, share findings and refine the approach.' },
]

export const funnel = [
  { label: 'Visibility', hint: 'Are the right people seeing you?' },
  { label: 'Engagement', hint: 'Do they interact and stay?' },
  { label: 'Enquiries', hint: 'Do they get in touch?' },
  { label: 'Conversions', hint: 'Do enquiries become customers?' },
  { label: 'Learning', hint: 'What do we do next?' },
]

export const objectives = [
  'Better website usability',
  'Stronger brand consistency',
  'More relevant customer enquiries',
  'Improved campaign tracking',
  'More efficient content production',
  'Clearer marketing decisions',
]

export const packages = [
  {
    id: 'essential',
    name: 'Essential',
    audience: 'For businesses that need a consistent online presence.',
    items: ['Social media content', 'Content calendar', 'Basic monthly reporting'],
    interest: 'Social media management',
  },
  {
    id: 'growth',
    name: 'Growth',
    audience: 'For businesses that need a more coordinated digital presence.',
    items: ['Social media content', 'Short-form videos', 'Content strategy', 'Website recommendations', 'Monthly reporting'],
    interest: 'Content creation',
    featured: true,
  },
  {
    id: 'custom',
    name: 'Custom Projects',
    audience: 'For businesses needing websites, landing pages, campaigns or marketing automation.',
    items: ['Website design and development', 'Landing pages', 'Campaign creative', 'Marketing automation', 'Analytics setup'],
    interest: 'Website development',
  },
]

export const serviceInterests = [
  'Social media management',
  'Content creation',
  'Website development',
  'Performance marketing',
  'SEO',
  'AI automation',
  'Other',
]

/** Genuine, permissioned testimonials only. Leave empty until real ones exist. */
export const testimonials: { quote: string; name: string; role: string }[] = []
