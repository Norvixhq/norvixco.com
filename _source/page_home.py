# -*- coding: utf-8 -*-
from lib import *

TITLE = "24/7 Emergency Restoration in Dallas-Fort Worth | Rapid Response Restoration"
DESC = ("Water, fire, smoke, mold and storm damage restoration across Dallas-Fort Worth. "
        "Live 24/7 emergency line, licensed and insured crews, insurance claim support. "
        "Call (708) 506-8917.")
URL = "/"

SERVICE_CARDS = [
    ("water-damage-restoration", "drop", False, "Water Damage Restoration",
     "Burst pipes, failed water heaters, overflowing appliances and slab leaks. We extract standing water, pull moisture out of the structure and document every reading for your claim."),
    ("fire-damage-restoration", "fire", True, "Fire &amp; Smoke Damage",
     "Board-up, soot and char removal, smoke odor neutralization and structural cleaning &mdash; then the rebuild that makes the house feel like yours again."),
    ("mold-remediation", "mold", False, "Mold Remediation",
     "Containment, HEPA filtration and safe removal of affected materials, followed by the moisture correction that keeps mold from returning."),
    ("storm-damage-restoration", "wind", True, "Storm &amp; Wind Damage",
     "North Texas hail, straight-line winds and roof failures. Emergency tarping and board-up first, water mitigation second, full repair third."),
    ("flood-cleanup", "drop", False, "Flood Cleanup",
     "Rising water, sewer backups and category 3 contamination handled with the right PPE, antimicrobials and disposal &mdash; not a shop vac and a fan."),
    ("junk-removal", "truck", False, "Junk Removal &amp; Haul-Off",
     "Ruined furniture, demo debris, garage cleanouts and estate clear-outs. Loaded, hauled and disposed of so the property is workable again."),
    ("renovation", "hammer", True, "Renovation &amp; Rebuild",
     "Drywall, flooring, cabinetry, paint and trim. One company from the first wet-vac to the final walkthrough, so nothing falls between contractors."),
    ("storage-and-moving", "box", False, "Storage &amp; Moving",
     "Pack-out, inventory and secure storage for contents that need to leave the property while the work happens &mdash; then moved back in when it is done."),
]

WHY = [
    ("clock", "Answered 24/7, by a person",
     "No answering service, no callback queue. Nights, weekends and holidays included, because that is when pipes actually fail."),
    ("map", "Dispatched from inside DFW",
     "We are based on Topline Drive in Dallas and cover 29 cities across the Metroplex. Crews are routed from the closest available team, not from another state."),
    ("shield", "Licensed and insured",
     "Full liability coverage and workers' compensation on every job. Certificates are available before we start work &mdash; just ask."),
    ("doc", "We speak insurance",
     "Moisture maps, photo logs, daily drying records and line-item documentation formatted the way adjusters expect to receive them."),
    ("users", "Locally owned, not a franchise",
     "Owner AJ Alqraini answers for the quality of every job. You are dealing with the person whose name is on the truck."),
    ("tool", "Commercial-grade equipment",
     "Truck-mounted extractors, LGR dehumidifiers, air movers, HEPA air scrubbers, thermal imaging and penetrating moisture meters."),
    ("hammer", "Mitigation through rebuild",
     "Most companies dry it out and hand you a contractor list. We carry the job through demolition, repair and final finish."),
    ("award", "Satisfaction guaranteed",
     "We are not finished until the moisture readings are dry, the air is clean and you have signed off on the work."),
]

PROCESS = [
    ("Emergency call", "You call, we pick up. We capture the address, the source, whether utilities are safe, and route the nearest crew.", "Minutes"),
    ("On-site inspection", "Technicians locate the source, stop the intrusion where possible, and walk the property with you.", "On arrival"),
    ("Damage assessment", "Thermal imaging and moisture meters map how far water travelled, including behind walls and under flooring.", "Hour one"),
    ("Water extraction", "Truck-mounted and portable extractors remove standing water and saturated contents before secondary damage sets in.", "Day one"),
    ("Structural drying", "Air movers and LGR dehumidifiers are placed to a calculated load and monitored daily against target readings.", "Days 2-5"),
    ("Cleaning &amp; sanitizing", "Antimicrobial treatment, HEPA filtration, contents cleaning and odor neutralization throughout the affected area.", "During drying"),
    ("Repairs &amp; rebuild", "Drywall, insulation, flooring, cabinetry, trim and paint restored to pre-loss condition or better.", "After dry-out"),
    ("Final walkthrough", "We verify readings, review the documentation package with you, and do not close the job until you sign off.", "Completion"),
]

