import { Bean } from './decor/Shapes';
import CafeProfile from './CafeProfile';
import BrandTicker from './BrandTicker';
import FallingBeans from './FallingBeans';

// Resting beans scattered behind the hero. Positioned in %, so they hold their
// place at any width; kept to the edges so they never sit behind the name.
// Each bobs gently (dur/head set its pace and starting point, in seconds).
const BEANS = [
  { pos: 'left-[42%] top-[5%]', height: 'h-6', rot: 32, dur: 7, head: 0 },
  { pos: 'left-[4%] top-[6%]', height: 'h-5', rot: -24, dur: 8.5, head: 3 },
  { pos: 'left-[6%] bottom-[24%]', height: 'h-7', rot: -38, dur: 9, head: 5 },
  { pos: 'left-[47%] bottom-[22%]', height: 'h-5', rot: 70, dur: 7.5, head: 2 },
];

/**
 * The hero: a block of dark brand brown with a ring motif behind the artwork, the
 * café profile on top, and the ticker tape laid across its lower edge.
 */
export default function CafeHeader() {
  return (
    <header className="relative isolate bg-brown">
      {/* Backdrop: concentric rings + coffee beans (decorative, behind everything).
          Faint cream tints, so they add life without competing with the logo. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Concentric rings, centred on the arch */}
        <div className="absolute -right-[4.8rem] -top-[3.4rem] h-[23rem] w-[23rem] rounded-full border-2 border-cream/15" />
        <div className="absolute -right-[1.8rem] -top-[0.4rem] h-[17rem] w-[17rem] rounded-full border-2 border-cream/15" />

        {BEANS.map(({ pos, height, rot, dur, head }) => (
          // The wrapper bobs; the bean inside keeps its fixed tilt
          <span
            key={pos}
            className={`absolute animate-bean-float ${pos}`}
            style={{ animationDuration: `${dur}s`, animationDelay: `-${head}s` }}
          >
            <Bean className={`block ${height} text-cream/[0.14]`} style={{ transform: `rotate(${rot}deg)` }} />
          </span>
        ))}

        <FallingBeans />
      </div>

      <div className="relative px-5 pb-14 pt-5">
        <CafeProfile />
      </div>

      <BrandTicker />
    </header>
  );
}
