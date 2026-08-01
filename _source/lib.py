# -*- coding: utf-8 -*-
"""Shared partials for rapidresponsedfw.com.

Clean URLs throughout: every page is <slug>/index.html and is linked as /<slug>/.
No .html appears in any href.
"""
import json
import os
import re
import urllib.parse
import hashlib


def _asset_v(relpath):
    """Short content hash of an asset, used to bust browser caches."""
    try:
        with open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                               relpath.lstrip("/")), "rb") as fh:
            return hashlib.md5(fh.read()).hexdigest()[:8]
    except OSError:
        return "dev"


CSS_V = _asset_v("assets/css/style.css")
JS_V = _asset_v("assets/js/main.js")
BUILD = CSS_V + "-" + JS_V

SITE = "https://rapidresponsedfw.com"
NAME = "Rapid Response Restoration"
PHONE = "(708) 506-8917"
TEL = "+17085068917"
EMAIL = "rapidresponserestoration@gmail.com"
STREET = "4828 Topline Drive"
CITY = "Dallas"
REGION = "TX"
ZIP = "75247"
GEO = (32.8095, -96.8721)

# ---------------------------------------------------------------- contact CTAs
# Single source of truth for every contact action on the site. There is no form
# processor behind this site, so the only two real destinations are the phone
# and the visitor's own mail client.
EMAIL_SUBJECT = "Free Estimate Request \u2014 Rapid Response Restoration"
EMAIL_BODY = (
    "Please fill in what you can and we will come back to you with a free estimate.\n\n"
    "Full name:\n"
    "Phone number:\n"
    "Property address or city:\n"
    "Type of damage or service needed:\n"
    "Brief description of the issue:\n"
    "Is this an active emergency? (yes / no):\n"
    "Preferred callback time:\n\n"
    "Photos help a great deal \u2014 please attach any images of the damage.\n\n"
    "For active flooding, fire, storm damage or sewage problems, please call "
    "(708) 506-8917 instead. Calling is the fastest way to reach our team.\n"
)


def mailto(subject=None, body=None):
    """Build a prefilled mailto: URL, escaped for use in an href attribute."""
    q = urllib.parse.quote
    return "mailto:%s?subject=%s&amp;body=%s" % (
        EMAIL, q(subject or EMAIL_SUBJECT), q(body or EMAIL_BODY))


MAILTO = mailto()

# Display-only: <wbr> lets the address wrap at the @ instead of mid-domain.
EMAIL_WRAP = EMAIL.replace("@", "<wbr>@")
CALL_LABEL = "Call " + PHONE
OUT = "/home/claude/rrr"

# ---------------------------------------------------------------- icons
I = {
    "phone": '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    "check": '<path d="M20 6 9 17l-5-5"/>',
    "checkc": '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    "arrow": '<path d="M5 12h14M12 5l7 7-7 7"/>',
    "clock": '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    "shield": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    "drop": '<path d="M12 2.7s6 6.3 6 10.3a6 6 0 0 1-12 0c0-4 6-10.3 6-10.3z"/>',
    "fire": '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    "wind": '<path d="M17.7 7.7A2.5 2.5 0 1 1 19.5 12H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2"/>',
    "bio": '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.9 4.9 7.8 7.8M16.2 16.2l2.9 2.9M2 12h4M18 12h4M4.9 19.1l2.9-2.9M16.2 7.8l2.9-2.9"/>',
    "truck": '<path d="M10 17h4V5H2v12h3M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    "hammer": '<path d="m15 12-8.4 8.4a2.1 2.1 0 0 1-3-3L12 9M18 15l3-3-6.5-6.5a3.5 3.5 0 0 0-5 0L8 7l7 8z"/>',
    "board": '<path d="M3 3h18v18H3zM3 9h18M9 21V9"/>',
    "mold": '<circle cx="8" cy="9" r="3"/><circle cx="16" cy="15" r="3.5"/><circle cx="15.5" cy="7" r="2"/>',
    "fan": '<path d="M12 12c0-3 2.5-5.5 5.5-5.5S22 8.5 22 11c0 1-1 1-1 1M12 12c3 0 5.5 2.5 5.5 5.5S15 22 12.5 22c-1 0-1-1-1-1M12 12c0 3-2.5 5.5-5.5 5.5S2 15 2 12.5c0-1 1-1 1-1M12 12c-3 0-5.5-2.5-5.5-5.5S9 2 11.5 2c1 0 1 1 1 1"/><circle cx="12" cy="12" r="1.5"/>',
    "doc": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15h6M9 11h3"/>',
    "map": '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    "mail": '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
    "star": '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
    "users": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    "award": '<circle cx="12" cy="8" r="6"/><path d="m8.2 13.9-1.2 7.1 5-3 5 3-1.2-7.1"/>',
    "zap": '<path d="M13 2 3 14h8l-1 8 10-12h-8l1-8z"/>',
    "tool": '<path d="M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2.1 2.1 0 0 1-3-3z"/>',
    "chevron": '<path d="m6 9 6 6 6-6"/>',
    "leftright": '<path d="m9 7-5 5 5 5M15 7l5 5-5 5"/>',
    "google": '<circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>',
    "home": '<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    "building": '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>',
    "box": '<path d="m21 8-9-5-9 5v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v9"/>',
    "sparkle": '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
}


