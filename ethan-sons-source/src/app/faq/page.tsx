import Link from 'next/link';
import { faqGroups, allFaqs } from '@/data/faqs';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactPanel from '@/components/ContactPanel';
import FaqAccordion from '@/components/FaqAccordion';
import { SectionHeading } from '@/components/ui';
import { CallButton } from '@/components/CTAButtons';
import { buildMetadata } from '@/lib/seo';
import { faqSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Answers to common electrical questions — tripping breakers, panel capacity, GFCI and AFCI protection, EV charging, generators, lighting and commercial work.',
  path: '/faq/',
});

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(allFaqs)) }}
      />

      <Breadcrumbs trail={[{ label: 'FAQ', href: '/faq/' }]} />

      <section className="on-dark relative overflow-hidden bg-navy text-white">
        <div className="conduit-field absolute inset-0" aria-hidden="true" />
        <div className="shell relative py-14 sm:py-16 lg:py-20">
          <SectionHeading
            as="h1"
            tone="dark"
            eyebrow="Common questions"
            title="Frequently asked questions"
            lead={`${allFaqs.length} answers across ${faqGroups.length} topics. If yours is not here, calling is the fastest way to get an answer.`}
          />
          <div className="mt-8">
            <CallButton size="lg" tone="onDark" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[0.3fr_0.7fr] lg:gap-16">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">Topics</p>
            <ul className="mt-4 space-y-1.5">
              {faqGroups.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    className="block rounded-md px-2 py-1.5 -mx-2 text-[0.9375rem] text-graphite no-underline hover:bg-mist hover:text-volt"
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-14">
            {faqGroups.map((g) => (
              <section key={g.id} id={g.id} className="scroll-mt-32">
                <h2 className="text-[1.45rem]">{g.title}</h2>
                <div className="mt-5">
                  <FaqAccordion faqs={g.faqs} defaultOpen={null} />
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist section-tight">
        <div className="shell max-w-prose text-center">
          <p className="text-[1.0625rem] leading-relaxed text-graphite/90">
            Looking for something more specific? Every{' '}
            <Link href="/services/" className="link-quiet">
              service page
            </Link>{' '}
            has its own questions, and the{' '}
            <Link href="/resources/" className="link-quiet">
              resources section
            </Link>{' '}
            covers the common problems in more depth.
          </p>
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
