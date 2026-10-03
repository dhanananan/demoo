import CafeHeader from './components/CafeHeader';
import ContactLinks from './components/ContactLinks';
import LocationSection from './components/LocationSection';
import CafeFooter from './components/CafeFooter';
import { Bean } from './components/decor/Shapes';

/**
 * Behind the card on larger screens only. On a phone the card IS the page, so
 * nothing here renders; on tablet/desktop it turns the empty space into bold
 * colour blocking instead of stretching the layout.
 */
function DesktopBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 hidden overflow-hidden sm:block">
      <div className="absolute -left-64 -top-64 h-[40rem] w-[40rem] rounded-full bg-orange" />
      <div className="absolute -bottom-64 -right-48 h-[40rem] w-[40rem] rounded-full bg-orange" />
      <Bean className="absolute left-[12%] top-[58%] h-16 rotate-[28deg] text-brown/25" />
      <Bean className="absolute right-[13%] top-[14%] h-12 -rotate-[34deg] text-brown/25" />
      <Bean className="absolute left-[24%] top-[12%] h-8 rotate-[70deg] text-brown/25" />
      <Bean className="absolute bottom-[10%] right-[26%] h-9 rotate-[12deg] text-brown/25" />
    </div>
  );
}

/**
 * Digital café business card.
 *
 * Mobile-first: on a phone the page is the card, edge to edge. From `sm` up it
 * becomes a compact, centred card (with an ink outline and a flat shadow, like
 * a printed card on a table) rather than stretching across the screen.
 */
export default function App() {
  return (
    <div className="relative min-h-[100dvh] overflow-x-clip bg-cream sm:bg-yellow sm:px-6 sm:py-14">
      <DesktopBackdrop />

      <div className="relative mx-auto w-full max-w-[28rem] overflow-x-clip bg-cream sm:overflow-hidden sm:rounded-[2rem] sm:border-2 sm:border-brown sm:shadow-hard-lg">
        <CafeHeader />

        <main className="px-5 pb-14 pt-10">
          <ContactLinks />
          <div className="mt-12">
            <LocationSection />
          </div>
        </main>

        <CafeFooter />
      </div>
    </div>
  );
}
