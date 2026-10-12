import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// BASE_PATH is set by the GitHub Actions workflow ("/repo-name/" for a project site).
// With a custom domain (or user site) it stays "/".
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [vue()],
  ssgOptions: { formatting: 'minify' },
})
