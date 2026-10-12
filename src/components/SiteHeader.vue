<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import site from '../content/site.js'

const open = ref(false)
const route = useRoute()
watch(() => route.path, () => (open.value = false))

const links = [
  ['/', 'Home'],
  ['/services', 'Services'],
  ['/gallery', 'Gallery'],
  ['/reviews', 'Reviews'],
  ['/contact', 'Contact'],
]
</script>

<template>
  <header class="site-header">
    <div class="wrap bar">
      <RouterLink to="/" class="brand">{{ site.name }}</RouterLink>
      <button class="menu-btn" :aria-expanded="open" aria-controls="nav" @click="open = !open">
        {{ open ? 'Close' : 'Menu' }}
      </button>
      <nav id="nav" aria-label="Main" :class="{ open }">
        <RouterLink v-for="[to, label] in links" :key="to" :to="to">{{ label }}</RouterLink>
        <RouterLink to="/quote" class="btn small">Get a quote</RouterLink>
      </nav>
    </div>
  </header>
</template>
