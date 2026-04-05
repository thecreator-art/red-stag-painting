interface JumpItem {
  id: string;
  label: string;
}

interface SectionJumpNavProps {
  heading?: string;
  items: JumpItem[];
}

export default function SectionJumpNav({
  heading = 'Jump to',
  items,
}: SectionJumpNavProps) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-sm border border-border bg-white p-6 card-depth">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
        {heading}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="inline-flex rounded-sm border border-border px-3 py-2 text-sm font-semibold text-text-primary transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
