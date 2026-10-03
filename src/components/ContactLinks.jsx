import { motion, useReducedMotion } from 'framer-motion';
import { Phone, MapPin, BookOpen, Globe } from 'lucide-react';
import { InstagramIcon, FacebookIcon, TikTokIcon, WhatsAppIcon } from './icons/BrandIcons';
import SocialLinkCard from './SocialLinkCard';
import { CONTACT_LINKS, cafeConfig } from '../config/cafeConfig';

/** Maps the `icon` string from config to an actual icon component. */
const ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
  whatsapp: WhatsAppIcon,
  maps: MapPin,
  phone: Phone,
  menu: BookOpen,
  website: Globe,
};

const stagger = (reduced, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: reduced ? 0 : 0.08, delayChildren: reduced ? 0 : delayChildren },
  },
});

/**
 * The link interface, arranged by importance:
 *   1. feature – one big pill (WhatsApp)
 *   2. tiles   – bold colour blocks, two across (Maps, Menu)
 *   3. rows    – a quiet menu-board list for the rest
 * Which link gets which treatment is set per link in cafeConfig.
 */
export default function ContactLinks() {
  const prefersReducedMotion = useReducedMotion();
  const links = CONTACT_LINKS.filter((link) => link.enabled && link.href);

  const features = links.filter((link) => link.layout === 'feature');
  const tiles = links.filter((link) => link.layout === 'tile');
  const rows = links.filter((link) => !['feature', 'tile'].includes(link.layout));

  const card = (link, extra) => (
    <SocialLinkCard
      key={link.id}
      Icon={ICONS[link.icon] ?? Globe}
      title={link.title}
      label={link.label}
      href={link.href}
      external={link.external}
      variant={link.layout ?? 'row'}
      tone={link.tone}
      {...extra}
    />
  );

  return (
    <nav aria-label="Contact and social links" className="flex flex-col gap-4">
      {features.length > 0 && (
        <motion.div
          variants={stagger(prefersReducedMotion, 0.55)}
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="visible"
          className="flex flex-col gap-4"
        >
          {features.map((link) => card(link))}
        </motion.div>
      )}

      {tiles.length > 0 && (
        <motion.div
          variants={stagger(prefersReducedMotion, 0.7)}
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="visible"
          className="grid grid-cols-2 gap-4"
        >
          {tiles.map((link, i) => {
            // A lone last tile spans the full width and sits straight
            const isOddOneOut = tiles.length % 2 === 1 && i === tiles.length - 1;
            return card(link, {
              // Otherwise alternate a gentle tilt, like stickers on a laptop
              tilt: isOddOneOut ? 0 : i % 2 === 0 ? -1.5 : 1.5,
              className: isOddOneOut ? 'col-span-2' : '',
            });
          })}
        </motion.div>
      )}

      {rows.length > 0 && (
        <section aria-labelledby="online-heading" className="mt-4">
          <h2
            id="online-heading"
            className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em]"
          >
            {cafeConfig.copy?.online ?? 'Find us online'}
            <span aria-hidden="true" className="h-0.5 flex-1 bg-brown" />
          </h2>

          <motion.div
            variants={stagger(prefersReducedMotion)}
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-1 flex flex-col"
          >
            {rows.map((link, i) => card(link, { index: i }))}
          </motion.div>
        </section>
      )}
    </nav>
  );
}
