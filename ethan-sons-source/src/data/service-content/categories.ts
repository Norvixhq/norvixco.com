import type { ServiceCategory } from '../types';

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'repairs',
    slug: 'repairs-and-troubleshooting',
    title: 'Electrical Repairs and Troubleshooting',
    navTitle: 'Repairs & Troubleshooting',
    blurb: 'Finding the cause of a fault, then correcting it properly.',
    intro:
      'Most electrical calls start the same way: something stopped working, or something started behaving oddly. Troubleshooting is the part of the job that separates a lasting repair from a temporary one, because a breaker that trips or an outlet that goes dead is a symptom rather than the problem itself.',
  },
  {
    id: 'installations',
    slug: 'installations',
    title: 'Electrical Installations',
    navTitle: 'Installations',
    blurb: 'Adding outlets, fixtures, circuits and devices to an existing system.',
    intro:
      'Adding to an electrical system means working within what is already there. Every new outlet, fixture or circuit draws from a panel with a finite capacity, so a good installation accounts for the load the house already carries as well as the load being added.',
  },
  {
    id: 'upgrades',
    slug: 'upgrades',
    title: 'Electrical Upgrades',
    navTitle: 'Upgrades',
    blurb: 'Bringing older systems up to the demands of a modern household.',
    intro:
      'Homes built for a handful of appliances now run air conditioning, induction ranges, home offices, media equipment and increasingly a vehicle charger. Upgrade work closes the gap between what a system was designed to carry and what it is being asked to carry today.',
  },
  {
    id: 'power',
    slug: 'ev-generator-and-high-demand-power',
    title: 'EV, Generator and High-Demand Power',
    navTitle: 'EV, Generator & High-Demand',
    blurb: 'Vehicle charging, standby power and dedicated appliance circuits.',
    intro:
      'High-demand equipment behaves differently from ordinary plug loads. A vehicle charger or an electric range can draw heavily for hours at a time, which makes panel capacity, conductor sizing and breaker selection the central questions rather than afterthoughts.',
  },
  {
    id: 'lighting',
    slug: 'lighting',
    title: 'Lighting Services',
    navTitle: 'Lighting',
    blurb: 'Interior, exterior and controlled lighting, planned and installed.',
    intro:
      'Lighting is the electrical work people actually see every day. Good results come from planning layout, colour temperature and switching before anything is cut into a ceiling, and from wiring controls so the room is comfortable to use rather than merely lit.',
  },
  {
    id: 'safety',
    slug: 'safety',
    title: 'Electrical Safety',
    navTitle: 'Safety',
    blurb: 'Inspections, protective devices and correcting unsafe conditions.',
    intro:
      'Electrical safety work is mostly preventive. Inspections, grounding, GFCI and surge protection all exist to catch conditions before they cause damage, and they are the services most often deferred simply because nothing has gone wrong yet.',
  },
  {
    id: 'smart',
    slug: 'smart-home-and-low-voltage',
    title: 'Smart Home and Low-Voltage Support',
    navTitle: 'Smart Home & Low-Voltage',
    blurb: 'Connected devices, network cabling and media wiring.',
    intro:
      'Connected devices depend on two things people rarely think about until something fails: reliable power at the device, and reliable data getting to it. Smart switches need a neutral, cameras need power where there is none, and streaming works better on cable than on a distant access point.',
  },
  {
    id: 'commercial',
    slug: 'commercial',
    title: 'Commercial Electrical Services',
    navTitle: 'Commercial',
    blurb: 'Offices, retail, restaurants and tenant spaces.',
    intro:
      'Commercial electrical work carries a constraint residential work usually does not: the space has to keep operating. Scheduling around business hours, staging work in occupied suites and correcting conditions flagged during a lease or inspection are as much a part of the job as the wiring itself.',
  },
];
