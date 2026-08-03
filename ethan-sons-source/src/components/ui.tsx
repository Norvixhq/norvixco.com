import Link from 'next/link';
import { AlertTriangle, Check, ArrowUpRight } from 'lucide-react';
import { Icon } from './Icon';
import { cx } from '@/lib/seo';

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  tone = 'light',
  as: Tag = 'h2',
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}) {
  return (
    <div
      className={cx(
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl',
        className,
      )}
    >
      {eyebrow && (
        <p className={tone === 'dark' ? 'eyebrow-dark' : 'eyebrow'}>{eyebrow}</p>
      )}
      <Tag className={cx('mt-3', tone === 'dark' && 'text-white')}>{title}</Tag>
      {lead && (
        <p
          className={cx(
            'mt-4 text-[1.05rem] leading-relaxed sm:text-[1.125rem]',
            tone === 'dark' ? 'text-white/70' : 'text-slate',
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

/** The panel-directory motif: a numbered circuit label. */
export function CircuitTag({ n, tone = 'light' }: { n: number; tone?: 'light' | 'dark' }) {
  return (
    <span
      className={cx(
        'inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded border px-1.5 font-mono text-[0.6875rem] font-medium tabular-nums',
        tone === 'dark'
          ? 'border-white/20 text-amber'
          : 'border-slate-100 bg-mist text-slate',
      )}
      aria-hidden="true"
    >
      {String(n).padStart(2, '0')}
    </span>
  );
}

export function ServiceCard({
  href,
  title,
  summary,
  icon,
  index,
}: {
  href: string;
  title: string;
  summary: string;
  icon: string;
  index?: number;
}) {
  return (
    <Link href={href} className="card card-hover group flex flex-col p-6 no-underline">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-volt-50 text-volt transition-colors group-hover:bg-volt group-hover:text-white">
          <Icon name={icon} className="h-[1.35rem] w-[1.35rem]" />
        </span>
        {typeof index === 'number' && <CircuitTag n={index} />}
      </div>
      <h3 className="mt-4 text-[1.0625rem] leading-snug transition-colors group-hover:text-volt">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-slate">{summary}</p>
      <span className="mt-4 inline-flex items-center gap-1 font-display text-[0.875rem] font-semibold text-volt">
        Learn more
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.2}
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

export function CheckList({
  items,
  tone = 'light',
  columns = 1,
  className,
}: {
  items: string[];
  tone?: 'light' | 'dark';
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <ul
      className={cx(
        'space-y-2.5',
        columns === 2 && 'sm:columns-2 sm:gap-x-8 sm:space-y-0',
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item}
          className={cx(
            'flex gap-2.5 text-[0.9688rem] leading-relaxed',
            columns === 2 && 'sm:mb-2.5 sm:break-inside-avoid',
            tone === 'dark' ? 'text-white/75' : 'text-graphite/90',
          )}
        >
          <Check
            className={cx(
              'mt-[0.3rem] h-4 w-4 shrink-0',
              tone === 'dark' ? 'text-amber' : 'text-volt',
            )}
            strokeWidth={2.4}
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Used for genuine electrical hazard guidance only. */
export function SafetyNote({
  title = 'Safety first',
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <aside
      className="rounded-xl border border-amber/40 bg-amber-50 p-5 sm:p-6"
      role="note"
      aria-label={title}
    >
      <div className="flex gap-3.5">
        <AlertTriangle
          className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
          strokeWidth={2}
          aria-hidden="true"
        />
        <div>
          <p className="font-display text-[0.9375rem] font-semibold text-navy">{title}</p>
          <div className="mt-1.5 text-[0.9375rem] leading-relaxed text-graphite/90 [&>p+p]:mt-2">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}

/** Explicit marker for anything the client must confirm before launch. */
export function PlaceholderNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-slate-300 bg-mist px-4 py-3 font-mono text-[0.8125rem] leading-relaxed text-slate">
      {children}
    </p>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-amber pl-4">
      <p className="font-display text-[1.35rem] font-semibold text-navy">{value}</p>
      <p className="mt-0.5 text-[0.875rem] text-slate">{label}</p>
    </div>
  );
}
