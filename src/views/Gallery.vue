<script setup>
import { ref, computed } from 'vue'
import site from '../content/site.js'
import { categories, photos } from '../content/gallery.js'
import { asset, usePageMeta } from '../lib.js'

usePageMeta('Gallery', `Photos of recent wardrobes, kitchens, sink units, shelves and doors built by ${site.name}.`)

const active = ref('All')
const shown = computed(() => (active.value === 'All' ? photos : photos.filter((p) => p.category === active.value)))
</script>

<template>
  <div class="wrap section">
    <h1>Gallery</h1>
    <div class="filters" role="group" aria-label="Filter by category">
      <button
        v-for="c in ['All', ...categories]"
        :key="c"
        class="chip"
        :aria-pressed="active === c"
        @click="active = c"
      >{{ c }}</button>
    </div>
    <p class="sr" aria-live="polite">Showing {{ shown.length }} photos</p>
    <ul class="cards photos">
      <li v-for="p in shown" :key="p.src">
        <img :src="asset('images/' + p.src)" width="800" height="600" :alt="p.alt" loading="lazy" />
        <p class="cap">{{ p.category }}</p>
      </li>
    </ul>
    <p class="actions"><RouterLink to="/quote" class="btn">Like what you see? Get a quote</RouterLink></p>
  </div>
</template>
