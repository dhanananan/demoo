import { motion } from 'framer-motion';

const entrance = { type: 'spring', stiffness: 200, damping: 20 };

/**
 * One tappable link: a bare icon, a bold title and a line of text on a plain
 * row. Every link on the page uses this, so they all look the same.
 *
 * It runs edge to edge (the negative margin cancels the page gutter) so the
 * whole width is the tap target, and a yellow wash sweeps across on hover and
 * fills on tap. The entrance animation is driven by the parent list, which
 * supplies the stagger.
 *
 * Props: Icon, title (short name), label (the call to action; may be empty, in
 * which case the title stands alone), ariaLabel (what a screen reader says;
 * defaults to label), href, external (opens a new tab).
 */
export default function SocialLinkCard({ Icon, title, label, ariaLabel, href, external = true }) {
  const spoken = ariaLabel || label || title;
  const anchorProps = {
    href,
    'aria-label': external ? `${spoken} (opens in a new tab)` : spoken,
    ...(external && { target: '_blank', rel: 'noopener noreferrer' }),
  };

  return (
    <motion.a
      {...anchorProps}
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: entrance },
      }}
      style={{ backgroundColor: 'rgba(248, 169, 31, 0)' }}
      whileTap={{ backgroundColor: 'rgba(248, 169, 31, 1)' }}
      className="group relative -mx-5 flex min-h-[5rem] items-center gap-4 overflow-hidden px-5 py-4 focus-visible:outline-offset-[-4px]"
    >
      {/* Yellow wash that sweeps across on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-left scale-x-0 bg-yellow transition-transform duration-300 ease-out group-hover:scale-x-100"
      />

      {/* Fixed-width column so every title lines up, whatever the icon's shape */}
      <span className="relative grid w-9 shrink-0 place-items-center text-brown transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
        <Icon size={30} strokeWidth={2} aria-hidden="true" />
      </span>

      <span className="relative min-w-0 flex-1">
        {/* The bundled Fraunces only has old-style figures (digits that hang
            below the line), which make a phone number hard to read. A title
            containing digits is set in DM Sans, whose figures are lining. */}
        <span
          className={`block text-[1.375rem] font-semibold leading-tight ${
            /\d/.test(title) ? 'font-sans tracking-wide' : 'font-serif'
          }`}
        >
          {title}
        </span>
        {label && (
          // 90% ink keeps this above 4.5:1 even on the yellow hover wash
          <span className="block text-[0.9375rem] leading-snug text-brown/90">{label}</span>
        )}
      </span>
    </motion.a>
  );
}
