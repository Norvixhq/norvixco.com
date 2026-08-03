import Link from 'next/link';
import { roomServices } from '@/data/roomServices';
import { Icon } from '@/components/Icon';
import { SectionHeading } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactPanel from '@/components/ContactPanel';
import { CallButton } from '@/components/CTAButtons';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Electrical Services by Room',
  description:
    'Electrical work room by room — kitchens, bathrooms, bedrooms, home offices, garages, laundry rooms, patios and media rooms in Addison, TX.',
  path: '/rooms/',
});

export default function RoomsHub() {
  return (
    <>
      <Breadcrumbs trail={[{ label: 'By Room', href: '/rooms/' }]} />

      <section className="on-dark relative overflow-hidden bg-navy text-white">
        <div className="conduit-field absolute inset-0" aria-hidden="true" />
        <div className="shell relative py-14 sm:py-16 lg:py-20">
          <SectionHeading
            as="h1"
            tone="dark"
            eyebrow="By room"
            title="Electrical work, room by room"
            lead="Each space has its own requirements. Kitchens and bathrooms carry the most specific ones; garages have quietly become the most electrically demanding room in most houses."
          />
          <div className="mt-8">
            <CallButton size="lg" tone="onDark" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {roomServices.map((room) => (
            <Link
              key={room.slug}
              href={`/rooms/${room.slug}/`}
              className="card card-hover group flex flex-col p-6 no-underline"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-volt-50 text-volt transition-colors group-hover:bg-volt group-hover:text-white">
                <Icon name={room.icon} className="h-[1.35rem] w-[1.35rem]" />
              </span>
              <h2 className="mt-4 text-[1.0625rem] leading-snug transition-colors group-hover:text-volt">
                {room.room}
              </h2>
              <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-slate">
                {room.summary}
              </p>
              <p className="mt-4 font-mono text-[0.75rem] uppercase tracking-wide text-slate-300">
                {room.items.length} services
              </p>
            </Link>
          ))}
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
