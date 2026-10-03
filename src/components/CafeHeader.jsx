import { Bean } from './decor/Shapes';
import CafeProfile from './CafeProfile';
import BrandTicker from './BrandTicker';

// Beans scattered behind the hero. Positioned in %, so they hold their place
// at any width; kept to the edges so they never sit behind the name.
const BEANS = [
  'left-[44%] top-[4%] h-6 rotate-[32deg]',
  'right-[2%] top-[17%] h-5 -rotate-[24deg]',
  'left-[5%] bottom-[16%] h-7 -rotate-[38deg]',
  'left-[52%] bottom-[17%] h-5 rotate-[70deg]',
  'right-[4%] bottom-[22%] h-8 rotate-[18deg]',
];

/**
 * The hero: a block of brand orange with a ring motif behind the artwork, the
 * café profile on top, and the ticker tape laid across its lower edge.
 */
export default function CafeHeader() {
  return (
    <header className="relative isolate bg-orange">
      {/* Backdrop: concentric rings + beans (decorative, behind everything) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-28 top-4 h-[23rem] w-[23rem] rounded-full border-2 border-brown/20" />
        <div className="absolute -right-16 top-16 h-[17rem] w-[17rem] rounded-full border-2 border-brown/20" />
        {BEANS.map((position) => (
          <Bean key={position} className={`absolute text-brown/20 ${position}`} />
        ))}
      </div>

      <div className="relative px-5 pb-[4.5rem] pt-5">
        <CafeProfile />
      </div>

      <BrandTicker />
    </header>
  );
}
