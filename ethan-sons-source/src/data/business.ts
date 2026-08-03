/**
 * business.ts — the single source of truth for name, address, phone and email.
 *
 * Nothing else in the codebase should hard-code contact details. If the phone
 * number or address changes, it changes here and nowhere else.
 *
 * Fields marked UNVERIFIED are placeholders. They are deliberately NOT rendered
 * as factual claims anywhere on the site until the business confirms them.
 */

export const business = {
  name: 'Ethan & Sons Electricians',
  shortName: 'Ethan & Sons',
  legalName: 'Ethan & Sons Electricians',

  tagline: 'Powering Addison Homes and Businesses Safely',
  secondaryLine: 'At Ethan & Sons Electricians, we power your circuits.',

  /** Digits only — used to build tel: hrefs. */
  phoneRaw: '+14694258874',
  /** Human-readable — used for display. */
  phoneDisplay: '(469) 425-8874',

  /**
   * PLACEHOLDER. No email address has been confirmed by the business.
   * Replace this one string and every mailto link on the site updates.
   */
  contactEmail: 'EMAIL_ADDRESS_HERE',

  address: {
    street: '4575 Westgrove Dr STE 7400',
    locality: 'Addison',
    region: 'TX',
    regionName: 'Texas',
    postalCode: '75001',
    country: 'US',
  },

  /** Approximate coordinates for Addison, TX — used for the location panel only. */
  geo: { lat: 32.9618, lng: -96.8292 },

  primaryCity: 'Addison',
  primaryCitySlug: 'addison',

  /**
   * Company states roughly six years serving Texas. Presented on the site as
   * the company's own statement, not as an independently verified fact.
   */
  experienceClaim: 'approximately six years serving Texas',

  /** UNVERIFIED — rendered only inside a clearly labelled placeholder block. */
  hours: {
    verified: false,
    placeholder: 'Business hours to be confirmed — call to check availability.',
  },

  /**
   * UNVERIFIED. Licensing and insurance are NOT asserted anywhere on the site.
   * Set verified: true and fill licenseNumber only after the company supplies it.
   */
  licensing: {
    verified: false,
    licenseNumber: null as string | null,
    note: 'Confirm licensing and insurance details directly with the company.',
  },

  /** Set to a real ID to enable analytics. Left null = no tracking scripts ship. */
  analytics: {
    googleAnalyticsId: null as string | null,
    metaPixelId: null as string | null,
  },

  /** Replace with the live domain before launch. */
  siteUrl: 'https://www.ethanandsonselectricians.com',

  /** Social profiles — populate only with confirmed URLs. */
  social: [] as { label: string; url: string }[],
} as const;

/** tel: href, e.g. tel:+14694258874 */
export const telHref = `tel:${business.phoneRaw}`;

/** Formatted single-line address. */
export const addressLine = `${business.address.street}, ${business.address.locality}, ${business.address.region} ${business.address.postalCode}`;

/** Google Maps link — no API key, no embed, no billing. */
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${business.name} ${addressLine}`,
)}`;

type MailtoOptions = { subject?: string; body?: string };

/**
 * Builds a mailto: href from the central placeholder address.
 * Used by every "Send an Email" control on the site.
 */
export function mailtoHref({ subject, body }: MailtoOptions = {}): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const qs = params.toString().replace(/\+/g, '%20');
  return `mailto:${business.contactEmail}${qs ? `?${qs}` : ''}`;
}

export const defaultMailSubject = `Electrical Service Request – ${business.name}`;

/** Prefilled email body. This replaces a web form — nothing is submitted anywhere. */
export const defaultMailBody = [
  'Please include the following so we can help you quickly:',
  '',
  'Name:',
  'Phone:',
  'Property address or service area:',
  'Residential or commercial:',
  'Description of the electrical issue:',
  'Preferred contact method:',
  '',
].join('\n');

export const primaryMailto = mailtoHref({
  subject: defaultMailSubject,
  body: defaultMailBody,
});
