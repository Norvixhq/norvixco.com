# -*- coding: utf-8 -*-
"""Per-city data for service-area pages. Fields are city-specific so no two
pages read the same: county, geography, neighbourhoods, landmarks, ZIPs, the
routes we dispatch on, and the housing-stock characteristics that actually
change how a loss behaves in that city."""

C = {}


def c(slug, **kw):
    C[slug] = kw


c("dallas", county="Dallas County", drive="a direct run on I-35E, I-30 or US-75",
  intro="Our shop is in Dallas, on Topline Drive just off Stemmons in the Design District, so Dallas calls are the shortest dispatch we run.",
  hoods=["Lakewood", "the M Streets", "Preston Hollow", "Oak Lawn", "Uptown", "Bishop Arts", "Oak Cliff", "Deep Ellum", "Lake Highlands", "Casa Linda", "Kessler Park", "Vickery Place"],
  marks=["White Rock Lake", "the Arts District", "Fair Park", "the Design District", "Klyde Warren Park"],
  zips="75201, 75204, 75206, 75214, 75218, 75219, 75225, 75229, 75230, 75231, 75238, 75243",
  stock="Dallas has one of the widest ranges of housing age in the Metroplex. East Dallas and Oak Cliff carry a large stock of pre-war and mid-century homes with pier-and-beam foundations, cast iron drain lines and galvanized supply piping &mdash; all of which fail differently, and more suddenly, than modern PEX. North Dallas is dominated by 1960s through 1980s slab construction where cast iron drains have now reached the end of their service life and attic-mounted HVAC is the norm.",
  risk="Aging drain lines under slabs, attic air handler condensate failures in summer, and dense tree canopy over older neighborhoods that turns wind events into limb-strike and roof-penetration calls.")

c("fort-worth", county="Tarrant County", drive="I-30 west, then to your side of town on Loop 820 or Chisholm Trail",
  intro="Fort Worth is a large service area with very different building stock across it, from century-old homes near the Cultural District to new construction pushing toward Aledo and north toward Alliance.",
  hoods=["Arlington Heights", "Tanglewood", "Fairmount", "Ryan Place", "Westover Hills", "Rivercrest", "Wedgwood", "Alliance", "Berkeley Place"],
  marks=["Sundance Square", "the Stockyards", "the Cultural District", "TCU", "the Trinity Trails"],
  zips="76102, 76104, 76107, 76109, 76110, 76116, 76132, 76137, 76244",
  stock="The historic districts &mdash; Fairmount, Ryan Place, Arlington Heights &mdash; are full of early-1900s homes with pier-and-beam foundations, original plumbing and knob-and-tube remnants. Those properties dry very differently from slab construction, and demolition decisions have to account for original millwork and plaster that cannot simply be replaced with modern board.",
  risk="Pier-and-beam crawlspaces that trap moisture and go unnoticed for months, original plaster that holds water far longer than drywall, and severe hail exposure across the western side of the county.")

c("irving", county="Dallas County", drive="a short run west on SH-183 or SH-114",
  intro="Irving sits between our shop and DFW Airport, which makes it one of the fastest addresses we reach at any hour.",
  hoods=["Las Colinas", "Valley Ranch", "Hackberry Creek", "University Hills", "Song neighborhood", "Bear Creek"],
  marks=["the Mustangs at Williams Square", "the Mandalay Canal", "Toyota Music Factory", "the Irving Convention Center"],
  zips="75038, 75039, 75060, 75061, 75062, 75063",
  stock="South Irving carries a large stock of 1950s and 60s homes with original cast iron and galvanized plumbing, while Las Colinas and Valley Ranch are dominated by 1980s and 90s construction &mdash; the polybutylene era. Polybutylene supply lines degrade internally from contact with treated water and fail without warning, and they are still in service in a meaningful number of Irving homes.",
  risk="Polybutylene supply failures, canal-adjacent and low-lying properties in Las Colinas during heavy rainfall, and a high concentration of mid-rise and multi-family buildings where one unit's loss travels down through several others.")

