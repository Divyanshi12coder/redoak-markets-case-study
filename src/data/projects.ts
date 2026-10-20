export type ProjectVisual = 'beauty' | 'startup' | 'leadgen'

export interface Project {
  slug: string
  visual: ProjectVisual
  category: string
  title: string
  brand: string
  summary: string
  tags: string[]
  disclaimer: string
  scenario: string
  problem: string
  strategy: string[]
  solution: string[]
  decisions: { title: string; body: string }[]
  objective: string
  deliverables: string[]
}

const NOT_REAL =
  'Concept project for a fictional brand. Not client work; no real results, metrics or customers are represented.'

export const projects: Project[] = [
  {
    slug: 'maison-aura-beauty',
    visual: 'beauty',
    category: 'Social & Brand Identity',
    title: 'Maison Aura',
    brand: 'Fictional beauty & lifestyle brand',
    summary:
      'An editorial identity and Instagram campaign for a fictional skincare label: calm, premium and built for scrolling.',
    tags: ['Brand palette', 'Instagram', 'Carousels', 'Reels covers', 'Content calendar'],
    disclaimer: NOT_REAL,
    scenario:
      'Maison Aura is an invented small-batch skincare label launching an everyday ritual range. It has a good product story but no consistent visual language, so its social feed looks different every week.',
    problem:
      'Beauty is a crowded category where audiences judge quality in a second. Without a recognisable look and a repeatable content rhythm, the brand feels like every other newcomer and is hard to plan content for.',
    strategy: [
      'Build the feed around three repeatable content pillars: ritual, ingredients and real-life moments.',
      'Use an editorial tone: generous white space, serif-style headlines, restrained colour.',
      'Design formats once (post, carousel, Reel cover) so production stays fast and consistent.',
    ],
    solution: [
      'A compact brand palette and type pairing for social use.',
      'A template system for single posts, educational carousels and Reel covers.',
      'A four-week content calendar that balances education, product and community content.',
    ],
    decisions: [
      { title: 'Warm neutrals over bright colour', body: 'Soft clay, sage and cream signal calm and quality, and photograph well in any lighting.' },
      { title: 'Cover-first Reels', body: 'Reel covers share one layout so the profile grid reads as a deliberate collection.' },
      { title: 'Carousels that teach', body: 'Each carousel opens with a clear hook and ends with one action, making it easy to save and share.' },
    ],
    objective:
      'Give the brand a recognisable, consistent presence and an efficient content workflow, so audience-building effort compounds instead of restarting each week.',
    deliverables: ['Palette & type direction', '6 post templates', '2 carousel structures', 'Reel cover system', '4-week content calendar'],
  },
  {
    slug: 'nimbus-startup-website',
    visual: 'startup',
    category: 'Website Design',
    title: 'Nimbus Labs',
    brand: 'Fictional technology startup',
    summary:
      'A responsive concept website for a fictional workflow-software startup: clear messaging, strong hero, one obvious next step.',
    tags: ['Landing page', 'Responsive', 'Hero design', 'CTA design', 'Technical SEO'],
    disclaimer: NOT_REAL,
    scenario:
      'Nimbus Labs is an invented early-stage startup building scheduling software for small teams. Its current one-page site lists features but never explains who it is for or what to do next.',
    problem:
      'Visitors decide within seconds whether a product is for them. A feature-first page with several competing buttons makes people leave without understanding the value or taking action.',
    strategy: [
      'Lead with the outcome for the customer, then support it with proof of how the product works.',
      'Give every section one job and the page one primary action.',
      'Design mobile first, since most first visits come from phones.',
    ],
    solution: [
      'A hero with a plain-language promise, a single primary CTA and a product preview.',
      'A three-part service section that maps problems to solutions.',
      'A closing CTA band and a compact responsive layout that holds up on phones.',
    ],
    decisions: [
      { title: 'One primary action', body: 'Secondary links are visually quieter, so the main CTA is unmistakable.' },
      { title: 'Plain language', body: 'Headlines say what the product does for people, not how clever the technology is.' },
      { title: 'Performance-minded build', body: 'Light layout, system-friendly type and semantic HTML provide a strong base for speed and basic SEO.' },
    ],
    objective:
      'Make the offer understandable in seconds and increase the share of visitors who start a conversation, to be measured once a real site and analytics are live.',
    deliverables: ['Landing page design', 'Hero & CTA system', 'Services section', 'Mobile layout', 'Analytics & SEO checklist'],
  },
  {
    slug: 'brightline-lead-generation',
    visual: 'leadgen',
    category: 'Performance Marketing',
    title: 'Brightline Home Services',
    brand: 'Fictional local service business',
    summary:
      'A speculative lead-generation campaign: ad concepts, landing page, short lead form and a tracking plan for a fictional local service company.',
    tags: ['Ad creative', 'Landing page', 'Lead form', 'Customer journey', 'Tracking plan'],
    disclaimer:
      'Speculative work for a fictional business. Campaign figures shown are illustrative placeholders; no advertising has been run and no real results are being represented.',
    scenario:
      'Brightline is an invented local home-services company that relies on word of mouth. It wants a steadier flow of enquiries but has no campaign structure or tracking.',
    problem:
      'Without a clear offer, a focused landing page and measurement, ad spend cannot be learned from. Generic ads lead to generic enquiries and no insight into what works.',
    strategy: [
      'Start from one clear, local offer and a single enquiry action.',
      'Match ad message to landing page so the promise carries through.',
      'Define tracking up front: what counts as a lead and how it is recorded.',
    ],
    solution: [
      'Three ad creative concepts testing different angles (speed, trust, convenience).',
      'A focused landing page and a short lead form that asks only for what is needed.',
      'A customer-journey map and a tracking concept covering ad click to enquiry.',
    ],
    decisions: [
      { title: 'Short form', body: 'Fewer fields reduce friction; extra detail is gathered in the follow-up conversation.' },
      { title: 'Message match', body: 'Ads and landing page share headline language, so visitors feel they are in the right place.' },
      { title: 'Tracking first', body: 'Events are defined before any spend, so reporting reflects real enquiries rather than vanity numbers.' },
    ],
    objective:
      'Create a measurable path from first ad impression to qualified enquiry, so each stage can be reviewed and improved with real data once a live campaign exists.',
    deliverables: ['3 ad concepts', 'Landing page mockup', 'Lead form design', 'Customer journey map', 'Tracking plan'],
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
