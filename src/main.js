import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import './style.css'

const page = (name) => () => import(`./views/${name}.vue`)

export const routes = [
  { path: '/', component: page('Home') },
  { path: '/products', component: page('Products') },
  { path: '/gallery', component: page('Gallery') },
  { path: '/order', component: page('Order') },
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
      const revealSelector = [
        'main > section',
        'main .cards > li',
        'main .filters',
        'main .details',
        'main .quote-grid > div',
        'main .quote-grid > aside',
        'main .faq-heading',
        'main .faq',
        'main .prose > h2',
        'main .prose > p',
        'main > .wrap.section > .actions',
      ].join(', ')
      let revealObserver
      let revealFrame = 0

      const revealOnScroll = () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

        const main = document.getElementById('main')
        if (!main) return

        revealObserver ??= new IntersectionObserver((entries, observer) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          }
        }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' })

        for (const element of main.querySelectorAll(revealSelector)) {
          if (element.classList.contains('scroll-reveal') || element.classList.contains('is-visible')) continue
          if (element.getBoundingClientRect().top <= window.innerHeight * 0.9) continue
          element.classList.add('scroll-reveal')
          revealObserver.observe(element)
        }
      }

      const scheduleReveal = () => {
        cancelAnimationFrame(revealFrame)
        revealFrame = requestAnimationFrame(() => requestAnimationFrame(revealOnScroll))
      }

      router.afterEach(() => scheduleReveal())
      router.isReady().then(() => {
        scheduleReveal()
        const main = document.getElementById('main')
        if (main && 'MutationObserver' in window) {
          new MutationObserver(scheduleReveal).observe(main, { childList: true, subtree: true })
        }
      })

      router.afterEach((to, from) => {
        if (from.name === undefined && from.path === '/') return
        setTimeout(() => document.getElementById('main')?.focus({ preventScroll: true }), 0)
      })
    }
  },
)
