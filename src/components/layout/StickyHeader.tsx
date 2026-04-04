'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PHONE_HREF, PHONE_NUMBER, CTA_PRIMARY, RESPONSE_TIME } from '@/lib/constants';

export default function StickyHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 hidden lg:block bg-bg-primary/95 backdrop-blur border-b border-border/50 transition-transform duration-300 ease-in-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-10 flex items-center justify-between h-14">
        <a href="/" className="flex items-center gap-2 text-lg font-heading text-text-primary">
          <Image
            src="/images/stag-logo.png"
            alt=""
            width={32}
            height={26}
            className="h-[26px] w-auto logo-accent"
          />
          Red Stag Painting
        </a>
        <a href={PHONE_HREF} className="text-sm text-text-body hover:text-text-primary transition-colors duration-300">
          {PHONE_NUMBER}
        </a>
        <span className="text-xs text-text-muted">{RESPONSE_TIME}</span>
        <a
          href="#contact"
          className="px-5 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-sm transition-all duration-300"
        >
          {CTA_PRIMARY}
        </a>
      </div>
    </header>
  );
}
