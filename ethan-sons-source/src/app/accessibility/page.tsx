import LegalPage from '@/components/LegalPage';
import { business } from '@/data/business';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Accessibility',
  description: `Accessibility commitments and known considerations for the ${business.name} website.`,
  path: '/accessibility/',
});

export default function Accessibility() {
  return (
    <LegalPage
      label="Accessibility"
      title="Accessibility"
      lead="What has been done to make this site usable for everyone, and how to tell us when it falls short."
      sections={[
        {
          heading: 'Our approach',
          paragraphs: [
            'This site is built to be usable with a keyboard, with a screen reader, at high zoom levels, and by people who find motion uncomfortable. Accessibility was part of how it was built rather than something added afterwards.',
          ],
        },
        {
          heading: 'What has been implemented',
          paragraphs: ['Specifically, the following are in place across the site.'],
          list: [
            'Colour combinations meeting WCAG 2.1 AA contrast ratios for text — white on navy at 15.6:1, white on the interactive blue at 6.3:1',
            'A visible focus indicator on every interactive element, with a variant tuned for dark sections',
            'A skip-to-content link as the first focusable element on every page',
            'Full keyboard operation, including the navigation menus and the FAQ accordions',
            'Semantic headings with a single H1 per page, and landmark regions for navigation, main content and footer',
            'Accessible names on all icon-only controls, and decorative graphics hidden from assistive technology',
            'Motion and transitions suppressed when the operating system requests reduced motion',
            'Layouts that reflow without horizontal scrolling down to narrow mobile widths and at high zoom',
            'Touch targets sized for comfortable use on mobile devices',
          ],
        },
        {
          heading: 'Known considerations',
          paragraphs: [
            'Map links open Google Maps, an external service whose accessibility we do not control.',
            'Telephone and email links hand off to your device\u2019s own dialler and mail application, which are outside this site.',
          ],
        },
        {
          heading: 'Telling us about a problem',
          paragraphs: [
            `If any part of this site is difficult to use, we would like to know. Call ${business.phoneDisplay} and describe what you encountered, including the page and the device or assistive technology you were using.`,
          ],
        },
      ]}
    />
  );
}
