/**
 * Small decorative shapes shared across the page. All are purely visual, so
 * they're hidden from assistive tech, and all draw in `currentColor` so a
 * Tailwind `text-*` class recolours them.
 */

/**
 * Coffee bean. The groove is cut out of the same path (even-odd fill) rather
 * than painted over it, so the bean works on any background and any opacity.
 */
export function Bean({ className = '', ...props }) {
  return (
    <svg
      viewBox="0 0 24 32"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M12 2C17.52 2 22 8.27 22 16s-4.48 14-10 14S2 23.73 2 16 6.48 2 12 2ZM12 4C5 11 19 21 12 28l2.4 0C21.4 21 7.4 11 14.4 4Z"
      />
    </svg>
  );
}

/** Four-point sparkle. */
export function Sparkle({ className = '', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path d="M12 0c.8 6.7 5.3 11.2 12 12-6.7.8-11.2 5.3-12 12-.8-6.7-5.3-11.2-12-12C6.7 11.2 11.2 6.7 12 0Z" />
    </svg>
  );
}
