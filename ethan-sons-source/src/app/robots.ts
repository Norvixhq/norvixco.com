import type { MetadataRoute } from 'next';
import { business } from '@/data/business';

const SITE = business.siteUrl.replace(/\/$/, '');

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
