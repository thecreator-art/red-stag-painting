'use client';

import { useState } from 'react';
import type { StainTypeSelectorFeature as StainTypeSelectorFeatureData } from '@/data/types';

interface StainTypeSelectorFeatureProps {
  data: StainTypeSelectorFeatureData;
}

export default function StainTypeSelectorFeature({ data }: StainTypeSelectorFeatureProps) {
  const [selected, setSelected] = useState(data.options[0]);

  return (
    <div className="rounded-sm border border-border bg-white p-8 card-depth">
      <p className="section-label text-accent mb-3">{data.title}</p>
      <h2 className="text-3xl md:text-4xl font-heading text-text-primary leading-tight">{data.subtitle}</h2>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {data.options.map((option) => (
          <button
            key={option.title}
            type="button"
            onClick={() => setSelected(option)}
            className={`rounded-sm border p-5 text-left transition-colors ${
              selected.title === option.title
                ? 'border-accent bg-[#FBF2EE]'
                : 'border-border bg-bg-primary hover:border-accent/40'
            }`}
          >
            <div className={`h-4 rounded-full bg-gradient-to-r ${option.swatch}`} />
            <h3 className="mt-4 text-xl font-heading text-text-primary">{option.title}</h3>
            <p className="mt-2 text-sm text-text-body">{option.description}</p>
            <p className="mt-3 text-sm text-text-muted">{option.lifespan}</p>
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-sm bg-bg-secondary p-6">
        <h3 className="text-2xl font-heading text-text-primary">{selected.title}</h3>
        <p className="mt-3 text-base text-text-body">{selected.protection}</p>
        <p className="mt-3 text-sm text-text-muted">{selected.lifespan}</p>
      </div>
    </div>
  );
}
