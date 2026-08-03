import { serviceCategories, servicesInCategory } from './services';
import { locations } from './locations';
import { roomServices } from './roomServices';

export type NavLink = { label: string; href: string; note?: string };
export type NavColumn = { heading: string; href?: string; links: NavLink[] };

/**
 * The header mega menu is generated from the data layer, so a new service file
 * appears in navigation automatically and can never fall out of sync.
 */
export const servicesMenu: NavColumn[] = serviceCategories.map((cat) => ({
  heading: cat.navTitle,
  href: `/services/${cat.slug}/`,
  links: servicesInCategory(cat.id)
    .slice(0, 7)
    .map((s) => ({ label: s.navTitle, href: `/services/${s.slug}/` })),
}));

export const areasMenu: NavColumn[] = [
  {
    heading: 'Primary service area',
    href: '/service-areas/',
    links: locations
      .filter((l) => !l.isDistrict)
      .slice(0, 8)
      .map((l) => ({ label: l.city, href: `/service-areas/${l.slug}/` })),
  },
  {
    heading: 'Neighbouring cities',
    links: locations
      .filter((l) => !l.isDistrict)
      .slice(8)
      .map((l) => ({ label: l.city, href: `/service-areas/${l.slug}/` })),
  },
  {
    heading: 'Districts and neighbourhoods',
    links: locations
      .filter((l) => l.isDistrict)
      .map((l) => ({ label: l.city, href: `/service-areas/${l.slug}/` })),
  },
];

export const roomsMenu: NavColumn[] = [
  {
    heading: 'Inside the home',
    href: '/rooms/',
    links: roomServices.slice(0, 5).map((r) => ({ label: r.room, href: `/rooms/${r.slug}/` })),
  },
  {
    heading: 'Utility and outdoor',
    links: roomServices.slice(5).map((r) => ({ label: r.room, href: `/rooms/${r.slug}/` })),
  },
];

export type TopLevelItem = {
  label: string;
  href: string;
  menu?: NavColumn[];
  /** Layout hint for the mega panel. */
  width?: 'wide' | 'medium';
};

export const primaryNav: TopLevelItem[] = [
  { label: 'Services', href: '/services/', menu: servicesMenu, width: 'wide' },
  { label: 'By Room', href: '/rooms/', menu: roomsMenu, width: 'medium' },
  { label: 'Service Areas', href: '/service-areas/', menu: areasMenu, width: 'medium' },
  { label: 'Resources', href: '/resources/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerNav: NavColumn[] = [
  {
    heading: 'Popular Services',
    links: [
      { label: 'Electrical Repair', href: '/services/electrical-repair/' },
      { label: 'Panel Upgrades', href: '/services/electrical-panel-upgrade/' },
      { label: 'EV Charger Installation', href: '/services/ev-charger-installation/' },
      { label: 'Lighting Installation', href: '/services/lighting-installation/' },
      { label: 'Outlets & Dedicated Circuits', href: '/services/outlet-and-dedicated-circuits/' },
      { label: 'Safety Inspections', href: '/services/electrical-safety-inspection/' },
      { label: 'Surge Protection', href: '/services/whole-home-surge-protection/' },
      { label: 'Commercial Electrician', href: '/services/commercial-electrician/' },
    ],
  },
  {
    heading: 'Service Areas',
    links: [
      { label: 'Addison', href: '/service-areas/addison/' },
      { label: 'Farmers Branch', href: '/service-areas/farmers-branch/' },
      { label: 'Carrollton', href: '/service-areas/carrollton/' },
      { label: 'North Dallas', href: '/service-areas/north-dallas/' },
      { label: 'Richardson', href: '/service-areas/richardson/' },
      { label: 'Plano', href: '/service-areas/plano/' },
      { label: 'Coppell', href: '/service-areas/coppell/' },
      { label: 'All areas served', href: '/service-areas/' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Contact', href: '/contact/' },
      { label: 'Electrical Resources', href: '/resources/' },
      { label: 'Frequently Asked Questions', href: '/faq/' },
      { label: 'Services by Room', href: '/rooms/' },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy/' },
  { label: 'Terms of Service', href: '/terms/' },
  { label: 'Accessibility', href: '/accessibility/' },
];
