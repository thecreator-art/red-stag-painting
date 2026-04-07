'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PHONE_HREF, SERVICES } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

export default function StickyMobileBar() {
  const pathname = usePathname();
  const serviceSlugs = SERVICES.map((service) => service.slug);
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0] ?? '';
  const isServicePage = serviceSlugs.includes(firstSegment) && segments.length === 1;
  const isMatrixPage = serviceSlugs.includes(firstSegment) && segments.length === 2;
  const isCityPage = firstSegment === 'areas' && segments.length === 2;
  const isBlogPage = firstSegment === 'blog' && segments.length === 2;
  const contactHref = isServicePage
      ? '#service-quote-form'
      : isMatrixPage
        ? '#matrix-quote-form'
        : isCityPage
          ? '#city-quote-form'
          : isBlogPage
            ? '#blog-quote-form'
            : '/contact';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-bg-dark h-[60px] flex">
      <a
        href={PHONE_HREF}
        onClick={() => trackEvent('mobile_phone_click', { page_path: pathname })}
        className="flex-1 flex items-center justify-center gap-2 text-text-on-dark text-sm font-semibold"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        Call Now
      </a>
      <div className="w-px bg-text-on-dark/20" />
      <Link
        href={contactHref}
        onClick={() => trackEvent('mobile_primary_cta_click', { page_path: pathname, target: contactHref })}
        className="flex-1 flex items-center justify-center text-white text-sm font-semibold bg-accent pulse-once"
      >
        Get My Price
      </Link>
    </div>
  );
}