def ico(name, cls=""):
    return ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
            'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"%s>%s</svg>'
            % ((' class="%s"' % cls) if cls else "", I[name]))


def star_svg():
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">%s</svg>' % I["star"]


# ---------------------------------------------------------------- nav data
SERVICES = [
    ("water-damage-restoration", "Water Damage Restoration"),
    ("fire-damage-restoration", "Fire Damage Restoration"),
    ("mold-remediation", "Mold Remediation"),
    ("storm-damage-restoration", "Storm Damage Restoration"),
    ("flood-cleanup", "Flood Cleanup"),
    ("burst-pipe-repair", "Burst Pipe Cleanup"),
    ("smoke-damage-cleanup", "Smoke Damage Cleanup"),
    ("water-extraction", "Water Extraction"),
    ("structural-drying", "Structural Drying"),
    ("emergency-board-up", "Emergency Board-Up"),
    ("contents-cleaning", "Contents Cleaning"),
    ("odor-removal", "Odor Removal"),
    ("biohazard-cleanup", "Biohazard Cleanup"),
    ("emergency-cleanup", "Emergency Cleanup"),
    ("junk-removal", "Junk Removal"),
    ("renovation", "Renovation & Rebuild"),
    ("storage-and-moving", "Storage & Moving"),
    ("commercial-restoration", "Commercial Restoration"),
    ("residential-restoration", "Residential Restoration"),
]
SERVICE_MAP = dict(SERVICES)

CITIES = [
    ("dallas", "Dallas"), ("fort-worth", "Fort Worth"), ("irving", "Irving"),
    ("plano", "Plano"), ("frisco", "Frisco"), ("mckinney", "McKinney"),
    ("richardson", "Richardson"), ("garland", "Garland"), ("mesquite", "Mesquite"),
    ("arlington", "Arlington"), ("grand-prairie", "Grand Prairie"),
    ("carrollton", "Carrollton"), ("addison", "Addison"),
    ("farmers-branch", "Farmers Branch"), ("coppell", "Coppell"),
    ("lewisville", "Lewisville"), ("the-colony", "The Colony"), ("allen", "Allen"),
    ("prosper", "Prosper"), ("celina", "Celina"), ("denton", "Denton"),
    ("north-richland-hills", "North Richland Hills"), ("euless", "Euless"),
    ("bedford", "Bedford"), ("hurst", "Hurst"), ("grapevine", "Grapevine"),
    ("flower-mound", "Flower Mound"), ("southlake", "Southlake"),
    ("las-colinas", "Las Colinas"),
]
CITY_MAP = dict(CITIES)

NAV_PRIMARY = [
    ("water-damage-restoration", "Water Damage"),
    ("fire-damage-restoration", "Fire Damage"),
    ("mold-remediation", "Mold"),
    ("storm-damage-restoration", "Storm Damage"),
    ("junk-removal", "Junk Removal"),
    ("renovation", "Renovation"),
]


# ---------------------------------------------------------------- head
def head(title, desc, canonical, schema=None, extra=""):
    """canonical: path like '/services/water-damage-restoration/'"""
    url = SITE + canonical
    blocks = ""
    if schema:
        for s in schema:
            blocks += ('\n<script type="application/ld+json">%s</script>'
                       % json.dumps(s, separators=(",", ":")))
    return f"""<!-- Rapid Response Restoration — build {BUILD} -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{url}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="theme-color" content="#061229">
<meta name="geo.region" content="US-TX">
<meta name="geo.placename" content="Dallas, Texas">

<meta property="og:type" content="website">
<meta property="og:site_name" content="{NAME}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE}/assets/img/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_US">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{SITE}/assets/img/og-image.jpg">

<link rel="icon" href="/assets/img/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="image" href="/assets/img/logo-320.webp">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css?v={CSS_V}">
<script src="/assets/js/main.js?v={JS_V}" defer></script>{blocks}{extra}
</head>
<body>
<a class="skip-link" href="#main">Skip to main content</a>
"""


