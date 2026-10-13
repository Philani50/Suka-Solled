import { useHead } from '@unhead/vue'
import site from './content/site.js'

// Path to a file in public/ (works under a GitHub Pages sub-path too)
export const asset = (path) => import.meta.env.BASE_URL + path.replace(/^\//, '')

export const telHref = `tel:+${site.phoneInternational}`
export const mailHref = `mailto:${site.email}`
export const waHref = (message = site.whatsappMessage) =>
  `https://wa.me/${site.phoneInternational}?text=${encodeURIComponent(message)}`

// Sets <title> and meta description for a page (also baked into the built HTML)
export function usePageMeta(title, description) {
  const full = title ? `${title} | ${site.name}` : `${site.name} | Custom carpentry in ${site.areas[0]}`
  useHead({
    title: full,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: full },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'en_ZA' },
    ],
  })
}
