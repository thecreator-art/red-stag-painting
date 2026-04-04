import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { CITIES, PHONE_HREF, PHONE_NUMBER } from '@/lib/constants';

const sortedCities = [...CITIES].sort((a, b) =>
  a.name.localeCompare(b.name)
);

export default function ServiceArea() {
  return (
    <section id="service-area" className="py-14 md:py-20 bg-bg-primary">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <ScrollReveal>
          <div className="mb-10">
            <span className="section-label">Service Area</span>
            <h2 className="text-2xl md:text-4xl font-heading text-text-primary leading-tight">
              Painting homes across Greater&nbsp;LA
            </h2>
          </div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Google Map — larger */}
          <div className="lg:w-[55%]">
            <ScrollReveal direction="left">
              <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[500px] overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.2742004049!2d-118.69192047471653!3d34.02016130653294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Red Stag Painting service area — Los Angeles"
                  className="absolute inset-0"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right: 2-column city grid + CTA */}
          <div className="lg:w-[45%] flex flex-col">
            <ScrollReveal delay={200} direction="right">
              {/* City grid with pin icons */}
              <div className="border border-border divide-y divide-border flex-1">
                {sortedCities.map((city, i) => (
                  <Link
                    key={city.slug}
                    href={`/areas/${city.slug}`}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-accent-light/30 transition-colors duration-200 group"
                  >
                    <svg className="w-4 h-4 text-accent shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span className="text-sm font-semibold tracking-wide uppercase text-text-primary group-hover:text-accent transition-colors duration-200">
                      {city.name}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Phone link */}
              <a
                href={PHONE_HREF}
                className="mt-3 flex items-center justify-center gap-2 text-sm text-text-muted hover:text-accent transition-colors duration-300"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Don&apos;t see your area? Call {PHONE_NUMBER}
              </a>

              {/* Full-width CTA */}
              <a
                href="#contact"
                className="mt-4 block w-full py-4 bg-accent hover:bg-accent-hover text-white text-center font-semibold tracking-wide uppercase text-sm transition-all duration-300"
              >
                Get a Free Quote in Your Area
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
