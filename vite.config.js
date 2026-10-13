import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { cloudflare } from "@cloudflare/vite-plugin";

// BASE_PATH is set by the GitHub Actions workflow ("/repo-name/" for a project site).
// With a custom domain (or user site) it stays "/".
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [vue(), cloudflare()],
  ssgOptions: { formatting: 'minify' },
})