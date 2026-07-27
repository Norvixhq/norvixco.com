# Keeping MyDrivingCost.com current

Short version: **this site does not need regular updates.** You could leave it untouched for a year and nothing on it would become wrong. There is one item worth a calendar reminder, and it takes about five minutes.

That is a design property, not luck. It is worth understanding why, because it also tells you what *not* to do to the site later.

## Why it does not go stale

**The calculators are arithmetic, not data.** Loan amortization, the depreciation curve, cost per mile, the cost of financing sales tax and dealer fees along with the car — none of that is a fact about 2026. It is the same math in 2036. Nothing in that layer can expire, and it is the overwhelming majority of what the site actually does.

**Every reference number is a field the visitor edits.** The sliders and inputs start somewhere, but the starting point is not a claim. A visitor with a $5.20 pump price types $5.20 and gets a correct answer. The site's value is the model, and the model belongs to their inputs.

**The defaults were deliberately chosen to be durable rather than current.** $4.00 a gallon, not $4.001 — the EIA's actual weekly reading the week this was built. A default of $4.00 is a fair starting point for years. A precise one is wrong within a month and looks authoritative while it is wrong. Same reasoning for the electricity, insurance and interest-rate defaults: each sits at a round, mid-range national level rather than tracking a spot price. The methodology page now says this in exactly those terms, so the site is not quietly claiming a currency it does not have.

**The site no longer promises a maintenance cadence.** This was the real staleness liability, and it was in the copy rather than the numbers. Earlier drafts of the editorial-standards, FAQ, methodology, terms and disclaimer pages published an explicit contract — "market-sensitive figures are reviewed quarterly", "insurance averages twice a year", "every page shows the date it was last reviewed". That is a promise that quietly breaks itself the first month you are busy, and an unkept published cadence damages trust far more than an approximate default ever could. All of it now describes a durability standard instead: a figure changes when it stops being a fair starting point, not on a schedule.

**There is no visible date anywhere on the site.** "Reviewed July 2026" reads as abandoned the moment it is not July 2026. Search engines still get the freshness signal — `dateModified` in the structured data and `<lastmod>` in the sitemap — but a visitor can never see a stale stamp.

## The one thing worth a calendar reminder

**The IRS standard mileage rate.** The IRS resets it every January. Unlike everything else here, it is a published legal figure, so it can be flatly *wrong* rather than merely approximate. It is **72.5¢ per mile for 2026**, effective 1 January 2026, and it appears on the road-trip calculator.

Set a reminder for mid-January. Change five lines in `generator/constants.js`, rebuild, done — five minutes.

```js
IRS_RATE: 0.725,        // $/mile — business use
IRS_CENTS: "72.5",
IRS_YEAR: "2026",
IRS_FUEL_CENTS: "13",   // the fuel share: $4.00/gal at 30 MPG = 13.3¢
IRS_REST_CENTS: "59",   // IRS_CENTS − IRS_FUEL_CENTS, rounded
```

Those five are wired straight into the build, so changing them changes the page. Get the new figure from the IRS's own evergreen table — [irs.gov/tax-professionals/standard-mileage-rates](https://www.irs.gov/tax-professionals/standard-mileage-rates) — which the road-trip page now links to directly, and not from a news summary. The road-trip module also states the rate in a couple of sentences of prose and splits it into a fuel share and a non-fuel share; `constants.js` says so, right above the values, and the last two constants exist so that split moves with the rate instead of drifting away from it.

One caution learned the hard way. An earlier draft of this site published a 76¢ rate "effective 1 July 2026," attributed to a specific IRS announcement. No such rate and no such announcement exist — the model that wrote it produced a plausible-looking figure rather than a real one. It was caught only when the citation link was checked against irs.gov. **When you update this number, open the IRS page and read it.** That is the whole procedure, and it is the one place on this site where being approximately right is not good enough.

## Everything else: `generator/constants.js`

That file is the register of every number on the site that could ever age — about ten of them. Each one is annotated with the pages that state it in words, because prose does not update itself.

