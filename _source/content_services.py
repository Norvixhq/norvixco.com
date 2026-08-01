# -*- coding: utf-8 -*-
"""Per-service content. Every field is unique to the service — no shared filler.

Keys:
  icon, fire      visual treatment
  title           H1
  meta_title/desc SEO
  lede            hero paragraph
  facts           4 x (label, value) for the fact bar
  body            long-form HTML (H2/H3 sections)
  signs           "call us when" bullet list
  faqs            list of (question, html answer)
  related         related service slugs
"""

S = {}

# ==================================================================== WATER
S["water-damage-restoration"] = dict(
    icon="drop", fire=False,
    title="Water Damage Restoration in Dallas&ndash;Fort Worth",
    meta_title="Water Damage Restoration Dallas TX | 24/7 Emergency | Rapid Response",
    meta_desc="24/7 emergency water damage restoration across Dallas-Fort Worth. Extraction, structural drying, mold prevention and full rebuild. Insurance documentation included. Call (708) 506-8917.",
    lede="Burst supply lines, failed water heaters, overflowing appliances, slab leaks and roof intrusion. We extract the water, dry the structure to measured readings, and rebuild what has to come out &mdash; with the documentation your insurance carrier needs.",
    facts=[("Response", "24/7/365"), ("Typical dry time", "3&ndash;5 days"),
           ("Mold risk begins", "24&ndash;48 hours"), ("Insurance", "Direct billing available")],
    signs=[
        "Standing water anywhere in the property",
        "A ceiling stain that is growing, sagging or dripping",
        "Carpet that squelches, or padding that feels spongy underfoot",
        "Warped, cupping or lifting hardwood or laminate",
        "Baseboards separating, swelling or discoloring at the bottom edge",
        "A musty smell that appeared after a leak, even a small one",
        "A water bill that jumped with no change in usage &mdash; often a slab leak",
        "Bubbling paint or soft drywall you can press a thumb into",
    ],
    body="""
<h2>What water damage actually does to a house</h2>
<p>The visible water is the smallest part of the problem. Within minutes, water spreads laterally across flooring and wicks upward into drywall, insulation and framing. Within hours it has moved under cabinets, into wall cavities and along the top of the slab where you cannot see it and a fan cannot reach it. Within 24 to 48 hours, according to the EPA, mold can begin growing on any material that is still damp.</p>
<p>That timeline is why restoration is an emergency service rather than a repair service. Every hour that saturated materials stay wet, the scope of the job grows &mdash; and the difference between a three-day dry-out and a full tear-out is very often a single night of delay.</p>
<p>The second thing people underestimate is that <strong>drying is not evaporation</strong>. Blowing air across a wet floor moves moisture into the air, and if that humid air is not removed, it condenses somewhere else in the building and creates a new problem. Proper structural drying is a controlled process: air movement, dehumidification and temperature balanced against the specific materials involved, measured daily against a documented dry standard.</p>

<h2>The three categories of water &mdash; and why it changes everything</h2>
<p>Before anything else happens, we identify what kind of water we are dealing with. This is not academic. It determines what can be dried and saved, what has to be removed, what protective equipment is required and how the area has to be contained.</p>
<h3>Category 1 &mdash; clean water</h3>
<p>Water from a sanitary source: a supply line, a water heater, a fixture feed, rainwater intrusion. This is the best case. Most materials can be dried in place if we get to them fast, and the job is usually about speed and thoroughness rather than removal. Category 1 water does not stay Category 1 forever &mdash; once it sits, contacts building materials and warms up, it degrades.</p>
<h3>Category 2 &mdash; gray water</h3>
<p>Water carrying meaningful contamination but not human waste: washing machine and dishwasher discharge, toilet overflow with urine only, aquarium water, or Category 1 water that has been sitting. Porous materials like carpet pad and some insulation typically come out. The area is treated with an antimicrobial and the air is filtered.</p>
<h3>Category 3 &mdash; black water</h3>
<p>Sewage, rising floodwater from outside, water from beyond the toilet trap, and any water that has stagnated long enough to grow bacteria. This requires containment, full PPE, controlled removal and disposal of porous materials, and aggressive disinfection. Drywall is cut above the water line, carpet and pad are removed entirely, and the affected area is isolated from the rest of the building so contaminants are not spread through the HVAC system.</p>

<h2>What we do on a water loss, step by step</h2>
<h3>1. Stop the source and make it safe</h3>
<p>Nothing else matters while water is still coming in. We isolate the fixture or shut off the main, and we assess electrical hazards before anyone works in standing water. If the loss involves a ceiling, we evaluate whether the assembly is holding weight it should not be.</p>
<h3>2. Map the moisture</h3>
<p>Thermal imaging shows temperature differences caused by evaporative cooling, which tells us where to look. Penetrating and non-penetrating moisture meters then tell us how wet each material actually is. We establish a <strong>dry standard</strong> &mdash; a reading taken from the same material in an unaffected part of the property &mdash; because "dry" means matching that number, not feeling dry to the touch.</p>
<h3>3. Extract</h3>
<p>Truck-mounted and portable extraction units remove standing and trapped water. Removing water as a liquid is dramatically faster and cheaper than removing it as vapor later, so this stage is done thoroughly before equipment is set. Weighted extraction tools pull water up through carpet and pad where the pad is salvageable.</p>
<h3>4. Remove what cannot be saved</h3>
<p>Controlled demolition, only where it is warranted: saturated carpet pad, wet insulation that will not dry inside a wall cavity, drywall that is holding water against framing, and anything contaminated by Category 2 or 3 water. Where materials can be dried in place, we dry them in place &mdash; including hardwood in many cases, using floor drying mats and controlled dehumidification.</p>
<h3>5. Dry to a calculated load</h3>
<p>Air movers and low grain refrigerant dehumidifiers are placed according to the affected area, the class of water loss and the materials involved, not according to what happens to be on the truck. Equipment runs continuously. Readings are taken daily and logged, and equipment is adjusted as the structure dries.</p>
<h3>6. Clean, sanitize and deodorize</h3>
<p>Antimicrobial application on affected surfaces, HEPA air scrubbing to capture airborne particulate, and odor treatment where required. Contents that need off-site cleaning are inventoried and packed out.</p>
<h3>7. Rebuild</h3>
<p>Drywall, texture, insulation, flooring, baseboards, cabinetry, trim and paint. Because we carry the job all the way through, there is no gap between the company that removed the materials and the company that replaces them &mdash; and no argument about who is responsible for what.</p>

<h2>Common causes of water damage in North Texas homes</h2>
<h3>Slab leaks</h3>
<p>A very large share of DFW housing sits on post-tension slab foundations, and our expansive clay soil moves seasonally. That movement stresses the supply lines running under the slab. The classic signs are a hot spot on the floor, a water bill that jumped for no reason, the sound of running water with everything off, or unexplained damp carpet at the edge of a room. Slab leaks are slow, hidden and frequently discovered only after the flooring is already damaged.</p>
<h3>Water heaters</h3>
<p>Tank water heaters have a service life of roughly eight to twelve years, and many DFW homes have them in an upstairs closet or an attic &mdash; which means a failure drains through the ceiling into the rooms below. If yours is over ten years old and sitting above finished space, a drain pan with a working drain line and a leak sensor is the cheapest insurance you will ever buy.</p>
<h3>Supply lines and angle stops</h3>
<p>The braided line under a sink or behind a toilet is a consumable part. When one lets go while nobody is home, it does not drip &mdash; it runs at full pressure for however many hours it takes for someone to walk in the door.</p>
<h3>Freeze events</h3>
<p>North Texas builds for heat, not for cold. Uninsulated attic runs, exterior hose bibs and pipes in exterior walls freeze during hard winter events, and the damage does not show up while it is frozen &mdash; it shows up the moment everything thaws and pressure returns, all across the region at once.</p>
<h3>HVAC condensate</h3>
<p>Air handlers in attics produce a surprising amount of condensate in a Texas summer. A clogged condensate line or a rusted-through drain pan puts water directly onto the ceiling below, usually discovered as a brown ring that appears in August.</p>
<h3>Appliance failures</h3>
<p>Dishwashers, refrigerator ice maker lines and washing machines account for a steady share of losses. Ice maker lines are especially bad because they run behind a heavy appliance nobody moves, so the leak is discovered by damage rather than by sight.</p>

<h2>Why speed changes the price</h2>
<p>The most expensive water losses we see are almost never the biggest ones. They are the ones that sat. A supply line that runs for two hours and gets extracted the same evening is typically a dry-in-place job. The same line running for two days becomes a demolition job: carpet and pad out, drywall cut, insulation removed, cabinets pulled, possible mold remediation, and a rebuild on the back end.</p>
<blockquote><p>If you are reading this while water is on your floor, stop reading and call. The single most valuable thing you can do in the first hour is get extraction started &mdash; everything else can be figured out afterward.</p></blockquote>

<h2>Documentation and your insurance claim</h2>
<p>Most homeowner policies cover sudden and accidental water damage, and most exclude gradual damage from long-term seepage and damage caused by lack of maintenance. That distinction is decided by evidence, which is why we document from the moment we arrive: dated wide and detail photographs before anything is touched, a moisture map of the affected area, daily drying logs with readings and equipment counts, and a line-item scope in the format adjusters work from.</p>
<p>We can meet your adjuster on site, provide the documentation package directly, and in most covered losses bill your carrier so your out-of-pocket is the deductible. We are not public adjusters and we do not negotiate your claim &mdash; what we do is make sure nobody can dispute what the property actually looked like.</p>
""",
    faqs=[
        ("How quickly do I need to act after water damage?",
         "<p>Immediately. Mold can begin growing on damp materials within 24 to 48 hours, and materials that could have been dried in place on day one often have to be removed on day three. Extraction on the first day is the single biggest factor in keeping a water loss small.</p>"),
        ("Can you save my hardwood floors?",
         "<p>Often, yes. Hardwood that has cupped can frequently be dried in place using specialty floor drying mats that pull moisture up through the boards, then sanded and refinished once it stabilizes. It depends on how long the water sat, the subfloor condition, and whether the finish is trapping moisture. We will tell you honestly which way yours is likely to go rather than defaulting to a tear-out.</p>"),
        ("Do I really need professional equipment, or will fans work?",
         "<p>Household fans move air but do not remove moisture from the building. Without dehumidification, that humid air simply condenses somewhere else &mdash; often inside a wall cavity where you will not see the consequences for weeks. Commercial LGR dehumidifiers pull water out of the air and out of the building; that is the part fans cannot do.</p>"),
        ("How do you know when my house is actually dry?",
         "<p>By measurement. We establish a dry standard from unaffected material of the same type, then take daily readings from affected materials until they match. Those readings are logged and go in your documentation package. If a company cannot show you numbers, they do not know either.</p>"),
        ("Will my homeowners insurance cover this?",
         "<p>Sudden and accidental water damage &mdash; a burst pipe, a failed water heater, an appliance line letting go &mdash; is covered by most policies. Gradual seepage, long-term leaks and damage attributed to deferred maintenance usually are not. Flooding from outside the home requires separate flood insurance. Because the distinction comes down to evidence, thorough documentation from day one matters enormously.</p>"),
        ("Do you handle the repairs afterward, or just the drying?",
         "<p>Both. We carry the job through demolition, drying, drywall, flooring, cabinetry, trim and paint. One company, one scope, one point of contact &mdash; which also means no gap where a mitigation company and a rebuild contractor blame each other.</p>"),
    ],
    related=["flood-cleanup", "burst-pipe-repair", "structural-drying", "water-extraction", "mold-remediation"],
)

