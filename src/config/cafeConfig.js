/**
 * ============================================================================
 *  CAFÉ CONFIGURATION — SINGLE SOURCE OF TRUTH
 * ============================================================================
 *  Edit everything about your café here. No other file needs to change.
 *
 *  Tips:
 *   - phone:      full international format, e.g. "+9779865098275"
 *   - whatsapp:   digits only, with country code, no "+" e.g. "9779865098275"
 *   - To hide a link, leave its value empty ('') — it simply disappears.
 *     To add it back, paste the URL in.
 *   - Brand colours and fonts live in tailwind.config.js.
 * ============================================================================
 */

export const cafeConfig = {
  // --- Identity -------------------------------------------------------------
  name: 'Kaffika',
  // PLACEHOLDER: write your own line.
  tagline: 'Where every cup tells a story',
  // Logo lives in /public (public/logo.svg). It is shown large in the hero
  // arch. Replace the file to change it, or point this at another path.
  logo: '/logo.svg',
  // Optional hero photo shown in the arch INSTEAD of the logo. Leave empty to
  // show the logo. Portrait works best (~800×1000, under 150 KB),
  // e.g. '/hero.jpg' after placing hero.jpg in /public.
  heroImage: '',

  // --- Brand flourishes (PLACEHOLDER copy: change to suit your café) --------
  // Text that circles the rotating seal. Keep it short and end with " • ".
  badgeText: 'Freshly brewed • Made with love • ',
  // Words that scroll along the yellow tape under the hero (shown in capitals).
  ticker: ['Kitchen', 'Coffee', 'Community'],
  // Small headings used on the page.
  copy: {
    online: 'Find us online',
    visit: 'Come find us',
  },

  // --- Location -------------------------------------------------------------
  city: 'Budhanilkantha',
  address: 'Budhanilkantha, Bagmati Province 44600, Nepal',
  // Where "Get Directions" navigates. Google Maps understands plus codes
  // (the "Q9H4+XXM" code is your listing's exact spot); if this is left
  // empty, the address above is used instead.
  directionsTo: 'Q9H4+XXM Budhanilkantha, Bagmati Province 44600, Nepal',

  // --- Contact --------------------------------------------------------------
  phone: '+9779865098275', // full international format (Nepal = +977)
  // The same number is used for WhatsApp. If it is NOT on WhatsApp, set this
  // to '' and the WhatsApp button and footer icon are hidden.
  whatsapp: '9779865098275', // digits only, country code first, no "+"
  whatsappMessage: 'Hi! I found you via your QR code and would love to know more.',

  // --- Social & web ---------------------------------------------------------
  social: {
    instagram: 'https://www.instagram.com/kaf_fika',
    facebook: 'https://www.facebook.com/share/1ED8rag2VA/',
    tiktok: 'https://www.tiktok.com/@kaffika91',
  },
  // Not provided yet: paste a URL to show these links.
  menuUrl: '',
  website: '',

  // --- Google Maps ----------------------------------------------------------
  // Your listing's share link (Google Maps → Share). Opens in the Maps app.
  mapsUrl: 'https://maps.app.goo.gl/HduZ76wvy7NF27nH9',

  // --- Footer ---------------------------------------------------------------
  footerMessage: 'Thanks for stopping by — we can’t wait to serve you.',
};

/**
 * Google Maps "Get Directions" link: opens turn-by-turn directions straight
 * to the café from wherever the visitor is.
 */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  cafeConfig.directionsTo || cafeConfig.address
)}`;

/**
 * The contact / social links shown on the page. Reorder, remove, or add freely.
 *
 *  icon    instagram | facebook | tiktok | whatsapp | maps | phone | menu | website
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
    id: 'instagram',
    icon: 'instagram',
    title: 'Instagram',
    label: 'Follow us on Instagram',
    href: cafeConfig.social.instagram,
    enabled: Boolean(cafeConfig.social.instagram),
    external: true,
    layout: 'tile',
    tone: 'brown',
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
    tone: 'yellow',
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
    id: 'tiktok',
    icon: 'tiktok',
    title: 'TikTok',
    label: 'Watch us on TikTok',
    href: cafeConfig.social.tiktok,
    enabled: Boolean(cafeConfig.social.tiktok),
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
