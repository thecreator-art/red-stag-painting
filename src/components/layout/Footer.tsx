import Link from 'next/link';
import Image from 'next/image';
import { SERVICES, CITIES, PHONE_HREF, PHONE_NUMBER, EMAIL } from '@/lib/constants';

export default function Footer() {
  // Show all services in a 2-column grid if needed, or just top ones. We'll show all 13 in a tight list.
  const topCities = CITIES.slice(0, 10); // Show top 10 cities to save vertical space

  return (
    <footer className="bg-bg-dark text-text-on-dark border-t border-[#2A2622]">
      {/* Top Accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-accent via-accent-hover to-accent" />
      
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column (Span 4) */}
          <div className="lg:col-span-4 pr-4">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/images/stag-logo.png"
                alt=""
                width={40}
                height={32}
                className="h-8 w-auto logo-white"
              />
              <p className="text-2xl font-heading tracking-wide">Red Stag Painting</p>
            </div>
            <p className="text-sm text-text-on-dark/60 leading-relaxed mb-6 max-w-sm">
              Elevating homes across Greater Los Angeles with flawless execution, premium materials, and a commitment to unmatched craftsmanship.
            </p>
            <div className="space-y-2">
              <a href={PHONE_HREF} className="flex items-center gap-3 text-sm text-text-on-dark/80 hover:text-white transition-colors duration-300 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <svg className="w-3.5 h-3.5 text-text-on-dark/60 group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                {PHONE_NUMBER}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-sm text-text-on-dark/80 hover:text-white transition-colors duration-300 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <svg className="w-3.5 h-3.5 text-text-on-dark/60 group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                {EMAIL}
              </a>
            </div>
          </div>

          {/* Quick Links (Span 2) */}
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-widest mb-6 text-white">Company</p>
            <div className="space-y-3.5">
              {[
                { name: 'Our Work', slug: 'our-work' },
                { name: 'About Us', slug: 'about' },
                { name: 'Service Areas', slug: 'areas' },
                { name: 'Painting Blog', slug: 'blog' },
                { name: 'Contact', slug: 'contact' },
              ].map((link) => (
                <Link
                  key={link.slug}
                  href={`/${link.slug}`}
                  className="block text-sm text-text-on-dark/60 hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services (Span 3) */}
          <div className="lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-widest mb-6 text-white">Services</p>
            <div className="space-y-3.5">
              {SERVICES.slice(0, 7).map((service) => (
                <Link
                  key={service.slug}
                  href={`/${service.slug}`}
                  className="block text-sm text-text-on-dark/60 hover:text-white transition-colors duration-300"
                >
                  {service.name}
                </Link>
              ))}
              <Link href="/services" className="block text-sm text-accent hover:text-accent-hover font-medium mt-4">
                View All Services &rarr;
              </Link>
            </div>
          </div>

          {/* Service Areas (Span 3) */}
          <div className="lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-widest mb-6 text-white">Top Areas</p>
            <div className="space-y-3.5">
              {topCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/areas/${city.slug}`}
                  className="block text-sm text-text-on-dark/60 hover:text-white transition-colors duration-300"
                >
                  {city.name}
                </Link>
              ))}
              <Link href="/areas" className="block text-sm text-accent hover:text-accent-hover font-medium mt-4">
                View All 30+ Areas &rarr;
              </Link>
            </div>
          </div>

        </div>

        {/* Global Cities SEO block - keeping it tight at the bottom to maintain SEO juice without layout bloat */}
        <div className="mt-16 pt-8 border-t border-[#3A3632]">
          <p className="text-xs text-text-on-dark/40 leading-relaxed max-w-5xl">
            <strong className="font-semibold text-text-on-dark/60">Proudly Serving:</strong>{' '}
            {CITIES.map((city, i) => (
              <span key={city.slug}>
                <Link href={`/areas/${city.slug}`} className="hover:text-white transition-colors">{city.name}</Link>
                {i < CITIES.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#1F1C19] border-t border-[#2A2622]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-on-dark/40">
          <div className="flex items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Red Stag Painting. All rights reserved.</p>
            <span className="hidden sm:inline">|</span>
            <p>Licensed & Insured</p>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
