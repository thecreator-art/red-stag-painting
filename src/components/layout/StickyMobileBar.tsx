 'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PHONE_HREF } from '@/lib/constants';

export default function StickyMobileBar() {
  const pathname = usePathname();
  const contactHref = pathname === '/' ? '#contact' : '/#contact';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-bg-dark h-[60px] flex">
      <a
        href={PHONE_HREF}
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
        className="flex-1 flex items-center justify-center text-white text-sm font-semibold bg-accent pulse-once"
      >
        Get My Price
      </Link>
    </div>
  );
}
