// One-off helper that made the placeholder images. Safe to delete.
import { writeFileSync } from 'node:fs'
const hues = [28, 35, 22, 40, 30, 25, 33, 20, 38]
const labels = ['Wardrobe', 'Wardrobe', 'Kitchen', 'Kitchen', 'Sink unit', 'Shelves', 'Door', 'Repair', 'Installation']
hues.forEach((h, i) => {
  const n = String(i + 1).padStart(2, '0')
  writeFileSync(`public/images/gallery-${n}.svg`,
`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="hsl(${h},35%,78%)"/><rect x="140" y="120" width="520" height="360" rx="8" fill="hsl(${h},40%,45%)" opacity=".5"/><text x="400" y="310" font-family="sans-serif" font-size="44" text-anchor="middle" fill="hsl(${h},45%,22%)">${labels[i]}</text><text x="400" y="360" font-family="sans-serif" font-size="24" text-anchor="middle" fill="hsl(${h},45%,22%)">Placeholder photo</text></svg>`)
})
writeFileSync('public/images/hero.svg',
`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700"><rect width="1200" height="700" fill="#c9a77c"/><rect x="200" y="140" width="800" height="440" rx="10" fill="#8a5a2b" opacity=".45"/><text x="600" y="360" font-family="sans-serif" font-size="56" text-anchor="middle" fill="#3b2410">Hero photo placeholder</text></svg>`)
writeFileSync('public/favicon.svg',
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#5a3a1e"/><path d="M14 44h36v6H14zM18 18h28v6H18zM24 24h4v20h-4zM36 24h4v20h-4z" fill="#f3e3c8"/></svg>`)
writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\nSitemap: https://www.yourcarpentry.co.za/sitemap.xml\n`)
const pages = ['', 'services', 'gallery', 'quote', 'reviews', 'contact', 'privacy']
writeFileSync('public/sitemap.xml',
`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => `  <url><loc>https://www.yourcarpentry.co.za/${p}</loc></url>`).join('\n')}\n</urlset>\n`)
writeFileSync('public/404.html',
`<!doctype html><html lang="en-ZA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found</title></head><body style="font-family:sans-serif;max-width:32rem;margin:4rem auto;padding:0 1rem"><h1>Page not found</h1><p>Sorry, we could not find that page.</p><p><a href="./">Go to the home page</a></p></body></html>\n`)
