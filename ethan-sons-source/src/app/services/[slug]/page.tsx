import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  serviceCategories, servicesInCategory, services, getService, categoryById,
} from '@/data/services';
import { locations } from '@/data/locations';
import { Icon } from '@/components/Icon';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactPanel from '@/components/ContactPanel';
import FaqAccordion from '@/components/FaqAccordion';
import {
  SectionHeading, ServiceCard, CheckList, SafetyNote, CircuitTag,
} from '@/components/ui';
import { CallButton, EmailButton, TextLink } from '@/components/CTAButtons';
import { buildMetadata } from '@/lib/seo';
import { faqSchema, serviceSchema } from '@/lib/schema';
import { business } from '@/data/business';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return [
    ...serviceCategories.map((c) => ({ slug: c.slug })),
    ...services.map((s) => ({ slug: s.slug })),
  ];
}

export function generateMetadata({ params }: Params) {
  const cat = serviceCategories.find((c) => c.slug === params.slug);
  if (cat) {
    return buildMetadata({
      title: `${cat.title} in Addison, TX`,
      description: cat.blurb,
      path: `/services/${cat.slug}/`,
    });
  }
  const svc = getService(params.slug);
  if (!svc) return {};
  return buildMetadata({
    title: svc.metaTitle,
    description: svc.metaDescription,
    path: `/services/${svc.slug}/`,
  });
}

