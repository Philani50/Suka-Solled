<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import site from '../content/site.js'
import services from '../content/services.js'
import { telHref, mailHref, waHref, usePageMeta } from '../lib.js'

usePageMeta('Request a quote', `Request a free carpentry quote from ${site.name}. Tell us about your project and we will get back to you.`)

const blank = () => ({
  name: '', phone: '', email: '', service: '', description: '',
  measurements: '', date: '', area: '', consent: false, website: '', // "website" is the hidden honeypot
})
const form = reactive(blank())
const status = ref('idle') // idle | sending | success | error
const minDate = ref('')
const route = useRoute()
const router = useRouter()
onMounted(() => {
  minDate.value = new Date().toISOString().slice(0, 10)
  const wanted = route.query.service
  if (typeof wanted === 'string' && services.some((s) => s.title === wanted)) form.service = wanted
})

async function submit() {
  if (status.value === 'sending') return
  if (form.website) { // a bot filled the hidden field: pretend it worked, send nothing
    status.value = 'success'
    return
  }
  if (!site.form.endpoint) { status.value = 'error'; return }
  status.value = 'sending'
  try {
    const data = new FormData()
    const fields = {
      Name: form.name, Phone: form.phone, Email: form.email, Service: form.service,
      Description: form.description, Measurements: form.measurements,
      'Preferred date (request only)': form.date, 'Service area': form.area,
      'Consent given': 'Yes',
    }
    for (const [k, v] of Object.entries(fields)) data.append(k, v)
    if (form.email) data.append(site.form.provider === 'web3forms' ? 'replyto' : '_replyto', form.email)
    if (site.form.provider === 'web3forms') {
      data.append('access_key', site.form.accessKey)
      data.append('subject', `New quote request from ${form.name}`)
      data.append('from_name', site.name)
      data.append('botcheck', '')
    } else {
      data.append('_subject', `New quote request from ${form.name}`)
    }
    const res = await fetch(site.form.endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
    const json = await res.json().catch(() => ({}))
    if (!res.ok || json.success === false) throw new Error('failed')
    Object.assign(form, blank())
    status.value = 'success'
    router.push('/thank-you')
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <div class="wrap section quote-grid">
    <div>
      <h1>Request a quote</h1>
      <p class="lead">Tell us about your project. We will contact you to discuss it and arrange a free measure-up.</p>

      <div v-if="status === 'success'" class="notice ok" role="status" tabindex="-1">
        <strong>Thank you!</strong> Your request has been sent. We will contact you soon to confirm details and your preferred date.
      </div>

      <form v-else @submit.prevent="submit">
        <p class="hint">Fields marked * are required.</p>

        <label for="name">Name *</label>
        <input id="name" v-model="form.name" type="text" autocomplete="name" required />

        <label for="phone">Phone number *</label>
        <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" required />

        <label for="email">Email *</label>
        <input id="email" v-model="form.email" type="email" autocomplete="email" required />

        <label for="service">Service type *</label>
        <select id="service" v-model="form.service" required>
          <option value="" disabled>Choose a service</option>
          <option v-for="s in services" :key="s.slug">{{ s.title }}</option>
          <option>Something else</option>
        </select>

        <label for="description">Project description *</label>
        <textarea id="description" v-model="form.description" rows="5" required></textarea>

        <label for="measurements">Rough measurements</label>
        <input id="measurements" v-model="form.measurements" type="text" aria-describedby="m-hint" />
        <p id="m-hint" class="hint">For example: wall 3.2 m wide x 2.4 m high. Rough is fine; we will measure properly on site.</p>

        <label for="date">Preferred date</label>
        <input id="date" v-model="form.date" type="date" :min="minDate" aria-describedby="d-hint" />
        <p id="d-hint" class="hint">This is a request only. We will confirm the actual date with you manually.</p>

        <label for="area">Service area *</label>
        <input id="area" v-model="form.area" type="text" list="areas" required />
        <datalist id="areas"><option v-for="a in site.areas" :key="a" :value="a" /></datalist>

        <!-- Honeypot: hidden from people, bots fill it in -->
        <div class="hp" aria-hidden="true">
          <label for="website">Leave this field empty</label>
          <input id="website" v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
        </div>

        <p class="check">
          <input id="consent" v-model="form.consent" type="checkbox" required />
          <label for="consent">
            I agree that {{ site.name }} may use my details to respond to this request, as described in the
            <RouterLink to="/privacy" target="_blank">privacy notice</RouterLink>. *
          </label>
        </p>

        <p class="hint">No photo uploads here. Please send photos of the space by WhatsApp or email after submitting.</p>

        <div v-if="status === 'error'" class="notice bad" role="alert">
          Sorry, your request could not be sent. Please try again, or contact us directly on
          <a :href="telHref">{{ site.phoneDisplay }}</a>, WhatsApp or <a :href="mailHref">{{ site.email }}</a>.
        </div>

        <button class="btn" type="submit" :disabled="status === 'sending'">
          {{ status === 'sending' ? 'Sending...' : 'Send request' }}
        </button>
      </form>
    </div>

    <aside class="card side" aria-label="Other ways to reach us">
      <h2>Prefer to talk?</h2>
      <p>Call <a :href="telHref" class="strong">{{ site.phoneDisplay }}</a></p>
      <p><a :href="waHref()" class="btn alt" target="_blank" rel="noopener">WhatsApp us</a></p>
      <p>Or email <a :href="mailHref">{{ site.email }}</a></p>
      <p class="hint">{{ site.hours }}</p>
    </aside>
  </div>
</template>