c("plano", county="Collin County", drive="straight up US-75 or the Dallas North Tollway",
  intro="Plano splits neatly into two restoration profiles: the mature east side along US-75, and the newer west side around Legacy and the Tollway.",
  hoods=["Legacy West", "Willow Bend", "Historic Downtown Plano", "Deerfield", "Kings Ridge", "Whiffletree", "Ridgeview"],
  marks=["Legacy West", "the Shops at Willow Bend", "Historic Downtown Plano", "Arbor Hills Nature Preserve"],
  zips="75023, 75024, 75025, 75074, 75075, 75093, 75094",
  stock="East Plano's 1970s and 80s homes are now at the age where cast iron drains, original water heaters and first-generation slab plumbing are failing regularly. West Plano and Legacy are newer, larger, and predominantly two-story with upstairs laundry rooms and attic air handlers &mdash; the configuration that turns a small supply failure into a two-floor loss.",
  risk="Second-floor laundry and water heater failures draining through downstairs ceilings, attic condensate line clogs in summer, and hail exposure across the whole city in spring.")

c("frisco", county="Collin and Denton counties", drive="up the Dallas North Tollway or SH-121",
  intro="Frisco is almost entirely modern construction, which changes the failure pattern: fewer aging-pipe calls, far more two-story water losses and attic HVAC problems.",
  hoods=["Starwood", "Newman Village", "Phillips Creek Ranch", "Frisco Lakes", "Panther Creek", "Stonebriar"],
  marks=["The Star", "Stonebriar Centre", "PGA Frisco", "Toyota Stadium", "the Frisco Rail District"],
  zips="75033, 75034, 75035, 75036, 75068, 75078",
  stock="Frisco's housing is overwhelmingly post-2000: large two- and three-story homes on post-tension slabs, PEX supply lines, attic-mounted air handlers and upstairs laundry. Newer plumbing fails less often, but when it does the water has two or three floors to travel through, and a large open-plan house spreads a loss across a much bigger footprint before anyone notices.",
  risk="Upstairs supply and appliance failures that reach the ground floor, attic condensate overflow onto second-floor ceilings, and expansive clay soil movement stressing post-tension slab plumbing.")

c("mckinney", county="Collin County", drive="up US-75",
  intro="McKinney combines a genuinely historic downtown core with a large ring of newer development, and the two need different approaches.",
  hoods=["Historic Downtown McKinney", "Craig Ranch", "Stonebridge Ranch", "Adriatica", "Trinity Falls", "Eldorado"],
  marks=["the Historic Downtown Square", "Craig Ranch", "TUPPS Brewery", "Erwin Park"],
  zips="75069, 75070, 75071, 75072",
  stock="The downtown historic district holds early-1900s homes with pier-and-beam foundations, original wood floors and plaster walls &mdash; materials that need specialty drying rather than default demolition. Stonebridge Ranch, Craig Ranch and the newer master-planned areas are 1990s onward, with the two-story attic-HVAC profile common across Collin County.",
  risk="Historic-district properties where original materials must be dried in place rather than replaced, and heavy hail exposure across the northern part of the county.")

c("richardson", county="Dallas and Collin counties", drive="straight up US-75",
  intro="Richardson is one of the most consistently aged housing markets in the Metroplex, which makes plumbing-age failures the dominant call type here.",
  hoods=["Canyon Creek", "Prairie Creek", "Duck Creek", "Heights Park", "Arapaho", "CityLine"],
  marks=["the Telecom Corridor", "UT Dallas", "CityLine", "Cottonwood Park"],
  zips="75080, 75081, 75082",
  stock="A very large share of Richardson's single-family stock was built between 1955 and 1980. That means cast iron drain lines at or beyond their service life, original galvanized sections in some homes, and slab foundations with under-slab plumbing that has been through fifty years of clay soil movement. Under-slab leaks are common enough here that we look for them specifically.",
  risk="Under-slab supply and drain leaks discovered as damp flooring or an unexplained water bill, cast iron drain collapse, and mature tree roots intruding into aging sewer laterals.")

c("garland", county="Dallas County", drive="out I-635 or SH-190",
  intro="Garland's mix of mid-century neighborhoods and lakeside property near Ray Hubbard produces both aging-plumbing calls and storm-driven ones.",
  hoods=["Firewheel", "Club Hill", "Oakridge", "Duck Creek", "Camelot"],
  marks=["Firewheel Town Center", "Lake Ray Hubbard", "the Granville Arts Center", "Spring Creek Forest Preserve"],
  zips="75040, 75041, 75042, 75043, 75044",
  stock="Most of Garland was built out between the 1950s and 1980s, so cast iron drains, aging water heaters and original supply lines are the norm. Newer development sits around Firewheel and toward the lake.",
  risk="Aging drain and supply lines, and lake-adjacent properties in the east of the city that see wind-driven rain and drainage backup during heavy storms.")

