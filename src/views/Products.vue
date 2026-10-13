<script setup>
import site from '../content/site.js'
import products from '../content/products.js'
import faq from '../content/faq.js'
import { asset, waHref, usePageMeta } from '../lib.js'
import { useHead } from '@unhead/vue'

usePageMeta(
  'Products and prices',
  `${site.name} Peri-Peri Orange Hot Sauce 250ml: single bottles and 6, 12, 18 and 24 bottle bulk packs in ${site.areas.slice(0, 3).join(', ')}.`,
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
    <h1>Products and prices</h1>
    <p class="lead">We deliver to {{ site.areas.join(', ') }}. The more you buy, the less you pay per bottle.</p>
    <ul class="cards">
      <li v-for="s in products" :id="s.slug" :key="s.slug" class="card">
        <img :src="asset('images/' + s.image)" width="800" height="600" :alt="s.alt" loading="lazy" />
        <h2>{{ s.title }}</h2>
        <p>{{ s.text }}</p>
        <p class="actions tight">
          <RouterLink :to="{ path: '/order', query: { product: s.title } }" class="btn small-btn">Order</RouterLink>
          <a :href="waHref(`Hi! I would like to order: ${s.title}.`)" class="btn alt small-btn" target="_blank" rel="noopener">WhatsApp</a>
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
    <p class="actions"><RouterLink to="/order" class="btn">Place an order</RouterLink></p>
  </div>
</template>
