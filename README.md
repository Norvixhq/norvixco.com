# MyDrivingCost.com

**Know the Real Cost Before You Drive.**

---

> ## ⚠︎ Read this first: double-clicking `site/index.html` will look broken. It is not.
>
> You will get raw unstyled HTML and an enormous blue logo. Every page will look that way. **Nothing is wrong with the site** — it simply cannot render off the disk.
>
> Every asset on this site is referenced by a **root-absolute path** (`/assets/css/styles.css`). That is what keeps the live URLs clean and extension-free, which was a hard requirement. Under `file://` the browser resolves `/assets/…` against the root of your hard drive, finds nothing, and shows you the bare HTML. Over HTTP — any host, any local server — it resolves correctly and the page looks the way it should.
>
> **To see it properly, do either of these:**
>
> - **Double-click `preview.command`** in this folder. It starts a small local server and opens your browser. (macOS marks files downloaded from the internet as untrusted, so the first time you may need to **right-click → Open → Open** instead of double-clicking. If it will not run at all, open Terminal and run `chmod +x preview.command` once.)
> - Or, in Terminal: `cd site && python3 -m http.server 8811`, then visit **http://localhost:8811**.
>
> Every page also carries a small banner explaining this if you open it as a file anyway. The banner only ever appears under `file://` and can never show up on the live site.

---

An evergreen utility site for understanding the true, total cost of vehicle ownership — fifteen interactive calculators plus the guide, hub and trust pages around them, built as a fast, dependency-free static site with no build step required to serve it.

**Start here:** `preview.command` to look at it, `DEPLOY.md` to put it online, `GITHUB-PAGES.md` if the host is GitHub Pages specifically, `MAINTENANCE.md` for the one number that ever needs updating, `REMAINING-ITEMS.md` for the honest list of what was deferred.

> **Deploying to GitHub Pages?** Read `GITHUB-PAGES.md` first. Pushing this whole folder and publishing from the repository root makes GitHub render *this README* as your homepage while the real site sits one directory too deep with every asset 404-ing. It is a five-minute fix and there is a pre-laid-out package for it.

---

## What's in this package

Two folders, and only one of them goes online.

```
mydrivingcost/
├── site/            ← upload the CONTENTS of this folder to your host
├── generator/       ← the dev tool that produced site/. Never upload this.
└── preview.command  ← double-click to view the site locally. Never upload this.
```

**The word CONTENTS is doing real work in that first line.** Upload what is *inside* `site/`, so that `index.html` lands at the root of your domain. If the folder itself ends up on the host, every page will sit at `yourdomain.com/site/…` and every asset reference — all of which are root-absolute — will 404 against `yourdomain.com/assets/…`. The result looks identical to the `file://` problem above: correct HTML, no styling. This is the single most common way to misdeploy this site.

`generator/` is Node scripts that write `site/`. It is how you add a page or change a number later. It is not needed to serve the site, and putting it on a public host would expose your source. `DEPLOY.md` says this again, louder.

## What's live

**31 indexable pages plus a custom 404.** The homepage, fifteen calculators and their hub, four topic hubs (fuel and EV, insurance, depreciation, maintenance), a guides library and buying guides, and eight trust and policy pages (about, contact, methodology, editorial standards, FAQ, privacy, terms, disclaimer).

The fifteen calculators: True Cost to Own (the flagship), Cost Per Mile, Lease vs Buy, Auto Loan, Fuel Cost, EV Charging, Depreciation, Insurance Estimator, Maintenance Cost, New vs Used, Trade-In Value, Affordability, Monthly Budget, Ten-Year Cost, Road Trip.

Every one of them has live sliders and instant recalculation, editable advanced assumptions, hand-built SVG charts with hover tooltips, a shareable URL that encodes the current inputs, print/save-to-PDF styling, a floating summary bar on scroll, worked examples in prose, common mistakes, an FAQ, a sources disclosure and links to related calculators.

## The URL architecture — read this before you touch anything

Every URL on this site is **directory-based and extensionless**. `/calculators/true-cost-to-own/`, not `/calculators/true-cost-to-own.html`. There is **no `.html` in any href on any page**, and **no `#fragment` navigation anywhere** — in-page jumps are handled in JavaScript so a fragment never enters the address bar.

This is structural, not cosmetic. Every page is written as `<dir>/index.html` and every internal link is root-absolute and slash-terminated. The generator enforces it; you cannot easily break it by accident. Two consequences worth knowing:

**Do not open `site/index.html` directly in a browser** — see the warning at the top of this file. Use `preview.command`, or serve it over HTTP yourself:

```bash
cd site
python3 -m http.server 8811
# then visit http://localhost:8811
```

`preview.command` does exactly this, picks a free port, opens your browser, and falls back to Ruby, PHP, npx or a small built-in Perl server if the Mac has no usable `python3`. It is a developer convenience only — it lives in the package root, not in `site/`, so it is never uploaded.

**Your host needs to be configured for clean URLs.** Config files for the four common hosts ship in `site/`: `.htaccess` (Apache), `_redirects` and `netlify.toml` (Netlify), `vercel.json` (Vercel), `_headers` (Netlify/Cloudflare). `DEPLOY.md` covers each.

