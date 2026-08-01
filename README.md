# rapidresponsedfw.com — Build Handoff (v5)

**Build stamp: `f983ab75-149b2888`** — check line 1 of any page's HTML source to
confirm which version you are looking at. See `HOW-TO-CHECK-VERSION.txt`.

**58 pages · 87,500 words · 277 JSON-LD blocks · 4.4 MB**

There are no forms on this site. Every contact action is `tel:+17085068917` or a
prefilled `mailto:`.

---

## What changed in v5 — cache busting

The stylesheet is now served as `/assets/css/style.css?v=<hash>`, where the hash
is derived from the file's own contents. Same for `main.js`.

This matters because the previous builds kept the same filename every time. A
browser that had already downloaded `style.css` had no reason to fetch it again,
so CSS fixes appeared not to have been applied even though they were in the
files. Hashed URLs make that impossible — changed CSS is always a new URL, and
unchanged CSS still caches normally.

It also makes the aggressive `Cache-Control: immutable` header in `_headers`
correct rather than risky, which is the pairing you want in production.

Every page also carries a build stamp as the first line of source.

---

## Deploy

Upload everything **except** `_source/`, `README.md` and
`HOW-TO-CHECK-VERSION.txt` to the web root.

| Host | Clean URLs | Notes |
|---|---|---|
| Netlify / Vercel / Cloudflare Pages | automatic | `_headers` applies security + cache headers. Drag-and-drop works. |
| Apache / cPanel | `.htaccess` included | Extensionless URLs, `.html` → `/` redirect, 404, compression. |
| GitHub Pages | automatic | Add a `CNAME` file containing `rapidresponsedfw.com`. |
| Nginx | needs config | `try_files $uri $uri/index.html =404;` |

---

## Content (unchanged from v4)

87,500 words total, up from 74,100 in v3.

- **Service pages 1,921–2,621 words.** Each gained a "what drives the price"
  factor grid and a four-phase "what to expect, and roughly when" timeline. No
  invented dollar figures.
- **City pages 1,239–1,443 words.** Each gained a per-city seasonal damage
  pattern, commercial property character, and rendered neighbourhood and ZIP
  coverage lists.
- **Home 3,522** — DFW seasonal causes section.
- **About 1,300** — what we take on vs refer out, who we work with, how to vet
  any restoration company.
- **Contact 1,364** — five-step "what happens next" timeline, plus an
  eight-question FAQ with FAQPage schema.
- **Insurance 1,627** — twelve-term plain-English glossary and a "mistakes that
  cost people money" section.

---

## The three reported issues — current state

All three were fixed in v3 and remain fixed. Verified in this build:

| Issue | Measured result |
|---|---|
| Breadcrumb alignment | 5 items, centre-line variance **0.00px**, all at 13.76px. Current page differs by weight (600 vs 500), not size. |
| Claims-card email button | Label `rgb(255,255,255)`, icon `rgb(255,255,255)`, border `rgba(255,255,255,0.5)`. |
| Footer Call Now / Email Us | Both `rgb(255,255,255)`, both 46px tall. Email address breaks at the `@`. |

Root causes, for the record:

- **Breadcrumb** — a 44px touch-target rule I added in an earlier pass applied
  to `.crumbs a` while the separator was a `::after` pseudo-element on the
  `<li>`, leaving them on different baselines. The separator is now a real
  element sharing one box model with the links.
- **Claims-card button** — was `.btn-outline` (navy text, for light
  backgrounds) sitting on a navy card. Now `.btn-outline-light`.
- **Footer buttons** — `.site-footer a` out-specified `.btn-call` and forced
  grey text and a grey icon. Scoped to `.site-footer a:not(.btn)`.

---

## Single source of truth

`_source/lib.py` holds all company data, shared components and schema builders:

```python
SITE, NAME, PHONE, TEL, EMAIL, EMAIL_WRAP, STREET, CITY, REGION, ZIP, GEO
EMAIL_SUBJECT, EMAIL_BODY, MAILTO
CSS_V, JS_V, BUILD          # content hashes, computed at build time
SERVICES                     # 19 (slug, name)
CITIES                       # 29 (slug, name)
```

## Regenerating

```bash
cd _source
python3 page_home.py
python3 page_services.py
python3 page_cities.py
python3 page_misc.py
```

Run all four after any CSS change so the hash in every page updates.

| Edit this | To change |
|---|---|
| `lib.py` | company data, header, footer, breadcrumbs, CTAs, schema, icons |
| `content_services.py` / `_ext.py` | service page long-form copy |
| `content_services_cost.py` | cost factors and timelines |
| `content_cities.py` | city intro, neighbourhoods, landmarks, ZIPs, stock, risk |
| `content_cities_extra.py` | per-city seasonal pattern and commercial character |
| `page_home.py` → `EXPECT` / `CAUSES` | homepage card sections |
| `page_misc.py` → `CONTACT_FAQ` / `GLOSS` | contact FAQs, insurance glossary |

---

## Verified in this build

- 58 pages, one identical build stamp across all of them
- 277 JSON-LD blocks parse; zero broken links (query strings handled)
- No horizontal overflow, 320–1920
- Every `.btn` renders white or navy — no muted inheritance
- No `href="#"`, dead fragments, duplicate IDs or heading skips
- Every `tel:` is `tel:+17085068917`; every `mailto:` prefilled
- No duplicate titles or descriptions; one H1 per page
- No Review or AggregateRating schema; no fabricated claims
- No JavaScript console errors

---

## Still outstanding

1. **Real job photos** for the before/after slider (currently labelled as an
   illustration).
2. **Real reviews** — add Review schema only once verifiable reviews exist.
3. **The 708 area code is a Chicago number** on a Dallas emergency site.
4. **Move off Gmail** — `aj@rapidresponsedfw.com`.
5. **Google Business Profile** — the map pack drives more emergency calls than
   organic.
6. **Self-host the fonts** for the last few Lighthouse points.
