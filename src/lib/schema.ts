import type { FAQEntry } from '@/data/types';
import {
  PHONE_NUMBER,
  EMAIL,
  SITE_URL,
  FAQ_DATA,
  CITIES,
  PROJECTS,
  PRICING,
  BUSINESS_LOCALITY,
  BUSINESS_REGION,
  BUSINESS_COUNTRY,
  BUSINESS_LATITUDE,
  BUSINESS_LONGITUDE,
  FOUNDING_YEAR,
  OWNER_NAME,
} from '@/lib/constants';

const LOGO_URL = `${SITE_URL}/images/logo.png`;
const PRIMARY_IMAGE = `${SITE_URL}/images/hero.png`;

const SHARED_IMAGES = [
  `${SITE_URL}/images/hero.png`,
  `${SITE_URL}/images/proj_1_after.png`,
  `${SITE_URL}/images/proj_2_after.png`,
  `${SITE_URL}/images/proj_3_after.png`,
];

const AGGREGATE_RATING = {
  '@type': 'AggregateRating' as const,
  ratingValue: '4.9',
  reviewCount: PROJECTS.filter((p) => p.review).length.toString(),
  bestRating: '5',
  worstRating: '1',
};

const REVIEW_ITEMS = PROJECTS.filter((p) => p.review).map((p) => ({
  '@type': 'Review' as const,
  author: { '@type': 'Person', name: p.review!.author },
  reviewBody: p.review!.text,
  reviewRating: {
    '@type': 'Rating',
    ratingValue: '5',
    bestRating: '5',
    worstRating: '1',
  },
  itemReviewed: {
    '@type': 'Service',
    name: p.serviceType,
  },
}));

const ADDRESS = {
  '@type': 'PostalAddress' as const,
  addressLocality: BUSINESS_LOCALITY,
  addressRegion: BUSINESS_REGION,
  addressCountry: BUSINESS_COUNTRY,
};

const GEO = {
  '@type': 'GeoCoordinates' as const,
  latitude: BUSINESS_LATITUDE,
  longitude: BUSINESS_LONGITUDE,
};

const OPENING_HOURS = {
  '@type': 'OpeningHoursSpecification' as const,
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  opens: '07:00',
  closes: '18:00',
};

// ─── 1. LocalBusiness Schema ────────────────────────────────────────────────

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['HousePainter', 'LocalBusiness'],
    '@id': `${SITE_URL}/#business`,
    name: 'Red Stag Painting',
    description:
      'Premium residential painting contractor in Los Angeles. Interior, exterior, cabinet, stucco, and specialty painting since 2011. Sherwin-Williams and Benjamin Moore only.',
    telephone: PHONE_NUMBER,
    email: EMAIL,
    url: SITE_URL,
    logo: LOGO_URL,
    image: SHARED_IMAGES,
    foundingDate: FOUNDING_YEAR,
    founder: { '@type': 'Person', name: OWNER_NAME },
    address: ADDRESS,
    geo: GEO,
    areaServed: [
      { '@type': 'City', name: 'Los Angeles', sameAs: 'https://en.wikipedia.org/wiki/Los_Angeles' },
      ...CITIES.map((city) => ({ '@type': 'City' as const, name: city.name })),
    ],
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Check', 'Credit Card', 'ACH'],
    currenciesAccepted: 'USD',
    openingHoursSpecification: OPENING_HOURS,
    aggregateRating: AGGREGATE_RATING,
    review: REVIEW_ITEMS,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Painting Services',
      itemListElement: [
        { key: 'interior', label: 'Interior Painting' },
        { key: 'exterior', label: 'Exterior Painting' },
        { key: 'cabinet', label: 'Cabinet Painting' },
        { key: 'popcorn', label: 'Popcorn Ceiling Removal' },
        { key: 'stucco', label: 'Stucco Painting' },
        { key: 'ceiling', label: 'Ceiling Painting' },
        { key: 'garage', label: 'Garage Painting' },
        { key: 'wooddeck', label: 'Wood & Deck Staining' },
      ].map((s) => {
        const tiers = PRICING[s.key];
        const min = tiers ? Math.min(...tiers.map((t) => t.min)) : undefined;
        const max = tiers ? Math.max(...tiers.map((t) => t.max)) : undefined;
        return {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.label },
          ...(min && max
            ? {
                priceSpecification: {
                  '@type': 'PriceSpecification',
                  minPrice: min,
                  maxPrice: max,
                  priceCurrency: 'USD',
                },
              }
            : {}),
        };
      }),
    },
  };
}

