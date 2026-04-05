import type { TrimChecklistFeature as TrimChecklistFeatureData } from '@/data/types';

interface TrimChecklistFeatureProps {
  data: TrimChecklistFeatureData;
}

export default function TrimChecklistFeature({ data }: TrimChecklistFeatureProps) {
  return (
    <div className="rounded-sm border border-border bg-white p-8 card-depth">
      <p className="section-label text-accent mb-3">{data.title}</p>
      <h2 className="text-3xl md:text-4xl font-heading text-text-primary leading-tight">{data.subtitle}</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-sm border border-border bg-bg-primary p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.29 7.355a1 1 0 0 1-1.42 0L3.29 9.35a1 1 0 0 1 1.42-1.408l4 4.03 6.58-6.64a1 1 0 0 1 1.414-.006Z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="text-sm font-semibold text-text-primary">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