# ==================================================================== FIRE
S["fire-damage-restoration"] = dict(
    icon="fire", fire=True,
    title="Fire Damage Restoration in Dallas&ndash;Fort Worth",
    meta_title="Fire Damage Restoration Dallas TX | Smoke & Soot Cleanup 24/7",
    meta_desc="Emergency fire damage restoration across DFW. Board-up, soot and smoke removal, odor neutralization, contents cleaning and full rebuild. Insurance claim support. Call (708) 506-8917.",
    lede="After a fire there are three clocks running at once: weather getting into an open structure, soot becoming permanent as it sits, and water from the fire department soaking everything the flames did not reach. We handle all three, starting the night it happens.",
    facts=[("Board-up", "Same day"), ("Soot etching", "Starts within hours"),
           ("Water damage", "Present in most fires"), ("Rebuild", "In-house")],
    signs=[
        "Any fire that the fire department responded to, however small",
        "Broken windows, a compromised roof or an open exterior wall",
        "Smoke smell that has not left after a week of airing out",
        "Yellow or brown staining on walls, ceilings or above outlets",
        "Soot on surfaces in rooms the fire never reached",
        "Standing water or saturated carpet from suppression efforts",
        "A puffback from a furnace or boiler that coated the house in soot",
    ],
    body="""
<h2>Fire damage is really four kinds of damage at once</h2>
<p>People picture char. Char is usually the smallest part of the scope. A structure fire produces four distinct damage types, and each requires a different response:</p>
<ul>
<li><strong>Thermal damage</strong> &mdash; burned, charred and heat-deformed materials in and near the fire's origin.</li>
<li><strong>Smoke and soot residue</strong> &mdash; microscopic particulate that travels far beyond the flames, drawn through the structure by pressure differences and pulled into the HVAC system. It is acidic, and it etches and permanently discolors surfaces as it sits.</li>
<li><strong>Water and suppression damage</strong> &mdash; hundreds or thousands of gallons introduced during firefighting, plus whatever a sprinkler system contributed. This is why nearly every fire job is also a water job.</li>
<li><strong>Corrosion and secondary damage</strong> &mdash; acidic residue attacking metal fixtures, wiring, appliances and electronics in the days after the fire.</li>
</ul>
<p>The corrosion timeline is the one that surprises people. Soot residue begins etching glass, chrome, aluminum and finished surfaces within hours, and permanently discolors porous materials within days. A fire that is cleaned in the first 48 hours has a dramatically smaller replacement scope than the same fire cleaned two weeks later.</p>

<h2>What happens first: emergency stabilization</h2>
<h3>Board-up and roof tarping</h3>
<p>An open structure invites weather, animals and theft, and most policies require you to take reasonable steps to protect the property from further loss. We secure broken windows and doors, close structural openings and tarp compromised roofing the same day.</p>
<h3>Water removal</h3>
<p>Suppression water is treated as a water loss in its own right: extraction, moisture mapping and structural drying, running in parallel with the fire cleaning rather than after it. Left alone it becomes a mold problem layered on top of a fire problem.</p>
<h3>Contents triage</h3>
<p>We separate what is salvageable from what is not, document everything for your claim before removal, and pack out items that need off-site cleaning. Documenting non-salvageable contents properly matters &mdash; that inventory is what your personal property claim is built on.</p>

<h2>Smoke and soot: why cleaning method depends on what burned</h2>
<p>Different fuels produce different residues, and using the wrong cleaning method on a residue type can drive it deeper into a surface and set the stain permanently.</p>
<h3>Dry smoke</h3>
<p>From fast, hot, oxygen-rich fires. Fine, powdery residue that sits on surfaces and is removed dry &mdash; HEPA vacuum, chemical sponge, dry cleaning methods. Applying a wet cleaner first can smear it into the surface.</p>
<h3>Wet smoke</h3>
<p>From slower, smoldering, low-oxygen fires, especially plastics and rubber. Sticky, thick, strongly odorous residue that smears easily and requires solvent-based cleaning and considerable labor.</p>
<h3>Protein residue</h3>
<p>From kitchen fires involving cooking oils and food. Nearly invisible, yellowish-brown, and it carries an intense odor that gets into everything. People often try to live with it because they cannot see it, and the smell never leaves until the residue is physically removed and the surfaces are sealed.</p>
<h3>Fuel oil soot and puffback</h3>
<p>From furnace or boiler malfunctions. A puffback distributes an even coat of oily soot through an entire house through the duct system, often with no fire at all.</p>

<h2>Odor removal that actually holds</h2>
<p>Smoke odor is caused by residue, not by air. Ozone treatment and fogging applied over unremoved residue will suppress the smell for a few weeks and then it returns &mdash; which is the single most common complaint we hear about previous restoration work. Real deodorization is sequential:</p>
<ol>
<li>Remove non-salvageable porous materials that have absorbed residue &mdash; carpet, pad, some insulation, badly affected drywall.</li>
<li>Physically clean every affected surface with the method appropriate to that residue type.</li>
<li>Clean the HVAC system and ductwork, which redistributes odor through the house every time the system runs.</li>
<li>Seal remaining structural surfaces where appropriate with a shellac-based sealer to lock in residual odor in framing and subfloor.</li>
<li>Finish with hydroxyl or ozone treatment to neutralize what remains in the air and in hard-to-reach voids.</li>
</ol>
<p>Skipping straight to step five is fast, cheap and does not work.</p>

<h2>Contents cleaning and pack-out</h2>
<p>Textiles, upholstery, electronics, documents, photographs and hard goods each require different treatment. Ultrasonic cleaning handles hard contents. Textiles go through specialized laundering. Electronics need residue removed before they are powered on, because acidic soot on a circuit board keeps working after the fire is out. Documents and photographs can often be recovered by freeze-drying if they are stabilized quickly.</p>
<p>Where the property is not workable around contents, we pack out with a written inventory, clean and store off site, and move everything back once the rebuild is complete.</p>

<h2>Rebuild</h2>
<p>Framing repair, insulation, drywall and texture, electrical and plumbing corrections, flooring, cabinetry, countertops, trim, doors and paint. Handling both the mitigation and the reconstruction under one company means the tear-out is scoped with the rebuild in mind, and the timeline is not held hostage while a second contractor is sourced.</p>

<h2>Working your fire claim</h2>
<p>Fire claims are larger and more document-heavy than most water claims because they involve dwelling coverage, personal property and usually additional living expenses. We provide the photographic record, the room-by-room scope, the contents inventory and the daily documentation that your adjuster needs, and we can meet them on site. Keep every receipt from the moment you leave the property &mdash; hotel, meals, clothing, pet boarding &mdash; because additional living expense coverage reimburses the difference between your normal costs and what you are spending now.</p>
""",
    faqs=[
        ("How soon after a fire should cleanup start?",
         "<p>As soon as the structure has been released by the fire department and deemed safe to enter. Soot is acidic and begins etching glass, metal and finished surfaces within hours, and permanently staining porous materials within days. Delay directly converts cleanable items into replaceable ones.</p>"),
        ("Can the smoke smell really be removed completely?",
         "<p>Yes, when it is done properly. Odor lives in residue and in porous materials, so it requires physical removal and cleaning, duct cleaning, sealing where appropriate, and only then air treatment. Companies that skip to ozone alone produce a result that smells fine for a few weeks and then reverts.</p>"),
        ("Why is there water damage when I only had a small fire?",
         "<p>Because suppression uses a great deal of water, and sprinkler systems discharge until they are shut off. In most fire jobs we run water mitigation and fire cleaning simultaneously &mdash; otherwise you finish the fire work and inherit a mold problem.</p>"),
        ("Do I need to board up if the damage looks minor?",
         "<p>If there is any opening in the building envelope, yes. Beyond the obvious weather and security risk, most policies require the insured to take reasonable steps to prevent further loss. Additional damage from an opening you left unsecured can be disputed.</p>"),
        ("Can my electronics and appliances be saved?",
         "<p>Sometimes, but do not power anything on. Acidic soot on internal components continues corroding after the fire and current accelerates the damage. Items should be professionally cleaned and evaluated before they are energized.</p>"),
        ("Will you handle the rebuild or just the cleanup?",
         "<p>Both, in house. Board-up, water mitigation, soot removal, deodorization, contents and full reconstruction through final paint &mdash; one contract and one point of contact.</p>"),
    ],
    related=["smoke-damage-cleanup", "odor-removal", "emergency-board-up", "contents-cleaning", "renovation"],
)

# ==================================================================== MOLD
S["mold-remediation"] = dict(
    icon="mold", fire=False,
    title="Mold Remediation in Dallas&ndash;Fort Worth",
    meta_title="Mold Remediation Dallas TX | Inspection, Containment & Removal",
    meta_desc="Professional mold remediation across Dallas-Fort Worth. Containment, HEPA filtration, safe removal and moisture correction so it does not come back. Free inspection. Call (708) 506-8917.",
    lede="Mold is a moisture problem that grew a symptom. We contain the area, remove what is affected without spreading spores through the rest of the property, and &mdash; the part that actually matters &mdash; fix the water source that fed it.",
    facts=[("Growth begins", "24&ndash;48 hours"), ("Containment", "Negative air"),
           ("Filtration", "HEPA"), ("Cause", "Always moisture")],
    signs=[
        "A persistent musty or earthy smell, especially in one room",
        "Visible growth &mdash; black, green, white or orange &mdash; on any surface",
        "Discoloration or staining on drywall, ceilings or grout",
        "Peeling, bubbling or cracking paint and wallpaper",
        "Warped or bulging drywall in a bathroom, laundry or exterior wall",
        "Allergy-type symptoms that get better when you leave the property",
        "Condensation on windows or interior walls",
        "Any water intrusion in the past that was not professionally dried",
    ],
    body="""
<h2>Mold is a symptom. Moisture is the disease.</h2>
<p>Mold spores are present in every building, everywhere, all the time. They are not a problem until three conditions line up: a food source (drywall paper, wood, dust), a temperature range (roughly the same as human comfort), and <strong>moisture</strong>. You cannot remove spores from a building and you cannot remove the food source. Moisture is the only variable you control.</p>
<p>This is the single most important thing to understand about remediation, because it explains why so many mold jobs fail. Cleaning visible growth without correcting the water source produces a property that looks fine for a few months and then has the same problem in the same place. Any company that quotes you for removal without investigating where the water is coming from is selling you a temporary result.</p>

<h2>Why DIY mold removal so often makes things worse</h2>
<p>Two reasons, both mechanical.</p>
<p><strong>Disturbance spreads it.</strong> Scrubbing, cutting or vacuuming a colony with a household vacuum aerosolizes millions of spores that then settle throughout the property and get pulled into the HVAC system. A problem confined to one bathroom wall becomes a problem in four rooms. Professional remediation exists largely to prevent exactly this &mdash; the containment is not theater, it is the whole point.</p>
<p><strong>Bleach does not do what people think.</strong> On non-porous surfaces like tile and glass, bleach kills surface growth. On porous materials like drywall and wood &mdash; where mold actually lives &mdash; the chlorine stays on the surface while the water content soaks in, feeding the roots underneath. You get a bleached, still-colonized, now wetter piece of drywall.</p>

<h2>How we handle a mold job</h2>
<h3>Inspection and moisture investigation</h3>
<p>We start by finding the water, not the mold. Moisture meters, thermal imaging and a physical inspection of the plumbing, roof, envelope, drainage and HVAC establish where water is entering or condensing. Visible growth tells us where to start looking, not where the problem ends.</p>
<h3>Assessment and, where needed, testing</h3>
<p>For larger affected areas, for health-related situations, and where your insurance carrier requires it, an independent industrial hygienist tests and writes a remediation protocol. We follow that protocol and a separate clearance test verifies the result. Independence matters here: the company writing the protocol should not be the company profiting from its size, which is why we work to third-party protocols rather than writing our own on jobs of that scale.</p>
<h3>Containment</h3>
<p>The affected area is sealed with polyethylene barriers and put under negative air pressure using HEPA-filtered air scrubbers, so air flows into the containment and never out of it. HVAC serving the area is shut down and registers are sealed. This is what keeps a contained problem contained.</p>
<h3>Removal</h3>
<p>Affected porous materials &mdash; drywall, insulation, carpet, pad, ceiling tile &mdash; are removed and bagged inside containment. Semi-porous and non-porous materials like framing, concrete and metal are cleaned in place with HEPA vacuuming, damp wiping and antimicrobial treatment, and abrasive methods such as soda or dry ice blasting where growth has penetrated wood grain.</p>
<h3>Drying and moisture correction</h3>
<p>The structure is dried to measured readings, and the source is corrected: repairing the leak, redirecting drainage, improving ventilation, insulating a condensing surface, or fixing the HVAC condition producing humidity. This is the step that determines whether the job holds.</p>
<h3>HEPA cleanup and clearance</h3>
<p>Final HEPA vacuuming and damp wiping of all surfaces within containment, air scrubbers left running through the settling period, then clearance testing where a protocol was written. Containment comes down only after clearance.</p>
<h3>Rebuild</h3>
<p>Insulation, drywall, texture, paint, flooring and trim &mdash; ideally with material choices that reduce the odds of recurrence in that location, such as mold-resistant board in a bathroom or laundry.</p>

<h2>Where mold shows up in North Texas properties</h2>
<p>Our climate produces a specific pattern. Long humid summers with air conditioning running constantly create big temperature differentials across building assemblies, and condensation forms wherever conditioned and unconditioned air meet at an inadequately insulated surface.</p>
<ul>
<li><strong>Attics and attic-mounted HVAC</strong> &mdash; condensate line clogs, drain pan failures and duct condensation, usually discovered as a ceiling stain in late summer.</li>
<li><strong>Under sinks and behind toilets</strong> &mdash; slow supply line and wax ring leaks in a dark, still cabinet.</li>
<li><strong>Behind washing machines</strong> &mdash; a slow hose drip against drywall nobody moves the machine to check.</li>
<li><strong>Bathrooms without working exhaust</strong> &mdash; a fan that vents into the attic instead of outside just relocates the problem.</li>
<li><strong>Exterior walls with grade or drainage issues</strong> &mdash; especially where soil has settled toward the foundation or gutters discharge next to the wall.</li>
<li><strong>Anywhere a past water loss was dried "well enough"</strong> &mdash; the most common source we find is an old leak someone handled with fans.</li>
</ul>

<h2>Health effects, described honestly</h2>
<p>Mold exposure affects people very differently. Many people experience nothing. Others &mdash; particularly those with asthma, allergies, respiratory conditions or compromised immune systems, and often infants and older adults &mdash; experience congestion, coughing, eye and skin irritation, headaches or worsened asthma. Symptoms that improve when you leave the property and return when you come back are the pattern worth paying attention to.</p>
<p>We are a remediation company, not a medical provider. We will tell you what we found, where, and how much of it &mdash; and if you have health concerns, that conversation belongs with your physician. We will not tell you that mold caused a specific symptom, and you should be cautious with any contractor who does.</p>

<h2>Insurance and mold</h2>
<p>Coverage varies more than on any other loss type. Many Texas policies cover mold when it results directly from a covered sudden event &mdash; a burst pipe that was reported and remediated promptly &mdash; and exclude mold resulting from long-term leaks, humidity or deferred maintenance. Many policies also cap mold coverage at a specific dollar amount regardless of the actual cost. Read your policy, and report promptly: a delay in reporting is one of the most common reasons a mold claim gets reduced or denied.</p>
""",
    faqs=[
        ("Do I need a mold test before remediation?",
         "<p>Not always. If growth is visible and the affected area is small, testing often tells you what you can already see, and the money is better spent on removal and fixing the source. Testing is genuinely valuable when you smell mold but cannot find it, when the affected area is large, when there are health concerns, when a real estate transaction is involved, or when your carrier requires a protocol.</p>"),
        ("Can I just clean it with bleach?",
         "<p>On hard non-porous surfaces like tile or glass, bleach handles surface growth. On porous materials like drywall and wood, it does not &mdash; the chlorine stays on the surface while the water soaks in and feeds the growth underneath. Porous materials with real colonization need removal, not cleaning.</p>"),
        ("How long does mold remediation take?",
         "<p>A contained single-room job is typically one to three days for the remediation itself, plus drying time and clearance testing where applicable, plus the rebuild. Larger jobs and situations requiring a hygienist protocol and clearance run longer. We will give you a realistic schedule at the assessment.</p>"),
        ("Will the mold come back?",
         "<p>Only if the moisture does. Remediation performed without correcting the water source is temporary by definition, which is why our inspection starts with finding the water rather than the growth. Fix the source and the location stays clear.</p>"),
        ("Is black mold more dangerous than other mold?",
         "<p>'Black mold' usually refers to Stachybotrys chartarum, which does produce mycotoxins &mdash; but plenty of harmless molds are also black, and several non-black molds cause reactions. Color is not a reliable guide to risk. The practical response to any significant indoor growth is the same regardless of species: contain it, remove it, and fix the moisture.</p>"),
        ("Can I stay in the house during remediation?",
         "<p>Usually yes, when containment is properly established and the affected area is not a kitchen or the only bathroom. If the affected area is large, if there is heavy HVAC involvement, or if someone in the household has significant respiratory sensitivity, temporary relocation may be the better call. We will give you a straight recommendation.</p>"),
    ],
    related=["water-damage-restoration", "structural-drying", "flood-cleanup", "odor-removal", "renovation"],
)

