import Link from 'next/link';
import { serviceCategories, servicesInCategory, services } from '@/data/services';
import { ServiceCard, SectionHeading } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactPanel from '@/components/ContactPanel';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Electrical Services in Addison, TX',
  description:
    'The full catalogue of residential and commercial electrical services offered across Addison and North Texas — repairs, installations, upgrades, power, lighting, safety, smart home and commercial.',
  path: '/services/',
});

export default function ServicesHub() {
  return (
    <>
      <Breadcrumbs trail={[{ label: 'Services', href: '/services/' }]} />

      <section className="section-tight">
        <div className="shell">
          <SectionHeading
            as="h1"
            eyebrow="Service catalogue"
            title="Electrical services"
            lead={`Every service below has its own page explaining what the work involves, what drives the cost, and when it is worth doing. ${services.length} services across eight categories.`}
          />
        </div>
      </section>

      {serviceCategories.map((cat, ci) => (
        <section
          key={cat.id}
          id={cat.slug}
          className={ci % 2 === 1 ? 'bg-mist section' : 'section'}
          aria-labelledby={`cat-${cat.id}`}
        >
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="eyebrow">Category {String(ci + 1).padStart(2, '0')}</p>
                <h2 id={`cat-${cat.id}`} className="mt-3">
                  <Link href={`/services/${cat.slug}/`} className="text-navy no-underline hover:text-volt">
                    {cat.title}
                  </Link>
                </h2>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-slate">{cat.blurb}</p>
              </div>
            </div>

            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {servicesInCategory(cat.id).map((s, i) => (
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
          </div>
        </section>
      ))}

      <ContactPanel />
    </>
  );
}
