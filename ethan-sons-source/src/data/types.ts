export type CategoryId =
  | 'repairs'
  | 'installations'
  | 'upgrades'
  | 'power'
  | 'lighting'
  | 'safety'
  | 'smart'
  | 'commercial';

export type Faq = { q: string; a: string };

export type ServiceCategory = {
  id: CategoryId;
  slug: string;
  title: string;
  navTitle: string;
  blurb: string;
  /** Longer intro shown on the category listing. */
  intro: string;
};

export type Service = {
  slug: string;
  /** Page H1. */
  title: string;
  /** Shorter label for nav, cards and breadcrumbs. */
  navTitle: string;
  category: CategoryId;
  metaTitle: string;
  metaDescription: string;
  /** One-line card blurb. */
  summary: string;
  /** Lucide icon name, resolved in components/Icon.tsx */
  icon: string;
  /** Surfaces on the homepage core-services grid. */
  featured?: boolean;
  /** Location-anchored opening paragraph. */
  intro: string;
  /** Body paragraphs for the overview block. */
  overview: string[];
  /** Common reasons customers request this service. */
  reasons: string[];
  /** Signs the service may be needed. Omitted where it doesn't apply. */
  signs?: string[];
  benefits: string[];
  /** Typical installation or repair considerations. */
  considerations?: string[];
  safety?: string[];
  residential?: string[];
  commercial?: string[];
  /** Why professional electrical work matters, specific to this service. */
  whyPro?: string;
  /** Slugs of related services. */
  related: string[];
  faqs: Faq[];
};

export type Location = {
  slug: string;
  city: string;
  /** e.g. "Addison, TX" */
  displayName: string;
  /** Neighbourhood / district rather than an incorporated city. */
  isDistrict?: boolean;
  metaTitle: string;
  metaDescription: string;
  /** Two to three sentences, genuinely specific to this place. */
  intro: string;
  /** What the built environment actually looks like here. */
  builtEnvironment: string[];
  /** Electrical needs that follow from that housing and business mix. */
  commonNeeds: string[];
  /** A short paragraph on the commercial side of this market. */
  commercialNote: string;
  /** Slugs of neighbouring locations. */
  nearby: string[];
  faqs: Faq[];
};

export type RoomService = {
  slug: string;
  room: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  icon: string;
  intro: string;
  /** Each item links to a service page where one exists. */
  items: { label: string; detail: string; service?: string }[];
  considerations: string[];
  faqs: Faq[];
};

export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  /** ISO date. */
  published: string;
  topic: string;
  readingMinutes: number;
  /** Body sections rendered in order. */
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
  /** Slugs of related services. */
  relatedServices: string[];
  /** Slugs of related articles. */
  relatedArticles: string[];
  faqs?: Faq[];
};

export type FaqGroup = { id: string; title: string; faqs: Faq[] };