# ---------------------------------------------------------------- header
def header():
    svc_links = "".join(
        '<a href="/services/%s/">%s</a>' % (s, n) for s, n in SERVICES
    )
    city_links = "".join(
        '<a href="/service-areas/%s/">%s</a>' % (s, n) for s, n in CITIES[:16]
    )
    city_links += '<a href="/service-areas/">All service areas &rarr;</a>'
    return f"""<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="/" aria-label="{NAME} — home">
      <img src="/assets/img/logo-320.webp"
           srcset="/assets/img/logo-200.webp 200w, /assets/img/logo-320.webp 320w, /assets/img/logo-520.webp 520w"
           sizes="(max-width: 480px) 60px, (max-width: 900px) 62px, 82px"
           alt="{NAME} — shield logo with water drop and flame"
           width="320" height="249" fetchpriority="high" decoding="async">
    </a>

    <button class="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="primary-nav"><span></span></button>

    <nav class="nav" id="primary-nav" aria-label="Primary">
      <a href="/">Home</a>
      <div class="has-sub" data-open="false">
        <button type="button" aria-expanded="false">Services {ico('chevron')}</button>
        <div class="sub">{svc_links}</div>
      </div>
      <div class="has-sub" data-open="false">
        <button type="button" aria-expanded="false">Service Areas {ico('chevron')}</button>
        <div class="sub">{city_links}</div>
      </div>
      <a href="/insurance-claims/">Insurance</a>
      <a href="/about/">About</a>
      <a href="/contact/">Contact</a>
    </nav>

    <div class="header-cta">
      <a class="header-phone" href="tel:{TEL}">
        <span class="lbl">24/7 Emergency</span>
        <span class="num">{PHONE}</span>
      </a>
      <a class="btn btn-call" href="tel:{TEL}" data-cta="header-call">{ico('phone')}<span>Call Now</span></a>
    </div>
  </div>
</header>
"""


# ---------------------------------------------------------------- footer
def footer():
    svc = "".join('<li><a href="/services/%s/">%s</a></li>' % (s, n) for s, n in SERVICES[:10])
    cty = "".join('<li><a href="/service-areas/%s/">%s</a></li>' % (s, n) for s, n in CITIES[:10])
    return f"""<footer class="site-footer">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <img class="foot-logo" src="/assets/img/logo-320.webp" alt="{NAME}" width="320" height="249" loading="lazy">
        <p>Locally owned emergency restoration for Dallas–Fort Worth. Water, fire, smoke, mold and storm damage — plus the junk removal, renovation and storage work that puts a property back together afterward.</p>
        <div class="foot-actions">
          <a href="tel:{TEL}" aria-label="Call {NAME} at {PHONE}">{ico('phone')}<span>{PHONE}</span></a>
          <a href="{MAILTO}" aria-label="Email {NAME} for a free estimate">{ico('mail')}<span>Email us</span></a>
          <a href="/contact/" aria-label="Contact page, address and map">{ico('map')}<span>{CITY}, {REGION}</span></a>
        </div>
      </div>

      <div>
        <h2 class="foot-h">Services</h2>
        <ul class="foot-list">{svc}<li><a href="/services/">All services &rarr;</a></li></ul>
      </div>

      <div>
        <h2 class="foot-h">Service Areas</h2>
        <ul class="foot-list">{cty}<li><a href="/service-areas/">All areas &rarr;</a></li></ul>
      </div>

      <div>
        <h2 class="foot-h">Call or Email 24/7</h2>
        <div class="foot-contact">
          <div>{ico('phone')}<a class="big" href="tel:{TEL}">{PHONE}</a></div>
          <div>{ico('mail')}<a class="mail-link" href="{MAILTO}">{EMAIL_WRAP}</a></div>
          <div>{ico('map')}<span>{STREET}<br>{CITY}, {REGION} {ZIP}</span></div>
          <div>{ico('clock')}<span>Open 24 hours a day,<br>seven days a week</span></div>
        </div>
        <div class="foot-btns">
          <a class="btn btn-call btn-sm" href="tel:{TEL}">{ico('phone')}Call Now</a>
          <a class="btn btn-outline-light btn-sm" href="{MAILTO}">{ico('mail')}Email Us</a>
        </div>
      </div>
    </div>

    <div class="foot-bar">
      <p style="margin:0">&copy; 2026 {NAME}. All rights reserved.</p>
      <nav aria-label="Legal">
        <a href="/privacy-policy/">Privacy Policy</a>
        <a href="/terms/">Terms of Service</a>
        <a href="/accessibility/">Accessibility</a>
        <a href="/sitemap.xml">Sitemap</a>
      </nav>
    </div>
  </div>
</footer>

<a class="float-call" href="tel:{TEL}" data-cta="float-call">{ico('phone')}Call {PHONE}</a>

<div class="call-bar">
  <a class="btn btn-call" href="tel:{TEL}" data-cta="mobile-bar-call">{ico('phone')}Call Now</a>
  <a class="btn btn-ghost" href="{MAILTO}" data-cta="mobile-bar-email">{ico('mail')}Email Us</a>
</div>
</body>
</html>
"""


