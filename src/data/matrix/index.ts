import type { MatrixPageData } from '@/data/types';

export async function getMatrixData(serviceSlug: string, citySlug: string): Promise<MatrixPageData | null> {
  try {
    const mod = await import(`./${serviceSlug}/${citySlug}`);
    return mod.default as MatrixPageData;
  } catch {
    return null;
  }
}
