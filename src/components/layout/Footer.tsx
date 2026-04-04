import Link from 'next/link';
import Image from 'next/image';
import { SERVICES, CITIES, PHONE_HREF, PHONE_NUMBER, EMAIL } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-text-on-dark">
      {/* Accent bar */}
      <div className="h-1 bg-accent" />
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:w-1/3">
            <div className="flex items-center gap-2.5 mb-3">
              <Image
                src="/images/stag-logo.png"
                alt=""
                width={36}
                height={28}
                className="h-7 w-auto logo-white"
              />
              <p className="text-xl font-heading">Red Stag Painting</p>
            </div>
            <p className="text-sm text-text-on-dark/70 mb-4">
              Residential painting across Greater Los Angeles.
            </p>
            <p className="text-sm text-text-on-dark/70 mb-4">Fully Licensed &amp; Insured</p>
            <a href={PHONE_HREF} className="block text-sm text-text-on-dark/70 hover:text-text-on-dark transition-colors duration-300">
              {PHONE_NUMBER}
            </a>
            <a href={`mailto:${EMAIL}`} className="block text-sm text-text-on-dark/70 hover:text-text-on-dark transition-colors duration-300">
              {EMAIL}
            </a>
          </div>

          {/* Services */}
          <div className="lg:w-1/3">
            <p className="text-base font-heading tracking-wider mb-5 text-text-on-dark/60">Services</p>
            <div className="space-y-3">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/${service.slug}`}
                  className="block text-sm text-text-on-dark/70 hover:text-text-on-dark transition-colors duration-300"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Service Areas */}
          <div className="lg:w-1/3">
            <p className="text-base font-heading tracking-wider mb-5 text-text-on-dark/60">Service Areas</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {CITIES.map((city) => (
                <Link
                  key={city.slug}
                  href={`/areas/${city.slug}`}
                  className="block text-sm text-text-on-dark/70 hover:text-text-on-dark transition-colors duration-300"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#3A3632]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text-on-dark/50">
          <p>&copy; 2026 Red Stag Painting. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-text-on-dark transition-colors duration-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-text-on-dark transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
