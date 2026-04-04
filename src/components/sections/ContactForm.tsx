'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { PHONE_HREF, PHONE_NUMBER, EMAIL, BLUR_PLACEHOLDER } from '@/lib/constants';
import QuoteForm from '@/components/ui/QuoteForm';

export default function ContactForm() {
  const [colorInterest, setColorInterest] = useState<string | null>(null);

  useEffect(() => {
    // Check if user came from color visualizer
    function checkColor() {
      if (typeof window !== 'undefined' && window.__selectedColor) {
        setColorInterest(window.__selectedColor);
        window.__selectedColor = undefined;
      }
    }

    // Check immediately and on hash change
    checkColor();
    window.addEventListener('hashchange', checkColor);
    // Also check when section scrolls into view
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) checkColor();
    });
    const section = document.getElementById('contact');
    if (section) observer.observe(section);

    return () => {
      window.removeEventListener('hashchange', checkColor);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80"
        alt="Painted home exterior"
        fill
        sizes="100vw"
        className="object-cover"
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
      />
      <div className="absolute inset-0 bg-[rgba(42,38,34,0.93)]" />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left: text content */}
          <div className="lg:w-1/2">
            <ScrollReveal direction="left">
            <Image
              src="/images/stag-logo.png"
              alt=""
              width={40}
              height={32}
              className="h-8 w-auto logo-white mb-6"
            />
            <span className="section-label !text-accent-light">Get Started</span>
            <h2 className="text-3xl md:text-5xl font-heading text-text-on-dark leading-tight">
              Your home deserves good paint.
            </h2>
            <p className="mt-5 text-text-on-dark/60 leading-relaxed text-base md:text-lg">
              Tell us about your project. We&apos;ll get back to you within 2 hours with a ballpark range, and schedule a free walkthrough to give you an exact price.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-300">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-text-on-dark font-semibold">{PHONE_NUMBER}</p>
                  <p className="text-xs text-text-on-dark/40">Mon-Sat 7am-6pm</p>
                </div>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-300">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-text-on-dark font-semibold">{EMAIL}</p>
                  <p className="text-xs text-text-on-dark/40">We respond within 2 hours</p>
                </div>
              </a>
            </div>

            <p className="mt-10 text-xs text-text-on-dark/30">
              Licensed &amp; Insured &middot; Serving 20+ LA neighborhoods
            </p>
            </ScrollReveal>
          </div>

          {/* Right: form */}
          <div className="lg:w-1/2">
            <ScrollReveal delay={200} direction="right">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-success animate-pulse" />
              <p className="text-sm text-text-on-dark/60">47 homeowners requested a quote this month</p>
            </div>
            <div className="bg-[#322E2A] rounded-sm p-6 md:p-8 border border-[#3A3632] border-l-2 border-l-accent">
              {colorInterest && (
                <div className="mb-4 flex items-center gap-2 px-3 py-2 rounded-sm bg-accent/10 border border-accent/20">
                  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                  </svg>
                  <p className="text-sm text-accent-light">
                    Color interest: <span className="font-semibold text-white">{colorInterest}</span>
                  </p>
                </div>
              )}
              <p className="text-lg font-heading text-text-on-dark mb-5">Request your free estimate</p>
              <QuoteForm variant="full" onDark />
            </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