c("mesquite", county="Dallas County", drive="east on I-635 or US-80",
  intro="Mesquite is a short run east of our shop and is dominated by established single-family neighborhoods with mature plumbing.",
  hoods=["Creek Crossing", "Emerald Park", "Town East", "Skyline"],
  marks=["Town East Mall", "the Mesquite Rodeo", "Mesquite Arts Center"],
  zips="75149, 75150, 75180, 75181, 75182",
  stock="Predominantly 1960s through 1980s slab construction. Cast iron drain lines in the older sections are now reaching end of life, and original water heaters in interior closets are a common source of loss.",
  risk="Cast iron drain failure, water heater closet leaks that spread under adjacent rooms, and flash-flooding along creek drainage during heavy cells.")

c("arlington", county="Tarrant County", drive="west on I-30 or down SH-360",
  intro="Arlington sits between Dallas and Fort Worth with a big spread of housing ages, plus a large rental and student market around UTA.",
  hoods=["Dalworthington Gardens edge", "Pantego edge", "Viridian", "Interlochen", "North Arlington", "Southwest Arlington"],
  marks=["AT&T Stadium", "Globe Life Field", "Six Flags Over Texas", "UT Arlington", "River Legacy Park"],
  zips="76001, 76006, 76010, 76012, 76013, 76015, 76016, 76017, 76018",
  stock="North Arlington holds a large stock of 1950s through 1970s homes; the southwest and Viridian areas are considerably newer. The rental concentration near UTA means a meaningful share of our calls come from property managers rather than owners, often on units that have been unoccupied when a loss started.",
  risk="Unoccupied rental units where a leak ran for days before discovery, aging plumbing in North Arlington, and heavy hail exposure across the county.")

c("grand-prairie", county="Dallas and Tarrant counties", drive="out I-30 or SH-161",
  intro="Grand Prairie stretches a long way north to south, from the I-30 corridor down toward Joe Pool Lake, with housing ages to match.",
  hoods=["Westchester", "Lake Parks", "Mira Lagos", "Dalworth", "Sheffield Village"],
  marks=["Lone Star Park", "Epic Waters", "Joe Pool Lake", "Traders Village"],
  zips="75050, 75051, 75052, 75054",
  stock="The northern half is largely mid-century, with the plumbing-age profile that comes with it. South Grand Prairie around Mira Lagos and the lake is newer two-story construction.",
  risk="Drainage and runoff issues on the sloping terrain toward Joe Pool Lake, and aging supply lines in the older northern neighborhoods.")

c("carrollton", county="Dallas and Denton counties", drive="up I-35E or the President George Bush Turnpike",
  intro="Carrollton is a quick dispatch from our Dallas shop and has a well-established housing stock across most of the city.",
  hoods=["Downtown Carrollton", "Rosemeade", "Furneaux Creek", "Country Place", "Josey Ranch"],
  marks=["the Downtown Carrollton square", "Josey Ranch Lake", "the A-train station", "Sandy Lake"],
  zips="75006, 75007, 75010",
  stock="Mostly 1970s through 1990s construction, which puts a large number of homes squarely in the polybutylene and early-CPVC window, along with water heaters and HVAC systems now on their second or third replacement cycle.",
  risk="Polybutylene supply line failures, aging water heaters in attic and closet locations, and creek-adjacent drainage during heavy rain.")

c("addison", county="Dallas County", drive="a short run up the Dallas North Tollway",
  intro="Addison is compact, dense and very quick for us to reach, with a high proportion of multi-family and mixed-use property.",
  hoods=["Addison Circle", "Vitruvian Park", "Les Lacs", "Bent Tree"],
  marks=["Addison Circle Park", "Addison Airport", "the Belt Line restaurant corridor", "Vitruvian Park"],
  zips="75001, 75254",
  stock="Addison has an unusually high concentration of apartments, condominiums and mid-rise residential relative to single-family homes, plus a dense commercial and restaurant corridor along Belt Line. Multi-family losses behave differently: water travels between units and through shared assemblies, and the job involves several owners, an HOA or management company, and often more than one insurance carrier.",
  risk="Multi-unit water migration from a single failure, restaurant kitchen and grease-related incidents along Belt Line, and stacked-plumbing failures in mid-rise buildings.")

