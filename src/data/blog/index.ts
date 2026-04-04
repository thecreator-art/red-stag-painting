import type { BlogPostData } from '@/data/types';

/** Blog post index — import all slugs for static generation. */
export interface BlogIndexEntry {
  slug: string;
  title: string;
  category: string;
  publishedDate: string;
}

/**
 * Returns all blog slugs for generateStaticParams.
 * Each blog post lives at `@/data/blog/${slug}.ts` and exports default BlogPostData.
 * This index file is the single manifest consumed by the route.
 */
export const blogIndex: BlogIndexEntry[] = [
  // Add entries here as blog posts are created, e.g.:
  // { slug: 'how-much-does-interior-painting-cost-los-angeles', title: '...', category: 'Cost Guide', publishedDate: '2026-04-03' },
];

export async function getBlogData(slug: string): Promise<BlogPostData | null> {
  try {
    const mod = await import(`./${slug}`);
    return mod.default as BlogPostData;
  } catch {
    return null;
  }
}
