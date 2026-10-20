import { useEffect } from 'react'
import { site } from '../config/site'

function setMeta(selector: string, attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = value
}

/** Sets the document title and key meta tags for the current page. */
export function useSeo(opts: { title?: string; description?: string; path?: string }) {
  const { title, description, path = '/' } = opts
  useEffect(() => {
    const full = title ? site.seo.titleTemplate.replace('%s', title) : site.seo.titleHome
    document.title = full
    const desc = description ?? site.description
    setMeta('meta[name="description"]', 'name', 'description', desc)
    setMeta('meta[property="og:title"]', 'property', 'og:title', full)
    setMeta('meta[property="og:description"]', 'property', 'og:description', desc)
    if (site.url) {
      const href = site.url + path
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = href
      setMeta('meta[property="og:url"]', 'property', 'og:url', href)
      setMeta('meta[property="og:image"]', 'property', 'og:image', site.url + site.seo.ogImage)
    }
  }, [title, description, path])
}
