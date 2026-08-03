import { Phone, Mail } from 'lucide-react';
import { business, telHref, primaryMailto } from '@/data/business';

/**
 * Mobile-only conversion bar. Both actions leave the site (dialler / mail
 * client) — there is no in-page form to submit.
 */
export default function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-700 bg-navy/97 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <a
          href={telHref}
          className="flex flex-[3] items-center justify-center gap-2 rounded-lg bg-amber px-4 py-3 font-display text-[0.95rem] font-semibold text-navy no-underline active:translate-y-px"
        >
          <Phone className="h-[1.05rem] w-[1.05rem]" strokeWidth={2.2} aria-hidden="true" />
          <span className="font-mono tracking-tight">{business.phoneDisplay}</span>
        </a>
        <a
          href={primaryMailto}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/25 px-4 py-3 font-display text-[0.95rem] font-semibold text-white no-underline active:translate-y-px"
          aria-label="Request service by email"
        >
          <Mail className="h-[1.05rem] w-[1.05rem]" strokeWidth={2} aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">Email</span>
        </a>
      </div>
    </div>
  );
}
