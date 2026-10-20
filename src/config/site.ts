/**
 * Central site configuration.
 * Everything business-specific lives here (or in src/data) so it can be changed in one place.
 * Items marked VERIFY are provisional and must be confirmed before publishing.
 */

const env = import.meta.env

export const site = {
  /** VERIFY: provisional agency name */
  name: 'Growthora Digital',
  shortName: 'Growthora',
  tagline: 'Creative Marketing. Intelligent Growth.',
  description:
    'An AI-powered digital growth agency combining creative content, modern websites, performance marketing and intelligent automation to help businesses grow online.',

  /** Public site URL, used for canonical/OG/sitemap. Set VITE_SITE_URL at build time. */
  url: (env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? '',

  /**
   * VERIFY: real contact email. Never hard-code one here — set VITE_CONTACT_EMAIL.
   * When empty, the contact form falls back to "copy your message" instead of a mailto draft.
   */
  email: (env.VITE_CONTACT_EMAIL as string | undefined) ?? '',

  /**
   * Optional form backend (Formspree, Basin, Getform, your own API...). Must accept a JSON POST.
   * Public endpoint URLs are fine in frontend code; never put private API keys here.
   */
  formEndpoint: (env.VITE_FORM_ENDPOINT as string | undefined) ?? '',

  /** Empty strings are hidden automatically. VERIFY: add genuine URLs. */
  social: {
    linkedin: (env.VITE_LINKEDIN_URL as string | undefined) ?? '',
    instagram: (env.VITE_INSTAGRAM_URL as string | undefined) ?? '',
  },

  /** Authorship credit shown in the footer. */
  credit: 'Built and created by Divyanshi.',

  nav: [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],

  features: {
    /** Flip to true ONLY once genuine, permissioned client testimonials exist in src/data/testimonials.ts */
    showTestimonials: false,
  },

  /**
   * Founder profile. Leave fields empty until genuine information is available;
   * the About section shows a neutral placeholder card until `name` is filled in.
   */
  founder: {
    name: '',
    role: '',
    bio: '',
    photo: '', // path in /public, e.g. '/founder.jpg'
  },

  /** Configurable budget bands. Edit freely; values are labels only. */
  budgets: [
    'Under $500 / ₹40,000',
    '$500 – $1,500 / ₹40,000 – ₹1,25,000',
    '$1,500 – $5,000 / ₹1,25,000 – ₹4,00,000',
    '$5,000+ / ₹4,00,000+',
    'Not sure yet',
  ],

  seo: {
    titleHome: 'Growthora Digital — Creative Marketing. Intelligent Growth.',
    titleTemplate: '%s · Growthora Digital',
    ogImage: '/og-image.svg',
  },
} as const

export type Site = typeof site

export const socialLinks = (
  [
    { key: 'linkedin', label: 'LinkedIn', href: site.social.linkedin },
    { key: 'instagram', label: 'Instagram', href: site.social.instagram },
  ] as const
).filter((s) => s.href)
