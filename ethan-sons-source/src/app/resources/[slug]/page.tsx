import { notFound } from 'next/navigation';
import Link from 'next/link';
import { articles, getArticle, relatedArticlesFor } from '@/data/articles';
import { getService } from '@/data/services';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactPanel from '@/components/ContactPanel';
import FaqAccordion from '@/components/FaqAccordion';
import { SectionHeading, ServiceCard, CheckList } from '@/components/ui';
import { CallButton, TextLink } from '@/components/CTAButtons';
import { buildMetadata } from '@/lib/seo';
import { articleSchema, faqSchema } from '@/lib/schema';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Params) {
  const a = getArticle(params.slug);
  if (!a) return {};
  return buildMetadata({
    title: a.metaTitle,
    description: a.metaDescription,
    path: `/resources/${a.slug}/`,
    type: 'article',
  });
}

export default function ArticlePage({ params }: Params) {
  const a = getArticle(params.slug);
  if (!a) notFound();

  const services = a.relatedServices.map(getService).filter(Boolean).slice(0, 3);
  const more = relatedArticlesFor(a.relatedArticles);
  const published = new Date(a.published).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: a.title,
              description: a.metaDescription,
              path: `/resources/${a.slug}/`,
              datePublished: a.published,
            }),
          ),
        }}
      />
      {a.faqs && a.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(a.faqs)) }}
        />
      )}

      <Breadcrumbs
        trail={[
          { label: 'Resources', href: '/resources/' },
          { label: a.topic, href: '/resources/' },
          { label: a.title, href: `/resources/${a.slug}/` },
        ]}
      />

      <article>
        <header className="section-tight">
          <div className="shell max-w-prose">
            <div className="flex items-center gap-2.5">
              <span className="rounded bg-volt-50 px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-wide text-volt">
                {a.topic}
              </span>
              <span className="text-[0.8125rem] text-slate-300">{a.readingMinutes} min read</span>
            </div>
            <h1 className="mt-5">{a.title}</h1>
            <p className="mt-5 text-[1.15rem] leading-relaxed text-slate">{a.excerpt}</p>
            <p className="mt-6 border-t border-slate-100 pt-5 font-mono text-[0.8125rem] text-slate-300">
              Published {published}
            </p>
          </div>
        </header>

        <div className="shell max-w-prose pb-4">
          {a.sections.map((s) => (
            <section key={s.heading} className="mt-10 first:mt-0">
              <h2 className="text-[1.45rem]">{s.heading}</h2>
              <div className="prose-copy mt-4">
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              {s.list && (
                <div className="mt-5">
                  <CheckList items={s.list} />
                </div>
              )}
            </section>
          ))}

          <div className="mt-12 rounded-xl border-l-4 border-volt bg-mist p-6">
            <p className="font-display text-[1.0625rem] font-semibold text-navy">
              Not sure what you are dealing with?
            </p>
            <p className="mt-2 text-[0.9688rem] leading-relaxed text-graphite/90">
              Describing the symptom over the phone is usually enough to know what a visit involves.
            </p>
            <div className="mt-5">
              <CallButton />
            </div>
          </div>
        </div>
      </article>

      {a.faqs && a.faqs.length > 0 && (
        <section className="section">
          <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
            <SectionHeading eyebrow="Questions" title="Related questions" />
            <FaqAccordion faqs={a.faqs} />
          </div>
        </section>
      )}

      {services.length > 0 && (
        <section className="bg-mist section">
          <div className="shell">
            <SectionHeading eyebrow="Related services" title="If you need this work done" />
            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(
                (s, i) =>
                  s && (
                    <ServiceCard
                      key={s.slug}
                      href={`/services/${s.slug}/`}
                      title={s.title}
                      summary={s.summary}
                      icon={s.icon}
                      index={i * 2 + 1}
                    />
                  ),
              )}
            </div>
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section className="section-tight border-t border-slate-100">
          <div className="shell">
            <p className="eyebrow">Keep reading</p>
            <ul className="mt-4 space-y-2">
              {more.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/resources/${m.slug}/`}
                    className="font-display text-[1rem] font-semibold text-navy no-underline hover:text-volt"
                  >
                    {m.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <TextLink href="/resources/">All resources</TextLink>
            </div>
          </div>
        </section>
      )}

      <ContactPanel />
    </>
  );
}
