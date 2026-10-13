<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import site from '../content/site.js'

const open = ref(false)
const route = useRoute()
watch(() => route.path, () => (open.value = false))

const links = [
  ['/', 'Home'],
  ['/products', 'Products'],
  ['/gallery', 'Gallery'],
  ['/reviews', 'Reviews'],
  ['/contact', 'Contact'],
]
</script>

<template>
  <header class="site-header">
    <div class="wrap bar">
      <RouterLink to="/" class="brand">
        <svg class="logo" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><rect width="64" height="64" rx="12" fill="#ea580c"/><path d="M32 10c2 8 12 14 12 26a12 12 0 0 1-24 0c0-6 4-9 6-14 2 3 3 5 4 7 2-5 2-12 2-19z" fill="#fff3e0"/></svg>
        <span>{{ site.name }}</span>
      </RouterLink>
      <button class="menu-btn" :aria-expanded="open" aria-controls="nav" @click="open = !open">
        {{ open ? 'Close' : 'Menu' }}
      </button>
      <nav id="nav" aria-label="Main" :class="{ open }">
        <RouterLink v-for="[to, label] in links" :key="to" :to="to">{{ label }}</RouterLink>
        <RouterLink to="/order" class="btn small">Order now</RouterLink>
      </nav>
    </div>
  </header>
</template>
