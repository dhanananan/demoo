/**
 * ============================================================================
 *  CAFÉ CONFIGURATION — SINGLE SOURCE OF TRUTH
 * ============================================================================
 *  Edit everything about your café here. No other file needs to change.
 *
 *  Tips:
 *   - phones:     full international format, e.g. "+9779865098275"
 *   - whatsapp:   digits only, with country code, no "+" e.g. "9779865098275"
 *   - To hide a link, leave its value empty ('') — it simply disappears.
 *     To add it back, paste the URL in.
 *   - Brand colours and fonts live in tailwind.config.js.
 * ============================================================================
 */

export const cafeConfig = {
  // --- Identity -------------------------------------------------------------
  name: 'Kaf-Fika',
  // The line on the tilted sticker under the name.
  tagline: 'by Feast & Frost',
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
  // Words that scroll along the cream tape under the hero (shown in capitals).
  ticker: ['Kitchen', 'Coffee', 'Community'],
  // Small headings used on the page.
  copy: {
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
  // Each number gets its own tap-to-call row, in this order. `number` is what
  // a tap dials (full international format, Nepal = +977); `display` is how it
  // is written on the page. Add or remove entries freely.
  phones: [{ number: '+9779851444775', display: '9851444775' }],
  // The WhatsApp number. It gets its own row (the WhatsApp logo + the number),
  // so visitors can tell it from the call number, and a tap opens a chat.
  // Digits only, country code first, no "+". Leave empty to hide the row and
  // the footer WhatsApp icon.
  whatsapp: '9779851444775',
  // How the WhatsApp number is written on the page.
  whatsappDisplay: '9851444775',
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
 * The links shown on the page, top to bottom. Every link looks the same (an
 * icon, a title and a line of text), so reorder, remove or add freely.
 *
 *  icon  instagram | facebook | tiktok | whatsapp | maps | phone | menu | website
 *        (the phone rows come from `phones` above, the WhatsApp row from `whatsapp`)
 *  title the bold name   ·   label the line underneath it (leave '' for none;
 *  then also set `ariaLabel`, the text a screen reader should announce)
 */
export const CONTACT_LINKS = [
  // One row per number in `phones`. Each shows the number alone: no label line.
  // `ariaLabel` is what a screen reader announces, since a number by itself
  // doesn't say what it does.
  ...cafeConfig.phones
    .filter((phone) => phone.number)
    .map((phone, i) => ({
      id: `phone-${i}`,
      icon: 'phone',
      title: phone.display || phone.number,
      label: '',
      ariaLabel: `Call ${phone.display || phone.number}`,
      href: `tel:${phone.number}`,
      enabled: true,
      external: false,
    })),
  // The WhatsApp number, also shown alone. The WhatsApp logo (instead of the
  // phone icon) is what tells visitors it is a WhatsApp number.
  {
    id: 'whatsapp',
    icon: 'whatsapp',
    title: cafeConfig.whatsappDisplay || cafeConfig.whatsapp,
    label: '',
    ariaLabel: `Chat on WhatsApp with ${cafeConfig.whatsappDisplay || cafeConfig.whatsapp}`,
    href: `https://wa.me/${cafeConfig.whatsapp}?text=${encodeURIComponent(
      cafeConfig.whatsappMessage
    )}`,
    enabled: Boolean(cafeConfig.whatsapp),
    external: true,
  },
  {
    id: 'maps',
    icon: 'maps',
    title: 'Google Maps',
    label: 'Find us on Google Maps',
    href: cafeConfig.mapsUrl,
    enabled: Boolean(cafeConfig.mapsUrl),
    external: true,
  },
  {
    id: 'menu',
    icon: 'menu',
    title: 'Menu',
    label: 'Explore our menu',
    href: cafeConfig.menuUrl,
    enabled: Boolean(cafeConfig.menuUrl),
    external: true,
  },
  {
    id: 'instagram',
    icon: 'instagram',
    title: 'Instagram',
    label: 'Follow us on Instagram',
    href: cafeConfig.social.instagram,
    enabled: Boolean(cafeConfig.social.instagram),
    external: true,
  },
  {
    id: 'facebook',
    icon: 'facebook',
    title: 'Facebook',
    label: 'Connect with us on Facebook',
    href: cafeConfig.social.facebook,
    enabled: Boolean(cafeConfig.social.facebook),
    external: true,
  },
  {
    id: 'tiktok',
    icon: 'tiktok',
    title: 'TikTok',
    label: 'Watch us on TikTok',
    href: cafeConfig.social.tiktok,
    enabled: Boolean(cafeConfig.social.tiktok),
    external: true,
  },
  {
    id: 'website',
    icon: 'website',
    title: 'Website',
    label: 'Visit our website',
    href: cafeConfig.website,
    enabled: Boolean(cafeConfig.website),
    external: true,
  },
];
