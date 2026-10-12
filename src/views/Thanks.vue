<script setup>
import { useHead } from '@unhead/vue'
import site from '../content/site.js'
import { telHref, waHref, usePageMeta } from '../lib.js'

usePageMeta('Thank you', `Your quote request has been sent to ${site.name}.`)
useHead({ meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <div class="wrap section prose">
    <h1>Thank you, your request is in</h1>
    <p class="lead">We have received your quote request and will contact you soon to discuss the project and arrange a free measure-up.</p>
    <p>If you have photos of the space, please send them on WhatsApp so we can prepare. For anything urgent, call <a :href="telHref" class="strong">{{ site.phoneDisplay }}</a>.</p>
    <p class="actions">
      <a :href="waHref('Hi! I just sent a quote request on your website. Here are some photos of the space.')" class="btn" target="_blank" rel="noopener">Send photos on WhatsApp</a>
      <RouterLink to="/gallery" class="btn alt">See our work</RouterLink>
    </p>
  </div>
</template>
