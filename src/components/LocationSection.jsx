import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MapPin, Navigation } from 'lucide-react';
import { cafeConfig, directionsUrl } from '../config/cafeConfig';
import MapIllustration from './decor/MapIllustration';

/**
 * "Come find us": a street-map graphic over the address, with one clear
 * button for turn-by-turn directions.
 */
export default function LocationSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      aria-labelledby="visit-heading"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: 'spring', stiffness: 160, damping: 20 }}
      className="overflow-hidden rounded-[1.25rem] border-2 border-brown bg-cream shadow-hard"
    >
      <div className="h-32 border-b-2 border-brown">
        <MapIllustration className="h-full w-full" />
      </div>

      <div className="p-5">
        <h2 id="visit-heading" className="font-display text-[1.875rem] leading-none">
          {cafeConfig.copy?.visit ?? 'Come find us'}
        </h2>

        <address className="mt-3 flex items-start gap-2 font-serif text-[1.0625rem] not-italic leading-snug">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <span>{cafeConfig.address}</span>
        </address>

        <motion.a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get directions to the café on Google Maps (opens in a new tab)"
          whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
          className="group mt-5 flex items-center justify-center gap-2 rounded-full border-2 border-brown bg-brown px-5 py-3.5 text-base font-bold text-cream transition-colors duration-200 hover:bg-cream hover:text-brown"
        >
          <Navigation
            className="h-[1.125rem] w-[1.125rem] text-cream transition-colors duration-200 group-hover:text-brown"
            aria-hidden="true"
          />
          Get Directions
          <ArrowUpRight
            className="h-[1.125rem] w-[1.125rem] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2.5}
            aria-hidden="true"
          />
        </motion.a>
      </div>
    </motion.section>
  );
}
