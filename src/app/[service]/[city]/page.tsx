import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';

import { SERVICES, CITIES, SITE_URL, BLUR_PLACEHOLDER, CTA_PRIMARY } from '@/lib/constants';
import { getMatrixData } from '@/data/matrix';
import {
  generateMatrixPageSchema,
} from '@/lib/schema';

import Breadcrumbs from '@/components/shared/Breadcrumbs';
import PricingTable from '@/components/shared/PricingTable';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedLinks from '@/components/shared/RelatedLinks';
import CTABanner from '@/components/shared/CTABanner';

// ---------------------------------------------------------------------------
// Static params — 13 services x 30 cities = 390 pages
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  const params: { service: string; city: string }[] = [];
  for (const service of SERVICES) {
    for (const city of CITIES) {
      params.push({ service: service.slug, city: city.slug });
    }
  }
  return params;
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ service: string; city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug, city: citySlug } = await params;
  const data = await getMatrixData(serviceSlug, citySlug);

  if (!data) {
    return { title: 'Page Not Found' };
  }

  return {
    title: data.titleTag,
    description: data.metaDescription,
    alternates: { canonical: data.canonical },
    openGraph: {
      title: data.ogTitle,
      description: data.ogDescription,
      url: `${SITE_URL}${data.canonical}`,
      siteName: 'Red Stag Painting',
      type: 'website',
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function MatrixPage({ params }: PageProps) {
  const { service: serviceSlug, city: citySlug } = await params;
  const data = await getMatrixData(serviceSlug, citySlug);

  if (!data) notFound();

  // Resolve display names from constants for breadcrumbs / related links
  const serviceEntry = SERVICES.find((s) => s.slug === data.serviceSlug);
  const cityEntry = CITIES.find((c) => c.slug === data.citySlug);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: serviceEntry?.name ?? data.serviceName, href: `/${data.serviceSlug}` },
    { label: `${data.serviceName} in ${data.cityName}` },
  ];

  const breadcrumbSchemaItems = [
    { name: 'Home', url: SITE_URL },
    { name: serviceEntry?.name ?? data.serviceName, url: `${SITE_URL}/${data.serviceSlug}` },
    { name: `${data.serviceName} in ${data.cityName}`, url: `${SITE_URL}${data.canonical}` },
  ];

  // JSON-LD
  const schemas = generateMatrixPageSchema({
    serviceName: data.serviceName,
    serviceDescription: data.metaDescription,
    serviceSlug: data.serviceSlug,
    cityName: data.cityName,
    citySlug: data.citySlug,
    faqs: data.faqs,
    breadcrumbs: breadcrumbSchemaItems,
  });

  // Related links
  const relatedLinks = [
    {
      label: serviceEntry?.name ?? data.serviceName,
      href: `/${data.parentService}`,
      description: `All ${data.serviceName} services in Los Angeles`,
    },
    {
      label: `Painters in ${cityEntry?.name ?? data.cityName}`,
      href: `/areas/${data.parentCity}`,
      description: `All painting services in ${data.cityName}`,
    },
    ...data.relatedMatrixPages.map((slug) => {
      // slug format: "service-slug/city-slug" or just a combined slug
      const service = SERVICES.find((s) => slug.startsWith(s.slug));
      const city = CITIES.find((c) => slug.endsWith(c.slug));
      return {
        label: service && city ? `${service.name} in ${city.name}` : slug,
        href: `/${slug}`,
      };
    }),
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

      {/* Hero */}
      <section className="relative h-[420px] md:h-[500px] flex items-end overflow-hidden">
        <Image
          src={data.heroImage}
          alt={data.heroImageAlt}
          fill
          priority
          className="object-cover"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-10 pb-12 md:pb-16">
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className="mt-3 text-3xl md:text-5xl font-heading text-white leading-tight">
            {data.h1}
          </h1>
          {data.heroSubtitle && (
            <p className="mt-3 max-w-2xl text-sm md:text-base text-white/70 leading-relaxed">
              {data.heroSubtitle}
            </p>
          )}
        </div>
      </section>

      {/* Intro answer (GEO) */}
      <section className="bg-bg-primary py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <p className="text-lg md:text-xl text-text-body leading-relaxed max-w-3xl">
            {data.introAnswer}
          </p>
        </div>
      </section>

      {/* Body sections */}
      <section className="bg-bg-primary pb-16 md:pb-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 space-y-12 md:space-y-16">
          {data.sections.map((section, i) => {
            const Heading = section.level === 'h2' ? 'h2' : 'h3';
            return (
              <div key={i}>
                <Heading
                  className={
                    section.level === 'h2'
                      ? 'text-2xl md:text-3xl font-heading text-text-primary mb-4'
                      : 'text-xl md:text-2xl font-heading text-text-primary mb-3'
                  }
                >
                  {section.heading}
                </Heading>

                {section.image && (
                  <div className="mb-6 rounded-sm overflow-hidden">
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      width={section.image.width}
                      height={section.image.height}
                      className="w-full h-auto object-cover"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                    />
                  </div>
                )}

                <div
                  className="prose prose-sm md:prose-base max-w-none text-text-body leading-relaxed
                    prose-strong:text-text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                    prose-ul:mt-3 prose-li:text-text-body"
                  dangerouslySetInnerHTML={{ __html: section.body }}
                />

                {section.pricingTable && section.pricingTable.length > 0 && (
                  <div className="mt-6">
                    <PricingTable tiers={section.pricingTable} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing table */}
      {data.pricingTiers.length > 0 && (
        <section className="bg-bg-primary pb-16 md:pb-24">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <h2 className="text-2xl md:text-3xl font-heading text-text-primary mb-8">
              {data.serviceName} Cost in {data.cityName}
            </h2>
            <PricingTable
              tiers={data.pricingTiers}
              title={`${data.serviceName} Pricing`}
              pricePerSqFt={data.pricePerSqFt}
            />
          </div>
        </section>
      )}

      {/* FAQ */}
      {data.faqs.length > 0 && (
        <section className="bg-bg-primary pb-16 md:pb-24">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <p className="section-label">FAQ</p>
            <h2 className="text-2xl md:text-3xl font-heading text-text-primary mb-8">
              Common Questions About {data.serviceName} in {data.cityName}
            </h2>
            <FAQAccordion faqs={data.faqs} />
          </div>
        </section>
      )}

      {/* Related links */}
      <section className="bg-bg-primary pb-16 md:pb-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <RelatedLinks title="Related Services & Areas" links={relatedLinks} />
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        heading={`Get a Free ${data.serviceName} Quote in ${data.cityName}`}
        subtitle="We respond within 2 hours. Exact pricing after a free walkthrough."
        ctaText={CTA_PRIMARY}
        ctaHref="/#contact"
      />
    </>
  );
}
