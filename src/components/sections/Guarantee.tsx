import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Guarantee() {
  return (
    <section className="pt-16 pb-24 md:pt-20 md:pb-36 bg-bg-primary relative">
      {/* Accent left stripe */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-success/20 hidden lg:block" />
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Shield graphic */}
          <ScrollReveal direction="left">
            <div className="flex-shrink-0">
              <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-success/10 flex items-center justify-center shield-glow">
                <div className="w-28 h-28 md:w-34 md:h-34 rounded-full bg-success/15 flex items-center justify-center">
                  <svg className="w-16 h-16 md:w-20 md:h-20 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Text content */}
          <ScrollReveal delay={150} direction="right">
            <div>
              <span className="section-label">Our Promise</span>
              <h2 className="text-3xl md:text-5xl font-heading text-text-primary leading-tight">
                2-Year, <span className="italic font-normal">No-Questions-Asked</span> Guarantee
              </h2>
              <p className="mt-5 text-text-body text-base md:text-lg leading-relaxed max-w-xl">
                If the paint peels, bubbles, cracks, or doesn&apos;t look right within 2 years of completion, we come back and fix it. No fine print. No &ldquo;wear and tear&rdquo; excuses. We stand behind every wall, ceiling, and trim line we touch.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Free touch-ups</p>
                    <p className="text-xs text-text-muted mt-0.5">For 2 full years</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Premium paint only</p>
                    <p className="text-xs text-text-muted mt-0.5">SW & Benjamin Moore</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Written guarantee</p>
                    <p className="text-xs text-text-muted mt-0.5">Signed before we start</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#contact"
                  className="inline-flex px-7 py-3.5 border-2 border-accent text-accent hover:bg-accent hover:text-white font-semibold tracking-wide rounded-sm transition-all duration-300 hover:-translate-y-0.5"
                >
                  Get Your Guaranteed Quote
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
