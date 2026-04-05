import type { WallpaperLayerEstimateFeature as WallpaperLayerEstimateFeatureData } from '@/data/types';

interface WallpaperLayerEstimateFeatureProps {
  data: WallpaperLayerEstimateFeatureData;
}

export default function WallpaperLayerEstimateFeature({ data }: WallpaperLayerEstimateFeatureProps) {
  return (
    <div className="rounded-sm border border-border bg-white p-8 card-depth">
      <p className="section-label text-accent mb-3">{data.title}</p>
      <h2 className="text-3xl md:text-4xl font-heading text-text-primary leading-tight">{data.subtitle}</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {data.layers.map((layer) => (
          <article key={layer.title} className="rounded-sm border border-border bg-bg-primary p-6">
            <h3 className="text-2xl font-heading text-text-primary">{layer.title}</h3>
            <p className="mt-3 text-lg font-semibold text-accent">{layer.price}</p>
            <p className="mt-3 text-sm leading-relaxed text-text-body">{layer.description}</p>
            <p className="mt-4 text-sm text-text-muted">{layer.timeline}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
