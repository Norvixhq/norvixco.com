# Ethan & Sons Electricians — Website

Proof-of-concept site build. Next.js 14 (App Router) with static export, Tailwind CSS, TypeScript.

**115 pages. Builds clean. No forms, no tracking, no unverified claims.**

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export → ./out
npm run start        # serve ./out locally
npm run typecheck
npm run lint
```

## Deploying to GitHub Pages

`next.config.mjs` uses `output: 'export'` and `trailingSlash: true`. The build writes
`out/about/index.html`, which GitHub Pages serves at `/about/` — clean URLs with no
visible `.html` anywhere. Push the contents of `out/` to the Pages branch.

If deploying to a project subpath rather than a custom domain, add `basePath` and
`assetPrefix` to `next.config.mjs`.

---

## BEFORE LAUNCH — required changes

Everything below is an intentional placeholder. Nothing was invented to fill a gap.

| # | Item | Where | Action |
|---|------|-------|--------|
| 1 | **Email address** | `src/data/business.ts` → `contactEmail` | Currently `EMAIL_ADDRESS_HERE`. Every mailto on the site reads from this one string. |
| 2 | **Site URL** | `src/data/business.ts` → `siteUrl` | Currently `https://www.ethanandsonselectricians.com`. Drives canonicals, OG tags, schema and sitemap. |
| 3 | **Business hours** | `src/data/business.ts` → `hours` | `verified: false`. Set real hours, then flip the flag and add `openingHoursSpecification` to `src/lib/schema.ts`. |
| 4 | **Licensing / insurance** | `src/data/business.ts` → `licensing` | `verified: false`. No licence number, insurance status or certification is claimed anywhere until confirmed. |
| 5 | **Analytics** | `src/data/business.ts` → `analytics`, and `src/app/layout.tsx` | Both null / empty comment. Nothing is loaded. Add IDs only when the client supplies them. |
| 6 | **Legal pages** | `/privacy/`, `/terms/` | Templates, flagged on-page as pending legal review. |
| 7 | **Geo coordinates** | `src/data/business.ts` → `geo` | Approximate for the Westgrove Dr address. Confirm before relying on them in schema. |

---

## Constraints held (verified by automated sweep)

| Check | Result |
|---|---|
| `<form>` elements site-wide | **0** |
| Broken internal links | **0** |
| Pages with exactly one `<h1>` | **115 / 115** |
| Pages missing title / description / canonical / OG | **0** |
| Visible prices anywhere | **0** |
| Banned filler phrases | **0** |
| Unverified trust claims (#1 rated, licensed, 24/7, free estimate, same-day…) | **0** |
| `Review` / `AggregateRating` schema | **0** |
| Distinct `tel:` targets | **1** (`tel:+14694258874`) |
| Distinct `mailto:` targets | **1** (the placeholder) |

Conversion is click-to-call and mailto only. The email links open the user's own mail
client with a prefilled checklist (name, phone, property address, residential/commercial,
description, preferred contact).

## Schema emitted

`Electrician` + `LocalBusiness` (115) · `WebSite` (115) · `BreadcrumbList` (113) ·
`FAQPage` (84) · `Service` (72) · `Article` (13)

Deliberately absent: `aggregateRating`, `review`, `openingHours`, `priceRange`, and any
award or certification property — none are verified, and schema must not assert what the
visible page cannot support.

---

## Brand

Colours sampled directly from the supplied logo:

- Navy `#002446` — hue 209°
- Amber `#F7AA05` — hue 41°
- Volt blue `#005FB8` — the brand navy's *exact hue*, lifted in lightness, so the
  interactive colour belongs to the mark rather than sitting beside it

Measured contrast: white on navy **15.66:1** · white on volt **6.31:1** · amber on navy
**7.99:1** · amber on white **1.96:1**.

That last figure is a hard rule enforced in `tailwind.config.ts`: **amber never carries
text on light backgrounds.** It appears only as rules, icon fills, and text on navy.

The logo's lightning bolt and plug are brand-locked — they live in the mark and are not
repeated as decoration. The site's own texture is thin conduit-run grid lines, and the
signature element is a **circuit directory**: a numbered panel card (`01 / 03 / 05`),
which is what a real load centre looks like inside the door.

Generated from the single supplied PNG: `logo.png` (transparent), `logo-reverse.png`
(navy→white, amber preserved), `logo-mark.png`, `icon-32/180/512.png`, `favicon.ico`,
`og-image.png` (1200×630).

Type: Sora (display) / Public Sans (body) / JetBrains Mono (utility), loaded via `<link>`.

---

## Structure

```
src/
├── app/
│   ├── layout.tsx            root layout, fonts, skip link, global schema
│   ├── page.tsx              homepage — 14 sections
│   ├── services/             hub + [slug] (handles both categories and services)
│   ├── service-areas/        hub + [slug]
│   ├── rooms/                hub + [slug]
│   ├── resources/            hub + [slug]
│   ├── about|contact|faq/
│   ├── privacy|terms|accessibility/
│   ├── sitemap.ts robots.ts
│   └── globals.css
├── components/               Header, Footer, StickyCallBar, CTAButtons, ui,
│                             FaqAccordion, Breadcrumbs, ContactPanel, Icon, LegalPage
├── data/                     business, services (8 categories / 54 services),
│                             locations (18), roomServices (10), articles (13),
│                             faqs (11 groups), navigation, types
└── lib/                      schema.ts, seo.ts
```

`src/data/business.ts` is the single source of truth for name, phone, address and email.
Nothing is hardcoded in a component.

Navigation is **generated from the data layer** — adding a service file puts it in the
mega menu automatically, so navigation can never drift out of sync with content.

## Accessibility

Keyboard-operable throughout including mega menu and accordions; visible focus rings with
a dark-section variant; skip-to-content link; one H1 per page; landmark regions; accessible
names on icon-only controls; decorative graphics `aria-hidden`; `prefers-reduced-motion`
respected; `overflow-x: clip` guards against horizontal scroll.

---

## Still outstanding

- **~46 more service pages.** 54 written of the ~100 in the brief. Missing: residential-electrician (a named priority page), fuse-box repair, pool/hot-tub repair, underfloor heating, water-heater and furnace electrical, doorbell, exhaust fan, per-room lighting pages, several commercial variants.
- **12 more articles.** 13 written of 25.
- **Real photography.** No stock images used — the design deliberately leans on typography, colour and the panel motif instead of placeholder photos that would need replacing.