c("farmers-branch", county="Dallas County", drive="minutes up I-35E from our shop",
  intro="Farmers Branch is one of the closest cities to our Dallas location, and one of the fastest addresses we reach.",
  hoods=["Brookhaven", "Valley View", "Mustang Crossing", "Old Farmers Branch"],
  marks=["Farmers Branch Historical Park", "Brookhaven College", "the Rose Gardens", "Mustang Crossing"],
  zips="75234, 75244",
  stock="Largely built out between the 1950s and 1970s, so cast iron drain lines, original slab plumbing and long-serving water heaters are the common thread. There is newer infill and multi-family development along the I-35E and Valley View corridors.",
  risk="Cast iron drain failure, under-slab leaks from decades of soil movement, and older HVAC systems producing condensate overflow in summer.")

c("coppell", county="Dallas and Denton counties", drive="out SH-121 or Belt Line",
  intro="Coppell sits right against DFW Airport and is largely a 1980s and 90s residential build-out with a strong owner-occupied base.",
  hoods=["Old Town Coppell", "Riverchase", "The Reserve", "Northlake Woodlands"],
  marks=["Old Town Coppell", "Andy Brown Park", "Coppell Nature Park", "the Coppell Farmers Market"],
  zips="75019",
  stock="Predominantly 1980s and 1990s two-story construction. That places a lot of Coppell homes in the polybutylene window, and puts water heaters and air handlers in upstairs closets and attics where a failure drains through finished ceilings below.",
  risk="Polybutylene failures, attic and upstairs-closet water heater leaks, and hail exposure across the northwest side of the Metroplex.")

c("lewisville", county="Denton County", drive="up I-35E",
  intro="Lewisville runs from the older core near Old Town up to newer development around the lake, and the lake itself shapes a share of our calls here.",
  hoods=["Old Town Lewisville", "Castle Hills edge", "Highland Village edge", "Valley Vista", "Lakeland Heights"],
  marks=["Lewisville Lake", "Old Town Lewisville", "Lake Park", "MCL Grand"],
  zips="75056, 75057, 75067, 75077",
  stock="A wide range: the older core near Old Town dates to mid-century, while the areas toward the lake and along the SH-121 corridor are 1990s and later. Lakefront and near-lake properties add wind exposure and, in some cases, drainage considerations that inland homes do not have.",
  risk="Wind and storm exposure near the lake, aging plumbing in the older core, and heavy runoff on the sloped terrain toward the shoreline.")

c("the-colony", county="Denton County", drive="up SH-121 or the Tollway",
  intro="The Colony is built along the western shore of Lewisville Lake and has grown quickly around the Grandscape development.",
  hoods=["Austin Waters", "Stewart Peninsula", "The Tribute", "Legend Crest"],
  marks=["Grandscape", "Nebraska Furniture Mart", "Stewart Creek Park", "The Tribute golf courses"],
  zips="75056",
  stock="Mostly 1990s onward, with substantial new construction over the last fifteen years around Grandscape and The Tribute. Two-story homes with attic HVAC and upstairs laundry dominate.",
  risk="Lakefront wind exposure, upstairs appliance and supply failures reaching the ground floor, and attic condensate overflow in summer.")

c("allen", county="Collin County", drive="up US-75",
  intro="Allen is a consistent, largely post-1990 suburban build-out with a high owner-occupancy rate and a lot of two-story family homes.",
  hoods=["Twin Creeks", "Bethany Lakes", "Watters Crossing", "Star Creek", "Cottonwood Bend"],
  marks=["Watters Creek", "the Allen Event Center", "Celebration Park", "the Allen Outlets"],
  zips="75002, 75013",
  stock="Predominantly 1990s and 2000s construction: two-story, post-tension slab, PEX or CPVC supply, attic air handlers and frequently an upstairs laundry room. Well-built stock overall, with failures skewing toward appliances, water heaters and HVAC rather than pipe age.",
  risk="Second-floor washing machine and water heater failures, attic condensate line clogs, and spring hail across Collin County.")