# ==================================================================== STORM
S["storm-damage-restoration"] = dict(
    icon="wind", fire=True,
    title="Storm &amp; Wind Damage Restoration in DFW",
    meta_title="Storm Damage Restoration Dallas Fort Worth | Hail, Wind & Roof Damage",
    meta_desc="24/7 storm damage restoration across DFW. Emergency tarping and board-up, water mitigation, hail and wind damage repair, insurance documentation. Call (708) 506-8917.",
    lede="North Texas sits in one of the most active severe-weather corridors in the country. When hail opens a roof or straight-line winds take a fence through a window, the priority is stopping water from getting in &mdash; then repairing what already did.",
    facts=[("Emergency tarping", "Same day"), ("Board-up", "24/7"),
           ("Peak season", "March&ndash;June"), ("Claims", "Documented on site")],
    signs=[
        "Missing, cracked, lifted or granule-stripped shingles after a storm",
        "Dented gutters, downspouts, vents, flashing or roof-mounted HVAC",
        "Water stains on a ceiling that appeared after a storm",
        "Broken or cracked windows and damaged screens",
        "Fence sections down, or a tree limb resting on the structure",
        "Debris impact damage to siding, soffit, fascia or garage doors",
        "Standing water where it has never pooled before",
    ],
    body="""
<h2>What North Texas weather actually does to buildings</h2>
<p>DFW takes a specific set of hits: large hail in spring, straight-line winds that can match a weak tornado, occasional tornado activity, and intense short-duration rainfall that overwhelms drainage. Each damages a building differently.</p>
<h3>Hail</h3>
<p>Hail damage is often not visible from the ground. Impact fractures the shingle mat and strips the granules that protect the asphalt from UV. The roof may not leak for a year or more, but the shingle's service life has been cut short and failure is now a matter of time. This is why post-storm roof inspection matters even when nothing is obviously wrong &mdash; and why carriers impose deadlines for reporting hail claims.</p>
<h3>Straight-line winds</h3>
<p>More common here than tornadoes and capable of similar damage over a wider area. Winds lift shingle edges and break the adhesive seal, so the roof looks intact but is no longer sealed &mdash; the next ordinary rain drives water under the courses. Winds also take down fences, trees and limbs, and turn loose objects into projectiles.</p>
<h3>Rainfall and drainage</h3>
<p>Our clay soil sheds water rather than absorbing it, so a heavy cell produces fast runoff. Water backs up at overwhelmed gutters, finds compromised flashing, and pushes into low-lying garages, sunrooms and slab-on-grade additions.</p>
<h3>Freeze events</h3>
<p>Less frequent but very costly. Regional hard freezes burst uninsulated attic and exterior-wall piping across thousands of homes at once, and the damage appears everywhere simultaneously the moment temperatures rise.</p>

<h2>First priority: stop the intrusion</h2>
<p>After a storm, the damage that has already happened is fixed. The damage still to come is not, and it is usually larger. A roof opening that stays open through the next rain converts a roof repair into a ceiling, insulation, drywall, flooring and potentially mold job.</p>
<h3>Emergency roof tarping</h3>
<p>Heavy-duty tarp secured to the deck over the compromised area, installed to shed water rather than pond it. This is a temporary measure that holds until permanent repair, and it is the single highest-value thing that can happen in the first 24 hours.</p>
<h3>Board-up</h3>
<p>Broken windows, damaged doors and openings in the envelope closed to keep out weather, animals and intruders.</p>
<h3>Debris removal</h3>
<p>Limbs, fence sections and displaced material cleared so the structure can be assessed and worked on safely.</p>
<h3>Water mitigation</h3>
<p>Everything that came in through the opening is handled as a water loss: extraction, moisture mapping, structural drying and monitoring. Storm jobs that skip this step reliably become mold jobs.</p>

<h2>Assessment and repair</h2>
<p>Once the property is stable we document thoroughly &mdash; roof, exterior envelope, windows and openings, interior water damage, and contents &mdash; and produce a scope covering both what is visible and what testing revealed. Repairs run from roofing, decking, flashing, gutters, siding, soffit and fascia through to interior drywall, insulation, flooring, paint and trim.</p>

<h2>Storm claims: what to do and what to watch out for</h2>
<p>Report promptly. Texas policies commonly include reporting deadlines for hail and wind, and late reporting is one of the most common grounds for reduction or denial. Photograph everything before any temporary repair, then photograph the temporary repair too. Keep receipts for tarps, board-up and anything you buy to protect the property &mdash; those costs are typically reimbursable.</p>
<blockquote><p>Every major DFW storm brings out-of-state crews who go door to door within days. Some are legitimate. Many are not. Be extremely cautious with anyone who shows up uninvited, pressures you to sign on the spot, offers to "waive" or "eat" your deductible, or asks you to sign a document assigning your claim benefits before you have read it. Absorbing a deductible is insurance fraud in Texas, and it makes you a party to it.</p></blockquote>
<p>We are based in Dallas and we are here after the storm season ends, which is the relevant difference. Ask any contractor for a physical local address, a Texas contact and proof of insurance before signing anything &mdash; including us.</p>
""",
    faqs=[
        ("How soon should I file a storm claim?",
         "<p>Immediately. Texas policies commonly carry reporting deadlines for hail and wind damage, and late reporting is a frequent reason claims are reduced or denied. Report first, then have the property inspected &mdash; you do not need a full damage assessment to open a claim.</p>"),
        ("Can hail damage a roof without causing a leak?",
         "<p>Routinely. Hail fractures the shingle mat and strips protective granules, which shortens the roof's remaining life without producing immediate water intrusion. A roof can look fine from the ground and still be a covered loss, which is why post-storm inspection matters even with no visible leak.</p>"),
        ("Should I tarp the roof myself?",
         "<p>Only if you can do it safely from the ground, which for most roofs you cannot. Storm-damaged roofs are structurally unpredictable and often wet. Call for emergency tarping instead &mdash; a poorly secured tarp that ponds water or blows off overnight leaves you worse off than none.</p>"),
        ("A contractor knocked on my door offering to cover my deductible. Is that legal?",
         "<p>No. Absorbing, waiving or rebating an insurance deductible is illegal in Texas and it exposes you as well as the contractor. It is also a reliable indicator of how the rest of that relationship will go. Treat it as a reason to close the door.</p>"),
        ("Do you handle both the roof and the interior damage?",
         "<p>Yes. Emergency tarping and board-up, exterior repair, water mitigation and interior reconstruction under one contract, which avoids the common situation where a roofer finishes and you are left finding someone else for the ceiling.</p>"),
    ],
    related=["emergency-board-up", "water-damage-restoration", "emergency-cleanup", "renovation", "junk-removal"],
)

