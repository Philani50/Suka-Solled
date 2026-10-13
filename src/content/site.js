// ============================================================
//  EDIT THIS FILE to change business details across the site.
//  Everything here is PLACEHOLDER text - replace it with real info.
// ============================================================
export default {
  name: "Ntuzuma Woodworks",
  tagline: 'Custom wardrobes, kitchens and woodwork built to last.',
  owner: ' Thabiso Ngcamu',
  phoneDisplay: '067 260 9595',
  phoneInternational: '27672609595', // no "+", no spaces, no leading 0 (used for tel: and WhatsApp)
  email: 'philanishange50@gmail.com',
  hours: 'Mon-Fri 07:30-17:00, Sat 08:00-13:00',
  address: 'H2282 Martin gumede, Ntuzuma, Durban, KwaZulu-Natal', // keep general if you work from home

  // Used in the page text and the Google search data (structured data)
  areas: ['Anywhere in Durban and surrounding areas'], // list of areas you serve, e.g. "Durban, Umhlanga, Ballito"
  region: 'KwaZulu-Natal',
  country: 'ZA',

  siteUrl: 'https://www.ntuzumawoodworks.co.za', // final web address (no trailing slash)
  googleReviewsUrl: 'https://g.page/r/YOUR_GOOGLE_REVIEW_LINK', // replace with your Google review link
  facebookUrl: '',

  whatsappMessage: 'Hi! I would like a quote for some carpentry work.',

  // Form service. See README. No secrets here: both keys are public by design.
  form: {
    provider: 'formspree', // 'formspree' or 'web3forms'
    providerName: 'Formspree', // shown on the privacy notice
    endpoint: 'https://formspree.io/f/mdeadjko',
    accessKey: '', // web3forms only: your public access key
  },

  privacy: {
    retention: '24 months',
    lastUpdated: '11 October 2026',
  },
}
