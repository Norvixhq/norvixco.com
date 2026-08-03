import Link from 'next/link';
import Image from 'next/image';
import { business, addressLine } from '@/data/business';
import { services, serviceCategories } from '@/data/services';
import { locations } from '@/data/locations';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactPanel from '@/components/ContactPanel';
import { SectionHeading, CheckList, PlaceholderNote } from '@/components/ui';
import { CallButton, TextLink } from '@/components/CTAButtons';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About Us',
  description: `${business.name} is an electrical contractor based in Addison, Texas, serving residential and commercial customers across the surrounding North Texas area.`,
  path: '/about/',
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs trail={[{ label: 'About', href: '/about/' }]} />

      <section className="on-dark relative overflow-hidden bg-navy text-white">
        <div className="conduit-field absolute inset-0" aria-hidden="true" />
        <div className="shell relative grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16 lg:py-20">
          <div>
            <SectionHeading
              as="h1"
              tone="dark"
              eyebrow="About"
              title={`About ${business.name}`}
              lead={`An electrical contractor based in Addison, Texas. The company states it has been serving Texas for ${business.experienceClaim.replace('approximately ', 'approximately ')}.`}
            />
            <div className="mt-8">
              <CallButton size="lg" tone="onDark" />
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-8 shadow-panel">
            <Image
              src="/logo-reverse.png"
              alt={business.name}
              width={1100}
              height={449}
              className="h-14 w-auto"
            />
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-white/70">{business.tagline}</p>
            <p className="mt-4 border-t border-white/10 pt-4 text-[0.875rem] leading-relaxed text-white/55">
              {addressLine}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <div className="prose-copy">
            <h2>What we do</h2>
            <p>
              {business.secondaryLine} We work on residential and commercial electrical systems
              across Addison and the surrounding North Texas communities — everything from a single
              dead outlet to panel and service upgrades, EV charger installations, lighting design
              and installation, and commercial fit-out work.
            </p>
            <p>
              The site lists {services.length} services across {serviceCategories.length} categories
              and covers {locations.length} service areas. That breadth is deliberate: electrical
              problems rarely arrive neatly categorised, and the same visit often turns up something
              adjacent to what was called in.
            </p>

            <h2 className="mt-12">How we approach the work</h2>
            <p>
              Electrical work is almost entirely invisible once it is finished. A connection made
              properly and a connection made carelessly look identical behind a cover plate, and the
              difference only becomes apparent years later. That asymmetry shapes how we work.
            </p>
            <p>
              We diagnose before replacing, because faults are frequently not where they appear to
              be. We explain what we found and why it matters, so the decision stays with you rather
              than resting on trust alone. And we separate what genuinely needs attention now from
              what can be planned — most homes have a handful of items, and most of them are not
              urgent.
            </p>

            <h2 className="mt-12">Where we work</h2>
            <p>
              Our office is on Westgrove Drive in Addison, and the areas we serve radiate out from
              there. North Texas is not electrically uniform: a 1920s home in Highland Park, a
              1970s ranch in Richardson and a 2015 build in Frisco present completely different
              problems. The area pages cover what each place actually looks like to work in.
            </p>
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="card p-6">
              <p className="eyebrow">What guides the work</p>
              <div className="mt-4">
                <CheckList
                  items={[
                    'Diagnosis before replacement',
                    'The reason explained, not just the fix',
                    'Urgent work separated from planned work',
                    'Correct materials and lasting connections',
                    'Findings flagged rather than left',
                    'Panels labelled and areas left clean',
                  ]}
                />
              </div>
            </div>

            <div className="card mt-5 p-6">
              <p className="eyebrow">Explore</p>
              <ul className="mt-4 space-y-2.5">
                {[
                  { label: 'All electrical services', href: '/services/' },
                  { label: 'Service areas', href: '/service-areas/' },
                  { label: 'Services by room', href: '/rooms/' },
                  { label: 'Electrical resources', href: '/resources/' },
                  { label: 'Frequently asked questions', href: '/faq/' },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[0.9375rem] text-graphite no-underline hover:text-volt"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-mist section-tight">
        <div className="shell max-w-prose">
          <p className="eyebrow">Details to confirm</p>
          <div className="mt-4 space-y-3">
            <PlaceholderNote>
              Licensing and insurance details: {business.licensing.note}
            </PlaceholderNote>
            <PlaceholderNote>Business hours: {business.hours.placeholder}</PlaceholderNote>
            <PlaceholderNote>
              Email address placeholder — currently set to {business.contactEmail} in the site
              configuration.
            </PlaceholderNote>
          </div>
          <p className="mt-5 text-[0.875rem] leading-relaxed text-slate">
            These are left as explicit placeholders rather than filled with assumed values. Nothing
            on this site states a credential, timeframe or guarantee that has not been confirmed.
          </p>
          <div className="mt-6">
            <TextLink href="/contact/">Contact details</TextLink>
          </div>
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
