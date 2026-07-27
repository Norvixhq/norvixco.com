# MyDrivingCost.com — calculator module spec

You are writing ONE CommonJS module under `/home/claude/gen/content/`. It is consumed by
`/home/claude/gen/calcpage.js` (`C.writeCalc(cfg)`), which emits a clean-URL static page
plus its companion JS file. Read these three files FIRST and follow them exactly:

1. `/home/claude/gen/calcpage.js` — the composer and every helper you may use.
2. `/home/claude/gen/content/calc-depreciation.js` — the canonical example. Mirror its shape.
3. `/home/claude/mydrivingcost/assets/js/calc-kit.js` — the runtime harness (`MDC.calc`).

## Hard rules

- **No `.html` anywhere and no `#fragment` in any `href`.** Every internal link is
  root-absolute and ends in a slash: `/calculators/auto-loan/`. This is a client requirement.
- Plain ES5 inside the `js` template string (the site ships no build step): `var`, no arrow
  functions, no template literals, no `const`/`let`, no optional chaining.
- The module is a normal Node file, so `${...}` inside its own JS-payload template string
  must be escaped as `\${...}` or avoided entirely. The example avoids it — do the same.
- Do NOT use `\\"` inside a double-quoted JS string. Use `&ldquo;` / `&rdquo;` entities.
- Only these formatter names exist for `data-fmt`: `money money2 num pct perMile cents x1 x2 raw`.
- Charts: only `MDC.charts.donut(host, [{label,value,cssVar}], {centerLabel,centerValue,centerSub,aria})`
  and `MDC.charts.area(host, [{x,y}], {cssVar,yMax,animate,yFmt,xFmt,xLabelFmt,aria})`.
  The area chart is SINGLE-SERIES only. For comparisons, render `.bd-row` markup by hand
  (see `calc-depreciation.js` `render`) or build an HTML table into a `<div>`.
- Category CSS vars: `--c-deprec --c-fuel --c-insure --c-maint --c-finance --c-tax --c-opp`.
- `api` inside `onSeg`/`onInput`/`render` exposes `setSeg(name,val)`, `setField(id,val)`,
  `read()`, `write(vals)`, `run(animate)`. There is no `api.set`.
- Every key in `defaults` must correspond to an input `id` or a `data-seg` name. Segmented
  values arrive as STRINGS; number fields arrive as numbers.
- `compute()` must return every key referenced by a `data-out` attribute on the page.

## Canonical assumptions — use these defaults so all calculators agree

| Assumption | Value |
|---|---|
| Vehicle price | $34,000 |
| Down payment | $3,400 |
| Loan APR | 7.2% |
| Loan term | 60 months |
| Ownership period | 5 years |
| Annual miles | 12,000 |
| Depreciation | 20% year one, 15% each year after (≈42% retained at 5 years) |
| Combined MPG | 30 |
| Gasoline | $4.00 / gal |
| EV efficiency | 28 kWh/100 mi (32 at the plug) |
| Home electricity | $0.175 / kWh |
| Public L2 | $0.32 / kWh · DC fast $0.48 / kWh |
| Full-coverage insurance | $2,496 / yr (~$208 / mo) |
| Maintenance, repairs & tires | $1,550 / yr (5-year average) |
| Sales tax | 7% · registration $220 / yr · dealer fees $700 |

Reference points the site already publishes and must not contradict:
- Our benchmark $34,000 SUV: **$57,631 total 5-year cost, $0.96 / mile, $11,526 / yr, $14,199 resale**.
- AAA *Your Driving Costs* 2025: **$11,577 / yr, ≈77¢ / mile at 15,000 mi/yr**; depreciation
  $4,334/yr, finance charges $1,131/yr; small sedan ≈56¢/mi, pickup ≈92¢/mi.
- Full-coverage insurance national average $2,496/yr; range roughly $2,237–$2,578 by source.
- 5-year value retention: pickups 55–65%, body-on-frame SUVs 50–60%, compact/mid SUVs 45–55%,
  mainstream sedans 40–50%, EVs 30–45%, luxury sedans 30–40%.

## Voice and depth

British-inflected, precise, quietly authoritative — Stripe docs crossed with a good broadsheet.
Short declarative sentences. No hype, no exclamation marks, no emoji, no "unlock" or "dive in".
Challenge received wisdom where the numbers justify it. Every prose section must teach something
a reader could not get from the calculator alone.

Required prose sections (as `<h2 id="...">` headings inside the `prose` string), roughly
1,300–1,800 words total:
- what the number means and why it matters
- the formula, in a `callout()`
- at least one substantive `table()` of real benchmark data
- a "how to do better" `bullets()` list of 6–8 concrete items
- a "common mistakes" section with one `callout(..., "warn")`

Plus 7–8 genuinely useful `faq` pairs, each answered in 60–110 words of plain prose (no lists,
no markup beyond the occasional `<strong>`). Write them to win featured snippets: the first
sentence must answer the question directly.

`related` must be 4 entries drawn from these live URLs only:
`/calculators/true-cost-to-own/`, `/calculators/cost-per-mile/`, `/calculators/depreciation/`,
`/calculators/fuel-cost/`, `/calculators/ev-charging/`, `/calculators/auto-loan/`,
`/calculators/lease-vs-buy/`, `/calculators/`, `/depreciation/`, `/insurance/`,
`/maintenance/`, `/fuel-and-ev/`, `/buying-guides/`.

## Deliverable

Write the file, then verify it parses: `node -e "require('/home/claude/gen/content/<file>')"`.
Do not run the builder and do not edit any other file. Report the filename and nothing else.
