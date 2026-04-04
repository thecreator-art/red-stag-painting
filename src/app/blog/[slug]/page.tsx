import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';

import { SITE_URL, BLUR_PLACEHOLDER, CTA_PRIMARY, SERVICES, CITIES } from '@/lib/constants';
import { blogIndex, getBlogData } from '@/data/blog';
import {
  generateBlogPostingSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '@/lib/schema';

import Breadcrumbs from '@/components/shared/Breadcrumbs';
import PricingTable from '@/components/shared/PricingTable';
import FAQAccordion from '@/components/shared/FAQAccordion';
import RelatedLinks from '@/components/shared/RelatedLinks';
import CTABanner from '@/components/shared/CTABanner';

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return blogIndex.map((entry) => ({ slug: entry.slug }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBlogData(slug);

  if (!data) {
    return { title: 'Post Not Found' };
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
      type: 'article',
      ...(data.heroImage ? { images: [{ url: data.heroImage }] } : {}),
    },
    other: {
      'article:published_time': data.publishedDate,
      'article:modified_time': data.lastUpdatedDate,
      'article:author': data.author,
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getBlogData(slug);

  if (!data) notFound();

  // Breadcrumbs
  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: data.h1 },
  ];

  const breadcrumbSchemaItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: data.h1, url: `${SITE_URL}${data.canonical}` },
  ];

  // JSON-LD schemas
  const blogSchema = generateBlogPostingSchema({
    title: data.h1,
    description: data.metaDescription,
    slug: data.slug,
    author: data.author,
    datePublished: data.publishedDate,
    dateModified: data.lastUpdatedDate,
    image: data.heroImage || undefined,
  });
  const faqSchema = data.faqs.length > 0 ? generateFAQSchema(data.faqs) : null;
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbSchemaItems);

  // Format dates for display
  const publishedFormatted = new Date(data.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const updatedFormatted = new Date(data.lastUpdatedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Build related links
  const relatedLinks = [
    ...data.relatedServices.map((serviceSlug) => {
      const s = SERVICES.find((srv) => srv.slug === serviceSlug);
      return {
        label: s?.name ?? serviceSlug,
        href: `/${serviceSlug}`,
        description: `Learn more about ${s?.name ?? serviceSlug}`,
      };
    }),
    ...data.relatedCities.map((citySlug) => {
      const c = CITIES.find((ct) => ct.slug === citySlug);
      return {
        label: c ? `Painters in ${c.name}` : citySlug,
        href: `/areas/${citySlug}`,
      };
    }),
    ...data.relatedPosts.map((postSlug) => {
      const entry = blogIndex.find((b) => b.slug === postSlug);
      return {
        label: entry?.title ?? postSlug,
        href: `/blog/${postSlug}`,
      };
    }),
  ];

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="relative h-[360px] md:h-[460px] flex items-end overflow-hidden">
        {data.heroImage && (
          <Image
            src={data.heroImage}
            alt={data.heroImageAlt}
            fill
            priority
            className="object-cover"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-10 pb-12 md:pb-16">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="mt-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-accent text-white rounded-sm">
              {data.category}
            </span>
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-heading text-white leading-tight max-w-4xl">
            {data.h1}
          </h1>
        </div>
      </section>

      {/* Article meta bar */}
      <section className="bg-bg-primary border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
            </svg>
            {data.author}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            Published {publishedFormatted}
          </span>
          {data.lastUpdatedDate !== data.publishedDate && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
              </svg>
              Updated {updatedFormatted}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {data.readTime} min read
          </span>
        </div>
      </section>

      {/* Intro answer (GEO) */}
      <article className="bg-bg-primary py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <p className="text-lg md:text-xl text-text-body leading-relaxed max-w-3xl">
            {data.introAnswer}
          </p>
        </div>
      </article>

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

      {/* FAQ */}
      {data.faqs.length > 0 && (
        <section className="bg-bg-primary pb-16 md:pb-24">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <p className="section-label">FAQ</p>
            <h2 className="text-2xl md:text-3xl font-heading text-text-primary mb-8">
              Frequently Asked Questions
            </h2>
            <FAQAccordion faqs={data.faqs} />
          </div>
        </section>
      )}

      {/* Related links */}
      {relatedLinks.length > 0 && (
        <section className="bg-bg-primary pb-16 md:pb-24">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <RelatedLinks title="Related Resources" links={relatedLinks} />
          </div>
        </section>
      )}

      {/* CTA */}
      <CTABanner
        heading="Ready to Transform Your Space?"
        subtitle="We respond within 2 hours. Exact pricing after a free walkthrough."
        ctaText={CTA_PRIMARY}
        ctaHref="/#contact"
      />
    </>
  );
}
