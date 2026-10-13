<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import site from '../content/site.js'
import products, { totalFor, rand } from '../content/products.js'
import { telHref, mailHref, waHref, usePageMeta } from '../lib.js'

usePageMeta('Place an order', `Order Peri-Peri Orange Hot Sauce from ${site.name}. Choose your pack and we will confirm delivery and payment.`)

const blank = () => ({
  name: '', phone: '', email: '', product: '', quantity: 1, method: 'Delivery',
  address: '', notes: '', date: '', consent: false, website: '', // "website" is the hidden honeypot
})
const form = reactive(blank())
const status = ref('idle') // idle | sending | success | error
const minDate = ref('')
const route = useRoute()
const router = useRouter()
onMounted(() => {
  minDate.value = new Date().toISOString().slice(0, 10)
  const wanted = route.query.product
  if (typeof wanted === 'string' && products.some((p) => p.title === wanted)) form.product = wanted
})

const selected = computed(() => products.find((p) => p.title === form.product))
const total = computed(() => totalFor(selected.value, Number(form.quantity)))
const quantityLabel = computed(() => (selected.value?.pack === 1 ? 'Number of bottles *' : 'Number of packs *'))

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
      Name: form.name, Phone: form.phone, Email: form.email, Product: form.product,
      Quantity: form.quantity, 'Estimated total': rand(total.value),
      'Delivery or collection': form.method, 'Delivery address / area': form.address,
      Notes: form.notes, 'Preferred date (request only)': form.date,
      'Consent given': 'Yes',
    }
    for (const [k, v] of Object.entries(fields)) data.append(k, v)
    if (form.email) data.append(site.form.provider === 'web3forms' ? 'replyto' : '_replyto', form.email)
    if (site.form.provider === 'web3forms') {
      data.append('access_key', site.form.accessKey)
      data.append('subject', `New order from ${form.name}`)
      data.append('from_name', site.name)
      data.append('botcheck', '')
    } else {
      data.append('_subject', `New order from ${form.name}`)
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
      <h1>Place an order</h1>
      <p class="lead">Choose your sauce and tell us where to bring it. We will contact you to confirm the total and payment.</p>

      <div v-if="status === 'success'" class="notice ok" role="status" tabindex="-1">
        <strong>Thank you!</strong> Your order has been sent. We will contact you soon to confirm the details and payment.
      </div>

      <form v-else @submit.prevent="submit">
        <p class="hint">Fields marked * are required.</p>

        <label for="name">Name *</label>
        <input id="name" v-model="form.name" type="text" autocomplete="name" required />

        <label for="phone">Phone number *</label>
        <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" required />

        <label for="email">Email *</label>
        <input id="email" v-model="form.email" type="email" autocomplete="email" required />

        <label for="product">Product *</label>
        <select id="product" v-model="form.product" required>
          <option value="" disabled>Choose a product</option>
          <option v-for="p in products" :key="p.slug">{{ p.title }}</option>
        </select>

        <label for="quantity">{{ quantityLabel }}</label>
        <input id="quantity" v-model.number="form.quantity" type="number" min="1" max="500" step="1" inputmode="numeric" required />
        <p v-if="total" class="hint" role="status">Estimated total: <strong>{{ rand(total) }}</strong> (we confirm the final total, including any delivery cost).</p>

        <label for="method">Delivery or collection *</label>
        <select id="method" v-model="form.method" required>
          <option>Delivery</option>
          <option>Collection</option>
        </select>

        <label for="address">{{ form.method === 'Delivery' ? 'Delivery address *' : 'Your area *' }}</label>
        <input id="address" v-model="form.address" type="text" list="areas" autocomplete="street-address" required />
        <datalist id="areas"><option v-for="a in site.areas" :key="a" :value="a" /></datalist>

        <label for="date">Preferred date</label>
        <input id="date" v-model="form.date" type="date" :min="minDate" aria-describedby="d-hint" />
        <p id="d-hint" class="hint">This is a request only. We will confirm the actual date with you.</p>

        <label for="notes">Notes</label>
        <textarea id="notes" v-model="form.notes" rows="3"></textarea>

        <!-- Honeypot: hidden from people, bots fill it in -->
        <div class="hp" aria-hidden="true">
          <label for="website">Leave this field empty</label>
          <input id="website" v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
        </div>

        <p class="check">
          <input id="consent" v-model="form.consent" type="checkbox" required />
          <label for="consent">
            I agree that {{ site.name }} may use my details to respond to this order, as described in the
            <RouterLink to="/privacy" target="_blank">privacy notice</RouterLink>. *
          </label>
        </p>

        <div v-if="status === 'error'" class="notice bad" role="alert">
          Sorry, your order could not be sent. Please try again, or contact us directly on
          <a :href="telHref">{{ site.phoneDisplay }}</a>, WhatsApp or <a :href="mailHref">{{ site.email }}</a>.
        </div>

        <button class="btn" type="submit" :disabled="status === 'sending'">
          {{ status === 'sending' ? 'Sending...' : 'Send order' }}
        </button>
      </form>
    </div>

    <aside class="card side" aria-label="Other ways to order">
      <h2>Prefer to talk?</h2>
      <p>Call <a :href="telHref" class="strong">{{ site.phoneDisplay }}</a></p>
      <p><a :href="waHref()" class="btn alt" target="_blank" rel="noopener">Order on WhatsApp</a></p>
      <p>Or email <a :href="mailHref">{{ site.email }}</a></p>
      <p class="hint">{{ site.hours }}</p>
    </aside>
  </div>
</template>
