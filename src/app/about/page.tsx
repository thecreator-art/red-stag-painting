import type { Metadata } from 'next';
import Script from 'next/script';

import Breadcrumbs from '@/components/shared/Breadcrumbs';
import MeetTheOwner from '@/components/sections/MeetTheOwner';
import RedStagDifference from '@/components/sections/RedStagDifference';
import Guarantee from '@/components/sections/Guarantee';
import BrandStatement from '@/components/sections/BrandStatement';
import Reviews from '@/components/sections/Reviews';
import ContactForm from '@/components/sections/ContactForm';
import { SITE_URL } from '@/lib/constants';
import { generateAboutPageSchema, generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'About Red Stag Painting | Los Angeles House Painting Company',
  description:
    'Owner-led residential painting in Los Angeles since 2011. Meet Israel Aquino, the Red Stag crews, and the standards behind every project.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

const ABOUT_SCHEMA = [
  ...generateAboutPageSchema(),
  generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'About', url: `${SITE_URL}/about` },
  ]),
];

export default function AboutPage() {
  return (
    <>
      <Script
        id="ld-about"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_SCHEMA) }}
      />
      <div className="mx-auto max-w-[1200px] px-6 pt-6 md:px-10">
        <Breadcrumbs items={[{ label: 'About' }]} />
      </div>

      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div className="max-w-3xl">
              <p className="section-label text-accent mb-3">About Red Stag</p>
              <h1 className="text-3xl md:text-5xl font-heading text-text-primary leading-tight">
                A Los Angeles painting company built around clean work and clear communication
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-text-body">
                This is the page for homeowners who want to know who is actually showing up, how the work is managed, and what standards Red Stag holds before the job starts.
              </p>
            </div>
            <div className="rounded-sm border border-border bg-white p-6 card-depth">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">What matters here</p>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-text-body">
                <p>Owner-led walkthroughs and a tighter finish standard than the average painter bid.</p>
                <p>Written warranty protection, premium materials, and crews that respect occupied homes.</p>
                <p>The difference between a cheap repaint and a job homeowners are proud to show off.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MeetTheOwner />
      <RedStagDifference />
      <Guarantee />
      <BrandStatement />
      <Reviews />
      <ContactForm />
    </>
  );
}
