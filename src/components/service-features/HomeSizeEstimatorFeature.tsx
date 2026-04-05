'use client';

import { useState } from 'react';
import type { HomeSizeEstimatorFeature as HomeSizeEstimatorFeatureData } from '@/data/types';

interface HomeSizeEstimatorFeatureProps {
  data: HomeSizeEstimatorFeatureData;
}

function HouseIcon({ tall }: { tall?: boolean }) {
  return (
    <svg className="h-10 w-10 text-accent" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M8 22.5L24 10l16 12.5v14.5a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V22.5Z" stroke="currentColor" strokeWidth="2" />
      <path d={tall ? 'M18 38V20h12v18' : 'M18 38V26h12v12'} stroke="currentColor" strokeWidth="2" />
      <path d="M21 28h6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function HomeSizeEstimatorFeature({ data }: HomeSizeEstimatorFeatureProps) {
  const [selected, setSelected] = useState(data.options[0]);

  return (
    <div className="rounded-sm border border-border bg-white p-8 card-depth">
      <p className="section-label text-accent mb-3">{data.title}</p>
      <h2 className="text-3xl md:text-4xl font-heading text-text-primary leading-tight">{data.subtitle}</h2>
      <div className="mt-8 grid gap-4 lg:grid-cols-4">
        {data.options.map((option, index) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setSelected(option)}
            className={`rounded-sm border p-5 text-left transition-all ${
              selected.id === option.id
                ? 'border-accent bg-[#FBF2EE] shadow-sm'
                : 'border-border bg-bg-primary hover:border-accent/40'
            }`}
          >
            <HouseIcon tall={index > 0} />
            <h3 className="mt-4 text-lg font-heading text-text-primary">{option.title}</h3>
            <p className="mt-2 text-sm text-text-body">{option.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-sm bg-bg-secondary p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">Selected Tier</p>
            <h3 className="mt-3 text-2xl font-heading text-text-primary">{selected.title}</h3>
            <p className="mt-3 text-4xl font-heading text-accent">
              ${selected.priceMin.toLocaleString()} - ${selected.priceMax.toLocaleString()}
            </p>
            <p className="mt-3 text-sm text-text-body">Typical timeline: {selected.timeline}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">What is included</p>
            <ul className="mt-3 space-y-3 text-sm text-text-body">
              {selected.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
