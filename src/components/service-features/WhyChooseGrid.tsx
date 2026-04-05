import type { WhyChooseCard } from '@/data/types';

interface WhyChooseGridProps {
  cards: WhyChooseCard[];
}

export default function WhyChooseGrid({ cards }: WhyChooseGridProps) {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="max-w-2xl">
        <div className="brand-line mb-4" />
        <p className="section-label text-accent mb-3">Why Red Stag</p>
        <h2 className="text-3xl md:text-5xl font-heading text-text-primary leading-tight">
          Why LA homeowners choose Red Stag
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className="rounded-sm border border-border bg-white p-6 card-depth">
            <p className="text-3xl font-heading text-accent">{card.stat}</p>
            <h3 className="mt-4 text-xl font-heading text-text-primary">{card.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-text-body">{card.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
