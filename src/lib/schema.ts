import type { FAQEntry } from '@/data/types';
import { PHONE_NUMBER, EMAIL, SITE_URL, FAQ_DATA, CITIES } from '@/lib/constants';

// ─── 1. LocalBusiness Schema ────────────────────────────────────────────────

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HousePainter',
    name: 'Red Stag Painting',
    telephone: PHONE_NUMBER,
    email: EMAIL,
    url: SITE_URL,
    areaServed: [
      { '@type': 'City', name: 'Los Angeles', sameAs: 'https://en.wikipedia.org/wiki/Los_Angeles' },
      ...CITIES.map((city) => ({ '@type': 'City' as const, name: city.name })),
    ],
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '07:00',
      closes: '18:00',
    },
  };
}

// ─── 2. FAQPage Schema ─────────────────────────────────────────────────────

export function generateFAQSchema(faqs?: FAQEntry[]) {
  const items = faqs ?? FAQ_DATA;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// ─── 3. Service Schema ──────────────────────────────────────────────────────

export function generateServiceSchema(options: {
  name: string;
  description: string;
  slug: string;
  areaServed?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: options.name,
    provider: {
      '@type': 'HousePainter',
      name: 'Red Stag Painting',
      telephone: PHONE_NUMBER,
      email: EMAIL,
      url: SITE_URL,
      priceRange: '$$',
    },
    name: options.name,
    description: options.description,
    url: `${SITE_URL}/${options.slug}`,
    areaServed: options.areaServed
      ? { '@type': 'City', name: options.areaServed }
      : {
          '@type': 'City',
          name: 'Los Angeles',
          sameAs: 'https://en.wikipedia.org/wiki/Los_Angeles',
        },
  };
}

// ─── 4. BreadcrumbList Schema ───────────────────────────────────────────────

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── 5. BlogPosting Schema ──────────────────────────────────────────────────

export function generateBlogPostingSchema(options: {
  title: string;
  description: string;
  slug: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: options.title,
    description: options.description,
    url: `${SITE_URL}/blog/${options.slug}`,
    author: {
      '@type': 'Person',
      name: options.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Red Stag Painting',
      url: SITE_URL,
    },
    datePublished: options.datePublished,
    dateModified: options.dateModified,
    ...(options.image ? { image: options.image } : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${options.slug}`,
    },
  };
}

// ─── 6. Combined Service Page Schema ────────────────────────────────────────

export function generateServicePageSchema(options: {
  name: string;
  description: string;
  slug: string;
  faqs: FAQEntry[];
  breadcrumbs: { name: string; url: string }[];
}) {
  return [
    generateServiceSchema({
      name: options.name,
      description: options.description,
      slug: options.slug,
    }),
    generateFAQSchema(options.faqs),
    generateBreadcrumbSchema(options.breadcrumbs),
  ];
}

// ─── 7. Combined City Page Schema ───────────────────────────────────────────

export function generateCityPageSchema(options: {
  cityName: string;
  faqs: FAQEntry[];
  breadcrumbs: { name: string; url: string }[];
}) {
  const localBusiness = generateLocalBusinessSchema();
  const cityBusiness = {
    ...localBusiness,
    areaServed: { '@type': 'City', name: options.cityName },
  };

  return [
    cityBusiness,
    generateFAQSchema(options.faqs),
    generateBreadcrumbSchema(options.breadcrumbs),
  ];
}

// ─── 8. Combined Matrix Page Schema ─────────────────────────────────────────

export function generateMatrixPageSchema(options: {
  serviceName: string;
  serviceDescription: string;
  serviceSlug: string;
  cityName: string;
  citySlug: string;
  faqs: FAQEntry[];
  breadcrumbs: { name: string; url: string }[];
}) {
  const localBusiness = generateLocalBusinessSchema();
  const cityBusiness = {
    ...localBusiness,
    areaServed: { '@type': 'City', name: options.cityName },
  };

  return [
    generateServiceSchema({
      name: options.serviceName,
      description: options.serviceDescription,
      slug: `${options.serviceSlug}/${options.citySlug}`,
      areaServed: options.cityName,
    }),
    cityBusiness,
    generateFAQSchema(options.faqs),
    generateBreadcrumbSchema(options.breadcrumbs),
  ];
}
