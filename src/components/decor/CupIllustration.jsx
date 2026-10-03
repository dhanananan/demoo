import { useId } from 'react';
import { Bean } from './Shapes';

// Cup silhouette, reused as the clip for the decorative stripe
const CUP_BODY = 'M44 98h72v24c0 20-14 36-36 36s-36-16-36-36V98Z';

/**
 * The default hero art: a flat café poster of a cup on a table, drawn only in
 * brand colours. It fills whatever frame it's placed in (the arch in HeroArt).
 * Swap it for a real photo with `heroImage` in cafeConfig.
 */
export default function CupIllustration({ className = '' }) {
  const clipId = `cup-${useId().replace(/:/g, '')}`;

  return (
    <svg
      viewBox="0 0 160 200"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={CUP_BODY} />
        </clipPath>
      </defs>

      {/* Paper + sun */}
      <rect width="160" height="200" className="fill-cream" />
      <circle cx="80" cy="96" r="60" className="fill-yellow" />
      <circle cx="80" cy="96" r="70" fill="none" strokeWidth="2" className="stroke-yellow" />

      {/* Table */}
      <rect y="158" width="160" height="42" className="fill-orange" />
      <rect y="158" width="160" height="3" className="fill-brown" />
      <ellipse cx="80" cy="172" rx="54" ry="7" className="fill-brown" opacity="0.25" />

      {/* Saucer */}
      <ellipse cx="80" cy="165" rx="52" ry="9" className="fill-brown" />
      <ellipse cx="80" cy="162" rx="46" ry="7" className="fill-cream" />

      {/* Steam: three drifting wisps */}
      <g fill="none" strokeWidth="3.5" strokeLinecap="round" className="stroke-brown">
        <path
          className="animate-steam-rise"
          d="M63 90c-6-8 6-14 0-22s4-14 0-20"
          style={{ animationDelay: '0s' }}
        />
        <path
          className="animate-steam-rise"
          d="M80 86c-6-8 6-14 0-22s4-14 0-20"
          style={{ animationDelay: '0.6s' }}
        />
        <path
          className="animate-steam-rise"
          d="M97 90c-6-8 6-14 0-22s4-14 0-20"
          style={{ animationDelay: '1.2s' }}
        />
      </g>

      {/* Handle */}
      <path
        d="M115 108c19-2 21 26-1 29"
        fill="none"
        strokeWidth="8"
        strokeLinecap="round"
        className="stroke-brown"
      />

      {/* Cup body + stripe + shine */}
      <path d={CUP_BODY} className="fill-brown" />
      <g clipPath={`url(#${clipId})`}>
        <rect x="40" y="124" width="80" height="9" className="fill-yellow" />
      </g>
      <path
        d="M53 112v9c0 9 4 18 11 24"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        className="stroke-cream"
        opacity="0.55"
      />

      {/* Rim + coffee */}
      <ellipse cx="80" cy="98" rx="36" ry="7" className="fill-cream" />
      <ellipse cx="80" cy="98.5" rx="31" ry="5" className="fill-orange" />

      {/* Sparkles */}
      <g className="fill-orange">
        <path
          className="animate-twinkle"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          d="M30 44c.5 4.4 3.1 7 7.5 7.5-4.4.5-7 3.1-7.5 7.5-.5-4.4-3.1-7-7.5-7.5 4.4-.5 7-3.1 7.5-7.5Z"
        />
        <path
          className="animate-twinkle"
          style={{ transformBox: 'fill-box', transformOrigin: 'center', animationDelay: '1.1s' }}
          d="M128 62c.4 3.2 2.3 5.1 5.5 5.5-3.2.4-5.1 2.3-5.5 5.5-.4-3.2-2.3-5.1-5.5-5.5 3.2-.4 5.1-2.3 5.5-5.5Z"
        />
      </g>

      {/* Beans scattered on the table */}
      <g className="text-brown">
        <g transform="rotate(-24 20 183)">
          <Bean x="14" y="176" width="11" height="15" />
        </g>
        <g transform="rotate(32 135 185)">
          <Bean x="130" y="178" width="11" height="15" />
        </g>
        <g transform="rotate(-8 116 192)">
          <Bean x="112" y="186" width="9" height="12" />
        </g>
      </g>
    </svg>
  );
}
