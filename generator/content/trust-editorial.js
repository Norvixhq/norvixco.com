const P = require("../page");
const { table, callout, bullets, topicCards, sources, SITE, cite } = P;

const body = `
<section class="section-tight">
  <div class="container container-narrow prose">

    <h2>The standard we hold ourselves to</h2>
    <p>MyDrivingCost.com publishes numbers that people use to make five-figure decisions. That imposes an obligation. A figure on this site should be traceable to a source, reproducible from published assumptions, corrected quickly when it is wrong, and free of any commercial interest in the answer it produces.</p>
    <p>This page sets out how we meet that obligation: who writes the site, how figures are sourced and checked, what happens when we get something wrong, and — the part most sites in this category are vague about — how the site makes money and what that money does not buy.</p>

    ${callout(
      "The short version",
      `<ul class="bullets" style="margin:0"><li>No dealership affiliation. No manufacturer sponsorship. No lead generation.</li>
      <li>No paid placement in any calculator, comparison or ranking. Ever, under any commercial arrangement.</li>
      <li>Every default assumption is published in full on the <a href="/methodology/">methodology page</a> and is editable by the reader.</li>
      <li>Corrections are made promptly and disclosed, not quietly patched.</li>
      <li>If advertising or affiliate relationships are ever introduced, they will be disclosed on the page where they appear and will never alter a calculated result.</li></ul>`
    )}

    <h2>Who writes this</h2>
    <p>MyDrivingCost.com is an independent publication. The site is written and maintained by a small editorial team with backgrounds in consumer finance writing, data analysis and automotive cost research. We are not a dealer group, a manufacturer, a lender, an insurer, a broker, a comparison marketplace or a lead generator, and we are not owned by any of them.</p>
    <p>That independence is structural rather than aspirational. We have no sales relationship with anyone whose product a reader might buy after using our calculators, which means there is no commercial route by which a number on this site could be nudged in a particular direction. There is nobody to nudge it for.</p>
    <p>Editorial responsibility for every figure, every default and every published claim sits with the editorial team. Where a piece draws on specialist input — a technician on repair intervals, an underwriter on rating factors — that input informs the writing and is checked against published data before it is published. It does not confer sponsorship, and no external contributor has approval rights over what we publish.</p>

    <h2>How figures are sourced</h2>
    <p>Every number on this site falls into one of four categories, and each is handled differently.</p>

    ${table(
      ["Type of figure", "Where it comes from", "How it is verified"],
      [
        [
          "<strong>National reference points</strong>",
          "Published studies and government datasets — AAA <em>Your Driving Costs</em>, EPA fuel-economy ratings, EIA energy prices, published insurance rate studies",
          "Cited by name on the page that uses it, and re-checked against the source whenever the figure it supports changes",
        ],
        [
          "<strong>Model defaults</strong>",
          "Derived from the reference points above, then rounded to a figure that is easy to reason about and easy to override",
          "Published in full in the assumptions table on the <a href=\"/methodology/\">methodology page</a>; every one is editable by the reader",
        ],
        [
          "<strong>Calculated results</strong>",
          "Produced in the reader's browser from the reader's own inputs, using published formulas",
          "Formulas are published; the benchmark case is reconciled line by line so the arithmetic can be checked independently",
        ],
        [
          "<strong>Market ranges and rules of thumb</strong>",
          "Observed distributions — segment value retention, insurance state spreads, discount bands",
          "Published as ranges, not point estimates, because that is what the underlying data supports",
        ],
      ]
    )}

    <p>Where credible sources disagree, we publish the disagreement rather than resolving it silently. Full-coverage insurance is the clearest example: Insurify reported $2,237 a year in July 2026 and Insurance.com reported $2,578 for 2026. Our default sits between them at $2,496, and we say on the <a href="/insurance/">insurance hub</a> and in the methodology exactly why. Picking the lower figure would make ownership look cheaper; picking the higher would make our totals look more authoritative. Neither is a reason to pick one.</p>

    <h2>How figures are checked before publication</h2>
    ${bullets([
      "<strong>Every quantitative claim is traced to a named source</strong> before it goes live. A number we cannot attribute does not get published, however plausible it sounds.",
      "<strong>Every worked example is reconciled.</strong> If a page shows a total, the components must add to it. Our benchmark's six categories are published with their derivations precisely so that a reader can check the sum.",
      "<strong>Internal consistency is enforced across the whole site.</strong> All calculators share one set of canonical assumptions. If the fuel-cost calculator and the true-cost-to-own calculator disagreed about the price of a gallon, both would be wrong, and a reader comparing them would be misled by us rather than by the market.",
      "<strong>Formulas are checked against the arithmetic, not against intuition.</strong> Loan interest comes from a full monthly amortization schedule, never from a shortcut that happens to look about right.",
      "<strong>Rounding is disclosed where it matters.</strong> Sub-totals in published tables are rounded; the model carries unrounded values. Where the two differ by a dollar, we say so rather than quietly adjusting a line to make the column add up.",
      "<strong>Claims about what readers should do are separated from claims about what the data says.</strong> Advice is labeled as such and is never presented as a finding.",
    ])}

    <h2>How we make money — and what that does not buy</h2>
    <p>This is the section that should decide whether you trust the rest of the site, so it is written as plainly as we can manage.</p>
    <p>MyDrivingCost.com is free to use. There is no subscription, no paywall, no account, no sign-in and no gated result. The calculators do not ask for your email address in exchange for a number, because the moment a tool does that, the number stops being the product and you become it.</p>

    ${callout(
      "What we do not do, and will not do",
      `<ul class="bullets" style="margin:0">
      <li><strong>We are not affiliated with any dealership</strong>, dealer group or dealer network, and we do not sell, broker or arrange the sale of vehicles.</li>
      <li><strong>No manufacturer sponsors our results.</strong> No carmaker has paid for, reviewed, approved or influenced any figure, ranking or comparison on this site.</li>
      <li><strong>There is no paid placement in any calculator or comparison.</strong> No lender, insurer, dealer or manufacturer can buy a position, a default value, a favorable assumption or an inclusion in any tool, table or ranking. This is not for sale at any price.</li>
      <li><strong>We do not sell, rent or broker reader data.</strong> Your calculator inputs never leave your browser — see the <a href="/privacy/">privacy policy</a> for exactly what that means technically.</li>
      <li><strong>We do not generate leads.</strong> Using a calculator will not produce a phone call from a dealer, because we have no mechanism by which that could happen.</li></ul>`,
      "warn"
    )}

    <p>If advertising or affiliate relationships are ever introduced to fund the site, three rules will apply without exception, and we are publishing them now, in advance, so that they can be held against us later:</p>

    ${bullets([
      "<strong>Disclosure on the page.</strong> Any advertising or affiliate relationship will be disclosed on the page where it appears — not buried in a site-wide footer, not in a policy nobody reads. If a link earns us money, it will say so next to the link.",
      "<strong>No influence on any calculated result.</strong> A commercial relationship will never change a default assumption, a formula, a residual-value curve, a premium estimate or the order of any comparison. The model is downstream of the data and nothing else. If a relationship could not survive our publishing a result that embarrasses the partner, we will not enter it.",
      "<strong>No editorial approval rights.</strong> No commercial partner will ever review, approve or veto content before publication, or be given advance sight of a comparison in which their product appears.",
    ])}

    <p>The test we apply is simple: could a reader who knew everything about our commercial arrangements still trust the number? If the answer is no, the arrangement does not happen.</p>

    <h2>Independence of the numbers</h2>
    <p>Independence is easy to claim and hard to demonstrate, so here is the demonstration. The model is fully published on the <a href="/methodology/">methodology page</a>: every default, every formula, every source, every limitation. A reader can rebuild our benchmark in a spreadsheet in twenty minutes and check whether $19,801 of depreciation, $12,480 of insurance, $8,000 of fuel, $7,941 of maintenance, $6,525 of interest and $4,180 of taxes and fees really do add to $58,928.</p>
    <p>A model you can reproduce is a model that cannot be quietly biased. That is the point of publishing it. It is also why every assumption on the site is editable: if you disagree with our fuel price, our depreciation curve or our insurance figure, you are not stuck with them, and the tool will show you exactly how much your disagreement is worth in dollars.</p>
    <p>We also publish results that are inconvenient. Our benchmark shows that a $670.09 monthly payment corresponds to roughly $982 a month of real cost. Extended warranties, dealer add-ons and long loan terms come off badly in our guides. Electric vehicles come off well on running cost and less well on depreciation and insurance. None of these conclusions is negotiable by anyone with a checkbook.</p>

    <h2>Corrections policy</h2>
    <p>We will get things wrong. The relevant question is what happens next.</p>

    ${table(
      ["What kind of error", "What we do", "How fast"],
      [
        [
          "<strong>Factual error in a published figure</strong>",
          "Correct the figure, correct every page that repeats it, and note the correction and its date on the affected page",
          "Within a few days of verification",
        ],
        [
          "<strong>Error in a formula or calculator</strong>",
          "Fix the code, re-verify the benchmark reconciliation, and note the change in the methodology review record",
          "As a priority, ahead of any new work",
        ],
        [
          "<strong>Source superseded by newer data</strong>",
          "Update the figure and the citation, along with every page that quotes it, so the site cannot contradict itself",
          "When the shift is material",
        ],
        [
          "<strong>Ambiguous or misleading wording</strong>",
          "Rewrite for clarity; silent for typographical fixes, noted where the meaning changes",
          "Promptly",
        ],
        [
          "<strong>Broken link or navigation fault</strong>",
          "Fixed without annotation",
          "Promptly",
        ],
      ]
    )}

    <p>We do not delete pages to make an error disappear, and we do not change a number without changing the pages that quote it. If a correction alters a headline figure that other pages depend on — the benchmark total, for instance — the whole chain is updated together so the site never contradicts itself.</p>
    <p>To report an error, email <a href="mailto:corrections@mydrivingcost.com">corrections@mydrivingcost.com</a> or use the <a href="/contact/">contact page</a>. Tell us the page, the figure, what you believe is correct and where that comes from. Reports with a source attached are actioned fastest, and we would far rather receive a blunt correction than a polite silence.</p>

    <h2>Standards for updating figures when the market moves</h2>
    <p>Consumer-cost content decays, and the usual remedy &mdash; republishing this week&rsquo;s numbers &mdash; decays fastest of all. A page pinned to a spot price is wrong within the month. Our approach is the opposite: the defaults here are deliberately durable reference points rather than live market readings, every one of them is an editable field, and the model that consumes them is published in full on the <a href="/methodology/">methodology page</a>. These are the standards that govern them.</p>

    ${bullets([
      "<strong>Defaults are reference points, not live data.</strong> Fuel, electricity and interest-rate defaults are set at round, defensible national levels that stay usable across years rather than tracking a spot price. That is why they are round numbers, and why every one of them is a field you can change in a second.",
      "<strong>Structural figures change slowly and are treated that way.</strong> Depreciation curves, maintenance schedules and segment retention bands reflect years of market behavior and should not be chased quarter to quarter. Reacting to noise is its own kind of inaccuracy.",
      "<strong>A material move triggers an update.</strong> A sustained shift of more than 10% in a national average is the point at which a default stops being a fair starting point and gets changed. Ordinary month-to-month movement is not.",
      "<strong>Defaults change only when the underlying data changes.</strong> Never to make a result look better, rounder, more favorable to a conclusion we have already written, or more competitive with another site's number.",
      "<strong>Every reference figure names its source.</strong> The sources block on each page lists the dataset behind each number, so you can check it against the original rather than take it from us. If you cannot see where a figure came from, we have failed to meet our own standard.",
      "<strong>Superseded figures are replaced, not accumulated.</strong> Where a change matters to a reader's decision — a default moving several percent — the change is noted rather than made silently.",
    ])}

    <h2>What we do not publish</h2>
    ${bullets([
      "<strong>Point estimates that the data cannot support.</strong> Where the honest answer is a range, we publish the range, even though a single number would read better.",
      "<strong>Vehicle-specific residual forecasts dressed as certainty.</strong> Residual value is a forecast. We say so every time.",
      "<strong>Insurance figures presented as quotes.</strong> Our estimator is a model. It is labeled as one on every page it appears.",
      "<strong>Rankings of products we have not modeled consistently.</strong> If two vehicles cannot be compared under identical assumptions, comparing them is decoration rather than analysis.",
      "<strong>Anything a commercial partner asked us to say.</strong> There are no commercial partners, and this rule exists to survive the day there are.",
    ])}

    <p>If any of these standards is ever breached, the failure is ours and we would like to hear about it. Independence that nobody audits is just a claim on a page.</p>

    ${sources([
      'Our full data sources, default assumptions, formulas and known limitations are published on the <a href="/methodology/">methodology page</a>.',
      cite("AAA_YDC_2025", "The primary external reference for whole-vehicle ownership cost."),
      cite("EPA_FE", "The primary reference for fuel economy and EV efficiency."),
      cite("EIA_GAS", "The primary reference for energy pricing."),
      cite("INSURIFY_AVG", "One of the national insurance rate studies we publish side by side rather than averaging away."),
      cite("INSURANCECOM_AVG", "Another. Where credible studies disagree we show the disagreement."),
      "Corrections may be sent to corrections@mydrivingcost.com and are actioned as soon as we can verify them.",
    ])}

  </div>
</section>

<section class="section-tight bg-subtle">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Check us</span><h2>Everything you need to audit our numbers</h2><p>The model, the policies and the arithmetic are all published. None of it requires taking our word for anything.</p></div>
    ${topicCards([
      [
        "/methodology/",
        "The full methodology",
        "Every assumption, formula, source and limitation behind the calculators, with the benchmark reconciled line by line.",
        [["Assumptions table", "/methodology/"], ["Known limitations", "/methodology/"]],
      ],
      [
        "/privacy/",
        "What we do with your data",
        "Nothing, essentially — calculations run in your browser and are never transmitted. The policy explains the one real exception.",
        [["Privacy policy", "/privacy/"], ["Terms of use", "/terms/"]],
      ],
      [
        "/contact/",
        "Tell us we are wrong",
        "Corrections with a source attached are actioned fastest. We would rather be corrected than quoted incorrectly.",
        [["Contact", "/contact/"], ["Site FAQ", "/faq/"]],
      ],
    ])}
  </div>
</section>
`;