FAQS = [
    ("How fast can you get to my property?",
     "<p>Our line is answered 24 hours a day and crews are dispatched from inside the Metroplex, so response is measured in the time it takes to drive to you rather than the time it takes to reach a call center. When you call, we will give you a realistic arrival window for your specific address and traffic conditions &mdash; and we will tell you exactly what to do in the meantime.</p>"),
    ("Do you work directly with insurance companies?",
     "<p>Yes. We document every job the way carriers and adjusters expect: dated photographs, moisture maps, daily drying logs, equipment counts and line-item scopes. We can speak with your adjuster directly, meet them on site, and in many cases bill the carrier so you are only responsible for your deductible. We are not a public adjuster and we do not negotiate your claim for you, but we make sure the physical evidence of the loss is captured properly.</p>"),
    ("How much does water damage restoration cost?",
     "<p>It depends on how much water there was, what it touched, how long it sat and whether it was clean, gray or black water. A small contained laundry-room leak is a very different job from a second-floor supply line that ran overnight through three rooms and a ceiling. Estimates are free, and we walk you through the scope before any work begins. If the loss is covered, your out-of-pocket cost is usually your deductible.</p>"),
    ("Can mold grow after a flood or leak?",
     "<p>Yes, and quickly. The EPA notes that mold can begin growing on damp materials within 24 to 48 hours. That is why speed matters more than almost anything else in water damage work: fast, complete drying is the most effective mold prevention there is. If materials stayed wet longer than that, we treat mold as a likely condition rather than a possibility and inspect accordingly.</p>"),
    ("What should I do before your crew arrives?",
     "<p>Safety first. If water is near outlets, panels or fixtures, shut off electricity to the affected area only if you can do so safely &mdash; otherwise wait for us. Shut off the water supply at the source or the main. Do not walk through standing water in a room with live power, and do not enter a fire-damaged structure until it has been cleared. If it is safe, move small valuables and electronics to a dry area, lift curtains and skirting off wet floors, and start photographing everything for your claim.</p>"),
    ("Do you provide free estimates?",
     "<p>Yes. Assessment and estimates are free, with no obligation. For an active emergency we will stabilize the situation first &mdash; stopping intrusion and extracting water &mdash; and walk the full scope with you once the property is out of danger.</p>"),
    ("Do you actually answer the phone at 3am?",
     "<p>Yes. Emergency restoration is not a business-hours trade. Supply lines fail at night, water heaters go on weekends and storms do not check the calendar. The number on this page reaches us around the clock, every day of the year.</p>"),
    ("How long does structural drying take?",
     "<p>Most residential water losses dry in three to five days, though it varies with the volume of water, the materials affected and the humidity outside. Hardwood, plaster and dense assemblies take longer than carpet and drywall. We set equipment to a calculated load and take moisture readings daily &mdash; the job is done when the readings say so, not when the calendar does.</p>"),
    ("Do you repair and rebuild, or only dry things out?",
     "<p>We do both. Many restoration companies stop at mitigation and hand you a list of contractors. We carry the job through demolition, drywall, flooring, cabinetry, trim and paint, which means one point of contact, one scope and no gap between the company that tore it out and the company that puts it back.</p>"),
    ("What areas do you serve?",
     "<p>We cover 29 cities across Dallas-Fort Worth, including Dallas, Fort Worth, Irving, Plano, Frisco, McKinney, Arlington, Garland, Denton, Grapevine, Southlake and the surrounding communities. If your address is in the Metroplex, call and we will confirm coverage immediately.</p>"),
    ("Is the water in my home dangerous?",
     "<p>It depends on the source. Category 1 is clean water from a supply line. Category 2 (gray water) comes from appliances, washing machines or toilet overflow without solids, and carries contaminants. Category 3 (black water) includes sewage, rising floodwater and any water that has sat long enough to grow bacteria &mdash; it requires containment, PPE and disposal of porous materials. We identify the category on arrival because it determines everything about how the job is handled.</p>"),
    ("Will my hardwood floors have to be replaced?",
     "<p>Not always. Hardwood that has cupped can often be dried in place with specialty floor drying mats and controlled dehumidification, then sanded and refinished after it stabilizes. Success depends on how long the water sat, what the subfloor is doing and whether the finish trapped moisture underneath. We will tell you honestly which way it is likely to go rather than defaulting to a tear-out.</p>"),
    ("Do you handle sewage backups?",
     "<p>Yes. Sewage is category 3 contamination and is handled with containment, full PPE, antimicrobial treatment and controlled disposal of affected porous materials. This is not a job for household cleaners or a wet vac &mdash; the health risk comes from bacteria and aerosolized contaminants, not just the visible mess.</p>"),
    ("Can I stay in my home during restoration?",
     "<p>Often yes, particularly if the loss is contained to one area. It depends on whether the affected area includes a kitchen or the only bathroom, whether there is mold or sewage involved, whether power to part of the home is off, and how much equipment noise you can live with. We will give you a straight answer at the assessment so you can make arrangements early rather than at 9pm.</p>"),
    ("What is that equipment noise, and does it have to run all night?",
     "<p>Air movers and dehumidifiers have to run continuously to hold the drying conditions we set. Turning them off overnight extends the job, and in a bad case it lets microbial growth start. It is loud and it is genuinely inconvenient, but it is the difference between a five-day dry-out and a tear-out.</p>"),
    ("Do you do fire damage as well as water?",
     "<p>Yes, and the two usually arrive together &mdash; the fire department leaves a lot of water behind. We handle emergency board-up and roof tarping, soot and char removal, smoke odor neutralization, contents cleaning and the full rebuild.</p>"),
    ("How do you get smoke smell out permanently?",
     "<p>Smoke odor is caused by microscopic residue that settles into porous surfaces and HVAC systems, so masking it never works. Real odor removal means physically cleaning affected surfaces, removing materials that cannot be cleaned, sealing what remains where appropriate, cleaning the duct system, and finishing with hydroxyl or ozone treatment depending on the situation.</p>"),
    ("Do you offer commercial restoration?",
     "<p>Yes. Retail, office, restaurant, warehouse and multi-family properties, including after-hours and phased work so you can keep operating. Commercial losses carry a business-interruption clock as well as a damage clock, and we scope them accordingly.</p>"),
    ("What is emergency board-up and when do I need it?",
     "<p>Board-up secures a property after fire, storm, vehicle impact or break-in: covering broken windows and doors, tarping compromised roofing and closing structural openings. It matters for two reasons &mdash; it prevents further weather and intrusion damage, and most policies require you to take reasonable steps to protect the property from further loss.</p>"),
    ("Do you remove and dispose of ruined furniture and debris?",
     "<p>Yes. Junk removal and debris haul-off is one of our core services and it is often part of a restoration job. Ruined furniture, soaked carpet and pad, demolition debris and contents that cannot be salvaged are documented for your claim first, then loaded and hauled away.</p>"),
    ("Can you store my belongings while the work is done?",
     "<p>Yes. We handle pack-out with a written inventory, transport, secure storage and move-back once the property is ready. It is the practical answer when the affected area is too large to work around or when contents need cleaning off site.</p>"),
    ("What certifications should a restoration company have?",
     "<p>The industry standard is IICRC certification &mdash; specifically WRT (Water Damage Restoration Technician), ASD (Applied Structural Drying) and AMRT (Applied Microbial Remediation Technician) &mdash; along with state licensing where required and current liability and workers' compensation coverage. Ask any company you are considering for proof of all of it, including ours, before work starts.</p>"),
    ("Will you tear out my drywall automatically?",
     "<p>No. Drywall is removed when it is saturated, when it is holding moisture against insulation that cannot dry, when it is contaminated by category 2 or 3 water, or when there is growth behind it. Otherwise we dry it in place. A company that opens every wall by default is either not measuring or is scoping for the invoice.</p>"),
    ("What happens if you find mold once you start?",
     "<p>We stop, contain the area so spores are not spread through the rest of the property, and tell you what we found before we proceed. Depending on the size of the affected area and your carrier's requirements, an independent hygienist may need to test and write a protocol. We will explain what applies to your situation rather than quietly expanding the job.</p>"),
    ("How do I know the property is actually dry?",
     "<p>By measurement, not by feel. We establish dry standard readings from an unaffected area of the same material, then take daily readings from affected materials until they match. Those readings go in your documentation package. If a company cannot show you numbers, they do not know whether the structure is dry either.</p>"),
]

