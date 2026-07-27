/* sources.js — every outbound citation on the site, in one place.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * The site names AAA, the EIA, the BLS, the IRS and the EPA constantly. A named
 * source a reader cannot click is a weaker claim than one they can, and the
 * site's whole positioning is that its numbers can be checked. This file holds
 * the verified landing page for each, so a citation is a reference to a fact
 * rather than an appeal to a brand.
 *
 * RULES FOR ADDING ONE
 * --------------------
 * 1. Prefer the EVERGREEN topic page over a year-specific release. A URL with a
 *    year in the slug is a dead link waiting to happen. Where only a dated
 *    release carries the figure, link the evergreen page AND the release.
 * 2. Actually load the URL before adding it. Every entry below was fetched and
 *    confirmed to render the content described in its note.
 * 3. External links get rel="noopener" (security) but NOT rel="nofollow" —
 *    these are genuine references and linking to authoritative sources is a
 *    signal we want to send, not suppress.
 *
 * Last confirmed live: July 2026.
 */

const CITE = {
  AAA_YDC: {
    name: "AAA, <em>Your Driving Costs</em>",
    url: "https://exchange.aaa.com/automotive/aaas-your-driving-costs/",
    note: "the study's methodology page — nine vehicle categories, five years, 75,000 miles",
  },
  AAA_YDC_2025: {
    name: "AAA, <em>Your Driving Costs</em> 2025 fact sheet (PDF)",
    url: "https://newsroom.aaa.com/wp-content/uploads/2025/09/UPDATE-AAA-Fact-Sheet-Your-Driving-Cost-9.2025-1.pdf",
    note: "the per-category cost tables behind the headline figure",
  },
  AAA_GAS: {
    name: "AAA Gas Prices",
    url: "https://gasprices.aaa.com/",
    note: "daily national and state averages for regular, mid, premium, diesel and public EV charging",
  },
  EIA_GAS: {
    name: "U.S. Energy Information Administration, <em>Gasoline and Diesel Fuel Update</em>",
    url: "https://www.eia.gov/petroleum/gasdiesel/",
    note: "weekly national and regional retail averages",
  },
  EIA_ELEC: {
    name: "U.S. Energy Information Administration, <em>Electric Power Monthly</em>",
    url: "https://www.eia.gov/electricity/monthly/",
    note: "average retail price of electricity to residential customers, by state",
  },
  EIA_ELEC_ANNUAL: {
    name: "EIA, <em>Electricity Sales, Revenue and Average Price</em>",
    url: "https://www.eia.gov/electricity/sales_revenue_price/",
    note: "the annual state-level series, useful for a longer view than the monthly table",
  },
  EPA_FE: {
    name: "EPA and U.S. Department of Energy, <em>fueleconomy.gov</em>",
    url: "https://www.fueleconomy.gov/",
    note: "official fuel-economy ratings, including MPGe and kWh per 100 miles for electric vehicles",
  },
  EPA_TEST: {
    name: "fueleconomy.gov, <em>How Vehicles Are Tested</em>",
    url: "https://www.fueleconomy.gov/feg/how_tested.shtml",
    note: "why the window sticker and your own trip computer disagree",
  },
  BLS_CEX: {
    name: "Bureau of Labor Statistics, <em>Consumer Expenditure Surveys</em>",
    url: "https://www.bls.gov/cex/",
    note: "household transportation spending as a share of total spending",
  },
  BLS_CPI: {
    name: "Bureau of Labor Statistics, <em>Consumer Price Index</em>",
    url: "https://www.bls.gov/cpi/",
    note: "the motor vehicle maintenance and repair, new vehicle and used vehicle series",
  },
  BLS_MLR_DEP: {
    name: "BLS <em>Monthly Labor Review</em>, <em>A consumption measure for automobiles</em> (January 2024)",
    url: "https://www.bls.gov/opub/mlr/2024/article/a-consumption-measure-for-automobiles.htm",
    note: "an annual depreciation rate for every vehicle age, rather than a cumulative retention figure",
  },
  IRS_MILEAGE: {
    name: "IRS, <em>Standard mileage rates</em>",
    url: "https://www.irs.gov/tax-professionals/standard-mileage-rates",
    note: "the evergreen table of business, medical, moving and charitable rates from 2011 to the current year",
  },
  FED_G19: {
    name: "Federal Reserve, <em>G.19 Consumer Credit</em>",
    url: "https://www.federalreserve.gov/releases/g19/current/",
    note: "the Terms of Credit table: new-car loan rates, average maturity and average amount financed",
  },
  IIHS_HLDI: {
    name: "IIHS &amp; HLDI, <em>Insurance losses by make and model</em>",
    url: "https://www.iihs.org/research-areas/auto-insurance/insurance-losses-by-make-and-model",
    note: "collision, comprehensive and liability loss results for hundreds of vehicles",
  },
  KBB_DEP: {
    name: "Kelley Blue Book, <em>Car Depreciation</em>",
    url: "https://www.kbb.com/car-depreciation/",
    note: "published depreciation curves and five-year retention by segment",
  },

  /* Insurance is the one major cost with no authoritative public dataset behind
     it, so we cite three commercial studies rather than one and publish the
     spread between them. Each was fetched and its headline figure confirmed. */
  VP_SOAI: {
    name: "ValuePenguin, <em>State of Auto Insurance</em>",
    url: "https://www.valuepenguin.com/state-of-auto-insurance-2026",
    note: "national and state full-coverage averages, violation surcharges and discount ranges",
  },
  INSURIFY_AVG: {
    name: "Insurify, <em>Average Cost of Car Insurance</em>",
    url: "https://insurify.com/car-insurance/average-car-insurance-cost/",
    note: "restated monthly; full-coverage and liability-only averages, nationally and by state",
  },
  INSURANCECOM_AVG: {
    name: "Insurance.com, <em>The average cost of car insurance</em>",
    url: "https://www.insurance.com/auto-insurance/average-cost-car-insurance",
    note: "a second national average on a different methodology, with the full state range",
  },
  IRC_UNINSURED: {
    name: "Insurance Research Council, <em>Uninsured and Underinsured Motorists</em>",
    url: "https://insurance-research.org/news/one-three-drivers-are-either-uninsured-or-underinsured-us-exposing-themselves-and-other",
    note: "15.4% of drivers uninsured and 33.4% uninsured or underinsured, 2023",
  },
};

