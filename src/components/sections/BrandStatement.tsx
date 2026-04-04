'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { BLUR_PLACEHOLDER } from '@/lib/constants';

export default function BrandStatement() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80"
        alt="Bright freshly painted living room interior"
        fill
        sizes="100vw"
        className="object-cover"
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
      />
      <div className="absolute inset-0 bg-[rgba(253,252,250,0.92)]" />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-20">
          {/* Left: large quote with paint reveal */}
          <div className="md:w-3/5 relative">
            {/* Decorative quotation mark */}
            <span className="absolute -top-10 -left-4 md:-top-14 md:-left-8 text-[120px] md:text-[200px] font-heading text-accent/[0.06] leading-none select-none pointer-events-none" aria-hidden="true">
              &ldquo;
            </span>
            <ScrollReveal direction="left">
              <div className="brand-line mb-8 w-20 md:w-32" />
              <h2
                ref={headingRef}
                className="text-4xl md:text-[3.5rem] lg:text-6xl font-heading leading-[1.1] tracking-[-0.02em] paint-reveal"
              >
                Clean lines.<br />Clean job sites.<br /><span className="italic font-normal">On time, every time.</span>
              </h2>
            </ScrollReveal>
          </div>

          {/* Right: supporting text */}
          <div className="md:w-2/5">
            <ScrollReveal delay={200} direction="right">
              <p className="text-text-body text-base md:text-lg leading-relaxed">
                We protect your floors, prep every surface, and leave your home cleaner than we found it. No shortcuts. No surprises on the invoice. Just good paint on your walls.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">2-Year Warranty</p>
                  <p className="text-xs text-text-muted">On every project we complete</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
