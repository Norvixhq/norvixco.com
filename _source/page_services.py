# -*- coding: utf-8 -*-
from lib import *
from content_services import S
from content_services_ext import EXT, EXT2
from content_services_cost import COST, TIMELINE


def build_service(slug):
    d = dict(S[slug])
    d["body"] = d["body"] + EXT.get(slug, "") + EXT2.get(slug, "")
    name = SERVICE_MAP[slug]
    url = "/services/%s/" % slug
    cr = [("Home", "/"), ("Services", "/services/"), (name, None)]

    schema = [
        local_business(),
        webpage_schema(d["meta_title"], d["meta_desc"], url),
        service_schema(name, strip_tags(d["lede"]), url),
        crumb_schema(cr),
        faq_schema(d["faqs"]),
    ]

    facts = "".join("<div><dt>%s</dt><dd>%s</dd></div>" % (k, v) for k, v in d["facts"])
    signs = "".join("<li>%s</li>" % s for s in d["signs"])
    cintro, cfactors = COST[slug]
    cost_rows = "".join(
        '<div class="cost-row"><h3>%s</h3><p>%s</p></div>' % (t, b) for t, b in cfactors)
    tl = "".join(
        '<li class="tl-item"><span class="tl-when">%s</span>'
        '<div class="tl-body"><h3>%s</h3><p>%s</p></div></li>' % (when, ph, det)
        for ph, when, det in TIMELINE[slug])

    related = "".join(
        '<a class="svc-card%s" href="/services/%s/"><span class="svc-icon">%s</span>'
        '<h3>%s</h3><span class="svc-more">View service %s</span></a>'
        % (" is-fire" if S[r]["fire"] else "", r, ico(S[r]["icon"]), SERVICE_MAP[r], ico("arrow"))
        for r in d["related"] if r in S
    )
    city_links = " &middot; ".join(
        '<a href="/service-areas/%s/">%s</a>' % (s, n) for s, n in CITIES[:14]
    )

    badges = "".join('<span class="badge">%s%s</span>' % (ico(k), v) for k, v in [
        ("clock", "24/7 Response"), ("shield", "Licensed &amp; Insured"),
        ("doc", "Insurance Support"), ("map", "All of DFW"),
    ])

    html = head(d["meta_title"], d["meta_desc"], url, schema) + header() + f"""
<main id="main">

<section class="page-hero">
  <div class="wrap">
    {crumbs(cr)}
    <h1>{d['title']}</h1>
    <p class="lede">{d['lede']}</p>
    <div class="btn-row">
      <a class="btn btn-call btn-lg pulse" href="tel:{TEL}" data-cta="service-hero-call">{ico('phone')}Call {PHONE}</a>
      <a class="btn btn-ghost btn-lg" href="{MAILTO}">{ico('mail')}Email for a Free Estimate</a>
    </div>
    <div class="badges">{badges}</div>
  </div>
</section>

{trust_strip()}

<section class="band">
  <div class="wrap article-layout">
    <article class="prose">
      <dl class="factbar" style="margin-top:0">{facts}</dl>
      {d['body']}

      <h2>Call us when you see any of this</h2>
      <ul>{signs}</ul>
      <p>If you are looking at one of these right now, the useful next step is a phone call rather than more reading. Our line is answered 24 hours a day and the assessment is free.</p>

      <h2>{name} across Dallas&ndash;Fort Worth</h2>
      <p>We dispatch from {STREET} in Dallas and cover 29 cities across the Metroplex, including {city_links} and the surrounding communities. <a href="/service-areas/">See all service areas.</a></p>
    </article>

    <div class="sticky-aside">
      {aside_call()}
      {aside_services(slug)}
      {aside_cities()}
    </div>
  </div>
</section>

<section class="band band-mist">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">Cost</span>
      <h2>What drives the price of {name.lower()}</h2>
      <p>{cintro} We give you a written estimate free, before any work begins &mdash; but these are the factors that move the number, so you know what you are being quoted on.</p>
    </div>
    <div class="cost-grid">{cost_rows}</div>
    <p class="cost-note">{ico('doc')}<span>We do not publish fixed prices, because a number quoted without seeing the property would be a guess. What we will do is walk the job with you, explain what we have found, and put the scope in writing at no cost.</span></p>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <div class="sec-head center">
      <span class="eyebrow">Timeline</span>
      <h2>What to expect, and roughly when</h2>
      <p>Every property is different and these are typical ranges rather than promises. Where your job is likely to run longer or shorter, we will tell you at the assessment rather than letting you find out.</p>
    </div>
    <ol class="timeline">{tl}</ol>
    <div class="btn-row" style="justify-content:center;margin-top:2.5rem">
      <a class="btn btn-call btn-lg pulse" href="tel:{TEL}">{ico('phone')}Call {PHONE}</a>
      <a class="btn btn-outline btn-lg" href="{MAILTO}">{ico('mail')}Email for a Free Estimate</a>
    </div>
  </div>
</section>

<section class="band band-mist">
  <div class="wrap wrap-narrow">
    <div class="sec-head center">
      <span class="eyebrow">Questions</span>
      <h2>{name} FAQs</h2>
    </div>
    {faq_block(d['faqs'])}
  </div>
</section>

<section class="band band-navy">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Related services</span>
      <h2>Often needed alongside this</h2>
    </div>
    <div class="grid grid-3">{related}</div>
  </div>
</section>

{cta_band("Need " + name.lower() + " right now?", "Call and describe what happened. We will tell you what to do in the next ten minutes and route a crew to your address.")}

</main>
""" + footer()

    write("services/" + slug, html)