export default function ServicePage({ params }: Params) {
  const cat = serviceCategories.find((c) => c.slug === params.slug);
  if (cat) return <CategoryView slug={cat.slug} />;

  const svc = getService(params.slug);
  if (!svc) notFound();

  const parent = categoryById[svc.category];
  const related = svc.related.map(getService).filter(Boolean).slice(0, 3);
  const areas = locations.filter((l) => !l.isDistrict).slice(0, 10);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: svc.title,
              description: svc.metaDescription,
              path: `/services/${svc.slug}/`,
              category: parent?.title,
            }),
          ),
        }}
      />
      {svc.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(svc.faqs)) }}
        />
      )}

      <Breadcrumbs
        trail={[
          { label: 'Services', href: '/services/' },
          { label: parent?.navTitle ?? 'Services', href: `/services/${parent?.slug}/` },
          { label: svc.navTitle, href: `/services/${svc.slug}/` },
        ]}
      />

      {/* Hero */}
      <section className="on-dark relative overflow-hidden bg-navy text-white">
        <div className="conduit-field absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-volt/25 blur-[90px]"
          aria-hidden="true"
        />
        <div className="shell relative grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16 lg:py-20">
          <div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.08] text-amber">
              <Icon name={svc.icon} className="h-6 w-6" />
            </span>
            <p className="eyebrow-dark mt-5">{parent?.navTitle}</p>
            <h1 className="mt-3 text-white">{svc.title}</h1>
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75">
              {svc.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CallButton size="lg" tone="onDark" />
              <EmailButton
                size="lg"
                tone="onDark"
                label="Request service"
                subject={`${svc.title} – ${business.shortName}`}
              />
            </div>
          </div>

          <dl className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-panel sm:p-7">
            <div>
              <dt className="eyebrow-dark">At a glance</dt>
              <dd className="mt-3 text-[0.9688rem] leading-relaxed text-white/75">{svc.summary}</dd>
            </div>
            <div className="mt-5 border-t border-white/10 pt-5">
              <dt className="text-[0.8125rem] uppercase tracking-wide text-white/45">Category</dt>
              <dd className="mt-1">
                <Link
                  href={`/services/${parent?.slug}/`}
                  className="text-[0.9375rem] text-amber no-underline hover:underline"
                >
                  {parent?.title}
                </Link>
              </dd>
            </div>
            <div className="mt-5 border-t border-white/10 pt-5">
              <dt className="text-[0.8125rem] uppercase tracking-wide text-white/45">Cost</dt>
              <dd className="mt-1 text-[0.9375rem] leading-relaxed text-white/70">
                Depends on equipment, wiring conditions, access, electrical capacity and scope of
                work. Call to discuss.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Overview */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
          <div>
            <h2>What this work involves</h2>
            <div className="prose-copy mt-5">
              {svc.overview.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            {svc.signs && svc.signs.length > 0 && (
              <div className="mt-12">
                <h2>Signs you may need this</h2>
                <div className="mt-5">
                  <CheckList items={svc.signs} columns={2} />
                </div>
              </div>
            )}

            <div className="mt-12">
              <h2>Why people call us for it</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {svc.reasons.map((r, i) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white px-4 py-3.5"
                  >
                    <CircuitTag n={i * 2 + 1} />
                    <span className="text-[0.9375rem] leading-snug text-graphite">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {svc.considerations && svc.considerations.length > 0 && (
              <div className="mt-12">
                <h2>Things that affect the job</h2>
                <div className="mt-5">
                  <CheckList items={svc.considerations} />
                </div>
              </div>
            )}

            {(svc.residential || svc.commercial) && (
              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                {svc.residential && (
                  <div className="card p-6">
                    <p className="eyebrow">Residential</p>
                    <div className="mt-4">
                      <CheckList items={svc.residential} />
                    </div>
                  </div>
                )}
                {svc.commercial && (
                  <div className="card p-6">
                    <p className="eyebrow">Commercial</p>
                    <div className="mt-4">
                      <CheckList items={svc.commercial} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {svc.whyPro && (
              <div className="mt-12 rounded-xl border-l-4 border-volt bg-mist p-6 sm:p-7">
                <h2 className="text-[1.35rem]">Why this is not a DIY job</h2>
                <p className="mt-3 text-[1rem] leading-relaxed text-graphite/90">{svc.whyPro}</p>
              </div>
            )}

            {svc.safety && svc.safety.length > 0 && (
              <div className="mt-12">
                <SafetyNote title="Safety notes">
                  <ul className="space-y-2">
                    {svc.safety.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </SafetyNote>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="card p-6">
              <p className="eyebrow">Benefits</p>
              <div className="mt-4">
                <CheckList items={svc.benefits} />
              </div>
            </div>

            <div className="card mt-5 p-6">
              <p className="eyebrow">Talk it through</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">
                Describe what is happening and we can tell you what the visit involves.
              </p>
              <div className="mt-5 space-y-3">
                <CallButton className="w-full" />
                <EmailButton
                  className="w-full"
                  label="Email details"
                  subject={`${svc.title} – ${business.shortName}`}
                />
              </div>
            </div>

            <div className="card mt-5 p-6">
              <p className="eyebrow">In {svc.navTitle.toLowerCase()} nearby</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {areas.map((l) => (
                  <li key={l.slug}>
                    <Link
                      href={`/service-areas/${l.slug}/`}
                      className="inline-flex rounded-md border border-slate-100 px-2.5 py-1.5 text-[0.8125rem] text-slate no-underline hover:border-volt-200 hover:text-volt"
                    >
                      {l.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {svc.faqs.length > 0 && (
        <section className="bg-mist section">
          <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
            <SectionHeading
              eyebrow="Questions"
              title={`${svc.navTitle} questions`}
              lead="The things people most often want to know before booking this work."
            />
            <FaqAccordion faqs={svc.faqs} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Related" title="Work that often goes with this" />
              <TextLink href={`/services/${parent?.slug}/`} className="pb-1">
                All {parent?.navTitle.toLowerCase()}
              </TextLink>
            </div>
            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map(
                (r, i) =>
                  r && (
                    <ServiceCard
                      key={r.slug}
                      href={`/services/${r.slug}/`}
                      title={r.title}
                      summary={r.summary}
                      icon={r.icon}
                      index={i * 2 + 1}
                    />
                  ),
              )}
            </div>
          </div>
        </section>
      )}

      <ContactPanel subject={`${svc.title} – ${business.shortName}`} />
    </>
  );
}

function CategoryView({ slug }: { slug: string }) {
  const cat = serviceCategories.find((c) => c.slug === slug);
  if (!cat) notFound();
  const list = servicesInCategory(cat.id);

  return (
    <>
      <Breadcrumbs
        trail={[
          { label: 'Services', href: '/services/' },
          { label: cat.navTitle, href: `/services/${cat.slug}/` },
        ]}
      />

      <section className="on-dark relative overflow-hidden bg-navy text-white">
        <div className="conduit-field absolute inset-0" aria-hidden="true" />
        <div className="shell relative py-14 sm:py-16 lg:py-20">
          <SectionHeading
            as="h1"
            tone="dark"
            eyebrow="Service category"
            title={cat.title}
            lead={cat.intro}
          />
          <div className="mt-8">
            <CallButton size="lg" tone="onDark" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s, i) => (
              <ServiceCard
                key={s.slug}
                href={`/services/${s.slug}/`}
                title={s.title}
                summary={s.summary}
                icon={s.icon}
                index={i * 2 + 1}
              />
            ))}
          </div>

          <div className="mt-12 border-t border-slate-100 pt-10">
            <p className="eyebrow">Other categories</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {serviceCategories
                .filter((c) => c.id !== cat.id)
                .map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/services/${c.slug}/`}
                      className="inline-flex rounded-lg border border-slate-100 px-3.5 py-2 text-[0.875rem] text-graphite no-underline hover:border-volt-200 hover:text-volt"
                    >
                      {c.navTitle}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
