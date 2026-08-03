import { notFound } from 'next/navigation';
import Link from 'next/link';
import { roomServices, getRoom } from '@/data/roomServices';
import { getService } from '@/data/services';
import { business } from '@/data/business';
import { Icon } from '@/components/Icon';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactPanel from '@/components/ContactPanel';
import FaqAccordion from '@/components/FaqAccordion';
import { SectionHeading, CheckList, CircuitTag } from '@/components/ui';
import { CallButton, EmailButton, TextLink } from '@/components/CTAButtons';
import { buildMetadata } from '@/lib/seo';
import { faqSchema } from '@/lib/schema';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return roomServices.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: Params) {
  const room = getRoom(params.slug);
  if (!room) return {};
  return buildMetadata({
    title: room.metaTitle,
    description: room.metaDescription,
    path: `/rooms/${room.slug}/`,
  });
}

export default function RoomPage({ params }: Params) {
  const room = getRoom(params.slug);
  if (!room) notFound();

  return (
    <>
      {room.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(room.faqs)) }}
        />
      )}

      <Breadcrumbs
        trail={[
          { label: 'By Room', href: '/rooms/' },
          { label: room.room, href: `/rooms/${room.slug}/` },
        ]}
      />

      <section className="on-dark relative overflow-hidden bg-navy text-white">
        <div className="conduit-field absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-volt/25 blur-[90px]"
          aria-hidden="true"
        />
        <div className="shell relative py-14 sm:py-16 lg:py-20">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.08] text-amber">
            <Icon name={room.icon} className="h-6 w-6" />
          </span>
          <h1 className="mt-5 text-white">{room.title}</h1>
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75">
            {room.intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CallButton size="lg" tone="onDark" />
            <EmailButton
              size="lg"
              tone="onDark"
              label="Request service"
              subject={`${room.room} electrical work – ${business.shortName}`}
            />
          </div>
        </div>
      </section>

      {/* Circuit-directory listing — the site's signature layout */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="What we do here"
            title={`${room.room} electrical services`}
            lead="Each item links through to the full service page where one exists."
          />

          <ul className="mt-9 grid gap-3 lg:grid-cols-2">
            {room.items.map((item, i) => {
              const svc = item.service ? getService(item.service) : undefined;
              const inner = (
                <>
                  <CircuitTag n={i * 2 + 1} />
                  <span className="flex-1">
                    <span className="block font-display text-[0.9688rem] font-semibold text-navy">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-[0.9063rem] leading-relaxed text-slate">
                      {item.detail}
                    </span>
                  </span>
                </>
              );
              return (
                <li key={item.label}>
                  {svc ? (
                    <Link
                      href={`/services/${svc.slug}/`}
                      className="card card-hover flex items-start gap-3.5 p-4 no-underline sm:p-5"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div className="card flex items-start gap-3.5 p-4 sm:p-5">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-mist section">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            eyebrow="Worth knowing"
            title="Things that shape the work in this room"
            lead="Requirements and constraints that come up repeatedly here."
          />
          <CheckList items={room.considerations} />
        </div>
      </section>

      {room.faqs.length > 0 && (
        <section className="section">
          <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
            <SectionHeading eyebrow="Questions" title={`${room.room} questions`} />
            <FaqAccordion faqs={room.faqs} />
          </div>
        </section>
      )}

      <section className="section-tight border-t border-slate-100">
        <div className="shell">
          <p className="eyebrow">Other rooms</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {roomServices
              .filter((r) => r.slug !== room.slug)
              .map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/rooms/${r.slug}/`}
                    className="inline-flex rounded-lg border border-slate-100 px-3.5 py-2 text-[0.875rem] text-graphite no-underline hover:border-volt-200 hover:text-volt"
                  >
                    {r.room}
                  </Link>
                </li>
              ))}
          </ul>
          <div className="mt-8">
            <TextLink href="/services/">Full service catalogue</TextLink>
          </div>
        </div>
      </section>

      <ContactPanel subject={`${room.room} electrical work – ${business.shortName}`} />
    </>
  );
}