# ---------------------------------------------------------------- crumbs
def crumbs(items):
    """items: list of (label, href|None). The final item has href None.

    The separator is a real element inside the same <li> as its link, so it
    wraps with that link and is never stranded at the start of a new line.
    """
    last = len(items) - 1
    lis = []
    for i, (label, href) in enumerate(items):
        sep = '' if i == last else '<span class="crumb-sep" aria-hidden="true">/</span>'
        if href:
            lis.append('<li><a href="%s">%s</a>%s</li>' % (href, label, sep))
        else:
            lis.append('<li><span class="crumb-current" aria-current="page">%s</span>%s</li>'
                       % (label, sep))
    return ('<nav class="crumbs" aria-label="Breadcrumb"><ol>%s</ol></nav>'
            % "".join(lis))


def crumb_schema(items):
    el = []
    for i, (label, href) in enumerate(items, 1):
        d = {"@type": "ListItem", "position": i, "name": label}
        if href:
            d["item"] = SITE + href
        el.append(d)
    return {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": el}


# ---------------------------------------------------------------- schema
def local_business(extra_area=None):
    return {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "EmergencyService"],
        "@id": SITE + "/#business",
        "name": NAME,
        "url": SITE + "/",
        "telephone": TEL,
        "email": EMAIL,
        "image": SITE + "/assets/img/og-image.jpg",
        "logo": SITE + "/assets/img/logo.png",
        "description": ("24/7 emergency restoration company serving Dallas-Fort Worth. Water damage "
                        "restoration, fire and smoke damage cleanup, mold remediation, storm damage "
                        "repair, junk removal and full property renovation."),
        "address": {
            "@type": "PostalAddress",
            "streetAddress": STREET,
            "addressLocality": CITY,
            "addressRegion": REGION,
            "postalCode": ZIP,
            "addressCountry": "US",
        },
        "geo": {"@type": "GeoCoordinates", "latitude": GEO[0], "longitude": GEO[1]},
        "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00", "closes": "23:59",
        }],
        "areaServed": [{"@type": "City", "name": n + ", TX"} for _, n in CITIES] +
                      ([extra_area] if extra_area else []),
        "priceRange": "$$",
        "currenciesAccepted": "USD",
        "paymentAccepted": "Cash, Check, Credit Card, Insurance Direct Billing",
        "knowsAbout": [n for _, n in SERVICES],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Restoration Services",
            "itemListElement": [
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": n,
                 "url": SITE + "/services/" + s + "/"}}
                for s, n in SERVICES
            ],
        },
    }


def organization():
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": SITE + "/#organization",
        "name": NAME,
        "url": SITE + "/",
        "logo": {"@type": "ImageObject", "url": SITE + "/assets/img/logo.png",
                 "width": 955, "height": 744},
        "telephone": TEL,
        "email": EMAIL,
        "founder": {"@type": "Person", "name": "AJ Alqraini"},
        "contactPoint": [{
            "@type": "ContactPoint", "telephone": TEL, "contactType": "emergency",
            "areaServed": "US-TX", "availableLanguage": ["English"],
            "hoursAvailable": {"@type": "OpeningHoursSpecification",
                               "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday",
                                             "Friday", "Saturday", "Sunday"],
                               "opens": "00:00", "closes": "23:59"},
        }],
        "sameAs": [],
    }


def service_schema(name, desc, url, service_type=None):
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": name,
        "description": desc,
        "serviceType": service_type or name,
        "url": SITE + url,
        "provider": {"@id": SITE + "/#business"},
        "areaServed": [{"@type": "City", "name": n + ", TX"} for _, n in CITIES],
        "availableChannel": {
            "@type": "ServiceChannel",
            "servicePhone": {"@type": "ContactPoint", "telephone": TEL},
            "serviceUrl": SITE + url,
        },
    }