# ==================================================================== FLOOD
S["flood-cleanup"] = dict(
    icon="drop", fire=False,
    title="Flood Cleanup &amp; Sewage Backup Response",
    meta_title="Flood Cleanup Dallas TX | Sewage Backup & Category 3 Water | 24/7",
    meta_desc="Emergency flood cleanup and sewage backup response across DFW. Containment, extraction, disinfection and safe disposal of contaminated materials. Call (708) 506-8917.",
    lede="Floodwater and sewage are not just messier versions of a leak &mdash; they are Category 3 contamination, and they are handled with containment, protective equipment and controlled disposal rather than a wet vac and optimism.",
    facts=[("Water class", "Category 3"), ("Response", "24/7"),
           ("PPE", "Full protective"), ("Porous materials", "Removed, not dried")],
    signs=[
        "Sewage backing up through a floor drain, tub or toilet",
        "Water entering the property from outside during heavy rain",
        "Multiple drains gurgling or draining slowly at the same time",
        "A strong sewage or sulfur smell inside the property",
        "Water in a crawlspace, garage or slab-on-grade addition",
        "Any flooding where the water source is unknown",
    ],
    body="""
<h2>Why floodwater is treated completely differently</h2>
<p>Restoration classifies water by contamination level, and floodwater and sewage sit at the top of that scale. Category 3 water carries bacteria, viruses, parasites, and whatever chemicals, fuel and organic material it collected on the way in. The health risk comes from contact and from aerosolized contaminants, which is why the response is built around containment as much as removal.</p>
<p>The practical consequence is that porous materials do not get dried and saved. Carpet, pad, particle board, insulation, mattresses, upholstered furniture and drywall below the contamination line are removed and disposed of. Drying contaminated porous material leaves you with a dry contaminated material, which is not an improvement.</p>

<h2>What we do</h2>
<h3>Containment and safety</h3>
<p>The affected area is isolated, HVAC serving it is shut down so contaminants are not distributed through the building, and crews work in full PPE. Electrical hazards are addressed before anyone enters standing water.</p>
<h3>Extraction and solids removal</h3>
<p>Contaminated water and solids are removed with dedicated equipment. Volume out is documented for the claim.</p>
<h3>Controlled demolition and disposal</h3>
<p>Affected porous materials are cut out, bagged inside containment and disposed of according to regulation. Drywall is typically removed to a defined height above the contamination line so the cavity can be cleaned and dried.</p>
<h3>Cleaning and disinfection</h3>
<p>All remaining surfaces &mdash; framing, subfloor, concrete, metal &mdash; are cleaned and treated with EPA-registered antimicrobials. HEPA air scrubbers run throughout to capture airborne particulate.</p>
<h3>Structural drying</h3>
<p>Once the area is clean, standard drying applies: air movers and dehumidifiers to a calculated load, monitored daily against dry standard readings.</p>
<h3>Rebuild</h3>
<p>Insulation, drywall, flooring and trim replaced, and where drainage or a plumbing defect caused the event, we will tell you plainly what needs to change to stop it recurring.</p>

<h2>Sewage backups specifically</h2>
<p>A backup usually means a blockage or failure downstream of the property &mdash; a clogged lateral, root intrusion, a collapsed line, or a municipal main surcharged during heavy rain. Stop using water in the building immediately, because every flush and every drain adds to the volume. Keep people and pets out of the affected area, and do not attempt to clean it with household products.</p>

<h2>Flood insurance versus homeowners insurance</h2>
<p>This distinction catches a lot of people. Standard homeowners policies generally exclude flooding &mdash; meaning water that enters the property from outside, including rising surface water and overflowing creeks. That requires a separate flood policy, typically through the NFIP or a private carrier.</p>
<p>Sewage backup is different again: it is commonly excluded from base policies but available as an inexpensive endorsement, and it is one of the best value add-ons in residential insurance if you are on an older line or downstream of mature trees. Water that enters from a burst interior pipe is a standard covered loss, not a flood. Because coverage turns on where the water came from, establishing the source correctly and documenting it matters.</p>
""",
    faqs=[
        ("Can any of my belongings be saved after a sewage backup?",
         "<p>Hard, non-porous items &mdash; glass, metal, sealed plastics, dishes &mdash; can usually be cleaned and disinfected. Porous items that absorbed contaminated water, including upholstered furniture, mattresses, carpet and particle board, are removed and disposed of. We document everything before disposal for your claim.</p>"),
        ("Is homeowners insurance going to cover this?",
         "<p>It depends entirely on the source. Water from a burst interior pipe is typically covered. Rising water from outside requires separate flood insurance. Sewage backup is usually excluded from base policies but is commonly available as an endorsement. We document the source carefully because that is what coverage turns on.</p>"),
        ("How dangerous is it to be in the house?",
         "<p>Stay out of the affected area. Category 3 water carries bacteria and viruses, and contaminants can become airborne. Keep children and pets away entirely, do not run the HVAC if it serves the affected area, and let a crew with proper protective equipment handle it.</p>"),
        ("Why does the drywall have to come out if it looks fine?",
         "<p>Because contamination wicks upward inside the wall cavity, and drywall is porous. Cutting above the contamination line lets us clean and dry the cavity, the framing and the insulation properly. Leaving it produces a wall that is dry and still contaminated.</p>"),
    ],
    related=["water-damage-restoration", "biohazard-cleanup", "emergency-cleanup", "mold-remediation", "junk-removal"],
)

# ==================================================================== BURST PIPE
S["burst-pipe-repair"] = dict(
    icon="drop", fire=False,
    title="Burst Pipe Cleanup &amp; Water Line Damage",
    meta_title="Burst Pipe Cleanup Dallas TX | Emergency Water Line Damage 24/7",
    meta_desc="Burst pipe emergency response across Dallas-Fort Worth. Immediate extraction, structural drying, wall and ceiling repair. 24/7 dispatch. Call (708) 506-8917.",
    lede="A pressurized supply line does not drip &mdash; it delivers hundreds of gallons an hour until someone shuts off the water. What happens in the first hour after that determines whether this is a drying job or a demolition job.",
    facts=[("Flow rate", "Hundreds of gal/hr"), ("First move", "Shut off the main"),
           ("Response", "24/7"), ("Common cause", "Freeze &amp; age")],
    signs=[
        "Water coming through a ceiling or running down a wall",
        "The sound of running water with every fixture off",
        "A sudden drop in water pressure",
        "Water pooling at the base of a wall or under cabinets",
        "No water at all after a hard freeze &mdash; often a frozen line about to fail",
        "A water bill that jumped sharply with no change in usage",
    ],
    body="""
<h2>Shut off the water first</h2>
<p>Before anything else: find your main shutoff and close it. In most DFW homes it is at the street in a meter box, or on an exterior wall near the front hose bib. If you can isolate the specific fixture with an angle stop, do that instead. Every minute of open flow is more water in the structure, and this is the one part nobody can do for you before a crew arrives.</p>
<p>If water is near outlets, the panel or ceiling fixtures, cut power to that area at the breaker &mdash; but only if you can reach the panel without walking through water. If you cannot, wait for us.</p>

<h2>Why pipes burst in North Texas</h2>
<h3>Freeze events</h3>
<p>Our building stock is designed for heat. Pipes run through uninsulated attics, exterior walls and unconditioned garages. When water freezes it expands, and the pressure between the ice plug and a closed fixture ruptures the pipe. The failure typically reveals itself on the thaw, when pressure returns and water pours through the split &mdash; which is why regional freezes produce thousands of simultaneous losses across the Metroplex.</p>
<h3>Aging supply lines</h3>
<p>Braided connectors under sinks and behind toilets are consumable. Galvanized steel in older homes corrodes from the inside until the wall thickness fails. Polybutylene, used widely in the 1980s and early 90s and still present in some DFW homes, degrades from contact with treated water and fails without warning.</p>
<h3>Slab and foundation movement</h3>
<p>Expansive clay soil expands and contracts through wet and dry cycles, and that movement stresses lines running through and under the slab.</p>
<h3>Water pressure</h3>
<p>Pressure above roughly 80 psi stresses every connection in the system continuously. A pressure-reducing valve is inexpensive and often overlooked.</p>

<h2>What we do when we arrive</h2>
<p>Confirm the water is off and the area is electrically safe, then extract standing water immediately. Thermal imaging and moisture meters map how far the water travelled, including inside wall cavities and under cabinet toe kicks. Wet insulation and saturated drywall are removed where they will not dry in place; where materials can be dried, they are dried. Air movers and LGR dehumidifiers are set to a calculated load and monitored daily. Then the repair: drywall, texture, insulation, flooring, cabinetry and paint.</p>
<p>Upstairs and attic-line breaks deserve a note. Water follows framing and travels a long way before it appears, so the visible stain on a downstairs ceiling is rarely above the break. We map the actual extent rather than treating what is visible.</p>

<h2>Preventing the next one</h2>
<ul>
<li>Insulate pipes in attics, garages and exterior walls before winter, not during a freeze warning.</li>
<li>Know where your main shutoff is and confirm it turns &mdash; before you need it at 3am.</li>
<li>Disconnect hoses and cover hose bibs ahead of a freeze; an attached hose traps water in the bib.</li>
<li>Replace braided supply lines on a schedule rather than on failure. They are inexpensive.</li>
<li>Check your static water pressure and install a pressure-reducing valve if it exceeds 80 psi.</li>
<li>Install leak detection sensors near water heaters, washing machines and under sinks. Automatic shutoff valves cost a fraction of a single claim deductible.</li>
<li>During a hard freeze, let a faucet drip on exterior-wall runs and open cabinet doors under sinks on outside walls.</li>
</ul>
""",
    faqs=[
        ("What do I do the second I find a burst pipe?",
         "<p>Shut off the water at the main, cut power to the affected area if you can reach the panel safely, and call for extraction. Then photograph everything before anything is moved. Those four steps in that order will save you more money than any decision you make later.</p>"),
        ("Does insurance cover a burst pipe?",
         "<p>Sudden and accidental pipe failure is covered under most homeowners policies, including resulting water damage. What is typically not covered is the cost of repairing the pipe itself, and damage from a leak that was gradual or attributable to deferred maintenance. Prompt reporting and good documentation matter.</p>"),
        ("Do you repair the pipe as well as the damage?",
         "<p>We coordinate the plumbing repair and handle everything from extraction through final paint. The plumbing repair itself is performed by a licensed plumber, which is how it should be on any job.</p>"),
        ("Water came through my downstairs ceiling. How much is damaged?",
         "<p>Almost always more than is visible. Water travels along framing and appears wherever it can drop, which is rarely directly under the break. We map the full extent with thermal imaging and moisture meters rather than working from stains.</p>"),
    ],
    related=["water-damage-restoration", "water-extraction", "structural-drying", "renovation", "mold-remediation"],
)

# ==================================================================== SMOKE
S["smoke-damage-cleanup"] = dict(
    icon="fire", fire=True,
    title="Smoke Damage Cleanup &amp; Soot Removal",
    meta_title="Smoke Damage Cleanup Dallas TX | Soot Removal & Deodorization",
    meta_desc="Professional smoke and soot damage cleanup in DFW. Residue-specific cleaning, HVAC decontamination and permanent odor removal. Call (708) 506-8917.",
    lede="Smoke travels where fire does not. Soot reaches rooms that never saw flame, settles into porous surfaces and rides the HVAC system through the whole building &mdash; and it becomes permanent as it sits.",
    facts=[("Etching begins", "Within hours"), ("Residue types", "Four"),
           ("HVAC", "Always decontaminated"), ("Odor", "Removed, not masked")],
    signs=[
        "Soot film on walls, ceilings, blinds or above door frames",
        "Yellow or brown staining, especially above outlets and vents",
        "Smoke smell that returns when the AC or heat runs",
        "Discolored or tarnished metal fixtures, chrome and appliances",
        "A greasy invisible film after a kitchen fire",
        "An even coat of oily black dust after a furnace puffback",
    ],
    body="""
<h2>Why soot has a deadline</h2>
<p>Smoke residue is acidic. Within hours it begins etching glass, chrome, aluminum, marble and finished surfaces. Within days it permanently discolors porous materials, plastics, fabrics and painted finishes. Within weeks it corrodes wiring, electronics and metal fixtures. The scope of a smoke job is therefore partly a function of how quickly cleaning starts &mdash; delay converts cleanable items into replaceable ones.</p>

<h2>Matching the method to the residue</h2>
<p>Using a wet cleaner on dry soot smears it into the surface and sets the stain. Using a dry method on wet smoke accomplishes nothing. Identifying the residue type is the first thing we do.</p>
<ul>
<li><strong>Dry smoke</strong> &mdash; fast, hot fires. Fine and powdery. Removed with HEPA vacuuming, chemical sponges and dry methods before any liquid touches the surface.</li>
<li><strong>Wet smoke</strong> &mdash; smoldering, low-oxygen fires, especially plastics and rubber. Sticky, dense, smears readily, strong odor. Requires solvent cleaning and a lot of labor.</li>
<li><strong>Protein residue</strong> &mdash; kitchen fires. Nearly invisible, yellow-brown, extreme odor. Physically present on every surface in the room even where nothing looks dirty. Requires degreasing agents and usually sealing.</li>
<li><strong>Fuel oil soot</strong> &mdash; furnace puffbacks. Oily black film distributed evenly through the house by the duct system, frequently with no fire at all.</li>
</ul>

<h2>Our process</h2>
<p>We assess residue type and map affected areas, including rooms with no visible damage, since smoke migrates on pressure differentials. Contents are triaged and packed out where off-site cleaning is needed. Every affected surface is cleaned with the appropriate method, working top-down. The HVAC system and ductwork are cleaned, because a contaminated system redistributes odor through the property every time it cycles. Non-salvageable porous materials are removed. Remaining structural surfaces are sealed where appropriate, and the job finishes with hydroxyl or ozone treatment.</p>

<h2>The HVAC step people skip</h2>
<p>During a fire, the air handler pulls smoke into the return and distributes it through every duct run in the building. The system becomes a reservoir. Clean every wall in the house, leave the ducts alone, run the AC in July, and the smell is back. Duct and coil cleaning is not optional on a smoke job.</p>
""",
    faqs=[
        ("Can I clean soot myself?",
         "<p>We would advise against it. Wiping soot with a household cleaner typically smears it into the surface and sets the stain permanently, turning a cleanable wall into a repaint. Soot is also acidic and is a respiratory irritant. If you want to do something useful before we arrive, ventilate if outdoor conditions allow and leave the surfaces alone.</p>"),
        ("Why does my house still smell after cleaning?",
         "<p>Almost always because residue remains somewhere it was not cleaned &mdash; inside the duct system, in the attic, in insulation, behind trim, or in porous contents. Odor is not an air problem, it is a residue problem, and it persists until the residue is physically removed or sealed.</p>"),
        ("Is soot dangerous to breathe?",
         "<p>Yes. Fine particulate lodges in the respiratory tract and the residue can include acidic and toxic compounds depending on what burned. Limit time in affected areas, keep children and anyone with respiratory conditions out, and do not run the HVAC through an affected system.</p>"),
        ("Will my clothes and upholstery be salvageable?",
         "<p>Frequently yes, with specialized laundering and ozone treatment rather than a normal wash cycle. Heavily saturated items and those with protein residue are harder. We inventory and document everything before it leaves the property.</p>"),
    ],
    related=["fire-damage-restoration", "odor-removal", "contents-cleaning", "emergency-board-up", "renovation"],
)

