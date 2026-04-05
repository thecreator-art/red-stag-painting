'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

interface CTABannerProps {
  heading: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

export default function CTABanner({ heading, subtitle, ctaText, ctaHref }: CTABannerProps) {
  const pathname = usePathname();

  return (
    <section className="bg-bg-dark relative overflow-hidden bg-grain">
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-heading text-white leading-tight">
          {heading}
        </h2>
        <p className="mt-3 text-sm md:text-base text-text-on-dark/60 leading-relaxed">
          {subtitle}
        </p>
        <div className="mt-8">
          <Link
            href={ctaHref}
            onClick={() => trackEvent('cta_banner_click', { page_path: pathname, heading, target: ctaHref })}
            className="inline-flex px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold tracking-wide rounded-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(194,59,43,0.3)] hover:-translate-y-0.5"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
