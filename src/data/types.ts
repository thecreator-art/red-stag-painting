/**
 * Content data types for all page types.
 * Codex/Claude produces JSON or TS files matching these shapes.
 * The route templates consume them.
 */

// ─── Service Page (13 pages) ─────────────────────────────────────────────────

export interface ServicePageData {
  /** URL slug: "interior-painting" */
  slug: string;
  /** Display name: "Interior Painting" */
  name: string;

  // SEO
  /** Under 60 chars. Example: "Interior Painting Los Angeles | Red Stag Painting" */
  titleTag: string;
  /** Under 155 chars with CTA. */
  metaDescription: string;
  /** Unique H1 with service name + Los Angeles. */
  h1: string;
  /** Primary target keyword. */
  primaryKeyword: string;
  /** 3-5 secondary keywords. */
  secondaryKeywords: string[];
  /** Canonical URL path: "/interior-painting" */
  canonical: string;
  /** OG title (can differ from titleTag). */
  ogTitle: string;
  /** OG description. */
  ogDescription: string;

  // Hero
  /** Hero background image URL (Unsplash or custom). */
  heroImage: string;
  /** Alt text specific to this service. */
  heroImageAlt: string;
  /** Short hero subtitle (1-2 sentences). */
  heroSubtitle: string;

  // Body content — answer-first, 2,000+ words split into sections
  /** Direct answer in first 40-60 words for GEO. */
  introAnswer: string;
  /** Body sections, each with heading + content. Aim for 6-10 sections. */
  sections: ContentSection[];

  // Pricing
  /** Per square foot range: "$2-$4" */
  pricePerSqFt: string;
  /** Per project ranges specific to this service. */
  pricingTiers: PricingTier[];
  /** Price anchor comparison: "vs. $25,000-$40,000 for new cabinets" */
  priceAnchor: string;

  // FAQ — 5 questions, conversational phrasing for AI queries
  faqs: FAQEntry[];

  // Internal linking
  /** Related service slugs (3-5). */
  relatedServices: string[];
  /** Highest-value city slugs for this service (5-8). */
  featuredCities: string[];

  // Schema
  /** Schema.org service type: "HousePainting", "Plumbing", etc. */
  schemaServiceType: string;
}

// ─── City Page (30 pages) ────────────────────────────────────────────────────

export interface CityPageData {
  /** URL slug: "beverly-hills" */
  slug: string;
  /** Display name: "Beverly Hills" */
  name: string;
  /** State: "CA" */
  state: string;

  // SEO
  titleTag: string;
  metaDescription: string;
  /** H1: "House Painters in [City], CA" */
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  canonical: string;
  ogTitle: string;
  ogDescription: string;

  // Hero
  heroImage: string;
  heroImageAlt: string;
  heroSubtitle: string;

  // Body content — 1,500+ words, real neighborhood knowledge
  /** Direct answer for GEO, 40-60 words. */
  introAnswer: string;
  /** Body sections with real streets, landmarks, housing stock, HOA context. */
  sections: ContentSection[];

  // Neighborhood-specific
  /** Price modifier vs. base LA rates. 1.0 = standard, 1.25 = 25% higher. */
  priceModifier: number;
  /** Notable neighborhoods/areas within this city. */
  neighborhoods: string[];
  /** Common housing types: "Mid-century ranch", "Spanish Colonial", etc. */
  housingStock: string[];
  /** HOA considerations if applicable. */
  hoaContext: string | null;

  // FAQ — 3-4 city-specific questions
  faqs: FAQEntry[];

  // Internal linking
  /** All 13 service slugs (each city links to all services). */
  serviceLinks: string[];
  /** 3-5 nearby city slugs for cross-linking. */
  nearbyCities: string[];
}

// ─── Matrix Page (390 pages) ─────────────────────────────────────────────────

export interface MatrixPageData {
  /** Service slug: "interior-painting" */
  serviceSlug: string;
  /** City slug: "beverly-hills" */
  citySlug: string;
  /** Service display name. */
  serviceName: string;
  /** City display name. */
  cityName: string;

  // SEO
  /** "[Service] [City] CA | Red Stag Painting" */
  titleTag: string;
  metaDescription: string;
  /** "[Service] in [City], CA" */
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** Self-referencing: "/interior-painting/beverly-hills" */
  canonical: string;
  ogTitle: string;
  ogDescription: string;

  // Hero
  heroImage: string;
  heroImageAlt: string;
  heroSubtitle: string;

  // Body content — 1,200+ words, UNIQUE angle per combination
  /** Direct answer, 40-60 words. Neighborhood-aware. */
  introAnswer: string;
  /**
   * Sections with unique angles per service×city combo.
   * "Cabinet painting in Beverly Hills" = luxury kitchens, custom cabinetry.
   * "Cabinet painting in Burbank" = builder-grade oak, 1950s homes.
   */
  sections: ContentSection[];

  // Pricing — adjusted for this city
  pricePerSqFt: string;
  pricingTiers: PricingTier[];

  // FAQ — 2-3 questions specific to service in city
  faqs: FAQEntry[];

  // Internal linking
  /** Parent service page slug. */
  parentService: string;
  /** Parent city page slug. */
  parentCity: string;
  /** 2-3 related matrix page slugs in same city. */
  relatedMatrixPages: string[];
}

// ─── Blog Post (30 posts) ────────────────────────────────────────────────────

export interface BlogPostData {
  /** URL slug: "how-much-does-interior-painting-cost-los-angeles" */
  slug: string;

  // SEO
  titleTag: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  canonical: string;
  ogTitle: string;
  ogDescription: string;

  // Article meta
  /** Author name for E-E-A-T. */
  author: string;
  /** ISO date: "2026-04-03" */
  publishedDate: string;
  /** ISO date, updated when content refreshed. */
  lastUpdatedDate: string;
  /** Category: "Cost Guide", "How-To", "Comparison", etc. */
  category: string;
  /** Estimated read time in minutes. */
  readTime: number;

  // Hero
  heroImage: string;
  heroImageAlt: string;

  // Body content — 1,500-2,500 words
  /** Answer-first opening, 40-60 words for GEO. */
  introAnswer: string;
  /** Body sections with real stats every 150-200 words. */
  sections: ContentSection[];

  // FAQ — 3-4 conversational AI query questions
  faqs: FAQEntry[];

  // Internal linking
  /** Related service page slugs. */
  relatedServices: string[];
  /** Related city page slugs. */
  relatedCities: string[];
  /** Related blog post slugs. */
  relatedPosts: string[];
}

// ─── Shared Sub-types ────────────────────────────────────────────────────────

export interface ContentSection {
  /** H2 or H3 heading. */
  heading: string;
  /** "h2" | "h3" — for proper heading hierarchy. */
  level: 'h2' | 'h3';
  /** HTML-safe body content. Can include <strong>, <em>, <a>, <ul>, <li>. */
  body: string;
  /** Optional image for this section. */
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Optional pricing table embedded in this section. */
  pricingTable?: PricingTier[];
}

export interface PricingTier {
  /** Label: "1 room", "Under 1500 sqft", etc. */
  label: string;
  /** Min price in dollars. */
  min: number;
  /** Max price in dollars. */
  max: number;
  /** Show "+" after max. */
  plus?: boolean;
}

export interface FAQEntry {
  /** Question phrased conversationally (how people ask ChatGPT). */
  question: string;
  /** Answer with real numbers and specific details. */
  answer: string;
}
