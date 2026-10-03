# ☕ Café Digital Business Card

A bold, mobile-first **digital business card** for a café. Print a QR code on
your physical card, and customers who scan it land on a one-page site with every
way to connect — phone, Google Maps, Instagram, Facebook, TikTok, and (once you
add them) a menu and website — a single tap away.

Built with **React + Vite**, **Tailwind CSS**, **Lucide React** and
**Framer Motion**. No backend, no database — just a fast static page.

---

## 🎨 Design

The look is café packaging: a dark-brown label for the hero, with orange accents
and cream lettering, brown "ink" for type and outlines on the page, yellow tape
across the seam, cream paper for the page. Below the
hero, every link is the same plain row (icon, bold title, one line of text); a
yellow wash sweeps across a row on hover and fills it on tap.

| Colour | Hex       | Role                                                  |
| ------ | --------- | ----------------------------------------------------- |
| Orange | `#EC6426` | Accent: name shadow, arch shadow and rings in the hero |
| Yellow | `#F8A91F` | Highlights: ticker tape, seal, arch, link hover       |
| Cream  | `#FDE3CF` | Paper: page background, the hero name and stickers    |
| Brown  | `#632713` | Ink: the hero and footer backgrounds, all page type   |

The palette lives in [`tailwind.config.js`](tailwind.config.js) and replaces
Tailwind's defaults — **only these four colours compile**, so the design can't
drift off-brand by accident.

| Font          | Used for                                          |
| ------------- | ------------------------------------------------- |
| Lilita One    | The café name, the ticker, "Come find us"         |
| Fraunces      | Editorial accents: tagline, link titles, address  |
| DM Sans       | Everything functional: labels, buttons, small text |

The fonts are **bundled with the site** ([`src/fonts.css`](src/fonts.css) and
`public/fonts/`), not loaded from Google. A visitor downloads about 127 KB, from
your own domain only, so the typography is identical on every network,
ad-blocker and in-app browser. (When fonts were loaded from Google and that
request was blocked, the page silently fell back to system fonts, which looked
like mismatched type.)

**To change a font** (for example, to use Poppins for the interface text):

```bash
npm install @fontsource/poppins
```

then add `import '@fontsource/poppins/400.css'` (and `500.css`, `600.css`,
`700.css` as needed) to [`src/main.jsx`](src/main.jsx), and swap the family name
in the `fontFamily` section of [`tailwind.config.js`](tailwind.config.js).
Remove the old `@font-face` rules and preload links for any font you stop using.

**Contrast rules baked into the design:** brown on cream is 9.3:1 and brown on
yellow 5.8:1; cream on brown (the hero name and tagline) is the same 9.3:1.
Brown on orange is only 3.5:1 and cream on orange 2.7:1, so orange is never
used behind text, only for shadows, rings and borders. An automated axe-core
audit reports 0 violations.

**Layout:** on a phone the page *is* the card, edge to edge. From tablet up it
becomes a compact centred card on a colour-blocked backdrop — it never stretches
across the screen. Reduced-motion preferences are respected everywhere.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+ (tested on Node 24)
- npm (comes with Node)

### Install & run

```bash
npm install     # 1. install dependencies
npm run dev     # 2. start the dev server
```

Open the printed local URL (usually `http://localhost:5173`). To preview as a
phone, open your browser's dev tools and toggle the device toolbar.

### Build for production

```bash
npm run build     # outputs static files to /dist
npm run preview   # preview the production build locally
```

---

## ⚙️ Customization

Open [`src/config/cafeConfig.js`](src/config/cafeConfig.js) — it's the single
source of truth. Everything below is edited there.

**Identity**
- `name`, `tagline`, `logo` (shown large in the hero arch)
- `heroImage` — leave empty to show the logo, or set a photo path (portrait,
  ~800×1000, under 150 KB) to show a photo in the arch instead
- `badgeText` — text that circles the rotating seal (end it with `" • "`)
- `ticker` — the words that scroll along the yellow tape (shown in capitals)
- `copy.visit` — the heading on the location card

**Location & contact**
- `city` (the small pill), `address`, `mapsUrl` (your Google Maps share link)
- `directionsTo` — where the **Get Directions** button navigates. A Google Maps
  plus code works well (it pins the exact spot); if empty, `address` is used
- `phone` in full international format (e.g. `+9779865098275`) is what a tap
  dials; `phoneDisplay` (e.g. `9865098275`) is how the number is written on the
  page. The phone row shows the number alone
- `whatsapp` is currently empty, so there is no WhatsApp row or footer icon. To
  bring them back, enter the number as digits only (e.g. `9779865098275`)
- `social.instagram`, `social.facebook`, `social.tiktok`, `menuUrl`, `website`
- `footerMessage`

