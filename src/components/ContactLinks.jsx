import { motion, useReducedMotion } from 'framer-motion';
import { Phone, MapPin, BookOpen, Globe } from 'lucide-react';
import { InstagramIcon, FacebookIcon, TikTokIcon, WhatsAppIcon } from './icons/BrandIcons';
import SocialLinkCard from './SocialLinkCard';
import { CONTACT_LINKS } from '../config/cafeConfig';

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

/**
 * The link list: every enabled link from cafeConfig, in order, all with the
 * same look. Rows rise in one after another once the hero has settled.
 */
export default function ContactLinks() {
  const prefersReducedMotion = useReducedMotion();
  const links = CONTACT_LINKS.filter((link) => link.enabled && link.href);

  const list = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.07,
        delayChildren: prefersReducedMotion ? 0 : 0.5,
      },
    },
  };

  return (
    <nav aria-label="Contact and social links">
      <motion.ul
        variants={list}
        initial={prefersReducedMotion ? false : 'hidden'}
        animate="visible"
        className="flex flex-col"
      >
        {links.map((link) => (
          <li key={link.id}>
            <SocialLinkCard
              Icon={ICONS[link.icon] ?? Globe}
              title={link.title}
              label={link.label}
              ariaLabel={link.ariaLabel}
              href={link.href}
              external={link.external}
            />
          </li>
        ))}
      </motion.ul>
    </nav>
  );
}
