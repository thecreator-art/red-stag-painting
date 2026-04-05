import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getServiceData } from '@/data/services';
import { SERVICES, CITIES, SITE_URL, PHONE_HREF, PHONE_NUMBER, CTA_PRIMARY, BLUR_PLACEHOLDER } from '@/lib/constants';
import { generateServicePageSchema } from '@/lib/schema';
import type { ContentSection, ImageAsset } from '@/data/types';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import PricingTable from '@/components/shared/PricingTable';
import CTABanner from '@/components/shared/CTABanner';
import RelatedLinks from '@/components/shared/RelatedLinks';
import FAQAccordion from '@/components/shared/FAQAccordion';
import ServiceBeforeAfter from '@/components/service-features/ServiceBeforeAfter';
import ServiceFeatureRenderer from '@/components/service-features/ServiceFeatureRenderer';
import ServiceInlineQuoteForm from '@/components/service-features/ServiceInlineQuoteForm';
import ServiceReviews from '@/components/service-features/ServiceReviews';
import ServiceStickySidebar from '@/components/service-features/ServiceStickySidebar';
import WhyChooseGrid from '@/components/service-features/WhyChooseGrid';

const SECTION_BACKGROUNDS = ['bg-bg-primary', 'bg-bg-secondary'] as const;

function formatMoney(value: number): string {
  return `$${value.toLocaleString()}`;
}

function formatSidebarRange(tiers: { min: number; max: number; plus?: boolean }[]): string {
  const first = tiers[0];
  const last = tiers[tiers.length - 1];
  return `${formatMoney(first.min)} - ${formatMoney(last.max)}${last.plus ? '+' : ''}`;
}

function InlineImageBlock({ image, serviceName }: { image: ImageAsset; serviceName: string }) {
  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="overflow-hidden rounded-sm border border-border card-depth">
        <div className="relative aspect-[16/9]">
          <Image
            src={image.src}
            alt={image.alt || `${serviceName} project photo`}
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        </div>
      </div>
    </div>
  );
}

