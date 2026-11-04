<script setup>
import site from '../content/site.js'
import products, { rand, retailPrice } from '../content/products.js'
import reviews from '../content/reviews.js'
import process from '../content/process.js'
import { asset, waHref, usePageMeta } from '../lib.js'

usePageMeta(
  '',
  `${site.name} Peri-Peri Orange Hot Sauce: hot and zesty 125ml bottles, with bulk packs for tuckshops, restaurants and street food in ${site.areas.slice(0, 3).join(', ')}. Order online.`,
)
</script>

<template>
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">{{ site.region }} <span aria-hidden="true">/</span> peri-peri orange</p>
        <h1>Bring the <span>heat.</span> Keep the flavour.</h1>
        <p class="lead">Meet {{ site.name }}: hot, zesty peri-peri orange sauce made for braais, chips, wraps and everything that needs a little more fire.</p>
        <p class="hero-price"><strong>{{ rand(retailPrice) }}</strong> <span>per 125ml bottle</span></p>
        <p class="hero-saving">Bulk packs available from 6 to 48 bottles.</p>
        <p class="actions">
          <RouterLink to="/products" class="btn">Shop the sauce <span aria-hidden="true">→</span></RouterLink>
          <a :href="waHref()" class="btn alt" target="_blank" rel="noopener">Chat on WhatsApp</a>
        </p>
      </div>
      <div class="hero-photo">
        <img :src="asset('images/1000301139.jpg')" width="1600" height="1067" alt="Suka Bhabhalazi peri-peri sauce poured over a braai platter of grilled meat and vegetables" fetchpriority="high" />
        <p class="photo-stamp"><span>GOOD FOOD</span><span>GETS FIERY</span></p>
      </div>
    </div>
  </section>

  <section class="trust" aria-label="Why choose Suka Bhabhalazi">
    <ul class="wrap trust-list">
      <li><span aria-hidden="true">✳</span> Hot &amp; zesty</li>
      <li><span aria-hidden="true">✳</span> Orange with attitude</li>
      <li><span aria-hidden="true">✳</span> Better bulk prices</li>
      <li><span aria-hidden="true">✳</span> Delivery or collection</li>
    </ul>
  </section>

  <section class="wrap section">
    <div class="section-heading">
      <div><p class="eyebrow">Pick your heat</p><h2 class="rule">Find your flavour</h2></div>
      <RouterLink to="/products" class="text-link">View all prices <span aria-hidden="true">→</span></RouterLink>
    </div>
    <ul class="cards product-cards">
      <li v-for="p in products" :key="p.slug" class="card product-card lift">
        <img :src="asset('images/' + p.image)" width="800" height="600" :alt="p.alt" loading="lazy" />
        <div class="product-card-copy">
          <p class="product-price">{{ rand(p.price ?? retailPrice) }} <span>{{ p.price === null ? '/ bottle' : `/ ${p.pack} bottles` }}</span></p>
          <h3>{{ p.title }}</h3>
          <p>{{ p.text }}</p>
          <RouterLink :to="{ path: '/order', query: { product: p.title } }" class="text-link">Choose this pack <span aria-hidden="true">→</span></RouterLink>
        </div>
      </li>
    </ul>
  </section>

  <section class="band">
    <div class="wrap">
      <p class="eyebrow">Easy as that</p>
      <h2 class="rule light">A little heat is just a few steps away</h2>
      <ol class="steps">
        <li v-for="(p, i) in process" :key="p.title">
          <span class="step-no" aria-hidden="true">{{ i + 1 }}</span>
          <h3>{{ p.title }}</h3>
          <p>{{ p.text }}</p>
        </li>
      </ol>
      <p class="actions"><RouterLink to="/order" class="btn">Start your order <span aria-hidden="true">→</span></RouterLink></p>
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
