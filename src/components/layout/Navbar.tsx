'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SERVICES, CTA_PRIMARY } from '@/lib/constants';

interface NavbarProps {
  sticky?: boolean;
}

export default function Navbar({ sticky = false }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMobileOpen(false);
      setServicesOpen(false);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div className={sticky ? 'sticky top-0 z-50' : ''}>
      {/* Terracotta accent line */}
      <div className="h-[3px] bg-accent" />

      <nav className={`relative z-40 ${sticky ? 'bg-bg-primary/95 backdrop-blur border-b border-border/50' : 'bg-bg-primary'}`}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-lg font-heading text-text-primary whitespace-nowrap xl:text-xl">
            <Image
              src="/images/stag-logo.png"
              alt=""
              width={34}
              height={28}
              className="h-7 w-auto logo-accent xl:h-8"
            />
            Red Stag Painting
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em] text-text-body transition-colors duration-300 hover:text-text-primary xl:text-xs"
              >
                Services
                <svg className="inline-block ml-1 w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5l3 3 3-3" />
                </svg>
              </button>
              <div className={`absolute top-full left-0 pt-2 nav-dropdown ${servicesOpen ? 'nav-dropdown-open' : ''}`}>
                <div className="bg-white rounded-sm shadow-lg border border-border py-2 min-w-[220px]">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/${service.slug}`}
                      className="block px-4 py-2 text-sm text-text-body transition-colors duration-300 hover:bg-bg-secondary hover:text-text-primary"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/our-work" className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em] text-text-body transition-colors duration-300 hover:text-text-primary xl:text-xs">
              Our Work
            </Link>
            <Link href="/areas" className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em] text-text-body transition-colors duration-300 hover:text-text-primary xl:text-xs">
              Areas We Serve
            </Link>
            <Link href="/blog" className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em] text-text-body transition-colors duration-300 hover:text-text-primary xl:text-xs">
              Blog
            </Link>
            <Link href="/about" className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em] text-text-body transition-colors duration-300 hover:text-text-primary xl:text-xs">
              About
            </Link>
            <Link href="/contact" className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em] text-text-body transition-colors duration-300 hover:text-text-primary xl:text-xs">
              Contact
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/contact"
              className="rounded-sm bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover xl:px-5"
            >
              Get Pricing
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 top-[68px] bg-bg-primary z-50 lg:hidden overflow-y-auto">
            <div className="px-6 py-8 space-y-6">
              <div>
                <p className="text-xs font-semibold tracking-wider text-text-muted uppercase mb-3">Services</p>
                <div className="space-y-3">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/${service.slug}`}
                      className="block text-text-body hover:text-text-primary transition-colors duration-300"
                      onClick={() => setMobileOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="border-t border-border pt-6 space-y-4">
                <Link href="/our-work" className="block text-lg text-text-primary" onClick={() => setMobileOpen(false)}>
                  Our Work
                </Link>
                <Link href="/areas" className="block text-lg text-text-primary" onClick={() => setMobileOpen(false)}>
                  Areas We Serve
                </Link>
                <Link href="/blog" className="block text-lg text-text-primary" onClick={() => setMobileOpen(false)}>
                  Blog
                </Link>
                <Link href="/about" className="block text-lg text-text-primary" onClick={() => setMobileOpen(false)}>
                  About
                </Link>
                <Link href="/contact" className="block text-lg text-text-primary" onClick={() => setMobileOpen(false)}>
                  Contact
                </Link>
              </div>
              <div className="border-t border-border pt-6">
                <Link
                  href="/contact"
                  className="block w-full py-3 bg-accent text-white text-center font-semibold rounded-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  {CTA_PRIMARY}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
