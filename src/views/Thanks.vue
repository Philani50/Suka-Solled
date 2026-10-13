<script setup>
import { useHead } from '@unhead/vue'
import site from '../content/site.js'
import { telHref, waHref, usePageMeta } from '../lib.js'

usePageMeta('Thank you', `Your order has been sent to ${site.name}.`)
useHead({ meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <div class="wrap section prose">
    <h1>Thank you, your order is in</h1>
    <p class="lead">We have received your order and will contact you soon to confirm the total, delivery or collection, and payment.</p>
    <p>For anything urgent, call <a :href="telHref" class="strong">{{ site.phoneDisplay }}</a>.</p>
    <p class="actions">
      <a :href="waHref('Hi! I just placed an order on your website.')" class="btn" target="_blank" rel="noopener">Message us on WhatsApp</a>
      <RouterLink to="/gallery" class="btn alt">See the gallery</RouterLink>
    </p>
  </div>
</template>
