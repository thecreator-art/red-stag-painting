'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { BeforeAfterPair } from '@/data/types';
import { BLUR_PLACEHOLDER } from '@/lib/constants';

interface ServiceBeforeAfterProps {
  data: BeforeAfterPair;
  serviceName: string;
}

export default function ServiceBeforeAfter({ data, serviceName }: ServiceBeforeAfterProps) {
  const [showBefore, setShowBefore] = useState(true);

  function toggle() {
    setShowBefore((current) => !current);
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 max-w-2xl">
        <div className="brand-line mb-4" />
        <p className="section-label text-accent mb-3">Before &amp; After</p>
        <h2 className="text-3xl md:text-5xl font-heading text-text-primary leading-tight">
          What this service changes in a real house
        </h2>
        <p className="mt-4 text-base md:text-lg text-text-body leading-relaxed">
          Hover on desktop or tap on mobile to switch between the before and after state.
        </p>
      </div>

      <div
        className="group relative overflow-hidden rounded-sm border border-border card-depth cursor-pointer"
        onMouseEnter={() => setShowBefore(false)}
        onMouseLeave={() => setShowBefore(true)}
        onClick={toggle}
        role="button"
        tabIndex={0}
        aria-label={`Toggle before and after ${serviceName} project photos`}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggle();
          }
        }}
      >
        <div className="relative aspect-[16/9]">
          <Image
            src={data.before.src}
            alt={data.before.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className={`object-cover transition-opacity duration-500 ${showBefore ? 'opacity-100' : 'opacity-0'}`}
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
          <Image
            src={data.after.src}
            alt={data.after.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className={`object-cover transition-opacity duration-500 ${showBefore ? 'opacity-0' : 'opacity-100'}`}
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
            <span className={`rounded-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
              showBefore ? 'bg-[#2C2825] text-white' : 'bg-white text-[#2C2825]'
            }`}>
              {showBefore ? 'Before' : 'After'}
            </span>
            <span className="bg-white/85 px-3 py-1.5 text-xs font-semibold text-[#2C2825] shadow-sm">
              Tap or hover to compare
            </span>
          </div>
        </div>

        <div className="bg-white px-6 py-5">
          <p className="text-sm md:text-base text-text-body">{data.caption}</p>
        </div>
      </div>
    </div>
  );
}
