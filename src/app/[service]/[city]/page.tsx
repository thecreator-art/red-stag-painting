import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';

import { SERVICES, CITIES, SITE_URL, BLUR_PLACEHOLDER, CTA_PRIMARY, PHONE_HREF, PHONE_NUMBER } from '@/lib/constants';
import { getMatrixData } from '@/data/matrix';
import { generateMatrixPageSchema } from '@/lib/schema';

import Breadcrumbs from '@/components/shared/Breadcrumbs';
import PricingTable from '@/components/shared/PricingTable';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedLinks from '@/components/shared/RelatedLinks';
import CTABanner from '@/components/shared/CTABanner';
import InfoCardGrid from '@/components/shared/InfoCardGrid';
import InlineQuotePanel from '@/components/shared/InlineQuotePanel';
import SectionJumpNav from '@/components/shared/SectionJumpNav';
import ServiceStickySidebar from '@/components/service-features/ServiceStickySidebar';

const SECTION_BACKGROUNDS = ['bg-bg-primary', 'bg-bg-secondary'] as const;

function formatMoney(value: number): string {
  return `$${value.toLocaleString()}`;
}

function formatRange(tiers: { min: number; max: number; plus?: boolean }[]): string {
  const first = tiers[0];
  const last = tiers[tiers.length - 1];
  return `${formatMoney(first.min)} - ${formatMoney(last.max)}${last.plus ? '+' : ''}`;
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

export function generateStaticParams() {
  const params: { service: string; city: string }[] = [];
  for (const service of SERVICES) {
    for (const city of CITIES) {
      params.push({ service: service.slug, city: city.slug });
    }
  }
  return params;
}

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

export default async function MatrixPage({ params }: PageProps) {
  const { service: serviceSlug, city: citySlug } = await params;
  const data = await getMatrixData(serviceSlug, citySlug);

  if (!data) notFound();

  const serviceEntry = SERVICES.find((s) => s.slug === data.serviceSlug);
  const cityEntry = CITIES.find((c) => c.slug === data.citySlug);

  const breadcrumbItems = [
    { label: serviceEntry?.name ?? data.serviceName, href: `/${data.serviceSlug}` },
    { label: `${data.serviceName} in ${data.cityName}` },
  ];

  const breadcrumbSchemaItems = [
    { name: 'Home', url: SITE_URL },
    { name: serviceEntry?.name ?? data.serviceName, url: `${SITE_URL}/${data.serviceSlug}` },
    { name: `${data.serviceName} in ${data.cityName}`, url: `${SITE_URL}${data.canonical}` },
  ];

  const schemas = generateMatrixPageSchema({
    serviceName: data.serviceName,
    serviceDescription: data.metaDescription,
    serviceSlug: data.serviceSlug,
    cityName: data.cityName,
    citySlug: data.citySlug,
    faqs: data.faqs,
    breadcrumbs: breadcrumbSchemaItems,
  });

  const localCards = [
    {
      value: formatRange(data.pricingTiers),
      title: `${data.cityName} working range`,
      body: `These numbers reflect ${data.serviceName.toLowerCase()} pricing in ${data.cityName}, not a generic Los Angeles average.`,
    },
    {
      value: data.pricePerSqFt || 'Custom',
      title: 'Scope signal',
      body: `This page is built for homeowners pricing ${data.serviceName.toLowerCase()} specifically in ${data.cityName}.`,
    },
    {
      value: '24 hr',
      title: 'Quote turnaround',
      body: 'Walkthroughs lead to a written quote quickly, with the scope grounded in the actual house and neighborhood conditions.',
    },
  ];

  const jumpItems = [
    ...data.sections.slice(0, 4).map((section) => ({
      id: `section-${slugify(section.heading)}`,
      label: section.heading,
    })),
    ...(data.faqs.length > 0 ? [{ id: 'matrix-faq', label: 'FAQ' }] : []),
    { id: 'matrix-quote-form', label: 'Get Estimate' },
  ];

  const relatedAreaLinks = [
    {
      label: serviceEntry?.name ?? data.serviceName,
      href: `/${data.parentService}`,
      description: `See the Los Angeles-wide ${data.serviceName.toLowerCase()} page.`,
    },
    {
      label: `Painters in ${cityEntry?.name ?? data.cityName}`,
      href: `/areas/${data.parentCity}`,
      description: `Explore all Red Stag painting work in ${data.cityName}.`,
    },
    ...data.relatedMatrixPages.map((slug) => {
      const service = SERVICES.find((s) => slug.startsWith(s.slug));
      const city = CITIES.find((c) => slug.endsWith(c.slug));
      return {
        label: service && city ? `${service.name} in ${city.name}` : slug,
        href: `/${slug}`,
      };
    }),
  ];

  const summaryCards = data.sections.slice(0, 3).map((section) => ({
    title: section.heading,
    body: excerpt(section.body),
  }));

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section id="service-hero" className="relative h-[420px] md:h-[520px] flex items-end overflow-hidden">
        <Image
          src={data.heroImage}
          alt={data.heroImageAlt}
          fill
          priority
          className="object-cover"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/88 via-bg-dark/64 to-bg-dark/28" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-10 pb-12 md:pb-16">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="brand-line mt-5 mb-6" />
          <h1 className="text-3xl md:text-5xl font-heading text-white leading-tight max-w-4xl">
            {data.h1}
          </h1>
          {data.heroSubtitle && (
            <p className="mt-4 max-w-2xl text-sm md:text-base text-white/70 leading-relaxed">
              {data.heroSubtitle}
            </p>
          )}
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
            <a
              href="#matrix-quote-form"
              className="inline-flex px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold tracking-wide rounded-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(194,59,43,0.3)]"
            >
              {CTA_PRIMARY}
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white font-body transition-colors duration-300 text-sm py-4"
            >
              {PHONE_NUMBER}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-white/60">
            <div>
              <p className="text-2xl md:text-3xl font-heading text-accent leading-none">
                {formatMoney(data.pricingTiers[0].min)}
              </p>
              <p className="mt-1 text-[10px] tracking-wider uppercase text-white/40">Starting range</p>
            </div>
            <div className="h-10 w-px bg-white/15" />
            <div>
              <p className="text-2xl md:text-3xl font-heading text-accent leading-none">{data.cityName}</p>
              <p className="mt-1 text-[10px] tracking-wider uppercase text-white/40">Local market</p>
            </div>
            <div className="h-10 w-px bg-white/15" />
            <div>
              <a href={PHONE_HREF} className="text-lg font-heading text-white hover:text-accent">
                {PHONE_NUMBER}
              </a>
              <p className="mt-1 text-[10px] tracking-wider uppercase text-white/40">Call for a walkthrough</p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative">
        <ServiceStickySidebar
          heading={`${data.serviceName} in ${data.cityName}`}
          phoneHref={PHONE_HREF}
          phoneNumber={PHONE_NUMBER}
          pricingSummary={formatRange(data.pricingTiers)}
        />

        <section className="bg-bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
              <div className="max-w-3xl">
                <p className="text-lg md:text-xl text-text-body leading-relaxed">
                  {data.introAnswer}
                </p>
              </div>
              <SectionJumpNav heading="On this page" items={jumpItems} />
            </div>
          </div>
        </section>

        <section className="bg-bg-secondary py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <InfoCardGrid
              eyebrow="Why This Page Matters"
              heading={`${data.serviceName} pricing and decision points in ${data.cityName}`}
              cards={localCards}
            />
          </div>
        </section>

        <section className="bg-bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <InfoCardGrid
              eyebrow="Quick Read"
              heading={`What this ${data.serviceName.toLowerCase()} page covers in ${data.cityName}`}
              cards={summaryCards}
            />
          </div>
        </section>

        {data.sections.map((section, i) => {
          const Heading = section.level === 'h2' ? 'h2' : 'h3';
          const sectionId = `section-${slugify(section.heading)}`;
          return (
            <section
              key={sectionId}
              className={`${SECTION_BACKGROUNDS[i % SECTION_BACKGROUNDS.length]} py-16 md:py-20`}
            >
              <div
                id={sectionId}
                className="mx-auto max-w-[1200px] px-6 md:px-10 scroll-mt-28"
              >
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

                  {section.image && (
                    <div className="mb-6 rounded-sm overflow-hidden border border-border card-depth">
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
              </div>
            </section>
          );
        })}

        {data.pricingTiers.length > 0 && (
          <section className="bg-bg-secondary py-16 md:py-20">
            <div className="mx-auto max-w-[1200px] px-6 md:px-10">
              <div className="max-w-3xl">
                <p className="section-label text-accent mb-3">Pricing</p>
                <h2 className="text-2xl md:text-3xl font-heading text-text-primary mb-4">
                  {data.serviceName} cost in {data.cityName}
                </h2>
                <p className="text-base md:text-lg text-text-body leading-relaxed">
                  A cleaner planning range for homeowners comparing this exact scope in {data.cityName}.
                </p>
                <div className="mt-8">
                  <PricingTable
                    tiers={data.pricingTiers}
                    title={`${data.serviceName} Pricing`}
                    pricePerSqFt={data.pricePerSqFt}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="bg-bg-primary py-16 md:py-20">
          <InlineQuotePanel
            id="matrix-quote-form"
            eyebrow="Free Estimate"
            heading={`Get a ${data.serviceName.toLowerCase()} quote in ${data.cityName}`}
            body={`If you are pricing ${data.serviceName.toLowerCase()} in ${data.cityName}, send the basics here and Red Stag will come back with a real next step, not a vague canned response.`}
            bullets={[
              `Built for ${data.cityName} homeowners comparing local pricing.`,
              `Service type is already preselected for ${data.serviceName.toLowerCase()}.`,
            ]}
            initialService={data.serviceName}
            submitLabel="Get My Local Estimate"
          />
        </section>

        {data.faqs.length > 0 && (
          <section id="matrix-faq" className="bg-bg-secondary py-16 md:py-20 scroll-mt-28">
            <div className="mx-auto max-w-[1200px] px-6 md:px-10">
              <div className="max-w-3xl">
                <p className="section-label">FAQ</p>
                <h2 className="text-2xl md:text-3xl font-heading text-text-primary mb-8">
                  Common questions about {data.serviceName.toLowerCase()} in {data.cityName}
                </h2>
                <FAQAccordion faqs={data.faqs} />
              </div>
            </div>
          </section>
        )}

        <section className="bg-bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <RelatedLinks title="Related Services & Areas" links={relatedAreaLinks} />
          </div>
        </section>

        <div id="service-cta-banner">
          <CTABanner
            heading={`Get a free ${data.serviceName} quote in ${data.cityName}`}
            subtitle="We respond within 2 hours. Exact pricing after a free walkthrough."
            ctaText={CTA_PRIMARY}
            ctaHref="#matrix-quote-form"
          />
        </div>
      </div>
    </>
  );
}
