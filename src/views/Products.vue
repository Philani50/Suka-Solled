<script setup>
import site from '../content/site.js'
import products, { rand, retailPrice } from '../content/products.js'
import faq from '../content/faq.js'
import { asset, waHref, usePageMeta } from '../lib.js'
import { useHead } from '@unhead/vue'

usePageMeta(
  'Products and prices',
  `${site.name} Peri-Peri Orange Hot Sauce 125ml: single bottles and 6, 12, 18, 24 and 48 bottle bulk packs in ${site.areas.slice(0, 3).join(', ')}.`,
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
    <header class="shop-heading">
      <p class="eyebrow">The good stuff</p>
      <h1>Choose your heat.</h1>
      <p class="lead">One bottle or a pack for the whole crew. Delivery across {{ site.areas.join(', ') }}.</p>
      <p class="shop-deal"><strong>Bulk deals:</strong> packs from 6 to 48 bottles.</p>
    </header>
    <ul class="cards product-cards shop-cards">
      <li v-for="s in products" :id="s.slug" :key="s.slug" class="card product-card lift">
        <img :src="asset('images/' + s.image)" width="800" height="600" :alt="s.alt" loading="lazy" />
        <div class="product-card-copy">
          <p class="product-price">{{ rand(s.price ?? retailPrice) }} <span>{{ s.price === null ? '/ bottle' : `/ ${s.pack} bottles` }}</span></p>
          <h2>{{ s.title }}</h2>
          <p>{{ s.text }}</p>
          <p class="actions tight">
          <RouterLink :to="{ path: '/order', query: { product: s.title } }" class="btn small-btn">Order</RouterLink>
          <a :href="waHref(`Hi! I would like to order: ${s.title}.`)" class="btn alt small-btn" target="_blank" rel="noopener">WhatsApp</a>
          </p>
        </div>
      </li>
    </ul>

    <h2 class="rule faq-heading">A few quick answers</h2>
    <div class="faq">
      <details v-for="f in faq" :key="f.q">
        <summary>{{ f.q }}</summary>
        <p>{{ f.a }}</p>
      </details>
    </div>
    <p class="actions"><RouterLink to="/order" class="btn">Place an order</RouterLink></p>
  </div>
</template>
