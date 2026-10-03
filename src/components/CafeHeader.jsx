import { Bean } from './decor/Shapes';
import CafeProfile from './CafeProfile';
import BrandTicker from './BrandTicker';

// Beans scattered behind the hero. Positioned in %, so they hold their place
// at any width; kept to the edges so they never sit behind the name.
const BEANS = [
  'left-[42%] top-[5%] h-6 rotate-[32deg]',
  'left-[4%] top-[6%] h-5 -rotate-[24deg]',
  'left-[6%] bottom-[24%] h-7 -rotate-[38deg]',
  'left-[47%] bottom-[22%] h-5 rotate-[70deg]',
];

/**
 * The hero: a block of dark brand brown with a ring motif behind the artwork, the
 * café profile on top, and the ticker tape laid across its lower edge.
 */
export default function CafeHeader() {
  return (
    <header className="relative isolate bg-brown">
      {/* Backdrop: concentric rings + beans (decorative, behind everything).
          Drawn in orange so the brand's accent glows against the dark brown. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Concentric rings, centred on the arch */}
        <div className="absolute -right-[4.8rem] -top-[3.4rem] h-[23rem] w-[23rem] rounded-full border-2 border-orange/40" />
        <div className="absolute -right-[1.8rem] -top-[0.4rem] h-[17rem] w-[17rem] rounded-full border-2 border-orange/40" />
        {BEANS.map((position) => (
          <Bean key={position} className={`absolute text-orange/40 ${position}`} />
        ))}
      </div>

      <div className="relative px-5 pb-14 pt-5">
        <CafeProfile />
      </div>

      <BrandTicker />
    </header>
  );
}