**The link list** — `CONTACT_LINKS`, shown top to bottom. Every link has the
same look, so each entry only needs an `icon`, a `title` and a `label`.
**To hide a link**, clear its value in the config (e.g. an empty `website`) or
set `enabled: false`. **To reorder**, reorder the list.

### Replace the images
- `public/logo.svg` → your logo. The included one is the Kaf-Fika stag, traced
  from the supplied JPG into a crisp vector with a transparent background (an
  SVG or a PNG with a transparent background works best, since a JPG brings its
  own background colour). It is shown large, on a cream plate in the hero arch.
- `public/og-image.png` → the picture shown when your link is shared (see below)
- `public/favicon.svg` → browser tab icon (a thickened version of the logo)

### Update SEO / social preview
Edit the `<title>`, `<meta name="description">` and the Open Graph / Twitter
tags in [`index.html`](index.html). After deploying, set your real production
URL in `og:url`, `og:image` and `twitter:image`.

`public/og-image.png` (1200×630) is what WhatsApp, Facebook, iMessage and X show
when someone shares your link — likely, since cafés share their QR page. The
included one shows the Kaf-Fika logo, name and location; replace it with a photo
or your own graphic whenever you like. Use a **PNG or JPG** (social platforms
don't render SVG).

---

## ▲ Deploy to Vercel

Vercel auto-detects Vite — no config needed.

**Option A — Dashboard (easiest)**
1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework Preset: **Vite** · Build Command: `npm run build` · Output Dir: `dist`.
4. Click **Deploy**. You'll get an HTTPS URL like `https://your-cafe.vercel.app`.

**Option B — Vercel CLI**
```bash
npm i -g vercel
vercel          # follow the prompts (first run links the project)
vercel --prod   # deploy to production
```

> ✅ Vercel serves over **HTTPS** by default, which QR scanners need to open the
> page reliably. Add a custom domain in the Vercel dashboard if you have one.

---

## 📱 Generate the QR Code

Point the QR code at your **deployed HTTPS URL** (never `localhost`).

**Quick, free options**
- [qr-code-generator.com](https://www.qr-code-generator.com/)
- [qrcode.tec-it.com](https://qrcode.tec-it.com/)
- Or run locally:
  ```bash
  npx qrcode "https://your-cafe.vercel.app" -o cafe-qr.png
  ```

**Tips for print**
1. Use the **final production URL** (set your custom domain first if you'll use
   one — changing the URL later means reprinting).
2. Export at high resolution (SVG or 1000×1000+ PNG) for crisp printing.
3. Keep a quiet margin around the code and strong contrast (dark code on a light
   background). The brand brown `#632713` on cream `#FDE3CF` scans well, but test it.
4. **Test the printed code** with several phones (iOS + Android cameras) before
   a big print run.

The QR code does **not** need to appear on the landing page — it lives on your
physical business card.

---

## 📂 Project Structure

```
.
├─ index.html                      # HTML shell, font preloads, SEO / Open Graph meta
├─ public/
│  ├─ fonts/                       # Bundled Lilita One, Fraunces, DM Sans (.woff2)
│  ├─ favicon.svg                  # Browser tab icon
│  ├─ logo.svg                     # Kaf-Fika logo (vector, transparent)
│  └─ og-image.png                 # Link-share preview (1200×630)
├─ src/
│  ├─ main.jsx                     # App entry
│  ├─ App.jsx                      # Page composition + desktop backdrop
│  ├─ fonts.css                    # @font-face rules for the bundled fonts
│  ├─ index.css                    # Tailwind layers, arch/awning shapes, focus + motion rules
│  ├─ config/
│  │  └─ cafeConfig.js             # ⭐ All café data & links (edit here)
│  └─ components/
│     ├─ CafeHeader.jsx            # Orange hero shell: rings, beans, ticker
│     ├─ CafeProfile.jsx           # Logo, location, animated name, tagline sticker
│     ├─ HeroArt.jsx               # Arch window (logo or photo) + seal
│     ├─ BrandBadge.jsx            # Rotating text seal
│     ├─ BrandTicker.jsx           # Scrolling yellow tape
│     ├─ ContactLinks.jsx          # The link list, built from the config
│     ├─ SocialLinkCard.jsx        # One link row: icon, title, label
│     ├─ LocationSection.jsx       # Street-map graphic, address, Get Directions
│     ├─ CafeFooter.jsx            # Awning edge, message, socials, copyright
│     ├─ icons/BrandIcons.jsx      # Instagram / Facebook / WhatsApp marks
│     └─ decor/                    # Bean + sparkle shapes, cup & map illustrations
├─ tailwind.config.js              # Brand palette, fonts, shadows, keyframes
├─ postcss.config.js
├─ vite.config.js
└─ package.json
```

---

## 📄 License

Free to use and adapt for your café. Replace the placeholder content and images
with your own.
