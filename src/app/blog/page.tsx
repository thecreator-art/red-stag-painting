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
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 pt-6">
        <Breadcrumbs items={[{ label: 'Blog' }]} />
      </div>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="max-w-3xl">
            <p className="section-label text-accent mb-3">Red Stag Blog</p>
            <h1 className="text-3xl md:text-5xl font-heading text-text-primary leading-tight">
              Painting Cost Guides and How-To Articles
            </h1>
            <p className="mt-5 text-lg text-text-body leading-relaxed">
              Straight answers on pricing, prep, timelines, and finish choices for Los Angeles homeowners, landlords, and property managers.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {blogIndex.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-sm border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {post.category}
                </p>
                <h2 className="mt-2 text-xl font-heading text-text-primary">
                  {post.title}
                </h2>
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
