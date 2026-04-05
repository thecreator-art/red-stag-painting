import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { CITIES, PHONE_HREF, PHONE_NUMBER } from '@/lib/constants';

const sortedCities = [...CITIES].sort((a, b) =>
  a.name.localeCompare(b.name)
);
const midpoint = Math.ceil(sortedCities.length / 2);
const cityColumns = [
  sortedCities.slice(0, midpoint),
  sortedCities.slice(midpoint),
];

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

        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          {/* Left: Google Map — larger */}
          <div className="min-w-0 lg:h-full">
            <ScrollReveal direction="left" className="h-full w-full">
              <div className="relative w-full aspect-[4/3] lg:h-full lg:min-h-[560px] overflow-hidden rounded-sm border border-border card-depth">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.2742004049!2d-118.69192047471653!3d34.02016130653294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Red Stag Painting service area — Los Angeles"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right: 2-column city grid + CTA */}
          <div className="min-w-0 lg:h-full">
            <ScrollReveal delay={200} direction="right" className="h-full w-full">
              <div className="flex h-full flex-col rounded-sm border border-border bg-white card-depth overflow-hidden">
                <div className="border-b border-border px-5 py-4 bg-bg-secondary/45">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                    Browse By Area
                  </p>
                </div>

                <div className="grid flex-1 grid-cols-1 md:grid-cols-2">
                  {cityColumns.map((column, columnIndex) => (
                    <div
                      key={columnIndex}
                      className={columnIndex === 0 ? 'md:border-r md:border-border' : ''}
                    >
                      {column.map((city) => (
                        <Link
                          key={city.slug}
                          href={`/areas/${city.slug}`}
                          className="flex items-center gap-2.5 border-b border-border px-4 py-2.5 hover:bg-accent-light/30 transition-colors duration-200 group"
                        >
                          <svg className="w-3.5 h-3.5 text-accent shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                          </svg>
                          <span className="text-[13px] font-semibold text-text-primary group-hover:text-accent transition-colors duration-200">
                            {city.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="border-t border-border bg-bg-primary px-5 py-4">
                  <a
                    href={PHONE_HREF}
                    className="flex items-center justify-center gap-2 text-sm text-text-muted hover:text-accent transition-colors duration-300"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Don&apos;t see your area? Call {PHONE_NUMBER}
                  </a>

                  <a
                    href="#contact"
                    className="mt-4 block w-full rounded-sm py-4 bg-accent hover:bg-accent-hover text-white text-center font-semibold tracking-wide uppercase text-sm transition-all duration-300"
                  >
                    Get a Free Quote in Your Area
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
