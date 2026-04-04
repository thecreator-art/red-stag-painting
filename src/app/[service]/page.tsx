import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getServiceData } from '@/data/services';
import { SERVICES, CITIES, SITE_URL, PHONE_HREF, PHONE_NUMBER, CTA_PRIMARY, BLUR_PLACEHOLDER } from '@/lib/constants';
import { generateServicePageSchema } from '@/lib/schema';
import type { ContentSection } from '@/data/types';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import PricingTable from '@/components/shared/PricingTable';
import CTABanner from '@/components/shared/CTABanner';
import RelatedLinks from '@/components/shared/RelatedLinks';
import FAQAccordion from '@/components/shared/FAQAccordion';

// ─── Static Params ─────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }));
}

// ─── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const data = await getServiceData(service);
  if (!data) return {};

  return {
    title: data.titleTag,
    description: data.metaDescription,
    alternates: {
      canonical: `${SITE_URL}${data.canonical}`,
    },
    openGraph: {
      title: data.ogTitle,
      description: data.ogDescription,
      url: `${SITE_URL}${data.canonical}`,
      siteName: 'Red Stag Painting',
      type: 'website',
      images: [{ url: data.heroImage, alt: data.heroImageAlt }],
    },
  };
}

// ─── Page Component ────────────────────────────────────────────────────────

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const data = await getServiceData(service);
  if (!data) notFound();

  // Breadcrumb items (Home is built into Breadcrumbs component)
  const breadcrumbItems = [
    { label: 'Services', href: '/#services' },
    { label: data.name },
  ];

  // Schema breadcrumbs
  const schemaBreadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Services', url: `${SITE_URL}/#services` },
    { name: data.name, url: `${SITE_URL}${data.canonical}` },
  ];

  // JSON-LD schemas
  const schemas = generateServicePageSchema({
    name: data.name,
    description: data.metaDescription,
    slug: data.slug,
    faqs: data.faqs,
    breadcrumbs: schemaBreadcrumbs,
  });

  // Related service links
  const relatedServiceLinks = data.relatedServices
    .map((slug) => {
      const svc = SERVICES.find((s) => s.slug === slug);
      if (!svc) return null;
      return { label: svc.name, href: `/${svc.slug}` };
    })
    .filter(Boolean) as { label: string; href: string }[];

  // Featured city links for this service
  const featuredCityLinks = data.featuredCities
    .map((slug) => {
      const city = CITIES.find((c) => c.slug === slug);
      if (!city) return null;
      return {
        label: `${data.name} in ${city.name}`,
        href: `/${data.slug}/${city.slug}`,
      };
    })
    .filter(Boolean) as { label: string; href: string }[];

  return (
    <>
      {/* JSON-LD Schema Scripts */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <Image
          src={data.heroImage}
          alt={data.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/95 via-bg-dark/80 to-bg-dark/40" />

        <div className="relative z-10 min-h-[60vh] flex items-center">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 w-full py-16 lg:py-24">
            <div className="max-w-2xl">
              <div className="brand-line mb-6" />
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-heading leading-[1.1] tracking-tight text-white">
                {data.h1}
              </h1>
              <p className="mt-5 text-base md:text-lg text-white/60 font-body max-w-md">
                {data.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
                <a
                  href="#contact"
                  className="inline-flex px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold tracking-wide rounded-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(194,59,43,0.3)]"
                >
                  {CTA_PRIMARY}
                </a>
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
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 pt-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Intro Answer Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="max-w-3xl">
            <span className="section-label">Overview</span>
            <p className="text-lg md:text-xl text-text-body leading-relaxed">
              {data.introAnswer}
            </p>
          </div>
        </div>
      </section>

      {/* Body Sections */}
      {data.sections.map((section: ContentSection, i: number) => (
        <section
          key={i}
          className={`py-16 md:py-24 ${i % 2 === 1 ? 'bg-bg-secondary' : ''}`}
        >
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <div className="max-w-3xl">
              {section.level === 'h2' ? (
                <h2 className="text-2xl md:text-3xl font-heading leading-tight mb-6">
                  {section.heading}
                </h2>
              ) : (
                <h3 className="text-xl md:text-2xl font-heading leading-tight mb-4">
                  {section.heading}
                </h3>
              )}
              <div
                className="text-text-body leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:text-accent [&_a]:underline [&_a:hover]:text-accent-hover [&_strong]:text-text-primary"
                dangerouslySetInnerHTML={{ __html: section.body }}
              />
              {section.image && (
                <div className="mt-8 rounded-sm overflow-hidden">
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
              {section.pricingTable && (
                <div className="mt-8">
                  <PricingTable tiers={section.pricingTable} />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Pricing Table Section */}
      <section className="py-16 md:py-24 bg-bg-secondary">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="max-w-3xl">
            <span className="section-label">Pricing</span>
            <h2 className="text-2xl md:text-3xl font-heading leading-tight mb-3">
              {data.name} Cost in Los Angeles
            </h2>
            <p className="text-sm text-text-muted mb-8">
              {data.priceAnchor}
            </p>
            <PricingTable
              tiers={data.pricingTiers}
              title={data.name}
              pricePerSqFt={data.pricePerSqFt}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="max-w-3xl">
            <span className="section-label">FAQ</span>
            <h2 className="text-2xl md:text-3xl font-heading leading-tight mb-8">
              Common Questions About {data.name}
            </h2>
            <FAQAccordion faqs={data.faqs} />
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServiceLinks.length > 0 && (
        <section className="py-16 md:py-24 bg-bg-secondary">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <RelatedLinks title="Related Services" links={relatedServiceLinks} />
          </div>
        </section>
      )}

      {/* Featured City Pages */}
      {featuredCityLinks.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <RelatedLinks title={`${data.name} by City`} links={featuredCityLinks} />
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <CTABanner
        heading={`Ready for Professional ${data.name}?`}
        subtitle="Free walkthrough, detailed quote in 24 hours. No pressure, no surprises."
        ctaText={CTA_PRIMARY}
        ctaHref="#contact"
      />
    </>
  );
}
