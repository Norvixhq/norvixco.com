# -*- coding: utf-8 -*-
from lib import *
from content_cities import C
from content_cities_extra import X
from content_services import S
import urllib.parse

CORE = ["water-damage-restoration", "fire-damage-restoration", "smoke-damage-cleanup",
        "mold-remediation", "storm-damage-restoration", "flood-cleanup",
        "emergency-cleanup", "renovation"]

# Short, city-aware card copy. Keeps each grid tile scannable instead of
# truncating the long service lede mid-sentence.
BLURB = {
    "water-damage-restoration": "Burst supply lines, failed water heaters, appliance overflows and slab leaks in %s homes and businesses. Extraction, structural drying and rebuild.",
    "fire-damage-restoration":  "Structure cleaning, soot and char removal, board-up and full reconstruction after a fire anywhere in %s.",
    "smoke-damage-cleanup":     "Smoke residue, HVAC contamination and lingering odour removed from %s properties, including rooms the fire never reached.",
    "mold-remediation":         "Containment, HEPA filtration and controlled removal of mold in %s properties, with the moisture source fixed so it does not return.",
    "storm-damage-restoration": "Hail, wind and roof damage across %s. Emergency tarping, water intrusion cleanup and reconstruction.",
    "flood-cleanup":            "Contaminated water and sewage backup cleanup for %s, with disinfection and safe disposal of affected materials.",
    "emergency-cleanup":        "Round-the-clock emergency response in %s. We make the property safe, stop further damage and document everything.",
    "renovation":               "Reconstruction and remodelling for %s properties, carrying the job from tear-out through to the finished room.",
}