# ==================================================================== EXTRACTION
S["water-extraction"] = dict(
    icon="drop", fire=False,
    title="Emergency Water Extraction",
    meta_title="Water Extraction Dallas TX | Emergency Standing Water Removal 24/7",
    meta_desc="Emergency water extraction across Dallas-Fort Worth. Truck-mounted and portable units, 24/7 dispatch, immediate response to standing water. Call (708) 506-8917.",
    lede="Removing water as a liquid is faster and cheaper than removing it as vapor. Extraction is the first hour of the job and the single highest-leverage thing that happens on a water loss.",
    facts=[("Response", "24/7"), ("Equipment", "Truck-mount &amp; portable"),
           ("Priority", "Liquid before vapor"), ("Next step", "Structural drying")],
    signs=[
        "Standing water anywhere on the property",
        "Carpet that squelches when you step on it",
        "Water spreading toward rooms not yet affected",
        "Water in a crawlspace, basement or garage",
        "Any active leak that has been running more than a few minutes",
    ],
    body="""
<h2>Why extraction comes before everything</h2>
<p>Industry practice holds that removing water in liquid form is roughly 1,200 times more efficient than removing the same water as vapor through dehumidification. That ratio is the whole argument. Every gallon extracted on day one is a gallon your dehumidifiers never have to pull out of the air, which shortens the drying schedule, reduces equipment, and cuts the window in which mold can start.</p>
<p>It also limits spread. Water migrates continuously along the path of least resistance &mdash; under walls, beneath cabinets, into adjacent rooms and down through floor assemblies. Extraction stops the affected area from growing.</p>

<h2>How we extract</h2>
<h3>Truck-mounted units</h3>
<p>The highest-capacity option, used for large volumes and Category 3 water where the recovery tank stays outside the building. Continuous operation without stopping to empty.</p>
<h3>Portable extractors</h3>
<p>Used for upper floors, tight access and areas a hose run cannot reach efficiently.</p>
<h3>Weighted extraction tools</h3>
<p>Body weight drives water up through carpet and pad, pulling far more water than suction alone. This is often what determines whether pad can be saved.</p>
<h3>Submersible pumps</h3>
<p>For deep standing water in crawlspaces, garages and pits, before extraction tools are used on the remainder.</p>
<h3>Specialty tools</h3>
<p>Hardwood floor drying mats and injection systems pull moisture from between boards and from the subfloor without removing the floor &mdash; frequently the difference between refinishing and replacing.</p>

<h2>What happens next</h2>
<p>Extraction is the beginning, not the end. Once free water is gone, moisture remains bound inside materials &mdash; drywall, framing, subfloor, insulation &mdash; and that requires controlled structural drying with air movement and dehumidification, monitored daily. A property that has been extracted but not dried still has a mold clock running.</p>
""",
    faqs=[
        ("Can I extract the water myself with a shop vac?",
         "<p>For a very small spill on a hard surface, yes. For anything involving carpet, pad, wall cavities or more than a few gallons, a shop vac removes a fraction of the water and none of what has wicked into materials. It also does nothing about bound moisture, which is what actually causes secondary damage.</p>"),
        ("How long does extraction take?",
         "<p>Most residential losses extract in a few hours. Volume, access and how far the water travelled all affect it. Equipment is usually set the same visit so drying begins immediately.</p>"),
        ("Do I need drying after extraction?",
         "<p>Nearly always. Extraction removes free water; it does not remove moisture absorbed into drywall, framing and subfloor. Skipping the drying phase is the most common cause of a mold problem four weeks after a leak that seemed handled.</p>"),
    ],
    related=["water-damage-restoration", "structural-drying", "flood-cleanup", "burst-pipe-repair"],
)

# ==================================================================== DRYING
S["structural-drying"] = dict(
    icon="fan", fire=False,
    title="Structural Drying &amp; Dehumidification",
    meta_title="Structural Drying Dallas TX | Professional Dehumidification & Monitoring",
    meta_desc="Professional structural drying across DFW. LGR dehumidification, calculated equipment loads, daily moisture monitoring and documented dry standards. Call (708) 506-8917.",
    lede="Drying a building is a measured process, not a waiting game. Air movement, dehumidification and temperature are balanced against the materials involved and verified daily against a documented dry standard.",
    facts=[("Typical duration", "3&ndash;5 days"), ("Equipment", "LGR dehus &amp; air movers"),
           ("Monitoring", "Daily readings"), ("Completion", "By measurement")],
    signs=[
        "A water loss that was extracted but never professionally dried",
        "Musty smell weeks after a leak was 'handled'",
        "Baseboards or drywall still soft to the touch",
        "Flooring cupping or lifting after water exposure",
        "Condensation appearing on windows or walls after a loss",
    ],
    body="""
<h2>The physics, briefly</h2>
<p>Water leaves a material only when the surrounding air is drier than the material. Air movers create that gradient by breaking the saturated boundary layer at the surface, which speeds evaporation. But evaporation just moves the water into the air &mdash; if it stays there, it condenses on the next cool surface it finds, often inside a wall cavity or in the attic. Dehumidifiers remove it from the building entirely. Both together, in balance, is drying. Either one alone is not.</p>
<p>This is why running household fans on a wet floor can make things worse: you raise indoor humidity and drive moisture into assemblies that were dry before.</p>

<h2>Calculated equipment, not guesswork</h2>
<p>The number of air movers and the dehumidification capacity are calculated from the affected cubic footage, the class of water loss (how much material is wet and how absorbent it is), and the materials involved. Under-equipping extends the job and risks microbial growth. Over-equipping runs up an invoice a competent adjuster will question. We size it correctly and the equipment count goes in your documentation.</p>
<h3>Low grain refrigerant dehumidifiers</h3>
<p>LGR units pull water from air at much lower humidity levels than standard refrigerant units, which is what allows a structure to reach a true dry standard rather than merely feeling dry.</p>
<h3>Desiccant dehumidification</h3>
<p>For dense materials, cold conditions and difficult assemblies, desiccants achieve lower vapor pressure than refrigerant units can.</p>
<h3>Specialty systems</h3>
<p>Injection drying pushes dry air into wall cavities through small ports so the assembly dries without opening the wall. Hardwood mat systems pull moisture from flooring and subfloor. Both are how materials get saved instead of demolished.</p>

<h2>Daily monitoring and the dry standard</h2>
<p>Every day, readings are taken from the same marked locations and logged: moisture content of affected materials, temperature, relative humidity and grains per pound of the affected area and of an unaffected control area. The dry standard is the reading from unaffected material of the same type in the same building. Affected materials are dry when they match it &mdash; not when they feel dry, and not when the calendar says four days have passed.</p>
<p>Those logs are what tell your adjuster why equipment was on site for the number of days it was, and they are what tells you the structure is genuinely dry before we close the walls.</p>
""",
    faqs=[
        ("Why does the equipment have to run all night?",
         "<p>Drying works on a continuous gradient. Shutting equipment off overnight lets moisture redistribute through the structure and resets much of the day's progress, extending the total job and increasing microbial risk. It is loud and genuinely disruptive, and it is still the right call.</p>"),
        ("Can I just open the windows instead?",
         "<p>Only if the outside air is drier than the inside air, which in a Dallas summer it very often is not. Opening windows in high outdoor humidity actively adds moisture to the building. Controlled dehumidification does not depend on the weather.</p>"),
        ("How do you know when it is dry?",
         "<p>Moisture content readings from affected materials are compared to a dry standard taken from unaffected material of the same type in the same building. When they match, the structure is dry. Every reading is logged and included in your documentation.</p>"),
        ("What is that smell during drying?",
         "<p>Often it is simply wet building materials, which have a distinct odor that resolves as they dry. If a musty or earthy smell persists or intensifies, that can indicate microbial growth somewhere we have not yet opened, and we will investigate rather than dry over it.</p>"),
    ],
    related=["water-extraction", "water-damage-restoration", "mold-remediation", "burst-pipe-repair"],
)

# ==================================================================== BOARD UP
S["emergency-board-up"] = dict(
    icon="board", fire=True,
    title="Emergency Board-Up &amp; Roof Tarping",
    meta_title="Emergency Board Up Dallas TX | 24/7 Roof Tarping & Property Securing",
    meta_desc="24/7 emergency board-up and roof tarping across DFW. Secure your property after fire, storm, vehicle impact or break-in. Call (708) 506-8917.",
    lede="An open building is a building that keeps getting worse. Board-up and tarping stop weather, animals and intruders from turning one loss into a second one &mdash; and most policies require you to do it.",
    facts=[("Availability", "24/7/365"), ("Typical response", "Same day"),
           ("Covers", "Windows, doors, roof"), ("Policy", "Usually required")],
    signs=[
        "Broken windows or a damaged exterior door",
        "A hole in the roof or missing sections of decking",
        "Fire damage that opened an exterior wall",
        "Vehicle impact to a structure",
        "A break-in that left an opening",
        "A vacant property that needs securing",
    ],
    body="""
<h2>Why this cannot wait until morning</h2>
<p>Three things happen to an open structure. Weather gets in &mdash; and in North Texas the next storm cell is rarely far away, turning a roof repair into a ceiling, insulation, drywall and flooring job. Animals get in, from raccoons and possums to birds and insects, and they do a surprising amount of damage quickly. And people get in, which is both a theft and a liability problem.</p>
<p>There is a fourth reason, and it is the one people find out about late. Nearly every property policy contains a duty to protect the property from further loss after a covered event. Additional damage that occurred because an opening was left unsecured can be excluded from the claim.</p>

<h2>What we do</h2>
<h3>Window and door board-up</h3>
<p>Openings covered with plywood cut to fit and secured to the structure, sized and fastened to hold against wind rather than tacked on.</p>
<h3>Roof tarping</h3>
<p>Heavy-duty reinforced tarp installed over compromised roofing, secured to the deck and lapped to shed water rather than pond it. A tarp that ponds is worse than no tarp.</p>
<h3>Structural openings</h3>
<p>Larger openings from fire, impact or collapse framed and closed to restore the building envelope.</p>
<h3>Temporary fencing and access control</h3>
<p>For significant losses and unoccupied properties where the structure itself cannot be fully secured.</p>
<h3>Documentation</h3>
<p>Photographs of the damage before board-up and of the completed work afterward, so the emergency mitigation is properly recorded on your claim &mdash; these costs are typically reimbursable.</p>

<h2>What comes next</h2>
<p>Board-up buys time; it is not a repair. It holds while the claim is opened, the scope is assessed and permanent work is scheduled. Because we handle mitigation and reconstruction, the same company that secured the property carries it through to the finished repair.</p>
""",
    faqs=[
        ("How fast can you board up my property?",
         "<p>Board-up and tarping are dispatched 24 hours a day, and in most cases we are on site the same day you call, including nights and weekends. Tell us what is open and we will give you a realistic arrival window for your address.</p>"),
        ("Will insurance pay for board-up?",
         "<p>Emergency mitigation to prevent further loss is typically covered, and most policies require it. Keep documentation of the work; we provide before and after photographs and an itemized record for your claim.</p>"),
        ("Can I board it up myself?",
         "<p>You can for a ground-floor window if you have the materials and can do it safely. Roof tarping on a storm-damaged roof is a different matter &mdash; the deck may be compromised, it is usually wet, and a tarp that is not properly secured will blow off or pond water. That one is worth calling for.</p>"),
        ("How long can boards and tarps stay up?",
         "<p>Board-up is stable for extended periods. Tarps are a temporary measure and degrade in sun and wind &mdash; expect a few weeks to a couple of months depending on exposure. If permanent repair is delayed, tarps need inspection and replacement.</p>"),
    ],
    related=["storm-damage-restoration", "fire-damage-restoration", "emergency-cleanup", "renovation"],
)

