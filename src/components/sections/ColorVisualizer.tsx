'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { BLUR_PLACEHOLDER } from '@/lib/constants';

const COLOR_PALETTES = [
  { name: 'Swiss Coffee', hex: '#EDEAE0', brand: 'Benjamin Moore', code: 'OC-45' },
  { name: 'Agreeable Gray', hex: '#D1CBC1', brand: 'Sherwin-Williams', code: 'SW 7029' },
  { name: 'Hale Navy', hex: '#434C56', brand: 'Benjamin Moore', code: 'HC-154' },
  { name: 'Sea Salt', hex: '#CDD2CA', brand: 'Sherwin-Williams', code: 'SW 6204' },
  { name: 'White Dove', hex: '#F0EDE4', brand: 'Benjamin Moore', code: 'OC-17' },
  { name: 'Iron Ore', hex: '#434341', brand: 'Sherwin-Williams', code: 'SW 7069' },
  { name: 'Revere Pewter', hex: '#CCC4B8', brand: 'Benjamin Moore', code: 'HC-172' },
  { name: 'Alabaster', hex: '#EDEAE0', brand: 'Sherwin-Williams', code: 'SW 7008' },
  { name: 'Kendall Charcoal', hex: '#676662', brand: 'Benjamin Moore', code: 'HC-166' },
  { name: 'Accessible Beige', hex: '#D1C7B8', brand: 'Sherwin-Williams', code: 'SW 7036' },
];

// Get luminance 0-255 from hex
function luminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

// Wall mask: gradient that covers wall region and fades before furniture
// This photo has walls in the upper ~55%, furniture/couch below
const WALL_MASK = 'linear-gradient(to bottom, black 0%, black 38%, rgba(0,0,0,0.5) 48%, transparent 58%)';

export default function ColorVisualizer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = COLOR_PALETTES[selectedIndex];

  const lum = useMemo(() => luminance(selected.hex), [selected.hex]);
  // Dark colors need higher opacity to read as dark on a white wall
  // Light colors need less — they're closer to the base wall
  const directOpacity = lum < 100 ? 0.62 : lum < 160 ? 0.52 : 0.42;
  const depthOpacity = lum < 100 ? 0.25 : 0.12;

  const maskStyle = {
    WebkitMaskImage: WALL_MASK,
    maskImage: WALL_MASK,
  };

  return (
    <section className="py-20 md:py-28 bg-bg-primary overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="section-label">Visualize Your Space</span>
            <h2 className="text-3xl md:text-5xl font-heading text-text-primary leading-tight">
              See it before we paint it
            </h2>
            <p className="mt-4 text-text-muted text-base md:text-lg leading-relaxed">
              Tap a color to preview how it looks on your walls. These are LA&apos;s most
              requested colors from Sherwin-Williams and Benjamin Moore.
            </p>
          </div>
        </ScrollReveal>

        {/* Room + color overlay */}
        <ScrollReveal delay={150}>
          <div className="relative rounded-sm overflow-hidden shadow-xl card-depth">
            {/* Base room image — white/light walled interior */}
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <Image
                src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1800&q=80"
                alt="Modern living room interior with white walls"
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />

              {/* Wall color — layer 1: direct color overlay, masked to wall region */}
              <div
                className="absolute inset-0 transition-all duration-700 ease-in-out"
                style={{
                  backgroundColor: selected.hex,
                  opacity: directOpacity,
                  ...maskStyle,
                }}
              />
              {/* Wall color — layer 2: multiply for shadow/depth realism */}
              <div
                className="absolute inset-0 transition-all duration-700 ease-in-out"
                style={{
                  backgroundColor: selected.hex,
                  mixBlendMode: 'multiply',
                  opacity: depthOpacity,
                  ...maskStyle,
                }}
              />

              {/* Color info overlay — bottom left */}
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-10">
                <div className="bg-white/95 backdrop-blur rounded-sm px-4 py-3 md:px-5 md:py-4 shadow-lg flex items-center gap-3 md:gap-4">
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-sm border-2 border-white shadow-md flex-shrink-0 transition-colors duration-500"
                    style={{ backgroundColor: selected.hex }}
                  />
                  <div>
                    <p className="text-sm md:text-base font-heading text-text-primary font-bold leading-tight">
                      {selected.name}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {selected.brand} &middot; {selected.code}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA overlay — bottom right */}
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10 hidden md:block">
                <MagneticButton>
                  <a
                    href="#contact"
                    onClick={() => {
                      // Store selected color for the contact form to pick up
                      if (typeof window !== 'undefined') {
                        window.__selectedColor = `${selected.name} (${selected.brand} ${selected.code})`;
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Love this color? Get a free quote
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Color swatches */}
        <ScrollReveal delay={300}>
          <div className="mt-6 md:mt-8">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {COLOR_PALETTES.map((color, i) => (
                <button
                  key={color.code}
                  type="button"
                  onClick={() => setSelectedIndex(i)}
                  className={`group relative cursor-pointer transition-all duration-300 ${
                    i === selectedIndex ? 'scale-110' : 'hover:scale-105'
                  }`}
                  aria-label={`Preview ${color.name} by ${color.brand}`}
                >
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300 shadow-sm ${
                      i === selectedIndex
                        ? 'border-accent shadow-lg ring-2 ring-accent/20 ring-offset-2'
                        : 'border-white hover:border-border hover:shadow-md'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-bg-dark text-text-on-dark text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {color.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Mobile CTA (shown below swatches on mobile) */}
        <div className="mt-6 text-center md:hidden">
          <a
            href="#contact"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.__selectedColor = `${selected.name} (${selected.brand} ${selected.code})`;
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-sm transition-all duration-300"
          >
            Love this color? Get a free quote
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