def build_city(slug):
    d = C[slug]
    city = CITY_MAP[slug]
    url = "/service-areas/%s/" % slug
    cr = [("Home", "/"), ("Service Areas", "/service-areas/"), (city, None)]

    title = "Restoration Services in %s, TX | 24/7 Water, Fire & Mold | Rapid Response" % city
    desc = ("24/7 emergency restoration in %s, TX. Water damage, fire and smoke, mold remediation, "
            "storm damage and junk removal. Licensed, insured, insurance claim support. "
            "Call (708) 506-8917." % city)

    q = urllib.parse.quote("Rapid Response Restoration %s, %s TX" % (STREET, CITY))
    map_q = urllib.parse.quote("%s, TX" % city)

    hoods = ", ".join(d["hoods"][:-1]) + " and " + d["hoods"][-1]
    marks = ", ".join(d["marks"][:-1]) + " and " + d["marks"][-1]

    seasonal, commercial = X[slug]
    hood_chips = "".join('<span class="chip chip-static">%s</span>' % h for h in d["hoods"])
    zip_chips = "".join('<span class="chip chip-static">%s</span>' % z.strip() for z in d["zips"].split(","))

    svc_cards = "".join(
        '<a class="svc-card%s" href="/services/%s/" aria-label="%s in %s — view service">'
        '<span class="svc-icon">%s</span><h3>%s in %s</h3><p>%s</p>'
        '<span class="svc-more">View service %s</span></a>'
        % (" is-fire" if S[s]["fire"] else "", s, SERVICE_MAP[s], city,
           ico(S[s]["icon"]), SERVICE_MAP[s], city, BLURB[s] % city, ico("arrow"))
        for s in CORE
    )

    nearby = [(cs, cn) for cs, cn in CITIES if cs != slug][:0]
    idx = [i for i, (cs, _) in enumerate(CITIES) if cs == slug][0]
    ring = [CITIES[(idx + k) % len(CITIES)] for k in range(1, 7)]
    nearby_links = "".join('<a class="chip chip-light" href="/service-areas/%s/">%s</a>' % (s, n)
                           for s, n in ring)

    faqs = [
        ("How fast can you reach %s?" % city,
         "<p>We dispatch from %s in Dallas, %s. Our line is answered 24 hours a day and when you call we will give you a realistic arrival window for your specific address rather than a generic promise.</p>" % (STREET, d["drive"])),
        ("Do you serve all of %s?" % city,
         "<p>Yes, every neighborhood, including %s. If you are unsure whether your address falls inside the city limits, call and we will confirm coverage immediately.</p>" % hoods),
        ("What kind of damage is most common in %s?" % city,
         "<p>%s</p>" % d["risk"]),
        ("Do you work with insurance companies on %s claims?" % city,
         "<p>Yes. We document every job with dated photographs, moisture maps, daily drying logs and line-item scopes, we can meet your adjuster on site, and on most covered losses we can bill your carrier directly so your out-of-pocket is the deductible.</p>"),
        ("Are you available at night and on weekends in %s?" % city,
         "<p>Yes &mdash; 24 hours a day, every day of the year, including holidays. Most water losses are discovered outside business hours, which is exactly why the line is staffed around the clock.</p>"),
    ]

    schema = [
        local_business(extra_area={"@type": "City", "name": "%s, TX" % city}),
        webpage_schema(title, desc, url),
        crumb_schema(cr),
        faq_schema(faqs),
        {"@context": "https://schema.org", "@type": "Service",
         "name": "Emergency Restoration Services in %s, TX" % city,
         "serviceType": "Restoration service",
         "provider": {"@id": SITE + "/#business"},
         "areaServed": {"@type": "City", "name": "%s, TX" % city,
                        "containedInPlace": {"@type": "AdministrativeArea", "name": d["county"]}},
         "url": SITE + url},
    ]

    html = head(title, desc, url, schema) + header() + f"""
<main id="main">

<section class="page-hero">
  <div class="wrap">
    {crumbs(cr)}
    <h1>24/7 Restoration Services in {city}, Texas</h1>
    <p class="lede">Water, fire, smoke, mold and storm damage restoration throughout {city} and {d['county']} &mdash; plus junk removal, storage and full rebuild. {d['intro']}</p>
    <div class="btn-row">
      <a class="btn btn-call btn-lg pulse" href="tel:{TEL}" data-cta="city-hero-call">{ico('phone')}Call {PHONE}</a>
      <a class="btn btn-ghost btn-lg" href="{MAILTO}">{ico('mail')}Email for a Free Estimate</a>
    </div>
    <div class="badges">
      <span class="badge">{ico('clock')}Answered 24/7</span>
      <span class="badge">{ico('map')}{d['county']}</span>
      <span class="badge">{ico('shield')}Licensed &amp; Insured</span>
      <span class="badge">{ico('doc')}Insurance Support</span>
    </div>
  </div>
</section>

{trust_strip()}

<section class="band">
  <div class="wrap article-layout">
    <article class="prose">
      <h2>Emergency restoration for {city} homes and businesses</h2>
      <p>{d['intro']} From our shop at {STREET} in Dallas, {city} is {d['drive']} &mdash; which means when you call at 2am, the delay is drive time rather than a call center forwarding your details to a crew somewhere else.</p>
      <p>We cover the whole city, including {hoods}, and the areas around {marks}. Common ZIP codes we work in: {d['zips']}.</p>

      <h2>What makes {city} properties different</h2>
      <p>{d['stock']}</p>
      <p><strong>What that means for you:</strong> {d['risk']} We take that into account before we arrive, which is part of why local dispatch matters more in this trade than in most.</p>

      <h2>What to do right now</h2>
      <p>If water is running, shut it off at the fixture or the main. If water is near outlets or the panel, stay out of that area and let us handle the power. If there has been a fire, do not enter the structure until the fire department clears it. Then photograph everything before anything is moved, and call &mdash; the clock on secondary damage starts immediately, and mold can begin growing on damp materials within 24 to 48 hours.</p>

    </article>

    <div class="sticky-aside">
      {aside_call("Damage in " + city + " right now?", "We dispatch from Dallas and cover " + d['county'] + " around the clock. Tell us the address and what happened.")}
      {aside_cities(slug)}
      {aside_services()}
    </div>
  </div>
</section>

<section class="band band-navy" id="services">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">Restoration services</span>
      <h2>Our services in {city}</h2>
      <p>Every service we offer is available throughout {city}, from the first emergency call through to the finished rebuild.</p>
    </div>
    <div class="grid grid-4">{svc_cards}</div>
    <div class="btn-row" style="justify-content:center;margin-top:2.5rem">
      <a class="btn btn-ghost btn-lg" href="/services/">Explore all 19 restoration services {ico('arrow')}</a>
    </div>
  </div>
</section>

<section class="band band-mist">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">Local conditions</span>
      <h2>What causes damage in {city}, and when</h2>
      <p>Restoration is a seasonal trade, and the seasons look different from one part of the Metroplex to another. Knowing the pattern where you are is most of knowing what to watch for.</p>
    </div>
    <div class="grid grid-2">
      <div class="panel-card">
        <span class="panel-ico">{ico('wind')}</span>
        <h3>The seasonal pattern here</h3>
        <p>{seasonal}</p>
      </div>
      <div class="panel-card">
        <span class="panel-ico">{ico('building')}</span>
        <h3>Commercial property in {city}</h3>
        <p>{commercial}</p>
        <p>We work with property managers, facilities teams and business owners across all of it, and we can phase work so the parts of the operation that generate revenue come back first.</p>
      </div>
    </div>

    <div class="coverage">
      <div>
        <h3>{ico('map')}Neighbourhoods we cover in {city}</h3>
        <div class="chips">{hood_chips}</div>
        <p class="fine-note">This is not an exhaustive list &mdash; we cover all of {city} and the surrounding area.</p>
      </div>
      <div>
        <h3>{ico('doc')}ZIP codes</h3>
        <div class="chips">{zip_chips}</div>
        <p class="fine-note">If your ZIP is not listed, call anyway. We almost certainly still cover you.</p>
      </div>
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap split">
    <div>
      <span class="eyebrow">Finding us</span>
      <h2>Dispatched from Dallas, serving {city}</h2>
      <p>Our facility is at <strong>{STREET}, {CITY}, {REGION} {ZIP}</strong>, in the Design District just off Stemmons Freeway. From there, {city} is {d['drive']}.</p>
      <p>Restoration is not a mail-order service &mdash; being physically inside the Metroplex matters, because equipment has to arrive with the crew. It also means we are still here after storm season, unlike the out-of-state operations that appear in DFW for a few weeks after a hail event.</p>
      <ul class="check-list">
        <li>{ico('checkc')}<span>Locally owned, licensed and insured</span></li>
        <li>{ico('checkc')}<span>Answered 24 hours a day, seven days a week</span></li>
        <li>{ico('checkc')}<span>Free assessment and estimate anywhere in {city}</span></li>
        <li>{ico('checkc')}<span>Insurance documentation from the first photograph</span></li>
      </ul>
      <div class="btn-row mt-2">
        <a class="btn btn-call" href="tel:{TEL}">{ico('phone')}Call {PHONE}</a>
        <a class="btn btn-outline" href="{MAILTO}">{ico('mail')}Email for a Free Estimate</a>
      </div>
    </div>
    <div class="map-frame">
      <iframe title="Map of {city}, Texas and the Rapid Response Restoration service area"
        src="https://www.google.com/maps?q={map_q}&output=embed"
        loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</section>

<section class="band band-mist">
  <div class="wrap wrap-narrow">
    <div class="sec-head center">
      <span class="eyebrow">{city} FAQs</span>
      <h2>Common questions from {city} property owners</h2>
    </div>
    {faq_block(faqs)}
  </div>
</section>

<section class="band band-navy band-tight">
  <div class="wrap">
    <h2 style="font-size:clamp(1.4rem,2.6vw,1.9rem)">We also cover</h2>
    <div class="chips mt-1">{nearby_links}<a class="chip" href="/service-areas/">All 29 areas &rarr;</a></div>
  </div>
</section>

{cta_band("Restoration crews for " + city + ", around the clock.", "Call and describe what happened. We will tell you what to do in the next ten minutes, then route a crew to your address.")}

</main>
""" + footer()

    write("service-areas/" + slug, html)


