import LegalPage from '@/components/LegalPage';
import { business } from '@/data/business';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Terms of Service',
  description: `Terms governing use of the ${business.name} website.`,
  path: '/terms/',
});

export default function Terms() {
  return (
    <LegalPage
      label="Terms"
      title="Terms of Service"
      lead="Terms governing use of this website."
      note="Template pending review. These terms have not been reviewed by a legal professional and should be before launch."
      sections={[
        {
          heading: 'About this website',
          paragraphs: [
            `This website is operated by ${business.name}. By using it, you agree to these terms.`,
          ],
        },
        {
          heading: 'Information is general, not advice',
          paragraphs: [
            'The service descriptions, guides and answers on this site are general information about electrical work. They are not a diagnosis of any particular situation and are not a substitute for an electrician examining your property.',
            'Electrical systems vary enormously between properties, and a symptom that means one thing in one building can mean something quite different in another. Do not rely on this site to decide whether something in your property is safe.',
          ],
        },
        {
          heading: 'No quotation or pricing',
          paragraphs: [
            'Nothing on this site constitutes a quotation or an estimate. Cost depends on equipment, wiring conditions, access, electrical capacity and the scope of work, and can only be discussed once those are known.',
          ],
        },
        {
          heading: 'Safety',
          paragraphs: [
            'Where this site describes hazards or symptoms, it does so to help you recognise when to call a professional — not to enable you to carry out electrical work yourself. Working on electrical systems without appropriate training carries risk of injury, fire and death.',
            'In an emergency involving smoke, sparking or fire, call 911. For a downed power line, stay clear and call 911 and the utility.',
          ],
        },
        {
          heading: 'Accuracy and availability',
          paragraphs: [
            'We aim to keep this site accurate and current, but we do not warrant that it is free of errors or that it will always be available. Codes and requirements change, and content may not always reflect the most recent revision.',
          ],
        },
        {
          heading: 'External links',
          paragraphs: [
            'This site links to external services such as mapping providers. We are not responsible for the content or practices of external sites.',
          ],
        },
        {
          heading: 'Contact',
          paragraphs: [
            `Questions about these terms can be directed to ${business.name} on ${business.phoneDisplay}.`,
          ],
        },
      ]}
    />
  );
}
