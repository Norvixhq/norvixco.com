/* constants.js — the one place where every number that can go out of date lives.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * Almost nothing on this site expires. The calculators compute from what the
 * visitor types: loan amortization, the depreciation curve, cost per mile. That
 * math is as true in 2031 as it is today and needs no maintenance ever.
 *
 * What CAN age is the small set of national reference values the sliders start
 * at, and the one date the sitemap and JSON-LD publish. They are all here.
 *
 * HOW TO DO A REFRESH (10 minutes, whenever you feel like it — not on a schedule)
 * ------------------------------------------------------------------------------
 *   1. Change the numbers below that you want to move.
 *   2. Follow each value's PROSE list — those pages state the figure in words
 *      or use it inside a worked example, and words do not update themselves.
 *   3. Bump REVIEWED_ISO.
 *   4. cd /home/claude/gen && export MDC_SITE=/home/claude/mydrivingcost \
 *        && node build.js && node build-calcs.js && node sitemap.js
 *   5. node /tmp/harvest.js && node /tmp/defdiff.js   (defaults drift must be 0)
 *
 * THE ONE RULE THAT MATTERS
 * -------------------------
 * Every value here is ALSO a field the visitor can edit on the page. That is
 * the reason the site does not decay the way a "2026 gas prices" article does:
 * these are starting points, not claims about today. Keep them round and
 * defensible rather than precise and current. A default of $4.00 is right for
 * years; a default of $4.13 is wrong within a month.
 *
 * IMPORTANT — TWO SOURCES OF TRUTH PER CALCULATOR
 * -----------------------------------------------
 * Each generated calculator declares its defaults twice: once in the num()/rng()
 * form-field definition (which renders value="..." into the HTML, and is what
 * the page actually reads) and once in the emitted `defaults:` object (a
 * fallback used only when a field is absent). Change BOTH or the page will
 * silently compute on the old basis. /tmp/defdiff.js is the regression test.
 */

module.exports = {
  /* ---------------------------------------------------------------- the date */
  /* Feeds <lastmod> in sitemap.xml and dateModified in every page's JSON-LD.
     There is deliberately NO human-readable date anywhere on the pages: a
     visible "Reviewed July 2026" reads as abandoned the moment it is not July
     2026, whereas search engines read this one and visitors never see it. */
  REVIEWED_ISO: "2026-07-26",
  PUBLISHED_ISO: "2026-07-23",

  /* ------------------------------------------------------------- energy costs */
  /* PROSE: fuel-and-ev.js (energy table, per-mile figures, assumptions note),
     trust-methodology.js (defaults table + sources), calculators.js (defaults
     paragraph + sources), calc-fuel-cost.js, calc-cost-per-mile.js,
     calc-road-trip.js, calc-ten-year-cost.js, calc-monthly-budget.js */
  GAS_PPG: 4.0,            // $/gal regular. Round down deliberately.
  KWH_HOME: 0.175,         // $/kWh residential average — EV charging at home.
  KWH_BLENDED: 0.195,      // $/kWh home + occasional public. Cost Per Mile default.
  KWH_L2_PUBLIC: 0.32,     // $/kWh public Level 2.
  KWH_DC_FAST: 0.48,       // $/kWh DC fast charging.

  /* ------------------------------------------------------------ the benchmark */
  /* The $34,000 SUV every page reconciles against. Changing ANY of these
     invalidates the worked examples on ~20 pages and the canonical totals
     ($58,928 five-year / $982 a month / $0.98 a mile). Do not touch casually.
     PROSE: everywhere. trust-methodology.js is the specification. */
  VEH_PRICE: 34000,
  DOWN: 3400,              // 10%
  APR_NEW: 7.2,            // %
  APR_USED: 8.4,           // %
  TERM_MO: 60,
  SALES_TAX_PCT: 7,        // %
  DOC_FEE: 700,            // $ dealer fee, financed with the price
  MILES_YR: 12000,
  MPG: 30,

  /* -------------------------------------------------------- recurring annuals */
  /* PROSE: insurance.js, about.js ($2,237 vs $2,578 disagreement passage),
     trust-editorial.js, trust-faq.js, trust-methodology.js, maintenance.js */
  INSURANCE_YR: 2496,      // $ full coverage. Sits between two cited studies.
  INSURANCE_DECLINE_PCT: 3.5,
  MAINT_YR: 1250,          // $ maintenance year one
  MAINT_ESCALATION_PCT: 10,

  /* ------------------------------------------------------- depreciation curve */
  /* Structural. Reflects years of market behaviour — should not be chased.
     PROSE: depreciation.js, calc-depreciation.js, trust-methodology.js. */
  DEP_YEAR1_PCT: 20,       // % off in year one
  DEP_AFTER_PCT: 15,       // % of the remainder each year after

  /* ------------------------------------------------------------ the IRS rate */
  /* THE ONE VALUE WORTH A CALENDAR REMINDER. The IRS resets the standard
     mileage rate every January and occasionally midyear. It is a published
     legal figure, so unlike the others it can be flatly wrong rather than
     merely approximate.
     CONSUMED BY: content/calc-road-trip.js (imports these two).
     PROSE: calc-road-trip.js states the rate history in three places. */
  IRS_RATE: 0.725,         // $/mile — business use
  IRS_CENTS: "72.5",
  IRS_YEAR: "2026",
  IRS_FUEL_CENTS: "13",    // $4.00/gal at 30 MPG = 13.3c. Restate if GAS_PPG/MPG move.
  IRS_REST_CENTS: "59",    // IRS_CENTS - IRS_FUEL_CENTS, rounded.
};
