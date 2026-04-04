'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SERVICES, PHONE_HREF, PHONE_NUMBER, CTA_PRIMARY } from '@/lib/constants';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <>
      {/* Terracotta accent line */}
      <div className="h-[3px] bg-accent" />

      <nav className="relative bg-bg-primary z-40">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 flex items-center justify-between py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 text-xl font-heading text-text-primary">
            <Image
              src="/images/stag-logo.png"
              alt=""
              width={40}
              height={32}
              className="h-8 w-auto logo-accent"
            />
            Red Stag Painting
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className="text-sm uppercase tracking-wider text-text-body hover:text-text-primary transition-colors duration-300 cursor-pointer"
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
                      className="block px-4 py-2 text-sm text-text-body hover:bg-bg-secondary hover:text-text-primary transition-colors duration-300"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="#our-work" className="text-sm uppercase tracking-wider text-text-body hover:text-text-primary transition-colors duration-300">
              Our Work
            </Link>
            <Link href="#service-area" className="text-sm uppercase tracking-wider text-text-body hover:text-text-primary transition-colors duration-300">
              Areas We Serve
            </Link>
            <Link href="#faq" className="text-sm uppercase tracking-wider text-text-body hover:text-text-primary transition-colors duration-300">
              About
            </Link>
            <Link href="#contact" className="text-sm uppercase tracking-wider text-text-body hover:text-text-primary transition-colors duration-300">
              Contact
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href={PHONE_HREF} className="text-sm text-text-body hover:text-text-primary transition-colors duration-300">
              {PHONE_NUMBER}
            </a>
            <a
              href="#contact"
              className="px-5 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-sm transition-all duration-300"
            >
              {CTA_PRIMARY}
            </a>
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
                <a href="#our-work" className="block text-lg text-text-primary" onClick={() => setMobileOpen(false)}>
                  Our Work
                </a>
                <a href="#service-area" className="block text-lg text-text-primary" onClick={() => setMobileOpen(false)}>
                  Areas We Serve
                </a>
                <a href="#faq" className="block text-lg text-text-primary" onClick={() => setMobileOpen(false)}>
                  About
                </a>
                <a href="#contact" className="block text-lg text-text-primary" onClick={() => setMobileOpen(false)}>
                  Contact
                </a>
              </div>
              <div className="border-t border-border pt-6">
                <a href={PHONE_HREF} className="block text-lg font-semibold text-text-primary mb-4">
                  {PHONE_NUMBER}
                </a>
                <a
                  href="#contact"
                  className="block w-full py-3 bg-accent text-white text-center font-semibold rounded-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  {CTA_PRIMARY}
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
