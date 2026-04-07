import type { Metadata } from 'next';

import Breadcrumbs from '@/components/shared/Breadcrumbs';
import ContactForm from '@/components/sections/ContactForm';
import ServiceArea from '@/components/sections/ServiceArea';
import FAQ from '@/components/sections/FAQ';
import { PHONE_NUMBER, EMAIL, RESPONSE_TIME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Red Stag Painting',
  description: 'Request a free estimate from Red Stag Painting. Call, email, or send the project details for Los Angeles painting work.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-6 pt-6 md:px-10">
        <Breadcrumbs items={[{ label: 'Contact' }]} />
      </div>

      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div className="max-w-3xl">
              <p className="section-label text-accent mb-3">Contact</p>
              <h1 className="text-3xl md:text-5xl font-heading text-text-primary leading-tight">
                Start the quote with the page built for it
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-text-body">
                Use this page when you are ready to stop comparing tabs and get a real next step for the job, timeline, and finish standard you actually want.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-sm border border-border bg-white p-5 card-depth">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">Call</p>
                <p className="mt-2 text-lg font-heading text-text-primary">{PHONE_NUMBER}</p>
              </div>
              <div className="rounded-sm border border-border bg-white p-5 card-depth">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">Email</p>
                <p className="mt-2 text-base font-semibold text-text-primary break-all">{EMAIL}</p>
              </div>
              <div className="rounded-sm border border-border bg-white p-5 card-depth">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">Response time</p>
                <p className="mt-2 text-lg font-heading text-text-primary">{RESPONSE_TIME}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
      <ServiceArea />
      <FAQ />
    </>
  );
}
