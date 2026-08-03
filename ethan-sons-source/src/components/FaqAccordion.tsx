'use client';

import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import type { Faq } from '@/data/types';
import { cx } from '@/lib/seo';

export default function FaqAccordion({
  faqs,
  tone = 'light',
  defaultOpen = 0,
}: {
  faqs: Faq[];
  tone?: 'light' | 'dark';
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const uid = useId();

  return (
    <div
      className={cx(
        'divide-y rounded-xl border',
        tone === 'dark'
          ? 'divide-white/10 border-white/15 bg-white/[0.03]'
          : 'divide-slate-100 border-slate-100 bg-white shadow-card',
      )}
    >
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.q}>
            <h3 className="m-0">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`${uid}-panel-${i}`}
                id={`${uid}-button-${i}`}
                className={cx(
                  'flex w-full items-start justify-between gap-4 px-5 py-4 text-left font-display text-[1rem] font-semibold transition-colors sm:px-6 sm:py-5',
                  tone === 'dark'
                    ? 'text-white hover:text-amber'
                    : 'text-navy hover:text-volt',
                )}
              >
                <span className="leading-snug">{faq.q}</span>
                <Plus
                  className={cx(
                    'mt-0.5 h-[1.15rem] w-[1.15rem] shrink-0 transition-transform duration-200',
                    isOpen && 'rotate-45',
                    tone === 'dark' ? 'text-amber' : 'text-volt',
                  )}
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={`${uid}-panel-${i}`}
              role="region"
              aria-labelledby={`${uid}-button-${i}`}
              hidden={!isOpen}
              className={cx(
                'px-5 pb-5 text-[0.9688rem] leading-relaxed sm:px-6 sm:pb-6',
                tone === 'dark' ? 'text-white/70' : 'text-graphite/90',
              )}
            >
              <p className="max-w-prose">{faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
