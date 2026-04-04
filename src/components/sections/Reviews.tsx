'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';

const REVIEWS = [
  {
    text: 'They made our 1990s oak cabinets look brand new. Worth every penny.',
    author: 'Sarah M.',
    city: 'Beverly Hills',
    service: 'Cabinet Painting',
  },
  {
    text: 'Our kitchen looks like we spent $40k on new cabinets. We spent a fraction of that.',
    author: 'Mike R.',
    city: 'Sherman Oaks',
    service: 'Interior Repaint',
  },
  {
    text: 'The crew was quiet, fast, and cleaned up every single day. Neighbors asked for their number.',
    author: 'Lisa T.',
    city: 'Calabasas',
    service: 'Exterior Painting',
  },
  {
    text: 'Israel came out himself and walked every room with us. No other painter we called did that.',
    author: 'David & Rachel K.',
    city: 'Brentwood',
    service: 'Interior Repaint',
  },
  {
    text: 'Popcorn ceilings gone, walls repainted, and the house looked brand new. Done in 3 days.',
    author: 'Jennifer W.',
    city: 'Encino',
    service: 'Popcorn Removal + Paint',
  },
  {
    text: 'Third time using Red Stag. They painted our rental property in 2 days flat. Tenants were thrilled.',
    author: 'Carlos P.',
    city: 'Studio City',
    service: 'Rental Turnover',
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-accent"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-bg-dark relative overflow-hidden bg-grain">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 relative z-10">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center max-w-lg mx-auto mb-12">
            <span className="section-label">Reviews</span>
            <h2 className="text-3xl md:text-5xl font-heading !text-white leading-tight">
              What our clients say
            </h2>
          </div>
        </ScrollReveal>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <ScrollReveal key={i} delay={i * 150}>
            <div
              className="bg-bg-dark-mid rounded-sm border border-white/10 p-6 md:p-8 flex flex-col h-full hover:-translate-y-1 transition-all duration-300"
            >
              <StarRating />
              <blockquote className="mt-4 text-white/90 text-base md:text-lg font-heading leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <div className="mt-5 pt-5 border-t border-white/10">
                <p className="text-sm font-semibold text-white">
                  {review.author}
                </p>
                <p className="text-xs text-white/50 mt-0.5">
                  {review.service} &middot; {review.city}
                </p>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Google rating badge + CTA */}
        <div className="mt-10 flex flex-col items-center gap-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3.5 h-3.5 text-accent"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-white">
              4.9
            </span>
            <span className="text-xs text-white/60">
              from 500+ reviews
            </span>
          </div>
          <a
            href="#contact"
            className="inline-flex px-7 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold tracking-wide rounded-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(194,59,43,0.3)] hover:-translate-y-0.5"
          >
            Get Your Free Quote
          </a>
        </div>
      </div>
    </section>
  );
}