## Assets are self-hosted, on purpose

**The fonts are not loaded from Google Fonts.** Inter (400/500/600/700/800) and Sora (600/700/800) are self-hosted as sixteen subsetted woff2 files in `site/assets/fonts/`, with `unicode-range` subsetting and `font-display: swap`. This is faster, private, and — critically — **required**, because the site ships a strict `Content-Security-Policy: default-src 'self'`. Adding a Google Fonts link would be blocked by the CSP and the fonts would silently fail to load.

Same reasoning applies to everything else: no CDN, no analytics script, no chart library, no framework. The charts are hand-built SVG. If you add a third-party script later you must widen the CSP in `site/_headers` and `site/netlify.toml` deliberately.

## Project structure

```
site/
├── index.html                      # Homepage (hand-maintained, not generated)
├── 404.html                        # Custom 404, wired up in every host config
├── calculators/
│   ├── index.html                  # Calculator hub
│   └── <fifteen>/index.html        # One directory per calculator
├── about/ contact/ methodology/ faq/ privacy/ terms/ disclaimer/
├── editorial-standards/ guides/ buying-guides/
├── fuel-and-ev/ insurance/ depreciation/ maintenance/
├── assets/
│   ├── css/styles.css              # The whole design system: tokens, components, dark mode, print
│   ├── js/main.js                  # Nav, theme, scroll-reveal, anchor interception, shared helpers
│   ├── js/calc-kit.js              # The declarative calculator harness
│   ├── js/<fifteen>.js             # One model per calculator
│   ├── fonts/                      # 16 subsetted woff2
│   └── img/                        # logo (light/dark, h/v), favicon, PWA icons, OG image
├── sitemap.xml · robots.txt · site.webmanifest
└── .htaccess · _redirects · _headers · netlify.toml · vercel.json
```

**Thirteen of the seventeen JS files are generated.** Editing `site/assets/js/cpm.js` works until the next rebuild silently reverts it — the source of truth is `generator/content/calc-cost-per-mile.js`. The four hand-maintained exceptions are `main.js`, `calc-kit.js`, `tco.js` and `lvb.js`, plus the homepage and the two hand-written calculator pages (`true-cost-to-own`, `lease-vs-buy`). `REMAINING-ITEMS.md` repeats this warning where it matters.

## Design system

Everything is driven by CSS custom properties in `assets/css/styles.css` under `:root` (light) and `:root[data-theme="dark"]` (dark). Change a brand color or a radius in one place and it propagates sitewide.

**Brand:** `--brand` (blue), `--navy`, `--accent` (red). Note there are two reds — `--accent` (#c81d14) is the contrast-adjusted one used for text, `--accent-decor` (#e5261c) is the vivid brand red used for decoration. Do not swap them; the first exists to pass WCAG AA.

**Type:** Inter for UI and body, Sora for display headings.

**Charts:** category colors are `--c-deprec / --c-fuel / --c-insure / --c-maint / --c-finance / --c-tax / --c-opp`, validated for colour-blind separation and contrast in both themes. Keep new chart colors on the same set.

**Dark mode:** an inline `<head>` script applies the saved or OS theme before first paint, so there is no flash. The toggle persists to `localStorage` inside a try/catch. The logo swaps to a dark-optimised file rather than being filtered.

**No-JS safe:** scroll-reveal animations are gated behind a `.js` class, so all content is fully visible if JavaScript never runs. The calculators need JS; everything else does not.

## The True Cost to Own model

```
Total cost = Depreciation + Financing interest + Insurance
           + Fuel/Energy + Maintenance + Taxes & Fees  (+ optional Opportunity cost)

Cost per mile = Total ÷ (annual miles × years)
```

**Depreciation** is purchase price minus projected resale, on an editable first-year drop then a per-year rate (site default: 20% off in year one, 15% of the remainder each year after). **Financing interest** is the interest actually paid during the ownership window, on full amortization — principal is not double-counted, because it lives inside depreciation. Every loan-modeling calculator finances the *out-the-door* price: vehicle plus sales tax plus fees, minus down payment. **Fuel or energy** is miles ÷ efficiency × price, switched per powertrain. **Maintenance** is an editable first-year figure that escalates with age.

Six cost categories, deliberately matching the six AAA uses in *Your Driving Costs*, so the site's benchmark can be compared against theirs directly. The ten-year calculator uses seven because it breaks out a separate major-repair allowance from year nine — that difference is intentional and documented.

Defaults are grounded in public data and **all of them are editable fields**. Every source the site names is now linked to the dataset it names — twenty external URLs across the site, defined once in `generator/sources.js`. Everything shown to a visitor is labeled an estimate, and the footer carries a not-financial-advice disclaimer.

## Where to go next

The site is built to expand: adding a page is one new module in `generator/content/` plus one line in `build.js`, and the shell, navigation, breadcrumbs, structured data, sitemap entry and internal linking all come for free. `REMAINING-ITEMS.md` lists the highest-return candidates, in order, along with everything I deferred and why.

---

© MyDrivingCost.com — Made for drivers, not dealerships.
