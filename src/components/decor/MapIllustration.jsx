/**
 * A stylised street map with a pulsing pin, drawn as a two-tone paper map
 * (cream streets on a brown-tinted ground). It's a graphic, not a real map:
 * it tells first-time visitors "this is a place you can navigate to" at a
 * glance, with no map embed, API key or network request.
 */
export default function MapIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 350 130"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Ground: brown at low strength, so it reads as a darker cream */}
      <rect width="350" height="130" className="fill-brown" opacity="0.16" />

      {/* City blocks and green space */}
      <g className="fill-brown" opacity="0.14">
        <rect x="14" y="52" width="58" height="38" rx="6" />
        <rect x="284" y="52" width="54" height="38" rx="6" />
        <rect x="14" y="108" width="40" height="30" rx="6" />
        <rect x="296" y="4" width="40" height="24" rx="6" />
      </g>
      <g className="fill-brown" opacity="0.3">
        <rect x="100" y="52" width="46" height="40" rx="8" />
        <circle cx="228" cy="74" r="15" />
      </g>

      {/* Streets */}
      <g fill="none" strokeLinecap="round" className="stroke-cream">
        <path d="M-10 38H360" strokeWidth="15" />
        <path d="M-10 102H360" strokeWidth="10" />
        <path d="M86 -10V140" strokeWidth="12" />
        <path d="M268 -10V140" strokeWidth="12" />
        <path d="M136 140L214 -10" strokeWidth="9" />
      </g>

      {/* Centre lines on the main streets */}
      <g fill="none" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.4" className="stroke-brown">
        <path d="M-10 38H360" />
        <path d="M86 -10V140" />
        <path d="M268 -10V140" />
      </g>

      {/* Pin: ground shadow, pulse ring, then the pin itself */}
      <ellipse cx="176" cy="90" rx="15" ry="4.5" className="fill-brown" opacity="0.3" />
      <ellipse
        cx="176"
        cy="90"
        rx="15"
        ry="4.5"
        fill="none"
        strokeWidth="2"
        className="animate-pin-pulse stroke-brown"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
      <path
        d="M176 90s-22-22-22-38a22 22 0 0 1 44 0c0 16-22 38-22 38Z"
        className="fill-brown"
      />
      <circle cx="176" cy="52" r="9" className="fill-cream" />
      <circle cx="176" cy="52" r="4" className="fill-brown" />
    </svg>
  );
}
