// Products and prices. "image" is a file in public/images/. Prices are in rand.
export const retailPrice = 23.5

export default [
  { slug: 'single', title: 'Single bottle (125ml)', image: '1000301142.jpg', alt: 'Suka Bhabhalazi peri-peri sauce on chips with a 125ml bottle beside them', text: 'One 125ml bottle of hot and zesty peri-peri orange sauce.', pack: 1, price: null },
  { slug: '6-pack', title: '6-bottle pack', image: '1000301143.jpg', alt: 'Suka Bhabhalazi bulk price poster showing six-bottle pack for R199.99', text: 'Six 125ml bottles. A handy starter pack for your shop or next braai.', pack: 6, price: 199.99 },
  { slug: '12-pack', title: '12-bottle pack', image: '1000301143.jpg', alt: 'Suka Bhabhalazi bulk price poster showing 12-bottle pack for R389.99', text: 'Twelve 125ml bottles for stocking up.', pack: 12, price: 389.99 },
  { slug: '18-pack', title: '18-bottle pack', image: '1000301143.jpg', alt: 'Suka Bhabhalazi bulk price poster showing 18-bottle pack for R569.99', text: 'Eighteen 125ml bottles for sharing or resale.', pack: 18, price: 569.99 },
  { slug: '24-pack', title: '24-bottle pack', image: '1000301143.jpg', alt: 'Suka Bhabhalazi bulk price poster showing 24-bottle pack for R719.99', text: 'Twenty-four 125ml bottles for larger orders.', pack: 24, price: 719.99 },
  { slug: '48-pack', title: '48-bottle pack', image: '1000301143.jpg', alt: 'Suka Bhabhalazi bulk price poster showing 48-bottle pack for R1,399.99', text: 'Forty-eight 125ml bottles for wholesale orders.', pack: 48, price: 1399.99 },
]

export const rand = (n) => 'R' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/\.00$/, '')

// Estimated total for `qty` of a product (qty = bottles for singles, packs otherwise)
export function totalFor(p, qty) {
  if (!p || !Number.isInteger(qty) || qty < 1) return 0
  return qty * (p.price ?? retailPrice)
}
