interface InfoCard {
  title: string;
  body: string;
  value?: string;
}

interface InfoCardGridProps {
  eyebrow?: string;
  heading: string;
  cards: InfoCard[];
}

export default function InfoCardGrid({ eyebrow, heading, cards }: InfoCardGridProps) {
  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="max-w-3xl">
        <div className="brand-line mb-4" />
        {eyebrow && <p className="section-label text-accent mb-3">{eyebrow}</p>}
        <h2 className="text-3xl md:text-5xl font-heading text-text-primary leading-tight">
          {heading}
        </h2>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className="rounded-sm border border-border bg-white p-6 card-depth">
            {card.value && (
              <p className="text-2xl font-heading text-accent leading-none">
                {card.value}
              </p>
            )}
            <h3 className={`font-heading text-text-primary ${card.value ? 'mt-4 text-xl' : 'text-xl'}`}>
              {card.title}
            </h3>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-text-body">
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
