import { Bean } from './decor/Shapes';

// Each bean: where it starts across the hero (left, %), its size (px tall),
// how long a fall takes (s), how far into its fall it is at page load (s),
// how far it drifts sideways (px) and how far it turns (deg).
// The mixed durations keep the beans from ever falling in step.
//
// Most beans fall down the left side: the right half of the hero is covered by
// the cream arch, which would hide them. (They pass behind the name and sticker,
// which is the point: they fall through the scene, not over the text.)
const BEANS = [
  { left: 3, size: 22, dur: 13, head: 2, drift: 14, spin: 220 },
  { left: 11, size: 15, dur: 17, head: 9, drift: -10, spin: -260 },
  { left: 19, size: 26, dur: 15, head: 5, drift: 18, spin: 180 },
  { left: 27, size: 14, dur: 19, head: 12, drift: -14, spin: 300 },
  { left: 35, size: 20, dur: 14, head: 7, drift: 12, spin: -200 },
  { left: 42, size: 16, dur: 18, head: 1, drift: -12, spin: 240 },
  { left: 48, size: 24, dur: 16, head: 10, drift: 14, spin: -280 },
  { left: 95, size: 14, dur: 20, head: 14, drift: -10, spin: 160 },
];

/**
 * Coffee beans tumbling slowly down through the hero, behind the name and the
 * logo. Purely decorative: it sits in the hero's backdrop layer.
 *
 * Every bean starts invisible (opacity-0), and only the animation fades it in.
 * So for visitors who prefer reduced motion, where animations are switched off
 * globally (see index.css), the falling beans are simply not drawn.
 */
export default function FallingBeans() {
  return (
    <>
      {BEANS.map(({ left, size, dur, head, drift, spin }) => (
        <Bean
          key={left}
          className="absolute top-0 animate-bean-fall text-cream opacity-0 will-change-transform"
          style={{
            left: `${left}%`,
            height: size,
            animationDuration: `${dur}s`,
            // A negative delay starts each bean part-way through its fall, so
            // the hero is already full of beans when the page opens
            animationDelay: `-${head}s`,
            '--bean-drift': `${drift}px`,
            '--bean-spin': `${spin}deg`,
            '--bean-opacity': 0.14 + size / 200,
          }}
        />
      ))}
    </>
  );
}
