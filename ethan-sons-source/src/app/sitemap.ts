import type { MetadataRoute } from 'next';
import { business } from '@/data/business';
import { services, serviceCategories } from '@/data/services';
import { locations } from '@/data/locations';
import { roomServices } from '@/data/roomServices';
import { articles } from '@/data/articles';

const SITE = business.siteUrl.replace(/\/$/, '');
const now = new Date();

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' | 'yearly') => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    entry('/', 1, 'weekly'),
    entry('/services/', 0.9, 'monthly'),
    entry('/service-areas/', 0.8, 'monthly'),
    entry('/rooms/', 0.7, 'monthly'),
    entry('/resources/', 0.7, 'weekly'),
    entry('/about/', 0.6, 'yearly'),
    entry('/contact/', 0.8, 'yearly'),
    entry('/faq/', 0.7, 'monthly'),
    ...serviceCategories.map((c) => entry(`/services/${c.slug}/`, 0.8, 'monthly')),
    ...services.map((s) => entry(`/services/${s.slug}/`, 0.75, 'monthly')),
    ...locations.map((l) => entry(`/service-areas/${l.slug}/`, 0.7, 'monthly')),
    ...roomServices.map((r) => entry(`/rooms/${r.slug}/`, 0.6, 'monthly')),
    ...articles.map((a) => entry(`/resources/${a.slug}/`, 0.6, 'monthly')),
    entry('/privacy/', 0.2, 'yearly'),
    entry('/terms/', 0.2, 'yearly'),
    entry('/accessibility/', 0.2, 'yearly'),
  ];
}
