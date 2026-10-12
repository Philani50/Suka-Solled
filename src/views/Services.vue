<script setup>
import site from '../content/site.js'
import services from '../content/services.js'
import { asset, usePageMeta } from '../lib.js'

usePageMeta(
  'Carpentry services',
  `Wardrobes, kitchen cupboards, sink units, shelves, doors, repairs and installations by ${site.name} in ${site.areas.slice(0, 3).join(', ')}.`,
)
</script>

<template>
  <div class="wrap section">
    <h1>Carpentry services</h1>
    <p class="lead">We serve {{ site.areas.join(', ') }}. Not sure what you need? Tell us about your project and we will advise.</p>
    <ul class="cards">
      <li v-for="s in services" :id="s.slug" :key="s.slug" class="card">
        <img :src="asset('images/' + s.image)" width="800" height="600" :alt="`Placeholder: ${s.title.toLowerCase()}`" loading="lazy" />
        <h2>{{ s.title }}</h2>
        <p>{{ s.text }}</p>
      </li>
    </ul>
    <p class="actions"><RouterLink to="/quote" class="btn">Request a quote</RouterLink></p>
  </div>
</template>
