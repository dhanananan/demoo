/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  future: {
    // Only apply :hover styles on devices that can actually hover, so taps on
    // a phone never leave a link stuck in its hover state.
    hoverOnlyWhenSupported: true,
  },
  theme: {
    // The brand palette is the ONLY palette. An off-brand colour class simply
    // won't compile, which keeps the design honest as it's edited.
    //
    // The page currently uses CREAM and BROWN only (depth comes from tints of
    // those two, e.g. bg-brown/10). Orange and yellow are the original accents:
    // nothing uses them now, but they stay defined so they are easy to bring back.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      cream: '#FDE3CF', // paper: backgrounds, and light type on brown
      brown: '#632713', // ink: type, outlines, the hero and footer
      orange: '#EC6426', // unused by the current theme
      yellow: '#F8A91F', // unused by the current theme
    },
    extend: {
      fontFamily: {
        // Expressive brand voice: the name, big action labels, ticker.
        // Fonts are bundled (src/fonts.css); the fallbacks are heavy faces so
        // even a failed load keeps the weight of the design.
        display: ['"Lilita One"', '"Arial Rounded MT Bold"', '"Arial Black"', 'system-ui', 'sans-serif'],
        // Editorial accents: tagline, link titles, address
        serif: ['Fraunces', 'Georgia', 'serif'],
        // Everything functional
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Flat "sticker" shadows, drawn in the brand's ink colour
        hard: '0 5px 0 0 #632713',
        'hard-sm': '0 3px 0 0 #632713',
        'hard-lg': '10px 10px 0 0 #632713',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'steam-rise': {
          '0%, 100%': { transform: 'translateY(3px)', opacity: '0.45' },
          '50%': { transform: 'translateY(-3px)', opacity: '1' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.35', transform: 'scale(0.75)' },
        },
        'pin-pulse': {
          '0%': { transform: 'scale(0.4)', opacity: '0.8' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        // A coffee bean tumbling down through the hero. Each bean sets its own
        // --bean-drift (sideways travel), --bean-spin (total turn) and
        // --bean-opacity from CSS variables, so one animation serves them all.
        'bean-fall': {
          '0%': { transform: 'translate3d(0, -3rem, 0) rotate(0deg)', opacity: '0' },
          '12%': { opacity: 'var(--bean-opacity, 0.3)' },
          '88%': { opacity: 'var(--bean-opacity, 0.3)' },
          '100%': {
            transform: 'translate3d(var(--bean-drift, 1rem), 22rem, 0) rotate(var(--bean-spin, 200deg))',
            opacity: '0',
          },
        },
        // A resting bean bobbing gently in place.
        'bean-float': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, -0.6rem, 0) rotate(8deg)' },
        },
        // A small rocking motion, for the beans on the ticker tape.
        'bean-wobble': {
          '0%, 100%': { transform: 'rotate(10deg)' },
          '50%': { transform: 'rotate(38deg)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'spin-slow': 'spin-slow 24s linear infinite',
        'steam-rise': 'steam-rise 3.2s ease-in-out infinite',
        twinkle: 'twinkle 2.8s ease-in-out infinite',
        'pin-pulse': 'pin-pulse 2.4s ease-out infinite',
        'bean-fall': 'bean-fall 14s linear infinite',
        'bean-float': 'bean-float 7s ease-in-out infinite',
        'bean-wobble': 'bean-wobble 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
