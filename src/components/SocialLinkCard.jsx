import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const BROWN = '#632713';
const ORANGE = '#EC6426';

/**
 * Colour recipes for the bold treatments. Every pairing is chosen for
 * contrast: ink-brown on orange is only used for large type, and small text
 * sits on yellow, cream or brown.
 *   surface – the button itself   badge – the icon disc   arrow – the arrow disc
 *   ink     – colour of the flat "sticker" shadow beneath the button
 */
const TONES = {
  orange: {
    surface: 'bg-orange text-brown',
    badge: 'bg-brown text-cream',
    arrow: 'bg-cream text-brown',
    ink: BROWN,
    focus: '',
  },
  yellow: {
    surface: 'bg-yellow text-brown',
    badge: 'bg-brown text-cream',
    arrow: 'bg-cream text-brown',
    ink: BROWN,
    focus: '',
  },
  brown: {
    surface: 'bg-brown text-cream',
    badge: 'bg-yellow text-brown',
    arrow: 'bg-yellow text-brown',
    ink: ORANGE,
    focus: 'focus-visible:outline-yellow',
  },
};

const stickerShadow = (color, depth) => `0 ${depth}px 0 0 ${color}`;
const entrance = { type: 'spring', stiffness: 200, damping: 20 };

/**
 * One tappable link, in one of three treatments:
 *
 *   feature – a big pill button for the single most important action
 *   tile    – a bold colour-blocked square, meant to sit two across
 *   row     – a quiet, menu-board style line for everything else
 *
 * Entrance animation is driven by the parent (it supplies the stagger).
 *
 * Props: Icon, title (short name), label (the call to action), href,
 * external (opens a new tab), variant, tone (feature/tile), tilt (tile, deg),
 * index (row, for alternating icon colours).
 */
export default function SocialLinkCard({
  Icon,
  title,
  label,
  href,
  external = true,
  variant = 'row',
  tone = 'orange',
  tilt = 0,
  index = 0,
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion();

  const anchorProps = {
    href,
    'aria-label': external ? `${label} (opens in a new tab)` : label,
    ...(external && { target: '_blank', rel: 'noopener noreferrer' }),
  };

  if (variant === 'row') {
    return (
      <motion.a
        {...anchorProps}
        variants={{
          hidden: { opacity: 0, y: 18 },
          visible: { opacity: 1, y: 0, transition: entrance },
        }}
        style={{ backgroundColor: 'rgba(248, 169, 31, 0)' }}
        whileTap={{ backgroundColor: 'rgba(248, 169, 31, 1)' }}
        className={`group relative -mx-5 flex items-center gap-4 overflow-hidden border-b-2 border-dotted border-brown/40 px-5 py-3.5 focus-visible:outline-offset-[-4px] ${className}`}
      >
        {/* Yellow wash that sweeps across on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-left scale-x-0 bg-yellow transition-transform duration-300 ease-out group-hover:scale-x-100"
        />

        <span
          className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-brown text-brown transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-105 ${
            index % 2 === 0 ? 'bg-orange' : 'bg-cream'
          }`}
        >
          <Icon size={22} strokeWidth={2.25} aria-hidden="true" />
        </span>

        <span className="relative min-w-0 flex-1">
          <span className="block font-serif text-[1.375rem] font-semibold leading-tight">
            {title}
          </span>
          {/* 90% ink keeps this above 4.5:1 even on the yellow hover wash */}
          <span className="block text-[0.9375rem] leading-snug text-brown/90">{label}</span>
        </span>

        <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-brown transition-colors duration-200 group-hover:bg-brown group-hover:text-cream">
          <ArrowUpRight
            size={18}
            strokeWidth={2.5}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </motion.a>
    );
  }

  // feature + tile share a "physical button" feel: a flat shadow that lifts on
  // hover and is pressed flat on tap.
  const t = TONES[tone] ?? TONES.orange;
  const rest = stickerShadow(t.ink, 5);

  const bold = {
    variants: {
      hidden: { opacity: 0, y: 28, rotate: tilt, boxShadow: rest },
      visible: { opacity: 1, y: 0, rotate: tilt, boxShadow: rest, transition: entrance },
    },
    whileHover: prefersReducedMotion
      ? undefined
      : { y: -3, rotate: 0, boxShadow: stickerShadow(t.ink, 8) },
    whileTap: prefersReducedMotion
      ? undefined
      : { y: 4, rotate: 0, boxShadow: stickerShadow(t.ink, 1) },
  };

  if (variant === 'feature') {
    return (
      <motion.a
        {...anchorProps}
        {...bold}
        className={`group flex min-h-[4.75rem] items-center gap-2.5 rounded-full border-2 border-brown py-2.5 pl-2.5 pr-3 min-[360px]:gap-3 ${t.surface} ${t.focus} ${className}`}
      >
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110 min-[360px]:h-14 min-[360px]:w-14 ${t.badge}`}
        >
          <Icon size={28} aria-hidden="true" />
        </span>

        {/* Large type (24px+), so brown-on-orange clears the 3:1 contrast bar */}
        <span className="min-w-0 flex-1 text-balance font-display text-2xl leading-[1.05] min-[360px]:text-[1.625rem]">
          {label}
        </span>

        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform duration-200 group-hover:rotate-45 min-[360px]:h-11 min-[360px]:w-11 ${t.arrow}`}
        >
          <ArrowUpRight size={22} strokeWidth={2.5} aria-hidden="true" />
        </span>
      </motion.a>
    );
  }

  // tile
  return (
    <motion.a
      {...anchorProps}
      {...bold}
      className={`group flex min-h-[8.75rem] flex-col justify-between rounded-[1.25rem] border-2 border-brown p-3.5 ${t.surface} ${t.focus} ${className}`}
    >
      <span className="flex items-start justify-between">
        <span
          className={`grid h-11 w-11 place-items-center rounded-full transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110 ${t.badge}`}
        >
          <Icon size={22} aria-hidden="true" />
        </span>
        <span
          className={`grid h-8 w-8 place-items-center rounded-full transition-transform duration-200 group-hover:rotate-45 ${t.arrow}`}
        >
          <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" />
        </span>
      </span>

      <span>
        <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.16em]">
          {title}
        </span>
        <span className="mt-1 block text-balance font-display text-[1.3125rem] leading-[1.05]">
          {label}
        </span>
      </span>
    </motion.a>
  );
}
