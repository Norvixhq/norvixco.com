import type { Metadata } from 'next';
import { business } from '@/data/business';

const SITE = business.siteUrl.replace(/\/$/, '');

/**
 * Static assets in /public are NOT rewritten by next/image when the export is
 * unoptimized, so anything under /public must be routed through asset().
 * Set NEXT_PUBLIC_BASE_PATH at build time when deploying to a subfolder.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const asset = (path: string) => `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;

export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}): Metadata {
  const url = `${SITE}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: business.name,
      locale: 'en_US',
      type: opts.type ?? 'website',
      images: [
        {
          url: `${SITE}${asset('/og-image.png')}`,
          width: 1200,
          height: 630,
          alt: `${business.name} — ${business.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [`${SITE}${asset('/og-image.png')}`],
    },
  };
}

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

/** Deterministic pick so decorative variation never changes between builds. */
export function hashPick<T>(seed: string, items: T[]): T {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return items[h % items.length];
}
