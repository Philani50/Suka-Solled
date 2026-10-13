# Carpentry website (Vue 3 + Vite, static)

A static site for a small carpentry business: Home, Services, Gallery, Request a Quote, Reviews, Contact, Privacy Notice. No backend. Every page is pre-rendered to plain HTML at build time (via `vite-ssg`), so it is fast, SEO-friendly and runs on GitHub Pages, Cloudflare Pages or Netlify.

## Run it locally

Needs [Node.js](https://nodejs.org) 20+.

```
npm install
npm run dev       # live preview at http://localhost:5173
npm run build     # static site into dist/
```

## Where to edit things (all plain text files)

| What | File |
| --- | --- |
| Business name, phone, email, hours, areas, Google review link, form settings, privacy retention | `src/content/site.js` |
| Services list | `src/content/services.js` |
| Gallery photos, categories and alt text | `src/content/gallery.js` |
| Testimonials | `src/content/reviews.js` |
| Colours and fonts | top of `src/style.css` (`:root` variables) |
| Page wording | `src/views/*.vue` (the text between the `<template>` tags) |

Everything in these files is **placeholder** (name, phone, reviews, photos). Replace it all before going live. The testimonials must be real ones you have permission to use.

Also update the domain (`https://www.yourcarpentry.co.za`) in `public/robots.txt` and `public/sitemap.xml`, and `siteUrl` in `site.js`.

## Swapping photos

1. Put your photos in `public/images/`. Resize to about 1200 px wide and save as `.webp` or `.jpg` (under ~200 KB each, e.g. with squoosh.app).
2. Edit the file name and `alt` text in `src/content/gallery.js` (and `services.js` for service pictures; the hero is `public/images/hero.svg`, referenced in `src/views/Home.vue`).
3. Alt text should describe the photo, e.g. "Built-in oak wardrobe with sliding doors in a bedroom".

## Quote form setup (free form service)

The form emails each request to the owner. Pick one service:

**Formspree** (formspree.io): create a form, copy its URL (`https://formspree.io/f/xxxxxxxx`). In `site.js`:
```js
form: { provider: 'formspree', providerName: 'Formspree', endpoint: 'https://formspree.io/f/xxxxxxxx', accessKey: '' }
```

**Web3Forms** (web3forms.com): enter the owner's email to get an access key. In `site.js`:
```js
form: { provider: 'web3forms', providerName: 'Web3Forms', endpoint: 'https://api.web3forms.com/submit', accessKey: 'YOUR_PUBLIC_KEY' }
```

These identifiers are public by design (they only let people send *to* your inbox), so it is fine for them to be in a public repo. Do not put any private API secrets in this project. In the service's dashboard, restrict allowed domains if offered.

Spam protection: a hidden honeypot field. If the form service is unconfigured or down, the customer sees an error with the phone, WhatsApp and email options. The privacy notice names the provider from `providerName`.

## Deploy to GitHub Pages

1. Create a GitHub repo and push this project to the `main` branch.
2. In the repo: **Settings > Pages > Source: GitHub Actions**.
3. Each push to `main` runs `.github/workflows/deploy.yml`, which builds and publishes the site at `https://USER.github.io/REPO/`.

**Custom domain** (e.g. `yourcarpentry.co.za`): in Settings > Pages add the domain and set the DNS records GitHub shows. Then delete the `BASE_PATH` line in `.github/workflows/deploy.yml` so the site builds for the domain root. For Cloudflare Pages / Netlify: build command `npm run build`, output folder `dist`, no `BASE_PATH`.

## Before going live checklist

- [ ] Real business name, contacts, areas, hours in `site.js`
- [ ] Real photos with alt text; real reviews; real Google review link
- [ ] Form service configured and a test submission received
- [ ] Privacy notice read and checked by the owner (retention period, provider, contact); verify the Information Regulator contact details are still current
- [ ] Domain updated in `site.js`, `robots.txt`, `sitemap.xml`