EXPECT = [
    ("phone", "A person answers, at any hour",
     "Our line is answered 24 hours a day, seven days a week. You will not be routed to voicemail or an "
     "answering service that takes a message and calls someone else. Tell us the address and what has "
     "happened and we will talk you through what to do in the next ten minutes."),
    ("doc", "A free estimate before work begins",
     "We assess the property, explain what we have found in plain language, and give you a written estimate "
     "at no cost. You will know the scope and what it involves before anyone starts, and nothing outside "
     "that scope proceeds without your approval."),
    ("shield", "Licensed, insured and locally owned",
     "We are based at our facility in Dallas and we work across the Metroplex. That means the company that "
     "quotes the job is the company that does it, and we are still here afterward if something needs "
     "attention."),
    ("home", "Your property treated carefully",
     "Containment where it is needed, protected walkways, equipment placed with the household in mind, and "
     "the site left clean at the end of each day. Contents are documented before anything is moved."),
    ("users", "Clear communication throughout",
     "One point of contact for the whole job. You are told before anyone arrives, what is happening that "
     "day, and immediately if we find something that changes the scope &mdash; not at the end when it "
     "appears on an invoice."),
    ("building", "Residential and commercial",
     "Houses, apartments and HOA common areas, alongside offices, retail, restaurants and warehouse space. "
     "Mitigation through to the finished rebuild, so nothing falls into the gap between contractors."),
]



