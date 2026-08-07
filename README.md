# Timber Roofing & Exteriors — Website

Production static site. 167 pages generated from a central content layer.
Built for GitHub Pages (or any static host) with **directory-style clean URLs** —
no `.html` appears in any link anywhere on the site.

```
node build.js                       # regenerate /site
cd site && python3 -m http.server 8080   # preview at http://localhost:8080
python3 scripts/optimize-images.py  # re-run after adding photos
```

---

## 1. Site strategy

**Who this page is for:** a North Texas homeowner who just found granules in the
gutter, or whose street took hail last Tuesday. They are anxious, they are about
to be doorknocked by six contractors, and they cannot tell who is legitimate.

**The single job of this website:** make Timber the obvious choice by being the
only site in the search results that tells them the truth — including the truth
that sometimes their roof is fine.

Three strategic bets, and each is visible in the build:

1. **Honesty as the differentiator.** Competitors' sites promise insurance
   outcomes and hint at warranties. This one says plainly what Timber is not
   (`/insurance-restoration-disclaimer/`), recommends repair over replacement
   where repair is right, and ships zero invented credentials. That is the
   trust asset, and it is also what Google's helpful-content systems reward.
2. **Depth over page count.** Every service page explains signs, causes,
   inspection approach, process, options, and North Texas specifics. No page
   exists purely to hold a keyword.
3. **Real photography, honestly labelled.** All eight supplied photos are used.
   Captions describe what is visible, nothing more (see §9 on the comparison).

**Conversion path:** free inspection is the only ask, repeated at hero, mid-page,
end of page, sticky mobile bar, header, and footer — six touchpoints without
nagging. Secondary: call, email, gallery engagement.

---

## 2. Sitemap

| Section | Pages |
|---|---|
| Core | Home, About, Contact, Projects, Service Areas, Resources, Storm Damage, Sitemap |
| Roofing hub + services | `/roofing/` + 16 service pages |
| Exterior hub + services | `/exteriors/` + 12 service pages |
| Projects | Index + 8 project detail pages |
| Locations | `/service-areas/` + 41 county hubs + 63 city pages |
| Resources | Index + 8 published articles (7 more outlined) |
| Legal / utility | Privacy, Terms, Accessibility, Disclaimer, Insurance Disclaimer, Thank You, 404, HTML Sitemap |

**124 indexable pages** in `sitemap.xml`. **43 built but noindexed** — see §10.

URL scheme: `/roofing/roof-replacement/`, `/exteriors/gutter-installation/`,
`/service-areas/frisco/`, `/service-areas/collin-county/`, `/projects/<slug>/`,
`/resources/<slug>/`.

---

## 3. Visual design system

Everything is derived from the logo rather than from a generic contractor palette.

**Colour** (`src/assets/css/site.css`, `:root`)

| Token | Hex | Where it's allowed |
|---|---|---|
| `--ink` | `#08090B` | The logo's ground. Primary dark surface. |
| `--slate` | `#15181D` | Raised dark panels and cards |
| `--silver-1/2/3` | `#F5F7F9` → `#8B939E` | Text on dark, hairline rules |
| `--red` | `#C41230` | Primary action, eyebrow labels, step numbers |
| `--navy-deep` | `#0A2148` | The storm band only |
| `--amber` | `#F2A93B` | **Signature — see below** |
| `--cedar` | `#8A6B4C` | Reserved for fencing/exterior accents |

**Typography** — `Archivo` 600/700/800 for display (squared and engineered, like
the chiselled logo lettering, without being Oswald or Bebas), `Inter` 400/500/600
for body, and a **system monospace** for eyebrows, step numbers, and project
tables — the spec-sheet voice of the trade, at zero font-loading cost.

**The signature: the lit window.** The one warm detail in the logo is the amber
window under the roofline — someone is home under that roof, which is the whole
brand promise. So amber appears in exactly four places and nowhere else:

- the loader ends by lighting the window
- a 4-pane window mark warms up on card and link hover (`.win`)
- the final CTA is a full-width gable silhouette with a single lit window
- focus rings

Everything else is disciplined black, white, silver, and red. That restraint is
the point — one accessory, worn well.

**Roof geometry as structure, not decoration.** One pitch angle recurs
throughout: cards, buttons, and gallery tiles are notched at the top-right
(`clip-path`, `--notch: 22px`) echoing a roof rake, and the `.ridge` rule draws a
shallow gable line. Numbered markers appear **only** where the content is
genuinely sequential — the six-step process and article tables of contents.

---

## 4. Component architecture

```
src/
├── content/          ← the only files you edit for copy changes
│   ├── company.json          NAP, trust claims, CTA labels, pending-approval list
│   ├── site.json             nav, homepage FAQs, process, form options, footer
│   ├── services-roofing.json 16 services
│   ├── services-exterior.json 12 services
│   ├── counties.json / cities.json
│   ├── projects.json         gallery, comparison, testimonials (empty by design)
│   ├── articles.json         published + outlined
│   └── image-manifest.json   auto-generated, do not hand-edit
├── lib/core.js       esc, <picture> builder, icons, <head>, all JSON-LD builders
├── templates/
│   ├── layout.js     header, mobile nav, loader, trust strip, breadcrumbs,
│   │                 FAQ, CTA banner, finale, lead form, footer, sticky bar
│   └── pages.js      home, service, hub, storm hub, projects, project detail,
│                     areas hub, county, city, about, contact, article, legal,
│                     thank you, 404, HTML sitemap
├── assets/css/site.css
└── assets/js/site.js
build.js              renders everything + validates + emits sitemap/robots
scripts/optimize-images.py
```

**Adding a city** is one object in `cities.json` with real local detail, then
`node build.js`. **Adding a project** is one entry in `projects.json` plus the
photo in `scripts/optimize-images.py`'s `PHOTOS` map.

---

## 5. Homepage structure

Hero (split, photo bleeds to the viewport edge) → trust strip → four value cards
→ six featured services → company introduction → **condition comparison slider**
→ six-step process → storm band (navy, visually distinct) → gallery preview →
service-area section with Texas silhouette and the three coverage rings →
why-Timber → FAQ (8, with `FAQPage` schema) → final CTA with the lit gable.

---

## 6. Service page structure

Hero with service photo → intro + on-page nav → **signs** → **causes** +
**inspection approach** side by side → **process** (numbered, dark band) →
**material/solution options** → benefits + related services + service-area links
→ **FAQs** → free inspection CTA. Breadcrumbs throughout.

Each page carries unique title, meta description, `Service` schema,
`BreadcrumbList`, and `FAQPage`.

---

## 7. Location page system

Two tiers: **county hubs** (context on the county's housing stock and storm
exposure, links to its cities) and **city pages**.

Every city page has three genuinely unique fields written per city — `intro`,
`housing`, `local` — plus a city-specific FAQ. No paragraph is repeated across
cities. Frisco talks about cut-up rooflines and drone inspection; Richardson
talks about mature canopy and shallow pitches; Burleson talks about being first
in the storm track. That is the difference between a location page and a doorway
page, and the build warns if a city ships with placeholder text.

Each emits `RoofingContractor` schema scoped to that city (as
`parentOrganization` of the main entity), `BreadcrumbList`, and `FAQPage`.

---

## 8. SEO and schema plan

**Emitted:** `Organization` / `RoofingContractor` + `LocalBusiness` (site-wide,
`@id`-linked), `WebSite`, `BreadcrumbList` (every page), `Service` (every service
page), `FAQPage` (only where the questions are visibly rendered), `Article`
(resources), `ImageObject` (project details), `ContactPage`.

**Deliberately absent:** `aggregateRating`, `Review`, `PostalAddress`,
`foundingDate`, `award`, and `hasCredential`. None of it is verified, and fake
review schema is a manual-action risk, not a shortcut.

**Technical:** semantic HTML, exactly one H1 per page (build-enforced), canonical
on every page, OG + Twitter cards, `sitemap.xml` with priority weighting,
`robots.txt`, HTML sitemap, `.nojekyll`, `CNAME`.

**The build fails loudly on:** broken internal links, duplicate titles or meta
descriptions, more than one H1, orphan pages, missing image references, and
placeholder text. Current status: **zero problems, zero warnings.**

**Performance:** WebP with JPEG fallback at 3–4 widths each, explicit
`width`/`height` on every image (no CLS), `fetchpriority="high"` + a matching
`<link rel="preload">` on the LCP image only, lazy loading below the fold,
async-loaded fonts with two families and two weights each, ~8 KB of JS,
GPU-friendly transforms. Pages gzip to **8–12 KB**.

**Analytics:** wiring points are marked in `<head>` and `site.js` already pushes
`call_click`, `email_click`, `form_start`, `form_submit`, `gallery_filter`,
`comparison_interact`, and `page_engagement` to `dataLayer`. **No placeholder
tracking IDs are shipped** — drop the GTM or GA4 snippet in and events flow.

---

## 9. Loading animation plan

Near-black ground → Texas silhouette traces in (`pathLength="100"`, so one dash
value drives every path) → roofline traces → **the window lights amber** →
`TIMBER` fades up → red and navy rules resolve → tagline → fade to hero.

Roughly **1.2–1.7 s, first visit per session only** (`sessionStorage`). Skipped
entirely for `prefers-reduced-motion`, `saveData`, `effectiveType` 2g, and
devices reporting under 2 GB memory. Any interaction dismisses it instantly.
It renders as pure inline SVG — no images, no blocking requests — so it does not
delay the hero photograph's download, and it removes itself from the DOM after.

---

## 10. Pending Drew's approval

Nothing on this site was invented. These items are gated until he confirms them.

**Built, `noindex`, and unlinked** — preview by URL, flip `status` to `active`
in the service JSON to publish:

