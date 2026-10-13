// ============================================================
//  EDIT THIS FILE to change business details across the site.
//  Everything here is PLACEHOLDER text - replace it with real info.
// ============================================================
export default {
  name: 'Suka Solled',
  tagline: 'Township premium peri-peri orange sauce. Flame. Zest. Flavour.',
  owner: 'Alwande Sithole',
  phoneDisplay: '069 803 2911',
  phoneInternational: '27698032911', // no "+", no spaces, no leading 0 (used for tel: and WhatsApp)
  email: 'alwandesithole428@gmail.com',
  hours: 'Mon-Fri 07:30-17:00, Sat 08:00-13:00',
  address: '237 Annette Van Zyl Garsfontein, Pretoria East', // keep general if you work from home

  // Used in the page text and the Google search data (structured data)
  areas: ['Any where in South Africa'], // list of areas you serve, e.g. "Durban, Umhlanga, Ballito"
  region: 'Gouteng',
  country: 'ZA',

  siteUrl: 'https://suka-solled.woodworks.workers.dev', // final web address (no trailing slash)
  googleReviewsUrl: 'https://g.page/r/YOUR_GOOGLE_REVIEW_LINK', // replace with your Google review link
  facebookUrl: '',

  whatsappMessage: 'Hi! I would like to order Suka Solled Peri-Peri Orange Sauce.',

  // Form service. See README. No secrets here: both keys are public by design.
  form: {
    provider: 'formspree', // 'formspree' or 'web3forms'
    providerName: 'Formspree', // shown on the privacy notice
    endpoint: 'https://formspree.io/f/mqpeyqoa',
    accessKey: '', // web3forms only: your public access key
  },

  privacy: {
    retention: '24 months',
    lastUpdated: '13 October 2026',
  },
}
