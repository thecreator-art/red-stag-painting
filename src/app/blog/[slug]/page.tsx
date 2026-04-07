import Link from 'next/link';
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
import SectionJumpNav from '@/components/shared/SectionJumpNav';
import InlineQuotePanel from '@/components/shared/InlineQuotePanel';
import InfoCardGrid from '@/components/shared/InfoCardGrid';

const SECTION_BACKGROUNDS = ['bg-bg-primary', 'bg-bg-secondary'] as const;

interface BlogRelatedLink {
  label: string;
  href: string;
  description?: string;
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

function extractListItems(value: string, maxItems = 3): string[] {
  const matches = Array.from(value.matchAll(/<li>(.*?)<\/li>/g))
    .map((match) => stripHtml(match[1] ?? ''))
    .filter(Boolean);

  if (matches.length > 0) {
    return matches.slice(0, maxItems);
  }

  return stripHtml(value)
    .split(/(?<=[.!?])\s/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .slice(0, maxItems);
}

export function generateStaticParams() {
  return blogIndex.map((entry) => ({ slug: entry.slug }));
}

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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getBlogData(slug);

  if (!data) notFound();

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: data.h1 },
  ];

  const breadcrumbSchemaItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: data.h1, url: `${SITE_URL}${data.canonical}` },
  ];

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

  const relatedLinks: BlogRelatedLink[] = [
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

  const jumpItems = [
    ...data.sections.slice(0, 5).map((section) => ({
      id: `section-${slugify(section.heading)}`,
      label: section.heading,
    })),
    ...(data.faqs.length > 0 ? [{ id: 'blog-faq', label: 'FAQ' }] : []),
    { id: 'blog-quote-form', label: 'Get Estimate' },
  ];

  const primaryRelatedServiceSlug = data.relatedServices[0];
  const primaryRelatedServiceName = SERVICES.find((service) => service.slug === primaryRelatedServiceSlug)?.name;
  const summaryCards = [
    {
      title: 'Quick answer',
      body: data.introAnswer,
      value: data.category,
    },
    {
      title: 'Reading time',
      body: 'Built for homeowners who want the practical version first, then the contractor detail right after.',
      value: `${data.readTime} min`,
    },
    {
      title: 'Best next step',
      body: primaryRelatedServiceName
        ? `Use this guide to get oriented, then jump into ${primaryRelatedServiceName.toLowerCase()} pricing or request a real estimate.`
        : 'Use the guide to narrow the scope, then move into a real estimate with your actual job details.',
      value: 'Plan',
    },
  ];
  const takeaways = data.sections
    .slice(0, 4)
    .flatMap((section) => extractListItems(section.body, 1))
    .slice(0, 4);
  const actionLinks = relatedLinks.slice(0, 3);

  return (
    <>
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

      <section className="relative min-h-[520px] overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#191613]/85 via-[#191613]/52 to-[#191613]/22" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-12 pt-20 md:px-10 md:pb-18 md:pt-28">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div className="max-w-4xl">
              <div className="mt-4">
                <span className="inline-block rounded-sm bg-accent px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase">
                  {data.category}
                </span>
              </div>
              <h1 className="mt-4 max-w-4xl text-3xl font-heading leading-[1.05] text-white md:text-5xl xl:text-6xl">
                {data.h1}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-on-dark/78 md:text-lg">
                {data.introAnswer}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#blog-quote-form"
                  className="inline-flex rounded-sm bg-accent px-7 py-4 font-semibold tracking-wide text-white transition-all duration-300 hover:bg-accent-hover"
                >
                  Get My Free Estimate
                </a>
                <a
                  href="#section-grid"
                  className="inline-flex rounded-sm border border-white/20 px-7 py-4 font-semibold tracking-wide text-white transition-all duration-300 hover:bg-white/10"
                >
                  Jump Into the Guide
                </a>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-sm border border-white/10 bg-white/6 px-4 py-4 backdrop-blur-sm">
                  <p className="text-xl font-heading text-white">{data.readTime} min</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-text-on-dark/50">Reading time</p>
                </div>
                <div className="rounded-sm border border-white/10 bg-white/6 px-4 py-4 backdrop-blur-sm">
                  <p className="text-xl font-heading text-white">{data.category}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-text-on-dark/50">Guide type</p>
                </div>
                <div className="rounded-sm border border-white/10 bg-white/6 px-4 py-4 backdrop-blur-sm">
                  <p className="text-xl font-heading text-white">{primaryRelatedServiceName ?? 'Estimate'}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-text-on-dark/50">Best next move</p>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-white/10 bg-white/8 p-6 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-on-dark/50">
                Quick project lens
              </p>
              <div className="mt-5 space-y-4 text-sm text-text-on-dark/72">
                <div className="border-b border-white/10 pb-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-text-on-dark/40">Published</p>
                  <p className="mt-1 text-base font-semibold text-white">{publishedFormatted}</p>
                </div>
                <div className="border-b border-white/10 pb-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-text-on-dark/40">Updated</p>
                  <p className="mt-1 text-base font-semibold text-white">{updatedFormatted}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-text-on-dark/40">In this guide</p>
                  <div className="mt-3 space-y-2">
                    {jumpItems.slice(0, 4).map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex items-center justify-between border-b border-white/8 pb-2 text-sm text-text-on-dark/78 transition-colors duration-200 hover:text-white"
                      >
                        <span>{item.label}</span>
                        <span className="text-accent-light">→</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-bg-primary">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-6 gap-y-2 px-6 py-5 text-xs text-text-muted md:px-10">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
            </svg>
            {data.author}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            Published {publishedFormatted}
          </span>
          {data.lastUpdatedDate !== data.publishedDate && (
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
              </svg>
              Updated {updatedFormatted}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {data.readTime} min read
          </span>
        </div>
      </section>

      <article className="bg-bg-primary py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <div>
              <p className="max-w-3xl text-lg leading-relaxed text-text-body md:text-xl">
                {data.introAnswer}
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {takeaways.map((takeaway) => (
                  <div key={takeaway} className="rounded-sm border border-border bg-white p-5 card-depth">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">Fast takeaway</p>
                    <p className="mt-3 text-sm leading-relaxed text-text-body md:text-base">{takeaway}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <SectionJumpNav heading="In this guide" items={jumpItems} />
              <div className="rounded-sm border border-border bg-bg-secondary p-6 card-depth">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">Need the real number?</p>
                <p className="mt-3 text-lg font-heading text-text-primary">
                  Research is good. A written scope is better.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-body">
                  Use this guide to narrow the project, then send the basics for a real price conversation.
                </p>
                <a
                  href="#blog-quote-form"
                  className="mt-5 inline-flex rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-hover"
                >
                  Get My Free Estimate
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-bg-secondary py-16 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <InfoCardGrid
            eyebrow="Quick Read"
            heading="What this guide covers"
            cards={summaryCards}
          />
        </div>
      </section>

      <div id="section-grid">
        {data.sections.map((section, i) => {
          const Heading = section.level === 'h2' ? 'h2' : 'h3';
          const sectionId = `section-${slugify(section.heading)}`;
          const sectionPoints = extractListItems(section.body, 3);

          return (
            <div key={sectionId}>
              <section className={`${SECTION_BACKGROUNDS[i % SECTION_BACKGROUNDS.length]} py-16 md:py-20`}>
                <div id={sectionId} className="mx-auto max-w-[1200px] scroll-mt-28 px-6 md:px-10">
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
                    <div className="rounded-sm border border-border bg-white p-7 card-depth md:p-8 lg:p-10">
                      <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                          Section {String(i + 1).padStart(2, '0')}
                        </p>
                        <div className="hidden gap-2 text-[11px] uppercase tracking-[0.14em] text-text-muted md:flex">
                          <span>{data.category}</span>
                          <span>•</span>
                          <span>{data.readTime} min read</span>
                        </div>
                      </div>
                      <Heading
                        className={
                          section.level === 'h2'
                            ? 'mt-6 text-2xl font-heading text-text-primary md:text-3xl'
                            : 'mt-6 text-xl font-heading text-text-primary md:text-2xl'
                        }
                      >
                        {section.heading}
                      </Heading>

                      {section.image && (
                        <div className="mt-6 overflow-hidden rounded-sm border border-border card-depth">
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

                      <div
                        className="prose prose-sm md:prose-base mt-6 max-w-none text-text-body leading-relaxed
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

                    <aside className="space-y-4 lg:sticky lg:top-28">
                      <div className="rounded-sm border border-border bg-bg-primary p-5 card-depth">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">Why this matters</p>
                        <div className="mt-4 space-y-3">
                          {sectionPoints.map((point) => (
                            <p key={point} className="text-sm leading-relaxed text-text-body">
                              {point}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-sm border border-border bg-bg-secondary p-5 card-depth">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">Next move</p>
                        <p className="mt-3 text-lg font-heading text-text-primary">
                          Turn this section into a real scope.
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-text-body">
                          If this is the part of the project you are stuck on, skip the guessing and ask for a real estimate.
                        </p>
                        <a
                          href="#blog-quote-form"
                          className="mt-4 inline-flex rounded-sm border border-accent px-4 py-3 text-sm font-semibold text-accent transition-colors duration-200 hover:bg-accent hover:text-white"
                        >
                          Get Estimate
                        </a>
                      </div>
                    </aside>
                  </div>
                </div>
              </section>

              {i % 2 === 1 && i < data.sections.length - 1 && (
                <section className={`${SECTION_BACKGROUNDS[(i + 1) % SECTION_BACKGROUNDS.length]} pb-16 md:pb-20`}>
                  <div className="mx-auto max-w-[1200px] px-6 md:px-10">
                    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                      <div className="rounded-sm border border-border bg-[#1E1A17] p-7 text-white card-depth md:p-8">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-light">Still comparing options?</p>
                        <h3 className="mt-3 text-2xl font-heading leading-tight">
                          Most readers stop here and ask for the real number.
                        </h3>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-on-dark/72 md:text-base">
                          The guide gives you the scope logic. The next step is matching it to your actual rooms, surfaces, timeline, and finish expectations.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                          <a
                            href="#blog-quote-form"
                            className="inline-flex rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-hover"
                          >
                            Get My Free Estimate
                          </a>
                          {primaryRelatedServiceSlug && (
                            <Link
                              href={`/${primaryRelatedServiceSlug}`}
                              className="inline-flex rounded-sm border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                            >
                              See Service Pricing
                            </Link>
                          )}
                        </div>
                      </div>
                      <div className="rounded-sm border border-border bg-white p-7 card-depth md:p-8">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">Helpful next pages</p>
                        <div className="mt-5 space-y-3">
                          {actionLinks.map((link) => (
                            <Link
                              key={`${sectionId}-${link.href}`}
                              href={link.href}
                              className="flex items-start justify-between gap-3 border-b border-border pb-3 transition-colors duration-200 hover:text-accent"
                            >
                              <div>
                                <p className="text-base font-heading text-text-primary">{link.label}</p>
                                {link.description && (
                                  <p className="mt-1 text-sm leading-relaxed text-text-muted">{link.description}</p>
                                )}
                              </div>
                              <span className="mt-1 text-accent">→</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          );
        })}
      </div>

      <section className="bg-bg-secondary py-16 md:py-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <InlineQuotePanel
            id="blog-quote-form"
            eyebrow="Need Pricing Help?"
            heading="Turn this guide into a real project number"
            body="If you are done researching and want a real quote, send the basics here and Red Stag will reply with a practical next step based on your actual project."
            bullets={[
              'Good fit if you are moving from reading to booking.',
              'Use it to turn cost guides into a real scope conversation.',
            ]}
            initialService={primaryRelatedServiceName}
            submitLabel="Get My Free Estimate"
          />
        </div>
      </section>

      {data.faqs.length > 0 && (
        <section id="blog-faq" className="scroll-mt-28 bg-bg-primary pb-16 md:pb-24">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
              <div>
                <p className="section-label">FAQ</p>
                <h2 className="mb-8 text-2xl font-heading text-text-primary md:text-3xl">
                  Frequently Asked Questions
                </h2>
                <FAQAccordion faqs={data.faqs} />
              </div>
              <div className="rounded-sm border border-border bg-bg-secondary p-6 card-depth lg:sticky lg:top-28">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">Ask the project question</p>
                <p className="mt-3 text-lg font-heading text-text-primary">
                  Still missing your answer?
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-body">
                  Send the actual job details and skip the generic internet answer loop.
                </p>
                <a
                  href="#blog-quote-form"
                  className="mt-5 inline-flex rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-hover"
                >
                  Get My Free Estimate
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {relatedLinks.length > 0 && (
        <section className="bg-bg-primary pb-16 md:pb-24">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <RelatedLinks title="Related Resources" links={relatedLinks} />
          </div>
        </section>
      )}

      <CTABanner
        heading="Ready to Transform Your Space?"
        subtitle="We respond within 2 hours. Exact pricing after a free walkthrough."
        ctaText={CTA_PRIMARY}
        ctaHref="#blog-quote-form"
      />
    </>
  );
}
