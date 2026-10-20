import { Bot, Globe, Megaphone, Search, Share2, type LucideIcon } from 'lucide-react'

export type ServiceVisual = 'social' | 'web' | 'performance' | 'seo' | 'automation'

export interface Service {
  id: string
  number: string
  title: string
  icon: LucideIcon
  visual: ServiceVisual
  description: string
  capabilities: string[]
  note?: string
  /** Value passed to the contact form's service dropdown */
  interest: string
}

export const services: Service[] = [
  {
    id: 'social',
    number: '01',
    title: 'Social Media & Content',
    icon: Share2,
    visual: 'social',
    description:
      'Consistent, on-brand content that gives your audience a reason to follow, engage and remember you.',
    capabilities: [
      'Social media strategy',
      'Instagram and Facebook content',
      'Content calendars & scheduling',
      'Graphic design & carousels',
      'Short-form video editing & Reels strategy',
    ],
    interest: 'Social media management',
  },
  {
    id: 'web',
    number: '02',
    title: 'Website Design & Development',
    icon: Globe,
    visual: 'web',
    description:
      'Fast, responsive websites with clear messaging and layouts designed to turn visitors into enquiries.',
    capabilities: [
      'Business websites & landing pages',
      'Responsive development & redesigns',
      'Conversion-focused layouts',
      'Contact forms & analytics integration',
      'Basic technical SEO',
    ],
    interest: 'Website development',
  },
  {
    id: 'performance',
    number: '03',
    title: 'Performance Marketing',
    icon: Megaphone,
    visual: 'performance',
    description:
      'Lead-generation campaigns with proper tracking, built on a solid offer and landing page.',
    capabilities: [
      'Meta Ads & Google Ads strategy',
      'Lead-generation campaigns',
      'Advertising creative',
      'Landing-page optimisation',
      'Conversion tracking & reporting',
    ],
    note: 'Offered to clients who are ready for paid media, once the foundations (offer, tracking, landing page) are in place.',
    interest: 'Performance marketing',
  },
  {
    id: 'seo',
    number: '04',
    title: 'SEO & Digital Presence',
    icon: Search,
    visual: 'seo',
    description:
      'Make it easier for the right people to find you, with practical improvements that compound over time.',
    capabilities: [
      'Keyword research',
      'On-page SEO & content recommendations',
      'Google Business Profile optimisation',
      'Local search visibility',
      'Search performance monitoring',
    ],
    note: 'Search results depend on many factors outside our control, so we never promise rankings or traffic.',
    interest: 'SEO',
  },
  {
    id: 'automation',
    number: '05',
    title: 'AI & Marketing Automation',
    icon: Bot,
    visual: 'automation',
    description:
      'Practical workflows that save time and keep enquiries moving, designed around how your business actually works.',
    capabilities: [
      'AI-assisted content workflows',
      'Lead organisation & enquiry routing',
      'Customer follow-up workflows',
      'Reporting assistance',
      'Operational efficiency improvements',
    ],
    note: 'Automation is designed around each client’s workflow, and appropriate human review remains part of the process.',
    interest: 'AI automation',
  },
]
