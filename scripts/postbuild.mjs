// Generates robots.txt and (when VITE_SITE_URL is set) sitemap.xml in dist/, and a 404.html SPA fallback for static hosts.
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'

const dist = new URL('../dist/', import.meta.url)
const site = (process.env.VITE_SITE_URL || '').replace(/\/$/, '')

// Project slugs are read from the data file so the sitemap stays in sync.
const src = readFileSync(new URL('../src/data/projects.ts', import.meta.url), 'utf8')
const slugs = [...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

let robots = 'User-agent: *\nAllow: /\n'
if (site) {
  const urls = ['/', ...slugs.map((s) => `/work/${s}`)]
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `  <url><loc>${site}${u}</loc></url>`).join('\n') +
    '\n</urlset>\n'
  writeFileSync(new URL('sitemap.xml', dist), xml)
  robots += `Sitemap: ${site}/sitemap.xml\n`
  console.log(`postbuild: sitemap.xml written for ${site}`)
} else {
  console.log('postbuild: VITE_SITE_URL not set, skipping sitemap.xml (set it for production builds)')
}
writeFileSync(new URL('robots.txt', dist), robots)
if (existsSync(new URL('index.html', dist))) copyFileSync(new URL('index.html', dist), new URL('404.html', dist))