def build_index():
    url = "/service-areas/"
    cr = [("Home", "/"), ("Service Areas", None)]
    title = "Service Areas | Restoration Across Dallas-Fort Worth | Rapid Response"
    desc = ("Rapid Response Restoration covers 29 cities across Dallas-Fort Worth including Dallas, "
            "Fort Worth, Plano, Frisco, Irving, Arlington and Denton. 24/7. Call (708) 506-8917.")

    cards = "".join(
        '<a class="svc-card" href="/service-areas/%s/" data-reveal style="--d:%dms">'
        '<span class="svc-icon">%s</span><h3>%s, TX</h3><p>%s</p>'
        '<span class="svc-more">Local response %s</span></a>'
        % (s, i * 25, ico("map"), n, C[s]["county"] if s in C else "Dallas-Fort Worth", ico("arrow"))
        for i, (s, n) in enumerate(CITIES) if s in C
    )

    schema = [
        local_business(), webpage_schema(title, desc, url), crumb_schema(cr),
        {"@context": "https://schema.org", "@type": "ItemList",
         "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": n + ", TX",
                              "url": SITE + "/service-areas/" + s + "/"}
                             for i, (s, n) in enumerate(CITIES)]},
    ]

    html = head(title, desc, url, schema) + header() + f"""
<main id="main">
<section class="page-hero">
  <div class="wrap">
    {crumbs(cr)}
    <h1>29 cities. One local crew.</h1>
    <p class="lede">We dispatch from {STREET} in Dallas and cover the Metroplex from Fort Worth to Celina. Every city below gets the same 24/7 line, the same equipment and the same crews &mdash; pick yours for local response details.</p>
    <div class="btn-row">
      <a class="btn btn-call btn-lg pulse" href="tel:{TEL}">{ico('phone')}Call {PHONE}</a>
      <a class="btn btn-ghost btn-lg" href="{MAILTO}">{ico('mail')}Email for a Free Estimate</a>
    </div>
  </div>
</section>

{trust_strip()}

<section class="band">
  <div class="wrap">
    <article class="prose" style="max-width:74ch;margin:0 auto 3rem">
      <h2>One metro area, four counties, 29 cities</h2>
      <p>We dispatch from our facility at {STREET} in the Dallas Design District, which puts us inside the Metroplex rather than driving into it. In this trade that matters more than it sounds: equipment has to arrive with the crew, and an hour of standing water is not a rounding error.</p>
      <p>The cities below span <strong>Dallas, Tarrant, Collin and Denton counties</strong>, and they are genuinely different from a restoration point of view. Richardson and east Plano are full of homes from an era whose cast iron drains and original water heaters are now at end of life. Irving and Carrollton carry large amounts of polybutylene supply line that fails without warning. Frisco, Prosper and Celina are almost entirely new build, where the failures are installation defects and attic HVAC rather than aging pipe. Fort Worth and downtown McKinney have historic stock with pier-and-beam floors and plaster walls that need drying rather than demolition. Las Colinas and Addison are vertical, where one failure travels through several floors and several tenants.</p>
      <p>Each city page below covers the local property stock, the failure patterns we see there, the neighbourhoods and ZIP codes, and the route we take to get to you.</p>
      <p><strong>If your city is not listed, call anyway.</strong> The list reflects where we work regularly, not a boundary we refuse to cross &mdash; and we would rather tell you honestly whether we are the right people for your address than have you keep searching.</p>
    </article>
    <div class="grid grid-4">{cards}</div>
    <p class="mt-3" style="color:var(--slate-600)">Not listed? Call anyway &mdash; we cover surrounding communities across Dallas, Tarrant, Collin and Denton counties and will confirm your address immediately.</p>
  </div>
</section>

{cta_band()}
</main>
""" + footer()
    write("service-areas", html)


def build_all():
    n = 0
    for slug, _ in CITIES:
        if slug in C:
            build_city(slug)
            n += 1
    build_index()
    print("built: %d city pages + index" % n)


if __name__ == "__main__":
    build_all()
