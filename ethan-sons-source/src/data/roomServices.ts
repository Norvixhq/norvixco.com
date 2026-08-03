import type { RoomService } from './types';

/**
 * roomServices.ts — the "Electrical Services by Room" section.
 *
 * Each `items[].service` links to a service page where a matching one exists.
 * Links are resolved at render time, so an item without a match simply renders
 * as plain text rather than a broken link.
 */
export const roomServices: RoomService[] = [
  {
    slug: 'kitchen-electrical-services',
    room: 'Kitchen',
    title: 'Kitchen Electrical Services in Addison, TX',
    metaTitle: 'Kitchen Electrical Services in Addison, TX | Ethan & Sons',
    metaDescription:
      'Kitchen electrical work in Addison — under-cabinet lighting, GFCI outlets, appliance circuits and recessed lighting. Call (469) 425-8874.',
    summary: 'The highest-demand room in the house, and the one with the most specific requirements.',
    icon: 'CookingPot',
    intro:
      'Kitchens concentrate more electrical demand into a smaller area than anywhere else in a home, and they carry the most specific code requirements. Countertop circuits, GFCI protection, appliance circuits and lighting all have to work together in a space where cabinets dictate where anything can go.',
    items: [
      {
        label: 'Under-cabinet lighting',
        detail: 'Task light on the counter instead of your own shadow.',
        service: 'under-cabinet-lighting',
      },
      {
        label: 'GFCI outlets',
        detail: 'Required at countertop receptacles, and the first thing an inspector checks.',
        service: 'gfci-outlet-installation',
      },
      {
        label: 'Dedicated circuits',
        detail: 'Refrigerator, dishwasher and disposal each want their own supply.',
        service: 'dedicated-circuit-installation',
      },
      {
        label: 'Cooktop and range circuits',
        detail: '240-volt supply sized to the appliance specification.',
        service: 'appliance-dedicated-circuits',
      },
      {
        label: 'Microwave circuits',
        detail: 'A built-in or over-range microwave belongs on its own circuit.',
        service: 'appliance-dedicated-circuits',
      },
      {
        label: 'Recessed lighting',
        detail: 'Placed over work surfaces rather than in an even grid.',
        service: 'recessed-lighting-installation',
      },
      {
        label: 'Pendant lighting',
        detail: 'Island and peninsula lighting with the switching worked out first.',
        service: 'lighting-installation',
      },
      {
        label: 'Island and counter outlets',
        detail: 'Placement follows specific requirements for spacing and accessibility.',
        service: 'outlet-installation',
      },
      {
        label: 'Electrical safety upgrades',
        detail: 'Tamper-resistant devices and correcting anything a remodel uncovers.',
        service: 'electrical-safety-inspection',
      },
    ],
    considerations: [
      'Countertop receptacle spacing and island placement follow specific requirements',
      'GFCI protection is required for all countertop receptacles',
      'Appliance manufacturer documentation determines circuit sizing',
      'A remodel is the least expensive moment to add capacity',
      'Panel capacity often becomes the constraint in older kitchens',
    ],
    faqs: [
      {
        q: 'How many circuits does a kitchen need?',
        a: 'More than most older kitchens have. Current requirements call for multiple small-appliance circuits serving countertop receptacles, plus separate circuits for major appliances. Kitchens from before those requirements frequently run everything from one or two.',
      },
      {
        q: 'Why do my kitchen breakers trip?',
        a: 'Usually capacity. Countertop appliances draw heavily, and in an older kitchen several of them share a circuit. Adding dedicated circuits is the standard fix.',
      },
      {
        q: 'When should electrical work happen in a kitchen remodel?',
        a: 'At rough-in, before drywall and cabinets go back. Everything is straightforward then and expensive afterwards.',
      },
      {
        q: 'Do all kitchen outlets need to be GFCI?',
        a: 'Countertop receptacles do. The requirements have expanded over successive code cycles, so an older kitchen may have protection in only some locations.',
      },
    ],
  },
  {
    slug: 'bathroom-electrical-services',
    room: 'Bathroom',
    title: 'Bathroom Electrical Services in Addison, TX',
    metaTitle: 'Bathroom Electrical Services in Addison, TX | Ethan & Sons',
    metaDescription:
      'Bathroom electrical work in Addison — exhaust fans, GFCI outlets, vanity lighting and underfloor heating. Call (469) 425-8874.',
    summary: 'Water and electricity in one small room, which drives every requirement here.',
    icon: 'ShowerHead',
    intro:
      'Bathroom electrical requirements exist because of a single fact: water is present and people are frequently in contact with it. GFCI protection, fixture ratings and ventilation all follow from that.',
    items: [
      {
        label: 'Exhaust fans',
        detail: 'Ventilation that actually moves the moisture out rather than into the attic.',
      },
      {
        label: 'Shower and tub lighting',
        detail: 'Fixtures rated for damp or wet locations depending on the position.',
        service: 'lighting-installation',
      },
      {
        label: 'GFCI outlets',
        detail: 'Required at bathroom receptacles without exception.',
        service: 'gfci-outlet-installation',
      },
      {
        label: 'Vanity lighting',
        detail: 'Light from the sides rather than only above, which flattens features.',
        service: 'lighting-installation',
      },
      {
        label: 'Wall sconces',
        detail: 'Mounted at face height on either side of the mirror.',
        service: 'lighting-installation',
      },
      {
        label: 'Underfloor heating',
        detail: 'Electric mat systems with dedicated circuits and GFCI protection.',
      },
      {
        label: 'Motion lighting',
        detail: 'Low-level night lighting that comes on without a switch.',
        service: 'motion-sensor-installation',
      },
      {
        label: 'Dedicated circuits',
        detail: 'High-draw hair appliances are a common cause of tripping.',
        service: 'dedicated-circuit-installation',
      },
    ],
    considerations: [
      'GFCI protection is required for all bathroom receptacles',
      'Fixtures over tubs and in showers need appropriate damp or wet ratings',
      'Exhaust fans should vent outside, not into an attic',
      'Underfloor heating requires a dedicated circuit and GFCI protection',
      'Fan sizing should suit the room volume',
    ],
    faqs: [
      {
        q: 'Do bathroom outlets have to be GFCI protected?',
        a: 'Yes, without exception. It is among the most important protective requirements in a home.',
      },
      {
        q: 'Can a light fixture go over the shower?',
        a: 'Yes, with a fixture rated for a wet location and installed at appropriate clearance. Ordinary fixtures are not suitable there.',
      },
      {
        q: 'How do I choose an exhaust fan?',
        a: 'Size it to the room volume, and pay attention to the noise rating — a loud fan gets switched off, which defeats the purpose. Venting to the outside rather than into the attic is essential.',
      },
      {
        q: 'Is underfloor heating worth it?',
        a: 'On tile floors, many people rate it among their favourite upgrades. It needs a dedicated circuit and GFCI protection, and it is far easier to install during a remodel than afterwards.',
      },
    ],
  },
  {
    slug: 'bedroom-electrical-services',
    room: 'Bedroom',
    title: 'Bedroom Electrical Services in Addison, TX',
    metaTitle: 'Bedroom Electrical Services in Addison, TX | Ethan & Sons',
    metaDescription:
      'Bedroom electrical work in Addison — dimmers, ceiling fans, additional outlets, LED lighting and smart switches. Call (469) 425-8874.',
    summary: 'Comfort, control and enough outlets to stop the extension cords.',
    icon: 'BedDouble',
    intro:
      'Bedrooms tend to be under-provided in older homes — a single ceiling fixture, two outlets, and no dimming. The upgrades that make the most difference are inexpensive and mostly about control.',
    items: [
      {
        label: 'Dimmers',
        detail: 'The single upgrade most people notice immediately.',
        service: 'dimmer-and-lighting-controls',
      },
      {
        label: 'Lighting fixtures',
        detail: 'Replacing a single central fixture with something better suited.',
        service: 'lighting-installation',
      },
      { label: 'LED lighting', detail: 'Warm colour temperature, low heat, long life.', service: 'led-lighting-upgrades' },
      { label: 'Bedside controls', detail: 'Switching the room light from the bed rather than the door.', service: 'dimmer-and-lighting-controls' },
      { label: 'Motion lighting', detail: 'Low-level closet and hallway lighting.', service: 'motion-sensor-installation' },
      { label: 'Ceiling fans', detail: 'Genuinely useful in North Texas summers, on a fan-rated box.', service: 'ceiling-fan-installation' },
      { label: 'Additional outlets', detail: 'Enough that furniture placement is not dictated by them.', service: 'outlet-installation' },
      { label: 'Smart switches', detail: 'Requires a neutral at the box — worth checking first.', service: 'smart-home-electrical-installation' },
    ],
    considerations: [
      'AFCI protection is required for bedroom circuits in current requirements',
      'Ceiling fans need fan-rated boxes, not standard fixture boxes',
      'Smart switches generally need a neutral conductor at the box',
      'Bedroom circuits are often shared across several rooms in older homes',
    ],
    faqs: [
      {
        q: 'Why does my bedroom breaker trip?',
        a: 'Bedroom circuits in older homes frequently serve several rooms. Add a computer, monitors and a space heater and the circuit reaches its limit. A dedicated circuit is the usual answer.',
      },
      {
        q: 'Can I add outlets to a bedroom?',
        a: 'Yes. Whether it goes on the existing circuit or needs a new one depends on the current load, which is worth checking rather than assuming.',
      },
      {
        q: 'What is AFCI protection?',
        a: 'Arc-fault protection detects the electrical signature of arcing inside damaged wiring, which is a fire risk. It is required for bedroom circuits under current requirements.',
      },
    ],
  },
  {
    slug: 'home-office-electrical-services',
    room: 'Home Office',
    title: 'Home Office Electrical Services in Addison, TX',
    metaTitle: 'Home Office Electrical Services | Addison, TX Electricians',
    metaDescription:
      'Home office electrical in Addison — dedicated circuits, data cabling, surge protection and lighting for reliable working. Call (469) 425-8874.',
    summary: 'Circuits and cabling that keep a working day from being interrupted.',
    icon: 'Laptop',
    intro:
      'Most home offices are converted bedrooms, which means they inherited a bedroom\u2019s electrical provision. That was fine for a lamp and an alarm clock and is marginal for a workstation, two monitors, a printer and a network rack.',
    items: [
      { label: 'Computer cabling', detail: 'Wired connections that do not depend on wireless conditions.', service: 'home-network-cabling' },
      { label: 'Data lines', detail: 'Drops back to a central point rather than cables run along skirting.', service: 'home-network-cabling' },
      { label: 'Recessed lighting', detail: 'Even light without glare on screens.', service: 'recessed-lighting-installation' },
      { label: 'Ceiling fans', detail: 'Air movement in a room occupied all day.', service: 'ceiling-fan-installation' },
      { label: 'Surge protection', detail: 'Panel-level plus point-of-use at the desk.', service: 'whole-home-surge-protection' },
      { label: 'Telephone and data jacks', detail: 'Terminated properly at wall plates.', service: 'home-network-cabling' },
      { label: 'Dedicated equipment circuits', detail: 'Isolated from the rest of the floor.', service: 'dedicated-circuit-installation' },
      { label: 'Additional outlets', detail: 'Enough capacity to retire the power strips.', service: 'outlet-installation' },
    ],
    considerations: [
      'A dedicated circuit isolates work equipment from unrelated loads',
      'Wired network drops outperform wireless for calls and large transfers',
      'Screen glare is affected by fixture placement and window position',
      'Surge protection matters more where equipment is central to income',
    ],
    faqs: [
      {
        q: 'Does a home office need a dedicated circuit?',
        a: 'It is worth having. It removes competition from bedroom lighting and receptacles, which is the usual cause of a working day being interrupted by a trip.',
      },
      {
        q: 'Is wired networking worth installing?',
        a: 'For video calls and anything latency-sensitive, noticeably. A wired connection removes an entire class of intermittent problem.',
      },
      {
        q: 'How should a home office be lit?',
        a: 'Even ambient light without fixtures directly in front of or behind screens, plus task lighting at the desk. Dimming helps as daylight changes through the day.',
      },
    ],
  },
  {
    slug: 'family-room-electrical-services',
    room: 'Family Room',
    title: 'Family Room Electrical Services in Addison, TX',
    metaTitle: 'Family Room Electrical Services | Addison, TX Electricians',
    metaDescription:
      'Family room electrical in Addison — recessed lighting, dimmers, media wiring, ceiling fans and surge protection. Call (469) 425-8874.',
    summary: 'Layered lighting and concealed media wiring for the room everyone actually uses.',
    icon: 'Sofa',
    intro:
      'A family room has to work for several different things — watching something, reading, having people over — and a single overhead fixture does none of them well. Layered lighting with proper control is what makes the room flexible.',
    items: [
      { label: 'Recessed lighting', detail: 'General coverage placed around the seating, not over it.', service: 'recessed-lighting-installation' },
      { label: 'Dimmer controls', detail: 'The difference between one lighting setting and several.', service: 'dimmer-and-lighting-controls' },
      { label: 'Home theater wiring', detail: 'In-wall power and signal for a mounted display.', service: 'media-room-wiring' },
      { label: 'Media wiring', detail: 'Speaker runs terminated at plates rather than trailing.', service: 'media-room-wiring' },
      { label: 'Surge protection', detail: 'Protecting equipment concentrated in one place.', service: 'whole-home-surge-protection' },
      { label: 'Ceiling fans', detail: 'Comfort in the room occupied most in summer.', service: 'ceiling-fan-installation' },
      { label: 'Smart lighting', detail: 'Scene control for different uses of the room.', service: 'smart-home-electrical-installation' },
      { label: 'Additional outlets', detail: 'Placed for furniture rather than around it.', service: 'outlet-installation' },
    ],
    considerations: [
      'Separate switching for different lighting layers adds most of the flexibility',
      'In-wall cable must be rated for concealment',
      'Display mounts need fixing to structure',
      'Recessed placement should avoid glare on screens',
    ],
    faqs: [
      {
        q: 'Can TV cables be hidden in the wall?',
        a: 'Yes, using in-wall rated cable and recessed plates behind the display. It is the single change that makes a mounted television look intentional rather than improvised.',
      },
      {
        q: 'How should a family room be lit?',
        a: 'In layers — general recessed lighting, some accent or lamp lighting, and separate control for each. That way the room works for watching something and for having people over without recabling anything.',
      },
      {
        q: 'Do I need a dedicated circuit for media equipment?',
        a: 'For a substantial setup it is worth it. Amplifiers and projectors draw meaningfully and benefit from being isolated from lighting and general receptacles.',
      },
    ],
  },
  {
    slug: 'laundry-room-electrical-services',
    room: 'Laundry Room',
    title: 'Laundry Room Electrical Services in Addison, TX',
    metaTitle: 'Laundry Room Electrical Services | Addison, TX Electricians',
    metaDescription:
      'Laundry room electrical in Addison — dryer circuits, washer connections, GFCI protection and lighting. Call (469) 425-8874.',
    summary: 'Dryer circuits, appliance connections and the protection a damp room needs.',
    icon: 'WashingMachine',
    intro:
      'Laundry rooms combine high-draw appliances with moisture, which is a combination that drives specific requirements. They are also frequently under-lit and short of outlets, since they were rarely designed as spaces anyone spends time in.',
    items: [
      { label: 'Washer and dryer connections', detail: 'Correct receptacle configuration for the appliance cord.', service: 'appliance-dedicated-circuits' },
      { label: 'Dryer circuits', detail: '240-volt supply at the amperage the appliance specifies.', service: 'appliance-dedicated-circuits' },
      { label: 'Lighting', detail: 'Enough to sort and fold without squinting.', service: 'lighting-installation' },
      { label: 'Additional outlets', detail: 'For irons, steamers and anything else that lives there.', service: 'outlet-installation' },
      { label: 'Dedicated appliance circuits', detail: 'Laundry equipment does not share well.', service: 'dedicated-circuit-installation' },
      { label: 'GFCI protection', detail: 'Required in laundry areas under current requirements.', service: 'gfci-outlet-installation' },
    ],
    considerations: [
      'Dryer receptacle configurations changed — three-prong and four-prong are not interchangeable',
      'GFCI protection is required in laundry areas',
      'Gas dryers still need a 120-volt circuit for controls and the drum motor',
      'Second-floor laundry rooms warrant attention to moisture and drainage',
    ],
    faqs: [
      {
        q: 'My new dryer cord does not fit the outlet. Why?',
        a: 'Older three-prong and newer four-prong dryer configurations are different, and the difference is about grounding. Depending on the circuit, either the cord is changed or the receptacle and circuit are updated. Adapters are not an acceptable solution.',
      },
      {
        q: 'Does a gas dryer need an electrical circuit?',
        a: 'Yes — a 120-volt circuit for the controls and drum motor. It does not need the 240-volt circuit an electric dryer requires.',
      },
      {
        q: 'Do laundry outlets need GFCI protection?',
        a: 'Under current requirements, yes. It is one of the locations where the requirements expanded, so older laundry rooms often lack it.',
      },
    ],
  },
  {
    slug: 'garage-electrical-services',
    room: 'Garage',
    title: 'Garage Electrical Services in Addison, TX',
    metaTitle: 'Garage Electrical Services in Addison, TX | Ethan & Sons',
    metaDescription:
      'Garage electrical in Addison — EV chargers, workbench lighting, tool circuits, freezer circuits and GFCI protection. Call (469) 425-8874.',
    summary: 'The room that has quietly become the most electrically demanding in the house.',
    icon: 'Warehouse',
    intro:
      'Garages have changed. What used to hold a car and a lawnmower now holds a freezer, a workbench, a compressor and increasingly a vehicle charger — usually on the single circuit the builder provided.',
    items: [
      { label: 'EV chargers', detail: 'A dedicated 240-volt circuit sized after a load calculation.', service: 'ev-charger-installation' },
      { label: 'Workbench lighting', detail: 'Light where you are working, not just overhead.', service: 'lighting-installation' },
      { label: 'Dedicated tool circuits', detail: 'Compressors and saws draw hard on startup.', service: 'dedicated-circuit-installation' },
      { label: 'Additional outlets', detail: 'Placed along the bench rather than one by the door.', service: 'outlet-installation' },
      { label: 'Garage door opener connections', detail: 'A proper receptacle at the ceiling.', service: 'outlet-installation' },
      { label: 'Security lighting', detail: 'Motion-activated coverage of the driveway approach.', service: 'security-lighting' },
      { label: 'Refrigerator and freezer circuits', detail: 'Isolated so an unrelated trip does not spoil the contents.', service: 'appliance-dedicated-circuits' },
      { label: 'GFCI protection', detail: 'Required for garage receptacles.', service: 'gfci-outlet-installation' },
    ],
    considerations: [
      'GFCI protection is required for garage receptacles',
      'Freezers on GFCI circuits can be knocked offline by an unnoticed trip',
      'Vehicle charging requires a dedicated circuit and panel capacity',
      'Garage panels and subpanels need proper clearance kept free of storage',
    ],
    faqs: [
      {
        q: 'Can I run an EV charger from my existing garage circuit?',
        a: 'No. Vehicle charging requires a dedicated circuit sized for continuous load, and the existing general-purpose garage circuit is not suitable.',
      },
      {
        q: 'My garage freezer keeps losing power. Why?',
        a: 'Usually a shared GFCI circuit tripping for an unrelated reason. A dedicated circuit for the freezer avoids discovering the problem by smell.',
      },
      {
        q: 'How much lighting does a garage workshop need?',
        a: 'More than most garages have. General overhead coverage plus dedicated task lighting at the bench makes a substantial difference to accuracy and to eye strain.',
      },
    ],
  },
  {
    slug: 'patio-and-porch-electrical-services',
    room: 'Patio and Porch',
    title: 'Patio and Porch Electrical Services in Addison, TX',
    metaTitle: 'Patio & Porch Electrical Services | Addison, TX Electricians',
    metaDescription:
      'Outdoor living electrical in Addison — patio lighting, outdoor kitchen power, weather-resistant outlets and landscape lighting. Call (469) 425-8874.',
    summary: 'Outdoor living power and lighting with equipment rated for the exposure.',
    icon: 'TreePalm',
    intro:
      'Outdoor living space gets a great deal of use in North Texas for much of the year, and the electrical side determines whether it is usable after dark. Everything out here has to be rated for the weather, which is where cheap installations fail first.',
    items: [
      { label: 'Outdoor lighting', detail: 'Fixtures rated for the exposure, aimed to avoid glare.', service: 'outdoor-lighting-installation' },
      { label: 'Automated lighting', detail: 'Photocell and timer control so nothing needs remembering.', service: 'dimmer-and-lighting-controls' },
      { label: 'Outdoor kitchen connections', detail: 'Dedicated circuits for appliances and refrigeration.', service: 'dedicated-circuit-installation' },
      { label: 'Landscape lighting', detail: 'Low-voltage uplighting and path lighting.', service: 'landscape-lighting-installation' },
      { label: 'Doorbell wiring', detail: 'Including transformer capacity for video units.', service: 'smart-home-electrical-installation' },
      { label: 'Water feature power', detail: 'GFCI-protected supply for pumps and lighting.', service: 'hot-tub-and-pool-circuits' },
      { label: 'Weather-resistant outlets', detail: 'Rated devices with covers that close over a plug.', service: 'gfci-outlet-installation' },
      { label: 'Security lighting', detail: 'Motion coverage of approaches and side access.', service: 'security-lighting' },
    ],
    considerations: [
      'Outdoor receptacles require GFCI protection, weather-resistant devices and in-use covers',
      'Covered areas need damp-rated fixtures; exposed areas need wet-rated',
      'Buried cable must be rated for direct burial at proper depth',
      'Ceiling fans on patios need damp or wet ratings',
    ],
    faqs: [
      {
        q: 'What kind of outlet is needed outdoors?',
        a: 'A weather-resistant GFCI-protected receptacle with an in-use cover — one that closes over a plugged-in cord rather than just flipping shut when empty.',
      },
      {
        q: 'Can I put a ceiling fan on a covered patio?',
        a: 'Yes, with a fan rated for damp locations under a covered area, or wet-rated where it is more exposed. An indoor fan outdoors degrades quickly.',
      },
      {
        q: 'What is involved in an outdoor kitchen?',
        a: 'Dedicated circuits for the appliances, GFCI-protected weather-resistant receptacles, and lighting for the working area. Planning it alongside the build is far easier than retrofitting.',
      },
    ],
  },
  {
    slug: 'basement-and-lower-level-electrical-services',
    room: 'Basement and Lower Level',
    title: 'Basement and Lower-Level Electrical Services in Addison, TX',
    metaTitle: 'Basement & Lower-Level Electrical | Addison, TX Electricians',
    metaDescription:
      'Basement and lower-level electrical in Addison — finishing wiring, lighting, additional circuits and GFCI protection. Call (469) 425-8874.',
    summary: 'Finishing wiring and lighting for lower-level space, with protection for unfinished areas.',
    icon: 'Layers',
    intro:
      'Basements are uncommon in North Texas, but lower levels, bonus rooms over garages and converted spaces are not. Finishing one is essentially building a new room, and the electrical scope reflects that.',
    items: [
      { label: 'Track lighting', detail: 'Flexible coverage where ceiling access is limited.', service: 'lighting-installation' },
      { label: 'Recessed lighting', detail: 'General coverage in a space that usually has less daylight.', service: 'recessed-lighting-installation' },
      { label: 'Media wiring', detail: 'In-wall runs while the space is open.', service: 'media-room-wiring' },
      { label: 'Renovation wiring', detail: 'Full circuit layout for a newly finished space.', service: 'electrical-wiring-upgrade' },
      { label: 'Laundry hookups', detail: 'Relocating or adding laundry connections.', service: 'appliance-dedicated-circuits' },
      { label: 'Cooking-area connections', detail: 'Circuits for a wet bar or secondary kitchen.', service: 'dedicated-circuit-installation' },
      { label: 'Additional circuits', detail: 'A finished lower level needs its own capacity.', service: 'dedicated-circuit-installation' },
      { label: 'Safety upgrades', detail: 'Smoke detection and GFCI protection where required.', service: 'smoke-detector-installation' },
    ],
    considerations: [
      'GFCI protection is required in unfinished areas',
      'Smoke detection is required on every level',
      'Egress and lighting requirements apply to finished lower-level bedrooms',
      'Moisture is a consideration in below-grade spaces',
      'Panel capacity often becomes the constraint on a finish-out',
    ],
    faqs: [
      {
        q: 'What electrical work does finishing a lower level involve?',
        a: 'Effectively a new room: circuit layout, lighting, receptacles at proper spacing, smoke detection, and confirming the panel has capacity for it all. Planning it before framing saves rework.',
      },
      {
        q: 'Do unfinished areas need GFCI protection?',
        a: 'Yes — unfinished basement and utility areas are among the locations where it is required.',
      },
      {
        q: 'Will my panel support a finished lower level?',
        a: 'That depends on current capacity and what the finish-out adds. A load calculation before construction avoids finding out at the wrong moment.',
      },
    ],
  },
  {
    slug: 'media-room-electrical-services',
    room: 'Media Room',
    title: 'Media Room Electrical Services in Addison, TX',
    metaTitle: 'Media Room Electrical Services | Addison, TX Electricians',
    metaDescription:
      'Media room and home theater electrical in Addison — concealed wiring, speaker runs, dedicated circuits and dimming. Call (469) 425-8874.',
    summary: 'Concealed wiring, dedicated circuits and lighting control planned before drywall.',
    icon: 'MonitorSpeaker',
    intro:
      'A media room lives or dies at the wiring stage. Everything that makes one feel finished is decided before the walls close, and almost none of it is cheap to add afterwards.',
    items: [
      { label: 'Home theater wiring', detail: 'In-wall power and signal for display or projector.', service: 'media-room-wiring' },
      { label: 'Television power and cabling', detail: 'Recessed outlets and signal plates behind the display.', service: 'media-room-wiring' },
      { label: 'Speaker wiring', detail: 'In-wall runs terminated at plates in the right positions.', service: 'media-room-wiring' },
      { label: 'Surge protection', detail: 'Panel-level plus point-of-use at the rack.', service: 'whole-home-surge-protection' },
      { label: 'Dimmers', detail: 'Smooth dimming to a low level without flicker.', service: 'dimmer-and-lighting-controls' },
      { label: 'Recessed lighting', detail: 'Placed to avoid reflections on the screen.', service: 'recessed-lighting-installation' },
      { label: 'Dedicated circuits', detail: 'Equipment isolated from lighting and general receptacles.', service: 'dedicated-circuit-installation' },
      { label: 'Network cabling', detail: 'Wired connections for streaming and control.', service: 'home-network-cabling' },
    ],
    considerations: [
      'In-wall cable must be rated for concealment',
      'Signal and power cable are best separated where routing allows',
      'Equipment enclosures need ventilation',
      'Projector positions need power and signal at the ceiling',
      'Specify more capacity than currently needed — access is the expensive part',
    ],
    faqs: [
      {
        q: 'When should media wiring be done?',
        a: 'Before drywall, without exception. Every decision deferred past that point becomes a retrofit.',
      },
      {
        q: 'Does a media room need its own circuit?',
        a: 'For a serious setup, yes. Amplifiers and projectors draw meaningfully and benefit from isolation from lighting and general receptacles.',
      },
      {
        q: 'How should a media room be lit?',
        a: 'Dimmable, placed to avoid reflections on the screen, and ideally with separate control for pathway lighting so people can move without lighting the whole room.',
      },
    ],
  },
];

export const roomsBySlug = Object.fromEntries(
  roomServices.map((r) => [r.slug, r]),
) as Record<string, RoomService | undefined>;

export function getRoom(slug: string) {
  return roomsBySlug[slug];
}
