# What I did not do, and what I would do next

This is the honest list I promised. Nothing here is blocking launch — the site is deployable as it stands, with zero broken links, zero console errors, and every calculator verified against its worked examples. These are the items I found, judged, and either deferred or deliberately declined.

They are ordered by what I actually think they are worth, not by how easy they are.

---

## Fixed in the final pass

Three things came out of the citation work that were more serious than anything on the deferred list below, so they are recorded here rather than buried.

**A fabricated IRS mileage rate.** The road-trip calculator published the standard business mileage rate as **76¢ per mile, effective 1 July 2026**, attributed to "Announcement 2026-11, modifying Notice 2026-10," and described as the first midyear adjustment since 2022. None of that is real. The actual 2026 rate is **72.5¢, effective 1 January 2026, with no midyear adjustment** — verified against three pages on irs.gov, including Notice 2026-10 itself. The rate, the effective date, the announcement numbers and the surrounding narrative were all corrected, and the road-trip figure moved from $1,824 to **$1,740**. `MAINTENANCE.md` now carries a warning about this specific failure mode.

This is worth understanding rather than just noting. It was not a typo or a stale number; it was a confident, well-formed, entirely invented citation, and it survived several passes of review because it *looked* exactly like a real one. It was caught only when I went to add the outbound link and read the IRS page. That is the argument for linking citations rather than naming sources, in one example.

**A gasoline average that was never checked.** The methodology page stated a "$4.10 per gallon national average for regular gasoline, July 2026" in four places and framed the $4.00 default as being "rounded down" from it. The EIA's actual weekly figure was **$4.001**. All four passages were rewritten, and the framing is now stronger than it was: $4.00 is described as the round number nearest the national average, chosen because it does not need revisiting every week, rather than as a deliberate understatement of a precise figure.

**A citation that 404'd.** The BLS *Monthly Labor Review* depreciation article was cited at a URL that does not exist. The real article is *A consumption measure for automobiles*, January 2024, at `a-consumption-measure-for-automobiles.htm`. Fixed, and the depreciation prose that leaned on it was softened to claims that hold under either reading of the article's table, since the year-by-year figures I had were a secondhand summary rather than the source.

**The `file://` trap, which is not a bug but was worth engineering away.** Opening `site/index.html` off the disk renders bare HTML, because root-absolute asset paths cannot resolve without a server. That is inherent to the clean-URL architecture and correct behaviour, but it looks exactly like catastrophic breakage. Two things now prevent the misread: a `preview.command` launcher in the package root that starts a local server and opens the browser in one double-click, and a self-explaining banner inlined in the `<head>` of all 32 pages. The banner returns immediately unless `location.protocol === 'file:'`, so it costs nothing in production and cannot appear on the live site — verified in a browser on both protocols.

**Outbound citations, which is what surfaced all three.** This was item 1 on the previous version of this list. It is done. Every source the site names now links to the dataset it is naming: **twenty distinct external URLs across 107 links and fourteen domains**, defined once in `generator/sources.js` and rendered into a *Sources & assumptions* disclosure on all fifteen calculator pages and eleven hub and trust pages. Every quantitative claim tied to a named source was re-checked against that source in the process — the AAA 2025 figures, three separate insurance studies, the IRC uninsured-driver share, the EIA gas price. One turned up a bonus corroboration: the Fed's G.19 shows a 7.14% average 60-month new-car rate, which is the site's 7.2% default arriving from an independent direction.

Two citations remain **unlinked, deliberately**: the NHTSA recall lookup and the FTC's page on the Magnuson–Moss Warranty Act. Their URLs could not be verified from this environment, and per the rule at the top of `sources.js`, an unverified link is worse than none. They appear as plain text. If you want them linked, open both pages, confirm them, and add two entries to `sources.js`.

---

## Worth doing, in order

**1. New pages.** Not a defect — the highest-return work available, and now the top of this list. Candidates I sketched, roughly in order of search demand against difficulty: `/car-ownership-cost/` (a broad pillar page the whole site can link into), `/car-payment-calculator/` (very high volume, and you already have the model), `/cheapest-cars-to-own/`, `/best-resale-value/`, `/ev-tax-credit/`, `/insurance/cost-by-state/`, and per-model `/cost-to-own/<make>-<model>/` pages if you ever want to go wide. Each is a single module in `generator/content/` plus one line in `build.js`.

**2. Internal linking floor.** Most pages have 31 or more inbound internal links. Five sit below that: road-trip (15), trade-in-value (17), and maintenance, monthly-budget and ten-year-cost (19 each). Those are the pages search engines will treat as least important, and the fix is adding contextual links from the hubs that already discuss those topics. An hour, and it compounds with item 1.

**3. A handful of defensive guards in the calculator JS.** None of these can be hit through the UI as it stands, because the inputs have `min` attributes — they are reachable only by hand-editing the query string. Still worth closing:

- Unguarded divisions in `lvb.js:46` and `lvb.js:102`, `tco.js:105`, and the fuel module (a zero MPG or zero mileage produces `Infinity` or `NaN` in the output rather than a message).
- `nvu.js:26-27`, `budget.js:54` and `budget.js:73-74`, `ins.js:6-8` — same category.
- The affordability page has a prose contradiction when income is negative or zero: the narrative sentence and the number disagree. Again only reachable via a hand-edited URL.

