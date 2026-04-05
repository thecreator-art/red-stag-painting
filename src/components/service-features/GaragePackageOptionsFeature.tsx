import type { GaragePackageOptionsFeature as GaragePackageOptionsFeatureData } from '@/data/types';

interface GaragePackageOptionsFeatureProps {
  data: GaragePackageOptionsFeatureData;
}

export default function GaragePackageOptionsFeature({ data }: GaragePackageOptionsFeatureProps) {
  return (
    <div className="rounded-sm border border-border bg-white p-8 card-depth">
      <p className="section-label text-accent mb-3">{data.title}</p>
      <h2 className="text-3xl md:text-4xl font-heading text-text-primary leading-tight">{data.subtitle}</h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {data.options.map((option) => (
          <article
            key={option.title}
            className={`rounded-sm border p-6 ${
              option.recommended ? 'border-accent bg-[#FBF2EE]' : 'border-border bg-bg-primary'
            }`}
          >
            <h3 className="text-2xl font-heading text-text-primary">{option.title}</h3>
            <p className="mt-4 text-4xl font-heading text-accent">{option.price}</p>
            <ul className="mt-5 space-y-3 text-sm text-text-body">
              {option.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
