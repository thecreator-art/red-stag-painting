import QuoteForm from '@/components/ui/QuoteForm';

interface InlineQuotePanelProps {
  id?: string;
  eyebrow: string;
  heading: string;
  body: string;
  bullets?: string[];
  initialService?: string;
  submitLabel?: string;
}

export default function InlineQuotePanel({
  id,
  eyebrow,
  heading,
  body,
  bullets = [],
  initialService,
  submitLabel = 'Get My Free Estimate',
}: InlineQuotePanelProps) {
  return (
    <div id={id} className="mx-auto max-w-5xl scroll-mt-32">
      <div className="grid gap-8 rounded-sm border border-border bg-white p-8 card-depth lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
        <div className="max-w-xl">
          <div className="brand-line mb-4" />
          <p className="section-label text-accent mb-3">{eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-heading text-text-primary leading-tight">
            {heading}
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-body leading-relaxed">
            {body}
          </p>
          {bullets.length > 0 && (
            <div className="mt-8 space-y-3 text-sm text-text-body">
              {bullets.map((bullet) => (
                <p key={bullet}>{bullet}</p>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-sm border border-border bg-bg-primary p-6">
          <QuoteForm
            variant="full"
            initialService={initialService}
            submitLabel={submitLabel}
          />
        </div>
      </div>
    </div>
  );
}
