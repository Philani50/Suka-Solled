<script setup>
import { useHead } from '@unhead/vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import site from './content/site.js'
import { telHref, waHref } from './lib.js'

// LocalBusiness structured data for Google (built from src/content/site.js)
const ld = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
  name: site.name,
  description: site.tagline,
  url: site.siteUrl,
  telephone: `+${site.phoneInternational}`,
  email: site.email,
  openingHours: site.hours,
  address: { '@type': 'PostalAddress', addressLocality: site.address, addressRegion: site.region, addressCountry: site.country },
  areaServed: site.areas.map((name) => ({ '@type': 'Place', name })),
  sameAs: [site.googleReviewsUrl, site.facebookUrl].filter(Boolean),
}

useHead({
  htmlAttrs: { lang: 'en-ZA' },
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(ld) }],
})
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main" tabindex="-1">
    <RouterView />
  </main>
  <SiteFooter />
  <!-- Phone-only quick actions (hidden on larger screens) -->
  <div class="call-bar">
    <a :href="telHref">Call</a>
    <a :href="waHref()" target="_blank" rel="noopener">WhatsApp</a>
    <RouterLink to="/quote">Get a quote</RouterLink>
  </div>
</template>
