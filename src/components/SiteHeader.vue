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
      <RouterLink to="/" class="brand">
        <svg class="logo" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><rect width="64" height="64" rx="12" fill="#f3e3c8"/><path d="M14 44h36v6H14zM18 18h28v6H18zM24 24h4v20h-4zM36 24h4v20h-4z" fill="#5a3a1e"/></svg>
        <span>{{ site.name }}</span>
      </RouterLink>
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
