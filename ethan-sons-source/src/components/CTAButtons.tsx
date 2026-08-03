import Link from 'next/link';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import { business, telHref, primaryMailto, mailtoHref } from '@/data/business';
import { cx } from '@/lib/seo';

/**
 * Every conversion path on this site is a tel: or mailto: link.
 * There is no form, no form endpoint, and no submit handler anywhere.
 */

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-display text-[0.95rem] font-semibold no-underline transition-all duration-200 focus-visible:outline-none';

const sizes = {
  md: 'px-5 py-3',
  lg: 'px-6 py-3.5 text-base',
};

export function CallButton({
  label,
  size = 'md',
  tone = 'primary',
  className,
  showNumber = true,
}: {
  label?: string;
  size?: keyof typeof sizes;
  tone?: 'primary' | 'onDark' | 'ghost';
  className?: string;
  showNumber?: boolean;
}) {
  const tones = {
    primary: 'bg-volt text-white shadow-card hover:bg-volt-700 hover:shadow-lift active:translate-y-px',
    onDark: 'bg-amber text-navy shadow-card hover:bg-[#FFB92B] active:translate-y-px',
    ghost: 'border border-slate-100 bg-white text-navy hover:border-volt-200 hover:text-volt',
  };
  return (
    <a
      href={telHref}
      className={cx(base, sizes[size], tones[tone], className)}
      data-cta="call"
    >
      <Phone className="h-[1.05rem] w-[1.05rem] shrink-0" strokeWidth={2} aria-hidden="true" />
      <span>
        {label ?? 'Call'}
        {showNumber && <span className="ml-1.5 font-mono tracking-tight">{business.phoneDisplay}</span>}
      </span>
    </a>
  );
}

export function EmailButton({
  label = 'Request Service by Email',
  subject,
  size = 'md',
  tone = 'ghost',
  className,
}: {
  label?: string;
  subject?: string;
  size?: keyof typeof sizes;
  tone?: 'ghost' | 'onDark';
  className?: string;
}) {
  const tones = {
    ghost: 'border border-slate-100 bg-white text-navy hover:border-volt-200 hover:text-volt',
    onDark: 'border border-white/25 bg-white/5 text-white hover:border-amber/60 hover:bg-white/10',
  };
  return (
    <a
      href={subject ? mailtoHref({ subject }) : primaryMailto}
      className={cx(base, sizes[size], tones[tone], className)}
      data-cta="email"
    >
      <Mail className="h-[1.05rem] w-[1.05rem] shrink-0" strokeWidth={2} aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cx(
        'group inline-flex items-center gap-1.5 font-display text-[0.95rem] font-semibold text-volt no-underline hover:text-volt-700',
        className,
      )}
    >
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        strokeWidth={2}
        aria-hidden="true"
      />
    </Link>
  );
}

/** Standard pairing used at the foot of most page sections. */
export function CTAPair({
  subject,
  tone = 'light',
  className,
}: {
  subject?: string;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <div className={cx('flex flex-col gap-3 sm:flex-row sm:items-center', className)}>
      <CallButton size="lg" tone={tone === 'dark' ? 'onDark' : 'primary'} />
      <EmailButton size="lg" tone={tone === 'dark' ? 'onDark' : 'ghost'} subject={subject} />
    </div>
  );
}
