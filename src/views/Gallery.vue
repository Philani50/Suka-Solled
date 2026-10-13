<script setup>
import { ref, computed } from 'vue'
import site from '../content/site.js'
import { categories, photos } from '../content/gallery.js'
import { asset, usePageMeta } from '../lib.js'

usePageMeta('Gallery', `Posters and photos of ${site.name} Peri-Peri Orange Hot Sauce with braai, chips and wraps.`)

const active = ref('All')
const shown = computed(() => (active.value === 'All' ? photos : photos.filter((p) => p.category === active.value)))

// Lightbox
const dlg = ref(null)
const index = ref(0)
const current = computed(() => shown.value[index.value])
function openAt(i) { index.value = i; dlg.value?.showModal() }
function step(d) { index.value = (index.value + d + shown.value.length) % shown.value.length }
function onKey(e) {
  if (e.key === 'ArrowRight') step(1)
  else if (e.key === 'ArrowLeft') step(-1)
}
function onBackdrop(e) { if (e.target === dlg.value) dlg.value.close() }
let startX = 0
function touchStart(e) { startX = e.changedTouches[0].clientX }
function touchEnd(e) {
  const dx = e.changedTouches[0].clientX - startX
  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
}
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
      <li v-for="(p, i) in shown" :key="p.src">
        <button class="photo-btn" :aria-label="`View larger: ${p.alt}`" @click="openAt(i)">
          <img :src="asset('images/' + p.src)" width="800" height="800" :alt="p.alt" loading="lazy" />
        </button>
        <p class="cap">{{ p.category }}</p>
      </li>
    </ul>
    <p class="actions"><RouterLink to="/order" class="btn">Hungry? Order now</RouterLink></p>

    <dialog ref="dlg" class="lightbox" aria-label="Photo viewer" @keydown="onKey" @click="onBackdrop">
      <div v-if="current" class="lb-inner" @touchstart.passive="touchStart" @touchend.passive="touchEnd">
        <img :src="asset('images/' + current.src)" :alt="current.alt" />
        <p class="lb-cap">{{ current.alt }} ({{ index + 1 }} of {{ shown.length }})</p>
        <button class="lb-btn lb-close" aria-label="Close" @click="dlg.close()">&times;</button>
        <button class="lb-btn lb-prev" aria-label="Previous photo" @click="step(-1)">&lsaquo;</button>
        <button class="lb-btn lb-next" aria-label="Next photo" @click="step(1)">&rsaquo;</button>
      </div>
    </dialog>
  </div>
</template>
