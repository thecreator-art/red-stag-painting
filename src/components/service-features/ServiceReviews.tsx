import type { ServiceReview } from '@/data/types';

interface ServiceReviewsProps {
  reviews: ServiceReview[];
}

export default function ServiceReviews({ reviews }: ServiceReviewsProps) {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="max-w-2xl">
        <div className="brand-line mb-4" />
        <p className="section-label text-accent mb-3">What Homeowners Say</p>
        <h2 className="text-3xl md:text-5xl font-heading text-text-primary leading-tight">
          What homeowners say after the crew leaves
        </h2>
        <p className="mt-4 text-base md:text-lg text-text-body leading-relaxed">
          Three recent notes from homeowners who hired Red Stag for this exact scope.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <article
            key={`${review.reviewer}-${review.city}`}
            className="rounded-sm border border-border bg-white p-6 card-depth"
          >
            <div className="mb-5 border-l-4 border-accent pl-4">
              <p className="text-base italic leading-relaxed text-text-body">
                &ldquo;{review.quote}&rdquo;
              </p>
            </div>
            <p className="font-semibold text-text-primary">{review.reviewer}</p>
            <p className="mt-1 text-sm text-text-muted">{review.city}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