def faq_schema(pairs):
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q,
             "acceptedAnswer": {"@type": "Answer", "text": strip_tags(a)}}
            for q, a in pairs
        ],
    }


def webpage_schema(title, desc, url):
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": SITE + url + "#webpage",
        "url": SITE + url,
        "name": title,
        "description": desc,
        "isPartOf": {"@type": "WebSite", "@id": SITE + "/#website", "name": NAME, "url": SITE + "/"},
        "about": {"@id": SITE + "/#business"},
        "inLanguage": "en-US",
    }


def strip_tags(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s)).strip()


# ---------------------------------------------------------------- components
def faq_block(pairs, open_first=True):
    out = ['<div class="faq">']
    for i, (q, a) in enumerate(pairs):
        op = "true" if (open_first and i == 0) else "false"
        out.append(f'''<div class="faq-item" data-open="{op}">
  <button class="faq-q" type="button" aria-expanded="{op}" id="faq-q{i}" aria-controls="faq-a{i}">
    {q}<span class="faq-ico" aria-hidden="true"></span>
  </button>
  <div class="faq-a" id="faq-a{i}" role="region" aria-labelledby="faq-q{i}"><div>{a}</div></div>
</div>''')
    out.append("</div>")
    return "\n".join(out)


def cta_band(heading=None, sub=None):
    heading = heading or "Water doesn't wait. Neither do we."
    sub = sub or ("One call starts the clock. Tell us what happened and we will talk you "
                  "through the next steps — day, night, weekend or holiday.")
    return f"""<section class="band cta-band">
  <div class="wrap">
    <span class="eyebrow">Emergency dispatch &middot; open now</span>
    <h2>{heading}</h2>
    <p class="lede">{sub}</p>
    <a class="cta-phone" href="tel:{TEL}" data-cta="cta-band">{PHONE}</a>
    <div class="btn-row">
      <a class="btn btn-call btn-lg pulse" href="tel:{TEL}">{ico('phone')}Call Now &mdash; 24/7</a>
      <a class="btn btn-ghost btn-lg" href="{MAILTO}">{ico('mail')}Email for a Free Estimate</a>
    </div>
  </div>
</section>"""


def aside_call(title="Damage right now?", body=None):
    body = body or "Our line is answered around the clock. Tell us what happened and we will talk you through what to do next."
    return f"""<aside class="aside-card">
  <h3>{title}</h3>
  <p>{body}</p>
  <a class="num-lg" href="tel:{TEL}">{PHONE}</a>
  <a class="btn btn-call btn-block" href="tel:{TEL}">{ico('phone')}Call Now</a>
  <a class="btn btn-outline-light btn-block aside-email" href="{MAILTO}">{ico('mail')}Email for a Free Estimate</a>
  <p class="aside-note">Available 24/7 &middot; <span data-clock>—</span></p>
</aside>"""


def aside_services(current=None):
    lis = "".join(
        '<li><a href="/services/%s/">%s</a></li>' % (s, n)
        for s, n in SERVICES if s != current
    )
    return f'<aside class="aside-plain"><h3>All restoration services</h3><ul>{lis}</ul></aside>'


def aside_cities(current=None):
    lis = "".join(
        '<li><a href="/service-areas/%s/">%s, TX</a></li>' % (s, n)
        for s, n in CITIES[:12] if s != current
    )
    return (f'<aside class="aside-plain"><h3>Cities we cover</h3><ul>{lis}'
            f'<li><a href="/service-areas/">See all 29 areas &rarr;</a></li></ul></aside>')


def trust_strip():
    items = [
        ("clock", "Answered 24/7/365"),
        ("shield", "Licensed &amp; Insured"),
        ("doc", "Insurance Claim Support"),
        ("zap", "Rapid Local Dispatch"),
        ("users", "Locally Owned"),
        ("award", "Satisfaction Guaranteed"),
    ]
    inner = "".join('<div class="trust-item">%s%s</div>' % (ico(k), v) for k, v in items)
    return ('<section class="trust-strip"><div class="wrap"><div class="trust-track">%s</div></div></section>'
            % inner)


def write(path, html):
    """path like 'services/water-damage-restoration' -> services/water-damage-restoration/index.html"""
    full = os.path.join(OUT, path) if path else OUT
    os.makedirs(full, exist_ok=True)
    with open(os.path.join(full, "index.html"), "w", encoding="utf-8") as f:
        f.write(html)
    return os.path.join(path, "index.html")
