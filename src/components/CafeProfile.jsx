import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Coffee, MapPin } from 'lucide-react';
import { cafeConfig } from '../config/cafeConfig';
import HeroArt from './HeroArt';

const nameVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 38, rotate: 7 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: 'spring', stiffness: 260, damping: 15 },
  },
};

/**
 * The café's identity, composed editorially rather than centred: logo and
 * location along the top, then a big left-aligned name that overlaps the arch
 * illustration on the right, with the tagline as a tilted paper sticker.
 */
export default function CafeProfile() {
  const prefersReducedMotion = useReducedMotion();
  const [logoFailed, setLogoFailed] = useState(false);

  // One block per word, so a long name stacks instead of overflowing. The
  // layout is tuned for words up to 5 letters at full size; longer words
  // scale the whole name down proportionally so they still fit the column.
  const words = cafeConfig.name.trim().split(/\s+/);
  const longestWord = Math.max(...words.map((word) => [...word].length));
  const nameShrink = Math.min(1, 5 / longestWord);

  return (
    <div>
      {/* Top bar: logo + location */}
      <div className="flex items-center justify-between gap-3">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          className="grid h-[3.25rem] w-[3.25rem] shrink-0 place-items-center overflow-hidden rounded-full border-2 border-brown bg-cream shadow-hard-sm"
        >
          {cafeConfig.logo && !logoFailed ? (
            <img
              src={cafeConfig.logo}
              alt={`${cafeConfig.name} logo`}
              width={52}
              height={52}
              className="h-full w-full object-contain"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <Coffee className="h-6 w-6 text-brown" aria-hidden="true" />
          )}
        </motion.div>

        {cafeConfig.city && (
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
            className="flex min-w-0 items-center gap-1.5 rounded-full border-2 border-brown bg-cream px-3 py-1.5 text-[0.8125rem] font-semibold leading-none"
          >
            <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
            <span className="truncate">{cafeConfig.city}</span>
          </motion.p>
        )}
      </div>

      {/* Name + tagline over the arch illustration */}
      <div className="relative mt-3 min-h-[15rem]">
        <HeroArt className="absolute right-0 top-0 w-1/2 max-w-[12.5rem]" />

        <div className="relative z-10 pr-[38%] pt-8">
          <motion.h1
            variants={nameVariants}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            style={{ '--name-shrink': nameShrink }}
            className="hero-name font-display leading-[0.88] text-brown [text-shadow:3px_3px_0_theme(colors.cream)]"
          >
            <span className="sr-only">{cafeConfig.name}</span>
            {words.map((word, w) => (
              <span key={w} aria-hidden="true" className="block whitespace-nowrap">
                {[...word.normalize('NFC')].map((char, i) => (
                  <motion.span
                    key={i}
                    variants={letterVariants}
                    className="inline-block"
                  >
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
            className="mt-5 origin-left"
          >
            <p className="inline-block max-w-[9.5rem] -rotate-2 rounded-lg border-2 border-brown bg-cream px-3 py-2 font-serif text-[1.0625rem] font-medium italic leading-snug shadow-hard-sm">
              {cafeConfig.tagline}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
