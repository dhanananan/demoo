import { cafeConfig } from '../config/cafeConfig';
import { Bean } from './decor/Shapes';

/**
 * A tilted strip of yellow "tape" that scrolls the café's phrases. It sits on
 * the seam between the orange hero and the cream page, which both anchors the
 * hero and gives the page its energy. Purely decorative.
 */
export default function BrandTicker() {
  const phrases = cafeConfig.ticker?.filter(Boolean) ?? [];
  if (phrases.length === 0) return null;

  // Repeat the phrases so one half of the track is always wider than the
  // screen; the track is then two identical halves scrolling by exactly 50%
  // for a seamless loop.
  const half = (suffix) => (
    <ul className="flex shrink-0 items-center" key={suffix}>
      {[...phrases, ...phrases].map((phrase, i) => (
        <li key={`${suffix}-${i}`} className="flex items-center">
          <span className="whitespace-nowrap font-display text-lg uppercase leading-none tracking-wide">
            {phrase}
          </span>
          <Bean className="mx-5 h-5 shrink-0 rotate-[24deg]" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      aria-hidden="true"
      className="absolute -left-[5%] bottom-0 z-20 w-[110%] -rotate-2 translate-y-1/2 overflow-hidden border-y-2 border-brown bg-yellow py-2.5 text-brown"
    >
      <div className="flex w-max animate-marquee">
        {half('a')}
        {half('b')}
      </div>
    </div>
  );
}
