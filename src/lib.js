import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import site from './content/site.js'

// Path to a file in public/ (works under a GitHub Pages sub-path too)
export const asset = (path) => import.meta.env.BASE_URL + path.replace(/^\//, '')

export const telHref = `tel:+${site.phoneInternational}`
export const mailHref = `mailto:${site.email}`
export const waHref = (message = site.whatsappMessage) =>
  `https://wa.me/${site.phoneInternational}?text=${encodeURIComponent(message)}`

// Sets <title> and meta description for a page (also baked into the built HTML)
export function usePageMeta(title, description) {
  const route = useRoute()
  const full = title ? `${title} | ${site.name}` : `${site.name} | Peri-peri orange sauce in ${site.areas[0]}`
  const canonical = `${site.siteUrl}${route.path === '/' ? '/' : route.path}`
  const image = `${site.siteUrl}/images/1000301139.jpg`
  useHead({
    title: full,
    link: [{ rel: 'canonical', href: canonical }],
    meta: [
      { name: 'description', content: description },
      { property: 'og:site_name', content: site.name },
      { property: 'og:title', content: full },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: image },
      { property: 'og:locale', content: 'en_ZA' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: full },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
  })
}
