'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left cursor-pointer group"
          >
            <h3 className="text-base md:text-lg font-semibold text-text-primary leading-snug group-hover:text-accent transition-colors duration-300">
              {faq.question}
            </h3>
            <span
              className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                openIndex === i
                  ? 'bg-accent text-white'
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
              <p className="text-text-body text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
