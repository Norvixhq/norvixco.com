import { business, addressLine } from '@/data/business';
import { locations } from '@/data/locations';
import type { Faq } from '@/data/types';

const SITE = business.siteUrl.replace(/\/$/, '');

/** Cities served, derived from the locations data so the two never diverge. */
const areaServed = () =>
  locations
    .filter((l) => !l.isDistrict)
    .map((l) => ({ '@type': 'City', name: l.city, addressRegion: 'TX' }));

export const abs = (path: string) => `${SITE}${path.startsWith('/') ? path : `/${path}`}`;

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: business.address.street,
  addressLocality: business.address.locality,
  addressRegion: business.address.region,
  postalCode: business.address.postalCode,
  addressCountry: business.address.country,
};

/**
 * Organization / Electrician node.
 *
 * Deliberately omitted: aggregateRating, review, openingHours, priceRange,
 * and any award or certification property. None of those are verified, and
 * schema must not assert what the visible page cannot support.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Electrician', 'LocalBusiness'],
    '@id': abs('/#business'),
    name: business.name,
    description: business.tagline,
    url: abs('/'),
    telephone: business.phoneRaw,
    image: abs('/logo-mark.png'),
    logo: abs('/logo.png'),
    address: postalAddress,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    areaServed: areaServed(),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: business.phoneRaw,
      contactType: 'customer service',
      areaServed: 'US-TX',
      availableLanguage: ['English'],
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': abs('/#website'),
    url: abs('/'),
    name: business.name,
    publisher: { '@id': abs('/#business') },
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    serviceType: opts.category ?? opts.name,
    url: abs(opts.path),
    provider: { '@id': abs('/#business') },
    areaServed: areaServed(),
  };
}

export function faqSchema(faqs: Faq[]) {
  if (!faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: abs(item.href),
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: abs(opts.path),
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    author: { '@id': abs('/#business') },
    publisher: { '@id': abs('/#business') },
    mainEntityOfPage: abs(opts.path),
  };
}

export { addressLine };
