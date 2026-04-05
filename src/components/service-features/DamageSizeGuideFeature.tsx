import type { DamageSizeGuideFeature as DamageSizeGuideFeatureData } from '@/data/types';

interface DamageSizeGuideFeatureProps {
  data: DamageSizeGuideFeatureData;
}

const sizeClassMap = {
  small: 'h-8 w-8',
  medium: 'h-12 w-12',
  large: 'h-16 w-16',
} as const;

export default function DamageSizeGuideFeature({ data }: DamageSizeGuideFeatureProps) {
  return (
    <div className="rounded-sm border border-border bg-white p-8 card-depth">
      <p className="section-label text-accent mb-3">{data.title}</p>
      <h2 className="text-3xl md:text-4xl font-heading text-text-primary leading-tight">{data.subtitle}</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {data.levels.map((level) => (
          <article key={level.title} className="rounded-sm border border-border bg-bg-primary p-6 text-center">
            <div className={`mx-auto rounded-full bg-accent/15 ${sizeClassMap[level.size]}`} />
            <h3 className="mt-5 text-2xl font-heading text-text-primary">{level.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-body">{level.description}</p>
            <p className="mt-5 text-xl font-heading text-accent">{level.price}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
