import { asset } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { footerNav, legalNav } from '@/data/navigation';
import { business, telHref, primaryMailto, addressLine, mapsLink } from '@/data/business';

export default function Footer() {
  // Dynamic — evaluated at build time, never hard-coded.
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative overflow-hidden bg-navy text-white">
      <div className="conduit-field absolute inset-0 opacity-70" aria-hidden="true" />

      <div className="shell relative section-tight">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.15fr_repeat(3,1fr)] lg:gap-12">
          <div>
            <Image
              src={asset("/logo-reverse.png")}
              alt={business.name}
              width={1100}
              height={449}
              className="h-12 w-auto"
            />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-white/70">
              {business.tagline}. Residential and commercial electrical work across Addison and the
              surrounding North Texas communities.
            </p>

            <div className="mt-6 space-y-3 text-[0.9375rem]">
              <a
                href={telHref}
                className="flex items-center gap-2.5 text-amber no-underline hover:underline"
              >
                <Phone className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
                <span className="font-mono">{business.phoneDisplay}</span>
              </a>
              <a
                href={primaryMailto}
                className="flex items-center gap-2.5 text-white/75 no-underline hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                Request service by email
              </a>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-white/75 no-underline hover:text-white"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                <span>{addressLine}</span>
              </a>
            </div>
          </div>

          {footerNav.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="font-mono text-eyebrow uppercase text-amber">{col.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[0.9375rem] text-white/70 no-underline transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-4 pt-8 text-[0.8125rem] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/55 no-underline hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Clears the mobile sticky call bar. */}
      <div className="h-[4.75rem] lg:hidden" aria-hidden="true" />
    </footer>
  );
}
