import type { CityPageData } from '@/data/types';

export async function getCityData(slug: string): Promise<CityPageData | null> {
  try {
    const mod = await import(`./${slug}`);
    return mod.default as CityPageData;
  } catch {
    return null;
  }
}