/** Render one citation as a linked list item. */
function cite(key, extra) {
  const c = CITE[key];
  if (!c) throw new Error("sources.js: unknown citation key " + key);
  return (
    `<a href="${c.url}" rel="noopener" target="_blank">${c.name}<span class="sr-only"> (opens in a new tab)</span></a>` +
    (c.note ? ` &mdash; ${c.note}` : "") +
    (extra ? `. ${extra}` : ".")
  );
}

/**
 * Sources disclosure block, identical in markup to the one in page.js so the
 * hubs and the calculators present the same component.
 *
 * keys  = citation keys from CITE, or raw HTML strings for site-specific notes
 * notes = extra plain items appended after the linked citations
 */
function sourcesBlock(keys, notes) {
  const items = (keys || [])
    .map((k) => (CITE[k] ? cite(k) : k))
    .concat(notes || []);
  return `<details class="disclosure" style="margin-top:34px">
      <summary>Sources &amp; assumptions<span class="chev"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span></summary>
      <div class="disclosure-body">
        <p class="text-muted" style="font-size:.92rem;margin-bottom:12px">The defaults on this page are durable national reference points, not live market quotes. They are chosen to stay reasonable across years rather than to track this week&rsquo;s prices, and every one of them is a field you can change &mdash; your real numbers depend on your vehicle, ZIP code, driving pattern and credit. The model that consumes them is documented in full on the <a href="/methodology/">methodology page</a>.</p>
        <ul class="bullets" style="font-size:.92rem">${items.map((i) => `<li>${i}</li>`).join("")}</ul>
      </div>
    </details>`;
}

module.exports = { CITE, cite, sourcesBlock };
