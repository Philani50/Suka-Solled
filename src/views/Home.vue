<script setup>
import site from '../content/site.js'
import products from '../content/products.js'
import reviews from '../content/reviews.js'
import process from '../content/process.js'
import { asset, waHref, usePageMeta } from '../lib.js'

usePageMeta(
  '',
  `${site.name} Peri-Peri Orange Hot Sauce: hot and zesty 250ml bottles, with bulk packs for tuckshops, restaurants and street food in ${site.areas.slice(0, 3).join(', ')}. Order online.`,
)
</script>

<template>
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">{{ site.region }} hot sauce</p>
        <h1>{{ site.tagline }}</h1>
        <p class="lead">
          Handcrafted peri-peri orange sauce in a 250ml bottle. R34.49 a bottle, or just R28 when you buy 10 or more. Perfect for braai, chips, wraps and street food.
        </p>
        <p class="actions">
          <RouterLink to="/order" class="btn">Order now</RouterLink>
          <a :href="waHref()" class="btn alt" target="_blank" rel="noopener">WhatsApp us</a>
        </p>
      </div>
      <img :src="asset('images/206870.jpg')" width="1200" height="800" alt="Two friends laughing at a braai while one pours Suka Solled sauce over fried chicken and chips" fetchpriority="high" />
    </div>
  </section>

  <section class="trust" aria-label="Why choose us">
    <ul class="wrap trust-list">
      <li>Hot and zesty</li>
      <li>Made in the township</li>
      <li>Bulk savings</li>
      <li>Delivery or collection</li>
    </ul>
  </section>

  <section class="wrap section">
    <h2 class="rule">Choose your pack</h2>
    <ul class="cards">
      <li v-for="p in products" :key="p.slug" class="card lift">
        <img :src="asset('images/' + p.image)" width="800" height="600" :alt="p.alt" loading="lazy" />
        <h3>{{ p.title }}</h3>
        <p>{{ p.text }}</p>
        <p><RouterLink :to="{ path: '/order', query: { product: p.title } }">Order {{ p.title.toLowerCase() }}</RouterLink></p>
      </li>
    </ul>
    <p><RouterLink to="/products">See all products and prices</RouterLink></p>
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
      <p class="actions"><RouterLink to="/order" class="btn small">Start your order</RouterLink></p>
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
