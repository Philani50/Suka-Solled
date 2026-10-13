<script setup>
import site from '../content/site.js'
import services from '../content/services.js'
import reviews from '../content/reviews.js'
import process from '../content/process.js'
import { asset, waHref, usePageMeta } from '../lib.js'

usePageMeta(
  '',
  `${site.name}: custom wardrobes, kitchen cupboards, sink units, shelves, doors and repairs in ${site.areas.slice(0, 3).join(', ')}. Request a free quote.`,
)
</script>

<template>
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">{{ site.region }} carpentry</p>
        <h1>{{ site.tagline }}</h1>
        <p class="lead">
          Handmade carpentry for homes and businesses in {{ site.areas.join(', ') }}. Honest quotes, tidy work, built to fit.
        </p>
        <p class="actions">
          <RouterLink to="/quote" class="btn">Request a quote</RouterLink>
          <a :href="waHref()" class="btn alt" target="_blank" rel="noopener">WhatsApp us</a>
        </p>
      </div>
      <img :src="asset('images/hero.jpg')" width="1200" height="700" alt="A well-equipped carpentry workshop with timber stacked above a workbench and hand tools on the wall" fetchpriority="high" />
    </div>
  </section>

  <section class="trust" aria-label="Why choose us">
    <ul class="wrap trust-list">
      <li>Free measure-up</li>
      <li>Written quotes</li>
      <li>Made to fit</li>
      <li>Tidy installation</li>
    </ul>
  </section>

  <section class="wrap section">
    <h2 class="rule">What we make and fix</h2>
    <ul class="cards">
      <li v-for="s in services" :key="s.slug" class="card lift">
        <img :src="asset('images/' + s.image)" width="800" height="600" :alt="s.alt" loading="lazy" />
        <h3>{{ s.title }}</h3>
        <p>{{ s.text }}</p>
        <p><RouterLink :to="{ path: '/quote', query: { service: s.title } }">Get a quote for {{ s.title.toLowerCase() }}</RouterLink></p>
      </li>
    </ul>
    <p><RouterLink to="/services">See all services</RouterLink></p>
  </section>

  <section class="band">
    <div class="wrap">
      <h2 class="rule light">How it works</h2>
      <ol class="steps">
        <li v-for="(p, i) in process" :key="p.title">
          <span class="step-no" aria-hidden="true">{{ i + 1 }}</span>
          <h3>{{ p.title }}</h3>
          <p>{{ p.text }}</p>
        </li>
      </ol>
      <p class="actions"><RouterLink to="/quote" class="btn small">Start with a quote</RouterLink></p>
    </div>
  </section>

  <section v-if="reviews.length" class="wrap section">
    <h2 class="rule">What customers say</h2>
    <ul class="cards quotes">
      <li v-for="(r, i) in reviews.slice(0, 2)" :key="i" class="card">
        <blockquote>&ldquo;{{ r.text }}&rdquo;</blockquote>
        <p class="who">{{ r.name }}, {{ r.place }}</p>
      </li>
    </ul>
    <p><RouterLink to="/reviews">Read more reviews</RouterLink></p>
  </section>
</template>
