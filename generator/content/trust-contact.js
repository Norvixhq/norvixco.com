const P = require("../page");
const { table, callout, bullets, topicCards, SITE } = P;

const body = `
<section class="section-tight">
  <div class="container container-narrow prose">

    <h2>Three addresses, and what each is for</h2>
    <p>There is no contact form on this page. MyDrivingCost.com is a static site with no server-side form handler, and a form that quietly posts nowhere is worse than no form at all — it takes your message and loses it while looking helpful. So: email, three addresses, each read by a person.</p>

    <div class="grid grid-3" style="margin:24px 0 10px;gap:18px">
      <div class="card card-pad-lg">
        <h3 style="margin-top:0"><a href="mailto:hello@mydrivingcost.com">hello@mydrivingcost.com</a></h3>
        <p class="text-muted" style="font-size:.94rem;margin:8px 0 0">General questions, feedback on a calculator, requests for a tool that does not exist yet, and anything that does not fit the other two boxes.</p>
      </div>
      <div class="card card-pad-lg">
        <h3 style="margin-top:0"><a href="mailto:corrections@mydrivingcost.com">corrections@mydrivingcost.com</a></h3>
        <p class="text-muted" style="font-size:.94rem;margin:8px 0 0">A figure you believe is wrong, a formula that does not reconcile, a source that has been superseded, or a calculator producing an implausible result.</p>
      </div>
      <div class="card card-pad-lg">
        <h3 style="margin-top:0"><a href="mailto:press@mydrivingcost.com">press@mydrivingcost.com</a></h3>
        <p class="text-muted" style="font-size:.94rem;margin:8px 0 0">Journalists, researchers, educators and analysts. Data requests, citation queries, permission questions and comment.</p>
      </div>
    </div>

    <h2>Before you write</h2>
    <p>Two pages already answer most of what arrives in the inbox, and they answer it immediately rather than in two working days.</p>

    ${bullets([
      "<strong>If your question is about how a number is produced</strong> — where a default came from, why our cost per mile differs from AAA's, how the depreciation curve works, why loan principal is excluded from the total — the <a href=\"/methodology/\">methodology page</a> answers it in full, with the formulas and the sources.",
      "<strong>If your question is about the site itself</strong> — is it free, do you sell my data, can I cite your figures, is there an API, does it work on mobile, how do I share a calculation — the <a href=\"/faq/\">FAQ</a> covers it.",
      "<strong>If your question is about what we can and cannot be paid to do</strong>, the <a href=\"/editorial-standards/\">editorial standards</a> page sets out our independence position and our corrections policy.",
      "<strong>If you want to know what happens to your inputs</strong>, the <a href=\"/privacy/\">privacy policy</a> is specific rather than boilerplate — including the one genuine privacy consideration on this site.",
    ])}

    <p>If the answer is not there, write. We would rather receive a question we have already answered than have you leave without an answer.</p>

    <h2>What to include in each kind of message</h2>
    <p>A useful contact page is not a list of addresses. It is a list of what to put in the message so the reply is worth waiting for. Here is what actually helps us help you.</p>

    <h3>Reporting a correction</h3>
    <p>Corrections are the most valuable email we receive, and the ones we action fastest. To make one immediately actionable, include:</p>

    ${table(
      ["Include", "Why it matters"],
      [
        ["<strong>The full URL of the page</strong>", "Several figures appear on more than one page. Knowing which one you were reading tells us how far the correction has to propagate."],
        ["<strong>The exact figure or sentence</strong>", "Quote it. &ldquo;The insurance number looks high&rdquo; is a start; quoting the line removes all ambiguity."],
        ["<strong>What you believe it should be</strong>", "A direction of error is useful. A specific replacement value is far more useful."],
        ["<strong>Your source, if you have one</strong>", "A named study, dataset or published figure with a date. Reports with a source attached are actioned first, because verification is most of the work."],
        ["<strong>Your inputs, if a calculator is involved</strong>", "The easiest way to send them is to copy the URL from your browser after you have run the calculation — the query string carries every value you entered, so we can reproduce your result exactly."],
      ]
    )}

    ${callout(
      "The fastest possible correction report",
      `<p style="margin:0">Paste the URL you were looking at, quote the line you think is wrong, say what it should be, and name your source. Four lines. That is enough for us to verify and fix it, and it is how the best corrections we receive are written. If we can confirm it, the figure is changed within days, every other page repeating it is updated in the same pass, and the correction is noted on the page. Our full policy is on the <a href="/editorial-standards/">editorial standards</a> page.</p>`
    )}

    <h3>Asking a general question or giving feedback</h3>
    ${bullets([
      "<strong>Tell us what you were trying to work out.</strong> The underlying decision — whether to keep a car another two years, whether an EV pays back, whether a lease beats a purchase — usually points at a better answer than the literal question does.",
      "<strong>Include your calculation URL</strong> if a tool is involved. It carries your inputs, so we can see exactly what you saw rather than guessing at it.",
      "<strong>Say what surprised you.</strong> If a result looked wrong, that is a signal worth investigating even when the arithmetic turns out to be right — an answer that is correct and unbelievable is a presentation failure on our side.",
      "<strong>Requesting a calculator?</strong> Describe the decision you would use it for, not just the tool name. A tool nobody can articulate a use for tends to be a tool nobody uses.",
      "<strong>Suggesting a data source?</strong> Send the name, the publisher, the year and a link if you have one. We are always looking for better inputs.",
    ])}

    <h3>Press, research and academic inquiries</h3>
    <p>We are glad to be cited and glad to help you cite us accurately. For press and research, please include:</p>

    ${bullets([
      "<strong>Your publication or institution, and your deadline.</strong> Deadlines are respected where we can meet them and declined honestly where we cannot.",
      "<strong>The specific figures you intend to use.</strong> We will confirm them, tell you the assumptions attached to them, and flag anything superseded since publication.",
      "<strong>Whether you need the underlying assumptions.</strong> Every figure on this site has a set of assumptions behind it, and a number quoted without them is misleading through no fault of yours. The full set is on the <a href=\"/methodology/\">methodology page</a>.",
      "<strong>Whether you need a custom scenario modeled.</strong> We can often run a specific case — a different mileage, hold period or vehicle price — and tell you how the result moves.",
    ])}

    <p>You do not need permission to cite us. Figures from this site may be quoted in reports, articles, lessons and analyses with attribution to MyDrivingCost.com and a link to the page they came from. Please carry the assumptions with the figure: our $58,928 five-year benchmark is inseparable from the 12,000 miles a year, five-year hold and 7.2% APR that produced it.</p>

    <h2>What we cannot do</h2>
    <p>Being clear about this saves everyone time, and it is a consequence of the independence set out in our <a href="/editorial-standards/">editorial standards</a> rather than a lack of willingness.</p>

    ${table(
      ["Request", "Answer", "What to do instead"],
      [
        ["Tell me which car to buy", "We do not make purchase recommendations for individuals", "Model the shortlist yourself with <a href=\"/calculators/true-cost-to-own/\">True Cost to Own</a> under identical assumptions"],
        ["Give me an insurance quote", "We are not a broker or an insurer and cannot quote", "Use the <a href=\"/calculators/insurance-estimator/\">estimator</a> to compare vehicles, then get real quotes from three carriers"],
        ["Arrange finance or a trade-in", "We do not sell, broker or arrange anything", "The <a href=\"/calculators/auto-loan/\">loan</a> and <a href=\"/calculators/trade-in-value/\">trade-in</a> calculators will tell you what to expect before you negotiate"],
        ["Review my specific finance agreement", "That is regulated financial advice and we do not give it", "Model the numbers here, then take them to a qualified professional"],
        ["Buy a placement in a calculator", "Not available at any price", "Read the <a href=\"/editorial-standards/\">editorial standards</a>"],
        ["Confirm a figure for my state", "Our figures are national averages and we cannot certify a state-level number", "Replace the defaults with your own local figures — every input is editable"],
      ]
    )}

    <h2>Response times</h2>
    <p>We are a small team and we read everything. Corrections are prioritized above all other correspondence and are typically acknowledged within a couple of working days. General questions and feedback take longer, particularly where they require running a scenario. Press inquiries are handled against your stated deadline where that is possible.</p>
    <p>Email that asks us to link to a commercial site, add a sponsored figure, place a product in a calculator or accept a guest article is read and not answered. That is not rudeness; it is the volume.</p>

    ${callout(
      "One thing worth knowing before you send a calculation",
      `<p style="margin:0">The URL of a calculator page carries your inputs in its query string. That is what makes a result shareable — and it means a link you send us contains the numbers you typed, including a vehicle price, a loan amount or an annual mileage. That is usually exactly what you want when reporting a problem. It is worth being aware of before you paste a calculation into any email, forum or message thread. The <a href="/privacy/">privacy policy</a> explains this in full.</p>`,
      "warn"
    )}

  </div>
</section>

<section class="section-tight bg-subtle">
  <div class="container">
    <div class="section-head"><span class="eyebrow">Probably already answered</span><h2>Start here instead</h2><p>Three pages that resolve most of what arrives in the inbox, immediately.</p></div>
    ${topicCards([
      [
        "/faq/",
        "Site FAQ",
        "Is it free, do you sell data, how accurate are the numbers, can I cite them, is there an API. Sixteen questions, answered properly.",
        [["Read the FAQ", "/faq/"]],
      ],
      [
        "/methodology/",
        "Methodology",
        "Every assumption, formula and source behind the calculators, plus the model's known limitations in full.",
        [["How we calculate", "/methodology/"]],
      ],
      [
        "/editorial-standards/",
        "Editorial standards",
        "How we source and check figures, how the site makes money, and the corrections policy your report will be handled under.",
        [["Our standards", "/editorial-standards/"]],
      ],
    ])}
  </div>
</section>
`;

