'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { CTA_PRIMARY } from '@/lib/constants';

const STEPS = [
  {
    number: '01',
    title: 'Book a Walkthrough',
    description:
      'Call or fill out the form. We schedule a free in-person walkthrough within 48 hours — no pressure, no obligation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
        <path d="M8 14h.01" />
        <path d="M12 14h.01" />
        <path d="M16 14h.01" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Get Your Exact Price',
    description:
      'We measure every surface, discuss colors and finishes, and send you a detailed quote within 24 hours. No surprises.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M9 7h6" />
        <path d="M9 11h6" />
        <path d="M9 15h4" />
        <rect x="4" y="3" width="16" height="18" rx="2" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'We Paint',
    description:
      'Our crew shows up on time, protects your floors and furniture, and paints with premium Sherwin-Williams or Benjamin Moore.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="3" width="16" height="5" rx="1" />
        <path d="M11 8v3" />
        <path d="M11 11h1a1 1 0 011 1v7a2 2 0 01-4 0v-7a1 1 0 011-1h1z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Final Walkthrough',
    description:
      'We do a walkthrough together. If anything isn\'t perfect, we fix it on the spot. Then you\'re covered by our 2-year warranty.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <path d="M22 4L12 14.01l-3-3" />
      </svg>
    ),
  },
];

export default function Process() {
  return (
    <section className="py-16 md:py-24 bg-accent-warm relative overflow-hidden bg-grain">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <ScrollReveal>
          <div className="max-w-xl mb-14">
            <span className="section-label">How It Works</span>
            <h2 className="text-2xl md:text-4xl font-heading text-text-primary leading-tight">
              From call to finished — <span className="italic font-normal text-accent">in 4 steps</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 150} direction="up">
              <div className="relative group">
                {/* Connector line (desktop) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+28px)] right-[-calc(50%-28px)] w-[calc(100%-56px)] h-[1px] bg-border z-0" />
                )}

                <div className="relative z-10 text-center">
                  {/* Step number + icon */}
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-light text-accent mb-5 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    {step.icon}
                    <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center ring-2 ring-accent-warm">
                      {step.number.replace('0', '')}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={600}>
          <div className="text-center mt-14">
            <MagneticButton>
              <a
                href="#contact"
                className="inline-flex px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold tracking-wide rounded-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(184,66,51,0.2)] hover:-translate-y-0.5"
              >
                {CTA_PRIMARY}
              </a>
            </MagneticButton>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Every project backed by our 2-year warranty
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
