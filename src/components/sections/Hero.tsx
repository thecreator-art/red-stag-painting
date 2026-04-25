import Image from 'next/image';
import { PHONE_HREF, PHONE_NUMBER, RESPONSE_TIME, CTA_PRIMARY, BLUR_PLACEHOLDER } from '@/lib/constants';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-68px)] overflow-hidden">
      {/* Full-width background image */}
      <Image
        src="/images/hero.png"
        alt="Freshly painted modern home exterior in Los Angeles by Red Stag Painting"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/95 via-bg-dark/80 to-bg-dark/40" />

      {/* Content */}
      <div className="relative z-10 min-h-[calc(100vh-68px)] flex items-center">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 w-full py-16 lg:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <div className="brand-line mx-auto mb-6 hero-animate" />

            <div className="hero-animate hero-animate-delay-1 flex justify-center">
              <div className="flex flex-col items-center justify-center gap-6 lg:grid lg:grid-cols-[180px_minmax(0,720px)] lg:items-center lg:gap-8">
                <div className="relative w-[120px] shrink-0 sm:w-[150px] lg:w-[180px] xl:w-[195px]">
                  <Image
                    src="/images/paint-roller-hero-transparent.png"
                    alt="Illustrated paint roller and paint can"
                    width={1024}
                    height={1024}
                    priority
                    className="h-auto w-full drop-shadow-[0_16px_28px_rgba(0,0,0,0.28)]"
                  />
                </div>

                <div className="max-w-[720px] text-center">
                  <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-heading leading-[1.1] tracking-tight !text-white">
                    Los Angeles House
                    <br />
                    <span className="!text-accent painted-underline">Painting</span> Contractor
                  </h1>
                  <p className="mt-5 mx-auto max-w-2xl text-base md:text-lg text-white/60 font-body">
                    Your neighbors will ask who painted your house. From Beverly Hills
                    to Calabasas, we paint homes people love coming back to.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 hero-animate hero-animate-delay-3">
              <MagneticButton>
                <a
                  href="#contact"
                  className="inline-flex px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold tracking-wide rounded-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(194,59,43,0.3)]"
                >
                  {CTA_PRIMARY}
                </a>
              </MagneticButton>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 text-white/60 hover:text-white font-body transition-colors duration-300 text-sm py-4"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {PHONE_NUMBER}
              </a>
            </div>

            {/* Response time + warranty badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 hero-animate hero-animate-delay-4">
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                {RESPONSE_TIME}
              </div>
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                2-Year Warranty
              </div>
            </div>

            {/* Quick stats row */}
            <div className="mt-10 flex items-center justify-center gap-8 hero-animate hero-animate-delay-4">
              <div>
                <p className="text-2xl md:text-3xl font-heading text-accent leading-none">500+</p>
                <p className="mt-1 text-[10px] tracking-wider uppercase text-white/40">Homes Painted</p>
              </div>
              <div className="w-px h-10 bg-white/15" />
              <div>
                <p className="text-2xl md:text-3xl font-heading text-accent leading-none">4.9</p>
                <p className="mt-1 text-[10px] tracking-wider uppercase text-white/40">Star Rating</p>
              </div>
              <div className="w-px h-10 bg-white/15" />
              <div>
                <p className="text-2xl md:text-3xl font-heading text-accent leading-none">14</p>
                <p className="mt-1 text-[10px] tracking-wider uppercase text-white/40">Years</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
