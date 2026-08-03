import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { locations } from '@/data/locations';
import { business, addressLine } from '@/data/business';
import { SectionHeading } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactPanel from '@/components/ContactPanel';
import { CallButton } from '@/components/CTAButtons';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Service Areas | Electricians Across North Texas',
  description:
    'Electrical services across Addison, Farmers Branch, Carrollton, Richardson, Plano, Coppell, Irving and the surrounding North Dallas area.',
  path: '/service-areas/',
});

function Grid({ list }: { list: typeof locations }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((l) => (
        <Link
          key={l.slug}
          href={`/service-areas/${l.slug}/`}
          className="card card-hover group flex flex-col p-6 no-underline"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-volt-50 text-volt transition-colors group-hover:bg-volt group-hover:text-white">
            <MapPin className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-[1.0625rem] transition-colors group-hover:text-volt">
            {l.displayName}
          </h3>
          <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-slate line-clamp-3">
            {l.intro}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default function AreasHub() {
  const cities = locations.filter((l) => !l.isDistrict);
  const districts = locations.filter((l) => l.isDistrict);

  return (
    <>
      <Breadcrumbs trail={[{ label: 'Service Areas', href: '/service-areas/' }]} />

      <section className="on-dark relative overflow-hidden bg-navy text-white">
        <div className="conduit-field absolute inset-0" aria-hidden="true" />
        <div className="shell relative py-14 sm:py-16 lg:py-20">
          <SectionHeading
            as="h1"
            tone="dark"
            eyebrow="Where we work"
            title="Service areas across North Texas"
            lead={`Based at ${addressLine}. Each area page covers the housing stock and the electrical issues that follow from it — these are genuinely different places to work.`}
          />
          <div className="mt-8">
            <CallButton size="lg" tone="onDark" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="Cities" title="Cities we serve" />
          <div className="mt-9">
            <Grid list={cities} />
          </div>
        </div>
      </section>

      <section className="bg-mist section">
        <div className="shell">
          <SectionHeading
            eyebrow="Districts"
            title="Neighbourhoods and districts"
            lead="Areas within larger cities where the building stock is distinct enough to be worth covering separately."
          />
          <div className="mt-9">
            <Grid list={districts} />
          </div>
        </div>
      </section>

      <ContactPanel heading={`Working across ${business.primaryCity} and beyond`} />
    </>
  );
}