```
GAS_PPG            $4.00/gal
KWH_HOME           $0.175/kWh          KWH_BLENDED  $0.195/kWh
KWH_L2_PUBLIC      $0.32/kWh           KWH_DC_FAST  $0.48/kWh
VEH_PRICE $34,000  DOWN $3,400  APR_NEW 7.2%  TERM 60mo  TAX 7%  MPG 30
INSURANCE_YR       $2,496/yr           MAINT_YR     $1,250/yr
DEP_YEAR1 20%      DEP_AFTER 15%
IRS_RATE           $0.725/mile         (+ IRS_CENTS, IRS_YEAR, IRS_FUEL_CENTS, IRS_REST_CENTS)
REVIEWED_ISO       the sitemap / structured-data date
```

Two honest caveats about that file:

**It is a register, not a switchboard.** `REVIEWED_ISO` and the five IRS values are consumed directly by the build. The rest are documented pointers: each figure appears both as a form-field default and inside worked prose examples that were verified to reconcile to the dollar. Changing `$0.175` to `$0.18` in one place would leave twenty pages of arithmetic silently disagreeing with itself, so those changes are a guided find-and-replace rather than a one-line edit. The file tells you exactly where to look. Wiring them fully through the generator is possible later; it was not worth the risk of quietly breaking the worked examples, and these are numbers that should barely move.

**Changing the $34,000 benchmark vehicle is a big job, not a small one.** Roughly twenty pages reconcile against it and against the totals it produces — $58,928 over five years, $982 a month, $0.98 a mile. Leave it alone unless you have a real reason, in which case budget an afternoon and re-run the verification scripts.

## The other file that can age: `generator/sources.js`

Every outbound link on the site is defined once, in `generator/sources.js` — nineteen citations, each with a name, a URL and a one-line note describing what it actually shows. Nothing on any page hardcodes a URL; the pages call `cite("AAA_YDC")` and the link is assembled from that one entry. Change a URL there and every page carrying it updates on the next rebuild.

This is the one part of the site with a genuine external dependency, because other people control those URLs. Two habits keep it healthy:

**The entries are deliberately evergreen.** Where a source publishes both a dated release and a standing topic page, the topic page is what is cited — `bls.gov/cpi/` rather than a specific month's release, `irs.gov/tax-professionals/standard-mileage-rates` rather than this year's notice. A URL with a year in the slug is a dead link waiting to happen. Three entries break that rule because the figure exists nowhere else: the AAA 2025 fact sheet PDF, the AAA 2025 press release, and the ValuePenguin study. Those are the ones to check first if you ever check.

**If you check them once a year, that is plenty.** Run the link checker in `generator/` — it reports every outbound URL and where it appears — and open the handful that matter. A rotted link is a small embarrassment, not a broken site, and a dead citation is still a more honest claim than an unlinked source name. The rule written at the top of `sources.js` is the important one: **actually load the URL before adding or changing an entry.** One of the original nineteen was a 404 for exactly the reason you would expect — it was written from memory and never opened.

## If you do want to refresh something

1. Change the value in `generator/constants.js`.
2. Follow that value's `PROSE:` list in the same file and update the pages that state it in words or use it in a worked example.
3. Bump `REVIEWED_ISO`.
4. Rebuild:
   ```
   cd generator
   export MDC_SITE=/absolute/path/to/site
   node build.js && node build-calcs.js && node sitemap.js
   ```
5. Re-upload `site/`.

The bar for step 1 is deliberately high: change a default when the national average has moved materially and stayed there — a sustained shift of more than about 10% — not because it moved this month. That is exactly what the methodology page now tells visitors, so honouring it keeps the site's claims checkable.

## What actually deserves your attention instead

If you have an hour a month for this site, spending it on defaults is the worst possible use of it. Better uses, roughly in order of return:

**New pages.** Topical authority is what moves a utility site in search, and every new calculator or guide compounds. The site is built so that adding one is a single new module in `generator/content/` plus a line in `build.js` — the shell, navigation, breadcrumbs, structured data, sitemap entry and internal linking all come for free.

**Search Console.** Once the site has been indexed a few weeks, the queries it is already ranking for on page two will tell you what to build next far better than guessing does.

None of those are maintenance. They are growth, and they happen on your schedule.

## Deploy checklist for a refresh

Rebuild, then before uploading:

```
cd site && python3 -m http.server 8811     # in one shell
cd generator && node audit.js               # in another; exits non-zero on any failure
```

Then upload `site/`. Nothing else changes — there is no build artifact, no cache to bust, no database migration.
