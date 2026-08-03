import type { CategoryId, Service, ServiceCategory } from './types';
import { serviceCategories } from './service-content/categories';
import { repairServices } from './service-content/repairs';
import { installationServices } from './service-content/installations';
import { upgradeServices } from './service-content/upgrades';
import { powerServices } from './service-content/power';
import { lightingServices } from './service-content/lighting';
import { safetyServices } from './service-content/safety';
import { smartServices } from './service-content/smart';
import { commercialServices } from './service-content/commercial';

export { serviceCategories };
export type { Service, ServiceCategory };

/**
 * The full service catalogue. Every page under /services/ is generated from
 * this array, as are the mega menu, the sitemap and all internal links.
 * Adding a service here creates its page — no route file needs touching.
 */
export const services: Service[] = [
  ...repairServices,
  ...installationServices,
  ...upgradeServices,
  ...powerServices,
  ...lightingServices,
  ...safetyServices,
  ...smartServices,
  ...commercialServices,
];

export const categoryById = Object.fromEntries(
  serviceCategories.map((c) => [c.id, c]),
) as Record<CategoryId, ServiceCategory>;

export const servicesBySlug = Object.fromEntries(
  services.map((s) => [s.slug, s]),
) as Record<string, Service | undefined>;

export function getService(slug: string): Service | undefined {
  return servicesBySlug[slug];
}

export function servicesInCategory(id: CategoryId): Service[] {
  return services.filter((s) => s.category === id);
}

/** The ten cards on the homepage core-services grid. */
export const featuredServices = services.filter((s) => s.featured);

/** Category id -> its services, for the mega menu and services hub. */
export const servicesByCategory = serviceCategories.map((category) => ({
  category,
  items: servicesInCategory(category.id),
}));
