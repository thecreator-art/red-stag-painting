import Link from 'next/link';
import type { Metadata } from 'next';

import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { CITIES, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Areas We Serve | Red Stag Painting',
  description: 'House painting service areas across Greater Los Angeles.',
  alternates: {
    canonical: `${SITE_URL}/areas`,
  },
};

export default function AreasIndexPage() {
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 pt-6">
        <Breadcrumbs items={[{ label: 'Areas We Serve' }]} />
      </div>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="max-w-3xl">
            <p className="section-label text-accent mb-3">Service Area</p>
            <h1 className="text-3xl md:text-5xl font-heading text-text-primary leading-tight">
              Areas We Serve Across Greater Los Angeles
            </h1>
            <p className="mt-5 text-lg text-text-body leading-relaxed">
              Neighborhood-specific pricing and project guidance for the cities and communities where Red Stag Painting works every week.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/areas/${city.slug}`}
                className="rounded-sm border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30"
              >
                <h2 className="text-lg font-heading text-text-primary">
                  {city.name}
                </h2>
                <p className="mt-2 text-sm text-text-muted">
                  View city-specific painting services and pricing.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
