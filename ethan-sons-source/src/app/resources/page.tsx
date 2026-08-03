import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { articles, articleTopics, articlesInTopic } from '@/data/articles';
import { SectionHeading } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactPanel from '@/components/ContactPanel';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Electrical Resources and Guides',
  description:
    'Plain explanations of common electrical questions — tripping breakers, flickering lights, GFCI and AFCI protection, panel capacity, EV charging and surge protection.',
  path: '/resources/',
});

function Card({ a }: { a: (typeof articles)[number] }) {
  return (
    <Link
      href={`/resources/${a.slug}/`}
      className="card card-hover group flex flex-col p-6 no-underline"
    >
      <div className="flex items-center gap-2.5">
        <span className="rounded bg-volt-50 px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-wide text-volt">
          {a.topic}
        </span>
        <span className="text-[0.8125rem] text-slate-300">{a.readingMinutes} min read</span>
      </div>
      <h3 className="mt-4 text-[1.0625rem] leading-snug transition-colors group-hover:text-volt">
        {a.title}
      </h3>
      <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-slate">{a.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1 font-display text-[0.875rem] font-semibold text-volt">
        Read
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.2}
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

export default function ResourcesHub() {
  return (
    <>
      <Breadcrumbs trail={[{ label: 'Resources', href: '/resources/' }]} />

      <section className="on-dark relative overflow-hidden bg-navy text-white">
        <div className="conduit-field absolute inset-0" aria-hidden="true" />
        <div className="shell relative py-14 sm:py-16 lg:py-20">
          <SectionHeading
            as="h1"
            tone="dark"
            eyebrow="Electrical resources"
            title="Worth understanding before you call"
            lead="Plain explanations of the things people most often ask about. No sales pitch — just what the symptom usually means and where the line is between a job for you and a job for an electrician."
          />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="Latest" title="All guides" />
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <Card key={a.slug} a={a} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist section-tight">
        <div className="shell">
          <p className="eyebrow">By topic</p>
          <div className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {articleTopics.map((topic) => (
              <div key={topic}>
                <h2 className="font-display text-[0.9688rem] font-semibold text-navy">{topic}</h2>
                <ul className="mt-3 space-y-1.5">
                  {articlesInTopic(topic).map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/resources/${a.slug}/`}
                        className="text-[0.875rem] leading-snug text-slate no-underline hover:text-volt"
                      >
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
