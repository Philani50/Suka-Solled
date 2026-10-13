// Products and prices. "image" is a file in public/images/. Prices are in rand.
// Single bottles: retail price, dropping to the bulk price from 10 bottles.
export const retailPrice = 34.49
export const bulkPrice = 28
export const bulkFrom = 10

export default [
  { slug: 'single', title: 'Single bottle (250ml)', image: '206867.jpg', alt: 'Suka Solled Peri-Peri Orange Hot Sauce bottle next to a braai meat wrap', text: 'One 250ml bottle of hot and zesty peri-peri orange sauce. R34.49 each, or R28 each when you buy 10 or more.', pack: 1, price: null },
  { slug: '6-pack', title: '6-bottle pack', image: '206866.jpg', alt: 'Six-pack of Suka Solled Peri-Peri Orange Sauce in shrink wrap', text: 'Six 250ml bottles, R28 per bottle. Great for a tuckshop shelf or a few braais.', pack: 6, price: 168 },
  { slug: '12-pack', title: '12-bottle pack', image: '206866.jpg', alt: 'Suka Solled bulk deals price list', text: 'Twelve 250ml bottles, R25 per bottle.', pack: 12, price: 300 },
  { slug: '18-pack', title: '18-bottle pack', image: '206866.jpg', alt: 'Suka Solled bulk deals price list', text: 'Eighteen 250ml bottles, R24 per bottle.', pack: 18, price: 432 },
  { slug: '24-pack', title: '24-bottle pack', image: '206866.jpg', alt: 'Suka Solled bulk deals price list', text: 'Twenty-four 250ml bottles, R22 per bottle. Our best price for restaurants and street food sellers.', pack: 24, price: 528 },
]

export const rand = (n) => 'R' + n.toFixed(2).replace(/\.00$/, '')

// Estimated total for `qty` of a product (qty = bottles for singles, packs otherwise)
export function totalFor(p, qty) {
  if (!p || !qty || qty < 1) return 0
  if (p.price === null) return qty * (qty >= bulkFrom ? bulkPrice : retailPrice)
  return qty * p.price
}
