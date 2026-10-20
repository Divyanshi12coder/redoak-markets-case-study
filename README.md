# Growthora Digital — Agency Website

![React](https://img.shields.io/badge/React-19-101827?logo=react&logoColor=62B69A)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-101827?logo=typescript&logoColor=62B69A)
![Vite](https://img.shields.io/badge/Vite-8-101827?logo=vite&logoColor=62B69A)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-101827?logo=tailwindcss&logoColor=62B69A)

A responsive portfolio and lead-generation website for **Growthora Digital** (provisional name) — *Creative Marketing. Intelligent Growth.*

> **Provisional details to verify before publishing:** agency name, contact email, social URLs, founder profile, budget bands, and the production URL. All live in `src/config/site.ts` or environment variables.
>
> This branch replaces the earlier RedOak Markets case-study site, which is preserved in [`legacy/redoak-case-study/`](legacy/redoak-case-study) and on the `main` branch.

## Features

- Hero, services (5), portfolio with dedicated case-study pages (3 concept projects), why-us, animated process timeline, measurement framework, about + configurable founder profile, engagement options, FAQ accordion, contact form, footer
- Honest content: portfolio pieces are labelled *Concept Project*; no invented clients, testimonials, metrics or prices
- Testimonials hidden until real ones exist (`features.showTestimonials`)
- Contact form with validation, loading/success/error states, honeypot + minimum-fill-time spam checks, and honest fallbacks (see below)
- Sticky nav with active-section state, accessible mobile menu, scroll reveals, reduced-motion support
- SEO: per-page titles/meta, Open Graph, canonical URLs, favicon, `robots.txt`, `sitemap.xml` (generated when `VITE_SITE_URL` is set)
- All visuals are original CSS/SVG compositions — no external images

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS 3 · Framer Motion · React Router · Lucide · Manrope (self-hosted via Fontsource)

## Folder structure

```
src/
  components/   Navbar, Footer, Button, SmartLink, ServiceCard, ProjectCard, FAQAccordion, ContactForm, ...
  sections/     Hero, Services, Portfolio, WhyUs, Process, Results, About, Testimonials, Partnership, Pricing, FAQ, Contact
  pages/        Home, ProjectDetail, NotFound
  visuals/      HeroVisual, ServiceVisual, ProjectVisuals (CSS compositions)
  data/         services, projects, faqs, content (why-us, process, packages, testimonials)
  config/       site.ts  ← brand, nav, email, socials, budgets, feature flags, SEO
  hooks/ lib/ styles/
scripts/postbuild.mjs   robots.txt, sitemap.xml, 404.html fallback
legacy/                 previous RedOak case-study site (not built)
```

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

## Environment variables

Copy `.env.example` to `.env.local`. All values are **public** (bundled into the frontend); never place private keys in them.

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Production URL for canonical/OG tags and sitemap |
| `VITE_CONTACT_EMAIL` | Real contact email (footer + email-draft fallback) |
| `VITE_FORM_ENDPOINT` | Form backend URL accepting a JSON POST |
| `VITE_LINKEDIN_URL`, `VITE_INSTAGRAM_URL` | Social links (hidden while empty) |
| `VITE_BASE` | Sub-path base, only for GitHub Pages project sites |

## Contact-form integration

The form never claims delivery it cannot confirm:

1. **`VITE_FORM_ENDPOINT` set** → the form POSTs JSON (`name, email, company, website, country, service, budget, message`). "Sent" is shown only on a 2xx response; otherwise an error is shown. Works with Formspree, Basin, Getform, or your own serverless function (`api/` on Vercel).
2. **Only `VITE_CONTACT_EMAIL` set** → after validation the user sees their message and chooses to open a prefilled email draft (nothing is reported as sent).
3. **Neither set** → the user is told the form isn't connected and can copy their message.

For stronger spam protection add a service-side CAPTCHA (e.g. Turnstile/reCAPTCHA) or rate-limit your endpoint; the built-in honeypot and timing check are only a first layer.

## Deploying to Vercel

1. Push the repo and import it at vercel.com (framework preset: Vite; build `npm run build`; output `dist`).
2. Add the environment variables above in *Project Settings → Environment Variables*.
3. Deploy. `vercel.json` rewrites all routes to `index.html` so `/work/<slug>` works on refresh.

GitHub Pages: the workflow in `.github/workflows/deploy.yml` builds with `VITE_BASE=/redoak-markets-case-study/` and publishes `dist` (with a `404.html` SPA fallback). Adjust the base if you rename the repo.

## Customization

- Brand, tagline, nav, budgets, socials, founder, feature flags: `src/config/site.ts`
- Services / projects / FAQs / packages / testimonials: `src/data/*`
- Colours and fonts: `tailwind.config.js`

## Known limitations

- Name "Growthora Digital" is provisional and not trademark-checked.
- No form backend is bundled; one must be connected (see above).
- Open Graph image is an SVG; many social platforms require PNG/JPG — replace `public/og-image.svg` with a 1200×630 PNG and update `index.html`/`site.ts`.
- Page-level `<title>`/meta are set client-side; for best social-preview and crawler behaviour consider pre-rendering.
- Lighthouse/Core Web Vitals have not been measured; no scores are claimed. Automated tests are not included.
- Founder profile, testimonials and social links are intentionally empty until genuine information exists.

## Authorship

Author/maintainer: _replace with genuine details (name, role, links)._

Built and created by Divyanshi.
