'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

interface ServiceStickySidebarProps {
  heading: string;
  phoneHref: string;
  phoneNumber: string;
  pricingSummary: string;
}

export default function ServiceStickySidebar({
  heading,
  phoneHref,
  phoneNumber,
  pricingSummary,
}: ServiceStickySidebarProps) {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function updateVisibility() {
      const hero = document.getElementById('service-hero');
      const cta = document.getElementById('service-cta-banner');
      if (!hero || !cta) return;

      const heroBottom = hero.getBoundingClientRect().bottom;
      const ctaTop = cta.getBoundingClientRect().top;
      const shouldShow = heroBottom < 120 && ctaTop > window.innerHeight - 120;
      setVisible(shouldShow);
    }

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  const classes = useMemo(
    () =>
      `fixed top-28 z-40 hidden w-64 rounded-sm border border-border bg-white p-5 card-depth transition-all duration-300 xl:block ${
        visible ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-6 opacity-0'
      }`,
    [visible],
  );

  return (
    <aside className={classes} style={{ right: 'max(1.5rem, calc((100vw - 1200px) / 2 + 2.5rem))' }}>
      <div className="brand-line mb-4" />
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">
        {heading}
      </p>
      <p className="mt-3 text-2xl font-heading text-accent">{pricingSummary}</p>
      <p className="mt-2 text-sm leading-relaxed text-text-body">
        Real Los Angeles pricing based on the ranges shown on this page.
      </p>

      <a
        href={phoneHref}
        onClick={() => trackEvent('desktop_sidebar_phone_click', { page_path: pathname, heading })}
        className="mt-6 block text-lg font-semibold text-text-primary transition-colors duration-200 hover:text-accent"
      >
        {phoneNumber}
      </a>

      <a
        href="#service-quote-form"
        onClick={() => trackEvent('desktop_sidebar_estimate_click', { page_path: pathname, heading })}
        className="mt-5 inline-flex w-full items-center justify-center rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-hover"
      >
        Get a Free Estimate
      </a>
    </aside>
  );
}
