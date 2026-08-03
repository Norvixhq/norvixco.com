import type { Faq, FaqGroup } from './types';

/**
 * Cost answers throughout follow the same rule: describe what drives the
 * number, never state one. No pricing appears anywhere on this site.
 */
export const faqGroups: FaqGroup[] = [
  {
    id: 'general',
    title: 'General questions',
    faqs: [
      {
        q: 'What areas do you serve?',
        a: 'Addison and the surrounding North Texas communities, including Farmers Branch, Carrollton, Richardson, Plano, Coppell, Irving, Lewisville, The Colony, Frisco and the North Dallas area. If you are near but not listed, call and ask.',
      },
      {
        q: 'How long have you been in business?',
        a: 'The company states it has been serving Texas for approximately six years.',
      },
      {
        q: 'Do you work on both homes and businesses?',
        a: 'Yes. Residential work covers everything from a single outlet to a full rewire, and commercial work covers offices, restaurants, retail and tenant improvement projects.',
      },
      {
        q: 'How much will my job cost?',
        a: 'Cost depends on equipment, wiring conditions, access, electrical capacity and the scope of work. Two jobs that sound identical can differ substantially once the existing conditions are visible. Call to discuss the specifics and we can talk through what is involved.',
      },
      {
        q: 'Do I need to be home for the work?',
        a: 'For most work, someone should be there to provide access and to point out the problem. Call to talk through arrangements for your particular job.',
      },
      {
        q: 'Can you tell me what is wrong over the phone?',
        a: 'Sometimes we can narrow it down, and describing the symptom clearly helps a great deal. Electrical faults are frequently not where they appear to be, though, so diagnosis usually needs someone on site with a meter.',
      },
    ],
  },
  {
    id: 'repairs',
    title: 'Repairs and troubleshooting',
    faqs: [
      {
        q: 'A breaker keeps tripping. Is that dangerous?',
        a: 'The breaker doing its job is not dangerous — that is what it is for. What matters is why. Repeated tripping means either the circuit is overloaded or there is a fault, and both should be investigated rather than lived with. Repeatedly resetting a breaker without finding the cause is the part to avoid.',
      },
      {
        q: 'Why do my lights flicker?',
        a: 'Causes range from a loose bulb to a loose neutral connection. If flickering affects multiple rooms, changes when large appliances start, or has appeared recently without explanation, it should be looked at promptly — loose connections generate heat.',
      },
      {
        q: 'Half my house lost power but the breakers look fine. What happened?',
        a: 'That pattern often points to a problem on one of the incoming legs of the service rather than a branch circuit — a main lug connection, or something on the utility side. It warrants investigation rather than breaker-flipping.',
      },
      {
        q: 'I smell burning near an outlet. What should I do?',
        a: 'Stop using it, switch off the circuit at the panel if you can do so safely, and call. If there is smoke, sparking or visible fire, call 911 first.',
      },
      {
        q: 'An outlet stopped working. Is that a big job?',
        a: 'Often not. A tripped GFCI elsewhere on the circuit, a failed device or a loose back-stabbed connection covers a large share of dead outlets. Finding which one it is takes a meter and a systematic approach.',
      },
    ],
  },
  {
    id: 'panels',
    title: 'Panels and capacity',
    faqs: [
      {
        q: 'How do I know if my panel needs upgrading?',
        a: 'Common signs are a fuse box rather than breakers, no space left for new circuits, a panel from a brand with known defects, rust or heat damage, or a service size too small for what the house now runs. Adding a major load such as vehicle charging often surfaces the issue.',
      },
      {
        q: 'What is a load calculation and why does it matter?',
        a: 'It is a structured way of working out what a service can actually support given the fixed loads already on it. It is what determines whether a new circuit can be added, and it is the step that keeps a panel from being quietly overloaded.',
      },
      {
        q: 'Are Federal Pacific, Zinsco or Challenger panels a problem?',
        a: 'These brands have known failure histories, which is why they come up so often in inspections. If you have one, having it assessed is reasonable — the concern is documented rather than speculative.',
      },
      {
        q: 'How long does a panel upgrade take?',
        a: 'It varies with the scope and with utility coordination, which is usually the part outside anyone\u2019s direct control. Call to talk through what your particular situation involves.',
      },
    ],
  },
  {
    id: 'outlets',
    title: 'Outlets, circuits and wiring',
    faqs: [
      {
        q: 'What is the difference between GFCI and AFCI protection?',
        a: 'GFCI protects people — it detects current leaking to ground, which is the shock hazard, and is required in wet and damp locations. AFCI protects the building — it detects the electrical signature of arcing in damaged wiring, which is a fire hazard. They address different risks and are not interchangeable.',
      },
      {
        q: 'Why does my GFCI keep tripping?',
        a: 'Either it is detecting genuine leakage — moisture in an outdoor device, a failing appliance — or the device itself has reached the end of its life. Both are worth resolving rather than replacing the device with a non-GFCI one, which removes the protection.',
      },
      {
        q: 'Can I add outlets to an existing circuit?',
        a: 'Sometimes, depending on the existing load and how the circuit is used. Where a circuit is already near capacity, a new one is the right answer instead. That is a judgement made from the actual load, not a rule of thumb.',
      },
      {
        q: 'What is aluminium branch wiring and should I be concerned?',
        a: 'Some homes from the mid-1960s to mid-1970s used aluminium for branch circuits. It expands and contracts differently from copper, which can loosen connections over time. There are recognised remediation methods; the first step is confirming whether you actually have it.',
      },
    ],
  },
  {
    id: 'lighting',
    title: 'Lighting',
    faqs: [
      {
        q: 'Why do my LED lights flicker or buzz on a dimmer?',
        a: 'Usually a compatibility issue. Many older dimmers were designed for incandescent loads and do not control LED drivers well. Matching the dimmer to the fixture, and keeping the load within the dimmer\u2019s rated range, resolves most cases.',
      },
      {
        q: 'How many recessed lights does a room need?',
        a: 'Fewer than most plans call for, placed better. Spacing depends on ceiling height, beam angle and what the room is used for. Lighting the working surfaces matters more than an even grid.',
      },
      {
        q: 'Can recessed lights be installed without attic access?',
        a: 'Yes, using remodel-rated housings designed for exactly that. Access affects the approach and the effort, not whether it can be done.',
      },
      {
        q: 'What colour temperature should I choose?',
        a: 'Warmer light suits living spaces and bedrooms; neutral suits kitchens, workshops and offices. The more important rule is consistency — mixing temperatures in one sightline is what makes lighting look wrong.',
      },
    ],
  },
  {
    id: 'ev',
    title: 'EV charging',
    faqs: [
      {
        q: 'What does installing a home EV charger involve?',
        a: 'A load calculation to confirm the service can support it, a dedicated circuit sized for continuous load, the run from the panel to the charger location, and the equipment installation itself. The load calculation is the step that determines everything else.',
      },
      {
        q: 'Can I plug a charger into a normal garage outlet?',
        a: 'A standard outlet only supports slow Level 1 charging, and the general-purpose garage circuit is not suitable for sustained draw. Level 2 charging requires its own dedicated circuit.',
      },
      {
        q: 'What if my panel does not have capacity?',
        a: 'There are usually options: a panel or service upgrade, or load-management equipment that lets charging share existing capacity intelligently. Which one makes sense depends on what the calculation shows.',
      },
      {
        q: 'Should the charger be hardwired or plug-in?',
        a: 'Both are common. Hardwiring suits a permanent installation and is sometimes required at higher amperages; a plug-in unit is easier to swap or take with you. The choice interacts with the circuit size and the equipment listing.',
      },
    ],
  },
  {
    id: 'generators',
    title: 'Generators and backup power',
    faqs: [
      {
        q: 'What is a transfer switch and why is it required?',
        a: 'It prevents generator power from feeding back into the utility lines, which is a lethal hazard to line workers and to your own equipment. Any permanent generator connection needs one. Running a generator through an appliance cord into a wall outlet is dangerous and should never be done.',
      },
      {
        q: 'Should I back up the whole house or selected circuits?',
        a: 'Selected circuits — heating and cooling, refrigeration, some lighting, well pumps, medical equipment — cover most needs at a smaller size. Whole-house backup costs more and needs a larger unit. Deciding what genuinely must stay on is the useful first step.',
      },
      {
        q: 'Can you connect a portable generator safely?',
        a: 'Yes, through a properly installed inlet and transfer switch. That arrangement is safe; back-feeding through an outlet is not.',
      },
    ],
  },
  {
    id: 'safety',
    title: 'Safety and inspections',
    faqs: [
      {
        q: 'What happens during an electrical safety inspection?',
        a: 'A systematic review of the service and panel, a sample of devices and connections, grounding and bonding, protection where it is required, and visible wiring conditions. You get a picture of what is sound, what is worn and what needs attention, ordered by seriousness.',
      },
      {
        q: 'When should I have an inspection done?',
        a: 'Reasonable triggers are buying an older home, a home over about forty years old that has never had one, before a significant remodel, after adding major loads, or when something has been behaving oddly.',
      },
      {
        q: 'What should I do if I see sparks or smell burning?',
        a: 'Switch off the circuit at the panel if you can do so safely and call. For smoke, sparking or fire, call 911 first. For a downed power line, stay well clear and call 911 and the utility — never approach it.',
      },
      {
        q: 'Are smoke alarms an electrical job?',
        a: 'Hardwired and interconnected alarms are. Interconnection matters — an alarm sounding in a distant part of the house may not be heard where it needs to be.',
      },
    ],
  },
  {
    id: 'smart',
    title: 'Smart home and low voltage',
    faqs: [
      {
        q: 'Why will my smart switch not work in this box?',
        a: 'Most smart switches need a neutral conductor to power their electronics. Older switch boxes frequently have only the hot and switch leg. There are workarounds, but checking what is in the box first avoids an unpleasant surprise.',
      },
      {
        q: 'Is wired networking still worth it?',
        a: 'For anything latency-sensitive — video calls, streaming to a media room, cameras — a wired drop removes an entire class of intermittent problem that no amount of wireless tuning fixes.',
      },
      {
        q: 'Can you power a video doorbell?',
        a: 'Yes, though many older doorbell transformers do not supply enough power for video units. Confirming or replacing the transformer is usually the actual job.',
      },
    ],
  },
  {
    id: 'commercial',
    title: 'Commercial work',
    faqs: [
      {
        q: 'Do you handle tenant improvement work?',
        a: 'Yes — reconfiguring an existing space for a new tenant, including lighting, power distribution, data and whatever the new layout requires.',
      },
      {
        q: 'Can work be scheduled outside business hours?',
        a: 'Scheduling around trading or operating hours is a normal part of commercial work. Call to discuss what your situation needs.',
      },
      {
        q: 'What is different about commercial electrical work?',
        a: 'Three-phase distribution, higher loads, different wiring methods, and requirements that vary by occupancy type. A restaurant, an office and a retail unit each have different demands.',
      },
    ],
  },
  {
    id: 'scheduling',
    title: 'Scheduling and next steps',
    faqs: [
      {
        q: 'How do I get in touch?',
        a: 'Calling is the fastest route. Every phone number on this site dials directly. The email buttons open your own mail app with a short checklist already filled in.',
      },
      {
        q: 'What information helps when I call?',
        a: 'What the symptom is, where in the property, when it started, whether anything changed beforehand, and the approximate age of the property. That is usually enough to know what a visit involves.',
      },
      {
        q: 'Do you have a contact form?',
        a: 'No. Calling or emailing reaches us directly, which is faster and means nothing gets lost in a queue.',
      },
    ],
  },
];

/** The homepage set — broad questions with the widest relevance. */
export const homepageFaqs: Faq[] = [
  faqGroups[0].faqs[0],
  faqGroups[0].faqs[3],
  faqGroups[1].faqs[0],
  faqGroups[1].faqs[1],
  faqGroups[2].faqs[0],
  faqGroups[3].faqs[0],
  faqGroups[5].faqs[0],
  faqGroups[7].faqs[0],
  faqGroups[10].faqs[2],
];

export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.faqs);
