'use client';

import { useMemo, useState } from 'react';
import type { RoomCostCalculatorFeature as RoomCostCalculatorFeatureData } from '@/data/types';

interface RoomCostCalculatorFeatureProps {
  data: RoomCostCalculatorFeatureData;
}

export default function RoomCostCalculatorFeature({ data }: RoomCostCalculatorFeatureProps) {
  const [rooms, setRooms] = useState(data.roomOptions[2] ?? data.roomOptions[0]);
  const [height, setHeight] = useState(data.heightOptions[0]?.value ?? '');

  const selectedHeight = data.heightOptions.find((option) => option.value === height) ?? data.heightOptions[0];
  const estimate = useMemo(() => {
    const min = Math.round(data.baseMin * rooms * selectedHeight.multiplier);
    const max = Math.round(data.baseMax * rooms * selectedHeight.multiplier);
    return { min, max };
  }, [data.baseMax, data.baseMin, rooms, selectedHeight]);

  return (
    <div className="rounded-sm border border-border bg-white p-8 card-depth">
      <p className="section-label text-accent mb-3">{data.title}</p>
      <h2 className="text-3xl md:text-4xl font-heading text-text-primary leading-tight">{data.subtitle}</h2>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-text-primary">Room Count</label>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {data.roomOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRooms(option)}
                  className={`rounded-sm border px-4 py-3 text-sm font-semibold transition-colors ${
                    rooms === option
                      ? 'border-accent bg-[#FBF2EE] text-accent'
                      : 'border-border bg-bg-primary text-text-body hover:border-accent/40'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-text-primary">Ceiling Height</label>
            <div className="mt-3 grid gap-3">
              {data.heightOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setHeight(option.value)}
                  className={`rounded-sm border px-4 py-4 text-left transition-colors ${
                    height === option.value
                      ? 'border-accent bg-[#FBF2EE]'
                      : 'border-border bg-bg-primary hover:border-accent/40'
                  }`}
                >
                  <p className="font-semibold text-text-primary">{option.label}</p>
                  <p className="mt-1 text-sm text-text-muted">Multiplier {option.multiplier.toFixed(2)}x</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-sm bg-bg-secondary p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">Instant Range</p>
          <p className="mt-4 text-4xl font-heading text-accent">
            ${estimate.min.toLocaleString()} - ${estimate.max.toLocaleString()}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text-body">
            Based on {rooms} room{rooms === 1 ? '' : 's'} with {selectedHeight.label.toLowerCase()}.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-text-body">
            <li>Includes prep, patching, and two finish coats.</li>
            <li>Higher-end rooms with heavy trim or dramatic color changes run above this range.</li>
            <li>Use the estimate as a planning number before the walkthrough.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
