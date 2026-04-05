interface PricingTier {
  label: string;
  min: number;
  max: number;
  plus?: boolean;
}

interface PricingTableProps {
  tiers: PricingTier[];
  title?: string;
  pricePerSqFt?: string;
}

function formatPrice(n: number): string {
  return '$' + n.toLocaleString();
}

export default function PricingTable({ tiers, title, pricePerSqFt }: PricingTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E8E3DE] bg-white p-8 shadow-sm">
      {(title || pricePerSqFt) && (
        <div className="border-b border-[#E8E3DE] px-1 pb-5">
          {title && (
            <h3 className="text-xl font-heading text-text-primary">{title}</h3>
          )}
          {pricePerSqFt && (
            <p className="mt-2 text-sm text-text-muted">
              Estimated at {pricePerSqFt} per sq ft
            </p>
          )}
        </div>
      )}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#E8E3DE] bg-[#F7F2EE]">
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
              Service
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
              Price Range
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E8E3DE]">
          {tiers.map((tier, i) => (
            <tr key={i} className="transition-colors duration-150 hover:bg-[#FDFCFA]">
              <td className="px-6 py-4 text-text-body">{tier.label}</td>
              <td className="px-6 py-4 text-right font-semibold text-accent">
                {formatPrice(tier.min)} &ndash; {formatPrice(tier.max)}
                {tier.plus && '+'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
