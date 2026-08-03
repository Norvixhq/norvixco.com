import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { breadcrumbSchema } from '@/lib/schema';

export type Crumb = { label: string; href: string };

export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const full: Crumb[] = [{ label: 'Home', href: '/' }, ...trail];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(full)) }}
      />
      <nav aria-label="Breadcrumb" className="border-b border-slate-100 bg-mist">
        <div className="shell">
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 py-3 text-[0.8125rem] text-slate">
            {full.map((crumb, i) => {
              const last = i === full.length - 1;
              return (
                <li key={crumb.href} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <ChevronRight
                      className="h-3.5 w-3.5 text-slate-300"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  )}
                  {last ? (
                    <span aria-current="page" className="font-medium text-navy">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="text-slate no-underline hover:text-volt">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