def build():
    schema = [
        organization(),
        local_business(),
        webpage_schema(TITLE, DESC, URL),
        faq_schema([(q, a) for q, a in FAQS]),
        {"@context": "https://schema.org", "@type": "WebSite", "@id": SITE + "/#website",
         "url": SITE + "/", "name": NAME, "publisher": {"@id": SITE + "/#organization"},
         "inLanguage": "en-US"},
    ]

    svc_cards = "".join(f"""
      <a class="svc-card{' is-fire' if fire else ''}" href="/services/{slug}/" data-reveal style="--d:{i*55}ms">
        <span class="svc-icon">{ico(icon)}</span>
        <h3>{title}</h3>
        <p>{body}</p>
        <span class="svc-more">Learn more {ico('arrow')}</span>
      </a>""" for i, (slug, icon, fire, title, body) in enumerate(SERVICE_CARDS))

    why_cards = "".join(f"""
      <div class="feat" data-reveal style="--d:{i*50}ms">
        <span class="feat-ico">{ico(icon)}</span>
        <div><h3>{title}</h3><p>{body}</p></div>
      </div>""" for i, (icon, title, body) in enumerate(WHY))

    steps = "".join(f"""
      <div class="step" data-reveal style="--d:{i*45}ms">
        <span class="step-n">{i+1}</span>
        <h3>{title}</h3>
        <p>{body}</p>
        <span class="step-time">{when}</span>
      </div>""" for i, (title, body, when) in enumerate(PROCESS))

    expect = "".join(f"""
      <div class="expect" data-reveal style="--d:{i*70}ms">
        <span class="expect-ico">{ico(icon)}</span>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>""" for i, (icon, title, body) in enumerate(EXPECT))

    city_chips = "".join('<a class="chip chip-light" href="/service-areas/%s/">%s</a>' % (s, n)
                         for s, n in CITIES)

    badges = "".join('<span class="badge">%s%s</span>' % (ico(k), v) for k, v in [
        ("shield", "Licensed"), ("checkc", "Insured"), ("clock", "24/7 Service"),
        ("doc", "Insurance Accepted"), ("home", "Residential"), ("building", "Commercial"),
        ("users", "Locally Owned"), ("award", "Satisfaction Guaranteed"),
    ])

    html = head(TITLE, DESC, URL, schema) + header() + f"""
<main id="main">

<!-- ============ HERO ============ -->
<section class="hero">
  <div class="ribbon" aria-hidden="true">
    <svg viewBox="0 0 1440 420" preserveAspectRatio="none">
      <defs>
        <linearGradient id="rb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#38BDF8" stop-opacity=".0"/>
          <stop offset="35%" stop-color="#1565D8" stop-opacity=".75"/>
          <stop offset="100%" stop-color="#7DD3FC" stop-opacity=".25"/>
        </linearGradient>
        <linearGradient id="rr" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#E8202E" stop-opacity=".0"/>
          <stop offset="45%" stop-color="#D8121F" stop-opacity=".7"/>
          <stop offset="100%" stop-color="#FF7A18" stop-opacity=".3"/>
        </linearGradient>
      </defs>
      <path class="sweep" d="M-80 300 C 320 170, 720 355, 1520 205 L1520 420 L-80 420 Z" fill="url(#rb)"/>
      <path class="sweep sweep-2" d="M-80 355 C 380 245, 760 400, 1520 268 L1520 420 L-80 420 Z" fill="url(#rr)" opacity=".55"/>
    </svg>
  </div>

  <div class="wrap hero-grid">
    <div>
      <span class="status-pill"><span class="dot" aria-hidden="true"></span>24/7 emergency line &middot; <span data-clock>—</span></span>
      <h1>24/7 Emergency<br><span class="accent">Restoration Services</span><br>in Dallas&ndash;Fort Worth</h1>
      <p class="hero-sub">Fast, professional help with water damage, fire damage, smoke cleanup, mold remediation, storm damage, junk removal, renovation and emergency property cleanup. <b>One call, day or night</b> &mdash; our line is answered 24 hours a day.</p>

      <div class="btn-row">
        <a class="btn btn-call btn-lg pulse" href="tel:{TEL}" data-cta="hero-call">{ico('phone')}Call {PHONE}</a>
        <a class="btn btn-ghost btn-lg" href="{MAILTO}" data-cta="hero-email">{ico('mail')}Email for a Free Estimate</a>
      </div>

      <ul class="hero-proof">
        <li>{ico('checkc')}<span>Available 24/7, answered by a person</span></li>
        <li>{ico('checkc')}<span>Licensed &amp; insured technicians</span></li>
        <li>{ico('checkc')}<span>Residential &amp; commercial across DFW</span></li>
        <li>{ico('checkc')}<span>Insurance claim documentation included</span></li>
      </ul>
    </div>

    <div class="dispatch" id="estimate">
      <div class="dispatch-top">
        <span class="dispatch-label">Emergency dispatch</span>
        <span class="dispatch-clock"><span class="dot" aria-hidden="true" style="display:inline-block;margin-right:.4rem"></span><span data-clock>—</span></span>
      </div>

      <a class="num-lg" href="tel:{TEL}" data-cta="dispatch-call">{PHONE}</a>
      <p class="num-note">Tap to call. Open 24 hours, 365 days a year.</p>
      <a class="btn btn-call btn-block btn-lg" href="tel:{TEL}">{ico('phone')}Call Now</a>

      <div class="dispatch-or">or</div>

      <a class="btn btn-outline-light btn-block" href="{MAILTO}" data-cta="dispatch-email">{ico('mail')}Email for a Free Estimate</a>
      <p class="fine">Opens your email app with the details we need already listed. For active water, fire, storm or sewage emergencies, calling is the fastest way to reach our team.</p>

      <ul class="dispatch-points">
        <li>{ico('checkc')}<span>Locally owned, based in Dallas</span></li>
        <li>{ico('checkc')}<span>Licensed &amp; insured</span></li>
        <li>{ico('checkc')}<span>Residential &amp; commercial</span></li>
        <li>{ico('checkc')}<span>Free estimates</span></li>
      </ul>
    </div>
  </div>
</section>

{trust_strip()}

<!-- ============ SERVICES ============ -->
<section class="band" id="services">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">Emergency services</span>
      <h2>Whatever happened, we handle all of it</h2>
      <p>Water, fire, smoke, mold and storm damage &mdash; plus the haul-off, storage and rebuild work that follows. One company, one point of contact, from the first call to the final walkthrough.</p>
    </div>
    <div class="grid grid-4">{svc_cards}</div>
    <div class="btn-row" style="justify-content:center;margin-top:2.5rem">
      <a class="btn btn-outline btn-lg" href="/services/">See all 19 services {ico('arrow')}</a>
    </div>
  </div>
</section>

<!-- ============ WHY US ============ -->
<section class="band band-navy">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Why Rapid Response</span>
      <h2>Built for the worst day of your year</h2>
      <p>Restoration is not really a construction service. It is an emergency service that happens to involve construction &mdash; and everything about how we operate reflects that.</p>
    </div>

    <div class="stats mt-2" style="margin-bottom:2.75rem">
      <div class="stat" data-reveal><span class="n"><span data-count="24">0</span>/<span data-count="7">0</span></span><span class="l">Line answered</span></div>
      <div class="stat" data-reveal style="--d:80ms"><span class="n" data-count="29" data-suffix="">0</span><span class="l">DFW cities covered</span></div>
      <div class="stat" data-reveal style="--d:160ms"><span class="n" data-count="19">0</span><span class="l">Services offered</span></div>
      <div class="stat" data-reveal style="--d:240ms"><span class="n" data-count="48" data-suffix="h">0</span><span class="l">Before mold starts</span></div>
    </div>

    <div class="grid grid-2">{why_cards}</div>
  </div>
</section>

<!-- ============ PROCESS ============ -->
<section class="band" id="process">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">Our restoration process</span>
      <h2>Eight steps, in this order, every time</h2>
      <p>Restoration goes wrong when steps get skipped to save a day. This is the sequence we follow on every loss, and you will know exactly which step you are on.</p>
    </div>
    <div class="process">{steps}</div>
  </div>
</section>

<!-- ============ INSURANCE ============ -->
<section class="band band-navy">
  <div class="wrap split">
    <div>
      <span class="eyebrow">Insurance assistance</span>
      <h2>Your claim is only as strong as its documentation</h2>
      <p class="lede">Most claim disputes are not really disagreements about coverage. They are disagreements about evidence &mdash; what was wet, how wet, for how long, and what it cost to fix. We capture that from the moment we arrive.</p>
      <ul class="check-list">
        <li>{ico('checkc')}<span>Dated photo documentation of every affected area, before work begins</span></li>
        <li>{ico('checkc')}<span>Moisture maps and daily drying logs with equipment counts</span></li>
        <li>{ico('checkc')}<span>Line-item scopes written in the format adjusters expect</span></li>
        <li>{ico('checkc')}<span>Direct communication with your adjuster, including on-site meetings</span></li>
        <li>{ico('checkc')}<span>Direct insurance billing available on most covered losses</span></li>
        <li>{ico('checkc')}<span>A complete closing package for your records when the job is done</span></li>
      </ul>
      <div class="btn-row mt-2">
        <a class="btn btn-call" href="tel:{TEL}">{ico('phone')}Talk to us about your claim</a>
        <a class="btn btn-ghost" href="/insurance-claims/">How claims work {ico('arrow')}</a>
      </div>
    </div>

    <div class="panel">
      <h3 style="margin-bottom:1.2rem">What to do in the first hour</h3>
      <ol style="padding-left:1.2rem;display:grid;gap:.9rem;margin:0">
        <li><strong style="color:#fff">Make it safe.</strong> If water is near outlets or panels, stay out and let us handle it. Never enter a fire-damaged structure before it is cleared.</li>
        <li><strong style="color:#fff">Stop the source.</strong> Shut off the fixture valve, or the main if you cannot isolate it.</li>
        <li><strong style="color:#fff">Call us.</strong> The clock on secondary damage starts immediately &mdash; mold can begin within 24 to 48 hours.</li>
        <li><strong style="color:#fff">Photograph everything.</strong> Wide shots and close-ups, before anything is moved.</li>
        <li><strong style="color:#fff">Notify your carrier.</strong> Open the claim early; you can add detail later.</li>
        <li><strong style="color:#fff">Do not throw anything away.</strong> Damaged items are evidence until they have been documented.</li>
      </ol>
      <p style="margin-top:1.4rem;font-size:.92rem;color:var(--slate-400)">Not sure whether it is an emergency? Call anyway. We would rather talk you through a small leak than meet you after it became a big one.</p>
    </div>
  </div>
</section>

<!-- ============ BEFORE / AFTER ============ -->
<section class="band">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">How restoration works</span>
      <h2>From standing water to finished room</h2>
      <p>Drag the handle to compare. This is an <strong>illustration</strong> of the two ends of a water-damage job &mdash; extraction and structural drying on one side, the completed rebuild on the other. Photographs from our own projects will replace it as they become available.</p>
    </div>
    <div class="ba-shell">
      <div class="ba" style="--pos:50%">
        <img src="/assets/img/ba-before.svg" alt="Illustration of a living room with standing water and saturated carpet before restoration" width="1200" height="750" loading="lazy" decoding="async">
        <div class="after-wrap">
          <img src="/assets/img/ba-after.svg" alt="Illustration of the same living room dried, cleaned and rebuilt after restoration" width="1200" height="750" loading="lazy" decoding="async">
        </div>
        <span class="ba-tag l">Before</span>
        <span class="ba-tag r">After</span>
        <span class="ba-note">Service illustration</span>
        <div class="ba-handle" aria-hidden="true"><span class="ba-knob">{ico('leftright')}</span></div>
        <label class="sr-only" for="ba1">Compare before and after</label>
        <input id="ba1" type="range" min="0" max="100" value="50" aria-label="Reveal the after photo">
      </div>
    </div>
  </div>
</section>

<!-- ============ WHAT TO EXPECT ============ -->
<section class="band band-mist">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">Our service commitment</span>
      <h2>What to expect when you call us</h2>
      <p>We would rather tell you exactly how we work than show you testimonials you have no way of verifying.</p>
    </div>
    <div class="grid grid-3">{expect}</div>
    <div class="btn-row" style="justify-content:center;margin-top:2.5rem">
      <a class="btn btn-call btn-lg" href="tel:{TEL}">{ico('phone')}Call {PHONE}</a>
      <a class="btn btn-outline btn-lg" href="{MAILTO}">{ico('mail')}Email for a Free Estimate</a>
    </div>
  </div>
</section>

<!-- ============ WHAT CAUSES DAMAGE HERE ============ -->
<section class="band">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">Local conditions</span>
      <h2>What actually causes property damage in DFW</h2>
      <p>Restoration is a seasonal trade. After enough years working the same metro area, the calendar becomes fairly predictable &mdash; and most of it is preventable if you know what to watch.</p>
    </div>
    <div class="grid grid-2"><div class="cause"><span class="cause-ico">{ico('drop')}</span><h3>Winter — hard freezes</h3><p>Attic and exterior-wall supply lines are the most common failure in DFW, because so much local plumbing runs through unconditioned space. A pipe freezes, a plug of ice pressurises the line, and it splits — often bursting the following morning as it thaws. Hose bibs, pool equipment and vacant properties with the heat turned off are the usual casualties.</p></div><div class="cause"><span class="cause-ico">{ico('wind')}</span><h3>Spring — hail and wind</h3><p>The Metroplex sits in an active hail corridor from roughly March through May. Roof bruising is frequently invisible from the ground; the reliable tell is dented soft metal — gutters, vents, air-conditioner fins. Wind breaks the seal between shingle courses, and the leak arrives weeks later.</p></div><div class="cause"><span class="cause-ico">{ico('fire')}</span><h3>Summer — heat and HVAC</h3><p>Attic temperatures above 140°F are hard on everything up there. Condensate lines clog and overflow through ceilings, drain pans rust through, and water heaters in attic closets fail into the rooms below. Second-storey laundry and supply lines add to it.</p></div><div class="cause"><span class="cause-ico">{ico('mold')}</span><h3>Year-round — aging systems</h3><p>Cast iron drains in homes built before about 1980, polybutylene supply lines from the late 70s to mid 90s, and galvanised steel in pre-1960 properties all fail on their own schedule. So do washing machine hoses, dishwasher supply lines, refrigerator ice-maker lines and toilet supply valves.</p></div></div>
    <p class="cost-note">{ico('shield')}<span><strong>The single most effective thing you can do</strong> is know where your main water shutoff is and confirm it actually turns, before you need it at 2am. After that, an automatic shutoff valve that closes on abnormal flow costs a fraction of one water loss.</span></p>
  </div>
</section>

<!-- ============ FAQ ============ -->
<section class="band" id="faq">
  <div class="wrap wrap-narrow">
    <div class="sec-head center">
      <span class="eyebrow">Emergency FAQ</span>
      <h2>Straight answers, before you have to ask</h2>
      <p>The questions people call us with at 2am, answered honestly &mdash; including the ones about cost.</p>
    </div>
    {faq_block(FAQS)}
  </div>
</section>

<!-- ============ SERVICE AREA ============ -->
<section class="band band-navy">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Service area</span>
      <h2>29 cities across Dallas&ndash;Fort Worth</h2>
      <p>We dispatch from {STREET} in Dallas and cover the Metroplex from Fort Worth to Celina. Tap your city for local response details.</p>
    </div>
    <div class="chips">{city_chips}</div>
    <div class="badges mt-3">{badges}</div>
  </div>
</section>

{cta_band()}

</main>
""" + footer()

    write("", html)
    print("built: index.html")


if __name__ == "__main__":
    build()
