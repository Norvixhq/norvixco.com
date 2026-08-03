import type { Location } from './types';

/**
 * locations.ts — service area configuration.
 *
 * Add or remove a city here and its page, nav entry, sitemap URL and
 * "nearby areas" links all update. No route file needs editing.
 *
 * Content rule applied throughout: no invented project histories, customer
 * counts, permit anecdotes, travel times or service-boundary guarantees.
 * What is described is the built environment, which is publicly observable.
 */
export const locations: Location[] = [
  {
    slug: 'addison',
    city: 'Addison',
    displayName: 'Addison, TX',
    metaTitle: 'Electrician in Addison, TX | Ethan & Sons Electricians',
    metaDescription:
      'Local electricians serving Addison, TX from Westgrove Drive — residential and commercial electrical repair, panel upgrades, EV chargers and lighting. Call (469) 425-8874.',
    intro:
      'Addison packs an unusual amount into just over four square miles: a dense commercial core, one of the highest restaurant concentrations in North Texas, an airport, and residential neighbourhoods that range from 1970s ranch homes to recently built townhomes and mid-rise apartments. Our office is on Westgrove Drive, which puts us inside the town rather than driving in from somewhere else.',
    builtEnvironment: [
      'Single-family neighbourhoods built largely between the 1960s and 1980s, many now on their second or third remodel',
      'A large stock of apartments and condominiums, including older garden-style complexes and newer mid-rise developments',
      'Townhomes and higher-density residential added over the past two decades',
      'Office buildings and flex space concentrated along Westgrove Drive, Beltway Drive, Airport Parkway and the Quorum area',
      'A dense restaurant corridor along Belt Line Road with kitchens running heavy electrical loads',
      'Retail centres and service businesses distributed throughout the town',
    ],
    commonNeeds: [
      'Panel upgrades in homes originally built with 100-amp service',
      'EV charger installation in attached garages and at multi-family properties',
      'Kitchen and bath circuit work during remodels of older homes',
      'GFCI retrofits where protection requirements have expanded since construction',
      'Restaurant kitchen equipment circuits and dining room lighting',
      'Office suite reconfiguration — workstation power, lighting and data',
      'Exterior and landscape lighting for patios and courtyards',
      'Surge protection ahead of storm season',
    ],
    commercialNote:
      'The commercial mix here is heavily weighted toward offices, restaurants and retail rather than industrial, which suits the work we do. Suites in the Westgrove and Beltway buildings turn over regularly, and tenant improvement electrical — power where the new layout puts it, lighting that suits the use, data cabling that is actually documented — is steady work. Restaurants along Belt Line bring a different set of problems: equipment circuits under sustained load, GFCI protection in wet areas, and dining room lighting that has to look right at every hour the doors are open.',
    nearby: ['farmers-branch', 'carrollton', 'north-dallas', 'dallas', 'richardson', 'coppell'],
    faqs: [
      {
        q: 'Where in Addison are you based?',
        a: 'Our address is 4575 Westgrove Dr STE 7400, Addison, TX 75001 — in the commercial area west of the Tollway near Addison Airport.',
      },
      {
        q: 'Do you work on apartments and condominiums in Addison?',
        a: 'Yes, for work within a unit or where a property owner or manager has engaged us. Common-area and building distribution work generally needs to come through the property management rather than an individual resident.',
      },
      {
        q: 'Can you install an EV charger in an Addison home?',
        a: 'Yes. The first step is a load calculation on the existing panel, since many homes here were built with service capacity that predates vehicle charging. That determines whether the charger fits as-is or whether panel work is needed first.',
      },
      {
        q: 'Do you serve Addison restaurants?',
        a: 'We do. Kitchen equipment circuits, GFCI protection in wet areas, dining room lighting and control, and troubleshooting during off-hours are the usual requests.',
      },
      {
        q: 'My Addison home is from the 1970s. Does it need rewiring?',
        a: 'Not necessarily. Age alone is not the deciding factor — wiring type, condition, grounding and capacity are. Many homes from that era have wiring in sound condition but too few circuits for how the house is used now. An inspection tells you which applies.',
      },
      {
        q: 'How do I reach you?',
        a: 'Call (469) 425-8874, or use the email link on our contact page to describe what you need. There is no form on this site — it goes straight to a phone call or your own email application.',
      },
    ],
  },
  {
    slug: 'farmers-branch',
    city: 'Farmers Branch',
    displayName: 'Farmers Branch, TX',
    metaTitle: 'Electrician in Farmers Branch, TX | Ethan & Sons Electricians',
    metaDescription:
      'Electrical services for Farmers Branch homes and businesses — repairs, panel upgrades, lighting and EV chargers. Based nearby in Addison. Call (469) 425-8874.',
    intro:
      'Farmers Branch sits directly southwest of Addison and shares a border with it. Its housing stock skews older than much of the surrounding area, with substantial mid-century neighbourhoods that have been steadily renovated, alongside newer development around the Mercer Crossing area.',
    builtEnvironment: [
      'Large concentrations of 1950s and 1960s single-family homes, many original to the postwar expansion',
      'Mid-century neighbourhoods where remodelling has been ongoing for decades',
      'Newer master-planned residential development in the Mercer Crossing area',
      'Business parks and light commercial along the I-35E and I-635 corridors',
      'Retail and restaurant space along Josey Lane and Valley View Lane',
    ],
    commonNeeds: [
      'Panel replacement in homes still on original mid-century equipment',
      'Grounding retrofits where two-prong receptacles remain',
      'Aluminium branch wiring assessment in homes from the relevant era',
      'Kitchen and bathroom circuit additions during renovation',
      'Whole-home surge protection',
      'Business park suite lighting and power',
    ],
    commercialNote:
      'The commercial base here leans toward business parks and light commercial rather than street-front retail, which means suite-level work: lighting retrofits, added circuits for equipment, panel capacity assessments before a tenant moves in. Older buildings in the corridor frequently have panels that have accumulated undocumented circuits across successive tenancies.',
    nearby: ['addison', 'carrollton', 'dallas', 'irving', 'coppell', 'north-dallas'],
    faqs: [
      {
        q: 'Do you work in Farmers Branch?',
        a: 'Yes. It borders Addison directly, and much of the housing there is the age where panel, grounding and capacity work comes up regularly.',
      },
      {
        q: 'My Farmers Branch home was built in the 1960s. What should I be looking at?',
        a: 'The usual priorities are the panel — its type, capacity and condition — grounding, and whether GFCI protection exists where it is now required. An inspection covers all three and gives you a priority order.',
      },
      {
        q: 'Does my older home have aluminium wiring?',
        a: 'Homes built roughly between the mid-1960s and mid-1970s are the ones to check. It is identifiable at the panel and at device terminations. Where present, it is generally addressed at the connections with listed devices rather than replaced wholesale.',
      },
      {
        q: 'Can you upgrade a panel in Farmers Branch?',
        a: 'Yes. It involves a load calculation first, then a planned power interruption during the changeover, and coordination with the utility where the service capacity itself is increasing.',
      },
    ],
  },
  {
    slug: 'carrollton',
    city: 'Carrollton',
    displayName: 'Carrollton, TX',
    metaTitle: 'Electrician in Carrollton, TX | Ethan & Sons Electricians',
    metaDescription:
      'Electrical repair, panel upgrades, lighting and EV charger installation for Carrollton, TX homes and businesses. Call (469) 425-8874.',
    intro:
      'Carrollton is large and varied — one of the bigger cities in the immediate area, spanning three counties, with housing that ranges from 1970s subdivisions through 1990s expansion to newer infill. That spread means the electrical work varies considerably depending on which part of the city a property sits in.',
    builtEnvironment: [
      'Extensive 1970s and 1980s subdivisions across the older parts of the city',
      'Substantial 1990s and 2000s residential expansion in the northern and western areas',
      'Historic downtown Carrollton with older commercial buildings around the square',
      'Retail corridors along Josey Lane, Trinity Mills and Old Denton Road',
      'Light industrial and warehouse space near the rail corridors',
      'Apartment and townhome development near the DART green line stations',
    ],
    commonNeeds: [
      'Panel upgrades in 1970s and 1980s homes reaching capacity',
      'EV charger installation across a broad range of garage configurations',
      'Recessed and kitchen lighting during remodels',
      'Dedicated circuits for home offices and appliances',
      'Exterior and landscape lighting',
      'Older commercial building electrical near the downtown square',
    ],
    commercialNote:
      'Carrollton has a wider commercial spread than most of its neighbours, from small retail near the historic square to newer suburban centres. Older buildings around downtown often have distribution that has been extended repeatedly, which makes circuit tracing and directory correction useful work in its own right before anything else is attempted.',
    nearby: ['addison', 'farmers-branch', 'the-colony', 'lewisville', 'coppell', 'plano'],
    faqs: [
      {
        q: 'Do you serve all of Carrollton?',
        a: 'Carrollton is spread across a wide area, so call and let us know where you are located and what you need. We will be straightforward about scheduling.',
      },
      {
        q: 'Are Carrollton homes typically 100-amp or 200-amp service?',
        a: 'It varies significantly by neighbourhood and build year. Homes from the 1970s are frequently 100-amp; later construction is more often 200-amp. The panel label and a load calculation tell you exactly what you have.',
      },
      {
        q: 'Can you add a circuit for a home office?',
        a: 'Yes. A dedicated circuit for office equipment removes it from competition with bedroom lighting and receptacles, which is where most home office tripping originates.',
      },
      {
        q: 'Do you handle older commercial buildings?',
        a: 'Yes, for offices, retail and restaurants. Older buildings often need circuit tracing and directory correction before any other work, simply so everyone knows what feeds what.',
      },
    ],
  },
  {
    slug: 'north-dallas',
    city: 'North Dallas',
    displayName: 'North Dallas',
    isDistrict: true,
    metaTitle: 'Electrician in North Dallas | Ethan & Sons Electricians',
    metaDescription:
      'Electrical services across North Dallas — repairs, panel upgrades, lighting and EV chargers for homes and businesses. Based in nearby Addison. Call (469) 425-8874.',
    intro:
      'North Dallas covers the area immediately south and east of Addison, and the two are effectively continuous. It is one of the closest parts of our service area, with housing that spans mid-century ranch homes through substantial recent rebuilds.',
    builtEnvironment: [
      'Established mid-century neighbourhoods with mature tree cover',
      'Substantial teardown and rebuild activity producing much larger new homes',
      'Older single-family stock where original electrical systems remain in service',
      'Office and retail concentrations along the Tollway and Preston Road corridors',
      'Apartment and condominium developments of varying vintages',
    ],
    commonNeeds: [
      'Service and panel upgrades in mid-century homes',
      'Full electrical scope on major renovations and rebuilds',
      'Landscape and architectural exterior lighting',
      'EV charger installation, frequently alongside panel work',
      'Smart home electrical for connected devices and lighting control',
      'Whole-home surge protection',
    ],
    commercialNote:
      'The commercial side here is dominated by office and retail along the major corridors. Tenant improvement work, lighting retrofits and capacity assessments before a fit-out are the recurring requests, much as they are in Addison itself.',
    nearby: ['addison', 'dallas', 'preston-hollow', 'far-north-dallas', 'richardson', 'university-park'],
    faqs: [
      {
        q: 'How close is North Dallas to your Addison office?',
        a: 'The two areas are directly adjacent — Addison sits within North Dallas geographically, even though it is a separate town. It is among the closest parts of our service area.',
      },
      {
        q: 'We are renovating a mid-century home. What electrical work is typical?',
        a: 'Panel and service capacity usually comes first, then circuit count for how the house will actually be used, then grounding and protection. A renovation is the least expensive moment to address all three, because the walls are already open.',
      },
      {
        q: 'Can you do landscape lighting for a North Dallas property?',
        a: 'Yes. Mature tree cover in these neighbourhoods makes uplighting particularly effective, and low-voltage systems can be adjusted as planting changes.',
      },
    ],
  },
  {
    slug: 'dallas',
    city: 'Dallas',
    displayName: 'Dallas, TX',
    metaTitle: 'Electrician in Dallas, TX | Ethan & Sons Electricians',
    metaDescription:
      'Residential and commercial electrical services in Dallas, TX — repairs, panel upgrades, lighting, EV chargers and safety inspections. Call (469) 425-8874.',
    intro:
      'Dallas covers an enormous range of building stock, from prewar homes in the older neighbourhoods to high-rise construction downtown. We work primarily in the northern portions of the city closest to our Addison base, where the mix of established single-family housing and neighbourhood commercial suits the work we do.',
    builtEnvironment: [
      'Neighbourhoods spanning nearly a century of construction, with correspondingly varied wiring',
      'Prewar and early postwar homes where original wiring may still be in service',
      'Extensive mid-century single-family housing',
      'Apartment, condominium and townhome development throughout',
      'Neighbourhood retail, restaurants and office space distributed across the city',
    ],
    commonNeeds: [
      'Knob-and-tube and cloth-insulated wiring assessment in the oldest properties',
      'Panel and service upgrades across a wide range of vintages',
      'Grounding retrofits and GFCI protection in older homes',
      'Kitchen and bath electrical during renovation',
      'EV charger installation',
      'Neighbourhood commercial and restaurant electrical',
    ],
    commercialNote:
      'Our commercial work in Dallas focuses on offices, retail spaces and restaurants rather than industrial facilities. Neighbourhood commercial buildings frequently have distribution that has evolved across many tenancies, which makes an accurate circuit directory the practical starting point for almost any project.',
    nearby: ['north-dallas', 'addison', 'preston-hollow', 'university-park', 'highland-park', 'farmers-branch'],
    faqs: [
      {
        q: 'Which parts of Dallas do you serve?',
        a: 'We work primarily in the northern parts of the city nearest our Addison location. Call and tell us where you are — we will be straightforward about whether we can help.',
      },
      {
        q: 'What is knob-and-tube wiring and might my Dallas home have it?',
        a: 'It is an early wiring method using ceramic knobs and tubes, found in the oldest properties. It has no equipment ground and is not designed to be covered by insulation. Where it is still in service, replacement is generally recommended.',
      },
      {
        q: 'Do you work on commercial property in Dallas?',
        a: 'Yes — offices, retail and restaurants. We do not take on heavy industrial or high-voltage distribution work.',
      },
      {
        q: 'Can you inspect a Dallas home before I buy it?',
        a: 'Yes, and on an older property it is worth doing. You get a written report with findings prioritised, which is far more useful during a negotiation than afterwards.',
      },
    ],
  },
  {
    slug: 'richardson',
    city: 'Richardson',
    displayName: 'Richardson, TX',
    metaTitle: 'Electrician in Richardson, TX | Ethan & Sons Electricians',
    metaDescription:
      'Electrical services for Richardson, TX homes and businesses — repairs, panel upgrades, lighting, data cabling and EV chargers. Call (469) 425-8874.',
    intro:
      'Richardson combines established mid-century residential neighbourhoods with the Telecom Corridor, one of the larger concentrations of office and technology employment in the region. That produces two fairly distinct kinds of electrical work in the same city.',
    builtEnvironment: [
      'Extensive 1950s through 1970s single-family neighbourhoods, many well maintained and steadily renovated',
      'The Telecom Corridor along US-75 with substantial office and technology space',
      'Apartment and mixed-use development near the DART red line stations',
      'Retail along Belt Line Road, Arapaho Road and Campbell Road',
      'University-adjacent housing near UT Dallas',
    ],
    commonNeeds: [
      'Panel upgrades in homes on original mid-century service',
      'Home office circuits and network cabling',
      'Grounding and GFCI retrofits',
      'Kitchen and bathroom remodel electrical',
      'EV charger installation',
      'Office suite power, lighting and data cabling',
    ],
    commercialNote:
      'The office concentration along the Telecom Corridor means a steady flow of suite reconfiguration work — workstation power moving with the layout, lighting retrofits, and structured data cabling that replaces years of accumulated ad hoc runs. Capacity assessment before a fit-out is worth doing early on these projects.',
    nearby: ['plano', 'north-dallas', 'addison', 'dallas', 'far-north-dallas'],
    faqs: [
      {
        q: 'Do you do home office electrical work in Richardson?',
        a: 'Frequently. Dedicated circuits for equipment and wired network drops are the two requests that come up most, and both make a noticeable difference to reliability.',
      },
      {
        q: 'My Richardson home is from the 1960s. What is typically needed?',
        a: 'Panel condition and capacity, grounding, and GFCI protection where requirements have expanded since it was built. An inspection covers all three with a priority order.',
      },
      {
        q: 'Can you work on office suites in the Telecom Corridor?',
        a: 'Yes — workstation power, lighting upgrades, data cabling and capacity assessments ahead of a fit-out. Landlord approval is usually required in leased space.',
      },
    ],
  },
  {
    slug: 'plano',
    city: 'Plano',
    displayName: 'Plano, TX',
    metaTitle: 'Electrician in Plano, TX | Ethan & Sons Electricians',
    metaDescription:
      'Electrical repair, panel upgrades, EV chargers, lighting and smart home work for Plano, TX. Call (469) 425-8874.',
    intro:
      'Plano grew in distinct waves, and the electrical work reflects that. The older sections south of Parker Road have housing from the 1970s and 1980s now reaching the age where panels and capacity become the question. West Plano and the newer northern areas have larger, later homes where the work is more often additions than corrections.',
    builtEnvironment: [
      'Older neighbourhoods in central and east Plano dating from the 1970s and 1980s',
      'Extensive 1990s and 2000s development through west and north Plano',
      'Large corporate campuses and office parks along the Tollway and Legacy corridor',
      'The Legacy West and Shops at Legacy mixed-use developments',
      'Downtown Plano with older buildings and newer mixed-use infill',
      'Substantial retail across Preston Road, Park Boulevard and Spring Creek Parkway',
    ],
    commonNeeds: [
      'Panel upgrades in 1970s and 1980s homes',
      'EV charger installation, common across the newer neighbourhoods',
      'Smart home electrical and lighting control',
      'Home office circuits and network cabling',
      'Media room and home theater wiring in larger homes',
      'Landscape and architectural exterior lighting',
    ],
    commercialNote:
      'Plano has one of the larger corporate office concentrations in the region, though much of that is served by facilities contracts. Our commercial work here is more typically smaller offices, retail and restaurants — tenant improvements, lighting upgrades and equipment circuits.',
    nearby: ['richardson', 'frisco', 'the-colony', 'carrollton', 'addison', 'far-north-dallas'],
    faqs: [
      {
        q: 'Do a lot of Plano homes need panel upgrades?',
        a: 'The older sections frequently do, particularly homes from the 1970s and early 1980s built with 100-amp service. Newer west and north Plano construction is more often already at 200 amps.',
      },
      {
        q: 'Can you install an EV charger in Plano?',
        a: 'Yes. The load calculation comes first — many newer Plano homes have capacity available, but that should be confirmed rather than assumed before selecting a charger amperage.',
      },
      {
        q: 'Do you do media room wiring?',
        a: 'Yes. In-wall power and signal runs, speaker cabling, dedicated equipment circuits and dimming. It is far easier before drywall closes, so early planning helps.',
      },
    ],
  },
  {
    slug: 'frisco',
    city: 'Frisco',
    displayName: 'Frisco, TX',
    metaTitle: 'Electrician in Frisco, TX | Ethan & Sons Electricians',
    metaDescription:
      'Electrical services for Frisco, TX homes and businesses — EV chargers, smart home electrical, lighting and dedicated circuits. Call (469) 425-8874.',
    intro:
      'Frisco is one of the newest-built cities in the area, with the large majority of its housing constructed since the late 1990s. That changes the nature of the work considerably — less correction of aging systems, more additions to systems that are sound but were not designed with vehicle charging or extensive automation in mind.',
    builtEnvironment: [
      'Predominantly post-1998 residential construction, much of it large single-family homes',
      'Master-planned communities with consistent build vintages',
      'Substantial recent apartment and townhome development',
      'The Star, Frisco Station and other large mixed-use developments',
      'Extensive retail along Preston Road, Legacy Drive and the Tollway',
      'Newer office and medical space',
    ],
    commonNeeds: [
      'EV charger installation in attached garages',
      'Smart home electrical — switches, doorbells, cameras and lighting control',
      'Media room and home theater wiring',
      'Dedicated circuits for home offices and appliances',
      'Outdoor kitchen, patio and landscape lighting',
      'Whole-home surge protection',
    ],
    commercialNote:
      'Frisco commercial work skews newer — retail, restaurants and office space in relatively recent buildings. Tenant improvement electrical for new occupants and lighting work are the usual requests rather than correction of legacy conditions.',
    nearby: ['plano', 'the-colony', 'lewisville', 'carrollton'],
    faqs: [
      {
        q: 'Do newer Frisco homes still need electrical work?',
        a: 'Regularly, though of a different kind. Newer homes rarely need corrections; they need additions — vehicle chargers, dedicated circuits, smart switches that require a neutral, outdoor kitchen power, media wiring.',
      },
      {
        q: 'Will my Frisco home support an EV charger?',
        a: 'Many can, since newer construction typically has 200-amp service. That still needs confirming with a load calculation, because total connected load matters as much as service size.',
      },
      {
        q: 'Why will my smart switches not work?',
        a: 'Usually a missing neutral at the switch box. Even in newer homes, some switch loops do not carry one. It is worth checking before ordering a full set of devices.',
      },
    ],
  },
  {
    slug: 'the-colony',
    city: 'The Colony',
    displayName: 'The Colony, TX',
    metaTitle: 'Electrician in The Colony, TX | Ethan & Sons Electricians',
    metaDescription:
      'Electrical repair, panel work, lighting and EV charger installation for The Colony, TX. Call (469) 425-8874.',
    intro:
      'The Colony sits along the eastern shore of Lewisville Lake, which gives it a different character from its inland neighbours. Housing spans 1970s and 1980s original development through substantial recent construction, with waterfront proximity adding exterior and outdoor living electrical work to the usual mix.',
    builtEnvironment: [
      'Original 1970s and 1980s neighbourhoods across the older sections',
      'Newer residential development, including around Grandscape',
      'Lakefront and lake-adjacent properties',
      'The Grandscape mixed-use retail and entertainment development',
      'Retail and commercial along State Highway 121 and Main Street',
    ],
    commonNeeds: [
      'Panel upgrades in original 1970s and 1980s homes',
      'Outdoor living electrical — patios, outdoor kitchens and landscape lighting',
      'GFCI protection for exterior and lake-adjacent locations',
      'EV charger installation',
      'Boat dock and waterfront electrical considerations',
      'Whole-home surge protection',
    ],
    commercialNote:
      'Commercial work here centres on retail and restaurants, including the Grandscape area. Restaurant kitchen circuits, dining lighting and exterior lighting are the recurring requests.',
    nearby: ['frisco', 'lewisville', 'carrollton', 'plano'],
    faqs: [
      {
        q: 'Do lake-adjacent properties need different electrical work?',
        a: 'The main difference is exterior protection. Moisture exposure makes GFCI protection, weather-rated equipment and proper in-use covers more consequential, and marine or dock electrical carries its own specific requirements.',
      },
      {
        q: 'Can you install outdoor kitchen electrical?',
        a: 'Yes — dedicated circuits for appliances, GFCI-protected weather-resistant receptacles, and lighting for the area. It is best planned alongside the rest of the outdoor build.',
      },
      {
        q: 'Are older homes in The Colony likely to need panel work?',
        a: 'The 1970s and 1980s sections often do, particularly where the original service was sized for a much smaller electrical load than the household now runs.',
      },
    ],
  },
  {
    slug: 'lewisville',
    city: 'Lewisville',
    displayName: 'Lewisville, TX',
    metaTitle: 'Electrician in Lewisville, TX | Ethan & Sons Electricians',
    metaDescription:
      'Electrical services for Lewisville, TX homes and businesses — repairs, panel upgrades, lighting and EV chargers. Call (469) 425-8874.',
    intro:
      'Lewisville has a broader range of housing vintages than most of its neighbours, from an older historic core through decades of subsequent expansion out toward the lake. That variety means the electrical work varies widely depending on which part of the city a property is in.',
    builtEnvironment: [
      'An older historic downtown core with early commercial and residential buildings',
      'Mid-century and 1970s neighbourhoods through the central areas',
      'Substantial later expansion toward Lewisville Lake and the western edges',
      'Apartment and multi-family development along the I-35E corridor',
      'Retail concentrated around Vista Ridge Mall and the Highway 121 corridor',
      'Light industrial and warehouse space near the interstate',
    ],
    commonNeeds: [
      'Panel and service upgrades across older neighbourhoods',
      'Grounding and GFCI retrofits in mid-century homes',
      'Older wiring assessment in the historic core',
      'Kitchen and bath remodel electrical',
      'EV charger installation',
      'Retail and restaurant electrical along the commercial corridors',
    ],
    commercialNote:
      'Commercial work in Lewisville spans older downtown buildings and newer suburban retail. The older stock frequently needs circuit tracing and directory correction before anything else, because distribution has been extended repeatedly across tenancies.',
    nearby: ['the-colony', 'carrollton', 'coppell', 'frisco'],
    faqs: [
      {
        q: 'Do you work in older downtown Lewisville buildings?',
        a: 'Yes, for offices, retail and restaurants. The usual first step in older buildings is establishing what the existing circuits actually feed, since the panel directory is rarely accurate.',
      },
      {
        q: 'What is typical for a mid-century Lewisville home?',
        a: 'Panel condition and capacity, grounding, and GFCI protection where the requirements have expanded since construction. Circuit count is often the practical constraint.',
      },
      {
        q: 'Can you install a charger at a Lewisville property?',
        a: 'Yes, subject to a load calculation. Older sections of the city more often need panel work first than the newer western areas do.',
      },
    ],
  },
  {
    slug: 'coppell',
    city: 'Coppell',
    displayName: 'Coppell, TX',
    metaTitle: 'Electrician in Coppell, TX | Ethan & Sons Electricians',
    metaDescription:
      'Electrical services for Coppell, TX homes and businesses — repairs, panel upgrades, lighting, EV chargers and smart home work. Call (469) 425-8874.',
    intro:
      'Coppell developed largely through the 1980s and 1990s, which puts much of its housing at an age where original systems are still sound but reaching the limits of what a modern household asks of them. It is a compact, largely residential city with a substantial logistics and commercial presence along its eastern edge.',
    builtEnvironment: [
      'Predominantly 1980s and 1990s single-family residential',
      'Well-established neighbourhoods with consistent build vintages',
      'A small historic downtown area',
      'Substantial distribution and logistics facilities along the eastern corridor near DFW Airport',
      'Neighbourhood retail and restaurant space',
    ],
    commonNeeds: [
      'Panel capacity assessment ahead of EV charger installation',
      'Dedicated circuits for home offices and appliances',
      'Kitchen and bath remodel electrical',
      'Recessed and landscape lighting',
      'Smart home electrical and lighting control',
      'Whole-home surge protection',
    ],
    commercialNote:
      'Our commercial work in Coppell is with offices, retail and restaurants rather than the large distribution facilities on the eastern edge — that scale of work belongs to industrial contractors.',
    nearby: ['irving', 'las-colinas', 'carrollton', 'lewisville', 'farmers-branch', 'valley-ranch'],
    faqs: [
      {
        q: 'Are 1980s and 1990s Coppell homes usually 200-amp?',
        a: 'Many are, though not all, and total connected load matters as much as service size. A load calculation is what settles it before adding something substantial.',
      },
      {
        q: 'Can you do smart home electrical in Coppell?',
        a: 'Yes. The most common issue is a missing neutral at switch boxes, which is worth checking before buying devices.',
      },
      {
        q: 'Do you serve the distribution facilities on the east side?',
        a: 'No — that scale of facility is industrial work and outside what we take on. We work with offices, retail and restaurants.',
      },
    ],
  },
  {
    slug: 'irving',
    city: 'Irving',
    displayName: 'Irving, TX',
    metaTitle: 'Electrician in Irving, TX | Ethan & Sons Electricians',
    metaDescription:
      'Residential and commercial electrical services in Irving, TX — repairs, panel upgrades, lighting and EV chargers. Call (469) 425-8874.',
    intro:
      'Irving spans an unusually wide range, from mid-century neighbourhoods in the older sections through the corporate towers of Las Colinas to newer development around the entertainment district. The electrical work varies accordingly.',
    builtEnvironment: [
      'Established mid-century neighbourhoods across the older central and southern areas',
      'The Las Colinas district with corporate office towers and urban-format residential',
      'Newer development around the Toyota Music Factory and entertainment district',
      'Substantial apartment and multi-family housing throughout',
      'Commercial corridors along Belt Line Road, MacArthur Boulevard and State Highway 114',
    ],
    commonNeeds: [
      'Panel and service upgrades in older neighbourhoods',
      'Grounding and GFCI retrofits',
      'Kitchen and bath remodel electrical',
      'EV charger installation',
      'Office suite power, lighting and data cabling',
      'Restaurant and retail electrical work',
    ],
    commercialNote:
      'Irving has a large commercial base, and our work within it focuses on smaller offices, retail and restaurants rather than the corporate towers, which are generally served by building facilities contracts.',
    nearby: ['las-colinas', 'valley-ranch', 'coppell', 'farmers-branch', 'dallas'],
    faqs: [
      {
        q: 'Which parts of Irving do you serve?',
        a: 'We work across the city, with the northern and Las Colinas areas closest to our Addison base. Call and tell us where you are.',
      },
      {
        q: 'Do you work in office towers in Irving?',
        a: 'Large towers typically have building facilities contracts covering their electrical work. We are better suited to smaller offices, retail spaces and restaurants.',
      },
      {
        q: 'What electrical work do older Irving homes usually need?',
        a: 'Panel condition and capacity, grounding, GFCI protection where requirements have expanded, and additional circuits for how the home is actually used now.',
      },
    ],
  },
  {
    slug: 'las-colinas',
    city: 'Las Colinas',
    displayName: 'Las Colinas',
    isDistrict: true,
    metaTitle: 'Electrician in Las Colinas | Ethan & Sons Electricians',
    metaDescription:
      'Electrical services for Las Colinas homes, offices and retail — repairs, lighting, EV chargers and tenant improvements. Call (469) 425-8874.',
    intro:
      'Las Colinas is a master-planned district within Irving, built from the 1970s onward around a canal system and a corporate office core. The residential side ranges from urban-format condominiums to established single-family neighbourhoods, which produces a distinctive mix of electrical work.',
    builtEnvironment: [
      'The Urban Center with corporate office towers and structured parking',
      'Canal-adjacent condominiums and urban-format residential',
      'Established single-family neighbourhoods within the master plan',
      'Hotel and hospitality properties',
      'Retail and restaurant space serving the office population',
      'Substantial newer multi-family development',
    ],
    commonNeeds: [
      'Condominium and townhome electrical work within units',
      'EV charger installation, including where parking arrangements complicate routing',
      'Lighting and dimming for urban-format residential',
      'Office suite reconfiguration and tenant improvements',
      'Restaurant and retail electrical',
      'Exterior and landscape lighting',
    ],
    commercialNote:
      'The corporate towers here generally operate under building facilities contracts. Our commercial work is with the smaller offices, retail and restaurants that serve the district, where tenant improvement and lighting work is the recurring need.',
    nearby: ['irving', 'valley-ranch', 'coppell', 'dallas', 'farmers-branch'],
    faqs: [
      {
        q: 'Can you install an EV charger at a Las Colinas condominium?',
        a: 'Sometimes, depending on the parking arrangement and the association rules. Assigned garage spaces are more straightforward than shared structured parking. Association approval is generally required, and it is worth starting there.',
      },
      {
        q: 'Do you work in the office towers?',
        a: 'Larger towers usually have facilities contracts in place. We are a better fit for smaller offices, retail and restaurants in the district.',
      },
      {
        q: 'Do you do work in condominiums?',
        a: 'Yes, within the unit. Anything touching building distribution or common areas needs to go through the association or property management.',
      },
    ],
  },
  {
    slug: 'valley-ranch',
    city: 'Valley Ranch',
    displayName: 'Valley Ranch',
    isDistrict: true,
    metaTitle: 'Electrician in Valley Ranch | Ethan & Sons Electricians',
    metaDescription:
      'Electrical repair, panel upgrades, lighting and EV chargers for Valley Ranch homes and businesses. Call (469) 425-8874.',
    intro:
      'Valley Ranch is a planned community in northern Irving, developed largely through the 1980s and 1990s around a network of canals and greenbelts. Its housing is a mix of single-family homes, townhomes and condominiums of broadly similar vintage.',
    builtEnvironment: [
      'Planned residential development from the 1980s and 1990s',
      'A substantial mix of single-family homes, townhomes and condominiums',
      'Canal and greenbelt landscaping throughout the community',
      'Homeowner and condominium associations governing much of the area',
      'Neighbourhood retail and services',
    ],
    commonNeeds: [
      'Panel assessment in homes now reaching thirty to forty years old',
      'EV charger installation in attached garages',
      'Kitchen and bath remodel electrical',
      'Recessed lighting and dimming upgrades',
      'Exterior and patio lighting',
      'Whole-home surge protection',
    ],
    commercialNote:
      'Commercial work here is neighbourhood-scale — small offices, retail and restaurants serving the community rather than large commercial buildings.',
    nearby: ['las-colinas', 'irving', 'coppell', 'farmers-branch'],
    faqs: [
      {
        q: 'Do association rules affect electrical work in Valley Ranch?',
        a: 'They can, particularly for anything visible from outside — exterior lighting, charger equipment on a garage exterior, satellite or camera mounting. It is worth checking the association requirements before scheduling.',
      },
      {
        q: 'Are Valley Ranch homes at the age where panels need attention?',
        a: 'Many are approaching or past thirty years, which is where panel condition and capacity become worth assessing — particularly before adding a significant load.',
      },
      {
        q: 'Can you work in townhomes and condominiums here?',
        a: 'Yes, within the unit. Shared distribution and common areas need to be arranged through the association.',
      },
    ],
  },
  {
    slug: 'far-north-dallas',
    city: 'Far North Dallas',
    displayName: 'Far North Dallas',
    isDistrict: true,
    metaTitle: 'Electrician in Far North Dallas | Ethan & Sons Electricians',
    metaDescription:
      'Electrical services for Far North Dallas homes and businesses — repairs, panel upgrades, EV chargers and lighting. Call (469) 425-8874.',
    intro:
      'Far North Dallas covers the area north of Addison up toward the Collin County line, developed largely through the 1980s and 1990s. It is close to our base and shares much of Addison\u2019s building character, with a mix of single-family neighbourhoods and substantial multi-family development.',
    builtEnvironment: [
      'Predominantly 1980s and 1990s single-family neighbourhoods',
      'Extensive apartment and condominium development',
      'Office and retail along the Tollway, Preston Road and Frankford Road',
      'Townhome and higher-density residential infill',
      'Neighbourhood retail centres throughout',
    ],
    commonNeeds: [
      'Panel capacity assessment before adding significant load',
      'EV charger installation',
      'Kitchen and bath remodel electrical',
      'Recessed lighting and dimming',
      'Home office circuits and network cabling',
      'Whole-home surge protection',
    ],
    commercialNote:
      'Commercial work here is largely offices and retail along the major corridors — tenant improvements, lighting retrofits and capacity assessments before a fit-out.',
    nearby: ['addison', 'north-dallas', 'plano', 'richardson', 'dallas'],
    faqs: [
      {
        q: 'How close is Far North Dallas to your office?',
        a: 'It borders Addison directly to the north and east, making it one of the closest parts of our service area.',
      },
      {
        q: 'What is typical for a 1980s home here?',
        a: 'Panel capacity is the usual question, particularly before adding a vehicle charger. GFCI protection and grounding are also worth reviewing, since requirements have expanded since construction.',
      },
      {
        q: 'Do you work in apartment communities?',
        a: 'Within individual units, or where a property owner or manager engages us. Building distribution and common areas need to come through management.',
      },
    ],
  },
  {
    slug: 'preston-hollow',
    city: 'Preston Hollow',
    displayName: 'Preston Hollow',
    isDistrict: true,
    metaTitle: 'Electrician in Preston Hollow | Ethan & Sons Electricians',
    metaDescription:
      'Electrical services for Preston Hollow homes — panel upgrades, landscape lighting, smart home electrical and renovation work. Call (469) 425-8874.',
    intro:
      'Preston Hollow is an established residential area in North Dallas known for large lots, mature tree cover and a mix of original mid-century homes alongside substantial newer construction. Renovation and rebuild activity is constant, which shapes the electrical work.',
    builtEnvironment: [
      'Large lots with mature landscaping and significant tree cover',
      'Original mid-century homes alongside extensive rebuilds and additions',
      'Substantial newer construction on redeveloped lots',
      'Predominantly single-family residential with limited commercial',
      'Neighbourhood retail along the surrounding corridors',
    ],
    commonNeeds: [
      'Service and panel upgrades during renovation',
      'Full electrical scope on major additions and rebuilds',
      'Landscape and architectural exterior lighting',
      'Smart home electrical and whole-home lighting control',
      'Media room and home theater wiring',
      'Pool, spa and outdoor kitchen circuits',
      'Whole-home surge protection',
    ],
    commercialNote:
      'Preston Hollow is predominantly residential. Commercial work in the immediate area is limited to neighbourhood retail and professional offices along the surrounding corridors.',
    nearby: ['north-dallas', 'dallas', 'university-park', 'highland-park', 'addison'],
    faqs: [
      {
        q: 'Do you handle electrical for major renovations?',
        a: 'Yes. On a substantial renovation the electrical scope usually starts with service capacity, then circuit layout for the new plan, then lighting and controls. Getting all three settled before rough-in is what keeps the project on schedule.',
      },
      {
        q: 'Can you do landscape lighting on a large lot?',
        a: 'Yes, and mature tree cover makes uplighting particularly effective here. Low-voltage systems handle larger properties well and can be adjusted as planting matures.',
      },
      {
        q: 'What is involved in electrical for a pool or spa?',
        a: 'Dedicated GFCI-protected circuits, correctly placed disconnects and equipotential bonding of surrounding metal components. The requirements around water are more prescriptive than elsewhere in the code.',
      },
    ],
  },
  {
    slug: 'university-park',
    city: 'University Park',
    displayName: 'University Park, TX',
    metaTitle: 'Electrician in University Park, TX | Ethan & Sons Electricians',
    metaDescription:
      'Electrical services for University Park homes — older home wiring, panel upgrades, lighting and renovation electrical. Call (469) 425-8874.',
    intro:
      'University Park has some of the oldest housing stock in our service area, much of it dating to the 1920s through 1940s. Original wiring of that age is a genuine consideration, and renovation work here regularly involves bringing electrical systems forward by several decades at once.',
    builtEnvironment: [
      'Substantial prewar housing from the 1920s through 1940s',
      'Established neighbourhoods around the SMU campus',
      'Extensive renovation and expansion of original homes',
      'Some newer construction on redeveloped lots',
      'Neighbourhood retail along Hillcrest Avenue and Lovers Lane',
    ],
    commonNeeds: [
      'Assessment of knob-and-tube and cloth-insulated wiring',
      'Whole-home and phased rewiring',
      'Panel and service upgrades from original equipment',
      'Grounding retrofits where two-prong receptacles remain',
      'Electrical scope during renovation and additions',
      'Lighting design for older homes with limited original provision',
    ],
    commercialNote:
      'University Park is almost entirely residential. Commercial work is limited to the small neighbourhood retail and professional office areas along Hillcrest and Lovers Lane.',
    nearby: ['highland-park', 'dallas', 'north-dallas', 'preston-hollow'],
    faqs: [
      {
        q: 'Does my 1930s University Park home need rewiring?',
        a: 'It depends on what is actually there. Some prewar homes have been substantially rewired over the decades; others retain original circuits. An inspection establishes what wiring types are present and their condition, which is the necessary starting point.',
      },
      {
        q: 'Can rewiring be done in stages?',
        a: 'Yes, and in an older home that is often the practical approach — prioritising kitchens, bathrooms and any circuits showing problems, and coordinating the rest with renovation work as it happens.',
      },
      {
        q: 'Will an insurer ask about my wiring?',
        a: 'Some carriers ask about knob-and-tube wiring and fuse panels specifically, and policies vary considerably. It is worth asking your carrier directly.',
      },
      {
        q: 'How disruptive is rewiring an older home?',
        a: 'It depends heavily on access. Homes with usable attic and crawl space routing fare much better. Some drywall or plaster repair is normal, and we will be specific about where before starting.',
      },
    ],
  },
  {
    slug: 'highland-park',
    city: 'Highland Park',
    displayName: 'Highland Park, TX',
    metaTitle: 'Electrician in Highland Park, TX | Ethan & Sons Electricians',
    metaDescription:
      'Electrical services for Highland Park homes — older wiring, panel upgrades, lighting design and renovation electrical. Call (469) 425-8874.',
    intro:
      'Highland Park is among the oldest established neighbourhoods in the area, with housing dating largely to the 1910s through 1930s. Original architecture is carefully preserved, which means electrical work here has to be as much about minimal disruption as about the wiring itself.',
    builtEnvironment: [
      'Early twentieth-century housing, much of it from the 1910s through 1930s',
      'Substantial architectural preservation and careful renovation',
      'Mature landscaping and established streetscapes',
      'Almost entirely single-family residential',
      'Limited neighbourhood commercial nearby',
    ],
    commonNeeds: [
      'Assessment of original and early wiring systems',
      'Phased rewiring planned around preservation constraints',
      'Panel and service upgrades',
      'Grounding retrofits',
      'Lighting design sympathetic to original architecture',
      'Landscape and architectural exterior lighting',
    ],
    commercialNote:
      'Highland Park is overwhelmingly residential, with only limited neighbourhood commercial in the immediate area.',
    nearby: ['university-park', 'dallas', 'preston-hollow', 'north-dallas'],
    faqs: [
      {
        q: 'How do you approach wiring in a historic home?',
        a: 'Routing planning comes first, because the goal is to reach where the wiring needs to go with the least disturbance to original finishes. Attic, crawl space and closet routes are worth a great deal here, and phasing the work often reduces disruption further.',
      },
      {
        q: 'Can lighting be updated without altering the architecture?',
        a: 'Usually. Fixture selection, discreet placement and careful control design can improve lighting substantially without changes that read as modern. It is worth discussing the specific rooms.',
      },
      {
        q: 'What should I expect from an inspection on a home this old?',
        a: 'A clear picture of what wiring types are present, their condition, panel and grounding status, and a priority order. On a home of this age, knowing what you have is genuinely valuable even before deciding on any work.',
      },
    ],
  },
];

export const locationsBySlug = Object.fromEntries(
  locations.map((l) => [l.slug, l]),
) as Record<string, Location | undefined>;

export function getLocation(slug: string) {
  return locationsBySlug[slug];
}

/** Resolve the `nearby` slug list into full location records. */
export function nearbyLocations(location: Location) {
  return location.nearby
    .map((slug) => locationsBySlug[slug])
    .filter((l): l is Location => Boolean(l));
}