c("prosper", county="Collin and Denton counties", drive="up the Tollway or Preston Road to US-380",
  intro="Prosper is one of the fastest-growing towns in Texas and is almost entirely new construction, which produces a specific and slightly unusual loss profile.",
  hoods=["Windsong Ranch", "Star Trail", "Lakewood", "Whitley Place", "Light Farms edge"],
  marks=["Windsong Ranch", "Frontier Park", "the Prosper town center", "Children's Health Stadium"],
  zips="75078",
  stock="Overwhelmingly built in the last fifteen years: large two- and three-story homes on post-tension slabs with PEX supply, tankless and attic water heaters and multiple HVAC zones. New construction brings its own failure modes &mdash; installation defects, fittings that were not fully crimped, and builder-grade appliance connections &mdash; and they often surface in the first few years.",
  risk="Installation-defect leaks in newer homes, multi-story water travel in large houses, and open hail exposure on the northern edge of the Metroplex.")

c("celina", county="Collin County", drive="north on the Tollway or Preston Road",
  intro="Celina is at the leading edge of North Texas growth, with new neighborhoods going in around a genuinely old downtown square.",
  hoods=["Light Farms", "Mustang Lakes", "Sutton Fields", "Wells South", "Downtown Celina"],
  marks=["the Downtown Celina square", "Light Farms", "Old Celina Park"],
  zips="75009",
  stock="A sharp contrast between the historic downtown core and the new master-planned communities surrounding it. The new build is the same large two-story, post-tension-slab, PEX and attic-HVAC profile found across northern Collin County; the older properties near the square need the careful, materials-aware approach that any historic structure does.",
  risk="New-construction installation defects, long distances between properties and services in the outlying areas, and open exposure to hail and straight-line winds.")

c("denton", county="Denton County", drive="up I-35E to the split",
  intro="Denton is a university city with a large rental market and a genuinely old core, which makes its restoration profile distinct from the suburban cities south of it.",
  hoods=["Denton Square area", "Idiot's Hill", "Southridge", "Robson Ranch", "Rayzor Ranch"],
  marks=["the Denton Square", "UNT", "Texas Woman's University", "Rayzor Ranch", "Ray Roberts Lake"],
  zips="76201, 76205, 76207, 76208, 76209, 76210, 76226",
  stock="The neighborhoods around the square and the universities hold a large stock of early-to-mid century homes, many converted to rentals, with pier-and-beam foundations and original plumbing. Robson Ranch and the southern development along I-35 are considerably newer.",
  risk="Student rentals where a loss can run for days between occupants noticing or reporting it, pier-and-beam crawlspace moisture, and aging plumbing in the historic core.")

c("north-richland-hills", county="Tarrant County", drive="west on Loop 820",
  intro="North Richland Hills is a settled Mid-Cities community with predominantly established housing and a strong owner-occupied base.",
  hoods=["Home Town", "Thornbridge", "Forest Glenn", "Meadow Lakes"],
  marks=["NRH2O", "Home Town NRH", "the NRH Centre", "Iron Horse Golf Course"],
  zips="76180, 76182",
  stock="Mostly 1970s through 1990s construction, putting a substantial number of homes in the polybutylene and early-CPVC window with water heaters and HVAC now on later replacement cycles.",
  risk="Polybutylene supply failures, aging water heaters, and significant hail exposure across northeast Tarrant County.")

c("euless", county="Tarrant County", drive="down SH-183 or SH-121",
  intro="Euless sits right against DFW Airport in the Mid-Cities, a quick run for us and a city with a large multi-family component.",
  hoods=["Bear Creek", "Midway", "Glade Parks edge", "Villages of Bear Creek"],
  marks=["Texas Star Golf Course", "Bear Creek Park", "Glade Parks", "the Euless Family Life Center"],
  zips="76039, 76040",
  stock="A mix of 1970s and 80s single-family homes and a high proportion of apartments and multi-family property, particularly along the airport corridor. Multi-family losses involve water travelling between units and coordination across owners and management.",
  risk="Multi-unit water migration in apartment buildings, aging single-family plumbing, and aircraft-corridor properties with heavy rental turnover.")

c("bedford", county="Tarrant County", drive="west on SH-183 or Loop 820",
  intro="Bedford is central to the Mid-Cities and largely built out, with an established residential base and mature infrastructure.",
  hoods=["Central Bedford", "Bedford Heights", "Stonegate", "Oak Timbers"],
  marks=["the Boys Ranch Activity Center", "Bedford Trails", "Old Bedford School", "Central Drive"],
  zips="76021, 76022",
  stock="Predominantly 1970s and 1980s construction, which places most of the city in the plumbing-age window where original supply lines, water heaters and cast iron drains are failing on schedule.",
  risk="Aging supply and drain lines, water heaters past service life in interior closets, and Mid-Cities hail exposure.")

