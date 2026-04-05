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
import InfoCardGrid from '@/components/shared/InfoCardGrid';
import InlineQuotePanel from '@/components/shared/InlineQuotePanel';
import SectionJumpNav from '@/components/shared/SectionJumpNav';

const SECTION_BACKGROUNDS = ['bg-bg-primary', 'bg-bg-secondary'] as const;

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

function modifierLabel(modifier: number): string {
  if (modifier > 1) return `${Math.round((modifier - 1) * 100)}% above LA base`;
  if (modifier < 1) return `${Math.round((1 - modifier) * 100)}% below LA base`;
  return 'Aligned with LA base';
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function excerpt(value: string, maxLength = 150): string {
  const sentence = stripHtml(value).split(/(?<=[.!?])\s/)[0] ?? '';
  if (sentence.length <= maxLength) return sentence;
  return `${sentence.slice(0, maxLength).trimEnd()}...`;
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

  const cityCards = [
    {
      value: modifierLabel(data.priceModifier),
      title: `${data.name} pricing modifier`,
      body: 'This page uses local pricing logic instead of flattening every Los Angeles neighborhood into the same cost range.',
    },
    {
      value: `${data.neighborhoods.length}`,
      title: 'Neighborhoods covered',
      body: data.neighborhoods.slice(0, 3).join(', '),
    },
    {
      value: `${data.housingStock.length}`,
      title: 'Common home styles',
      body: data.housingStock.slice(0, 3).join(', '),
    },
  ];

  if (data.hoaContext) {
    cityCards.push({
      value: 'HOA',
      title: 'Access and approval context',
      body: data.hoaContext,
    });
  }

  const summaryCards = data.sections.slice(0, 3).map((section) => ({
    title: section.heading,
    body: excerpt(section.body),
  }));

  const jumpItems = [
    ...data.sections.slice(0, 4).map((section) => ({
      id: `section-${slugify(section.heading)}`,
      label: section.heading,
    })),
    { id: 'city-quote-form', label: 'Get Estimate' },
  ];

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
              href="#city-quote-form"
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
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <p className="text-lg md:text-xl text-text-body leading-relaxed max-w-3xl">
            {data.introAnswer}
          </p>
          <SectionJumpNav heading="On this page" items={jumpItems} />
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 md:px-10 pb-12 md:pb-16">
        <InfoCardGrid
          eyebrow="Local Market Snapshot"
          heading={`What changes the scope in ${data.name}`}
          cards={cityCards}
        />
      </section>

      <section className="mx-auto max-w-[1200px] px-6 md:px-10 pb-12 md:pb-16">
        <InfoCardGrid
          eyebrow="Quick Read"
          heading={`What this ${data.name} guide covers`}
          cards={summaryCards}
        />
      </section>

      {/* Body Sections */}
      {data.sections.map((section, i) => {
        const Heading = section.level === 'h2' ? 'h2' : 'h3';
        const sectionId = `section-${slugify(section.heading)}`;
        return (
          <section key={sectionId} className={`${SECTION_BACKGROUNDS[i % SECTION_BACKGROUNDS.length]} py-12 md:py-16`}>
            <div id={sectionId} className="mx-auto max-w-[1200px] px-6 md:px-10 scroll-mt-28">
              <div className="max-w-3xl">
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
                  <div className="mt-6 rounded-sm overflow-hidden border border-border card-depth">
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
              </div>
            </div>
          </section>
        );
      })}

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

      <section className="mx-auto max-w-[1200px] px-6 md:px-10 py-12 md:py-16">
        <InlineQuotePanel
          id="city-quote-form"
          eyebrow="Free Estimate"
          heading={`Talk through your ${data.name} painting project`}
          body={`If you are comparing painters in ${data.name}, start here and Red Stag will come back with a real next step based on your scope, access, and neighborhood conditions.`}
          bullets={[
            `Best fit for homeowners, landlords, and property managers in ${data.name}.`,
            `Use it to price interiors, exteriors, cabinets, ceilings, and more.`,
          ]}
          submitLabel="Get My Free Estimate"
        />
      </section>

      {/* CTA Banner */}
      <CTABanner
        heading={`Ready to Transform Your ${data.name} Home?`}
        subtitle={`Get a free, detailed quote for your painting project in ${data.name}. We respond within 2 hours.`}
        ctaText={CTA_PRIMARY}
        ctaHref="#city-quote-form"
      />
    </>
  );
}
