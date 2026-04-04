import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

import { getCityData } from '@/data/cities';
import { CITIES, SERVICES, SITE_URL, PHONE_HREF, PHONE_NUMBER, CTA_PRIMARY, BLUR_PLACEHOLDER, PRICING } from '@/lib/constants';
import { generateCityPageSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import FAQAccordion from '@/components/shared/FAQAccordion';
import CTABanner from '@/components/shared/CTABanner';
import RelatedLinks from '@/components/shared/RelatedLinks';

// ─── Static Params ──────────────────────────────────────────────────────────

export function generateStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }));
}

// ─── Metadata ───────────────────────────────────────────────────────────────

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const data = await getCityData(slug);
  if (!data) return {};

  return {
    title: data.titleTag,
    description: data.metaDescription,
    alternates: { canonical: `${SITE_URL}${data.canonical}` },
    openGraph: {
      title: data.ogTitle,
      description: data.ogDescription,
      url: `${SITE_URL}${data.canonical}`,
      type: 'website',
      siteName: 'Red Stag Painting',
    },
  };
}

// ─── Pricing slug map (service slug → PRICING key) ─────────────────────────

const PRICING_KEY_MAP: Record<string, string> = {
  'interior-painting': 'interior',
  'exterior-painting': 'exterior',
  'cabinet-painting': 'cabinet',
  'popcorn-ceiling-removal': 'popcorn',
  'stucco-painting': 'stucco',
  'ceiling-painting': 'ceiling',
  'garage-painting': 'garage',
  'wood-deck-staining': 'wooddeck',
};

function getStartingPrice(serviceSlug: string, priceModifier: number): string | null {
  const key = PRICING_KEY_MAP[serviceSlug];
  if (!key || !PRICING[key]) return null;
  const lowest = PRICING[key][0];
  const adjusted = Math.round(lowest.min * priceModifier);
  return `$${adjusted.toLocaleString()}`;
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function CityPage({ params }: Props) {
  const { city: slug } = await params;
  const data = await getCityData(slug);
  if (!data) notFound();

  const breadcrumbItems = [
    { label: 'Areas We Serve', href: '/areas' },
    { label: data.name },
  ];

  const breadcrumbSchema = [
    { name: 'Home', url: SITE_URL },
    { name: 'Areas We Serve', url: `${SITE_URL}/areas` },
    { name: data.name, url: `${SITE_URL}${data.canonical}` },
  ];

  const schemas = generateCityPageSchema({
    cityName: data.name,
    faqs: data.faqs,
    breadcrumbs: breadcrumbSchema,
  });

  const nearbyCityLinks = data.nearbyCities.map((nearbySlug) => {
    const city = CITIES.find((c) => c.slug === nearbySlug);
    return {
      label: city?.name ?? nearbySlug,
      href: `/areas/${nearbySlug}`,
    };
  });

  return (
    <>
      {/* JSON-LD */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 pt-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={data.heroImage}
            alt={data.heroImageAlt}
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/90 via-bg-dark/70 to-bg-dark/50" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-28">
          <p className="section-label text-accent mb-4">
            {data.state} Painting Professionals
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading text-white leading-tight max-w-2xl">
            {data.h1}
          </h1>
          <p className="mt-4 text-base md:text-lg text-text-on-dark/70 max-w-xl leading-relaxed">
            {data.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#contact"
              className="inline-flex px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold tracking-wide rounded-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(194,59,43,0.3)] hover:-translate-y-0.5"
            >
              {CTA_PRIMARY}
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex px-8 py-4 border border-white/20 text-white font-semibold tracking-wide rounded-sm transition-all duration-300 hover:bg-white/10"
            >
              {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </section>

      {/* Intro Answer */}
      <section className="mx-auto max-w-[1200px] px-6 md:px-10 py-12 md:py-16">
        <p className="text-lg md:text-xl text-text-body leading-relaxed max-w-3xl">
          {data.introAnswer}
        </p>
      </section>

      {/* Body Sections */}
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 space-y-12 md:space-y-16">
        {data.sections.map((section, i) => {
          const Heading = section.level === 'h2' ? 'h2' : 'h3';
          return (
            <section key={i}>
              <Heading
                className={
                  section.level === 'h2'
                    ? 'text-2xl md:text-3xl font-heading text-text-primary mb-4'
                    : 'text-xl md:text-2xl font-heading text-text-primary mb-3'
                }
              >
                {section.heading}
              </Heading>
              <div
                className="prose prose-sm md:prose-base text-text-body max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_a]:text-accent [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: section.body }}
              />
              {section.image && (
                <div className="mt-6 rounded-sm overflow-hidden">
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    width={section.image.width}
                    height={section.image.height}
                    className="w-full h-auto"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Service Links Grid */}
      <section className="mx-auto max-w-[1200px] px-6 md:px-10 py-16 md:py-20">
        <p className="section-label text-accent mb-2">Our Services</p>
        <h2 className="text-2xl md:text-3xl font-heading text-text-primary mb-8">
          Painting Services in {data.name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service) => {
            const startingPrice = getStartingPrice(service.slug, data.priceModifier);
            return (
              <Link
                key={service.slug}
                href={`/${service.slug}/${data.slug}`}
                className="group card-depth rounded-sm border border-border bg-white p-6 transition-all duration-300 hover:border-accent/20 hover:-translate-y-0.5"
              >
                <span className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors duration-200">
                  {service.name}
                </span>
                {startingPrice && (
                  <p className="mt-1 text-xs text-text-muted">
                    Starting from {startingPrice}
                  </p>
                )}
                <p className="mt-1 text-xs text-text-muted">
                  in {data.name}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Nearby Cities */}
      {nearbyCityLinks.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-6 md:px-10 pb-12 md:pb-16">
          <RelatedLinks title={`Nearby Areas We Serve`} links={nearbyCityLinks} />
        </section>
      )}

      {/* FAQ */}
      <section className="mx-auto max-w-[1200px] px-6 md:px-10 py-12 md:py-16">
        <p className="section-label text-accent mb-2">Common Questions</p>
        <h2 className="text-2xl md:text-3xl font-heading text-text-primary mb-8">
          {data.name} Painting FAQ
        </h2>
        <FAQAccordion faqs={data.faqs} />
      </section>

      {/* CTA Banner */}
      <CTABanner
        heading={`Ready to Transform Your ${data.name} Home?`}
        subtitle={`Get a free, detailed quote for your painting project in ${data.name}. We respond within 2 hours.`}
        ctaText={CTA_PRIMARY}
        ctaHref="#contact"
      />
    </>
  );
}
