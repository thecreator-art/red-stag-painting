'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import { COMPARISON_DATA } from '@/lib/constants';

export default function RedStagDifference() {
  return (
    <section className="py-24 md:py-36 bg-bg-primary relative" style={{ background: 'linear-gradient(175deg, var(--color-bg-primary) 60%, var(--color-bg-secondary) 100%)' }}>
      <div className="mx-auto max-w-[900px] px-6 md:px-10">
        <ScrollReveal>
          <div className="mb-12">
            <span className="section-label">Why Red Stag</span>
            <h2 className="text-3xl md:text-5xl font-heading text-text-primary leading-tight">
              The Red Stag <span className="italic font-normal">difference</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Comparison table */}
        <div className="rounded-sm border border-border overflow-hidden card-depth">
          {/* Header row */}
          <div className="grid grid-cols-[1.2fr_1fr_1fr] md:grid-cols-[1.5fr_1fr_1fr]">
            <div className="p-4 md:p-5 bg-white" />
            <div className="p-4 md:p-5 bg-bg-secondary text-center">
              <p className="text-xs font-semibold tracking-wider uppercase text-text-muted">
                Most LA Painters
              </p>
            </div>
            <div className="p-4 md:p-5 bg-accent text-center">
              <p className="text-xs font-semibold tracking-wider uppercase text-white">
                Red Stag
              </p>
            </div>
          </div>

          {/* Data rows */}
          {COMPARISON_DATA.map((row, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div className={`grid grid-cols-[1.2fr_1fr_1fr] md:grid-cols-[1.5fr_1fr_1fr] ${i < COMPARISON_DATA.length - 1 ? 'border-b border-border' : ''}`}>
                {/* Feature name */}
                <div className="p-4 md:p-5 bg-white flex items-center">
                  <p className="text-sm font-semibold text-text-primary">{row.feature}</p>
                </div>
                {/* Other painters */}
                <div className="p-4 md:p-5 bg-bg-secondary flex items-center gap-2">
                  <svg className="w-4 h-4 text-text-muted shrink-0 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <p className="text-xs md:text-sm text-text-muted">{row.otherPainters}</p>
                </div>
                {/* Red Stag */}
                <div className="p-4 md:p-5 bg-accent-light/30 flex items-center gap-2">
                  <svg className="w-4 h-4 text-accent shrink-0 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <p className="text-xs md:text-sm text-text-primary font-medium">{row.redStag}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={500}>
          <div className="text-center mt-12">
            <a
              href="#contact"
              className="inline-flex px-7 py-3.5 border-2 border-accent text-accent hover:bg-accent hover:text-white font-semibold tracking-wide rounded-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              Experience the Difference
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