module.exports = {
  url: "/contact/",
  title: "Contact MyDrivingCost — Questions, Corrections & Press",
  desc:
    "Reach MyDrivingCost.com by email: general questions, factual corrections and press inquiries, with exactly what to include in each so we can help properly.",
  eyebrow: "Contact",
  h1: "Contact us",
  h1short: "Contact",
  lead:
    "Three email addresses, read by people, and a straight account of what to put in each kind of message so the reply is actually useful.",
  crumb: [],
  heroStats: [
    ["General", "hello@", "questions and feedback"],
    ["Corrections", "corrections@", "prioritized above everything"],
    ["Press", "press@", "citations and data requests"],
  ],
  heroCta: [
    ["Email us", "mailto:hello@mydrivingcost.com", "btn-primary"],
    ["Check the FAQ first", "/faq/", "btn-ghost"],
  ],
  body,
  faqTitle: "Contact questions",
  faq: [
    [
      "Why is there no contact form?",
      "Because this is a static site with no server-side form handler, and a form that posts nowhere is worse than no form at all — it accepts your message, looks like it worked, and loses it. Email is honest about where the message goes. It also means you keep a copy of what you sent and can attach a screenshot, a spreadsheet or a calculation URL, none of which a simple form would carry.",
    ],
    [
      "How quickly will I get a reply?",
      "Corrections are prioritized and are typically acknowledged within a couple of working days. General questions and feedback take longer, particularly where answering means running a scenario. Press inquiries are handled against your stated deadline where we can meet it, and declined honestly where we cannot. We read everything that arrives, including the messages we do not have time to answer individually.",
    ],
    [
      "What is the single most useful thing to include?",
      "The URL. If you are reporting a problem with a calculator, copy the address bar after running your calculation — the query string carries every input you entered, so we can reproduce exactly what you saw rather than guessing. If you are reporting a factual error, the page URL plus a quote of the line in question removes all ambiguity about which figure you mean.",
    ],
    [
      "Can you tell me which car to buy?",
      "No. We do not make purchase recommendations for individuals, and any answer we gave would be based on far less information than you have. What we can do is give you a model that compares your shortlist under identical assumptions, which is the part most buyers never get. Run each candidate through True Cost to Own with the same mileage and hold period and the comparison usually makes itself.",
    ],
    [
      "Can I get a quote for insurance or finance through you?",
      "No. We are not an insurer, a broker, a lender or a dealer, and we have no arrangement with any of them. Our insurance estimator produces a modeled figure for comparing vehicles, not a quote — it cannot see your record, your credit-based insurance score or your carrier's rate filings. For real numbers, approach three carriers directly and compare identical coverage limits rather than headline prices.",
    ],
    [
      "May I republish your calculators or figures?",
      "Figures, yes — cite any of them with attribution to MyDrivingCost.com and a link to the page they came from, and please carry the assumptions alongside the number. The calculators themselves, the underlying code and the written content are not licensed for republication; see the terms of use. If you have something more ambitious in mind, write to press@mydrivingcost.com and describe it rather than assuming either way.",
    ],
  ],
  cta: {
    h2: "Found a number you think is wrong?",
    p: "Send the page URL, the figure, what it should be and your source. Verified corrections are made within days and noted on the page.",
    btn: ["Email corrections", "mailto:corrections@mydrivingcost.com"],
  },
  schemaExtra: [
    {
      "@type": "ContactPage",
      "@id": SITE + "/contact/#contactpage",
      name: "Contact MyDrivingCost.com",
      description:
        "Email contacts for general questions, factual corrections and press inquiries at MyDrivingCost.com.",
      inLanguage: "en",
      dateModified: "2026-07-23",
      isPartOf: { "@id": SITE + "/#website" },
      mainEntity: { "@id": SITE + "/#org" },
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
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "hello@mydrivingcost.com",
          availableLanguage: "English",
          areaServed: "US",
        },
        {
          "@type": "ContactPoint",
          contactType: "editorial corrections",
          email: "corrections@mydrivingcost.com",
          availableLanguage: "English",
          areaServed: "US",
        },
        {
          "@type": "ContactPoint",
          contactType: "public relations",
          email: "press@mydrivingcost.com",
          availableLanguage: "English",
          areaServed: "US",
        },
      ],
    },
  ],
};
