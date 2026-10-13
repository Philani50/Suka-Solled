import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import './style.css'

const page = (name) => () => import(`./views/${name}.vue`)

export const routes = [
  { path: '/', component: page('Home') },
  { path: '/services', component: page('Services') },
  { path: '/gallery', component: page('Gallery') },
  { path: '/quote', component: page('Quote') },
  { path: '/reviews', component: page('Reviews') },
  { path: '/contact', component: page('Contact') },
  { path: '/thank-you', component: page('Thanks') },
  { path: '/privacy', component: page('Privacy') },
]

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
    scrollBehavior: (to, from, saved) => saved || { top: 0 },
  },
  ({ router, isClient }) => {
    // Move focus to the page heading after navigating (keyboard / screen-reader friendly)
    if (isClient) {
      router.afterEach((to, from) => {
        if (from.name === undefined && from.path === '/') return
        setTimeout(() => document.getElementById('main')?.focus({ preventScroll: true }), 0)
      })
    }
  },
)
