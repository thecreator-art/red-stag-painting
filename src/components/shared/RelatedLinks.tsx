import Link from 'next/link';

interface RelatedLink {
  label: string;
  href: string;
  description?: string;
}

interface RelatedLinksProps {
  title: string;
  links: RelatedLink[];
}

export default function RelatedLinks({ title, links }: RelatedLinksProps) {
  return (
    <div>
      <h3 className="text-xl font-heading text-text-primary mb-6">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className="group card-depth rounded-sm border border-border bg-white p-5 flex items-start justify-between gap-3 transition-all duration-300 hover:border-accent/20 hover:-translate-y-0.5"
          >
            <div className="min-w-0">
              <span className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors duration-200">
                {link.label}
              </span>
              {link.description && (
                <p className="mt-1 text-xs text-text-muted leading-relaxed line-clamp-2">
                  {link.description}
                </p>
              )}
            </div>
            <svg
              className="shrink-0 w-4 h-4 mt-0.5 text-text-muted group-hover:text-accent transition-all duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
