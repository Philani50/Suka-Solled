<script setup>
import site from '../content/site.js'
import { telHref, mailHref, waHref, usePageMeta } from '../lib.js'

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
      <dt>Based in</dt><dd>{{ site.address }}</dd>
      <dt>Areas served</dt><dd>{{ site.areas.join(', ') }}</dd>
    </dl>
    <p class="actions"><RouterLink to="/quote" class="btn">Request a quote online</RouterLink></p>
  </div>
</template>
