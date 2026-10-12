<script setup>
import site from '../content/site.js'
import services from '../content/services.js'
import faq from '../content/faq.js'
import { asset, waHref, usePageMeta } from '../lib.js'
import { useHead } from '@unhead/vue'

usePageMeta(
  'Carpentry services',
  `Wardrobes, kitchen cupboards, sink units, shelves, doors, repairs and installations by ${site.name} in ${site.areas.slice(0, 3).join(', ')}.`,
)

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }),
  }],
})
</script>

<template>
  <div class="wrap section">
    <h1>Carpentry services</h1>
    <p class="lead">We serve {{ site.areas.join(', ') }}. Not sure what you need? Tell us about your project and we will advise.</p>
    <ul class="cards">
      <li v-for="s in services" :id="s.slug" :key="s.slug" class="card">
        <img :src="asset('images/' + s.image)" width="800" height="600" :alt="s.alt" loading="lazy" />
        <h2>{{ s.title }}</h2>
        <p>{{ s.text }}</p>
        <p v-if="s.from || s.timeline" class="facts">
          <span v-if="s.from"><strong>From</strong> {{ s.from }}</span>
          <span v-if="s.timeline"><strong>Usually</strong> {{ s.timeline }}</span>
        </p>
        <p class="actions tight">
          <RouterLink :to="{ path: '/quote', query: { service: s.title } }" class="btn small-btn">Get a quote</RouterLink>
          <a :href="waHref(`Hi! I would like a quote for: ${s.title}.`)" class="btn alt small-btn" target="_blank" rel="noopener">WhatsApp</a>
        </p>
      </li>
    </ul>

    <h2>Common questions</h2>
    <div class="faq">
      <details v-for="f in faq" :key="f.q">
        <summary>{{ f.q }}</summary>
        <p>{{ f.a }}</p>
      </details>
    </div>
    <p class="actions"><RouterLink to="/quote" class="btn">Request a quote</RouterLink></p>
  </div>
</template>
