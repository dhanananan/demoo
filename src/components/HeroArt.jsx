import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cafeConfig } from '../config/cafeConfig';
import BrandBadge from './BrandBadge';
import CupIllustration from './decor/CupIllustration';

/**
 * The hero image, framed as an arch window with a hard brown offset shadow
 * and a rotating seal pinned to its corner. It shows, in order of preference:
 *   1. `heroImage`, a photo, if one is configured
 *   2. the café's logo on a cream plate (so the mark is the star)
 *   3. a built-in cup illustration, if neither can be loaded
 */
export default function HeroArt({ className = '' }) {
  const prefersReducedMotion = useReducedMotion();
  const [photoFailed, setPhotoFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const showPhoto = Boolean(cafeConfig.heroImage) && !photoFailed;
  const showLogo = !showPhoto && Boolean(cafeConfig.logo) && !logoFailed;

  // The outer div is positioned by the parent (via className); the inner
  // motion.div is the positioning context for the shadow and the seal.
  return (
    <div className={className}>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 44 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.25 }}
        className="relative"
      >
        {/* Offset shadow arch */}
        <div
          aria-hidden="true"
          className="arch absolute inset-0 translate-x-2 translate-y-2 bg-brown"
        />

        {/* The arch itself */}
        <div
          className={`arch relative aspect-[4/5] overflow-hidden border-2 border-brown ${
            showLogo ? 'bg-yellow' : 'bg-cream'
          }`}
        >
          {showPhoto && (
            <img
              src={cafeConfig.heroImage}
              alt=""
              width={400}
              height={500}
              decoding="async"
              fetchpriority="high"
              className="h-full w-full object-cover"
              onError={() => setPhotoFailed(true)}
            />
          )}

          {showLogo && (
            <>
              {/* Cream plate behind the mark, so thin line-art and the orange
                  flame both stay clear against the yellow arch */}
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-[57%] aspect-square w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream"
              />
              {/* Inset from the top so the antler tips clear the arch's curve */}
              <img
                src={cafeConfig.logo}
                alt={`${cafeConfig.name} logo`}
                width={400}
                height={500}
                decoding="async"
                fetchpriority="high"
                className="absolute left-[11%] top-[16%] h-[76%] w-[78%] object-contain"
                onError={() => setLogoFailed(true)}
              />
            </>
          )}

          {!showPhoto && !showLogo && <CupIllustration className="h-full w-full" />}
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.4, rotate: -120 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 140, damping: 14, delay: 0.85 }}
          // Half the arch's width and pinned by percentages, so the seal shrinks
          // with the arch on small phones instead of covering the logo
          className="absolute -bottom-[14.5%] -right-[4.6%] w-1/2"
        >
          <BrandBadge className="aspect-square w-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}
