import type { MetadataRoute } from 'next';
import { SERVICES, CITIES, SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Homepage
  const homepage: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  // Service pages: /{service.slug}
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE_URL}/${service.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // City pages: /areas/{city.slug}
  const cityPages: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${SITE_URL}/areas/${city.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Matrix pages: /{service.slug}/{city.slug}
  const matrixPages: MetadataRoute.Sitemap = SERVICES.flatMap((service) =>
    CITIES.map((city) => ({
      url: `${SITE_URL}/${service.slug}/${city.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  // TODO: Add blog post URLs dynamically once blog is implemented

  return [...homepage, ...servicePages, ...cityPages, ...matrixPages];
}
