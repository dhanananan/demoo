/**
 * ============================================================================
 *  CAFÉ CONFIGURATION — SINGLE SOURCE OF TRUTH
 * ============================================================================
 *  Edit everything about your café here. No other file needs to change.
 *
 *  Tips:
 *   - phone:      full international format, e.g. "+15551234567"
 *   - whatsapp:   digits only, with country code, no "+" e.g. "15551234567"
 *   - To hide a link, clear its value (or set `enabled: false` in CONTACT_LINKS).
 *   - Brand colours and fonts live in tailwind.config.js.
 * ============================================================================
 */

export const cafeConfig = {
  // --- Identity -------------------------------------------------------------
  name: 'Café Aroma',
  tagline: 'Where every cup tells a story',
  // Logo lives in /public. Replace the placeholder with your own (square
  // PNG/JPG/SVG works best) and keep the filename, or update the path here.
  logo: '/logo.svg',
  // Optional hero photo shown in the arch window. Leave empty to use the
  // built-in illustration. Portrait works best (~800×1000, under 150 KB),
  // e.g. '/hero.jpg' after placing hero.jpg in /public.
  heroImage: '',

  // --- Brand flourishes -----------------------------------------------------
  // Text that circles the rotating seal. Keep it short and end with " • ".
  badgeText: 'Freshly brewed • Made with love • ',
  // Phrases that scroll along the yellow tape under the hero.
  ticker: ['Freshly brewed', 'Slow mornings', 'Good company', 'Warm pastries'],
  // Small headings used on the page.
  copy: {
    online: 'Find us online',
    visit: 'Come find us',
  },

  // --- Location -------------------------------------------------------------
  city: 'Downtown · Your City',
  address: '123 Coffee Street, Downtown, Your City 12345',

  // --- Contact --------------------------------------------------------------
  phone: '+15551234567', // full international format
  whatsapp: '15551234567', // digits only, country code first, no "+"
  whatsappMessage: 'Hi! I found you via your QR code and would love to know more.',

  // --- Social & web ---------------------------------------------------------
  social: {
    instagram: 'https://instagram.com/your_cafe',
    facebook: 'https://facebook.com/your_cafe',
  },
  menuUrl: 'https://your-cafe.com/menu',
  website: 'https://your-cafe.com',

  // --- Google Maps ----------------------------------------------------------
  // `mapsUrl`: a share link to your exact location (Google Maps → Share).
  // The "Get directions" link is generated below from the address.
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Caf%C3%A9+Aroma+Your+City',

  // --- Footer ---------------------------------------------------------------
  footerMessage: 'Thanks for stopping by — we can’t wait to serve you.',
};

/**
 * Google Maps "Get Directions" link, built from the address so visitors are
 * routed to the café from wherever they are.
 */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  cafeConfig.address
)}`;

/**
 * The contact / social links shown on the page. Reorder, remove, or add freely.
 *
 *  icon    instagram | facebook | whatsapp | maps | phone | menu | website
 *  layout  how the link is presented, which also sets its importance:
 *            'feature' – the big pill button (use for the #1 action)
 *            'tile'    – bold square tiles, shown two across
 *            'row'     – quiet menu-board rows
 *  tone    colour of 'feature' / 'tile' links: orange | yellow | brown
 *          (ignored for rows)
 */
export const CONTACT_LINKS = [
  {
    id: 'whatsapp',
    icon: 'whatsapp',
    title: 'WhatsApp',
    label: 'Chat with us on WhatsApp',
    href: `https://wa.me/${cafeConfig.whatsapp}?text=${encodeURIComponent(
      cafeConfig.whatsappMessage
    )}`,
    enabled: Boolean(cafeConfig.whatsapp),
    external: true,
    layout: 'feature',
    tone: 'orange',
  },
  {
    id: 'maps',
    icon: 'maps',
    title: 'Google Maps',
    label: 'Find us on Google Maps',
    href: cafeConfig.mapsUrl,
    enabled: Boolean(cafeConfig.mapsUrl),
    external: true,
    layout: 'tile',
    tone: 'yellow',
  },
  {
    id: 'menu',
    icon: 'menu',
    title: 'Menu',
    label: 'Explore our menu',
    href: cafeConfig.menuUrl,
    enabled: Boolean(cafeConfig.menuUrl),
    external: true,
    layout: 'tile',
    tone: 'brown',
  },
  {
    id: 'instagram',
    icon: 'instagram',
    title: 'Instagram',
    label: 'Follow us on Instagram',
    href: cafeConfig.social.instagram,
    enabled: Boolean(cafeConfig.social.instagram),
    external: true,
    layout: 'row',
  },
  {
    id: 'facebook',
    icon: 'facebook',
    title: 'Facebook',
    label: 'Connect with us on Facebook',
    href: cafeConfig.social.facebook,
    enabled: Boolean(cafeConfig.social.facebook),
    external: true,
    layout: 'row',
  },
  {
    id: 'phone',
    icon: 'phone',
    title: 'Call us',
    label: 'Call the café',
    href: `tel:${cafeConfig.phone}`,
    enabled: Boolean(cafeConfig.phone),
    external: false,
    layout: 'row',
  },
  {
    id: 'website',
    icon: 'website',
    title: 'Website',
    label: 'Visit our website',
    href: cafeConfig.website,
    enabled: Boolean(cafeConfig.website),
    external: true,
    layout: 'row',
  },
];
