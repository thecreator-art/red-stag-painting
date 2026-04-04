'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';

function formatPrice(n: number): string {
  return '$' + n.toLocaleString();
}

const FEATURED_SERVICES = [
  {
    name: 'Interior Painting',
    slug: 'interior-painting',
    tagline: 'Walls, ceilings, trim — done in days, not weeks.',
    startingPrice: 400,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="3" width="16" height="5" rx="1" />
        <path d="M11 8v3" />
        <path d="M11 11h1a1 1 0 011 1v7a2 2 0 01-4 0v-7a1 1 0 011-1h1z" />
      </svg>
    ),
  },
  {
    name: 'Exterior Painting',
    slug: 'exterior-painting',
    tagline: 'Curb appeal that lasts. Stucco, siding, and trim.',
    startingPrice: 2500,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-6h6v6" />
        <rect x="9" y="9" width="6" height="4" />
      </svg>
    ),
  },
  {
    name: 'Cabinet Painting',
    slug: 'cabinet-painting',
    tagline: 'Factory-smooth finish without replacing a single door.',
    startingPrice: 2500,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M12 3v18" />
        <path d="M2 12h20" />
        <path d="M8 7.5v1" />
        <path d="M16 7.5v1" />
        <path d="M8 15.5v1" />
        <path d="M16 15.5v1" />
      </svg>
    ),
  },
  {
    name: 'Popcorn Ceiling Removal',
    slug: 'popcorn-ceiling-removal',
    tagline: 'Scrape, skim-coat, and paint. Instant modernization.',
    startingPrice: 600,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M4 4h16" />
        <path d="M4 4v4c0 1 1 2 2 2h12c1 0 2-1 2-2V4" />
        <path d="M8 10v10" />
        <path d="M16 10v10" />
        <path d="M6 20h12" />
      </svg>
    ),
  },
  {
    name: 'Stucco Painting',
    slug: 'stucco-painting',
    tagline: 'Protect and refresh your LA home\'s stucco exterior.',
    startingPrice: 3000,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 21l8-8" />
        <path d="M11 13l5-5-3-3-5 5 3 3z" />
        <path d="M16 8l3-3a1 1 0 00-1.414-1.414L14.5 6.5" />
        <path d="M6 18h4v3H6z" />
      </svg>
    ),
  },
  {
    name: 'Drywall Repair & Paint',
    slug: 'drywall-repair-paint',
    tagline: 'Patch, sand, prime, paint. Invisible repairs.',
    startingPrice: 300,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    name: 'Ceiling Painting',
    slug: 'ceiling-painting',
    tagline: 'Brighten every room. Clean edges, zero drips.',
    startingPrice: 200,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 5h18" />
        <path d="M5 5v2" />
        <path d="M19 5v2" />
        <path d="M8 5v14a2 2 0 004 0V5" />
        <circle cx="10" cy="19" r="2" />
      </svg>
    ),
  },
  {
    name: 'Garage Painting',
    slug: 'garage-painting',
    tagline: 'Walls, ceiling, and floor coating. The full package.',
    startingPrice: 800,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 21V8l9-5 9 5v13" />
        <path d="M3 21h18" />
        <rect x="7" y="13" width="10" height="8" />
        <path d="M7 17h10" />
      </svg>
    ),
  },
  {
    name: 'Wood & Deck Staining',
    slug: 'wood-deck-staining',
    tagline: 'Protect and restore decks, fences, and pergolas.',
    startingPrice: 800,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M4 20h16" />
        <path d="M4 20V10" />
        <path d="M20 20V10" />
        <path d="M2 10h20" />
        <path d="M8 10V6" />
        <path d="M12 10V4" />
        <path d="M16 10V6" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-bg-primary relative bg-grain">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* Section header */}
        <ScrollReveal>
          <div className="max-w-xl mb-12">
            <span className="section-label">Services</span>
            <h2 className="text-2xl md:text-4xl font-heading text-text-primary leading-tight">
              What we do best
            </h2>
            <p className="mt-4 text-text-muted text-base md:text-lg leading-relaxed">
              Every service backed by our 2-year warranty and a crew that treats
              your home like their own.
            </p>
          </div>
        </ScrollReveal>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_SERVICES.map((service, i) => (
            <ScrollReveal key={service.slug} delay={i * 100}>
            <Link
              href={`/${service.slug}`}
              className="group block bg-white rounded-sm border border-border p-7 card-depth hover:border-accent/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-sm bg-accent-light flex items-center justify-center text-accent mb-5 group-hover:bg-accent group-hover:text-white service-icon">
                {service.icon}
              </div>
              <h3 className="text-xl font-heading text-text-primary leading-snug">
                {service.name}
              </h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                {service.tagline}
              </p>
              <p className="mt-1 text-sm font-semibold text-accent">
                Starting at {formatPrice(service.startingPrice)}
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-accent tracking-wide uppercase group-hover:gap-2 transition-all duration-300">
                Learn more
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
