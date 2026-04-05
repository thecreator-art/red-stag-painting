import type { AsbestosNoticeFeature as AsbestosNoticeFeatureData } from '@/data/types';

interface AsbestosNoticeFeatureProps {
  data: AsbestosNoticeFeatureData;
}

export default function AsbestosNoticeFeature({ data }: AsbestosNoticeFeatureProps) {
  return (
    <div className="rounded-sm border border-border bg-[#FFF8F2] p-8 card-depth">
      <div className="border-l-4 border-accent pl-5">
        <p className="section-label text-accent mb-3">{data.title}</p>
        <h2 className="text-3xl md:text-4xl font-heading text-text-primary leading-tight">{data.heading}</h2>
        <p className="mt-4 text-base md:text-lg text-text-body leading-relaxed">{data.subtitle}</p>
      </div>
      <ul className="mt-8 space-y-3 text-sm md:text-base text-text-body">
        {data.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}
