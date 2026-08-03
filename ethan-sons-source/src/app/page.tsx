import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Phone, ShieldCheck, Building2, House, ArrowUpRight, ExternalLink, Clock,
} from 'lucide-react';
import { business, telHref, addressLine, mapsLink } from '@/data/business';
import { featuredServices, serviceCategories, servicesInCategory } from '@/data/services';
import { locations } from '@/data/locations';
import { roomServices } from '@/data/roomServices';
import { articles } from '@/data/articles';
import { homepageFaqs } from '@/data/faqs';
import { CallButton, EmailButton, TextLink } from '@/components/CTAButtons';
import { SectionHeading, ServiceCard, CheckList, SafetyNote, CircuitTag } from '@/components/ui';
import { Icon } from '@/components/Icon';
import FaqAccordion from '@/components/FaqAccordion';
import ContactPanel from '@/components/ContactPanel';
import { faqSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: `Electricians in Addison, TX | ${business.name}`,
  description:
    'Residential and commercial electricians in Addison, TX. Electrical repair, panel upgrades, EV charger installation, lighting, outlets and safety inspections. Call (469) 425-8874.',
  path: '/',
});

const urgentProblems = [
  { label: 'Burning smell from an outlet or panel', icon: 'ShieldAlert' },
  { label: 'Breaker that trips repeatedly or will not reset', icon: 'Zap' },
  { label: 'Scorch marks or discolouration on a device', icon: 'Radar' },
  { label: 'Buzzing or crackling from a panel or switch', icon: 'ActivitySquare' },
  { label: 'Outlets or cover plates warm to the touch', icon: 'Power' },
  { label: 'Lights across the house brightening and dimming', icon: 'Lightbulb' },
  { label: 'A shock from an appliance or fixture', icon: 'Plug' },
  { label: 'Partial power loss with no obvious cause', icon: 'PanelTop' },
];

const process = [
  {
    title: 'Call and describe it',
    body: 'Tell us what is happening, where, and when it started. Most of the time that is enough to know what the visit involves.',
  },
  {
    title: 'Diagnosis on site',
    body: 'Electrical faults are frequently not where they appear to be. We test rather than assume, and we explain what we find.',
  },
  {
    title: 'Scope and options',
    body: 'You get the actual options, including the difference between what needs doing now and what can wait.',
  },
  {
    title: 'The work, done properly',
    body: 'Correct materials, connections made to last, and the area left clean. Anything found along the way gets flagged, not quietly ignored.',
  },
];

const modernUpgrades = [
  { slug: 'ev-charger-installation', label: 'EV charging at home', icon: 'BatteryCharging' },
  { slug: 'whole-home-surge-protection', label: 'Whole-home surge protection', icon: 'ShieldPlus' },
  { slug: 'smart-home-electrical-installation', label: 'Smart switches and controls', icon: 'Router' },
  { slug: 'led-lighting-upgrades', label: 'LED lighting throughout', icon: 'Lightbulb' },
  { slug: 'home-generator-installation', label: 'Standby and backup power', icon: 'Power' },
  { slug: 'home-network-cabling', label: 'Wired network cabling', icon: 'Network' },
];

