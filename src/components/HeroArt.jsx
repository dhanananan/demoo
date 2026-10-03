import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cafeConfig } from '../config/cafeConfig';
import BrandBadge from './BrandBadge';
import CupIllustration from './decor/CupIllustration';

/**
 * The hero image, framed as an arch window with a hard brown offset shadow
 * and a rotating seal pinned to its corner. Shows `heroImage` when set, and
 * the built-in illustration otherwise (or if the photo fails to load).
 */
export default function HeroArt({ className = '' }) {
  const prefersReducedMotion = useReducedMotion();
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = Boolean(cafeConfig.heroImage) && !photoFailed;

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
        <div className="arch relative aspect-[4/5] overflow-hidden border-2 border-brown bg-cream">
          {showPhoto ? (
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
          ) : (
            <CupIllustration className="h-full w-full" />
          )}
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.4, rotate: -120 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 140, damping: 14, delay: 0.85 }}
          className="absolute -bottom-8 -right-2"
        >
          <BrandBadge className="h-[5.5rem] w-[5.5rem]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
