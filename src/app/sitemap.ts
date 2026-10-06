import type { MetadataRoute } from 'next';
import { workStudies } from '@/data/workArchive';
import { absoluteUrl } from '@/lib/siteMetadata';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/work'), changeFrequency: 'monthly', priority: .9 },
    { url: absoluteUrl('/pid-lab'), changeFrequency: 'monthly', priority: .9 },
    ...workStudies.map(study => ({
      url: absoluteUrl(`/work/${study.slug}`),
      changeFrequency: 'monthly' as const,
      priority: .8,
    })),
  ];
}
