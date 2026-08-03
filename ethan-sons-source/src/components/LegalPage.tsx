import Breadcrumbs from './Breadcrumbs';
import ContactPanel from './ContactPanel';
import { SectionHeading, PlaceholderNote } from './ui';

export type LegalSection = { heading: string; paragraphs: string[]; list?: string[] };

export default function LegalPage({
  label,
  title,
  lead,
  sections,
  note,
}: {
  label: string;
  title: string;
  lead: string;
  sections: LegalSection[];
  note?: string;
}) {
  return (
    <>
      <Breadcrumbs trail={[{ label, href: `/${label.toLowerCase().replace(/\s+/g, '-')}/` }]} />

      <section className="section-tight">
        <div className="shell">
          <SectionHeading as="h1" eyebrow={label} title={title} lead={lead} />
        </div>
      </section>

      <section className="pb-14 sm:pb-20">
        <div className="shell max-w-prose">
          {note && (
            <div className="mb-10">
              <PlaceholderNote>{note}</PlaceholderNote>
            </div>
          )}

          {sections.map((s) => (
            <section key={s.heading} className="mt-10 first:mt-0">
              <h2 className="text-[1.35rem]">{s.heading}</h2>
              <div className="prose-copy mt-4">
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              {s.list && (
                <ul className="mt-4 space-y-2">
                  {s.list.map((li) => (
                    <li
                      key={li}
                      className="flex gap-2.5 text-[0.9688rem] leading-relaxed text-graphite/90"
                    >
                      <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-volt" aria-hidden="true" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </section>

      <ContactPanel compact heading="Questions about this page?" />
    </>
  );
}