// ─── 2. Organization Schema (global, in layout) ─────────────────────────────

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Red Stag Painting',
    legalName: 'Red Stag Painting',
    url: SITE_URL,
    logo: LOGO_URL,
    image: PRIMARY_IMAGE,
    description:
      'Premium residential painting contractor serving Greater Los Angeles since 2011.',
    foundingDate: FOUNDING_YEAR,
    founder: { '@type': 'Person', name: OWNER_NAME },
    address: ADDRESS,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: PHONE_NUMBER,
      email: EMAIL,
      contactType: 'customer service',
      areaServed: 'US-CA',
      availableLanguage: ['English', 'Spanish'],
    },
    knowsAbout: [
      'Residential Painting',
      'Interior Painting',
      'Exterior Painting',
      'Cabinet Refinishing',
      'Stucco Painting',
      'Popcorn Ceiling Removal',
      'Drywall Repair',
    ],
  };
}

// ─── 3. WebSite Schema (global, in layout) ──────────────────────────────────

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Red Stag Painting',
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-US',
  };
}

// ─── 4. AboutPage + Person Schema ───────────────────────────────────────────

export function generateAboutPageSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      url: `${SITE_URL}/about`,
      name: 'About Red Stag Painting',
      description:
        'Meet Israel Aquino and learn how Red Stag Painting approaches residential painting in Los Angeles.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#business` },
      mainEntity: { '@id': `${SITE_URL}/#founder` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITE_URL}/#founder`,
      name: OWNER_NAME,
      jobTitle: 'Owner & Founder',
      worksFor: { '@id': `${SITE_URL}/#business` },
      knowsAbout: [
        'Residential Painting',
        'Cabinet Refinishing',
        'Stucco Painting',
        'Exterior Restoration',
      ],
      description: `Founder of Red Stag Painting (${FOUNDING_YEAR}). Specializes in owner-led project management and premium residential finishes across Greater Los Angeles.`,
    },
  ];
}

// ─── 5. FAQPage Schema ─────────────────────────────────────────────────────

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

// ─── 6. Service Schema ──────────────────────────────────────────────────────

export function generateServiceSchema(options: {
  name: string;
  description: string;
  slug: string;
  areaServed?: string;
  pricingKey?: keyof typeof PRICING;
}) {
  const tiers = options.pricingKey ? PRICING[options.pricingKey] : undefined;
  const min = tiers ? Math.min(...tiers.map((t) => t.min)) : undefined;
  const max = tiers ? Math.max(...tiers.map((t) => t.max)) : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: options.name,
    provider: { '@id': `${SITE_URL}/#business` },
    name: options.name,
    description: options.description,
    url: `${SITE_URL}/${options.slug}`,
    image: PRIMARY_IMAGE,
    areaServed: options.areaServed
      ? { '@type': 'City', name: options.areaServed }
      : {
          '@type': 'City',
          name: 'Los Angeles',
          sameAs: 'https://en.wikipedia.org/wiki/Los_Angeles',
        },
    ...(min && max
      ? {
          offers: {
            '@type': 'Offer',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: min,
              maxPrice: max,
              priceCurrency: 'USD',
            },
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/${options.slug}`,
          },
        }
      : {}),
  };
}

// ─── 7. BreadcrumbList Schema ───────────────────────────────────────────────

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

// ─── 8. BlogPosting Schema ──────────────────────────────────────────────────

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
    publisher: { '@id': `${SITE_URL}/#organization` },
    datePublished: options.datePublished,
    dateModified: options.dateModified,
    ...(options.image ? { image: options.image } : { image: PRIMARY_IMAGE }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${options.slug}`,
    },
  };
}

// ─── 9. Combined Service Page Schema ────────────────────────────────────────

export function generateServicePageSchema(options: {
  name: string;
  description: string;
  slug: string;
  faqs: FAQEntry[];
  breadcrumbs: { name: string; url: string }[];
  pricingKey?: keyof typeof PRICING;
}) {
  return [
    generateServiceSchema({
      name: options.name,
      description: options.description,
      slug: options.slug,
      pricingKey: options.pricingKey,
    }),
    generateFAQSchema(options.faqs),
    generateBreadcrumbSchema(options.breadcrumbs),
  ];
}

// ─── 10. Combined City Page Schema ───────────────────────────────────────────

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

// ─── 11. Combined Matrix Page Schema ────────────────────────────────────────

export function generateMatrixPageSchema(options: {
  serviceName: string;
  serviceDescription: string;
  serviceSlug: string;
  cityName: string;
  citySlug: string;
  faqs: FAQEntry[];
  breadcrumbs: { name: string; url: string }[];
  pricingKey?: keyof typeof PRICING;
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
      pricingKey: options.pricingKey,
    }),
    cityBusiness,
    generateFAQSchema(options.faqs),
    generateBreadcrumbSchema(options.breadcrumbs),
  ];
}
