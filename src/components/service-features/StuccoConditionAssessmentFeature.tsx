import type { StuccoConditionAssessmentFeature as StuccoConditionAssessmentFeatureData } from '@/data/types';

interface StuccoConditionAssessmentFeatureProps {
  data: StuccoConditionAssessmentFeatureData;
}

const accentClass = {
  green: 'border-l-4 border-l-[#4D8E5C]',
  amber: 'border-l-4 border-l-[#C88A2B]',
  red: 'border-l-4 border-l-[#B84233]',
} as const;

export default function StuccoConditionAssessmentFeature({ data }: StuccoConditionAssessmentFeatureProps) {
  return (
    <div className="rounded-sm border border-border bg-white p-8 card-depth">
      <p className="section-label text-accent mb-3">{data.title}</p>
      <h2 className="text-3xl md:text-4xl font-heading text-text-primary leading-tight">{data.subtitle}</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {data.conditions.map((condition) => (
          <article key={condition.title} className={`rounded-sm bg-bg-primary p-6 ${accentClass[condition.accent]}`}>
            <h3 className="text-2xl font-heading text-text-primary">{condition.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-body">{condition.description}</p>
            <ul className="mt-5 space-y-3 text-sm text-text-body">
              {condition.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
