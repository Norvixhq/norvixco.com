import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { business, telHref, addressLine, mapsLink, mailtoHref, defaultMailBody } from '@/data/business';
import { CallButton, EmailButton } from './CTAButtons';
import { SectionHeading } from './ui';

/**
 * The site's contact surface. Three routes out: dialler, mail client, maps.
 * No form element exists here or anywhere else on the site.
 */
export default function ContactPanel({
  subject,
  heading = 'Talk to an electrician',
  lead,
  compact = false,
}: {
  subject?: string;
  heading?: string;
  lead?: string;
  compact?: boolean;
}) {
  return (
    <section
      id="contact"
      className="on-dark relative overflow-hidden bg-navy text-white"
      aria-labelledby="contact-heading"
    >
      <div className="conduit-field absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-volt/20 blur-3xl"
        aria-hidden="true"
      />

      <div className={`shell relative ${compact ? 'section-tight' : 'section'}`}>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Get in touch"
              tone="dark"
              title={<span id="contact-heading">{heading}</span>}
              lead={
                lead ??
                'Describe the problem or the project and we can talk through what it involves. Calling is the fastest way to reach us.'
              }
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CallButton size="lg" tone="onDark" />
              <EmailButton
                size="lg"
                tone="onDark"
                subject={subject}
                label="Send service details"
              />
            </div>

            <p className="mt-5 max-w-md text-[0.875rem] leading-relaxed text-white/50">
              The email button opens your own mail app with a short checklist already filled in, so
              nothing important gets left out of the first message.
            </p>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/[0.04] p-6 shadow-panel sm:p-8">
            <p className="eyebrow-dark">Contact details</p>

            <dl className="mt-5 space-y-5">
              <div className="flex gap-3.5">
                <Phone className="mt-0.5 h-[1.15rem] w-[1.15rem] shrink-0 text-amber" strokeWidth={2} aria-hidden="true" />
                <div>
                  <dt className="text-[0.8125rem] uppercase tracking-wide text-white/45">Phone</dt>
                  <dd className="mt-0.5">
                    <a href={telHref} className="font-mono text-[1.0625rem] text-white no-underline hover:text-amber">
                      {business.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-3.5">
                <Mail className="mt-0.5 h-[1.15rem] w-[1.15rem] shrink-0 text-amber" strokeWidth={1.8} aria-hidden="true" />
                <div>
                  <dt className="text-[0.8125rem] uppercase tracking-wide text-white/45">Email</dt>
                  <dd className="mt-0.5">
                    <a
                      href={mailtoHref({ subject, body: defaultMailBody })}
                      className="text-[0.9688rem] text-white no-underline hover:text-amber"
                    >
                      Open a pre-filled service request
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-3.5">
                <MapPin className="mt-0.5 h-[1.15rem] w-[1.15rem] shrink-0 text-amber" strokeWidth={1.8} aria-hidden="true" />
                <div>
                  <dt className="text-[0.8125rem] uppercase tracking-wide text-white/45">Office</dt>
                  <dd className="mt-0.5 text-[0.9688rem] leading-relaxed text-white/80">
                    {addressLine}
                    <a
                      href={mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1.5 text-[0.875rem] text-amber no-underline hover:underline"
                    >
                      Directions
                      <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-3.5 border-t border-white/10 pt-5">
                <div>
                  <dt className="text-[0.8125rem] uppercase tracking-wide text-white/45">Hours</dt>
                  <dd className="mt-1 text-[0.9375rem] leading-relaxed text-white/60">
                    {business.hours.placeholder}
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
