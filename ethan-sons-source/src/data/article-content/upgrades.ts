import type { Article } from '../types';

export const upgradeArticles: Article[] = [
  {
    slug: 'signs-your-panel-needs-attention',
    title: 'Signs Your Electrical Panel Needs Attention',
    metaTitle: 'Signs Your Electrical Panel Needs Attention | Ethan & Sons',
    metaDescription:
      'The physical and behavioural signs that a panel is undersized, ageing or defective, including the brands with documented failure histories.',
    excerpt:
      'Panels rarely fail suddenly. They give signals for years, and most of them are visible.',
    published: '2025-04-02',
    topic: 'Panels',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Signals you can see',
        paragraphs: [
          'A panel that needs looking at usually shows it. Rust or water staining inside the enclosure. Scorching or discolouration around a breaker. Breakers that feel loose in their position. A panel with no empty spaces left and tandem breakers doubled up to make room. Any of these is worth a professional look.',
          'A fuse box rather than a breaker panel is its own signal. Fuses work, but a fuse box indicates an installation old enough that everything downstream of it deserves review.',
        ],
      },
      {
        heading: 'Signals you can feel and hear',
        paragraphs: [
          'A panel should be silent and cool. Buzzing, crackling or humming from inside the enclosure indicates something arcing or loose. Warmth on the panel cover, or on an individual breaker, indicates resistance where there should be none.',
          'Both of these warrant a call rather than observation over time.',
        ],
      },
      {
        heading: 'The brands worth knowing about',
        paragraphs: [
          'Certain panel brands have documented histories of breakers failing to trip under fault conditions. Federal Pacific Stab-Lok, Zinsco and Challenger are the names that come up most often, and they appear in homes across North Texas from the relevant decades.',
          'A panel from one of these brands is not automatically dangerous, but the concern is a matter of record rather than speculation, and having one assessed is a reasonable step rather than an overcautious one.',
        ],
      },
      {
        heading: 'Capacity versus condition',
        paragraphs: [
          'These are separate questions and they get conflated. A panel can be in excellent condition and still be too small for what the house now runs — that is a capacity question, answered by a load calculation. A panel can equally have plenty of amperage and be in poor physical condition.',
          'Adding a large load such as vehicle charging, a hot tub or a workshop is what usually surfaces the capacity question, because that is the point at which someone finally does the calculation.',
        ],
      },
    ],
    relatedServices: ['electrical-panel-upgrade', 'fuse-box-to-breaker-panel-conversion', 'electrical-safety-inspection'],
    relatedArticles: ['understanding-load-calculations', 'why-circuit-breakers-trip'],
  },
  {
    slug: 'understanding-load-calculations',
    title: 'What a Load Calculation Is and Why Everything Depends on It',
    metaTitle: 'Understanding Electrical Load Calculations | Ethan & Sons',
    metaDescription:
      'How electricians determine whether a service can support a new circuit, and why this step comes before any major electrical addition.',
    excerpt:
      'It is the least visible step in most electrical projects and the one that determines the rest.',
    published: '2025-04-18',
    topic: 'Panels',
    readingMinutes: 5,
    sections: [
      {
        heading: 'The question it answers',
        paragraphs: [
          'A load calculation establishes what an electrical service can actually support, given everything already connected to it. It is not a guess based on how many breakers are in the panel, and it is not the sum of every appliance nameplate — that would produce a wildly overstated figure, since a house never runs everything at once.',
          'It is a structured method that accounts for square footage, fixed appliances, heating and cooling, and applies established demand factors that reflect real usage patterns.',
        ],
      },
      {
        heading: 'Why continuous loads are treated differently',
        paragraphs: [
          'Some loads run for hours at a stretch — vehicle charging is the obvious modern example. Circuits serving them are sized above the actual draw, because sustained current heats conductors differently from brief peaks.',
          'This is why a charger drawing a given current needs a circuit rated meaningfully higher, and why the shortcut of "the breaker is big enough" is not the same as the calculation being done.',
        ],
      },
      {
        heading: 'What happens when it is skipped',
        paragraphs: [
          'The failure mode is not dramatic. A service quietly runs closer to its limit than it should, and the symptoms are intermittent — breakers tripping under combinations of load that used to be fine, lights dimming when the air conditioning starts, equipment behaving oddly.',
          'It also becomes an issue at sale, at inspection, and at the point where the next addition is proposed and the numbers finally get run.',
        ],
      },
    ],
    relatedServices: ['electrical-panel-upgrade', 'ev-charger-installation', 'dedicated-circuit-installation'],
    relatedArticles: ['signs-your-panel-needs-attention', 'home-ev-charging-explained'],
  },
  {
    slug: 'home-ev-charging-explained',
    title: 'Home EV Charging: What Actually Determines the Installation',
    metaTitle: 'Home EV Charger Installation Explained | Ethan & Sons',
    metaDescription:
      'Level 1 versus Level 2 charging, why a dedicated circuit is required, what a load calculation changes, and hardwired versus plug-in.',
    excerpt:
      'Most of the decisions here are made by your panel, not by the charger you pick.',
    published: '2025-05-06',
    topic: 'EV Charging',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Level 1 and Level 2 are not close',
        paragraphs: [
          'Level 1 is a standard household outlet. It works, and for a short commute with an overnight window it can be adequate. It is slow enough that it does not suit most people once they are past the novelty.',
          'Level 2 uses a 240-volt dedicated circuit and changes the experience substantially — a car that recovers a full day\u2019s range in a few hours rather than most of a day. This is what people mean by a home charger installation.',
        ],
      },
      {
        heading: 'The dedicated circuit is not optional',
        paragraphs: [
          'Vehicle charging is a continuous load, drawing steadily for hours. It cannot share a circuit with anything else, and the general-purpose garage circuit is not a candidate. The circuit is sized above the charger\u2019s actual draw specifically because of that sustained operation.',
        ],
      },
      {
        heading: 'What the load calculation decides',
        paragraphs: [
          'Before anything is specified, the existing service has to be assessed. That calculation determines whether the panel can take the new circuit as it stands, whether an upgrade is needed first, or whether load-management equipment is the sensible route.',
          'Load management is worth knowing about: it allows a charger to share existing capacity by reducing or pausing charging when household demand peaks. In a house where a full service upgrade would be disproportionate, it is often the more sensible answer.',
        ],
      },
      {
        heading: 'Hardwired or plug-in, and where to put it',
        paragraphs: [
          'Both are common. Hardwiring suits a permanent installation and is required for some equipment at higher amperages; a plug-in unit on a suitable receptacle is easier to replace or take with you. The choice interacts with the circuit rating and the equipment listing rather than being purely preference.',
          'Placement is worth more thought than it usually gets. Consider which side the vehicle\u2019s port is on, whether you will ever park the other way round, cable length and how it will be managed, and whether a second vehicle might follow. Getting the position right costs nothing at installation and a great deal afterwards.',
        ],
      },
    ],
    relatedServices: ['ev-charger-installation', 'level-2-ev-charger-installation', 'electrical-panel-upgrade'],
    relatedArticles: ['understanding-load-calculations', 'signs-your-panel-needs-attention'],
  },
  {
    slug: 'whole-home-surge-protection-guide',
    title: 'Surge Protection: Why the Power Strip Is Not Enough',
    metaTitle: 'Whole-Home Surge Protection Guide | Ethan & Sons Electricians',
    metaDescription:
      'How layered surge protection works, what a panel-mounted device does that a power strip cannot, and what surges actually come from.',
    excerpt:
      'Most damaging surges do not arrive from outside. They are generated inside the house.',
    published: '2025-05-22',
    topic: 'Protection',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Where surges actually come from',
        paragraphs: [
          'Lightning gets the attention, but the majority of surge events are internally generated — motors starting and stopping, air conditioning compressors cycling, well pumps, large appliances. Each event is small. The cumulative effect on electronics is not.',
          'External events do occur too: utility switching, grid faults, and lightning strikes that need not be anywhere near the property to matter.',
        ],
      },
      {
        heading: 'What a panel-mounted device does',
        paragraphs: [
          'A whole-home surge protective device installs at the panel and clamps incoming voltage above a threshold, diverting the excess. It handles the large events that a plug-in strip cannot, and it protects everything on the service — including the things that have no plug at all.',
          'That last point is the one that gets overlooked. Air conditioning equipment, ovens, hardwired appliances and increasingly the control electronics inside them are all exposed, and none of them can be plugged into a power strip.',
        ],
      },
      {
        heading: 'Layering is the actual answer',
        paragraphs: [
          'Panel-level protection handles the large events; point-of-use protection at sensitive equipment handles what gets past it and the smaller internally generated events closer to their source. Neither layer replaces the other, and using both is the standard recommendation.',
          'It is also worth knowing that protective components degrade as they absorb events. Devices with status indication tell you when they have reached end of life, which matters — a device that has silently stopped protecting is worse than none, because you think you are covered.',
        ],
      },
    ],
    relatedServices: ['whole-home-surge-protection', 'power-surge-troubleshooting', 'electrical-grounding'],
    relatedArticles: ['signs-your-panel-needs-attention', 'older-home-electrical-warning-signs'],
  },
  {
    slug: 'older-home-electrical-warning-signs',
    title: 'Older Homes: The Electrical Signs Worth Knowing',
    metaTitle: 'Older Home Electrical Warning Signs | Ethan & Sons',
    metaDescription:
      'Knob-and-tube, aluminium branch wiring, two-prong outlets, ungrounded circuits and undersized services — what each one means.',
    excerpt:
      'Older wiring is not automatically unsafe. Some specific things in it are worth identifying.',
    published: '2025-06-04',
    topic: 'Older Homes',
    readingMinutes: 7,
    sections: [
      {
        heading: 'Two-prong outlets',
        paragraphs: [
          'The most visible sign, and it means the circuit has no equipment grounding conductor. That was standard practice for decades and it is not a defect in itself, but it removes a protective path that modern equipment expects.',
          'The important thing to know is what not to do: replacing a two-prong receptacle with a three-prong one on an ungrounded circuit creates the appearance of grounding without the substance, which is worse than the original arrangement. There are recognised ways of handling this properly.',
        ],
      },
      {
        heading: 'Aluminium branch wiring',
        paragraphs: [
          'Homes wired between roughly the mid-1960s and mid-1970s sometimes used aluminium for branch circuits. Aluminium expands and contracts differently from copper, which can loosen connections over time, and loose connections generate heat.',
          'This is a known condition with established remediation methods. The first step is confirming whether it is actually present, since it is often assumed on the basis of the house\u2019s age alone.',
        ],
      },
      {
        heading: 'Knob-and-tube',
        paragraphs: [
          'Genuinely old wiring, found in homes from the early twentieth century. It has no ground, its insulation becomes brittle with age, and it was never designed to be buried in the thermal insulation that has often been added around it since.',
          'Where it remains in service it warrants assessment rather than assumption in either direction.',
        ],
      },
      {
        heading: 'The service itself',
        paragraphs: [
          'A house built for lighting and a refrigerator now runs air conditioning, multiple televisions, computers, a microwave and possibly a car. Services sized for the original expectation are common, and they are the reason older homes so often trip breakers on combinations that seem unremarkable.',
        ],
      },
      {
        heading: 'What to do about it',
        paragraphs: [
          'The useful sequence is assessment first, then priorities. An inspection produces an ordered list — what genuinely needs addressing now, what should be planned, and what is simply old but sound. That is far more useful than a rewire quote, and it usually reveals that the urgent list is shorter than feared.',
        ],
      },
    ],
    relatedServices: ['older-home-electrical-safety', 'older-home-rewiring', 'electrical-grounding', 'electrical-safety-inspection'],
    relatedArticles: ['gfci-vs-afci-explained', 'what-happens-during-an-inspection'],
  },
  {
    slug: 'what-happens-during-an-inspection',
    title: 'What Happens During an Electrical Safety Inspection',
    metaTitle: 'What Happens During an Electrical Inspection | Ethan & Sons',
    metaDescription:
      'What gets examined during a home electrical safety inspection, what the findings look like, and when one is worth doing.',
    excerpt:
      'The output is not a pass or fail. It is an ordered picture of what is sound and what is not.',
    published: '2025-06-20',
    topic: 'Safety',
    readingMinutes: 5,
    sections: [
      {
        heading: 'What gets examined',
        paragraphs: [
          'The service entrance and meter, the panel and its breakers, grounding and bonding arrangements, a sample of receptacles and switches, GFCI and AFCI protection where it is required, smoke detection, visible wiring in accessible areas, and any obvious signs of heat, moisture or improvised work.',
          'Improvised work is worth mentioning separately, because it is the most common significant finding. Junction boxes buried behind drywall, splices made outside a box, circuits extended by someone confident rather than qualified — these turn up regularly and they are exactly what an inspection is for.',
        ],
      },
      {
        heading: 'What the findings look like',
        paragraphs: [
          'A useful inspection produces an ordered list rather than a verdict: what needs attention now for safety reasons, what should be planned but is not urgent, and what is simply older practice that remains sound.',
          'That ordering is the value. Most homes have a handful of items, and most of those items are not urgent — but knowing which is which is what lets you plan rather than react.',
        ],
      },
      {
        heading: 'When one is worth doing',
        paragraphs: [
          'Buying an older property is the obvious trigger, particularly since general home inspections cover electrical systems only at a summary level. Beyond that: a house over about forty years old that has never had one, before a significant remodel, after adding major loads, when a property has had unpermitted work done, or when something has simply been behaving oddly.',
        ],
      },
    ],
    relatedServices: ['electrical-safety-inspection', 'home-electrical-inspection', 'older-home-electrical-safety'],
    relatedArticles: ['older-home-electrical-warning-signs', 'when-to-call-an-electrician'],
  },
  {
    slug: 'choosing-recessed-lighting',
    title: 'Recessed Lighting: Placement Matters More Than Quantity',
    metaTitle: 'Choosing Recessed Lighting | Ethan & Sons Electricians',
    metaDescription:
      'How to plan recessed lighting placement, colour temperature and dimming, and the mistakes that make a room feel wrong.',
    excerpt:
      'The most common recessed lighting mistake is an even grid in a room that needed light in specific places.',
    published: '2025-07-08',
    topic: 'Lighting',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Light the work, not the ceiling',
        paragraphs: [
          'An evenly spaced grid produces even illumination of the floor and very little useful light where it is needed. In a kitchen that means the person at the counter stands in their own shadow, because the fixture is behind them.',
          'Planning around what actually happens in the room — the counter, the reading chair, the desk — produces a better result with fewer fixtures.',
        ],
      },
      {
        heading: 'Spacing, beam angle and ceiling height',
        paragraphs: [
          'These three interact. Higher ceilings need either wider spacing or narrower beams; lower ceilings need the opposite. A rough starting point is spacing roughly equal to half the ceiling height, adjusted for what the room is for.',
          'Wall washing is a separate consideration and a valuable one — fixtures placed closer to a wall and aimed at it make a room feel larger and give artwork something to be lit by.',
        ],
      },
      {
        heading: 'Colour temperature and consistency',
        paragraphs: [
          'Warmer light suits living spaces; neutral suits kitchens and work areas. The rule that matters more than either is consistency — mixed colour temperatures within a single sightline is what makes lighting look subtly wrong even when nobody can say why.',
          'Colour rendering is worth attention too, particularly in kitchens and anywhere people get dressed. Low-rendering light makes food and fabric look flat and slightly grey.',
        ],
      },
      {
        heading: 'Practical constraints',
        paragraphs: [
          'Insulation contact rating matters where fixtures sit in insulated ceilings. Airtight housings matter for energy performance. Remodel-rated housings exist specifically for installations without attic access. And dimming should be planned rather than added later, since dimmer and driver compatibility is what determines whether the result flickers or buzzes.',
        ],
      },
    ],
    relatedServices: ['recessed-lighting-installation', 'lighting-installation', 'dimmer-and-lighting-controls'],
    relatedArticles: ['led-upgrade-guide', 'outdoor-lighting-design'],
  },
  {
    slug: 'led-upgrade-guide',
    title: 'Upgrading to LED Without the Flicker and Buzz',
    metaTitle: 'LED Lighting Upgrade Guide | Ethan & Sons Electricians',
    metaDescription:
      'Why LED retrofits sometimes flicker or hum, how dimmer compatibility works, and what to look for beyond wattage.',
    excerpt:
      'Most disappointing LED upgrades come down to one thing: the dimmer that was already there.',
    published: '2025-07-24',
    topic: 'Lighting',
    readingMinutes: 4,
    sections: [
      {
        heading: 'The dimmer is usually the problem',
        paragraphs: [
          'Dimmers designed for incandescent lamps work by chopping the waveform, and they assume a substantial resistive load. An LED lamp draws a fraction of that, and the result is flicker, buzzing, a limited dimming range, or lamps that glow faintly when switched off.',
          'LED-compatible dimmers exist and resolve most of this. Minimum load requirements are worth checking as well, since a single LED lamp on a dimmer rated for a much larger load frequently misbehaves.',
        ],
      },
      {
        heading: 'What to look at besides brightness',
        paragraphs: [
          'Lumens replace watts as the measure of output, which most people have absorbed. Two other numbers matter and get less attention: colour temperature, which determines whether the light feels warm or clinical, and colour rendering, which determines whether things look their actual colour under it.',
          'Dimming behaviour at the low end is worth testing before committing to a whole house. Some LED lamps dim smoothly to almost nothing; others drop out abruptly or flicker below a threshold.',
        ],
      },
      {
        heading: 'Retrofit lamps or new fixtures',
        paragraphs: [
          'Retrofit lamps are the quick route and work well in many fixtures. Purpose-built LED fixtures generally perform better — better optics, better thermal management, longer life — and make sense where a fixture is being replaced anyway or where light quality matters most.',
        ],
      },
    ],
    relatedServices: ['led-lighting-upgrades', 'energy-efficient-lighting-upgrade', 'dimmer-and-lighting-controls'],
    relatedArticles: ['choosing-recessed-lighting', 'flickering-lights-causes'],
  },
];
