import type { ColorDirectionGuideFeature as ColorDirectionGuideFeatureData } from '@/data/types';

interface ColorDirectionGuideFeatureProps {
  data: ColorDirectionGuideFeatureData;
}

const gradientMap = {
  light: 'from-[#2C2825] to-[#F4EFE9]',
  dark: 'from-[#F4EFE9] to-[#2C2825]',
} as const;

export default function ColorDirectionGuideFeature({ data }: ColorDirectionGuideFeatureProps) {
  return (
    <div className="rounded-sm border border-border bg-white p-8 card-depth">
      <p className="section-label text-accent mb-3">{data.title}</p>
      <h2 className="text-3xl md:text-4xl font-heading text-text-primary leading-tight">{data.subtitle}</h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {data.directions.map((direction) => (
          <article key={direction.title} className="rounded-sm border border-border bg-bg-primary p-6">
            <div className={`h-4 rounded-full bg-gradient-to-r ${gradientMap[direction.gradient]}`} />
            <h3 className="mt-5 text-2xl font-heading text-text-primary">{direction.title}</h3>
            <p className="mt-3 text-lg font-semibold text-accent">{direction.price}</p>
            <ul className="mt-5 space-y-3 text-sm text-text-body">
              {direction.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
