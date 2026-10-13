<script setup>
import site from '../content/site.js'
import { mailHref, usePageMeta } from '../lib.js'

usePageMeta('Privacy notice', `How ${site.name} collects, uses and protects your personal information under POPIA.`)
</script>

<template>
  <div class="wrap section prose">
    <h1>Privacy notice</h1>
    <p>Last updated: {{ site.privacy.lastUpdated }}</p>
    <p>
      {{ site.name }} ("we") respects your privacy and processes personal information in line with the
      Protection of Personal Information Act 4 of 2013 (POPIA).
    </p>

    <h2>Who is responsible</h2>
    <p>
      The responsible party is {{ site.name }}, {{ site.address }}. Contact {{ site.owner }}:
      <a :href="mailHref">{{ site.email }}</a>, {{ site.phoneDisplay }}.
    </p>

    <h2>What we collect</h2>
    <p>
      When you use the quote form we collect: your name, phone number, email address, the type of
      service, your project description, rough measurements, preferred date and service area. If you
      contact us by phone, WhatsApp or email we receive the details you send us. This website does not
      use advertising cookies or tracking.
    </p>

    <h2>Why we collect it</h2>
    <p>
      Only to reply to your request, prepare a quote, arrange a visit or job, and keep records of work
      done. We do not sell your information or use it for unrelated marketing.
    </p>

    <h2>Who holds it</h2>
    <p>
      Form submissions are sent through {{ site.form.providerName }}, a third-party form service, which
      delivers them to our email. {{ site.form.providerName }} may process and store the data on servers
      outside South Africa. We choose providers that protect personal information. Messages sent by
      WhatsApp are handled by WhatsApp under its own privacy policy.
    </p>

    <h2>How long we keep it</h2>
    <p>
      We keep enquiries and quotes for up to {{ site.privacy.retention }}, then delete them, unless the law
      requires us to keep job and invoice records longer.
    </p>

    <h2>Your rights</h2>
    <p>
      You may ask us to see, correct or delete your personal information, or object to our processing it,
      by emailing <a :href="mailHref">{{ site.email }}</a>. If you are unhappy with how we handled your
      information you may complain to the Information Regulator:
      <a href="mailto:POPIAComplaints@inforegulator.org.za">POPIAComplaints@inforegulator.org.za</a>,
      <a href="https://inforegulator.org.za" target="_blank" rel="noopener">inforegulator.org.za</a>.
    </p>
  </div>
</template>
