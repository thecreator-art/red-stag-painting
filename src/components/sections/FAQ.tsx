'use client';

import { useState } from 'react';
import { FAQ_DATA } from '@/lib/constants';
import { generateFAQSchema } from '@/lib/schema';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqSchema = generateFAQSchema();

  return (
    <section id="faq" className="py-16 md:py-24 bg-bg-secondary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-[760px] px-6 md:px-10">
        {/* Left-aligned header */}
        <ScrollReveal>
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-heading text-text-primary leading-tight">
              Common questions
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              Straight answers about painting your home in Los Angeles.
            </p>
          </div>
        </ScrollReveal>

        {/* Accordion — clean divider-based */}
        <div className="divide-y divide-border">
          {FAQ_DATA.map((item, i) => (
            <ScrollReveal key={i} delay={i * 80}>
            <div>
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left cursor-pointer group"
              >
                <h3 className="text-base md:text-lg font-heading text-text-primary leading-snug group-hover:text-accent transition-colors duration-300">
                  {item.question}
                </h3>
                <span
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === i
                      ? 'bg-accent text-white rotate-0'
                      : 'bg-transparent text-text-muted'
                  }`}
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === i
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pb-5 md:pb-6 pr-12">
                  <p className="text-text-body leading-relaxed text-[15px]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Final push CTA */}
        <ScrollReveal delay={400}>
        <div className="mt-14 rounded-sm p-8 md:p-10 text-center bg-bg-dark relative overflow-hidden bg-grain">
          <div className="relative z-10">
            <p className="text-lg md:text-xl font-heading text-white leading-snug">
              Still have questions? We&apos;ll answer them all <span className="italic font-normal text-accent">in person.</span>
            </p>
            <p className="mt-2 text-sm text-text-on-dark/60">
              No pressure, no obligation. Just a straight answer and an exact price.
            </p>
            <div className="mt-6">
              <a
                href="#contact"
                className="inline-flex px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold tracking-wide rounded-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(194,59,43,0.3)] hover:-translate-y-0.5"
              >
                Book Your Free Walkthrough
              </a>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
