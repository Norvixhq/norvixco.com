import LegalPage from '@/components/LegalPage';
import { business, addressLine } from '@/data/business';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: `How ${business.name} handles information in connection with this website.`,
  path: '/privacy/',
});

export default function Privacy() {
  return (
    <LegalPage
      label="Privacy"
      title="Privacy Policy"
      lead="How information is handled in connection with this website."
      note="Template pending review. This policy describes how the website is actually built, but it has not been reviewed by a legal professional and should be before launch."
      sections={[
        {
          heading: 'What this website collects',
          paragraphs: [
            'This website does not collect personal information. There is no contact form, no newsletter signup, no account system and no comment facility. Nothing on this site sends information to us or to any third party when you visit a page.',
            'The site sets no cookies of its own and runs no analytics or advertising trackers.',
          ],
        },
        {
          heading: 'When you contact us',
          paragraphs: [
            'The telephone and email links on this site open your own phone dialler or mail application. Anything you choose to send us that way — your name, phone number, address and a description of the work — is information you supply directly, and we use it only to respond to your enquiry and carry out any work you ask for.',
            'We do not sell contact information, and we do not pass it to third parties for marketing.',
          ],
        },
        {
          heading: 'Third-party services',
          paragraphs: [
            'Two external services are referenced from this site and are worth naming.',
          ],
          list: [
            'Web fonts are loaded from Google Fonts, which means your browser requests those font files from Google when a page loads.',
            'Map links open Google Maps in a new tab. Nothing is sent to Google unless you follow one of those links.',
          ],
        },
        {
          heading: 'Hosting',
          paragraphs: [
            'Like almost all web servers, the hosting provider may keep standard server logs recording requests. Those logs are held by the hosting provider under their own terms.',
          ],
        },
        {
          heading: 'Changes to this policy',
          paragraphs: [
            'If the site changes in a way that affects this policy — for example if a form or analytics were added — this page should be updated to reflect that.',
          ],
        },
        {
          heading: 'Contact',
          paragraphs: [
            `Questions about this policy can be directed to ${business.name} on ${business.phoneDisplay}, or by post to ${addressLine}.`,
          ],
        },
      ]}
    />
  );
}
