<script setup>
import site from '../content/site.js'
import { telHref, mailHref, waHref } from '../lib.js'
</script>

<template>
  <footer class="site-footer">
    <div class="wrap grid3">
      <div>
        <p class="strong">{{ site.name }}</p>
        <p>{{ site.tagline }}</p>
      </div>
      <div>
        <p class="strong">Contact</p>
        <p><a :href="telHref">{{ site.phoneDisplay }}</a></p>
        <p><a :href="mailHref">{{ site.email }}</a></p>
        <p><a :href="waHref()" target="_blank" rel="noopener">WhatsApp us</a></p>
        <p v-if="site.facebookUrl"><a :href="site.facebookUrl" target="_blank" rel="noopener">Facebook</a></p>
      </div>
      <div>
        <p class="strong">Areas we serve</p>
        <p>{{ site.areas.join(', ') }}</p>
        <p><RouterLink to="/privacy">Privacy notice</RouterLink></p>
      </div>
    </div>
    <p class="wrap copy">&copy; {{ new Date().getFullYear() }} {{ site.name }}. All rights reserved.</p>
  </footer>
</template>
