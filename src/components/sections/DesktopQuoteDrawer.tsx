'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import QuoteForm from '@/components/ui/QuoteForm';
import { PHONE_HREF, PHONE_NUMBER, RESPONSE_TIME } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

export default function DesktopQuoteDrawer() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  function openDrawer() {
    setIsOpen(true);
    trackEvent('desktop_quote_drawer_open', { page_path: pathname });
  }

  function closeDrawer() {
    setIsOpen(false);
    trackEvent('desktop_quote_drawer_close', { page_path: pathname });
  }

  return (
    <div className="hidden lg:block">
      {isOpen && (
        <button
          type="button"
          aria-label="Close quote form overlay"
          onClick={closeDrawer}
          className="fixed inset-0 z-[70] bg-[#161412]/60 backdrop-blur-[2px]"
        />
      )}

      <div className="fixed right-0 top-1/2 z-[80] -translate-y-1/2">
        <button
          type="button"
          onClick={isOpen ? closeDrawer : openDrawer}
          aria-expanded={isOpen}
          aria-controls="desktop-quote-drawer"
          className={`group flex h-[220px] w-[78px] items-center justify-center rounded-l-2xl border border-white/10 bg-accent text-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition-all duration-300 hover:bg-accent-hover ${
            isOpen ? 'translate-x-[-420px]' : 'translate-x-0'
          }`}
        >
          <span className="[writing-mode:vertical-rl] rotate-180 text-sm font-semibold uppercase tracking-[0.22em]">
            {isOpen ? 'Close Quote' : 'Free Quote'}
          </span>
        </button>
      </div>

      <aside
        id="desktop-quote-drawer"
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-[90] flex h-screen w-[420px] max-w-[88vw] flex-col border-l border-white/10 bg-[#1E2330] text-white shadow-[-20px_0_60px_rgba(0,0,0,0.32)] transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-start justify-between border-b border-white/10 px-8 pb-6 pt-8">
          <div>
            <p className="text-3xl font-heading uppercase leading-none text-white">Get a Free Quote</p>
            <p className="mt-2 text-sm text-white/65">{RESPONSE_TIME}</p>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:text-white"
            aria-label="Close quote form"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-7">
          <QuoteForm variant="full" onDark submitLabel="Get My Free Quote" />
        </div>

        <div className="border-t border-white/10 px-8 py-6 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-white/35">Or Call Us Directly</p>
          <a
            href={PHONE_HREF}
            onClick={() => trackEvent('desktop_quote_drawer_phone_click', { page_path: pathname })}
            className="mt-3 inline-block text-3xl font-heading text-white transition-colors hover:text-accent-light"
          >
            {PHONE_NUMBER}
          </a>
        </div>
      </aside>
    </div>
  );
}
