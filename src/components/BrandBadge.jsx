import { useId } from 'react';
import { cafeConfig } from '../config/cafeConfig';
import { Bean } from './decor/Shapes';

// Radius of the circle the text runs along (inside a 100×100 viewBox)
const RADIUS = 35;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
// Full circle starting at the left, travelling clockwise over the top
const RING_PATH = `M50 50m-${RADIUS} 0a${RADIUS} ${RADIUS} 0 1 1 ${RADIUS * 2} 0a${RADIUS} ${RADIUS} 0 1 1 -${RADIUS * 2} 0`;

/**
 * Rotating seal with text running around its edge, in the spirit of a coffee
 * bag sticker. Decorative only. Size it with `className` (e.g. `h-24 w-24`).
 */
export default function BrandBadge({ className = '' }) {
  const pathId = `badge-${useId().replace(/:/g, '')}`;
  const text = cafeConfig.badgeText?.trim().toUpperCase();

  if (!text) return null;

  return (
    <div
      aria-hidden="true"
      className={`relative rounded-full border-2 border-brown bg-yellow shadow-hard-sm ${className}`}
    >
      {/* The ring of text turns slowly; the centre stays put */}
      <div className="absolute inset-0 animate-spin-slow">
        <svg viewBox="0 0 100 100" className="h-full w-full" focusable="false">
          <defs>
            <path id={pathId} d={RING_PATH} />
          </defs>
          <text className="fill-brown font-sans font-bold" fontSize="11.5">
            <textPath
              href={`#${pathId}`}
              textLength={CIRCUMFERENCE}
              lengthAdjust="spacing"
            >
              {text}
            </textPath>
          </text>
        </svg>
      </div>

      <div className="absolute inset-0 grid place-items-center">
        <span className="grid h-[38%] w-[38%] place-items-center rounded-full bg-brown">
          <Bean className="h-[58%] rotate-[28deg] text-yellow" />
        </span>
      </div>
    </div>
  );
}