def build_index():
    url = "/services/"
    cr = [("Home", "/"), ("Services", None)]
    title = "Restoration Services in Dallas-Fort Worth | Rapid Response Restoration"
    desc = ("All 19 restoration services offered across DFW: water damage, fire and smoke, mold, "
            "storm damage, biohazard, junk removal, renovation and more. 24/7. Call (708) 506-8917.")

    cards = "".join(
        '<a class="svc-card%s" href="/services/%s/" data-reveal style="--d:%dms">'
        '<span class="svc-icon">%s</span><h3>%s</h3><p>%s</p>'
        '<span class="svc-more">Learn more %s</span></a>'
        % (" is-fire" if S[s]["fire"] else "", s, i * 35, ico(S[s]["icon"]), n,
           strip_tags(S[s]["lede"])[:150].rsplit(" ", 1)[0] + "&hellip;", ico("arrow"))
        for i, (s, n) in enumerate(SERVICES)
    )

    schema = [
        local_business(), webpage_schema(title, desc, url), crumb_schema(cr),
        {"@context": "https://schema.org", "@type": "ItemList",
         "itemListElement": [
             {"@type": "ListItem", "position": i + 1, "name": n,
              "url": SITE + "/services/" + s + "/"} for i, (s, n) in enumerate(SERVICES)]},
    ]

    html = head(title, desc, url, schema) + header() + f"""
<main id="main">
<section class="page-hero">
  <div class="wrap">
    {crumbs(cr)}
    <h1>Every service, one company</h1>
    <p class="lede">Nineteen services covering the whole arc of a property emergency &mdash; from the first extractor running at 2am to the final coat of paint. No handoffs, no gaps, no chasing three contractors.</p>
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
      <h2>How to work out which service you need</h2>
      <p>Most people arrive here knowing what happened but not what it is called, and the honest answer is that it usually does not matter &mdash; describe the situation on the phone and we will tell you which of these it is. But if you would rather work it out yourself, the rough logic is this.</p>
      <p><strong>If water is involved and it happened suddenly</strong>, start with water damage restoration; extraction, structural drying and burst pipe repair are stages within that rather than separate jobs. <strong>If the water came from outside or from a sewer</strong>, it is flood cleanup, which is a contamination job rather than a drying job.</p>
      <p><strong>If there has been a fire</strong>, fire damage restoration covers the structure and rebuild, with smoke damage cleanup and odour removal handling the parts of the property the flames never reached. <strong>If you can smell something musty or see growth</strong>, that is mold remediation &mdash; and it almost always means there is a moisture source that needs finding first.</p>
      <p><strong>If a storm opened the building up</strong>, emergency board-up stops it getting worse and storm damage restoration puts it back. <strong>If the emergency is over and you need the property cleared or rebuilt</strong>, that is junk removal, contents cleaning, storage and moving, or renovation.</p>
      <p>Every one of these is available across all 29 cities we serve, for both residential and commercial property, and every one of them starts with a free assessment.</p>
    </article>
    <div class="grid grid-3">{cards}</div>
  </div>
</section>

{cta_band("Not sure which service you need?", "That is our job, not yours. Describe what happened and we will tell you what it is and what happens next.")}
</main>
""" + footer()
    write("services", html)


def build_all():
    for slug, _ in SERVICES:
        if slug in S:
            build_service(slug)
    build_index()
    print("built: %d service pages + index" % len([s for s, _ in SERVICES if s in S]))


if __name__ == "__main__":
    build_all()