export default function HomePage() {
  const primaryAreas = locations.filter((l) => !l.isDistrict).slice(0, 12);
  const latestArticles = articles.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(homepageFaqs)) }}
      />

      {/* ---------- Hero ---------- */}
      <section className="on-dark relative overflow-hidden bg-navy text-white">
        <div className="conduit-field absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -left-32 top-0 h-[30rem] w-[30rem] rounded-full bg-volt/25 blur-[100px]"
          aria-hidden="true"
        />
        <div
          className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-amber/10 blur-[90px]"
          aria-hidden="true"
        />

        <div className="shell relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:py-28">
          <div className="animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 font-mono text-eyebrow uppercase text-amber">
              <MapPin className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              Addison, Texas
            </p>

            <h1 className="mt-6 text-white">
              Powering Addison homes and businesses <span className="text-amber">safely</span>.
            </h1>

            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/75 sm:text-[1.15rem]">
              {business.secondaryLine} Residential and commercial electrical work — repairs, panel
              upgrades, EV chargers, lighting and safety inspections — across Addison and the
              surrounding North Texas communities.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CallButton size="lg" tone="onDark" />
              <EmailButton size="lg" tone="onDark" label="Request service" />
            </div>

            <p className="mt-6 flex items-center gap-2 text-[0.875rem] text-white/50">
              <Clock className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              {business.hours.placeholder}
            </p>
          </div>

          {/* Panel-directory card — the site's signature motif */}
          <div className="animate-rise rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-panel backdrop-blur-sm sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <p className="eyebrow-dark">Circuit directory</p>
              <Image
                src="/logo-mark-reverse.png"
                alt=""
                width={512}
                height={512}
                className="h-8 w-8 opacity-80"
              />
            </div>

            <ul className="mt-5 space-y-3">
              {featuredServices.slice(0, 6).map((s, i) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}/`}
                    className="group flex items-center gap-3 rounded-lg px-2 py-2 -mx-2 no-underline transition-colors hover:bg-white/[0.06]"
                  >
                    <CircuitTag n={i * 2 + 1} tone="dark" />
                    <span className="flex-1 text-[0.9375rem] text-white/80 transition-colors group-hover:text-white">
                      {s.navTitle}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/services/"
              className="mt-5 flex items-center justify-center gap-1.5 rounded-lg border border-white/15 py-2.5 font-display text-[0.875rem] font-semibold text-white no-underline transition-colors hover:border-amber/50 hover:text-amber"
            >
              All services
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Trust strip ---------- */}
      <section className="border-b border-slate-100 bg-mist" aria-label="At a glance">
        <div className="shell grid gap-6 py-8 sm:grid-cols-3 sm:gap-8">
          {[
            {
              icon: House,
              title: 'Residential and commercial',
              body: 'Single outlets through to full commercial fit-outs.',
            },
            {
              icon: MapPin,
              title: 'Based in Addison',
              body: 'Local to the area we work in, not dispatched from elsewhere.',
            },
            {
              icon: ShieldCheck,
              title: 'Code-conscious work',
              body: 'Done to requirements, with what we find explained plainly.',
            },
          ].map(({ icon: Ico, title, body }) => (
            <div key={title} className="flex gap-3.5">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-volt shadow-card">
                <Ico className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-[0.9688rem] font-semibold text-navy">{title}</p>
                <p className="mt-0.5 text-[0.9063rem] leading-relaxed text-slate">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Core services ---------- */}
      <section className="section" aria-labelledby="services-heading">
        <div className="shell">
          <SectionHeading
            eyebrow="What we do"
            title={<span id="services-heading">Electrical services for Addison properties</span>}
            lead="From a single dead outlet to a full commercial fit-out. Every service below has its own page explaining what the work actually involves."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((s, i) => (
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

          <div className="mt-10">
            <TextLink href="/services/">Browse the full service catalogue</TextLink>
          </div>
        </div>
      </section>

      {/* ---------- Urgent problems ---------- */}
      <section className="bg-mist section" aria-labelledby="urgent-heading">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Do not wait on these"
              title={<span id="urgent-heading">Problems that should not be left</span>}
              lead="Most electrical work can be planned. A short list of symptoms indicates heat or a fault developing right now, and those warrant a call the same day."
            />
            <div className="mt-8">
              <CallButton size="lg" />
            </div>
          </div>

          <div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {urgentProblems.map((p) => (
                <li
                  key={p.label}
                  className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white px-4 py-3.5"
                >
                  <Icon
                    name={p.icon}
                    className="mt-0.5 h-[1.15rem] w-[1.15rem] shrink-0 text-amber-700"
                  />
                  <span className="text-[0.9375rem] leading-snug text-graphite">{p.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <SafetyNote title="If there is smoke, sparking or fire">
                <p>
                  Call 911 first. For a downed power line, stay well clear, keep others clear, and
                  call 911 and the utility — a line on the ground can energise the ground around it.
                </p>
              </SafetyNote>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Why choose ---------- */}
      <section className="section" aria-labelledby="why-heading">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="How we work"
              title={<span id="why-heading">Straight answers and work that lasts</span>}
              lead="Electrical work is largely invisible once it is finished, which makes it easy to do badly. These are the things we think actually matter."
            />
          </div>
          <CheckList
            items={[
              'Diagnosis before replacement — faults are often not where they appear to be',
              'The reason explained, not just the fix, so you can make your own decision',
              'Clear separation between what needs doing now and what can be planned',
              'Correct materials and connections made to last, not to pass a glance',
              'Anything found along the way is flagged rather than quietly left',
              'Work areas left clean, and the panel labelled properly when we are done',
            ]}
          />
        </div>
      </section>

      {/* ---------- Room by room ---------- */}
      <section className="bg-mist section" aria-labelledby="rooms-heading">
        <div className="shell">
          <SectionHeading
            eyebrow="By room"
            title={<span id="rooms-heading">Electrical work, room by room</span>}
            lead="Each space has its own requirements. Kitchens and bathrooms carry the most specific ones; garages have quietly become the most demanding room in most houses."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {roomServices.map((room) => (
              <Link
                key={room.slug}
                href={`/rooms/${room.slug}/`}
                className="card card-hover group flex items-center gap-3 p-4 no-underline lg:flex-col lg:items-start lg:p-5"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-volt-50 text-volt transition-colors group-hover:bg-volt group-hover:text-white">
                  <Icon name={room.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-[0.9375rem] font-semibold leading-snug text-navy transition-colors group-hover:text-volt">
                  {room.room}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Modern upgrades ---------- */}
      <section
        className="on-dark relative overflow-hidden bg-navy section"
        aria-labelledby="upgrades-heading"
      >
        <div className="conduit-field absolute inset-0" aria-hidden="true" />
        <div className="shell relative grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          <SectionHeading
            eyebrow="Modern demands"
            tone="dark"
            title={<span id="upgrades-heading">What houses are being asked to do now</span>}
            lead="Most homes in this area were wired for a lighter electrical life than they currently lead. These are the additions that most often run into the limits of an existing service."
          />

          <div className="grid gap-3 sm:grid-cols-2">
            {modernUpgrades.map((u) => (
              <Link
                key={u.slug}
                href={`/services/${u.slug}/`}
                className="group flex items-center gap-3.5 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-4 no-underline transition-all hover:border-amber/40 hover:bg-white/[0.08]"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.07] text-amber">
                  <Icon name={u.icon} className="h-5 w-5" />
                </span>
                <span className="flex-1 text-[0.9375rem] font-medium leading-snug text-white/85 transition-colors group-hover:text-white">
                  {u.label}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-white/25 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Residential / commercial split ---------- */}
      <section className="section" aria-labelledby="split-heading">
        <div className="shell">
          <SectionHeading
            eyebrow="Two sides of the work"
            title={<span id="split-heading">Homes and businesses need different things</span>}
            lead="The underlying principles are the same. The loads, the wiring methods, the scheduling and the consequences of getting it wrong are not."
            align="center"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {[
              {
                icon: House,
                eyebrow: 'Residential',
                title: 'Work on the house you live in',
                body: 'Repairs, panel and service upgrades, lighting, outlets and dedicated circuits, EV charging, safety inspections and rewiring in older properties.',
                points: [
                  'Diagnosis of intermittent and hard-to-find faults',
                  'Capacity work before adding major loads',
                  'Protection brought up to date in older homes',
                ],
                href: '/services/repairs-and-troubleshooting/',
                cta: 'Residential services',
              },
              {
                icon: Building2,
                eyebrow: 'Commercial',
                title: 'Work that has to fit around trading',
                body: 'Offices, restaurants, retail and tenant improvement projects — lighting, distribution, dedicated circuits, data cabling and troubleshooting.',
                points: [
                  'Three-phase distribution and higher-load equipment',
                  'Requirements that vary by occupancy type',
                  'Scheduling arranged around operating hours',
                ],
                href: '/services/commercial-electrician/',
                cta: 'Commercial services',
              },
            ].map((col) => (
              <div key={col.eyebrow} className="card flex flex-col p-7 sm:p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-amber">
                  <col.icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <p className="eyebrow mt-5">{col.eyebrow}</p>
                <h3 className="mt-2.5">{col.title}</h3>
                <p className="mt-3 text-[0.9688rem] leading-relaxed text-slate">{col.body}</p>
                <div className="mt-5 flex-1">
                  <CheckList items={col.points} />
                </div>
                <div className="mt-6">
                  <TextLink href={col.href}>{col.cta}</TextLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section className="bg-mist section" aria-labelledby="process-heading">
        <div className="shell">
          <SectionHeading
            eyebrow="What to expect"
            title={<span id="process-heading">How a job actually goes</span>}
            lead="No mystery to it, and no stage where you are left guessing what happens next."
          />

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <li key={step.title} className="rounded-xl border border-slate-100 bg-white p-6">
                <span className="font-mono text-[2rem] font-medium leading-none text-slate-100">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-[1.0625rem] leading-snug">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Service area ---------- */}
      <section className="section" aria-labelledby="area-heading">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Where we work"
              title={<span id="area-heading">Addison and the surrounding area</span>}
              lead="Based on Westgrove Drive in Addison, working across the neighbouring cities and North Dallas districts. Each area page covers the housing stock and the electrical issues that follow from it."
            />

            <ul className="mt-8 flex flex-wrap gap-2">
              {primaryAreas.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/service-areas/${l.slug}/`}
                    className="inline-flex rounded-lg border border-slate-100 bg-white px-3.5 py-2 text-[0.875rem] text-graphite no-underline transition-colors hover:border-volt-200 hover:text-volt"
                  >
                    {l.city}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <TextLink href="/service-areas/">All service areas</TextLink>
            </div>
          </div>

          {/* Static location panel — no API key, no embedded tracker */}
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-card">
            <div className="on-dark relative bg-navy p-8 sm:p-10">
              <div className="conduit-field absolute inset-0" aria-hidden="true" />
              <div className="relative">
                <p className="eyebrow-dark">Our office</p>
                <p className="mt-4 font-display text-[1.35rem] font-semibold leading-snug text-white">
                  {business.address.street}
                </p>
                <p className="mt-1 text-[1.0625rem] text-white/70">
                  {business.address.locality}, {business.address.region}{' '}
                  {business.address.postalCode}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber px-5 py-3 font-display text-[0.9375rem] font-semibold text-navy no-underline"
                  >
                    <MapPin className="h-[1.05rem] w-[1.05rem]" strokeWidth={2} aria-hidden="true" />
                    Open in Maps
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                  </a>
                  <a
                    href={telHref}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-5 py-3 font-display text-[0.9375rem] font-semibold text-white no-underline hover:border-amber/60"
                  >
                    <Phone className="h-[1.05rem] w-[1.05rem]" strokeWidth={2} aria-hidden="true" />
                    <span className="font-mono">{business.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
            <p className="bg-white px-6 py-4 text-[0.875rem] leading-relaxed text-slate">
              {addressLine}
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Articles ---------- */}
      <section className="bg-mist section" aria-labelledby="articles-heading">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Electrical resources"
              title={<span id="articles-heading">Worth understanding before you call</span>}
              lead="Plain explanations of the things people most often ask about — what a tripping breaker means, why lights flicker, and what determines an EV charger installation."
            />
            <TextLink href="/resources/" className="pb-1">
              All resources
            </TextLink>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/resources/${a.slug}/`}
                className="card card-hover group flex flex-col p-6 no-underline"
              >
                <div className="flex items-center gap-2.5">
                  <span className="rounded bg-volt-50 px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-wide text-volt">
                    {a.topic}
                  </span>
                  <span className="text-[0.8125rem] text-slate-300">
                    {a.readingMinutes} min read
                  </span>
                </div>
                <h3 className="mt-4 text-[1.0625rem] leading-snug transition-colors group-hover:text-volt">
                  {a.title}
                </h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-slate">
                  {a.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-display text-[0.875rem] font-semibold text-volt">
                  Read
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section" aria-labelledby="faq-heading">
        <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="Common questions"
              title={<span id="faq-heading">Questions we get asked</span>}
              lead="If yours is not here, calling is the fastest way to get an answer."
            />
            <div className="mt-8 space-y-4">
              <CallButton />
              <div>
                <TextLink href="/faq/">Full FAQ page</TextLink>
              </div>
            </div>
          </div>

          <FaqAccordion faqs={homepageFaqs} />
        </div>
      </section>

      {/* ---------- Category directory ---------- */}
      <section className="border-t border-slate-100 section-tight" aria-labelledby="cats-heading">
        <div className="shell">
          <h2 id="cats-heading" className="sr-only">
            Service categories
          </h2>
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map((cat) => (
              <div key={cat.id}>
                <Link
                  href={`/services/${cat.slug}/`}
                  className="font-display text-[0.9688rem] font-semibold text-navy no-underline hover:text-volt"
                >
                  {cat.navTitle}
                </Link>
                <ul className="mt-3 space-y-1.5">
                  {servicesInCategory(cat.id)
                    .slice(0, 5)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}/`}
                          className="text-[0.875rem] leading-snug text-slate no-underline hover:text-volt"
                        >
                          {s.navTitle}
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