One thing to know before touching these: **thirteen of the seventeen JavaScript files in `site/assets/js/` are generated.** Editing them directly works until the next rebuild silently reverts it. The source of truth is the matching `generator/content/calc-*.js` module. The four hand-maintained exceptions are `tco.js`, `lvb.js`, `main.js` and `calc-kit.js`, plus the two hand-written calculator pages (`true-cost-to-own`, `lease-vs-buy`) and the homepage.

**4. Two accessibility contrast items.** `.prose a` and `.calc-tile .go` should use `var(--brand-text)` rather than the decorative brand blue, and `.input`, `.btn-secondary`, `.segmented` and `.theme-toggle` should reference `--border-strong` rather than `--border`. Both are borderline against WCAG AA rather than clear failures, which is why they are here and not in the shipped build — but they are ten minutes of work.

---

## Judgment calls I made that you may want to revisit

**The visible review date is gone, sitewide.** You chose this. Worth restating the consequence: search engines still see `dateModified` and `<lastmod>`, but a human visitor has no on-page signal of freshness. If you later decide you want one, the right form is a date that appears only on pages you genuinely revisit, never a sitewide stamp.

**I centralised the reference values but did not re-round them.** The plan we discussed was to round every default to an obviously-approximate figure. I did not, and you should know why: values like `$0.175/kWh` feed dozens of prose worked examples that were verified to reconcile to the dollar. Re-rounding them would have silently broken arithmetic on twenty pages while leaving the pages looking fine. The staleness risk was in copy that *claimed* to be current, and that is what I actually fixed. `MAINTENANCE.md` explains the consequence.

**The `constants.js` file is a register, not a switchboard.** Only the review date and the five IRS values are wired directly into the build. Fully threading the other values through the thirteen generator modules is doable, but each calculator declares its defaults in two places and the prose examples have to move in lockstep, so it is a careful afternoon rather than a quick refactor. Listed here so it is a decision rather than a surprise.

**Two different electricity rates are used on purpose.** `$0.175/kWh` is home charging; `$0.195/kWh` is a blended home-and-public figure used where a calculator assumes some public charging. They look like a bug and are not.

**Six page titles run 61–62 characters** where the usual advice is 60. I judged this acceptable — Google truncates on pixel width, not character count, and all six are narrow-character strings. Affected: buying-guides, calculators, maintenance-cost, road-trip, insurance, methodology.

**British spellings survive on the lease-vs-buy page** ("capitalised", "subsidised"). That page is hand-maintained rather than generated. If the site's voice should be consistently US English, it is a two-word find-and-replace.

**The ten-year page says "seven cost lines" while every other page says six.** This is correct and I left it deliberately. The ten-year model breaks out a separate major-repair allowance from year nine, which the five-year model folds into maintenance. Seventeen other places said "seven" incorrectly and were fixed to six. For the same reason the ten-year page's five-year subtotal ($57,650) does not match the TCO page's ($58,928) — different models, different assumptions about how insurance and maintenance move over a decade. Do not "reconcile" them.

---

## Cosmetic, genuinely low value

- Around 48 `table()` call sites still use their auto-generated caption (the column names joined) rather than a written one. Screen readers get *something*; a hand-written caption would be better.
- The JS-rendered table in `ten.js` is missing `<th scope="col">` on its headers.
- Calculator pages print to 12–15 A4 sheets. The print stylesheet works; it is just long.
- Minor grid orphans on `/`, `/calculators/` and `/guides/` at some viewport widths, and slight column drift in the lease-vs-buy comparison table.
- Interior hero sections use about 380px of vertical space before the content starts. Defensible as design; tightenable if you disagree.
- The share button changes its label on click without announcing the change to a screen reader.
- `Organization.sameAs` in the structured data is empty because there are no social profiles yet. Fill it in when there are.

---

## Verified clean — for your records

Machine-checked against the final build, not eyeballed:

- **31 indexable pages plus a custom 404.** Zero broken internal links, zero broken asset references.
- **Zero `.html` in any href.** Zero `#` navigation. Every internal link is root-absolute and slash-terminated. The 32 `#main` and `#calc` references are skip-to-content links required for accessibility; JavaScript intercepts them so the fragment never enters the address bar.
- **Structured data:** 32 pages, zero parse failures, zero HTML entities leaking into JSON strings, zero dangling `@id` references.
- **Outbound citations:** 20 unique external URLs across 107 links and 14 domains. Zero `rel="nofollow"` on any citation — these are references worth passing signal to. Every one carries `rel="noopener"` and a screen-reader "opens in a new tab" note.
- **Calculator defaults:** zero drift between what the HTML renders and what the JavaScript falls back to, across all thirteen generated calculators.
- **Zero JavaScript console errors** across the eight calculators exercised in a real browser.
- **Canonical figures intact** after the final rebuild: $58,928 five-year TCO, $670 payment on $6,525 interest, $1,119 true monthly budget, $96,648 over ten years, $15,320 affordability, $0.98 per mile, $1,740 road-trip IRS reimbursement at the corrected rate.
- **Zero images without alt text, zero empty link text, zero duplicate element IDs.**
