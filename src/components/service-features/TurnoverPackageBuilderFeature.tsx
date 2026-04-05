'use client';

import { useMemo, useState } from 'react';
import type { TurnoverPackageBuilderFeature as TurnoverPackageBuilderFeatureData } from '@/data/types';

interface TurnoverPackageBuilderFeatureProps {
  data: TurnoverPackageBuilderFeatureData;
}

export default function TurnoverPackageBuilderFeature({ data }: TurnoverPackageBuilderFeatureProps) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(label: string) {
    setSelected((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    );
  }

  const totals = useMemo(() => {
    return data.items.reduce(
      (acc, item) => {
        if (!selected.includes(item.label)) return acc;
        return { min: acc.min + item.min, max: acc.max + item.max };
      },
      { min: 0, max: 0 },
    );
  }, [data.items, selected]);

  return (
    <div className="rounded-sm border border-border bg-white p-8 card-depth">
      <p className="section-label text-accent mb-3">{data.title}</p>
      <h2 className="text-3xl md:text-4xl font-heading text-text-primary leading-tight">{data.subtitle}</h2>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          {data.items.map((item) => {
            const checked = selected.includes(item.label);
            return (
              <label
                key={item.label}
                className={`flex cursor-pointer items-start gap-4 rounded-sm border p-4 transition-colors ${
                  checked ? 'border-accent bg-[#FBF2EE]' : 'border-border bg-bg-primary'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(item.label)}
                  className="mt-1 h-4 w-4 accent-[#B84233]"
                />
                <span className="block">
                  <span className="block text-sm font-semibold text-text-primary">{item.label}</span>
                  <span className="mt-1 block text-sm text-text-body">
                    ${item.min.toLocaleString()} - ${item.max.toLocaleString()}
                  </span>
                </span>
              </label>
            );
          })}
        </div>

        <div className="rounded-sm bg-bg-secondary p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">Running Total</p>
          <p className="mt-4 text-4xl font-heading text-accent">
            ${totals.min.toLocaleString()} - ${totals.max.toLocaleString()}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text-body">
            Pick the pieces you want included and use the range as a planning number before the walkthrough.
          </p>
        </div>
      </div>
    </div>
  );
}