module.exports = {
  url: "/editorial-standards/",
  title: "Editorial Standards and Corrections | MyDrivingCost",
  desc:
    "How MyDrivingCost sources and checks every figure, how the site makes money and what that does not buy, and how we correct an error once we have made one.",
  eyebrow: "Editorial standards",
  h1: "Editorial standards, independence and corrections",
  h1short: "Editorial standards",
  lead:
    "Who writes this site, how every figure is sourced and checked, what happens when we get one wrong, and exactly what our commercial arrangements can and cannot influence.",
  crumb: [],
  heroStats: [
    ["Paid placement", "None", "in any calculator or comparison"],
    ["Dealer affiliation", "None", "we do not sell or broker vehicles"],
    ["Model transparency", "Published", "every assumption and formula"],
    ["Corrections", "Days", "from verification to fix"],
  ],
  heroCta: [
    ["Read the methodology", "/methodology/", "btn-primary"],
    ["Report a correction", "/contact/", "btn-ghost"],
  ],
  body,
  faqTitle: "Questions about independence",
  faq: [
    [
      "Are you paid by dealers or manufacturers?",
      "No. MyDrivingCost.com has no affiliation with any dealership, dealer group or vehicle manufacturer, and no carmaker has paid for, reviewed, approved or influenced any figure on this site. We do not sell vehicles, broker loans, arrange insurance or generate sales leads. There is no commercial route by which a manufacturer could improve how its vehicles appear in our calculators, because there is nobody at this site to sell them one.",
    ],
    [
      "Can a company pay to appear in your calculators?",
      "No, and this is not a matter of current pricing. There is no paid placement in any calculator, comparison, ranking or default assumption on this site, and there will not be. A lender cannot buy the default APR, an insurer cannot buy the default premium and a manufacturer cannot buy a residual-value curve. Those figures come from published data and are changed only when the underlying data changes.",
    ],
    [
      "How will you make money, then?",
      "The site is currently free to run and free to use, with no advertising, no affiliate links and no subscriptions. If advertising or affiliate relationships are introduced later, three rules will apply: the relationship is disclosed on the page where it appears rather than buried in a footer, it never changes a calculated result, and no partner gets editorial approval or advance sight of any comparison. We are publishing those rules now so they can be held against us later.",
    ],
    [
      "How do I report an error?",
      "Email corrections@mydrivingcost.com, or use the contact page. Include the URL of the page, the specific figure you believe is wrong, what you think it should be, and your source if you have one. Reports with a source attached are actioned fastest. Verified factual errors are corrected within days, every other page that repeats the figure is updated at the same time, and the correction is noted on the affected page.",
    ],
    [
      "Do you hide corrections once you have made them?",
      "No. Factual corrections that change a published figure are noted on the page along with the date. We do not delete pages to make errors disappear, and we do not change a number in one place while leaving it wrong in another — if a headline figure changes, every page that quotes it is updated in the same pass. Typographical fixes and broken-link repairs are made without annotation, because nobody benefits from a note about a misplaced comma.",
    ],
    [
      "How often do you update your figures?",
      "Less often than you might expect, by design. The defaults here are round national reference points chosen to stay reasonable across years &mdash; $4.00 a gallon, 30 MPG, 12,000 miles &mdash; not readings of this week&rsquo;s market, so they do not need chasing. A default changes when the underlying national average moves materially, which we treat as a sustained shift of more than 10%, and the whole chain of pages quoting it is updated together. What matters far more than our update schedule is that every one of those numbers is a field you can edit, and the calculator recomputes the moment you do.",
    ],
    [
      "Why do you publish the limitations of your own model?",
      "Because a model that hides its failure modes is asking to be trusted on faith, and faith is the wrong basis for a five-figure decision. Our model does not know your ZIP code, cannot see your credit-based insurance score, and forecasts residual values that may not materialize. Saying so lets you judge how much weight the output deserves, and tells you which four or five inputs are worth replacing with your own numbers.",
    ],
  ],
  cta: {
    h2: "Check the arithmetic yourself",
    p: "Every assumption, formula and source behind the calculators is published in full. Rebuild our benchmark and see whether it holds.",
    btn: ["Read the methodology", "/methodology/"],
  },
  schemaExtra: [
    {
      "@type": "AboutPage",
      "@id": SITE + "/editorial-standards/#aboutpage",
      name: "Editorial standards, independence and corrections",
      description:
        "Sourcing, fact-checking, funding disclosure, independence and corrections policy for MyDrivingCost.com.",
      inLanguage: "en",
      dateModified: "2026-07-23",
      isPartOf: { "@id": SITE + "/#website" },
      about: { "@id": SITE + "/#org" },
    },
    {
      "@type": "Organization",
      "@id": SITE + "/#org",
      name: "MyDrivingCost.com",
      url: SITE + "/",
      slogan: "Know the Real Cost Before You Drive",
      email: "hello@mydrivingcost.com",
      publishingPrinciples: SITE + "/methodology/",
      ethicsPolicy: SITE + "/editorial-standards/",
      knowsAbout: [
        "Total cost of vehicle ownership",
        "Vehicle depreciation",
        "Auto insurance costs",
        "Auto loan financing",
        "Fuel and EV charging costs",
      ],
    },
  ],
};
