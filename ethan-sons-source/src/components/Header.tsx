'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, MapPin, Phone } from 'lucide-react';
import { primaryNav, type TopLevelItem } from '@/data/navigation';
import { business, telHref, addressLine, mapsLink } from '@/data/business';
import { cx } from '@/lib/seo';

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(null);
    setDrawer(false);
    setSection(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawer]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null);
        setDrawer(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, ''));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      {/* Utility bar */}
      <div className="on-dark hidden bg-navy text-white lg:block">
        <div className="shell flex h-10 items-center justify-between text-[0.8125rem]">
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/80 no-underline transition-colors hover:text-amber"
          >
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
            {addressLine}
          </a>
          <div className="flex items-center gap-6">
            <span className="text-white/60">{business.tagline}</span>
            <a
              href={telHref}
              className="inline-flex items-center gap-2 font-medium text-amber no-underline hover:underline"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              <span className="font-mono">{business.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="shell flex h-[4.5rem] items-center justify-between gap-4 lg:h-[5.25rem]">
        <Link href="/" className="shrink-0" aria-label={`${business.name} — home`}>
          <Image
            src="/logo.png"
            alt={business.name}
            width={1100}
            height={449}
            priority
            className="h-9 w-auto sm:h-11 lg:h-[3.1rem]"
          />
        </Link>

        {/* Desktop nav */}
        <div ref={navRef} className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              active={isActive(item.href)}
              open={open === item.label}
              onToggle={() => setOpen(open === item.label ? null : item.label)}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            className="hidden items-center gap-2 rounded-lg bg-volt px-5 py-3 font-display text-[0.95rem] font-semibold text-white no-underline shadow-card transition-all hover:bg-volt-700 hover:shadow-lift lg:inline-flex"
          >
            <Phone className="h-[1.05rem] w-[1.05rem]" strokeWidth={2} aria-hidden="true" />
            <span className="font-mono tracking-tight">{business.phoneDisplay}</span>
          </a>

          <button
            type="button"
            onClick={() => setDrawer(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-100 text-navy lg:hidden"
            aria-label="Open menu"
            aria-expanded={drawer}
          >
            <Menu className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/50"
            onClick={() => setDrawer(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-[22rem] flex-col bg-white shadow-lift">
            <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-slate-100 px-5">
              <Image src="/logo-mark.png" alt="" width={512} height={512} className="h-9 w-9" />
              <button
                type="button"
                onClick={() => setDrawer(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-100 text-navy"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
              {primaryNav.map((item) =>
                item.menu ? (
                  <div key={item.href} className="border-b border-slate-100/70 last:border-0">
                    <button
                      type="button"
                      onClick={() => setSection(section === item.label ? null : item.label)}
                      className="flex w-full items-center justify-between px-2 py-3.5 text-left font-display text-[1.0625rem] font-semibold text-navy"
                      aria-expanded={section === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        className={cx(
                          'h-4 w-4 text-slate transition-transform duration-200',
                          section === item.label && 'rotate-180',
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    {section === item.label && (
                      <div className="pb-3">
                        <Link
                          href={item.href}
                          className="block px-2 py-2 text-[0.9rem] font-semibold text-volt no-underline"
                        >
                          All {item.label}
                        </Link>
                        {item.menu.map((col) => (
                          <div key={col.heading} className="mt-2">
                            <p className="px-2 py-1.5 font-mono text-eyebrow uppercase text-slate-300">
                              {col.heading}
                            </p>
                            {col.links.map((l) => (
                              <Link
                                key={l.href}
                                href={l.href}
                                className="block rounded-md px-2 py-2 text-[0.9375rem] text-graphite no-underline hover:bg-mist hover:text-volt"
                              >
                                {l.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block border-b border-slate-100/70 px-2 py-3.5 font-display text-[1.0625rem] font-semibold text-navy no-underline last:border-0"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="shrink-0 border-t border-slate-100 p-4">
              <a
                href={telHref}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-volt px-5 py-3.5 font-display font-semibold text-white no-underline"
              >
                <Phone className="h-[1.05rem] w-[1.05rem]" strokeWidth={2} aria-hidden="true" />
                <span className="font-mono">{business.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavItem({
  item,
  active,
  open,
  onToggle,
}: {
  item: TopLevelItem;
  active: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  if (!item.menu) {
    return (
      <Link
        href={item.href}
        className={cx(
          'rounded-lg px-3.5 py-2.5 font-display text-[0.95rem] font-medium no-underline transition-colors',
          active ? 'text-volt' : 'text-navy hover:text-volt',
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={cx(
          'inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 font-display text-[0.95rem] font-medium transition-colors',
          active || open ? 'text-volt' : 'text-navy hover:text-volt',
        )}
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown
          className={cx('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          className={cx(
            'absolute left-1/2 top-[calc(100%+0.5rem)] -translate-x-1/2 animate-rise rounded-xl border border-slate-100 bg-white p-6 shadow-lift',
            item.width === 'wide' ? 'w-[62rem]' : 'w-[40rem]',
          )}
        >
          <div
            className={cx(
              'grid gap-x-8 gap-y-6',
              item.width === 'wide' ? 'grid-cols-4' : 'grid-cols-3',
            )}
          >
            {item.menu.map((col) => (
              <div key={col.heading}>
                {col.href ? (
                  <Link
                    href={col.href}
                    className="mb-2.5 block font-mono text-eyebrow uppercase text-volt no-underline hover:underline"
                  >
                    {col.heading}
                  </Link>
                ) : (
                  <p className="mb-2.5 font-mono text-eyebrow uppercase text-slate-300">
                    {col.heading}
                  </p>
                )}
                <ul className="space-y-1">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="block rounded-md px-2 py-1.5 -mx-2 text-[0.9rem] leading-snug text-graphite no-underline transition-colors hover:bg-mist hover:text-volt"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
            <Link
              href={item.href}
              className="font-display text-[0.9rem] font-semibold text-volt no-underline hover:underline"
            >
              View all {item.label.toLowerCase()} →
            </Link>
            <a
              href={telHref}
              className="inline-flex items-center gap-2 font-mono text-[0.85rem] font-medium text-navy no-underline hover:text-volt"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              {business.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
