<script setup>
import site from '../content/site.js'
import { telHref, mailHref, waHref, usePageMeta } from '../lib.js'

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`

usePageMeta('Contact', `Call, WhatsApp or email ${site.name}. Serving ${site.areas.join(', ')}.`)
</script>

<template>
  <div class="wrap section">
    <h1>Contact us</h1>
    <dl class="details">
      <dt>Phone</dt><dd><a :href="telHref">{{ site.phoneDisplay }}</a></dd>
      <dt>WhatsApp</dt><dd><a :href="waHref()" target="_blank" rel="noopener">Chat on WhatsApp</a></dd>
      <dt>Email</dt><dd><a :href="mailHref">{{ site.email }}</a></dd>
      <dt>Hours</dt><dd>{{ site.hours }}</dd>
      <dt>Based in</dt><dd>{{ site.address }} (<a :href="mapsHref" target="_blank" rel="noopener">view on Google Maps</a>)</dd>
      <dt>Areas delivered</dt><dd>{{ site.areas.join(', ') }}</dd>
    </dl>
    <p class="actions"><RouterLink to="/order" class="btn">Place an order online</RouterLink></p>
  </div>
</template>
