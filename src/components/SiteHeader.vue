<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import site from '../content/site.js'

const open = ref(false)
const route = useRoute()
watch(() => route.path, () => (open.value = false))

const links = [
  ['/', 'Home'],
  ['/products', 'Shop'],
  ['/gallery', 'Gallery'],
  ['/reviews', 'Reviews'],
  ['/contact', 'Contact'],
]
</script>

<template>
  <header class="site-header">
    <div class="wrap bar">
      <RouterLink to="/" class="brand">
        <svg class="logo" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="brand-flame" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#ffb454" />
              <stop offset="1" stop-color="#f04426" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="20" fill="#211614" />
          <circle cx="32" cy="32" r="25" fill="url(#brand-flame)" opacity=".18" />
          <path d="M34 9c2 9 13 15 13 28a15 15 0 0 1-30 0c0-7 4-12 8-17 1 5 3 8 5 10 2-7 3-13 4-21z" fill="url(#brand-flame)" />
          <path d="M33 31c1 5 6 8 6 13a7 7 0 0 1-14 0c0-3 2-6 4-8 1 2 2 3 2 5 1-3 1-6 2-10z" fill="#fff2dc" />
        </svg>
        <span>{{ site.name }}</span>
      </RouterLink>
      <button class="menu-btn" :aria-expanded="open" aria-controls="nav" @click="open = !open">
        {{ open ? 'Close' : 'Menu' }}
      </button>
      <nav id="nav" aria-label="Main" :class="{ open }">
        <RouterLink v-for="[to, label] in links" :key="to" :to="to">{{ label }}</RouterLink>
        <RouterLink to="/order" class="btn small">Order sauce <span aria-hidden="true">→</span></RouterLink>
      </nav>
    </div>
  </header>
</template>
