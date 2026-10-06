import type { MetadataRoute } from 'next';
import { absoluteUrl, hasPublicSiteUrl, siteUrl } from '@/lib/siteMetadata';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: hasPublicSiteUrl
      ? { userAgent: '*', allow: '/' }
      : { userAgent: '*', disallow: '/' },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: hasPublicSiteUrl ? siteUrl.origin : undefined,
  };
}