# ==================================================================== CONTENTS
S["contents-cleaning"] = dict(
    icon="box", fire=False,
    title="Contents Cleaning, Pack-Out &amp; Restoration",
    meta_title="Contents Cleaning & Pack Out Dallas TX | Restoration of Belongings",
    meta_desc="Contents cleaning, pack-out, inventory and secure storage in DFW. Furniture, textiles, electronics, documents and photographs restored after water, fire or smoke damage. Call (708) 506-8917.",
    lede="The structure is replaceable. Much of what is inside it is not. Contents restoration is the part of the job that decides whether you get your things back or get a check for them.",
    facts=[("Inventory", "Itemized &amp; photographed"), ("Storage", "Secure, climate-controlled"),
           ("Methods", "Ultrasonic, laundering, freeze-dry"), ("Claim", "Documented for carrier")],
    signs=[
        "Furniture, clothing or household goods affected by water or smoke",
        "Documents, books or photographs that got wet",
        "Electronics exposed to soot or water",
        "A property too damaged to work around with contents in place",
        "Contents that need to leave during demolition and rebuild",
    ],
    body="""
<h2>Restore or replace &mdash; and who decides</h2>
<p>Insurance adjusters weigh the cost of restoring an item against the cost of replacing it. That maths works in your favor more often than people expect, because professional restoration is frequently cheaper than replacement &mdash; and because replacement value does not account for the things that cannot be bought again. A dining table from a grandparent and a comparable table from a store are not the same object.</p>
<p>Our job is to establish which items are restorable, document the ones that are not, and give you and your adjuster an accurate picture instead of a blanket write-off.</p>

<h2>How pack-out works</h2>
<p>Every item is photographed and entered on an itemized inventory before it moves, with condition noted. Items are barcoded or tagged, packed by room, transported and stored in a secure climate-controlled facility. Restorable items are cleaned off site while the property is repaired. When the structure is finished, everything is moved back and placed by room.</p>
<p>Pack-out makes sense when the affected area is too large to work around, when contents need methods that cannot be performed on site, or when demolition would expose belongings to further damage.</p>

<h2>Methods by material</h2>
<ul>
<li><strong>Hard contents</strong> &mdash; ultrasonic cleaning uses high-frequency cavitation to lift residue from detailed and hard-to-reach surfaces. Effective on kitchenware, tools, fixtures, toys and decorative items.</li>
<li><strong>Textiles and soft goods</strong> &mdash; specialized laundering and dry cleaning with deodorization, which is different from a home wash cycle and recovers a great deal of what looks lost.</li>
<li><strong>Upholstery and rugs</strong> &mdash; deep extraction, controlled drying and odor treatment; area rugs are usually handled off site.</li>
<li><strong>Electronics</strong> &mdash; corrosion-focused cleaning before anything is powered on. Soot residue is conductive and acidic, and applying current accelerates the damage.</li>
<li><strong>Documents and photographs</strong> &mdash; freeze-drying arrests deterioration and allows recovery of paper items that would otherwise be lost, provided they are stabilized quickly.</li>
<li><strong>Art, instruments and specialty items</strong> &mdash; referred to appropriate conservators rather than treated as general contents.</li>
</ul>

<h2>Documentation for your personal property claim</h2>
<p>Your contents claim is settled off an inventory. A vague list produces a vague settlement. We provide itemized documentation with photographs, condition notes and disposition for every item, which is the difference between recovering what your belongings were actually worth and accepting an estimate.</p>
""",
    faqs=[
        ("Can smoke-damaged clothing really be saved?",
         "<p>Usually, yes. Specialized laundering with the right deodorizing agents recovers most textiles, including items that smell unsalvageable. Ordinary home washing typically sets the odor rather than removing it, so do not run them through your machine first.</p>"),
        ("What happens to items that cannot be restored?",
         "<p>They are photographed, itemized with description and condition, and included in your documentation before disposal, so your personal property claim reflects them accurately. Nothing is discarded without being recorded.</p>"),
        ("How long will my belongings be in storage?",
         "<p>As long as the structural repair takes, typically a few weeks to a few months depending on scope. Storage is secure and climate-controlled, and you can request access to specific items.</p>"),
        ("Should I try to clean things myself first?",
         "<p>Please do not, particularly with soot. Wiping smoke residue usually drives it into the surface and makes professional restoration harder or impossible. Photograph everything and leave it alone until it has been assessed.</p>"),
    ],
    related=["fire-damage-restoration", "smoke-damage-cleanup", "storage-and-moving", "odor-removal"],
)

# ==================================================================== ODOR
S["odor-removal"] = dict(
    icon="sparkle", fire=False,
    title="Odor Removal &amp; Deodorization",
    meta_title="Odor Removal Dallas TX | Smoke, Mold & Pet Odor Elimination",
    meta_desc="Professional odor removal in DFW. Smoke, musty, sewage and pet odor eliminated at the source with HEPA filtration, hydroxyl and ozone treatment. Call (708) 506-8917.",
    lede="Odor is a physical thing &mdash; particles and compounds sitting on and inside materials. Anything that treats the air without addressing the source buys a few weeks. We remove the source.",
    facts=[("Approach", "Source removal first"), ("Equipment", "Hydroxyl &amp; ozone"),
           ("HVAC", "Always addressed"), ("Result", "Permanent, not masked")],
    signs=[
        "Smoke smell that returns when the HVAC runs",
        "A musty odor that appeared after a leak",
        "Lingering sewage or organic odor after a backup",
        "Pet odor absorbed into flooring or subfloor",
        "Cooking or protein odor that will not clear after a kitchen fire",
        "Odor in a property that has been vacant or closed up",
    ],
    body="""
<h2>Why air fresheners and ozone alone fail</h2>
<p>Odor molecules originate from a physical source: soot residue, microbial growth, decomposed organic material, urine salts. Masking agents add a second smell on top. Ozone and hydroxyl treatment neutralize odor compounds in the air and on exposed surfaces &mdash; genuinely useful, but only as a final step. Run over an untreated source, the source keeps producing and the smell comes back in a few weeks. That gap is why so many people conclude "the smell can't be removed." It can; it just has to be done in the right order.</p>

<h2>The sequence</h2>
<ol>
<li><strong>Find the source.</strong> Moisture meters, thermal imaging, UV inspection for organic contamination, and physical inspection of cavities, subfloor and duct runs.</li>
<li><strong>Remove what holds it.</strong> Porous materials that have absorbed odor &mdash; carpet, pad, contaminated insulation, affected drywall, in severe cases subfloor.</li>
<li><strong>Clean every affected surface</strong> with the method appropriate to the contaminant.</li>
<li><strong>Decontaminate the HVAC system.</strong> Ducts, coil and blower, because the system stores and redistributes odor with every cycle.</li>
<li><strong>Seal where required.</strong> Shellac-based sealers lock in residual odor in framing and subfloor that cannot be removed.</li>
<li><strong>Treat the air.</strong> Hydroxyl generators work safely in occupied spaces over a longer period; ozone works faster and more aggressively but requires the space to be unoccupied, including pets and plants. Thermal fogging can reach voids that other methods cannot.</li>
</ol>

<h2>Odor types we handle</h2>
<ul>
<li><strong>Smoke and fire</strong> &mdash; residue-driven, requires physical removal, duct cleaning and usually sealing.</li>
<li><strong>Musty and mold odor</strong> &mdash; a symptom of active growth or damp materials. Deodorizing without remediation is treating the alarm instead of the fire.</li>
<li><strong>Sewage and organic</strong> &mdash; bacterial. Requires removal of contaminated porous material, disinfection, then air treatment.</li>
<li><strong>Pet odor</strong> &mdash; urine salts penetrate carpet, pad, subfloor and even concrete slab, and reactivate with humidity. Frequently requires enzyme treatment and sealing at the subfloor level.</li>
<li><strong>Vacancy odor</strong> &mdash; stagnant air, dry P-traps and dust, usually resolved with ventilation, cleaning and HVAC servicing.</li>
</ul>
""",
    faqs=[
        ("Is ozone treatment safe?",
         "<p>Ozone is effective but must be used in an unoccupied space &mdash; people, pets and plants out &mdash; followed by a ventilation period before reoccupancy. Where a property must stay occupied, hydroxyl generators are the safer option and work over a longer treatment window.</p>"),
        ("How long does odor removal take?",
         "<p>Source removal and cleaning is typically one to three days depending on scope, followed by 24 to 72 hours of air treatment. Severe smoke and sewage jobs run longer, particularly where sealing is required.</p>"),
        ("Will the odor come back?",
         "<p>Not when the source has been removed. Odor recurs when treatment was applied over untreated residue or ongoing moisture &mdash; which is why we do not treat the air until the source is gone.</p>"),
        ("Can pet urine odor be removed from concrete?",
         "<p>Usually, yes. Urine salts penetrate porous concrete and reactivate with humidity, so it takes enzyme treatment, sometimes grinding, and a sealer. It is more involved than carpet, but it is not a lost cause.</p>"),
    ],
    related=["smoke-damage-cleanup", "fire-damage-restoration", "mold-remediation", "contents-cleaning"],
)

# ==================================================================== BIOHAZARD
S["biohazard-cleanup"] = dict(
    icon="bio", fire=True,
    title="Biohazard &amp; Trauma Cleanup",
    meta_title="Biohazard Cleanup Dallas TX | Trauma & Hoarding Remediation | Discreet",
    meta_desc="Discreet, compliant biohazard and trauma scene cleanup in DFW. Bloodborne pathogen protocols, unattended death, hoarding remediation. Call (708) 506-8917.",
    lede="These are the jobs nobody plans for. They are handled discreetly, with proper containment and regulated disposal, by people who understand that there is usually a family standing on the other side of the door.",
    facts=[("Availability", "24/7"), ("Standard", "OSHA bloodborne pathogen"),
           ("Disposal", "Regulated medical waste"), ("Approach", "Discreet, unmarked")],
    signs=[
        "An unattended death or trauma scene",
        "Blood or bodily fluid contamination",
        "Hoarding conditions requiring remediation",
        "Animal waste accumulation",
        "Contaminated property requiring regulated disposal",
        "Infectious disease decontamination",
    ],
    body="""
<h2>How these jobs are handled</h2>
<p>Biohazard remediation is governed by OSHA bloodborne pathogen standards and by regulations covering the transport and disposal of regulated medical waste. It is not cleaning. It requires containment, appropriate PPE, EPA-registered hospital-grade disinfectants, removal of porous materials that cannot be decontaminated, verification, and documented disposal through a licensed handler.</p>
<p>It also requires judgment about what does not need to be seen. We arrive in unmarked vehicles where you prefer, we do not discuss the job with neighbors, and we work with funeral homes, property managers, law enforcement and insurance carriers as needed so you are not coordinating any of it.</p>

<h2>Services</h2>
<h3>Unattended death and decomposition</h3>
<p>Decomposition affects flooring, subfloor, framing and the HVAC system, and odor penetrates materials well beyond the visible area. Remediation involves removal of affected materials, decontamination, structural treatment and thorough deodorization.</p>
<h3>Trauma and accident scenes</h3>
<p>Full decontamination after law enforcement has released the scene, with regulated disposal of contaminated materials.</p>
<h3>Hoarding remediation</h3>
<p>Sorting, removal, decontamination and restoration, handled at a pace the person and family can manage. Valuables and documents are separated and returned rather than discarded. These are almost never only a cleaning problem, and we work with families and case workers rather than around them.</p>
<h3>Animal waste and infestation cleanup</h3>
<p>Removal and decontamination of accumulated waste, which carries genuine pathogen risk including hantavirus and histoplasmosis.</p>
<h3>Infectious disease decontamination</h3>
<p>Hospital-grade disinfection of residential and commercial spaces following protocol.</p>

<h2>Do not attempt this yourself</h2>
<p>Beyond the health risk from bloodborne pathogens and airborne contaminants, household products do not disinfect at the required level, contaminated waste cannot legally be put in ordinary trash in Texas, and porous materials that look cleanable usually are not. There is also a practical reason: no one should have to do this in their own home, for someone they knew.</p>
""",
    faqs=[
        ("Is biohazard cleanup covered by insurance?",
         "<p>Frequently, yes. Many homeowners policies cover trauma and unattended death remediation, and in Texas the Crime Victims' Compensation Program may assist in qualifying cases. We will help you determine what applies and document the work accordingly.</p>"),
        ("How quickly can you respond?",
         "<p>24 hours a day. With decomposition in particular, response time directly affects how far contamination and odor penetrate the structure, so these calls are prioritized.</p>"),
        ("Will my neighbors know?",
         "<p>Not from us. We can arrive in unmarked vehicles, we do not discuss the work on site, and we handle the job as discreetly as the property allows.</p>"),
        ("Do you work with hoarding situations compassionately?",
         "<p>Yes. Hoarding is a mental health condition, not a cleaning failure. We work at a pace the person and family can handle, separate valuables and documents rather than discarding indiscriminately, and coordinate with family members or case workers where that helps.</p>"),
    ],
    related=["emergency-cleanup", "odor-removal", "junk-removal", "flood-cleanup"],
)