`/roofing/emergency-roof-tarping/` · `/roofing/roof-maintenance/` ·
`/roofing/roof-ventilation/` · `/roofing/roof-flashing-repair/` ·
`/roofing/chimney-roof-penetration-repair/` · `/roofing/new-construction-roofing/` ·
`/exteriors/gutter-guards/` · `/exteriors/fascia-soffit-repair/` ·
`/exteriors/siding-repair/` · `/exteriors/siding-installation/` ·
`/exteriors/exterior-painting/`

**Also awaiting confirmation:**

- **28 distant counties + Corsicana** — built but `noindex` until Drew confirms
  he actively accepts work there. `approvalRequired: false` publishes them.
- **The comparison slider.** The two aerial photos are of **different houses**,
  so they are presented as a *condition comparison*, not a before-and-after — the
  labels say "Aged roof" / "New installation". If Drew supplies a genuine pair
  from one address, swap the slugs and set `mode: "before-after"`.
- **Drew's biography and portrait** — clearly marked placeholder on `/about/`.
- **Project specifics** — city, year, and material are `null` on most projects
  and simply do not render. Fill them in as he confirms.
- **Testimonials** — the section exists and stays hidden until real ones are
  added. Do not seed it.
- **Warranty language** — absent everywhere by design.
- **A physical address** — none published; schema omits `PostalAddress`.
- **Analytics IDs**, Google Business Profile URL, and social profiles.
- **Two photos** (`brick-home-gray-shingle-roof`, `red-brick-home-gutters-downspouts`)
  may show house numbers or a mailbox at small scale. Worth a quick blur before
  launch as a courtesy to those homeowners.
- **Legal pages** are solid general templates for a Texas contractor and should
  get an attorney's eye before launch.

---

## Deployment

The `site/` folder is the deployable artifact — push its contents to the
`gh-pages` branch or point any static host at it. `.nojekyll` and `CNAME`
(`www.timberroofingandexteriors.com`) are already in place.

**Form handling** is the one server-side piece left. The form posts to
`/thank-you/` and carries hidden attribution fields (`attr_source`,
`attr_medium`, `attr_campaign`, `attr_landing`, `attr_referrer`, `attr_page`),
a honeypot, and a submit-timing check. Point `action` at Formspree, Netlify
Forms, or a Cloudflare Worker. Server side, still validate every field
independently, rate-limit by IP (10/hour is plenty), and cap uploads at ~10 MB —
client-side validation is a courtesy, never a control.

---

## Pass 3 — redesign and technical correction

### The duplicate CSS was real. Here is what caused it.

`site.css` had ~675 lines duplicated. Root cause: an earlier edit spliced the
stylesheet with

```js
const end = s.index('@media (prefers-reduced-motion: reduce) {');
```

That string first occurs at line 80, *above* the loader block being replaced, so
`s.slice(end)` re-appended everything from line 80 onward. The two copies then
drifted as later edits touched only one of them, which meant several rules
existed twice with different values and the cascade winner was whichever
happened to sit lower. Not a build-concatenation problem — a source problem.

Fixed by rewriting the stylesheet once, cleanly: **83 KB → 50.7 KB, 482 rules,
0 byte-identical duplicates.** `build.js` now fails the build if any rule
appears twice with an identical body (responsive overrides repeat a selector
with a *different* body, so they do not trip it).

Also removed: the before/after slider CSS and JS, the house/window SVG and its
styles, the `clip-path` corner notches, the metallic text-gradient treatment,
and every "loader on every page" code path.

### Loader — once per session

- Decision happens in a **head script, before first paint**, so nothing behind
  it can flash.
- The session marker is set **immediately**, so rapid navigation cannot fire it
  twice.
- Internal links, back/forward, and bfcache returns never replay it.
- **The artwork is not fetched at all on later pages** — the `<img>` ships with
  no `src`, and a two-line script after the markup either assigns the source or
  removes the node. No `<link rel="preload">` for it anywhere.
- If `sessionStorage` throws, the loader is skipped entirely rather than risking
  trapping anyone.
- Failsafes: minimum 1.1 s, ceiling 1.5 s, 3 s hard clear in JS, plus an
  independent 3.5 s `overflow` reset in the head script that does not depend on
  `site.js` loading at all.

### Header lockup — rebuilt, not resized

The old header paired a cropped 3D metallic emblem with flat HTML text. Those
two things were never designed together, which is why no amount of width
adjustment fixed it.

`scripts/make-brand-marks.py` now composites a real horizontal lockup from the
**approved artwork on both sides** — the Texas-and-roof emblem beside the
logo's own metallic "TIMBER" and red "ROOFING & EXTERIORS" — keyed transparent,
trimmed to tight bounds, optically balanced. No re-typed wordmark, no font
mismatch.

- `timber-lockup-h` (4.42:1) — desktop and tablet
- `timber-lockup-hc` (4.40:1) — emblem + TIMBER, for mobile
- `timber-stack` — full vertical mark, for loader, footer, About, Contact

Served as one `<picture>` with a `media` source, so **exactly one lockup is
downloaded**, `object-fit: contain`, intrinsic dimensions on the tag, and the
two variants share an aspect ratio so the breakpoint swap causes no shift.

### Service Areas navigation

Generated from `counties.json` + `cities.json`, so new locations appear
automatically.

- **Desktop mega menu** — 2/3/4 columns by viewport, county heading with city
  count, city links, "All N cities" overflow, note about scope-dependent
  availability, and a View-all CTA. Anchored to the header container
  (`position: static` on the trigger `li`) rather than to the `li` itself,
  which is what stops it running off the left edge at 1120–1280px. Opens on
  hover and focus, closes on Escape, internally scrollable, capped at 70vh.
- **Mobile accordion** — county → cities, one panel open at a time, real
  `aria-expanded` on chevron buttons, separate link to each county hub, large
  targets. Cities are not dumped on open.

### Removed, as requested

- The before/after comparison slider — replaced by an editorial **Featured
  work** section: one large project image, two supporting images, project
  summary, work performed, material, and a general DFW location. No handle, no
  "aged roof" label, no unverifiable before/after claim.
- The house-and-glowing-window graphic — the final CTA is now a dark panel with
  a **real aerial roof photograph breaking the grid**, headline "Protect Your
  Home With a Roof You Can Rely On.", phone, email, and reassurance line.

### Design system

Lighter and warmer. Content sections are warm neutral (`#F7F6F3`), feature
sections are deep charcoal (`#17191D`, not pure black), navy carries depth, and
Texas red is reserved for action. Silver survives only as hairlines. Consistent
12/18px radii replace the notched corners. Larger editorial type, asymmetric
splits, and a service grid with real hierarchy — one lead tile, three
supporting, one wide exterior tile — instead of rows of identical cards.

### Mobile edge and safe-area

17 `env(safe-area-inset-*)` declarations across the container, announcement bar,
header, drawer, sticky bar, and lightbox. The header call control is now a
44×44 button inside the padded container. Announcement text truncates rather
than wrapping into a banner. Verified: no fixed pixel widths in the stylesheet
that could overflow a 320px viewport.

### Verified after this pass

167 pages · 0 broken links · 0 duplicate metadata · exactly one H1 per page
(now checked on noindex pages too) · 0 orphans · 372 JSON-LD blocks all valid ·
1,345 images all with alt text · 0 buttons without an accessible name ·
0 before/after or house-window remnants · loader gate present on every page ·
CSS 10.9 KB gzipped, JS 5.8 KB gzipped, pages 11–16 KB gzipped.

**Still not verified, because this container has no browser:** rendered
appearance at each breakpoint and real-device behaviour. Serve `site/` and walk
320 / 360 / 390 / 430 / 768 / 1024 / 1180 / 1280 / 1440 before showing Drew.

---

## Pass 4 — correction pass

### 1. Header logo, rebuilt (again — but this time the right diagnosis)

The previous lockup was 4.42:1 and rendered at 44px tall, which left
"ROOFING & EXTERIORS" about **6px tall — genuinely unreadable**. That is why it
kept reading as undersized and unbalanced no matter how the width was adjusted.

`scripts/make-brand-marks.py` now measures the alpha coverage of the stacked
artwork to locate its three elements, then rebuilds a true horizontal lockup
with the wordmark column set **larger relative to the emblem than in the
stacked original** — because horizontally there is room for it, and that is what
makes the second line legible at navigation size.

| Mark | Ratio | Use |
|---|---|---|
| `timber-lockup-h` | 5.16:1 | desktop / tablet header |
| `timber-lockup-hc` | 4.47:1 | emblem + TIMBER, mobile header |
| `timber-stack` | 1.04:1 | loader and footer only |

Header heights raised to 32 / 34 / 38 / 44 / 48px by breakpoint. Verified fit:

```
320px viewport: logo 143 + call 44 + burger 44 + padding 37 = 284px (36px spare)
360px            152 + 44 + 44 + 41 = 297px (63px spare)
390px            152 + 44 + 44 + 45 = 301px (89px spare)
430px            152 + 44 + 44 + 49 = 305px (125px spare)
```

Served as one `<picture>` with a `media` source, so exactly one file downloads.
`object-fit: contain`, intrinsic dimensions on the tag, no cropping anywhere.

### 2. Header colour now blends

The announcement bar was navy, the header was a translucent grey slab, and the
hero was near-black — three tones stacked, which read as banding. Now the
announcement bar, the header, and the dark opening section all sit on the same
`--ink` value, and **the header carries no colour of its own until you scroll**
(it was previously transparent on the homepage only). On scroll it resolves to
`rgba(23,25,29,.82)` with a blur and a hairline. The 404 page, which opens
light, keeps a solid header.

### 3. Loader — verified, not just asserted

The session logic was already correct in the code you sent, so rather than
change it again I extracted the shipped gate script and **executed it** against
a simulated session:

