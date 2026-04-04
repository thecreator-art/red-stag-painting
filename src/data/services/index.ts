import type { ServicePageData } from '@/data/types';

export async function getServiceData(slug: string): Promise<ServicePageData | null> {
  try {
    const mod = await import(`./${slug}`);
    return mod.default;
  } catch {
    return null;
  }
}