function BodySectionBlock({ section }: { section: ContentSection }) {
  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="max-w-3xl">
        {section.level === 'h2' ? (
          <h2 className="text-3xl md:text-5xl font-heading leading-tight text-text-primary">
            {section.heading}
          </h2>
        ) : (
          <h3 className="text-2xl md:text-3xl font-heading leading-tight text-text-primary">
            {section.heading}
          </h3>
        )}
        <div
          className="mt-6 space-y-4 text-base md:text-lg leading-relaxed text-text-body [&_a]:text-accent [&_a]:underline [&_a:hover]:text-accent-hover [&_em]:text-text-primary [&_li]:mt-2 [&_strong]:text-text-primary [&_ul]:list-disc [&_ul]:pl-5"
          dangerouslySetInnerHTML={{ __html: section.body }}
        />
        {section.image && (
          <div className="mt-10 overflow-hidden rounded-sm border border-border card-depth">
            <Image
              src={section.image.src}
              alt={section.image.alt}
              width={section.image.width}
              height={section.image.height}
              className="h-auto w-full object-cover"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
            />
          </div>
        )}
        {section.pricingTable && (
          <div className="mt-10">
            <PricingTable tiers={section.pricingTable} />
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }));
}

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

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const data = await getServiceData(service);
  if (!data) notFound();

  const breadcrumbItems = [
    { label: 'Services', href: '/#services' },
    { label: data.name },
  ];

  const schemaBreadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Services', url: `${SITE_URL}/#services` },
    { name: data.name, url: `${SITE_URL}${data.canonical}` },
  ];

  const schemas = generateServicePageSchema({
    name: data.name,
    description: data.metaDescription,
    slug: data.slug,
    faqs: data.faqs,
    breadcrumbs: schemaBreadcrumbs,
  });

  const relatedServiceLinks = data.relatedServices
    .map((slug) => {
      const svc = SERVICES.find((item) => item.slug === slug);
      if (!svc) return null;
      return { label: svc.name, href: `/${svc.slug}` };
    })
    .filter(Boolean) as { label: string; href: string }[];

  const featuredCityLinks = data.featuredCities
    .map((slug) => {
      const city = CITIES.find((item) => item.slug === slug);
      if (!city) return null;
      return {
        label: `${data.name} in ${city.name}`,
        href: `/${data.slug}/${city.slug}`,
      };
    })
    .filter(Boolean) as { label: string; href: string }[];

  const bodyBlocks: { key: string; content: ReactNode }[] = [];
  let inlineImageIndex = 0;

  data.sections.forEach((section, index) => {
    bodyBlocks.push({
      key: `body-${index}`,
      content: <BodySectionBlock section={section} />,
    });

    if (index === 1) {
      bodyBlocks.push({
        key: 'before-after',
        content: <ServiceBeforeAfter data={data.beforeAfter} serviceName={data.name} />,
      });
      bodyBlocks.push({
        key: 'feature',
        content: <ServiceFeatureRenderer feature={data.serviceFeature} />,
      });
      return;
    }

    if ((index + 1) % 2 === 0 && index > 1) {
      const image = data.inlineImages[inlineImageIndex];
      if (image) {
        bodyBlocks.push({
          key: `inline-image-${inlineImageIndex}`,
          content: <InlineImageBlock image={image} serviceName={data.name} />,
        });
        inlineImageIndex += 1;
      }
    }
  });

  const pageBlocks: { key: string; content: ReactNode }[] = [
    {
      key: 'intro',
      content: (
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-3xl">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="brand-line mt-8 mb-6" />
            <p className="text-lg md:text-2xl leading-relaxed text-text-body">
              {data.introAnswer}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-text-muted">
              <div>
                <p className="text-2xl font-heading text-accent leading-none">{formatSidebarRange(data.pricingTiers)}</p>
                <p className="mt-1 uppercase tracking-[0.16em] text-[11px]">Los Angeles range</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <p className="text-2xl font-heading text-accent leading-none">24 hr</p>
                <p className="mt-1 uppercase tracking-[0.16em] text-[11px]">Quote turnaround</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <a href={PHONE_HREF} className="text-lg font-heading text-text-primary hover:text-accent">
                  {PHONE_NUMBER}
                </a>
                <p className="mt-1 uppercase tracking-[0.16em] text-[11px]">Call for a walkthrough</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    ...bodyBlocks,
    {
      key: 'pricing',
      content: (
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-3xl">
            <p className="section-label text-accent mb-3">Pricing</p>
            <h2 className="text-3xl md:text-5xl font-heading leading-tight text-text-primary">
              {data.name} cost in Los Angeles
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-text-body">
              {data.priceAnchor}
            </p>
            <div className="mt-10">
              <PricingTable
                tiers={data.pricingTiers}
                title={data.name}
                pricePerSqFt={data.pricePerSqFt}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'why-choose',
      content: <WhyChooseGrid cards={data.whyChooseCards} />,
    },
    {
      key: 'reviews',
      content: <ServiceReviews reviews={data.homeownerReviews} />,
    },
    {
      key: 'related',
      content: (
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-2">
            <RelatedLinks title="Related Services" links={relatedServiceLinks} />
            <RelatedLinks title={`${data.name} by City`} links={featuredCityLinks} />
          </div>
        </div>
      ),
    },
    {
      key: 'faq',
      content: (
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-3xl">
            <p className="section-label text-accent mb-3">FAQ</p>
            <h2 className="text-3xl md:text-5xl font-heading leading-tight text-text-primary">
              Common questions about {data.name.toLowerCase()}
            </h2>
            <div className="mt-10">
              <FAQAccordion faqs={data.faqs} />
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'quote-form',
      content: <ServiceInlineQuoteForm serviceName={data.name} />,
    },
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section id="service-hero" className="relative min-h-[calc(100vh-68px)] overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/88 via-bg-dark/64 to-bg-dark/28" />

        <div className="relative z-10 flex min-h-[calc(100vh-68px)] items-center">
          <div className="mx-auto w-full max-w-[1200px] px-6 py-16 md:px-10 lg:py-24">
            <div className="max-w-2xl">
              <div className="brand-line mb-6" />
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-heading leading-[1.1] tracking-tight text-white">
                {data.h1}
              </h1>
              <p className="mt-5 max-w-md text-base md:text-lg leading-relaxed text-white/60">
                {data.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
                <a
                  href="#service-quote-form"
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
              <div className="mt-10 grid max-w-md grid-cols-3 gap-6 sm:max-w-none sm:flex sm:flex-wrap sm:items-center sm:gap-8">
                <div>
                  <p className="text-2xl md:text-3xl font-heading text-accent leading-none">{formatMoney(data.pricingTiers[0].min)}</p>
                  <p className="mt-1 text-[10px] tracking-wider uppercase text-white/40">Starting Range</p>
                </div>
                <div className="hidden h-10 w-px bg-white/15 sm:block" />
                <div>
                  <p className="text-2xl md:text-3xl font-heading text-accent leading-none">24 hr</p>
                  <p className="mt-1 text-[10px] tracking-wider uppercase text-white/40">Quote Turnaround</p>
                </div>
                <div className="hidden h-10 w-px bg-white/15 sm:block" />
                <div>
                  <p className="text-2xl md:text-3xl font-heading text-accent leading-none">500+</p>
                  <p className="mt-1 text-[10px] tracking-wider uppercase text-white/40">Homes Painted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative">
        <ServiceStickySidebar
          heading={data.name}
          phoneHref={PHONE_HREF}
          phoneNumber={PHONE_NUMBER}
          pricingSummary={formatSidebarRange(data.pricingTiers)}
        />

        {pageBlocks.map((block, index) => (
          <section
            key={block.key}
            className={`${SECTION_BACKGROUNDS[index % SECTION_BACKGROUNDS.length]} py-20 md:py-24`}
          >
            <div className="mx-auto max-w-[1200px] px-6 md:px-10">
              {block.content}
            </div>
          </section>
        ))}

        <div id="service-cta-banner">
          <CTABanner
            heading={`Ready for professional ${data.name.toLowerCase()}?`}
            subtitle="Free walkthrough, detailed quote in 24 hours, and a scope that matches the house in front of us."
            ctaText={CTA_PRIMARY}
            ctaHref="#service-quote-form"
          />
        </div>
      </div>
    </>
  );
}