```
1. enter homepage          SHOWS LOADER
2. click Roofing           skipped
3. click a city page       skipped
4. browser back            skipped
5. county page             skipped
6. contact page            skipped
7. NEW tab / new session   SHOWS LOADER
storage blocked            skipped (fails safe, never traps)
```

Also confirmed: the gate runs before the loader markup, the loader `<img>`
ships with **no `src`** so the artwork is not downloaded on later pages, and
both inline scripts parse without error.

If you were still seeing it every page, you were looking at the pass-2 build —
that one deliberately ran on every load, which is what you had asked for at the
time.

### 4. Service Areas navigation — confirmed working

Generated from `counties.json` + `cities.json`:

- **Desktop mega menu:** 8 counties with live city counts — Dallas (13),
  Collin (12), Tarrant (11), Denton (7), Rockwall (4), Ellis (4), Kaufman (3),
  Grayson (3) — county hub links, city links, and a View-all CTA.
- **Mobile accordion:** 12 county panels, one open at a time, real
  `aria-expanded`, separate link to each county hub. No cities shown on open.

### 5. Decorative graphic — gone

No Texas map SVG, no gable illustration, no glowing window anywhere in `src` or
`site`. Also removed the **large stacked-logo badge cards** from the About and
Contact sidebars, which were the remaining decorative badges. Service areas are
now presented purely as county headings and city links.

### 6. All 14 photographs are in

Two needed work before they could ship:

- **`11.jpg` was captured sideways** — rotated 90° in the pipeline so the deck
  and house sit at the top of frame and the newly-set posts read upright.
- **`13.jpg` had a legible vehicle licence plate** — pixelated before any
  derivative is written. Both corrections live in
  `scripts/optimize-images.py`, so they survive a rebuild.

Result: **14 photos, 14 gallery tiles, all 14 lightbox-enabled, none missing.**
Category filters grew to six — Roof Replacement, Gutters, Fencing, Decks &
Structures, Exterior Improvements, Drone Views — and six new project detail
pages were generated (173 pages, up from 167).

### 7. Interface

Removed the last row of identical cards on the homepage: the six-card storm
grid is now an editorial split — a tall aerial photograph beside a two-column
definition list. One card grid remains on the homepage (the three resource
previews), which is variety rather than repetition.

### Verified

173 pages · 0 broken links · 0 duplicate metadata · one H1 each · 0 orphans ·
384 JSON-LD blocks all valid · 1,411 images all with alt text · 0 buttons
without an accessible name · 0 inline-script errors · `site.js` parses ·
stylesheet 52.1 KB with **0 byte-identical rules** · CSS 11.2 KB gzipped,
JS 5.8 KB gzipped, pages 10–16 KB gzipped.

**`public/` is included in the ZIP this time.** The previous package omitted it,
which meant the image and brand pipelines could not be re-run from the archive.

### One thing I need from you

The original 1254px logo master was not in this upload, so the brand marks were
re-derived from `timber-stack-480.png`. They are sharp at the sizes used, but if
you re-supply the master, point `SRC` in `scripts/make-brand-marks.py` at it and
raise `BASE` — the lockups will regenerate sharper for 3x screens.

**Still not verified, because this container has no browser:** rendered
appearance at each breakpoint. Serve `site/` and walk 320 / 360 / 390 / 430 /
768 / 1024 / 1280 / 1440.

---

## Pass 5 — the header, and the contrast bug behind most of it

### Why the header rendered white

`position: sticky` keeps an element **in normal flow** — it occupies its own row
at the top of the document, above the hero, and only overlays content once you
scroll past it. So `background: transparent` on a sticky header does not reveal
the hero photograph; it reveals the page background, which is white.

That single mistake produced most of what the screenshots showed: silver
metallic wordmark on white (invisible), grey nav links on white (invisible),
and the "CALL US / 469-371-9599" block washed out to nothing.

The header is now **always solid `--ink`**, the same value as the announcement
bar and every page's opening section, so the three read as one continuous
surface with no seam. The scrolled state now only adds a hairline and a shadow.

### The stray red underlines in the nav

`.nav__link` had no `position: relative`, so its `::after` active bar anchored
to the nearest positioned ancestor — the `<li>` for dropdowns, or `.hdr__in`
for the mega-menu trigger, which is deliberately `position: static`. That is
why red bars appeared under empty space between items. One line fixed it.

### The invisible buttons — measured, not guessed

