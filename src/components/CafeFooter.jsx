import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './icons/BrandIcons';
import { Bean } from './decor/Shapes';
import { cafeConfig } from '../config/cafeConfig';

/**
 * Brand-brown footer under a café-awning edge: a closing line, the name as a
 * wordmark, social shortcuts and a dynamic copyright year. Deliberately quiet
 * so the main links stay the focus.
 */
export default function CafeFooter() {
  const year = new Date().getFullYear();

  const shortcuts = [
    { id: 'instagram', Icon: InstagramIcon, href: cafeConfig.social.instagram, label: 'Instagram' },
    { id: 'facebook', Icon: FacebookIcon, href: cafeConfig.social.facebook, label: 'Facebook' },
    {
      id: 'whatsapp',
      Icon: WhatsAppIcon,
      href: cafeConfig.whatsapp ? `https://wa.me/${cafeConfig.whatsapp}` : null,
      label: 'WhatsApp',
    },
  ].filter((shortcut) => shortcut.href);

  return (
    <footer className="relative overflow-hidden bg-brown px-5 pb-8 pt-16 text-center text-cream">
      <div aria-hidden="true" className="awning absolute inset-x-0 top-0" />
      <Bean
        aria-hidden="true"
        className="absolute -right-3 bottom-10 h-24 rotate-[24deg] text-cream/[0.07]"
      />
      <Bean
        aria-hidden="true"
        className="absolute -left-2 top-24 h-16 -rotate-[32deg] text-cream/[0.07]"
      />

      <p className="relative mx-auto max-w-[17rem] text-balance font-serif text-2xl italic leading-snug">
        {cafeConfig.footerMessage}
      </p>

      <p className="relative mt-6 font-display text-4xl leading-none text-yellow">
        {cafeConfig.name}
      </p>

      {shortcuts.length > 0 && (
        <ul className="relative mt-6 flex items-center justify-center gap-3">
          {shortcuts.map(({ id, Icon, href, label }) => (
            <li key={id}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                className="grid h-11 w-11 place-items-center rounded-full border-2 border-cream/60 text-cream transition-colors duration-200 hover:border-yellow hover:bg-yellow hover:text-brown focus-visible:outline-yellow"
              >
                <Icon size={20} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      )}

      <p className="relative mt-8 text-xs text-cream/80">
        © {year} {cafeConfig.name}. All rights reserved.
      </p>
    </footer>
  );
}
