import type { Metadata } from 'next';

import Breadcrumbs from '@/components/shared/Breadcrumbs';
import HorizontalGallery from '@/components/sections/HorizontalGallery';
import Reviews from '@/components/sections/Reviews';
import Process from '@/components/sections/Process';
import ContactForm from '@/components/sections/ContactForm';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Work | Red Stag Painting',
  description: 'Before-and-after painting references, client reviews, and the process Red Stag Painting uses across Los Angeles homes.',
  alternates: {
    canonical: `${SITE_URL}/our-work`,
  },
};

export default function OurWorkPage() {
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 pt-6 md:px-10">
        <Breadcrumbs items={[{ label: 'Our Work' }]} />
      </div>

      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div className="max-w-3xl">
              <p className="section-label text-accent mb-3">Our Work</p>
              <h1 className="text-3xl md:text-5xl font-heading text-text-primary leading-tight">
                See the finish standard before you book the walkthrough
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-text-body">
                This page is here to show how Red Stag approaches prep, finish quality, and the kind of visual lift homeowners are actually paying for.
              </p>
            </div>
            <div className="rounded-sm border border-border bg-white p-6 card-depth">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">What you will find here</p>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-text-body">
                <p>Reference before-and-after imagery to set finish expectations.</p>
                <p>Real client reactions to the kind of work Red Stag does most often.</p>
                <p>A clear four-step process so the project feels organized before day one.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HorizontalGallery />
      <Reviews />
      <Process />
      <ContactForm />
    </>
  );
}
