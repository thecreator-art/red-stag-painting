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
    <div className="card-depth rounded-sm border border-border bg-white overflow-hidden">
      {(title || pricePerSqFt) && (
        <div className="px-6 py-4 border-b border-border">
          {title && (
            <h3 className="text-lg font-heading text-text-primary">{title}</h3>
          )}
          {pricePerSqFt && (
            <p className="text-xs text-text-muted mt-1">
              Estimated at {pricePerSqFt} per sq ft
            </p>
          )}
        </div>
      )}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-bg-secondary/50">
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
              Service
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-text-muted">
              Price Range
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {tiers.map((tier, i) => (
            <tr key={i} className="hover:bg-bg-secondary/30 transition-colors duration-150">
              <td className="px-6 py-4 text-text-body">{tier.label}</td>
              <td className="px-6 py-4 text-right font-bold text-accent">
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
