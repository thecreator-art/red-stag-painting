import type { CeilingTypesFeature as CeilingTypesFeatureData } from '@/data/types';

interface CeilingTypesFeatureProps {
  data: CeilingTypesFeatureData;
}

function CeilingIcon() {
  return (
    <svg className="h-10 w-10 text-accent" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M8 30h32" stroke="currentColor" strokeWidth="2" />
      <path d="M12 22c5-6 19-6 24 0" stroke="currentColor" strokeWidth="2" />
      <path d="M16 18h16" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function CeilingTypesFeature({ data }: CeilingTypesFeatureProps) {
  return (
    <div className="rounded-sm border border-border bg-white p-8 card-depth">
      <p className="section-label text-accent mb-3">{data.title}</p>
      <h2 className="text-3xl md:text-4xl font-heading text-text-primary leading-tight">{data.subtitle}</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.types.map((type) => (
          <article key={type.title} className="rounded-sm border border-border bg-bg-primary p-5">
            <CeilingIcon />
            <h3 className="mt-4 text-xl font-heading text-text-primary">{type.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-body">{type.description}</p>
            <p className="mt-4 text-sm font-semibold text-accent">{type.price}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