# ==================================================================== EMERGENCY CLEANUP
S["emergency-cleanup"] = dict(
    icon="zap", fire=True,
    title="24/7 Emergency Cleanup Services",
    meta_title="Emergency Cleanup Dallas TX | 24/7 Rapid Response Crews",
    meta_desc="24/7 emergency cleanup across Dallas-Fort Worth. Water, fire, storm, vehicle impact and vandalism response with immediate stabilization. Call (708) 506-8917.",
    lede="Something happened and the property is not safe, not secure or not usable. Call and a crew is routed &mdash; stabilization first, assessment second, scope third.",
    facts=[("Line answered", "24/7/365"), ("First priority", "Make it safe"),
           ("Second", "Stop further damage"), ("Then", "Full assessment")],
    signs=[
        "Any sudden event that has made a property unsafe or unusable",
        "Water, fire, storm or impact damage requiring immediate response",
        "Vandalism or break-in damage",
        "A commercial property that cannot open in the morning",
        "You are not sure who to call and you need someone now",
    ],
    body="""
<h2>What emergency response actually looks like</h2>
<p>Emergencies do not sort themselves neatly into service categories. A vehicle into a building is structural, glass, water and debris at once. A vandalism call may be glass, graffiti and biohazard. A commercial water loss at 4am is a mitigation job with a business-interruption clock attached. Emergency response means arriving, making the property safe, stopping further damage, and then determining the actual scope &mdash; rather than requiring you to diagnose it correctly over the phone first.</p>

<h3>Stabilize</h3>
<p>Address immediate hazards: electrical, structural, standing water, contamination, open envelope.</p>
<h3>Contain</h3>
<p>Stop the loss from growing. Shut off water, board up openings, tarp the roof, isolate contaminated areas, protect unaffected parts of the property.</p>
<h3>Assess</h3>
<p>Full walkthrough with moisture mapping and photo documentation, so the scope is based on measurement rather than appearance.</p>
<h3>Execute</h3>
<p>Mitigation, cleaning and reconstruction through to completion, with one point of contact throughout.</p>

<h2>Commercial emergencies</h2>
<p>For a business, downtime is frequently a larger loss than the physical damage. We scope commercial jobs around continuity: after-hours and overnight work, phased areas so part of the operation keeps running, temporary containment that lets customers or staff use unaffected space, and documentation that supports business interruption coverage as well as property coverage.</p>

<h2>What to do while you wait</h2>
<ul>
<li>Get people out of any unsafe area and keep them out.</li>
<li>Shut off water or power at the source only if you can do it safely.</li>
<li>Do not enter a fire-damaged structure until the fire department has cleared it.</li>
<li>Photograph everything, from wide shots to close-ups, before anything is moved.</li>
<li>Do not throw anything away &mdash; damaged property is claim evidence.</li>
<li>Notify your insurance carrier and open the claim; details can follow.</li>
</ul>
""",
    faqs=[
        ("What counts as an emergency?",
         "<p>Anything that has made the property unsafe, unsecured or unusable, or that will get worse if it waits. Active water, fire damage, an open building envelope, contamination and structural damage all qualify. If you are unsure, call &mdash; we would rather talk you through a small problem than meet you after it grew.</p>"),
        ("Do you charge more at night or on weekends?",
         "<p>Emergency response is what we do; nights and weekends are when most losses happen. We will be clear about pricing before work begins, and for covered losses the cost typically goes to your claim.</p>"),
        ("What if I do not know what kind of damage I have?",
         "<p>That is normal and it is our job, not yours. Describe what you are seeing and we will route the right crew and equipment. Assessment on arrival determines the actual scope.</p>"),
    ],
    related=["water-damage-restoration", "fire-damage-restoration", "emergency-board-up", "storm-damage-restoration"],
)

# ==================================================================== JUNK REMOVAL
S["junk-removal"] = dict(
    icon="truck", fire=False,
    title="Junk Removal &amp; Debris Haul-Off",
    meta_title="Junk Removal Dallas TX | Debris Haul Off, Cleanouts & Demo Debris",
    meta_desc="Junk removal and debris haul-off across Dallas-Fort Worth. Furniture, appliances, demolition debris, garage and estate cleanouts. Same-day availability. Call (708) 506-8917.",
    lede="Ruined furniture, demolition debris, a garage that has not been usable in years, or an entire property that needs clearing. We load it, haul it and dispose of it properly &mdash; you do not lift anything.",
    facts=[("Scheduling", "Same-day available"), ("Labor", "Full-service loading"),
           ("Disposal", "Sorted &amp; documented"), ("Access", "Anywhere on property")],
    signs=[
        "Furniture, mattresses or appliances that need to go",
        "Demolition or construction debris after a project",
        "A garage, attic, shed or storage unit that needs clearing",
        "An estate or full property cleanout",
        "Storm debris, fencing or fallen limbs",
        "A rental turnover or eviction cleanout",
        "Water- or fire-damaged contents that have been documented and need removal",
    ],
    body="""
<h2>Full-service means we do the lifting</h2>
<p>This is not a dumpster drop-off. You point at what goes, our crew carries it out &mdash; from a third-floor apartment, the back of a garage, a cluttered attic or a fenced back yard. No permit for a driveway container, no week of it sitting out front, no filling it yourself.</p>

<h2>What we take</h2>
<ul>
<li><strong>Furniture and mattresses</strong> &mdash; sofas, beds, tables, desks, office furniture, cubicles.</li>
<li><strong>Appliances</strong> &mdash; refrigerators, washers, dryers, ranges, water heaters, HVAC units.</li>
<li><strong>Construction and demolition debris</strong> &mdash; drywall, lumber, flooring, cabinetry, fixtures, tile.</li>
<li><strong>Yard and storm debris</strong> &mdash; branches, fencing, sheds, landscaping material.</li>
<li><strong>Electronics</strong> &mdash; TVs, computers, monitors, printers, routed to appropriate recycling.</li>
<li><strong>General household clutter</strong> &mdash; boxes, clothing, toys, books, accumulated storage.</li>
<li><strong>Hot tubs, play structures, above-ground pools</strong> &mdash; disassembled and hauled.</li>
</ul>
<p>We cannot take hazardous materials &mdash; paint, solvents, fuel, asbestos, pesticides, medical waste. Tell us what you have and we will point you to the right disposal route.</p>

<h2>Common jobs</h2>
<h3>Post-restoration debris</h3>
<p>Water and fire jobs produce a large volume of material: saturated carpet and pad, removed drywall and insulation, ruined furniture. It is documented for the claim first, then removed &mdash; which is part of why having one company handle both is simpler than coordinating a hauler around a restoration schedule.</p>
<h3>Estate and probate cleanouts</h3>
<p>Usually happening under time pressure and emotional strain. We work at your pace, set aside anything you flag, and clear the rest.</p>
<h3>Rental turnovers and evictions</h3>
<p>Fast turnarounds for property managers and landlords who need the unit rentable by a date.</p>
<h3>Garage, attic and storage cleanouts</h3>
<p>The recurring project that never gets done, finished in an afternoon.</p>
<h3>Commercial and office cleanouts</h3>
<p>Office furniture, fixtures and equipment during a move, downsize or renovation, scheduled after hours when needed.</p>

<h2>Disposal, done properly</h2>
<p>Loads are sorted rather than sent straight to landfill. Metals go to recycling, electronics go to certified e-waste processing, usable furniture and household goods are routed to donation where appropriate, and construction debris goes to facilities that recycle what they can. It costs a little more effort and it is the right way to do it.</p>
""",
    faqs=[
        ("How is pricing calculated?",
         "<p>By volume &mdash; how much space the load takes in the truck &mdash; with adjustments for weight-heavy material such as concrete or tile, and for difficult access. We give you a firm price on site before we load anything, with no obligation.</p>"),
        ("Do I need to move things to the curb?",
         "<p>No. Full-service means our crew removes items from wherever they are: upstairs, in the back of a garage, in the attic, in the yard. That is the point of the service.</p>"),
        ("Can you come today?",
         "<p>Often, yes. Same-day and next-day slots are usually available, and we can generally accommodate urgent turnovers and post-restoration debris removal on short notice.</p>"),
        ("What happens to everything you take?",
         "<p>Loads are sorted. Metal is recycled, electronics go to certified e-waste handlers, usable goods are donated where appropriate, and only what genuinely cannot be diverted goes to landfill.</p>"),
    ],
    related=["renovation", "emergency-cleanup", "storage-and-moving", "biohazard-cleanup"],
)

# ==================================================================== RENOVATION
S["renovation"] = dict(
    icon="hammer", fire=True,
    title="Renovation &amp; Reconstruction",
    meta_title="Renovation & Rebuild Dallas TX | Post-Restoration Reconstruction",
    meta_desc="Full renovation and reconstruction across DFW. Post-restoration rebuild, kitchens, bathrooms, flooring, drywall and paint. One contractor from mitigation to final walkthrough. Call (708) 506-8917.",
    lede="Most restoration companies dry the property and hand you a list of contractors. We finish the job &mdash; drywall, flooring, cabinetry, trim and paint &mdash; so there is no gap between the crew that took it out and the crew that puts it back.",
    facts=[("Scope", "Mitigation through finish"), ("Contract", "Single point of contact"),
           ("Insurance", "Scoped to the claim"), ("Also", "Non-loss remodels")],
    signs=[
        "A restoration job that is dry but not repaired",
        "Fire or water damage requiring a full rebuild",
        "A kitchen or bathroom that needs replacing after a loss",
        "Flooring, drywall and paint work across multiple rooms",
        "A remodel you were planning anyway, made easier by work already underway",
    ],
    body="""
<h2>The handoff problem</h2>
<p>The most common failure point in a restoration project is not the drying and it is not the rebuild. It is the seam between them.</p>
<p>A mitigation company removes materials and leaves. You are handed a list and told to find a contractor. That contractor did not see what was behind the wall, is working from someone else's scope, and has no reason to agree with it. Your adjuster now has two parties describing the same job differently. Meanwhile you are living in a house with open walls waiting for a bid.</p>
<p>Carrying both halves eliminates that seam. Tear-out is scoped with the rebuild in mind, one scope goes to the adjuster, and the timeline does not stall while a second contractor is sourced.</p>

<h2>What we rebuild</h2>
<ul>
<li><strong>Framing and structural repair</strong> &mdash; studs, joists, subfloor and decking.</li>
<li><strong>Insulation, drywall and texture</strong> &mdash; including matching existing texture, which is the detail that determines whether a repair reads as a repair.</li>
<li><strong>Flooring</strong> &mdash; hardwood repair and refinishing, LVP, tile, laminate and carpet.</li>
<li><strong>Kitchens</strong> &mdash; cabinetry, countertops, backsplash, plumbing and appliance reconnection.</li>
<li><strong>Bathrooms</strong> &mdash; vanities, tile, shower and tub surrounds, fixtures and waterproofing done properly.</li>
<li><strong>Interior finishes</strong> &mdash; trim, baseboards, crown, doors, hardware and paint.</li>
<li><strong>Exterior</strong> &mdash; siding, soffit, fascia, decking and fencing.</li>
<li><strong>Systems coordination</strong> &mdash; licensed electrical, plumbing and HVAC subcontractors where the scope requires it.</li>
</ul>

<h2>Rebuilding to a claim</h2>
<p>Insurance reconstruction is a specific discipline. The scope has to be written in line-item format the carrier's estimating software recognizes, matching materials and finishes have to be justified, and supplements have to be documented when hidden damage appears once walls are open &mdash; which happens on most jobs. We handle that documentation rather than asking you to argue it.</p>
<p>One point worth knowing: many policies include ordinance or law coverage, which pays for bringing affected areas up to current building code even where the original construction was compliant when built. On older DFW homes this comes up regularly with electrical and plumbing, and it is frequently overlooked.</p>

<h2>Renovations that are not insurance jobs</h2>
<p>We also take on straightforward remodels &mdash; a kitchen, a bathroom, flooring throughout, a whole-house refresh before a sale. And when a loss has already opened a wall, it is often the most economical moment to make a change you were planning anyway. We will tell you plainly what falls inside the claim scope and what is a betterment you are paying for, because that line has to be clear before work starts.</p>
""",
    faqs=[
        ("Can you do the rebuild if another company did the mitigation?",
         "<p>Yes. We will review their documentation, assess the current condition, verify the structure is genuinely dry before we close anything up, and scope the reconstruction from there.</p>"),
        ("How long does a rebuild take?",
         "<p>Single-room repairs run one to three weeks. Multi-room and kitchen or bath work typically runs four to eight weeks. Major fire rebuilds run several months. Material lead times and permit timelines drive more of the schedule than labor does, and we will give you a realistic sequence up front.</p>"),
        ("Can I upgrade finishes during the rebuild?",
         "<p>Yes, and it is often the smartest time to do it since the demolition is already done. Your policy covers restoration to pre-loss condition; upgrades beyond that are a betterment you fund. We will separate those line items clearly so there is no confusion at invoicing.</p>"),
        ("Do you pull permits?",
         "<p>Yes, where the scope requires them. Permitting varies across DFW municipalities and we handle the process for the jurisdiction your property sits in.</p>"),
    ],
    related=["water-damage-restoration", "fire-damage-restoration", "junk-removal", "residential-restoration"],
)

