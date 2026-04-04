'use client';

import { useRef } from 'react';
import DragSlider from '@/components/ui/DragSlider';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { PROJECTS } from '@/lib/constants';

export default function HorizontalGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 'left' | 'right') {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 400;
    el.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    });
  }

  return (
    <section id="our-work" className="py-20 md:py-28 bg-bg-primary">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-end justify-between mb-10">
            <div className="max-w-xl">
              <span className="section-label">Our Work</span>
              <h2 className="text-3xl md:text-5xl font-heading text-text-primary leading-tight">
                Real homes. Real results.
              </h2>
              <p className="mt-3 text-text-muted text-base">
                Drag the slider on any photo to see the before.
              </p>
            </div>

            {/* Desktop scroll arrows */}
            <div className="hidden md:flex gap-2">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors duration-300 cursor-pointer"
                aria-label="Scroll left"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors duration-300 cursor-pointer"
                aria-label="Scroll right"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Horizontal scroll strip - desktop / Vertical stack - mobile */}
      <div
        ref={scrollRef}
        className="flex md:overflow-x-auto md:snap-x md:snap-proximity gap-6 px-6 md:px-10 md:pl-[max(2.5rem,calc((100vw-1200px)/2+2.5rem))] pb-4 flex-col md:flex-row scrollbar-hide md:cursor-grab md:active:cursor-grabbing"
        style={{ scrollbarWidth: 'none' }}
      >
        {PROJECTS.map((project, i) => (
          <div
            key={i}
            className="md:flex-shrink-0 md:w-[380px] md:snap-start"
          >
            <DragSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
              beforeAlt={`Before: ${project.serviceType} in ${project.city}`}
              afterAlt={`After: ${project.serviceType} in ${project.city} by Red Stag Painting`}
              className="rounded-sm"
            />
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs font-semibold text-accent">{project.serviceType}</span>
              <span className="text-xs text-text-muted">&middot;</span>
              <span className="text-xs text-text-muted">{project.city}</span>
            </div>
            <p className="mt-1 text-sm text-text-body">{project.description}</p>
            {project.review && (
              <blockquote className="mt-3 pl-4 border-l-[3px] border-accent">
                <p className="text-sm italic text-text-muted">&ldquo;{project.review.text}&rdquo;</p>
                <cite className="block mt-1 text-xs text-text-muted not-italic font-semibold">
                  {project.review.author}, {project.review.city}
                </cite>
              </blockquote>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