c("hurst", county="Tarrant County", drive="a straight run west on SH-183 or Loop 820",
  intro="Hurst completes the HEB trio in the Mid-Cities and shares its neighbors' established housing profile.",
  hoods=["Hurst Hills", "Bellaire", "Redbud", "Mayfair"],
  marks=["North East Mall", "Chisholm Park", "the Hurst Conference Center"],
  zips="76053, 76054",
  stock="Mostly 1960s through 1980s single-family homes on slab, with the cast iron drains, original angle stops and aging water heaters typical of that era.",
  risk="Cast iron drain deterioration, slab plumbing leaks after decades of soil movement, and hail across northeast Tarrant County.")

c("grapevine", county="Tarrant County", drive="out SH-114 or SH-121",
  intro="Grapevine wraps around the south side of its lake and combines a preserved historic Main Street with substantial newer development and a large hospitality sector.",
  hoods=["Historic Main Street district", "Silver Lake", "Western Oaks", "Dove Creek"],
  marks=["Historic Main Street", "Grapevine Lake", "the Gaylord Texan", "Grapevine Mills", "the Vintage Railroad"],
  zips="76051, 76092, 76099",
  stock="The Main Street district holds genuinely historic structures where original materials matter and demolition is a last resort. Residential areas range from mid-century near the core to 1990s and later around the lake. Grapevine also has an unusually large hotel and hospitality footprint, which means commercial work with occupancy pressure attached.",
  risk="Lake-adjacent wind and storm exposure, historic structures requiring materials-aware drying, and hospitality properties needing phased overnight work.")

c("flower-mound", county="Denton County", drive="up I-35E then west on FM 1171, or out SH-121",
  intro="Flower Mound stretches along the north shore of Grapevine Lake with large-lot residential and a good deal of tree cover.",
  hoods=["Bridlewood", "Wellington", "Canyon Falls", "Timber Creek", "Lakeside"],
  marks=["the actual Flower Mound", "Grapevine Lake", "Parker Square", "Twin Coves Park"],
  zips="75022, 75028, 75077",
  stock="Predominantly 1990s and 2000s construction, often on larger lots with bigger two-story floor plans, attic HVAC and upstairs laundry. Mature landscaping and tree cover across much of the town add limb-strike risk during wind events.",
  risk="Storm and limb damage from heavy tree cover, upstairs supply and appliance failures in large floor plans, and lakefront wind exposure.")

c("southlake", county="Tarrant County", drive="out SH-114",
  intro="Southlake is a high-value residential market with large custom homes, which changes both the scope and the finish expectations on a restoration job.",
  hoods=["Timarron", "Carillon", "Shady Oaks", "Coventry Manor", "Clariden Ranch"],
  marks=["Southlake Town Square", "Bicentennial Park", "the Marq", "Carroll ISD"],
  zips="76092",
  stock="Large custom and semi-custom homes, predominantly 1990s onward, frequently with specialty finishes: solid hardwood, natural stone, custom millwork, wine rooms and finished attics or basements. These materials do not tolerate default drying approaches and they are not replaceable with stock items, so the emphasis is heavily on drying in place and on matching what is already there.",
  risk="Specialty finishes requiring in-place drying rather than removal, multi-story and multi-zone HVAC systems, and large square footages where a loss spreads a long way before it is noticed.")

c("las-colinas", county="Dallas County", drive="a short run west on SH-114",
  intro="Las Colinas is a distinct district within Irving with its own character: canals, mid-rise residential, corporate campuses and a dense mixed-use core.",
  hoods=["Mandalay", "Cottonwood Valley", "Hackberry Creek", "Water Street", "the Urban Center"],
  marks=["the Mustangs at Williams Square", "the Mandalay Canal", "Toyota Music Factory", "Lake Carolyn", "the Four Seasons Resort"],
  zips="75038, 75039, 75063",
  stock="A high concentration of mid-rise and high-rise residential, condominiums and corporate property relative to detached single-family homes, plus canal-front and lake-adjacent buildings. Vertical losses are the defining characteristic here: a failure on an upper floor travels down through multiple units and shared assemblies, and the job involves several residents, an HOA or management company and often several carriers at once.",
  risk="Multi-floor water migration in mid-rise buildings, canal and lake-adjacent properties in heavy rainfall, and commercial and corporate property needing after-hours work.")
