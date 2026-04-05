import type { PaintingVsReplacingFeature as PaintingVsReplacingFeatureData } from '@/data/types';

interface PaintingVsReplacingFeatureProps {
  data: PaintingVsReplacingFeatureData;
}

export default function PaintingVsReplacingFeature({ data }: PaintingVsReplacingFeatureProps) {
  return (
    <div className="rounded-sm border border-border bg-white p-8 card-depth">
      <p className="section-label text-accent mb-3">{data.title}</p>
      <h2 className="text-3xl md:text-4xl font-heading text-text-primary leading-tight">{data.subtitle}</h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {data.options.map((option) => (
          <article
            key={option.title}
            className={`rounded-sm border p-6 ${
              option.highlighted
                ? 'border-accent bg-[#FBF2EE] shadow-sm'
                : option.muted
                  ? 'border-[#DDD6D0] bg-[#F4F1EE] text-text-muted'
                  : 'border-border bg-bg-primary'
            }`}
          >
            <h3 className="text-2xl font-heading text-text-primary">{option.title}</h3>
            <p className="mt-4 text-4xl font-heading text-accent">{option.price}</p>
            <p className="mt-3 text-sm text-text-body">Timeline: {option.timeline}</p>
            <ul className="mt-6 space-y-3 text-sm text-text-body">
              {option.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
