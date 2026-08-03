import Link from 'next/link';
import { Phone, Mail, MapPin, ExternalLink, ClipboardList } from 'lucide-react';
import {
  business, telHref, addressLine, mapsLink, primaryMailto, defaultMailBody,
} from '@/data/business';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactPanel from '@/components/ContactPanel';
import { SectionHeading, CheckList, SafetyNote, PlaceholderNote } from '@/components/ui';
import { CallButton, EmailButton } from '@/components/CTAButtons';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact Us',
  description: `Contact ${business.name} in Addison, TX. Call (469) 425-8874 or send service details by email.`,
  path: '/contact/',
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs trail={[{ label: 'Contact', href: '/contact/' }]} />

      <section className="section-tight">
        <div className="shell">
          <SectionHeading
            as="h1"
            eyebrow="Get in touch"
            title="Contact us"
            lead="Calling is the fastest way to reach us. There is no contact form on this site — the phone and email links below go directly through."
          />
        </div>
      </section>

      <section className="pb-14 sm:pb-20">
        <div className="shell grid gap-6 lg:grid-cols-3">
          <div className="card flex flex-col p-7">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-volt-50 text-volt">
              <Phone className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-[1.2rem]">Call</h2>
            <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-slate">
              The quickest route. Describing the symptom is usually enough for us to know what the
              visit involves.
            </p>
            <a
              href={telHref}
              className="mt-5 font-mono text-[1.35rem] font-medium text-navy no-underline hover:text-volt"
            >
              {business.phoneDisplay}
            </a>
            <div className="mt-5">
              <CallButton className="w-full" showNumber={false} label="Call now" />
            </div>
          </div>

          <div className="card flex flex-col p-7">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-volt-50 text-volt">
              <Mail className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-[1.2rem]">Email</h2>
            <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-slate">
              Opens your own mail app with a short checklist already filled in, so nothing important
              gets left out of the first message.
            </p>
            <div className="mt-5">
              <EmailButton className="w-full" label="Open email" />
            </div>
          </div>

          <div className="card flex flex-col p-7">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-volt-50 text-volt">
              <MapPin className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-[1.2rem]">Office</h2>
            <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-slate">{addressLine}</p>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-100 px-5 py-3 font-display text-[0.95rem] font-semibold text-navy no-underline hover:border-volt-200 hover:text-volt"
            >
              Directions
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-mist section">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Before you call"
              title="What helps us help you faster"
              lead="None of this is required — but having it to hand usually shortens the conversation considerably."
            />
            <div className="mt-8">
              <CheckList
                items={[
                  'What the symptom is, as precisely as you can describe it',
                  'Where in the property it is happening',
                  'When it started, and whether anything changed beforehand',
                  'Whether it is constant or intermittent',
                  'Approximate age of the property',
                  'Whether it is a home or a business premises',
                ]}
              />
            </div>
          </div>

          <div>
            <div className="card p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <ClipboardList className="h-5 w-5 text-volt" strokeWidth={1.8} aria-hidden="true" />
                <p className="font-display text-[1rem] font-semibold text-navy">
                  What the email link pre-fills
                </p>
              </div>
              <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg bg-mist p-4 font-mono text-[0.8125rem] leading-relaxed text-slate">
{defaultMailBody}
              </pre>
              <a
                href={primaryMailto}
                className="mt-5 inline-flex items-center gap-2 font-display text-[0.9375rem] font-semibold text-volt no-underline hover:underline"
              >
                Open this in your mail app
              </a>
            </div>

            <div className="mt-5">
              <SafetyNote title="If it is an emergency">
                <p>
                  For smoke, sparking or fire, call 911 first. For a downed power line, stay well
                  clear, keep others clear, and call 911 and the utility — a line on the ground can
                  energise the ground around it.
                </p>
              </SafetyNote>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell max-w-prose">
          <p className="eyebrow">To be confirmed</p>
          <div className="mt-4 space-y-3">
            <PlaceholderNote>Business hours: {business.hours.placeholder}</PlaceholderNote>
            <PlaceholderNote>
              Email address is currently the placeholder {business.contactEmail} and needs replacing
              with the live address before launch.
            </PlaceholderNote>
          </div>
          <p className="mt-5 text-[0.875rem] leading-relaxed text-slate">
            See the{' '}
            <Link href="/faq/" className="link-quiet">
              FAQ page
            </Link>{' '}
            for answers to the questions we get asked most often.
          </p>
        </div>
      </section>

      <ContactPanel compact />
    </>
  );
}
