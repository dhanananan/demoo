import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { cafeConfig } from '../config/cafeConfig';
import HeroArt from './HeroArt';

// The name is sized to fill its column, within these bounds (in px)
const NAME_MIN_PX = 36;
const NAME_MAX_PX = 84;

/**
 * Finds the largest font size at which the widest word still fits the element.
 * It measures the real glyph widths once the font has loaded (letter-by-letter,
 * because each letter is its own inline-block and so isn't kerned), and re-fits
 * when the column resizes. Returns null until the first fit is known.
 */
function useFittedFontSize(ref, words) {
  const [size, setSize] = useState(null);
  const text = words.join(' ');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let cancelled = false;
    const ctx = document.createElement('canvas').getContext('2d');

    const fit = async () => {
      const family = getComputedStyle(el).fontFamily;
      try {
        await document.fonts.load(`100px ${family}`, text);
      } catch {
        /* measure with whatever font is available */
      }
      if (cancelled) return;

      ctx.font = `100px ${family}`;
      const widest = Math.max(
        ...words.map((word) =>
          [...word.normalize('NFC')].reduce((sum, char) => sum + ctx.measureText(char).width, 0)
        )
      );
      const available = el.clientWidth;
      if (!available || !widest) return;

      // 4% breathing room for the hard text-shadow and the letters' tilt
      const fitted = (available / widest) * 100 * 0.96;
      setSize(Math.round(Math.min(NAME_MAX_PX, Math.max(NAME_MIN_PX, fitted)) * 10) / 10);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    // Never leave the name hidden if font loading stalls
    const fallback = setTimeout(() => !cancelled && setSize((s) => s ?? 56), 1500);

    return () => {
      cancelled = true;
      observer.disconnect();
      clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return size;
}

/**
 * The café's identity, composed editorially rather than centred: a big
 * left-aligned name that overlaps the arch (which holds the logo) on the
 * right, with the location above it and the tagline as a tilted sticker.
 */
export default function CafeProfile() {
  const prefersReducedMotion = useReducedMotion();
  const nameRef = useRef(null);

  // One block per word, so a multi-word name stacks instead of overflowing
  const words = cafeConfig.name.trim().split(/\s+/);
  const fontSize = useFittedFontSize(nameRef, words);
  const ready = fontSize !== null;

  const nameVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.05, delayChildren: 0.1 } },
  };
  const letterVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 38, rotate: 7 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { type: 'spring', stiffness: 260, damping: 15 },
    },
  };

  return (
    // One grid cell shared by the text and the art, so the row is as tall as
    // whichever is taller and the two can overlap
    <div className="grid pb-8">
      <HeroArt className="col-start-1 row-start-1 w-1/2 max-w-[12.5rem] self-start justify-self-end" />

      {/* 57% wide: the name may overlap the arch's border and cream plate, but
          must stop short of the antlers (dark letters over dark line-art) */}
      <div className="relative z-10 col-start-1 row-start-1 flex w-[57%] flex-col items-start justify-center gap-5">
        {cafeConfig.city && (
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
            className="flex max-w-[10.25rem] items-center gap-1.5 rounded-full border-2 border-brown bg-cream px-3 py-1.5 text-[0.8125rem] font-semibold leading-none"
          >
            <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
            <span className="truncate">{cafeConfig.city}</span>
          </motion.p>
        )}

        <motion.h1
          ref={nameRef}
          variants={nameVariants}
          initial="hidden"
          animate={ready ? 'visible' : 'hidden'}
          style={{ fontSize: fontSize ?? undefined, visibility: ready ? 'visible' : 'hidden' }}
          className="w-full font-display leading-[0.88] text-brown [text-shadow:3px_3px_0_theme(colors.cream)]"
        >
          <span className="sr-only">{cafeConfig.name}</span>
          {words.map((word, w) => (
            <span key={w} aria-hidden="true" className="block whitespace-nowrap">
              {[...word.normalize('NFC')].map((char, i) => (
                <motion.span key={i} variants={letterVariants} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.75 }}
          className="origin-left"
        >
          <p className="inline-block max-w-[9.5rem] -rotate-2 rounded-lg border-2 border-brown bg-cream px-3 py-2 font-serif text-[1.0625rem] font-medium italic leading-snug shadow-hard-sm">
            {cafeConfig.tagline}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
