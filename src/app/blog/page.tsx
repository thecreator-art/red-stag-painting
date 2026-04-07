import Link from 'next/link';
import type { Metadata } from 'next';

import { blogIndex } from '@/data/blog';
import { SITE_URL } from '@/lib/constants';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Painting Blog Los Angeles | Red Stag Painting',
  description: 'Cost guides and how-to articles for Los Angeles painting projects.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default function BlogIndexPage() {
  const featuredPosts = blogIndex.slice(0, 3);

  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 pt-6">
        <Breadcrumbs items={[{ label: 'Blog' }]} />
      </div>

      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div className="max-w-3xl">
              <p className="section-label text-accent mb-3">Red Stag Blog</p>
              <h1 className="text-3xl md:text-5xl font-heading text-text-primary leading-tight">
                Painting Cost Guides and How-To Articles
              </h1>
              <p className="mt-5 text-lg text-text-body leading-relaxed">
                Straight answers on pricing, prep, timelines, and finish choices for Los Angeles homeowners, landlords, and property managers.
              </p>
            </div>
            <div className="rounded-sm border border-border bg-white p-6 card-depth">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">Why this page matters</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div>
                  <p className="text-2xl font-heading text-accent">{blogIndex.length}</p>
                  <p className="mt-1 text-sm text-text-body">Guides built to answer cost, prep, and timing questions fast.</p>
                </div>
                <div>
                  <p className="text-2xl font-heading text-accent">30</p>
                  <p className="mt-1 text-sm text-text-body">Los Angeles-focused topics instead of generic national averages.</p>
                </div>
                <div>
                  <p className="text-2xl font-heading text-accent">1 next step</p>
                  <p className="mt-1 text-sm text-text-body">Read the guide, then turn it into a real estimate request.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-sm border border-border bg-white p-7 card-depth transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">Featured {post.category}</p>
                <h2 className="mt-3 text-2xl font-heading text-text-primary leading-snug">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-text-body">
                  Built to help homeowners make a pricing decision faster, with a cleaner next step than another open tab.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-primary py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-label text-accent mb-3">All Articles</p>
              <h2 className="text-2xl md:text-4xl font-heading text-text-primary leading-tight">
                Browse by the question you are already asking
              </h2>
            </div>
            <p className="max-w-xl text-sm md:text-base leading-relaxed text-text-body">
              These are meant to move you from research into a real scope, not leave you reading another wall of generic contractor copy.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {blogIndex.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-sm border border-border bg-white p-6 card-depth transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {post.category}
                </p>
                <h2 className="mt-2 text-xl font-heading text-text-primary">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-body">
                  Straight pricing context, planning guidance, and a faster path to the next decision.
                </p>
                <p className="mt-3 text-sm text-text-muted">
                  Published {new Date(post.publishedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
