import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function MeetTheOwner() {
  return (
    <section className="py-20 md:py-28 bg-bg-dark relative overflow-hidden bg-grain">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Photo */}
          <ScrollReveal direction="left">
            <div className="flex-shrink-0">
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-sm overflow-hidden border-4 border-accent/30 shadow-lg">
                <Image
                  src="/images/israel-redstag-owner.png"
                  alt="Israel Aquino, owner of Red Stag Painting"
                  fill
                  sizes="256px"
                  className="object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Bio */}
          <ScrollReveal delay={150} direction="right">
            <div className="max-w-lg">
              <span className="section-label">Meet the Owner</span>
              <h2 className="text-3xl md:text-4xl font-heading !text-white leading-tight">
                Hi, I&apos;m Israel Aquino.
              </h2>
              <p className="mt-4 text-text-on-dark/80 text-base md:text-lg leading-relaxed">
                I founded Red Stag Painting in 2011 because I was tired of seeing LA homeowners get burned by painters who cut corners. Every crew member on our team has been with us for years. I personally walk through every finished job before we hand it back to you.
              </p>
              <p className="mt-3 text-text-on-dark/80 text-base md:text-lg leading-relaxed">
                Your home is your biggest investment. I treat it that way.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-text-on-dark/60">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  Born & raised in LA
                </div>
                <div className="flex items-center gap-2 text-sm text-text-on-dark/60">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  Licensed & insured
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold tracking-wide rounded-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(194,59,43,0.3)] hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4" />
                    <path d="M8 2v4" />
                    <path d="M3 10h18" />
                  </svg>
                  Schedule a Walkthrough with Israel
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
