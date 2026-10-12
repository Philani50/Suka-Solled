<script setup>
import site from '../content/site.js'
import services from '../content/services.js'
import reviews from '../content/reviews.js'
import { asset, waHref } from '../lib.js'
import { usePageMeta } from '../lib.js'

usePageMeta(
  '',
  `${site.name}: custom wardrobes, kitchen cupboards, sink units, shelves, doors and repairs in ${site.areas.slice(0, 3).join(', ')}. Request a free quote.`,
)
</script>

<template>
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <h1>{{ site.tagline }}</h1>
        <p class="lead">
          Handmade carpentry for homes and businesses in {{ site.areas.join(', ') }}. Honest quotes, tidy work, built to fit.
        </p>
        <p class="actions">
          <RouterLink to="/quote" class="btn">Request a quote</RouterLink>
          <a :href="waHref()" class="btn alt" target="_blank" rel="noopener">WhatsApp us</a>
        </p>
      </div>
      <img :src="asset('images/hero.svg')" width="1200" height="700" alt="Placeholder: a finished custom cupboard installation" fetchpriority="high" />
    </div>
  </section>

  <section class="wrap section">
    <h2>What we make and fix</h2>
    <ul class="cards">
      <li v-for="s in services" :key="s.slug" class="card">
        <img :src="asset('images/' + s.image)" width="800" height="600" :alt="`Placeholder: ${s.title.toLowerCase()}`" loading="lazy" />
        <h3>{{ s.title }}</h3>
        <p>{{ s.text }}</p>
      </li>
    </ul>
    <p><RouterLink to="/services">See all services</RouterLink></p>
  </section>

  <section class="band">
    <div class="wrap">
      <h2>Why customers choose us</h2>
      <ul class="ticks">
        <li>Measured and made to fit your space</li>
        <li>Clear, written quotes before work starts</li>
        <li>Quality hardware and finishes</li>
        <li>Clean, tidy installation</li>
      </ul>
    </div>
  </section>

  <section v-if="reviews.length" class="wrap section">
    <h2>What customers say</h2>
    <ul class="cards quotes">
      <li v-for="(r, i) in reviews.slice(0, 2)" :key="i" class="card">
        <blockquote>&ldquo;{{ r.text }}&rdquo;</blockquote>
        <p class="who">{{ r.name }}, {{ r.place }}</p>
      </li>
    </ul>
    <p><RouterLink to="/reviews">Read more reviews</RouterLink></p>
  </section>
</template>
