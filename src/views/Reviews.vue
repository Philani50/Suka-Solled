<script setup>
import site from '../content/site.js'
import reviews from '../content/reviews.js'
import { usePageMeta } from '../lib.js'

usePageMeta('Customer reviews', `What customers say about ${site.name}, plus a link to our Google reviews.`)
</script>

<template>
  <div class="wrap section">
    <h1>Customer reviews</h1>
    <ul v-if="reviews.length" class="cards quotes">
      <li v-for="(r, i) in reviews" :key="i" class="card">
        <blockquote>&ldquo;{{ r.text }}&rdquo;</blockquote>
        <p class="who">{{ r.name }}, {{ r.place }}</p>
      </li>
    </ul>
    <p v-else>Reviews are coming soon. In the meantime, see what customers say on Google.</p>
    <p class="actions">
      <a :href="site.googleReviewsUrl" class="btn" target="_blank" rel="noopener">Read our Google reviews (opens in a new tab)</a>
    </p>
  </div>
</template>
