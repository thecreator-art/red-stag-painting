import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 text-xs text-text-muted">
        <li>
          <Link
            href="/"
            className="text-accent hover:text-accent-hover transition-colors duration-200"
          >
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span aria-hidden="true">&gt;</span>
            {item.href && i < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-accent hover:text-accent-hover transition-colors duration-200"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current={i === items.length - 1 ? 'page' : undefined}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