# ==================================================================== STORAGE
S["storage-and-moving"] = dict(
    icon="box", fire=False,
    title="Storage &amp; Moving Services",
    meta_title="Storage & Moving Dallas TX | Pack Out, Secure Storage & Move Back",
    meta_desc="Pack-out, inventoried secure storage and move-back services in DFW. Climate-controlled storage during restoration and reconstruction. Call (708) 506-8917.",
    lede="When the work is bigger than the room, contents have to leave. We pack out with a written inventory, store securely, and put everything back where it belongs when the property is finished.",
    facts=[("Inventory", "Itemized &amp; photographed"), ("Facility", "Secure, climate-controlled"),
           ("Includes", "Move-out and move-back"), ("Also", "Standard moving jobs")],
    signs=[
        "A restoration or renovation too large to work around",
        "Contents that need to leave during demolition",
        "Belongings requiring off-site cleaning",
        "A property that is temporarily uninhabitable",
        "A standard household or office move",
    ],
    body="""
<h2>Pack-out, storage, move-back</h2>
<p>Every item is photographed and listed on an itemized inventory with condition noted before it leaves the property. Items are tagged and packed by room so the move-back is orderly rather than a pile in a garage. Transport, secure climate-controlled storage, and placement back by room when the structure is complete.</p>
<p>The inventory is not administrative overhead. It is the record your insurance carrier settles the contents portion of your claim against, and it is how you know what you own when everything is in a warehouse.</p>

<h2>When pack-out is the right call</h2>
<ul>
<li>The affected area is too large to move contents around within the property.</li>
<li>Demolition or heavy equipment would expose belongings to further damage.</li>
<li>Contents need cleaning that cannot be performed on site.</li>
<li>The property is uninhabitable during the work.</li>
<li>Smoke or contamination requires everything to be treated off site.</li>
</ul>
<p>Partial pack-outs are common too &mdash; moving contents from two affected rooms while the rest of the house stays as it is.</p>

<h2>Storage</h2>
<p>Climate-controlled and secured, which matters in Texas: an uncooled unit in August will damage wood furniture, electronics, documents and photographs on its own. Inventory records are maintained throughout and you can request access to specific items while they are in storage.</p>

<h2>Standard moving</h2>
<p>We also handle ordinary moves &mdash; households, apartments and offices, local within DFW. Same crews, same care with inventory and protection, without a restoration attached.</p>
""",
    faqs=[
        ("Will insurance pay for pack-out and storage?",
         "<p>In most covered losses, yes. Pack-out, storage and move-back are standard components of a restoration claim when the property is not workable with contents in place. We document the necessity and the itemized costs for your carrier.</p>"),
        ("Can I get to my belongings while they are stored?",
         "<p>Yes. Because everything is inventoried and tagged by room, we can locate specific items and arrange access. Give us some notice so the item can be pulled before you arrive.</p>"),
        ("What if something is damaged during the move?",
         "<p>We are insured, and the pre-move inventory with photographs and condition notes exists precisely so there is a clear record of how each item arrived. Anything damaged in our care is our responsibility.</p>"),
        ("Do you move everything, or only affected items?",
         "<p>Whatever the job requires. Partial pack-outs limited to affected rooms are very common. We will recommend the scope that makes sense and you decide.</p>"),
    ],
    related=["contents-cleaning", "junk-removal", "renovation", "fire-damage-restoration"],
)

# ==================================================================== COMMERCIAL
S["commercial-restoration"] = dict(
    icon="building", fire=False,
    title="Commercial Restoration Services",
    meta_title="Commercial Restoration Dallas TX | Business Water, Fire & Storm Damage",
    meta_desc="Commercial restoration across DFW. Retail, office, restaurant, warehouse and multi-family. After-hours and phased work to keep you operating. Call (708) 506-8917.",
    lede="For a business, downtime usually costs more than the damage. Commercial restoration is scoped around keeping you operating &mdash; phased areas, after-hours work, and documentation that supports business interruption coverage as well as property.",
    facts=[("Response", "24/7"), ("Scheduling", "After-hours available"),
           ("Approach", "Phased to keep you open"), ("Docs", "BI &amp; property support")],
    signs=[
        "Water, fire or storm damage to a commercial property",
        "A sprinkler discharge or plumbing failure",
        "Damage that will prevent you opening tomorrow",
        "Multi-family or HOA property damage affecting residents",
        "A tenant space that needs turning around fast",
        "A property manager needing one vendor across a portfolio",
    ],
    body="""
<h2>Property types we work in</h2>
<ul>
<li><strong>Retail</strong> &mdash; storefronts, shopping centers and strip retail, where a closed door is lost revenue every hour.</li>
<li><strong>Office</strong> &mdash; single suites through multi-floor, including server rooms and document recovery.</li>
<li><strong>Restaurants and food service</strong> &mdash; kitchen fires, grease and hood incidents, walk-in failures, with health department requirements in play.</li>
<li><strong>Multi-family and HOA</strong> &mdash; apartments, condos and townhomes, where a single unit's loss usually affects several others and coordination with residents matters as much as the work.</li>
<li><strong>Warehouse and industrial</strong> &mdash; large-footprint drying, inventory protection and dock-area work.</li>
<li><strong>Medical and professional</strong> &mdash; environments with additional sanitation and compliance requirements.</li>
<li><strong>Hospitality</strong> &mdash; floor-by-floor and wing-by-wing work so rooms keep selling.</li>
</ul>

<h2>Scoped for continuity</h2>
<p>Commercial work is planned around your operation, not the other way around. That means overnight and weekend scheduling, phasing so unaffected areas keep running, temporary containment and walkways that let customers and staff move safely around the work, and clear communication to tenants or residents so we are not creating a second problem for your front desk.</p>

<h2>Documentation for two kinds of coverage</h2>
<p>Commercial policies typically carry both property coverage and business interruption coverage, and BI claims are settled on evidence of how long the interruption lasted and why. We provide dated documentation of conditions, daily progress records, drying logs, equipment counts and completion timelines &mdash; the record that supports the BI portion, not just the repair invoice.</p>

<h2>Property managers and portfolios</h2>
<p>If you manage multiple properties, having one vendor with your building details, access procedures, insurance contacts and preferred finishes on file removes a great deal of friction at 2am. We are happy to set that up in advance rather than at the moment of a loss.</p>
""",
    faqs=[
        ("Can you work outside our business hours?",
         "<p>Yes. Overnight, weekend and phased scheduling is standard on commercial jobs, because for most businesses the disruption costs more than the repair.</p>"),
        ("Do you handle multi-family and HOA properties?",
         "<p>Yes &mdash; apartments, condos and townhome communities. These jobs almost always involve multiple units and several parties, and we coordinate between owners, management, residents and carriers so the communication does not fall on your office.</p>"),
        ("How do you support a business interruption claim?",
         "<p>With dated documentation of conditions, daily progress and drying records, equipment logs and completion timelines. BI claims turn on establishing the duration and cause of the interruption, which requires a contemporaneous record rather than an after-the-fact summary.</p>"),
        ("Can you set up a preferred vendor agreement?",
         "<p>Yes. We can hold building details, access procedures, contacts and preferred finishes on file so that a loss at 2am starts with a crew rolling rather than with twenty minutes of questions.</p>"),
    ],
    related=["water-damage-restoration", "fire-damage-restoration", "emergency-cleanup", "renovation"],
)

# ==================================================================== RESIDENTIAL
S["residential-restoration"] = dict(
    icon="home", fire=False,
    title="Residential Restoration Services",
    meta_title="Residential Restoration Dallas TX | Home Water, Fire & Mold Damage",
    meta_desc="Residential restoration across Dallas-Fort Worth. Water, fire, smoke, mold and storm damage in homes, with full rebuild and insurance claim support. Call (708) 506-8917.",
    lede="It is your house, not a job site. Residential work means clear communication, respect for the property, and a straight answer about how long you will be living around the work.",
    facts=[("Coverage", "29 DFW cities"), ("Scope", "Mitigation to rebuild"),
           ("Contact", "One project lead"), ("Insurance", "Fully documented")],
    signs=[
        "Any water, fire, smoke, mold or storm damage in a home",
        "A loss where you do not know what to do next",
        "Damage requiring both mitigation and rebuild",
        "A situation where you need to know if it is safe to stay",
    ],
    body="""
<h2>What is different about working in someone's home</h2>
<p>The technical work is the same. Everything around it is not. In a house there are children, pets, work schedules, a kitchen someone needs to use tonight and belongings that matter for reasons no inventory captures. Residential restoration done well means treating the property as occupied space rather than a job site: floor protection and containment, clear daily communication about what is happening and when, equipment placed to minimize disruption where that does not compromise the drying, and a straight answer to the question everyone asks first &mdash; can we stay here?</p>

<h2>What we handle in homes</h2>
<ul>
<li>Water damage from burst pipes, water heaters, appliances, slab leaks and roof intrusion</li>
<li>Fire and smoke damage, including board-up, soot removal and odor elimination</li>
<li>Mold inspection, containment and remediation</li>
<li>Storm, hail and wind damage with emergency tarping</li>
<li>Flood and sewage backup cleanup</li>
<li>Contents cleaning, pack-out and storage</li>
<li>Junk removal and debris haul-off</li>
<li>Full reconstruction through final paint</li>
</ul>

<h2>Can you stay in the house?</h2>
<p>Usually the answer is yes when the loss is contained to one area, the kitchen and at least one bathroom are usable, there is no contamination or significant mold, and power and HVAC are functioning. The answer tends toward no when the affected area includes the only bathroom or the kitchen, when there is Category 3 water or significant mold, when structural safety is in question, or when someone in the household has a respiratory condition that the work would aggravate.</p>
<p>We will give you that assessment early rather than at 9pm on the first night, so you can make arrangements. If you do need to relocate, your policy's additional living expense coverage typically reimburses the difference between your normal costs and what you are spending &mdash; keep every receipt.</p>

<h2>One project lead</h2>
<p>You get a single person who knows your job, coordinates the crews and the adjuster, and answers when you call. Not a dispatcher, not a different technician each morning who has to be told the history again.</p>
""",
    faqs=[
        ("Can I stay in my home during restoration?",
         "<p>Often, yes &mdash; particularly when the loss is contained and the kitchen and a bathroom remain usable. It becomes impractical with Category 3 water, significant mold, structural concerns, or when the affected area includes the only bathroom. We will tell you at the assessment so you can plan.</p>"),
        ("What about my pets?",
         "<p>Tell us at the first call. Equipment is loud, doors are open during work and there may be materials pets should not be around. We will work with you on containment and timing, and in some cases boarding is the kinder option &mdash; which additional living expense coverage may reimburse.</p>"),
        ("How disruptive is the equipment?",
         "<p>Honestly, quite. Air movers and dehumidifiers are loud, they run continuously including overnight, and they raise the temperature in the affected area. It is the least pleasant part of the process and it is what keeps a drying job from becoming a demolition job.</p>"),
        ("Who will I be dealing with day to day?",
         "<p>One project lead who knows your job and coordinates everything, including communication with your adjuster. You should not have to re-explain your situation to a new person each morning.</p>"),
    ],
    related=["water-damage-restoration", "mold-remediation", "renovation", "contents-cleaning"],
)
