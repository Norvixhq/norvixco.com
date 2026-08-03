import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ExternalLink } from 'lucide-react';
import { locations, getLocation } from '@/data/locations';
import { featuredServices } from '@/data/services';
import { business, addressLine, mapsLink } from '@/data/business';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactPanel from '@/components/ContactPanel';
import FaqAccordion from '@/components/FaqAccordion';
import { SectionHeading, ServiceCard, CheckList } from '@/components/ui';
import { CallButton, EmailButton, TextLink } from '@/components/CTAButtons';
import { buildMetadata } from '@/lib/seo';
import { faqSchema, serviceSchema } from '@/lib/schema';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: Params) {
  const loc = getLocation(params.slug);
  if (!loc) return {};
  return buildMetadata({
    title: loc.metaTitle,
    description: loc.metaDescription,
    path: `/service-areas/${loc.slug}/`,
  });
}

export default function LocationPage({ params }: Params) {
  const loc = getLocation(params.slug);
  if (!loc) notFound();

  const nearby = loc.nearby.map(getLocation).filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: `Electrician in ${loc.displayName}`,
              description: loc.metaDescription,
              path: `/service-areas/${loc.slug}/`,
              category: 'Electrical services',
            }),
          ),
        }}
      />
      {loc.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(loc.faqs)) }}
        />
      )}

      <Breadcrumbs
        trail={[
          { label: 'Service Areas', href: '/service-areas/' },
          { label: loc.city, href: `/service-areas/${loc.slug}/` },
        ]}
      />

      <section className="on-dark relative overflow-hidden bg-navy text-white">
        <div className="conduit-field absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-volt/25 blur-[90px]"
          aria-hidden="true"
        />
        <div className="shell relative grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16 lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 font-mono text-eyebrow uppercase text-amber">
              <MapPin className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              {loc.isDistrict ? 'District' : 'City'}
            </p>
            <h1 className="mt-6 text-white">Electricians in {loc.displayName}</h1>
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75">
              {loc.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CallButton size="lg" tone="onDark" />
              <EmailButton
                size="lg"
                tone="onDark"
                label="Request service"
                subject={`Electrical work in ${loc.displayName} – ${business.shortName}`}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-panel sm:p-7">
            <p className="eyebrow-dark">Our office</p>
            <p className="mt-3 text-[0.9688rem] leading-relaxed text-white/75">{addressLine}</p>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-[0.875rem] text-amber no-underline hover:underline"
            >
              Open in Maps
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2>What the building stock looks like here</h2>
            <div className="mt-5">
              <CheckList items={loc.builtEnvironment} />
            </div>
          </div>
          <div>
            <h2>What that means electrically</h2>
            <div className="mt-5">
              <CheckList items={loc.commonNeeds} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist section">
        <div className="shell">
          <SectionHeading
            eyebrow="Commercial"
            title={`Business and commercial work in ${loc.city}`}
            lead={loc.commercialNote}
          />
          <div className="mt-8">
            <TextLink href="/services/commercial-electrician/">Commercial electrical services</TextLink>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Services"
            title={`What we do in ${loc.city}`}
            lead="The full catalogue is available across every area we serve. These are the ones asked for most often."
          />
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.slice(0, 6).map((s, i) => (
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
          <div className="mt-9">
            <TextLink href="/services/">All electrical services</TextLink>
          </div>
        </div>
      </section>

      {loc.faqs.length > 0 && (
        <section className="bg-mist section">
          <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
            <SectionHeading eyebrow="Questions" title={`${loc.city} questions`} />
            <FaqAccordion faqs={loc.faqs} />
          </div>
        </section>
      )}

      {nearby.length > 0 && (
        <section className="section-tight border-t border-slate-100">
          <div className="shell">
            <p className="eyebrow">Nearby areas</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {nearby.map(
                (n) =>
                  n && (
                    <li key={n.slug}>
                      <Link
                        href={`/service-areas/${n.slug}/`}
                        className="inline-flex rounded-lg border border-slate-100 px-3.5 py-2 text-[0.875rem] text-graphite no-underline hover:border-volt-200 hover:text-volt"
                      >
                        {n.city}
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </div>
        </section>
      )}

      <ContactPanel
        heading={`Electrical work in ${loc.displayName}`}
        subject={`Electrical work in ${loc.displayName} – ${business.shortName}`}
      />
    </>
  );
}
