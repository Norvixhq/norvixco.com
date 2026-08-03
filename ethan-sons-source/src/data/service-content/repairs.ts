import type { Service } from '../types';

export const repairServices: Service[] = [
  /* ------------------------------------------------------------------ *
   * CATEGORY 1 — REPAIRS AND TROUBLESHOOTING
   * ------------------------------------------------------------------ */
  {
    slug: 'electrical-repair',
    title: 'Electrical Repair in Addison, TX',
    navTitle: 'Electrical Repair',
    category: 'repairs',
    featured: true,
    icon: 'Wrench',
    metaTitle: 'Electrical Repair in Addison, TX | Ethan & Sons Electricians',
    metaDescription:
      'Electrical repair and troubleshooting for Addison homes and businesses — dead outlets, tripping breakers, flickering lights and failed circuits. Call (469) 425-8874.',
    summary:
      'Tracing faults back to their source and correcting the wiring, device or connection responsible.',
    intro:
      'Electrical problems in Addison properties tend to fall into a few recognisable patterns, shaped by when the building went up. A 1980s home near Beltway Drive shows different faults than a recently finished townhome off Arapaho, and a suite in a Westgrove Drive office building shows different faults again. Repair work starts by reading those clues.',
    overview: [
      'A repair call is really two jobs. The first is diagnosis: working back from the symptom to whatever is actually causing it. The second is the correction itself, which is usually the shorter half. Skipping the first and replacing the obvious component is how the same fault reappears a month later.',
      'Faults hide in predictable places. Backstabbed outlet connections loosen over years of thermal cycling. Aluminium branch wiring in mid-century homes loosens at terminations. Junction boxes get buried behind drywall during a remodel and are never opened again. Neutral connections corrode in damp exterior boxes. Each leaves a different fingerprint, and the fingerprint is what points to the fix.',
      'Some repairs end at a single device. Others reveal that a circuit is carrying more than it was designed for, or that a previous alteration was never done to code. In those cases the honest answer is that the repair is a starting point and the underlying condition should be addressed separately, and that is what a customer deserves to hear before work begins.',
    ],
    reasons: [
      'An outlet or a group of outlets stopped working with no obvious cause',
      'A breaker trips repeatedly and resets for a while before tripping again',
      'Lights flicker or dim when a large appliance cycles on',
      'A switch, outlet or fixture feels warm or has discoloured',
      'Half the house lost power while the rest stayed on',
      'Work from a previous owner or contractor looks incorrect',
      'A home inspection flagged an electrical condition before a sale',
    ],
    signs: [
      'A faint burning or fishy smell near a device or panel',
      'Buzzing, crackling or humming from a switch, outlet or panel',
      'Scorch marks, melting or discolouration around a receptacle',
      'Outlets that no longer grip a plug firmly',
      'A breaker that feels hot or will not reset',
      'Shocks or tingling when touching an appliance or fixture',
    ],
    benefits: [
      'The cause is identified rather than the symptom being masked',
      'Loose and overheating connections are corrected before they progress',
      'Repairs are made with correctly rated devices and conductors',
      'Related conditions found during diagnosis are flagged clearly',
      'Documentation of what was found and what was changed',
    ],
    considerations: [
      'Access matters — finished walls, tight attics and slab foundations change the approach',
      'Older wiring methods may require a different repair path than modern cable',
      'Some faults are intermittent and need the condition present to be located',
      'Panels from certain discontinued manufacturers warrant a closer look',
      'A repair that keeps expanding is often a signal that a circuit needs redesigning',
    ],
    safety: [
      'If you smell burning, see smoke or see sparking, leave the area and call 911 before calling an electrician.',
      'For a downed line or damage at the meter, contact the utility provider — that equipment is theirs, not the property owner\u2019s.',
      'A breaker that trips immediately after being reset is doing its job; leave it off until the circuit has been checked.',
      'Do not replace a breaker with a higher-amperage one to stop nuisance tripping. The breaker protects the wire, and the wire has not changed.',
    ],
    residential: [
      'Dead outlets and partially dead circuits',
      'Failed switches, dimmers and three-way circuits',
      'Ceiling fan and fixture wiring faults',
      'Exterior and garage receptacle failures',
      'GFCI devices that will not reset',
      'Wiring corrections in older Addison-area homes',
    ],
    commercial: [
      'Lighting circuits down in an office suite or retail floor',
      'Nuisance tripping on equipment circuits',
      'Receptacles failing in a break room or kitchen',
      'Corrections to conditions flagged during a lease inspection',
      'Troubleshooting after a tenant build-out',
    ],
    whyPro:
      'The risk in electrical repair is not the visible spark, it is the connection that runs warm inside a wall for years. Locating that requires testing under load, reading a panel correctly and knowing which wiring methods behave which way as they age.',
    related: [
      'outlet-repair',
      'tripping-breaker-repair',
      'flickering-light-repair',
      'circuit-breaker-replacement',
      'electrical-safety-inspection',
      'electrical-panel-upgrade',
    ],
    faqs: [
      {
        q: 'How long does an electrical repair take?',
        a: 'It depends almost entirely on how long diagnosis takes. A failed device on an accessible circuit is often short work. An intermittent fault on a circuit that runs through finished walls can take considerably longer to isolate. Call to describe what you are seeing and we can talk through the likely scope.',
      },
      {
        q: 'What does an electrical repair cost?',
        a: 'The cost depends on the equipment involved, the condition of the existing wiring, how accessible the circuit is, the available electrical capacity and the overall scope of work. Call (469) 425-8874 to discuss the specifics of your situation.',
      },
      {
        q: 'A breaker keeps tripping. Can I just keep resetting it?',
        a: 'Resetting once is reasonable. Resetting repeatedly is not. The breaker is responding to either an overload or a fault, and both get worse with repeated cycling. Leave it off and have the circuit checked.',
      },
      {
        q: 'Only some of my outlets stopped working. Is that a big problem?',
        a: 'Not necessarily, but it is worth investigating. Partial loss usually points to one shared connection failing — a tripped GFCI upstream, a loose neutral, or a failed device that other outlets feed through. Those are fixable, but a loose connection carrying current is exactly the condition that should not be left alone.',
      },
      {
        q: 'Do you repair work that another contractor did?',
        a: 'Yes. Corrections to earlier work are a common request, particularly in homes that have been remodelled more than once. We will tell you plainly what we find.',
      },
      {
        q: 'Can you repair aluminium branch wiring?',
        a: 'Aluminium branch circuit wiring, common in homes from the mid-1960s to the mid-1970s, needs specific connection methods rather than ordinary devices. It is repairable, but it is a different job from repairing copper wiring and should be treated as such.',
      },
    ],
  },
  {
    slug: 'outlet-repair',
    title: 'Outlet Repair in Addison, TX',
    navTitle: 'Outlet Repair',
    category: 'repairs',
    icon: 'Plug',
    metaTitle: 'Outlet Repair in Addison, TX | Ethan & Sons Electricians',
    metaDescription:
      'Dead, loose, warm or sparking outlets repaired for Addison homes and businesses. Diagnosis of the circuit, not just the receptacle. Call (469) 425-8874.',
    summary: 'Dead, loose, warm or sparking receptacles diagnosed and corrected at the source.',
    intro:
      'A receptacle that has quit is the most common electrical call there is, and also the one most often misread. The outlet is frequently fine — what has failed is a connection somewhere upstream of it, which is why swapping the device sometimes changes nothing at all.',
    overview: [
      'Receptacles wear out in specific ways. The internal contacts lose tension after years of plugs going in and out, so cords sag and arcing begins at the blade. Push-in back connections, which grip the conductor with a small spring, relax as the copper expands and contracts. Either condition produces heat, and heat is what turns a minor fault into a serious one.',
      'The diagnosis matters more than the part. If several outlets went dead together, the failure is at whichever device the others feed through, or at a GFCI further upstream that has tripped. If a single outlet is warm, the connection at that box is the suspect. Testing tells you which story you are in.',
    ],
    reasons: [
      'One outlet or a run of outlets has gone completely dead',
      'A plug falls out or only works when held at an angle',
      'The faceplate or receptacle is warm to the touch',
      'Visible scorching, browning or melted plastic',
      'A two-prong outlet needs to be made safe for grounded equipment',
      'A GFCI outlet trips constantly or will not reset',
    ],
    signs: [
      'Buzzing or crackling when a plug is inserted',
      'Intermittent power to a lamp or appliance when the cord is moved',
      'A faint plastic or burning smell near the outlet',
      'Sparks beyond the brief snap of a large appliance connecting',
    ],
    benefits: [
      'The actual point of failure is located rather than guessed at',
      'Loose terminations are corrected before they overheat further',
      'Worn devices are replaced with correctly rated receptacles',
      'Grounding and polarity are verified, not assumed',
      'Tamper-resistant devices can be fitted where children are present',
    ],
    considerations: [
      'Back-stabbed connections are usually re-terminated to the side screws',
      'Kitchens, bathrooms, garages, exteriors and laundry areas need GFCI protection',
      'Ungrounded two-prong circuits have several correction paths with different costs',
      'Boxes that are overfilled need to be addressed as part of the repair',
    ],
    safety: [
      'Stop using an outlet that is warm, discoloured or smells of burning, and leave it off until it is checked.',
      'A plug that will not stay in is arcing every time the connection breaks. Take it out of service.',
      'Do not fit a three-prong receptacle to an ungrounded circuit without either a ground or GFCI protection and the correct labelling.',
    ],
    residential: [
      'Kitchen counter and island receptacles',
      'Bathroom GFCI devices',
      'Garage and workshop outlets',
      'Exterior weather-resistant receptacles',
      'Bedroom and living area outlets on shared circuits',
    ],
    commercial: [
      'Workstation and cubicle power',
      'Break room and kitchenette receptacles',
      'Retail floor and display outlets',
      'Outlets serving point-of-sale equipment',
    ],
    whyPro:
      'Replacing a receptacle looks simple, and that is the trap. The failure is often the wiring behind it, and a fresh device on a loose connection just hides a heat source behind a new white faceplate.',
    related: [
      'outlet-installation',
      'gfci-outlet-installation',
      'electrical-repair',
      'dedicated-circuit-installation',
      'electrical-safety-inspection',
    ],
    faqs: [
      {
        q: 'Why did several outlets stop working at once?',
        a: 'They almost certainly share a circuit, and one connection in that chain has failed or a GFCI upstream has tripped. Bathrooms, garages and exterior outlets are frequently protected by a single GFCI in one of those locations, so check there first.',
      },
      {
        q: 'Is a warm outlet dangerous?',
        a: 'A warm faceplate on a receptacle running a heavy load such as a space heater can be normal. A warm outlet with nothing plugged in is not. That points to a loose connection generating heat, and it should be looked at promptly.',
      },
      {
        q: 'Can I replace an outlet myself?',
        a: 'It is within reach of a careful DIYer on a straightforward circuit, but two things go wrong often: the power is not actually off because the circuit is shared, and the underlying loose connection is never found. If the outlet has run warm or shows any scorching, have it looked at.',
      },
      {
        q: 'What does outlet repair cost?',
        a: 'It depends on the wiring conditions, how many devices are affected, whether the box needs correcting and the overall scope. Call (469) 425-8874 and we can talk through it.',
      },
      {
        q: 'My house has two-prong outlets. What are my options?',
        a: 'There are three common paths: run a ground to the outlets, protect them with a GFCI and label them correctly, or rewire the circuit. They differ substantially in cost and disruption, so it is worth a conversation about which fits the property.',
      },
    ],
  },
  {
    slug: 'tripping-breaker-repair',
    title: 'Tripping Breaker Repair in Addison, TX',
    navTitle: 'Tripping Breakers',
    category: 'repairs',
    icon: 'ToggleLeft',
    metaTitle: 'Tripping Circuit Breaker Repair | Addison, TX Electricians',
    metaDescription:
      'A breaker that keeps tripping is reporting a real condition. Overload, short circuit, ground fault and arc fault diagnosis in Addison, TX. Call (469) 425-8874.',
    summary: 'Working out whether a breaker is reporting overload, a short, a ground fault or its own failure.',
    intro:
      'A breaker that trips is not malfunctioning. It is doing exactly what it was installed to do, and the useful question is what it is responding to. Four causes account for nearly all of it, and they call for four different fixes.',
    overview: [
      'Overload is the simplest: the circuit is being asked to carry more current than its conductors are rated for. This is the one homeowners create accidentally, usually in older houses where a single 15-amp circuit serves a whole bedroom that now runs a computer, a monitor, a printer and a space heater.',
      'A short circuit is a direct connection between hot and neutral, and it trips instantly and forcefully. A ground fault is current escaping to ground, often through moisture, and shows up most in exterior boxes, bathrooms and garages. An arc fault is intermittent sparking inside damaged wiring, which is precisely what AFCI breakers were introduced to catch.',
      'The fourth cause is the breaker itself. Breakers are mechanical devices with a finite life, and one that has tripped thousands of times can begin tripping at less than its rated load. That is a replacement, not a rewiring — but it should only be concluded after the circuit has been cleared.',
    ],
    reasons: [
      'A breaker trips whenever a particular appliance runs',
      'A breaker trips at random with no clear pattern',
      'An AFCI or GFCI breaker trips more often than it used to',
      'A breaker trips immediately every time it is reset',
      'Tripping started after a remodel or a new appliance was added',
      'The breaker feels warm or will not stay in the on position',
    ],
    signs: [
      'The breaker handle sits between on and off rather than snapping fully to off',
      'A scorched or acrid smell at the panel',
      'The panel makes a buzzing or crackling sound',
      'Lights dim noticeably before the trip occurs',
    ],
    benefits: [
      'The distinction between overload, short, ground fault and device failure is established',
      'Load is redistributed or a dedicated circuit added where the cause is capacity',
      'Damaged wiring is located rather than worked around',
      'Panel condition is assessed while the panel is open',
    ],
    considerations: [
      'Intermittent tripping may need the load reproduced to be caught',
      'Adding a dedicated circuit is often the correct answer to chronic overload',
      'Panel capacity determines whether a new circuit can be added at all',
      'AFCI nuisance tripping sometimes traces to a specific appliance rather than the wiring',
    ],
    safety: [
      'Never replace a tripping breaker with a higher-amperage one. The breaker protects the conductor, and the conductor has not changed size.',
      'If the panel is hot, buzzing or smells burnt, do not open it. Call from outside the area.',
      'A breaker that trips instantly on reset is signalling a short. Leave it off.',
    ],
    residential: [
      'Kitchen circuits overloaded by countertop appliances',
      'Bedroom circuits carrying home office equipment',
      'Garage circuits running freezers, compressors or tools',
      'Bathroom circuits with high-draw hair appliances',
      'Exterior circuits tripping after rain',
    ],
    commercial: [
      'Equipment circuits tripping under peak demand',
      'Break room circuits overloaded by microwaves and coffee equipment',
      'Circuits affected by a tenant build-out that added load',
    ],
    whyPro:
      'The temptation with a nuisance trip is to make the symptom stop. Every genuinely dangerous version of this problem — damaged conductor, failing connection, arcing inside a wall — presents identically at the panel. Only testing separates them.',
    related: [
      'circuit-breaker-replacement',
      'electrical-panel-upgrade',
      'dedicated-circuit-installation',
      'electrical-repair',
      'electrical-safety-inspection',
    ],
    faqs: [
      {
        q: 'How many times can I reset a tripping breaker?',
        a: 'Once, to see whether it holds. If it trips again, leave it off. Repeated resetting into a fault stresses both the breaker and the wiring, and the breaker is the thing standing between that circuit and a fire.',
      },
      {
        q: 'Why does my breaker trip only when I use the microwave?',
        a: 'That usually means the circuit is at its limit and the microwave pushes it over. Countertop appliances draw heavily, and in older kitchens they often share a circuit with several other things. A dedicated circuit for the appliance is the usual solution.',
      },
      {
        q: 'Can a breaker go bad on its own?',
        a: 'Yes. Breakers are mechanical and they wear. One that has tripped many times over many years can start tripping below its rating. It is a real cause, but it is the one to conclude last, after the circuit has been cleared.',
      },
      {
        q: 'My AFCI breaker trips but nothing seems wrong. What now?',
        a: 'AFCI devices detect arcing signatures, and some motorised or electronic appliances produce signatures close enough to trigger them. It is worth isolating whether one specific device causes it before assuming the wiring is at fault — but it is also worth confirming the wiring is sound.',
      },
      {
        q: 'Is it cheaper to add a circuit or upgrade the panel?',
        a: 'Adding a circuit is generally the smaller job, but only if the panel has a spare slot and enough capacity. If it does not, the panel work comes first. Cost depends on panel capacity, wiring conditions, access and scope — call to discuss.',
      },
    ],
  },
  {
    slug: 'flickering-light-repair',
    title: 'Flickering Light Repair in Addison, TX',
    navTitle: 'Flickering Lights',
    category: 'repairs',
    icon: 'Lightbulb',
    metaTitle: 'Flickering Light Repair in Addison, TX | Ethan & Sons',
    metaDescription:
      'Flickering or dimming lights traced to their cause — loose connections, dimmer mismatch, shared circuits or service issues. Addison, TX. Call (469) 425-8874.',
    summary: 'Separating a harmless dimmer mismatch from a loose connection that needs attention.',
    intro:
      'Flickering covers a wide range, from an LED that does not agree with an old dimmer to a service neutral that is failing. The pattern of the flicker — which lights, when, and what else is running — narrows it down quickly.',
    overview: [
      'The benign version is a compatibility problem. Dimmers designed for incandescent loads often behave poorly with LED lamps, producing flutter at low settings. Swapping to a compatible dimmer usually settles it, and nothing is wrong with the wiring.',
      'The version that matters is a loose connection. A conductor that is not firmly terminated makes and breaks contact as it heats and cools, and that intermittent contact is both the flicker and an arcing point. If a fixture flickers on its own schedule, or if flickering spread from one fixture to several, that possibility moves to the front.',
      'A third pattern is whole-house. If lights across the property dim when the air conditioner starts, or brighten and dim together, the issue may be at the service, the main panel or the utility connection rather than at any fixture. That distinction changes who needs to be called.',
    ],
    reasons: [
      'One fixture flickers on its own with no obvious trigger',
      'Lights dim when a large appliance or HVAC unit starts',
      'LED lamps flutter or buzz on an existing dimmer',
      'Flickering began after new fixtures or lamps were installed',
      'Multiple rooms flicker or dim together',
    ],
    signs: [
      'Flickering that worsens over weeks rather than staying constant',
      'A warm switch or fixture canopy',
      'Lights across the whole property varying in brightness',
      'A buzzing sound from a switch or fixture',
    ],
    benefits: [
      'Loose terminations found and corrected before they arc further',
      'Dimmers matched to the lamps actually installed',
      'Shared circuits identified where inrush current is the cause',
      'Service-side issues distinguished from in-house faults',
    ],
    considerations: [
      'Bring the lamp model to the conversation — LED driver behaviour varies widely',
      'Older three-way switch circuits are a common source of intermittent contact',
      'Motor starting current causes brief, harmless dimming in many homes',
      'Whole-house symptoms may require the utility rather than an electrician',
    ],
    safety: [
      'Whole-house flickering combined with a burning smell or warm panel needs immediate attention. Leave the area and call for emergency help.',
      'A fixture that flickers and is warm to the touch should be switched off at the breaker until inspected.',
      'If a neighbouring property has the same symptom, the cause is likely on the utility side — contact the provider.',
    ],
    residential: [
      'Recessed and can lighting flutter',
      'Ceiling fan light kits',
      'Three-way and four-way switched circuits',
      'Exterior and landscape fixtures',
      'Whole-house dimming during HVAC startup',
    ],
    commercial: [
      'Office troffer and panel lighting',
      'Retail display lighting on dimming systems',
      'Lighting affected by large equipment cycling',
    ],
    whyPro:
      'The two ends of this problem look the same from a chair across the room. One is a lamp compatibility issue worth a few dollars. The other is an arcing connection inside a ceiling box. Testing is what tells them apart.',
    related: [
      'lighting-installation',
      'led-lighting-upgrades',
      'electrical-repair',
      'electrical-panel-upgrade',
      'electrical-safety-inspection',
    ],
    faqs: [
      {
        q: 'Are flickering lights always dangerous?',
        a: 'No. A great deal of flickering is a dimmer and LED mismatch, which is a nuisance rather than a hazard. What deserves attention is flickering that started recently, is getting worse, affects several fixtures, or comes with heat, buzzing or smell.',
      },
      {
        q: 'Why do my lights dim when the air conditioner starts?',
        a: 'Motors draw a large surge of current at startup, and a brief dip is normal in many homes. If the dip is pronounced, lasts more than a moment, or has become worse over time, the service capacity or a connection may be worth checking.',
      },
      {
        q: 'I changed to LED bulbs and now they flicker. Why?',
        a: 'Older dimmers were designed for the steady resistive load of incandescent bulbs. LEDs draw far less and behave differently, so many dimmers cannot regulate them smoothly. An LED-compatible dimmer usually resolves it.',
      },
      {
        q: 'Could flickering mean my panel is failing?',
        a: 'It can. Loose connections at the panel, a failing main breaker or a compromised neutral all produce flickering, typically across multiple circuits. That version is worth investigating rather than living with.',
      },
    ],
  },
  {
    slug: 'circuit-breaker-replacement',
    title: 'Circuit Breaker Replacement in Addison, TX',
    navTitle: 'Breaker Replacement',
    category: 'repairs',
    icon: 'SquareStack',
    metaTitle: 'Circuit Breaker Replacement | Addison, TX Electricians',
    metaDescription:
      'Worn, failed or incorrectly sized breakers replaced with correctly rated devices for the panel. Addison, TX residential and commercial. Call (469) 425-8874.',
    summary: 'Replacing worn or incorrect breakers with devices properly matched to panel and conductor.',
    intro:
      'Breakers are consumable. They are mechanical devices that operate under load, and after enough cycles the internal mechanism no longer performs to its rating. Replacing one is straightforward work — the judgement is in confirming that the breaker really is the problem and that the replacement is the right device.',
    overview: [
      'Compatibility is not optional. Breakers are listed for specific panels, and fitting a device that physically clips in but is not listed for that busbar is a genuine hazard, however common the practice is. Part of the job is confirming the panel manufacturer and the correct series.',
      'Sizing follows the conductor, never the load. A 12-gauge conductor takes a 20-amp breaker regardless of what the homeowner wishes the circuit could carry. Where a circuit genuinely needs more capacity, the answer is a new circuit with appropriately sized wire, not a larger breaker on the existing one.',
      'Some panels warrant a broader conversation. Certain discontinued brands have documented histories of breakers failing to trip, and where one of those is found, replacing individual breakers is treating a smaller problem than the one present.',
    ],
    reasons: [
      'A breaker trips below its rating or trips at random',
      'A breaker will not reset or feels loose in the panel',
      'A breaker is warm or discoloured',
      'Existing breakers are not listed for the panel they are installed in',
      'A circuit is protected at a higher amperage than its wire allows',
      'AFCI or GFCI protection is being added to an existing circuit',
    ],
    signs: [
      'The handle feels mushy rather than snapping crisply',
      'Scorching or melting on the breaker face or busbar',
      'A burning smell when the panel door is opened',
      'Breakers that are visibly a different brand from the panel',
    ],
    benefits: [
      'Protection restored to the rating the circuit was designed around',
      'Devices matched to the panel they are listed for',
      'Panel interior inspected while it is open',
      'Opportunity to add AFCI or GFCI protection where appropriate',
    ],
    considerations: [
      'Some older panels no longer have available replacement breakers',
      'Bus bar condition determines whether a replacement will seat properly',
      'Panel capacity limits how many devices can be added',
      'AFCI and GFCI breakers cost more than standard devices',
    ],
    safety: [
      'Panel interiors carry live parts even with the main breaker off. This is not appropriate DIY work.',
      'Do not upsize a breaker to stop tripping — the conductor determines the rating.',
      'If the panel is warm, buzzing or smells of burning, do not open it.',
    ],
    residential: [
      'Standard branch circuit breakers',
      'AFCI protection for living areas',
      'GFCI breakers for exterior and wet locations',
      'Double-pole breakers for ranges, dryers and HVAC',
    ],
    commercial: [
      'Branch breakers in tenant panels',
      'Equipment circuit protection',
      'Corrections to mismatched devices found during inspection',
    ],
    whyPro:
      'A breaker is the one component in a house whose entire purpose is to fail safely at the right moment. Fitting the wrong device removes that protection while leaving every visible sign that it is present.',
    related: [
      'tripping-breaker-repair',
      'electrical-panel-upgrade',
      'fuse-box-to-breaker-panel-conversion',
      'electrical-safety-inspection',
      'electrical-repair',
    ],
    faqs: [
      {
        q: 'How long do circuit breakers last?',
        a: 'There is no fixed lifespan. A breaker that rarely trips can work for decades; one that trips regularly wears much faster. Condition, not age alone, is what matters.',
      },
      {
        q: 'Can I use any brand of breaker in my panel?',
        a: 'No. Breakers are listed for specific panels, and using an unlisted device — even one that physically fits — is not a safe substitution. Matching the panel is part of the job.',
      },
      {
        q: 'Should I replace one breaker or the whole panel?',
        a: 'If the panel is sound, has capacity and the breaker simply wore out, a single replacement is reasonable. If the panel is full, is a discontinued type with known issues, or shows heat damage on the bus, the wider conversation is the right one.',
      },
      {
        q: 'What does breaker replacement cost?',
        a: 'It depends on the device type, panel compatibility, access and the condition found once the panel is open. AFCI and GFCI breakers cost more than standard ones. Call (469) 425-8874 to discuss.',
      },
    ],
  },
  {
    slug: 'electrical-code-violation-corrections',
    title: 'Electrical Code Violation Corrections in Addison, TX',
    navTitle: 'Code Corrections',
    category: 'repairs',
    icon: 'ClipboardCheck',
    metaTitle: 'Electrical Code Violation Corrections | Addison, TX',
    metaDescription:
      'Correcting electrical conditions flagged during a home inspection, sale or lease review in Addison, TX. Clear documentation of the work. Call (469) 425-8874.',
    summary: 'Correcting conditions flagged on an inspection report, with a clear record of what changed.',
    intro:
      'Most code corrections arrive attached to a deadline — an inspection report during a sale, a punch list before a tenant moves in, or a lender requiring items cleared before closing. The work is usually not dramatic, but it does need to be done properly and documented.',
    overview: [
      'Inspection findings tend to repeat. Missing GFCI protection in kitchens, bathrooms, garages and exteriors. Open junction boxes in attics. Double-tapped breakers. Missing or improper grounding. Reversed polarity at receptacles. Panels blocked by shelving. Extension cords used as permanent wiring. None of these are exotic, and all of them are correctable.',
      'What varies is scope. A missing cover plate is a few minutes. A panel with a bonded neutral in a subpanel, or a circuit sized incorrectly for its conductor, is a larger correction that may cascade into related work. Being clear about that distinction up front is more useful than a low number that changes later.',
    ],
    reasons: [
      'A home inspection report flagged electrical items before a sale',
      'A lender or insurer required conditions to be corrected',
      'A landlord or property manager needs a suite brought into compliance',
      'Previous unpermitted work needs to be assessed and corrected',
      'A remodel revealed wiring that does not meet current requirements',
    ],
    benefits: [
      'Findings addressed with documentation of what was done',
      'Conditions corrected properly rather than concealed',
      'Related issues found during the work are reported clearly',
      'A single point of contact for the whole list',
    ],
    considerations: [
      'Some findings require opening walls or ceilings to correct fully',
      'Corrections may reveal further conditions behind them',
      'Permitting requirements vary by jurisdiction and scope of work',
      'Existing installations are generally judged against the code in force when installed, with exceptions',
    ],
    safety: [
      'Conditions like double-tapped breakers and missing grounds are flagged because they remove protection, not because they are cosmetic.',
      'Do not have items marked corrected without the underlying condition actually being fixed.',
    ],
    residential: [
      'Missing GFCI protection in required locations',
      'Ungrounded three-prong receptacles',
      'Open splices and uncovered junction boxes',
      'Double-tapped or improperly sized breakers',
      'Improper subpanel grounding and bonding',
    ],
    commercial: [
      'Panel access and working clearance issues',
      'Improper flexible cord use as permanent wiring',
      'Circuit labelling and panel directory corrections',
      'Conditions flagged during tenant improvement inspection',
    ],
    whyPro:
      'An inspection list is a description of missing protection. Clearing it properly restores that protection; clearing it superficially leaves the property in the same condition with a signed-off sheet of paper.',
    related: [
      'electrical-safety-inspection',
      'gfci-outlet-installation',
      'electrical-grounding',
      'electrical-panel-upgrade',
      'older-home-electrical-safety',
    ],
    faqs: [
      {
        q: 'Do I have to correct everything on an inspection report?',
        a: 'That depends on your transaction rather than on us. Safety-related findings are worth correcting regardless. Which items are required is usually driven by the lender, insurer or the negotiation between buyer and seller.',
      },
      {
        q: 'Does older wiring automatically violate code?',
        a: 'Generally no. Installations are usually evaluated against the requirements in force when they were installed, with certain exceptions for hazardous conditions. That is why an inspector may note something as a concern without calling it a violation.',
      },
      {
        q: 'Will you provide documentation of the corrections?',
        a: 'Yes. A clear written record of what was found and what was changed is part of the work, and it is usually what the other party in a transaction is asking for.',
      },
      {
        q: 'Can you handle permits?',
        a: 'Permit requirements depend on the jurisdiction and the scope of the work. Call to discuss the specifics of your property and what your correction list involves.',
      },
    ],
  },
];
