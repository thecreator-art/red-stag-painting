'use client';

import AnimatedCounter from '@/components/ui/AnimatedCounter';

const stats = [
  { number: '500+', label: 'LA Homes Painted' },
  { number: '4.9', label: 'Star Rating' },
  { number: '14', label: 'Years in Business' },
  { number: '20+', label: 'Neighborhoods Served' },
];

export default function TrustStrip() {
  return (
    <section id="trust" className="bg-bg-dark py-10 md:py-14 relative overflow-hidden bg-grain">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 relative z-10">
        <div className="flex flex-wrap justify-between gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex-1 min-w-[140px] text-center">
              <p className="text-3xl md:text-4xl font-heading text-accent leading-none">
                <AnimatedCounter target={stat.number} />
              </p>
              <p className="mt-2 text-xs md:text-sm tracking-wider uppercase text-text-on-dark/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