The outline buttons were rendering their label in `var(--text)` (#1F2328) on
`--ink` (#17191D). I ran the numbers:

| Pair | Before | After |
|---|---|---|
| Outline button label on dark | **1.11:1** | **15.72:1** |
| Body copy in the final CTA | **2.64:1** | **9.21:1** |
| Eyebrow label on dark | 3.01:1 | 9.08:1 |
| Muted text on white | 3.49:1 | 4.93:1 |

1.11:1 is essentially invisible, which is exactly what you were seeing.

The cause was structural: dark-surface overrides were written per component and
only listed `.ink`, `.dark`, `.navy` — they never covered `.hero`, `.phead`,
`.finale`, `.creds`, or `.drawer`. Rather than add more overrides, dark surfaces
now declare a set of **inherited foreground tokens** (`--fg-1/2/3`, `--hair`,
`--accent`, `--eyebrow-c`, plus button tokens) once, and 35 components read
those instead of hard-coding a colour. Anything dropped on a dark surface from
now on gets the right contrast automatically. Every pair above now passes
WCAG AA. Also removed a dead `.dark` selector nothing ever carried.

### The page-height white gap

On service pages the intro column was short while the sidebar (spec strip plus
a six-link nav) was tall, so the grid row was sized by the sidebar and left a
screen of dead space. The intro and the "Signs" grid are now **one column
beside a sticky rail**, which balances the two and keeps the inspection CTA in
view as you read. The rail carries the spec strip, the CTA, and the on-page nav.

### Service-area counts removed

The little city-count numbers are gone from the mega menu. Each county now
shows its name and its city links, with a "More in Dallas →" link where the
list runs long.

### Mobile menu

The accordion collapse logic was doing DOM-depth arithmetic
(`parentNode.parentNode.parentNode`) to decide which panels were siblings —
fragile and hard to reason about. It now compares the actual parent list, so
opening a county closes only other counties and never the Roofing panel above
it. The tapped row scrolls back into view when its panel expands, and the
scroll lock now also applies to `<html>` with `touch-action: none`, since iOS
Safari ignores `overflow: hidden` on `<body>` alone.

### Verified

173 pages · 0 broken links · 0 duplicate metadata · one H1 each · 0 orphans ·
384 JSON-LD blocks all valid · 1,411 images all with alt text · 0 unnamed
buttons · 0 inline-script errors · stylesheet 51.4 KB with 0 duplicate rules ·
all measured colour pairs pass AA · loader re-verified by execution
(`SHOW -> skip -> skip -> skip -> skip`).

---

## Pass 6 — the logo, rebuilt from scratch

### Why re-cropping the supplied logo was never going to work

The supplied artwork is a **3D chrome render with a grunge texture**, built for
large display. A navigation bar gives it about 44px of height. At that size its
secondary line lands at roughly **5px tall** and the metal texture turns to
noise. Three passes of re-cropping and rescaling could not fix that, because
the problem was the artwork's level of detail, not its framing.

So the header mark is now **drawn, not derived**:

- A Texas silhouette plotted from **real state coordinates** (lon -106.6..-93.5,
  lat 36.5..25.8, latitude-corrected so the proportions look right). The earlier
  path was a rough approximation that read as a shield.
- The roofline **knocked out of the silhouette** as negative space, with a red
  roof drawn over it — so the mark is background-independent and works on dark
  or light.
- Inlined as SVG: no HTTP request, crisp at any DPI, inherits colour, and
  cannot be clipped.

The wordmark beside it is **set in the site's own typeface** — "Timber" in
Archivo 700, "ROOFING & EXTERIORS" in tracked small caps in Texas red. Mark and
type now read as one designed system rather than an image sitting next to
unrelated text, which was the objection to the earlier attempt. I verified it
by rendering at 150 / 64 / 40 / 28px on both dark and light before wiring it in.

The **full detailed logo stays** where it has room to work: the loader and the
footer. The header raster lockups are deleted, which also removes two image
requests per page.

### Header controls

Dropdown carets on the four items that have menus (Roofing, Exterior Services,
Storm Damage, Service Areas) and nowhere else. The Call Us block is now
separated by a hairline rule with tracked small-caps labelling, and the header
CTA carries an inset highlight and a red-tinted shadow rather than reading as a
flat rectangle.

### Contact form removed

No form, so no Formspree or equivalent to pay for. The contact page now leads
with two direct-contact cards — call and email, each with a note on when to use
which — followed by a short "what to include" checklist so a call arrives with
useful context. The `/thank-you/` page, the form markup, and the form
JavaScript are all gone (**JS dropped from 6.0 KB to 4.8 KB gzipped**).

### Footer

The stray "Get a Free Inspection" button near the footer is gone. That column
now carries the four things the company can actually stand behind — free
inspections, free estimates, fully insured, licensed inspectors — as a quiet
list rather than a button competing with the CTA directly above it.

### Everything lands on six

You were right that a 5-step process and a 4-card options grid read as
unfinished. **Every service now has exactly 6 process steps and 6 options** —
40 process steps and 67 options added, all genuine work we perform or options
actually available for that service, not padding. The options grid is also
pinned to two columns, so any count reads as a balanced block rather than
leaving an orphan on the last row.

More depth added to the two pages you called out: **Exterior Storm Damage
Repair** and **Storm Damage Inspections** now carry deep-dive sections, a
homeowner timeline, and an inspection-findings grid.

### Verified

172 pages · 0 broken links · 0 duplicate metadata · one H1 each · 0 orphans ·
384 JSON-LD blocks all valid · 1,062 images all with alt text · 0 unnamed
buttons · 0 inline-script errors · 0 forms · 0 dangling thank-you references ·
every service at 6 process steps and 6 options · stylesheet 52.5 KB with 0
duplicate rules · CSS 11.5 KB gzipped, **JS 4.8 KB gzipped**, homepage 16.4 KB
gzipped.

### Still on the list

City pages beyond the 16 already expanded, and the remaining service pages
without deep-dive sections. The build prints the roadmap of which ones each
time it runs.

---

## Pass 7 — your logo, everywhere

You re-supplied the **1254px master**, which changes things. Every earlier
attempt was working from a 480px derivative, because the original had dropped
out of the uploads after pass 3. That is most of why the header mark kept
coming out soft.

The drawn vector mark is gone. Everything is now derived from your artwork.

### What changed

`scripts/make-brand-marks.py` was rewritten against the master. It removes the
black field by flood-filling from the four corners — so only the *contiguous*
background goes transparent and the interior darks (roof planes, chimney, the
shadow under the wordmark) survive — then composes a horizontal lockup from the
artwork's own three elements, with the wordmark column set larger relative to
the emblem than in the stacked original.

| Asset | Ratio | Used on |
|---|---|---|
| `timber-lockup-h` | 4.66:1 | header, tablet and up |
| `timber-lockup-hc` | 4.16:1 | header, mobile (emblem + TIMBER) |
| `timber-stack` | 1.04:1 | loader, footer, drawer |

The other half of the fix was **height**. The header now runs 96px on desktop
so the lockup can sit at 54px, where "ROOFING & EXTERIORS" is genuinely legible
rather than the ~5px it was getting before. The Texas flag colours, the house,
and the lit window all read at that size.

Rendered widths, verified against the available space:

```
320px viewport: logo 141px + call 44 + burger 44 + padding 37 = 282px (38px spare)
360px            158 + 44 + 44 + 41 = 303px (57px spare)
430px            158 + 44 + 44 + 49 = 311px (119px spare)
900px+           logo 224px      1120px+  logo 252px
```

Served as one `<picture>` with a media source, so exactly one file downloads
per page. `object-fit: contain`, intrinsic dimensions on the tag, no cropping,
no clipping.

### Where it appears

Verified programmatically across the build: **the real logo is in the header on
172/172 pages and in the footer on 172/172 pages**, plus the loader and the
mobile drawer. Favicons and the Open Graph card were regenerated from the same
master.

### Verified

172 pages · 0 broken links · 0 duplicate metadata · one H1 each · 0 orphans ·
384 JSON-LD blocks all valid · 1,406 images all with alt text · 0 unnamed
buttons · 0 inline-script errors · every referenced logo asset resolves ·
loader re-confirmed by execution (`SHOW -> skip -> skip -> skip -> skip`) ·
CSS 11.4 KB gzipped, JS 4.8 KB gzipped.

### Keep the master in the repo

`public/_originals/` holds your source photography. Drop the logo master in
there too and point `TIMBER_LOGO_SRC` at it, so the brand pipeline can be
re-run without needing the file re-uploaded. That is what caused the drift in
passes 4 through 6.

---

## Pass 8 — the logo, actually fixed

### What was chopping it, exactly

The stacked artwork was being sliced into horizontal bands (emblem / TIMBER /
sub-line) and each band was keyed for transparency **after** it was cropped.
Two things went wrong with that:

1. A band boundary puts dark artwork against the crop edge. **85% of the
   bottom edge of the emblem band is roof plane.** The corner flood-fill that
   removes the black background then runs straight into the roofs and eats
   them. That is the chop.
2. Worse, there is no boundary that works anyway: in the stacked artwork the
   **roof planes and the TIMBER wordmark physically overlap**. Every horizontal
   cut either clips the eaves or slices the letters.

I should have measured that in pass 4 instead of adjusting proportions six
times. Fixed both ways: the master is now keyed **once, whole**, before any
cropping — and the header no longer composes a lockup at all.

### The header uses your horizontal logo, whole

Your horizontal lockup is already composed correctly, so it is now used
directly: background keyed out, trimmed to tight bounds, **nothing recomposed,
cropped, or redrawn**. Texas with its full silver bevel, the house and lit
window, both roofs with their eaves, TIMBER, ROOFING & EXTERIORS, the tagline,
and the DFW plate — all present at every breakpoint.

| Viewport | Logo | Fits |
|---|---|---|
| 320px | 152 × 46 | 27px spare |
| 360–430px | 165 × 50 | 50–112px spare |
| 900px | 198 × 60 | — |
| 1120px+ | 224 × 68 | — |

Header height raised to 108px on desktop so it has room to sit properly. Both
source files are archived in `public/_originals/`, so the pipeline no longer
depends on a re-upload.

### Black-and-red interface

- **Dropdowns** are now near-black (`#0B0C0E`) with a red-tinted edge glow, red
  section headings, and links that shift red and slide right on hover.
- **Nav** items go red on hover and when active, on a black pill.
- **Secondary buttons** are black with red text and a red-tinted border, filling
  solid red on hover.
- **Footer** headings and link hovers are red; the sticky mobile bar matches.

One deliberate exception: the top-level nav labels stay light rather than red.
Brand red on the header charcoal measures **3.35:1**, which fails AA for text.
The red used throughout is `#E0565B` — same family, **5.27:1** on the panel
black. Every pair in the new theme passes: red headings 5.27, city links 10.25,
nav red on ink 4.74, footer headings 4.74, white on red fill 5.84.

### Service Areas menu — no scroll

The internal scroll is gone. Four columns, eight counties, five cities each
plus a "More in …" link, in one linear layout roughly 520px tall. The only
remaining scroll container in the stylesheet is the mobile drawer, which needs
it.

### Credibility strip

Rebuilt: each item now has a red-ringed check badge and a tracked uppercase
label on the panel black, separated by hairlines, rather than a plain tick and
sentence text.

### Verified

172 pages · your logo in the header on **172/172** and the footer on
**172/172** · 0 broken links · 0 duplicate metadata · one H1 each · 0 orphans ·
384 JSON-LD blocks all valid · 1,406 images all with alt text · 0 unnamed
buttons · 0 inline-script errors · every logo asset resolves · every colour
pair passes AA · loader re-confirmed by execution
(`SHOW -> skip -> skip -> skip -> skip`) · CSS 11.7 KB gzipped, JS 4.8 KB
gzipped.

---

## Pass 9 — sizing, responsiveness, alignment

### The header was overflowing, measurably

At its own breakpoint the header needed **1,353px of content in 1,120px of
space** — 233px of overflow, which `overflow-x: hidden` was quietly clipping.
That is why the CTA was cut off when you narrowed the window.

Rebuilt as a stepped budget, with every stage measured rather than guessed:

| Viewport | Logo | What shows | Headroom |
|---|---|---|---|
| 320px | 46px | logo + call + menu | 27px |
| 390px | 60px | logo + call + menu | 43px |
| 768px | 76px | logo + call + menu | 325px |
| 900–1119px | 82px | logo + call + menu | 554px |
| 1120px | 62px | full nav + call | 62px |
| 1280px | 68px | full nav + CTA | 71px |
| 1440px | 76px | full nav + CTA | 124px |
| 1600px | 84px | full nav + CTA + phone | 118px |

The nav now appears at 1120px instead of overflowing from there, and
"Exterior Services" reads "Exteriors" in the bar — shorter, cleaner, and it
buys the logo about 50px.

### The logo is much bigger

Was 46–68px. Now **46px at 320px, 60px by 390px, 82px from 900px**, and up to
84px on wide desktops. At 82px the tagline and the DFW plate are legible rather
than texture.

### Things running into the picture

Two real overlaps, both the same mistake — a copy column sized in percent
against a photograph positioned in percent, with the two values almost equal:

- **Hero:** copy ran to 46%, photo started at 46%. Zero clearance.
- **Inner page headers:** copy ran to 56%, photo started at 54%. **They
  overlapped by 2%.**

Both now have real clearance (6% and 6%) with a feathered gradient across the
seam instead of a hard edge. The final CTA had `gap: 0` between the copy and
the photograph — it now has a proper column gap and the image is vertically
centred.

### Footer

Bigger mark, a rule above the phone number, the number itself up to 1.42rem,
link rows given real height with an underline on hover, and "what we can say
for certain" rebuilt as red-ringed check badges with tracked labels to match
the credibility strip.

### The duplicate-CSS guard was wrong, and caught itself

It flagged two legitimate responsive steps that happened to share a value,
because it ignored media-query context. Rewritten to walk `@`-rule nesting, so
a duplicate now means the same selector, the same body, **and** the same
context. It found a real problem in my own edit first, which is what it is for.

### Verified

172 pages · logo in the header on 172/172 and the footer on 172/172 · header
fits with 27–554px of headroom at every breakpoint · every split column pair
has clearance · 0 broken links · 0 duplicate metadata · one H1 each ·
0 orphans · 384 JSON-LD blocks all valid · 1,406 images all with alt text ·
0 unnamed buttons · 0 inline-script errors · 0 true duplicate CSS rules ·
loader re-confirmed by execution · CSS 12.1 KB gzipped, JS 4.8 KB gzipped.

---

## Pass 10 — spacing, overlap, and grids that always fill

### The header logo and nav were being pushed apart

`.hdr__spacer` (the flexible element that pushes the CTA right) was sitting
**between** the brand and the nav, so it shoved them to opposite ends of the
bar. Moved after the nav: the mark and the menu now sit together on the left,
with the phone and CTA pushed right. The nav also got a fluid font size and
appears at 1180px, leaving 72–84px of headroom at every desktop step instead
of the 22px it had.

### The check marks were under the photograph

`.phead__img` is `position: absolute; inset: 0 0 0 auto` — it covers the **full
height** of the section it sits in. The credibility strip was rendered *inside*
that same section, so on every service, city, county and hub page the photo was
painted straight over it. That is what was eating "Fully insured".

Moved the strip outside the hero on **11 templates**. Verified across the build:
**0 pages** now have the strip inside the photo's stacking context.

### Grids that always fill

You were right that "More roofing" left two holes: six cards in an `auto-fit`
grid becomes four columns on a wide screen, so the second row only has two.

Rather than hand-tune counts per page, the card grid is now built on six tracks
with span rules, so the last row is always complete at **any** item count:

| Cards | Last row |
|---|---|
| 4, 7, 10 | one card spanning the full width |
| 5, 8, 11 | two cards spanning half each |
| 3, 6, 9, 12 | three full cards |

The featured-tile blocks were also rebalanced: roofing and exteriors now both
have five featured services, which fills the lead-plus-four layout as an exact
3×2 rectangle. The homepage lost its odd full-width tile, which was leaving
two holes of its own.

### Footer and legal typography

Footer headings now carry a hairline rule that runs to the column edge, links
sit on a tighter rhythm and shift right on hover, the phone number sits above a
divider at 1.42rem, and the legal row uses middot separators rather than wide
gaps.

Long-form and legal pages: a lead paragraph at larger size, section headings
marked with a short red rule, custom bullet and number markers in brand red,
and callouts and notes rebuilt on the panel tones.

### The duplicate guard earned its keep again

It caught a rule I had written twice inside the same media query while building
the fill grid. Fixed before it shipped.

### Verified

172 pages · logo in header 172/172, footer 172/172 · **0 pages with the
credibility strip under the hero photo** · header fits with 72–84px headroom at
every desktop breakpoint · card grids fill completely at any count · 0 broken
links · 0 duplicate metadata · one H1 each · 0 orphans · 384 JSON-LD blocks all
valid · 1,406 images all with alt text · 0 unnamed buttons · 0 inline-script
errors · 0 true duplicate CSS rules · loader re-confirmed by execution.

---

# Version 2.0 — interface rebuilt

Content, URLs, metadata, structured data, service pages, location pages and
functionality are untouched. 172 pages, same routes, same schema. What changed
is the entire visual layer.

## Header, rebuilt from scratch

The old header was a flex row with a flexible spacer in it, which is why the
logo and nav drifted apart and a gap opened before the phone number. It is now
a **three-track grid** — brand · navigation · actions — so the nav owns the
centre column and the two ends are anchored. No spacer, no drift.

The header is `--ink`, the same value as the announcement bar above it and the
opening section below, so the three read as one surface.

## Logo — purpose-built for the header

The square mark was never going to work in a navigation bar, and the full
horizontal artwork carries two rows ("BUILT STRONG…" and the DFW plate) that
are illegible below about 70px.

So the header now uses a **purpose-built lockup composed from your artwork**:
the Texas-and-roof emblem beside TIMBER and ROOFING & EXTERIORS only, with the
two illegible rows removed. Ratio 5.48:1, and every element is readable at
46px. The full logo still appears in the loader, the footer, and About.

Measured fit, with the compact call control dropping below 480px where the
sticky bar already covers calling:

```
320px  logo 36px (197w)   25px spare      1180px  logo 46px    58px spare
400px  logo 44px (241w)   56px spare      1440px  logo 52px    57px spare
768px  logo 50px (274w)  290px spare      1680px  logo 58px   114px spare
```

## Iconography

Every icon is new. One geometric system — 24px grid, 1.7 stroke, round joins,
`currentColor` — and each one means something specific: shield, badge,
clipboard-check, roof, home, hammer, inspection, layers, storm, droplet, fence,
pin, clock. The circular squiggle in "What We Can Say For Certain" is gone;
each claim now carries the icon that actually represents it (inspection →
magnifier, estimate → clipboard, insured → shield, licensed → badge, coverage →
pin), and the same mapping drives the footer list.

## Design language

Light by default. The site now sits on warm paper (`#FCFBF9`) with dark bands
used as **punctuation** rather than as the ground — the old build was dark
almost throughout, which is what made it read as a template.

- Display type up to `clamp(2.6rem, 6.4vw, 5.4rem)` at −0.042em tracking
- Section rhythm up to `clamp(4.5rem, 9vw, 8.5rem)`
- Pill buttons with an inset highlight and a colour-matched shadow
- Larger radii (10 / 16 / 22 / 30px)
- One accent colour, used only where something is clickable or claimable
- Slower, longer easing (`.3s cubic-bezier(.22,.7,.26,1)`) and 0.7–0.9s image scales

## Homepage rhythm

No two consecutive sections share a structure:

1. Hero — photography split, copy set into the frame
2. Credibility bar — iconed, full-width
3. Services — one dominant tile plus four, photography-led
4. Feature — asymmetric image right, with a tag badge
5. Proof band — four facts on hairlines, no cards
6. **Showcase — full-bleed 21:9 photograph** plus a three-up strip
7. Process — two-column steps on dark
8. Feature flipped — image **left**, editorial definition list
9. Gallery — editorial masonry with varied aspect ratios
10. Coverage — county tabs on dark
11. Why Timber — two-column iconed rows, not cards
12. Resources — editorial list, not cards
13. FAQ — asymmetric split
14. Final CTA — photograph breaking the grid

## Photography

The 14 project photos now lead. One runs **full-bleed at 21:9** with the
caption set into it, three more sit in a strip beneath, and the gallery uses
varied aspect ratios so it reads as a portfolio rather than a contact sheet.
Tiles scale slowly on hover rather than snapping.

## Preserved

172 pages · every URL · every JSON-LD block (384, all valid) · every meta title
and description · all service, county and city content · the loader gate · the
mega menu · the always-full card grids · every service at 6 process steps and
6 options.

## Verified

172 pages · header lockup on 172/172 · footer logo on 172/172 · 0 credibility
strips under a photo · 0 broken links · 0 duplicate metadata · one H1 each ·
0 orphans · 384 JSON-LD blocks all valid · 1,408 images all with alt text ·
0 unnamed buttons · 0 inline-script errors · 0 true duplicate CSS rules ·
header fits with 25–290px headroom at every breakpoint · loader re-confirmed by
execution (`SHOW -> skip -> skip -> skip -> skip`).

The v1 stylesheet is not carried forward; v2 was written from scratch rather
than patched.

---

# Version 2.0 — ground-up rebuild

The previous interface was deleted, not refactored. `site.css` was written from
an empty file, `layout.js` and `pages.js` were replaced, and no class name,
token or component survives from the old build. The content layer — 172 pages,
every URL, all metadata, schema, and copy — is untouched.

## What I took from the reference builds

I read both before writing anything.

**Rapid Response DFW** — a deep token set (navy ground, layered shadow scale,
AA-safe accent variants), and a `band` / `band-navy` / `band-mist` rhythm where
dark sections *punctuate* a light page rather than dominating it. Compact
header: an 82px mark, nav with dropdowns, phone and CTA anchored right.

**Ethan & Sons** — `section` / `section-tight` utilities driving a consistent
vertical rhythm, alternating `bg-mist` and `bg-navy` surfaces down the page, and
plain-spoken H2s that read like sentences rather than headings.

The lesson both share, and the single biggest change here: **navy is the dark,
not black, and light is the default state.** The old Timber build was dark
almost throughout. That is most of why it read as a template.

## The new system

| | Old | New |
|---|---|---|
| Ground | near-black `#0F1114` throughout | white and mist, navy as punctuation |
| Type | Archivo + Inter | Plus Jakarta Sans + Source Sans 3 |
| Container | `.wrap` 1320px | `.shell` 1240px |
| Sections | `.sect` / `.ink` / `.tint` | `.section` / `.surface-white/mist/mist-2/navy` |
| Header | `.hdr` | `.masthead` |
| Hero | `.hero` | `.stage` |
| Trust | `.creds` | `.assure` |
| Services | `.svc__tile` | `.svcfeat` / `.svctile` |
| Featured work | `.showcase` | `.spotlight` |
| Process | `.steps` | `.pathway` |
| Coverage | `.explorer` | `.locale` |
| Gallery | `.gal` | `.figrid` |
| Final CTA | `.finale` | `.closer` |
| Footer | `.ftr` | `.sitefoot` |
| Radius | 10/16/22/30 | 6/10/14/20/28 |
| Buttons | pill, red shadow | `.act` square-ish, three variants |

Verified across the built homepage: **zero** occurrences of the old class
vocabulary, and the new vocabulary present throughout.

## Logo

The 2026 identity is flat vector artwork in navy and red on white — which
removes the problem the chrome logo had, where detail collapsed below ~70px.

- `timber-header` (5.49:1) — horizontal lockup: emblem + TIMBER + ROOFING &
  EXTERIORS. The tagline and DFW badge are left out because they are
  unreadable at nav height.
- `timber-mark` (1.76:1) — emblem alone, for favicons.
- `timber-full` (1.38:1) — complete stacked logo, for the loader, footer,
  About page and drawer.

White is keyed out with alpha following luminance, so the navy and red edges
keep their antialiasing. `object-fit: contain` and explicit dimensions
everywhere. Header fit: 30px spare at 320px, 42px at the 1180px nav breakpoint,
105px at 1440px.

## Header

Three-track grid — brand · nav · actions — so the nav owns the centre column
and the phone and CTA anchor the right edge. No flexible spacer, so no gap can
open between Contact and the phone number. Light by default with a navy
top-line above it; on scroll it gains a shadow rather than changing colour.

## Homepage

Fourteen sections, no two consecutive ones structurally alike:

stage (editorial split, photo bleeding right) → assure (five icon claims) →
horizontal service features, alternating side → intro with stat band →
spotlight (oversized photo with an overlapping detail panel) → two-column
iconed notecards → pathway (three-across numbered track on navy) →
storm split with the image on the *left* → editorial gallery →
locale (county tabs on navy) → resources list → FAQ with a side panel →
closer.

## Trust section

Rebuilt. Each of the five claims now has a specific icon — magnifier for
inspections, clipboard for estimates, shield for insured, badge for licensed,
map pin for coverage — plus a plain qualifier beneath ("Assessing, not
selling"). No abstract marks anywhere.

## Verified

172 pages · header logo on 172/172, footer logo on 172/172 · 0 broken links ·
0 duplicate metadata · one H1 each · 0 orphans · 384 JSON-LD blocks all valid ·
1,407 images all with alt text · 0 unnamed buttons · 0 inline-script errors ·
0 duplicate CSS rules · all 14 project photographs in the portfolio ·
mega menu, 16 drawer accordions, 8 coverage tabs · loader confirmed by
execution: `SHOW -> skip -> skip -> skip -> skip -> skip`.

---

## Refinement pass on v2.0

### The unstyled page

`/exteriors/gutter-installation/` was structurally sound: stylesheet linked,
head well-formed, no stray tags, no unbalanced quotes. Every one of the 210
local assets it referenced existed. So it was a **cached 404** for
`/assets/site.css` left over from when the server root was one level too high —
a hard refresh on the homepage revalidates that page's subresources, but pages
you have not hard-refreshed can still be served the stale miss.

Rather than leave that to browser behaviour, asset URLs are now
**content-hashed**: `/assets/site.css?v=a3cf503d`. The hash changes when the
file does, so a stale entry can never be reused across a rebuild. A build-time
**asset integrity check** also now verifies every local `href`/`src`/`srcset`
against the output and fails the build on a miss — currently 213 referenced,
0 missing.

### The footer logo

Not the old logo — the *new* one, invisible. The 2026 mark is navy, and the
footer was navy-900, so the Texas outline and TIMBER wordmark all but
disappeared. Two fixes:

- **The footer is now light** (`--mist-50` with a Texas-red rule across the
  top), so the navy mark reads at full strength. Contrast measured: headings
  15.84:1, links 7.43:1, phone 15.84:1, legal row 5.19:1 — all pass AA.
- **Dark surfaces get a light variant.** `timber-full-light` maps navy to white
  and lifts the red, keeping alpha — so the knocked-out star and window pick up
  whatever is behind them. Used in the loader and the mobile drawer, both of
  which are navy.

### Two red marks in the nav

Storm Damage's children all live under `/roofing/`, so on a page like
`/roofing/storm-damage-roof-repair/` both Roofing (URL prefix) and Storm Damage
(child match) matched and both drew the active rule. Matches are now scored —
a URL-prefix match wins, because that is the section the breadcrumb names — and
only the winner is marked. Verified: **0 pages with more than one indicator.**

### The 1–6 process track

`.pathway` had `gap: 0 <column>` — no row gap. With six steps in three columns
the second row sat flush against the first, and its numbered badges (which hang
at `top: -21px` over the rule) collided with the text above. Row gap added.

### Attention on the primary action

A pulse ring on the header CTA, the hero CTA and the closing CTA, drawn on a
pseudo-element so each button keeps its own shadow and nothing shifts layout.
The header phone icon is now solid Timber red with the same ring. All of it is
silenced under `prefers-reduced-motion`.

### Verified

172 pages · stylesheet linked on 172/172 · header logo on 172/172 · loader gate
on 172/172 · 0 pages with a duplicate nav indicator · 384 JSON-LD blocks all
valid · 1,407 images all with alt text · 0 unnamed buttons · 0 inline-script
errors · 0 duplicate CSS rules · 213 local assets referenced, 0 missing ·
footer contrast all passing AA.

---

## Polish pass

### The hero gap was a bug, not spacing

`.stage__copy` carries the `.shell` container class *and* set its own
`padding: <top> 0 <bottom>`. The shorthand writes all four sides, so the `0`
wiped out the horizontal padding `.shell` supplies and the hero copy was pinned
to the viewport edge — which is what opened the gap between the text block and
the photograph.

Changed to `padding-block`, which only touches top and bottom. The copy column
also gained more right-hand clearance, and the gradient over the seam widened
from 22% to 34% so navy meets photograph as a fade rather than an edge.

I then checked every other element that combines `.shell` with a class of its
own — nine of them — for the same collision. **None.**

### Buttons

- Every `.act` now rings once on hover, tinted to its own variant through a
  `--ring` custom property, so a ghost button on navy rings white and a primary
  rings red.
- Primary actions keep the ambient pulse: header CTA, hero CTA, closing CTA,
  **footer CTA**, and the mega-menu CTA.
- **"View all service areas"** was a ghost button on a navy panel, which made it
  disappear. It is now solid red and pulsing.
- The banner phone number gets a **sheen** that sweeps across it on hover.
- All of it silenced under `prefers-reduced-motion`.

### Loader on refresh

You wanted it back on refresh without it replaying as you click around. Those
are distinguishable: a reload reports `navigation.type === "reload"`, while a
link click reports `"navigate"` and the back/forward buttons report
`"back_forward"`. The gate now shows on a new arrival **or** a reload, and stays
out of the way otherwise. Verified by executing the shipped script:

```
1. first arrival              SHOWS LOADER
2. click a service page       skipped
3. click a city page          skipped
4. browser back               skipped
5. browser forward            skipped
6. REFRESH (Cmd+R)            SHOWS LOADER
7. click on after the refresh skipped
8. REFRESH again              SHOWS LOADER
9. new tab / new session      SHOWS LOADER
storage blocked               skipped (fails safe)
```

### SEO content

Three more city pages moved off base copy onto full local treatment —
**Rowlett** (lake-edge wind exposure and the post-2015 rebuild cohort),
**Wylie** (roofs ageing as a cohort after a twenty-year building boom), and
**Cedar Hill** (mature canopy, valley debris, limb abrasion). Each adds a
deep-dive section, a local-issues grid, key facts, and a city-specific FAQ.
19 cities and 16 services now carry expanded content.

### Verified

172 pages · stylesheet linked 172/172 · header logo 172/172 · loader gate
172/172 · 0 duplicate nav indicators · 384 JSON-LD blocks all valid · 1,407
images all with alt text · 0 unnamed buttons · 0 inline-script errors ·
0 duplicate CSS rules · 213 local assets referenced, 0 missing · no remaining
`.shell` padding collisions.

---

## Full audit

Ten checks the earlier passes had not run. Four found real problems.

### Heading structure — 172 pages affected

Every page jumped **h1 → h4**. The footer column headings were `<h4>`, and on a
page whose last content heading is the `<h1>` that is a two-level skip — which
breaks the document outline a screen reader announces. They are section
headings inside the `<footer>` landmark, so `<h2>` is the correct level;
styling moved to a class.

That left four genuine skips on hub pages, where the first thing after the
`<h1>` was a card whose title is an `<h3>`. Each hub now has a real section
heading: "Core roofing services", "Core exterior services", "Guides and
explainers", plus a visually-hidden "Urgent help" on the storm page.

**172 → 0.**

### One contrast failure

`--red-500` as *text* on navy measures **3.45:1** — short of AA. It was driving
the `--action` token on every dark surface, so section kickers and inline links
on navy were failing. Dark surfaces now point `--action` at `--red-300`
(**6.69:1**); buttons keep the saturated fill, which is unaffected because white
on red-600 measures 5.88:1. Every other pair in the system was measured and
passes — 16 pairs across light and navy.

### Metadata outliers

Three titles over 62 characters (truncated in search results) and two
descriptions too short to be useful. Contact, Projects, Sitemap and the
insurance disclaimer retitled; the 404 description rewritten from 49 characters
to something that actually helps. **0 outliers remain.**

### Fourteen placeholders generated and never used

The image pipeline has been producing `-lqip.webp` low-quality placeholders
since the photography pass, and nothing referenced them. They are now set as a
background on each `<picture>`, so a photograph fades up from its own colours
rather than popping in from empty space — no JavaScript, because the real image
simply paints over the background. **718 in use across the build.**

The asset-integrity check was extended to scan `url()` inside style attributes,
since that is where these live: **227 local files referenced, 0 missing.**

### Also

- **Dead CSS removed** — five selectors defined and never emitted. The
  two-column definition list was the one worth keeping, so it is now used for
  the "signs" grid on service pages.
- **Branded text selection**, tinted red on light surfaces and a lighter red on
  navy.
- **Footer link targets** raised from 32px to 36px.
- Verified clean: landmarks on every page, zero duplicate ids, zero broken
  `aria-controls`/`aria-labelledby` references, zero links or buttons without an
  accessible name, every image carrying width and height.

### Final state

```
pages                          172        heading skips              0
stylesheet linked (hashed)     172/172    duplicate nav indicators   0
loader gate                    172/172    titles over 62 chars       0
header logo                    172/172    descriptions under 70      0
<nav> landmark                 172/172    JSON-LD invalid            0 of 384
images missing alt             0 of 1407  images missing dimensions  0
buttons without a name         0          links without a name       0
duplicate ids                  0          broken aria references     0
inline script errors           0          blur-up placeholders       718
```

CSS 12.2 KB gzipped · JS 4.8 KB gzipped · homepage 18.1 KB gzipped.

---

## Extensive audit — performance, mobile, desktop

This pass ran the shipped JavaScript in a real DOM rather than reading it, and
modelled the header at every breakpoint rather than eyeballing it. Three real
defects.

### The mobile menu had a crash in it

I loaded each page into jsdom and drove the actual interactions. The **logic was
correct** — opens and toggles, Escape closes, body lock applies and releases,
one accordion open per level, opening a county leaves Service Areas open, and
clicking a link closes the drawer. But it threw:

```
TypeError: row.scrollIntoView is not a function
```

`scrollIntoView` with an options object is not universally supported, and worse,
it would have scrolled the **locked page behind the drawer** rather than the
drawer's own scroll container. Replaced with a direct `scrollTop` adjustment on
`.drawer__body`. Re-tested by toggling all 16 accordions three times each across
four page types: **0 runtime errors**.

Also confirmed live: desktop dropdowns open on hover, the coverage tabs keep
exactly one panel selected, and the gallery filter and lightbox bind correctly.

### The header overflowed at 1380px

The phone block and the CTA both appeared at 1380px while the logo was still at
42px, needing **1,437px in 1,380px** — a 57px overflow that `overflow-x: hidden`
was swallowing. Rebuilt as a staggered schedule:

```
 320px  logo 36px   30px spare      1180px  nav + call    66px spare
 400px  logo 42px   69px spare      1300px  nav + call   155px spare
 480px  logo 46px   62px spare      1440px  nav + CTA     78px spare
 900px  logo 52px  411px spare      1620px  + phone       65px spare
1024px  logo 52px  531px spare      1720px  logo 58px    132px spare
```

Tightest point across seventeen widths: **30px spare**. Nothing clips anywhere.

### Rendering work below the fold

Sections after the first now carry `content-visibility: auto` with an intrinsic
size, so the browser skips layout and paint for content far off screen. On the
long service and city pages that is most of the document. The intrinsic size
keeps the scrollbar honest so nothing jumps.

### Also verified

- **Overflow:** zero fixed widths above 300px anywhere in the stylesheet.
- **Safe areas:** 25 `env(safe-area-inset-*)` declarations; container, top bar,
  drawer, sticky dock and lightbox all covered.
- **Breakpoints:** seventeen `min-width` and eight `max-width` steps, no gap
  wider than 260px.
- **Loading:** one render-blocking stylesheet (fonts are `media="print"` with an
  onload swap), zero render-blocking scripts, one preload — the hero image, the
  actual LCP candidate. **Every in-content image is lazy; only two per page are
  high-priority.**
- **Dead CSS:** now zero, excluding the classes the lightbox injects at runtime.
- **Anchor links** get `scroll-padding-top` on the root, so every in-page jump
  lands clear of the sticky header rather than relying on per-element margins.

### Final state

```
pages                     172        heading skips            0
stylesheet (hashed)       172/172    duplicate nav indicators 0
loader gate               172/172    titles >62ch             0
header logo               172/172    descriptions <70ch       0
JSON-LD invalid           0 of 384   images missing alt       0 of 1407
images missing dimensions 0          in-content imgs not lazy 0
buttons unnamed           0          links unnamed            0
duplicate ids             0          broken aria refs         0
inline script errors      0          blur-up placeholders     718
runtime JS errors         0 across 4 page types
```

CSS 12.5 KB gzipped · JS 4.9 KB gzipped · homepage 18.2 KB gzipped.

---

## Content pass — every page off base copy

44 city pages and 3 service pages were carrying generic template copy with only
the place name swapped. All 47 now have genuine, locally specific content.
**The build's content roadmap is empty for the first time.**

### What each city page gained

Four key facts, two paragraphs of local roofing context, four locally-common
problems, and a city-specific FAQ. Written around what actually differs about
roofing in that place:

- **Lakeside wind** — Rowlett, The Colony, Little Elm, Heath, Granbury. Open
  water gives wind a clear run, so the roof perimeter carries the load and
  water-facing elevations age faster than the sheltered side of the same roof.
- **Open-prairie exposure** — Celina, Prosper, Forney, Royse City, Midlothian.
  New development with no mature windbreak, so starter courses and ridge caps
  fail before the field does.
- **Mature canopy** — Colleyville, Highland Village, Duncanville, Cedar Hill.
  Debris-loaded valleys, shaded slopes that never dry, limb abrasion invisible
  from the ground.
- **Complex custom rooflines** — Southlake, Fairview, Heath, Aledo. The cost and
  the risk sit in flashing and valley count, not the shingle field, which is
  exactly what a low bid trims.
- **Second- and third-generation roofs** — Hurst, Bedford, North Richland Hills,
  Duncanville. Original flashing and vent boots under comparatively new
  shingles, and decking nobody can price before tear-off.
- **Cohort ageing** — Murphy, Keller, Sachse, Wylie. Whole neighbourhoods
  shingled within a couple of seasons, arriving at the end together.
- **Historic stock** — Waxahachie, Cleburne, Denison, Greenville, Weatherford.
  Steep pitches that go uninspected precisely because they cannot be walked.
- **Rural properties** — Kaufman, Argyle, Aledo, Cleburne. Outbuildings that are
  routinely left out of any roof assessment entirely.

The FAQs answer real questions rather than restating the service: why bids
differ so widely on a custom roof, how to tell a local contractor from a storm
chaser, whether tree cover protects against hail, why nobody can quote a final
price before the old roof is off, whether impact-resistant shingle is worth it
in Parker County.

### Verified unique

**471 content strings across 63 cities, 0 duplicated.** Every paragraph, every
listed problem, and every FAQ answer is distinct — nothing was templated with a
place name substituted.

Indexed location pages now run **329 to 1,282 words, median 919**.

### The three remaining services

- **Seamless Gutters** — why the seams are the whole point, and sizing for roof
  area rather than house size.
- **Fence Repair** — almost every failed fence failed at the post, and when
  repair is genuinely the right answer rather than money spent twice.
- **Outdoor Home Improvements** — sequencing as most of the value, and why
  staining is structural rather than cosmetic in this climate.

Each with key facts, two deep-dive sections, a six-stage homeowner timeline, and
a four-item findings grid.

### Audit after the content pass

```
pages                     172        heading skips             0
stylesheet linked         172/172    duplicate nav indicators  0
titles >62ch              0          descriptions <70ch        0
JSON-LD invalid           0 of 384   images missing alt        0 of 1415
images missing dimensions 0          in-content imgs not lazy  0
buttons unnamed           0          links unnamed             0
duplicate ids             0          broken aria refs          0
inline script errors      0          pages on base copy        0
```

---

## Loader, hero and navigation

### The loader is now drawn, not loaded

The old loader waited on a raster that was requested by JavaScript after the
markup parsed, then cleared itself at ~1.2s. On a slow first paint the artwork
had not arrived yet, which is why you were seeing the bar and the tagline but
no logo.

Replaced with an **inline animated SVG of a roof being built** — no network
request, so there is nothing left to fail:

1. Walls sketch in at 0.05s
2. Rafters and roof frame draw at 0.22s
3. Five shingle courses lay in from the eaves upward, staggered 0.1s apart
4. A red ridge cap draws across the apex at 1.0s
5. A Texas star pops in at 1.08s

Courses are clipped to the roof plane so the edges stay clean. Under
`prefers-reduced-motion` it holds the finished frame instead of animating.

### Hero red

You were right that it looked washed out. The cause was a contrast constraint:
the true button red measures only **2.82:1 on navy-800**, which fails even the
3:1 threshold large text needs, so it had been substituted with a tint.

Fixed properly rather than by overriding it — **the hero copy panel is now
navy-900**, where the actual brand red `#C8102E` measures **3.13:1** and clears
the large-text threshold. "Backed by integrity." now carries the real button
colour.

The kicker is small text and needs 4.5:1, which brand red cannot reach on any
navy. It uses a new `--red-400` (`#F2515C`) at **4.82:1** — the most saturated
red that clears AA. Noticeably red rather than pink, and legible.

### Slow sweep on the headline

A highlight travels across "Backed by integrity." every 6.5s, painted *through*
the letters with `background-clip: text` so it reads as light moving over them
rather than a band sliding behind. Wrapped in `@supports`, and reduced-motion
restores a solid fill.

### Larger navigation

Nav type up from `.82–.9rem` to `.92–1.02rem`, taller targets (46px), more
generous padding, and a wider active rule. That costs about 90px of bar, so the
schedule was rebalanced and re-verified across twelve widths:

```
 320px logo 32px   26 spare     1340px  nav + call    87 spare
 430px logo 44px   57 spare     1600px  nav + CTA    108 spare
 900px logo 52px  387 spare     1800px  + phone      114 spare
```

Tightest point: **26px**. The desktop nav now arrives at 1340px rather than
1180px — below that the drawer is genuinely the better experience at this type
size.

### Added

**Reading progress** on the header's bottom edge — a 3px red rule that fills as
you scroll, appearing only once the header is stuck so it reads as part of the
chrome. Written as a unitless `transform: scaleX()` from a CSS custom property,
so it costs one compositor property per frame and never triggers layout.

### Verified

172 pages · inline loader on all 172 · 0 heading skips · 384 JSON-LD blocks
valid · 1,243 images with alt text and dimensions · 0 unnamed buttons or links ·
0 duplicate ids · 0 broken aria refs · 0 inline script errors · drawer and
progress confirmed working in a live DOM across three page types with 0 runtime
errors.

---

## Loader, colour and local content

### The scrollbar jump

The head script locked `overflow` during the loader and `site.js` released it at
the *start* of the fade, so the scrollbar reappeared mid-transition and shifted
everything sideways. Two fixes: `scrollbar-gutter: stable` on the root reserves
the gutter whether or not overflow is locked, and the release now happens after
the fade completes rather than during it.

### Texas in the loader

The state now traces itself first — plotted from the same real coordinates used
elsewhere, scaled so the build sits inside it — then the walls sketch, the
rafters draw, five shingle courses lay up from the eaves, a red ridge caps it,
and the star lands. About 1.75s. It holds the finished frame under
`prefers-reduced-motion`.

### "Backed by integrity." was clipped

`background-clip: text` clips to the element box, and at `line-height: .98` the
descenders on **g** and **y** fell outside it. Line height raised to 1.06 with
`padding-bottom: .1em`.

### The light red is gone

Every `--red-300` use as type is now `--red-400` (`#F2515C`, **4.82:1** on
navy) — the "More in Dallas" links, mega-menu headings, accordion carets,
trust icons, gallery labels, hover states. Only the token definition remains.

### The call icon never pulsed — a real bug

The ring keyframes read `rgba(var(--ring), …)`. `.act` defines `--ring`;
`.headtel__ico` never did, so the animation resolved to an invalid colour and
painted nothing. Both the phone icon and the compact call button now declare it
and pulse.

### Bigger navigation, again

Type up to `.96–1.07rem` with 46px targets. Re-verified across twelve widths;
tightest point 26px.

### Footer

Mark up from 215px to 268px, trust claims now in bordered icon tiles, phone at
1.7rem, and column dividers on wide screens.

### County pages, properly built

Every county had a paragraph and a city list. All 13 now carry the same depth
the cities got: **key facts, two long-form sections, a four-item regional
findings grid, and county-specific FAQs** — Dallas on the oldest roofing stock
in the region and expansive clay, Collin on cohort ageing and why claims run
high, Denton on lake wind and uneven slope weathering, Parker on the western
hail approach, Wise and Hunt on distance and storm chasers.

Location pages now run **902–1,363 words, median 1,013** — up from a 329-word
floor.

### On city hall addresses

You asked for city hall locations and contact numbers on each page. **I have not
added them, deliberately.** I do not have verified addresses and phone numbers
for 63 municipalities, and publishing a wrong one would send a homeowner to the
wrong building or the wrong number — worse than omitting it.

Instead each city and county page carries a **civic panel** with what is both
useful and verifiable: the county and its seat, how roofing permits actually
work (the city issues them, we pull them, unincorporated property goes to the
county), and what to check before signing with any contractor. If you want real
city hall data, send me a verified list and it will drop straight into the same
panel — the structure is already there.

### Verified

172 pages · 0 heading skips · stylesheet on 172/172 · **425** JSON-LD blocks,
0 invalid · 1,161 images with alt text and dimensions · 0 unnamed buttons or
links · 0 duplicate ids · 0 broken aria refs · 0 inline script errors.

---

## Interaction pass

### Pressed feedback on the navigation

Each top-level item now turns brand red and a slow highlight travels across it
when pressed. Bound to `pointerdown` rather than `click`, so the sheen starts
before the browser begins unloading the page — on a `click` handler most of it
would be lost to navigation. The class is cleared on `animationend`, and a
forced reflow between removal and re-add lets a repeat press restart it.

### Dropdown options light red

Every option in the desktop dropdowns, the Service Areas mega menu, and both
levels of the mobile drawer now lights `--red-400` with a red-tinted background
on hover and on keyboard focus — previously they went white on navy, which read
as flat. 59 options on the homepage alone.

One of those rules did not land the first time: the drawer's nested links were
still `color: #fff` rather than the value I was targeting, so the mobile menu
would have kept the old behaviour. Caught by checking the compiled stylesheet
rather than trusting the edit.

### Performance

```
css   14.0 KB gzipped        homepage        18.5 KB gzipped
js     5.2 KB gzipped        service page    15.9 KB gzipped
                             county page     12.0 KB gzipped
```

- Homepage: 22 images, **20 lazy, 2 high-priority, 0 unaccounted**.
- **One** render-blocking stylesheet. The fonts link carries `media="print"`
  with an onload swap; the second copy my detector flagged is inside
  `<noscript>` and never blocks a scripted browser.
- One external script, deferred.
- **Dead CSS: 0.** The last unused selector (`surface-navy-deep`) is gone.

### Audit

```
pages                     172        heading skips              0
stylesheet linked         172/172    inline loader              172/172
duplicate nav indicators  0          titles>62 / desc<70        0 / 0
JSON-LD invalid           0 of 425   images no-alt / no-dims    0 / 0
in-content imgs not lazy  0          buttons / links unnamed    0 / 0
duplicate ids             0          broken aria refs           0
inline script errors      0          runtime errors             0 across 4 page types
```

Runtime verified in a live DOM on the homepage, a service page, a county page
and the portfolio: drawer opens, all 16 accordions toggle, all 8 nav items take
the pressed state, scroll handler fires. **Zero errors.**

---

## Location page layout

### The gap was a column-imbalance problem

On city and county pages the copy column and the sidebar sit in one grid row, so
the row is as tall as whichever is longer. The sidebar had grown to five stacked
blocks — a ten-item service list, the free-inspection panel, key facts, and the
three-row civic panel — while the median copy column is only 193 words. The
sidebar won, and everything below the copy was empty space.

Measured before fixing: the thinnest pages had roughly **577px of copy against
966px of sidebar.**

### Fixed by moving content out, not by padding

Two blocks left the sidebar and became full-width bands, which both closes the
gap and puts them somewhere more useful:

- **Services** are now a three-across band of iconed cards under the copy
  — far better internal linking than a list buried in a sidebar.
- **Local details** became a four-across row: county and seat, how the roofing
  permit actually works, HOA and neighbourhood restrictions, and what to check
  before signing with any contractor.

The sidebar now holds the free-inspection panel and key facts only.

Re-measured across all 76 indexed location pages:

```
thinnest page   copy ~577px   sidebar ~420px   margin 157px
pages where the sidebar is still taller: 0
```

The margin holds at the worst case, so the gap cannot reappear as content
varies.

### Audit

```
pages                     172        heading skips            0
stylesheet linked         172/172    titles>62 / desc<70      0 / 0
JSON-LD invalid           0 of 425   images no-alt / no-dims  0 / 0
in-content imgs not lazy  0          buttons / links unnamed  0 / 0
duplicate ids             0          broken aria refs         0
inline script errors      0          runtime errors           0 across 4 page types
```

---

## Deploying to a GitHub Pages preview

### The site could not have launched on that URL as it was

`norvixhq.github.io/norvixco.com/` is a GitHub Pages **project** site, which
serves from a subpath. The build uses root-absolute paths — correct for a
domain root, fatal on a subpath. `/assets/site.css` would have resolved to
`norvixhq.github.io/assets/site.css` and 404'd, along with every image, every
logo, and every internal link. **44,959 references across 172 pages.** The page
would have rendered as raw unstyled HTML — the same failure you saw earlier
when the local server root was one level too high.

### Fixed properly, not by hand-editing

`build.js` now takes a deploy target:

```
node build.js                                     production
BASE_PATH=/norvixco.com PREVIEW=1 \
  PREVIEW_ORIGIN=https://norvixhq.github.io node build.js    preview
```

`BASE_PATH` rewrites every root-absolute reference at the end of the build —
plain attributes, comma-separated `srcset` with its descriptors, CSS `url()`,
and quoted paths inside inline scripts. Absolute and protocol-relative URLs are
left alone.

`PREVIEW` additionally noindexes every page, sets `robots.txt` to `Disallow: /`,
omits the `CNAME`, and points `sitemap.xml` at the preview origin — so the
preview cannot be indexed and later compete with the real domain for the same
content.

### Verified by serving it

I built the preview, laid it out exactly as Pages would, and requested every
route:

```
/norvixco.com/                          200  text/html
/norvixco.com/assets/site.css           200  text/css
/norvixco.com/assets/site.js            200  text/javascript
/norvixco.com/logo/timber-header-640.webp   200  image/webp
/norvixco.com/images/…-1280.webp        200  image/webp
/norvixco.com/roofing/                  200  text/html
/norvixco.com/service-areas/dallas/     200  text/html
/norvixco.com/robots.txt                200  text/plain

/assets/site.css                        404  <- what the old build asked for
```

Unprefixed root-absolute references remaining: **0**.

### What ships

```
dist/preview-github-pages/   noindexed, /norvixco.com base, no CNAME
dist/production/             indexable, root paths, CNAME included
DEPLOY.txt                   which is which, and how to rebuild either
```

`.nojekyll` is included in both — Pages will not serve an `/assets` folder
without it.

---

## Preview deployment, done properly

### What the blank loader was

A base-path mismatch. `site.css` and `site.js` both 404'd, which is why the
Texas rendered as a black filled shape (an SVG with no stylesheet defaults to
`fill: black`), the tagline fell back to a serif, and nothing ever cleared the
screen. The critical inline CSS was the only styling that survived, because it
lives in the HTML.

Two separate failures, and I fixed both.

### 1. The loader could trap the page

The loader was only ever removed by `site.js`. If that file 404'd — for any
reason, on any host — the visitor sat on a blank screen indefinitely. That is a
bad failure mode regardless of what caused it.

The critical inline CSS now clears the loader on a **four-second timer with no
JavaScript involved**. A missing asset can leave the page unstyled; it can no
longer leave it unusable.

### 2. Base paths were a configuration trap

`BASE_PATH` worked, but only if the value matched where the files actually
landed. Get it wrong in either direction and everything 404s:

```
production build at a subpath   -> asks /assets/site.css            404
preview build at the root       -> asks /norvixco.com/assets/...    404
```

So the preview build now uses **relative paths computed from each page's own
depth** — `./assets/...` at the root, `../../assets/...` two levels down — and
needs no configuration at all:

```
index.html                            ./assets/site.css
roofing/index.html                    ../assets/site.css
roofing/roof-replacement/index.html   ../../assets/site.css
service-areas/dallas/index.html       ../../assets/site.css
```

Root-absolute references remaining: **0**.

### Verified at both locations

Same build, served two ways, resolving each page's own stylesheet URL:

```
served at a SUBPATH                    served at the ROOT
/norvixco.com/                  200    /                        200
/norvixco.com/roofing/          200    /roofing/                200
/norvixco.com/service-areas/…   200    /service-areas/dallas/   200
```

It works at the root, at `/norvixco.com/`, under any other repo name, or in a
subfolder on any host. The repo name no longer needs to be known at build time.

### What ships

```
site/            production — root-absolute, indexable, CNAME
dist/preview/    preview — relative paths, noindexed, no CNAME
DEPLOY.txt       which to use where, and how to rebuild either
```
