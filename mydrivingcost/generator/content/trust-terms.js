const P = require("../page");
const { table, callout, bullets, sources, SITE } = P;

const body = `
<section class="section-tight">
  <div class="container container-narrow prose">

    <p class="text-muted"><strong>Last updated: July 2026.</strong> These terms govern your use of mydrivingcost.com. By using the site you accept them. If you do not accept them, please do not use the site — there is nothing else you need to do, since there is no account to close.</p>

    <h2>1. Who these terms are between</h2>
    <p>These terms are an agreement between you, the person using the site, and MyDrivingCost.com, the operator of mydrivingcost.com. Throughout this page, &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; mean MyDrivingCost.com, and &ldquo;the site&rdquo; means mydrivingcost.com and everything published on it: the calculators, the guides, the data tables, the written content and the design.</p>
    <p>There is no registration and no account, so acceptance is by use. The terms apply from the first page you load.</p>

    <h2>2. What you may do with the site</h2>
    <p>You are granted a personal, non-exclusive, revocable license to use the site and its calculators for your own purposes, whether personal, educational or professional. Within that, and without needing to ask us:</p>

    ${bullets([
      "<strong>Use every calculator, as often as you like</strong>, for your own decisions or on behalf of a client, student or family member. The site is free and unmetered.",
      "<strong>Print or save results.</strong> Every calculator page is styled for printing, and taking a printed result into a dealership is exactly what it is for.",
      "<strong>Share a calculation link.</strong> Calculator URLs carry your inputs in the query string; sending one to a partner, adviser or colleague is a supported use. Note that the link contains the figures you entered — see the <a href=\"/privacy/\">privacy policy</a>.",
      "<strong>Link to any page</strong>, from anywhere, without permission and without a nofollow requirement. We would prefer you linked to the specific page rather than the homepage.",
      "<strong>Quote our figures with attribution</strong>, under the terms in section 6 below.",
      "<strong>Use the site in a professional context</strong> — as a financial educator, adviser, journalist, researcher or fleet manager — provided you observe the estimate-not-advice limitation in section 3.",
    ])}

    <p>Equally, you agree not to: reproduce the site's written content or calculators in bulk; scrape the site systematically or at a rate that burdens the server; copy, decompile or repurpose the calculator code; remove or obscure attribution; present our content as your own or as another organization's; use the site for any unlawful purpose; or attempt to interfere with, probe or gain unauthorized access to any part of the service.</p>

    <h2>3. The estimates are estimates</h2>
    <p>This is the most important clause on the page, and it is the one people skip. Read it.</p>

    ${callout(
      "Every figure on this site is an estimate, and estimates are not advice",
      `<p style="margin:0 0 10px">The calculators produce projections derived from assumptions — some supplied by you, some supplied by us as national defaults. A projection is a model of the future, and the future does not consult the model. Actual costs will differ, sometimes materially, because of your ZIP code, your driving record, your credit, market conditions, fuel prices, the specific vehicle, its service history and events nobody can foresee.</p>
      <p style="margin:0"><strong>Nothing on this site is financial, tax, legal, insurance or purchasing advice.</strong> Nothing here is a quote, an offer, an appraisal, a valuation, a warranty of value, or a recommendation to buy, sell, lease, finance, insure or keep any vehicle. We do not know your circumstances and we are not advising you on them. Before you commit money, verify the figures that matter against real quotes and consult a qualified professional. The <a href="/disclaimer/">disclaimer</a> sets this out at greater length and in plainer language.</p>`,
      "warn"
    )}

    <p>The model's assumptions and its known limitations are published in full on the <a href="/methodology/">methodology page</a>. We recommend reading that page before relying on any output. Where a figure is presented as a range rather than a single number, the range is the honest answer and the mid-point is not more accurate than the ends.</p>

    <h2>4. No warranty</h2>
    <p>The site is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the fullest extent permitted by law, we make no warranties of any kind, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, accuracy, and non-infringement.</p>
    <p>In particular, and without limiting the above, we do not warrant that:</p>

    ${bullets([
      "The site will be available without interruption, or that it will be free of errors, defects or bugs.",
      "Any figure, default assumption, formula or projection is accurate, current, complete or applicable to your circumstances.",
      "Results produced by any calculator will match the costs you actually incur, or the figures produced by any dealer, lender, insurer, valuation service or other tool.",
      "Any third-party data we cite is accurate, or that it has not been superseded since we last reviewed it.",
      "Defects will be corrected, or that the site or the server delivering it is free of harmful components.",
    ])}

    <p>We take accuracy seriously — our sourcing, checking and corrections processes are published on the <a href="/editorial-standards/">editorial standards</a> page — but taking it seriously is not the same as guaranteeing it, and we will not pretend otherwise in a legal document.</p>

    <h2>5. Limitation of liability</h2>
    <p>To the fullest extent permitted by applicable law, MyDrivingCost.com, its operators and its contributors will not be liable for any indirect, incidental, special, consequential, exemplary or punitive damages, or for any loss of profits, revenue, savings, data, goodwill or anticipated benefit, arising out of or in connection with your use of, or inability to use, the site — whether the claim is founded in contract, tort, negligence, strict liability or otherwise, and whether or not we were advised of the possibility of such loss.</p>
    <p>Without limiting that, we are not liable for any decision you make, or refrain from making, on the basis of anything published here. That includes decisions to buy, sell, lease, trade, finance, refinance, insure, repair, retain or dispose of a vehicle. Those decisions are yours, they are made with information beyond what any national model can see, and their consequences are yours.</p>
    <p>Where liability cannot lawfully be excluded, our total aggregate liability to you for all claims relating to the site is limited to the greater of the amount you have paid us for access to the site — which is zero, as the site is free — or one hundred United States dollars.</p>
    <p>Nothing in these terms excludes or limits liability for fraud, fraudulent misrepresentation, death or personal injury caused by negligence, or any other liability that cannot be excluded under applicable law. Some jurisdictions do not allow the exclusion of certain warranties or the limitation of certain damages, so parts of sections 4 and 5 may not apply to you; in that event those provisions apply to the fullest extent permitted.</p>

    <h2>6. Intellectual property, and permission to cite our figures</h2>
    <p>The written content, guides, data tables, page design, brand, logo, and the design and code of the calculators are owned by MyDrivingCost.com and protected by copyright and other intellectual property law. The underlying financial formulas — declining-balance depreciation, monthly loan amortization — are standard mathematics and belong to nobody, which is precisely why we publish them.</p>

    ${table(
      ["Use", "Permitted?", "Conditions"],
      [
        [
          "<strong>Citing a figure or statistic</strong> in an article, report, presentation, dissertation or lesson",
          "Yes",
          "Attribute to MyDrivingCost.com and link to the specific page the figure came from. Carry the underlying assumptions with the number.",
        ],
        [
          "<strong>Quoting a short passage</strong> with attribution",
          "Yes",
          "Keep it short, keep it in context, and link to the source page.",
        ],
        [
          "<strong>Reproducing a table of ours</strong>",
          "Yes, in part",
          "Credit MyDrivingCost.com beneath the table with a link. Do not present it as your own research.",
        ],
        [
          "<strong>Republishing an article or guide in full</strong>",
          "No",
          "Write to press@mydrivingcost.com and describe what you have in mind.",
        ],
        [
          "<strong>Embedding, copying or reimplementing a calculator</strong>",
          "No",
          "The calculator code and interface are not licensed for reuse.",
        ],
        [
          "<strong>Systematic scraping or bulk extraction</strong>",
          "No",
          "Including for the purpose of training models or populating a competing dataset.",
        ],
        [
          "<strong>Linking to any page</strong>",
          "Yes",
          "No permission needed. Deep links are preferred to homepage links.",
        ],
      ]
    )}

    <p>The attribution we ask for is simple: name MyDrivingCost.com and link to the page. Please also carry the assumptions with any headline figure. Our $58,928 five-year benchmark is inseparable from the $34,000 price, 12,000 miles a year, five-year hold and 7.2% APR that produced it, and a total quoted without them will mislead your reader through no fault of yours.</p>

    <h2>7. Third-party links and sources</h2>
    <p>The site links to external resources: published studies, government datasets, manufacturer specifications and industry sources. Those links are provided for verification and further reading. We do not control those sites, we do not endorse their content, products or services by linking to them, and we are not responsible for their availability, accuracy or privacy practices. Once you follow a link off mydrivingcost.com, these terms and our <a href="/privacy/">privacy policy</a> no longer apply.</p>
    <p>Where we cite a third-party figure, we cite it as reported at the date stated. Third parties revise their data, and a figure that was accurate when we published it may have been superseded. Every such figure is also an editable field in the calculator that consumes it, so a superseded reference never prevents you from modelling your own numbers.</p>

    <h2>8. Availability and changes to the site</h2>
    <p>We may add, alter, suspend or withdraw any part of the site — including any calculator, guide or default assumption — at any time and without notice. Calculators are revised as data and methodology improve; a result you obtained previously may not be reproducible after a model update. If you need to preserve a result, print it or save the URL, which carries your inputs.</p>
    <p>We do not guarantee any level of availability. The site may be unavailable for maintenance, or for reasons outside our control.</p>

    <h2>9. Changes to these terms</h2>
    <p>We may revise these terms. The version published on this page is the version in force, and the last-updated date at the top reflects the most recent revision. Continued use of the site after a revision constitutes acceptance of the revised terms. Material changes will be reflected in the date rather than announced individually, since there is no account and therefore no one to notify.</p>

    <h2>10. Governing law and severability</h2>
    <p>These terms are governed by the laws of the United States and, where applicable, of the state in which the operator is established, without regard to conflict-of-laws principles. If any provision of these terms is held invalid or unenforceable, that provision will be limited or severed to the minimum extent necessary, and the remaining provisions will continue in full force.</p>
    <p>Our failure to enforce any provision is not a waiver of it. These terms, together with the <a href="/privacy/">privacy policy</a> and the <a href="/disclaimer/">disclaimer</a>, constitute the entire agreement between you and us regarding the site.</p>

    <h2>11. Contact</h2>
    <p>Questions about these terms, licensing requests, and anything else that needs a human go to <a href="mailto:hello@mydrivingcost.com">hello@mydrivingcost.com</a>. Republication and press inquiries go to <a href="mailto:press@mydrivingcost.com">press@mydrivingcost.com</a>. Factual corrections go to <a href="mailto:corrections@mydrivingcost.com">corrections@mydrivingcost.com</a>, and are prioritized above everything else — see the <a href="/contact/">contact page</a> for what to include.</p>

    ${sources([
      "These terms apply to mydrivingcost.com as published in July 2026.",
      "Related: the <a href=\"/privacy/\">privacy policy</a> covers data handling, the <a href=\"/disclaimer/\">disclaimer</a> covers the limits of the estimates in plain language, and the <a href=\"/methodology/\">methodology page</a> publishes the model these terms refer to.",
      "Attribution requests and licensing questions: press@mydrivingcost.com.",
    ])}

  </div>
</section>
`;

module.exports = {
  url: "/terms/",
  title: "Terms of Use | MyDrivingCost",
  desc:
    "The terms governing use of MyDrivingCost: permitted use, the estimate-not-advice limit, no warranty, liability, and permission to cite our figures.",
  eyebrow: "Legal",
  h1: "Terms of use",
  h1short: "Terms",
  lead:
    "What you may do with this site and its figures, what the calculators are and are not, and the limits of what we can be responsible for. Written to be read.",
  crumb: [],
  heroStats: [
    ["Cost to use", "Free", "no account, no license fee"],
    ["Citing our figures", "Permitted", "with attribution and a link"],
    ["Nature of every result", "An estimate", "never a quote or advice"],
    ["Last updated", "July 2026", "this version is in force"],
  ],
  heroCta: [
    ["Privacy policy", "/privacy/", "btn-ghost"],
    ["Disclaimer", "/disclaimer/", "btn-ghost"],
  ],
  body,
  faqTitle: "Questions about these terms",
  faq: [
    [
      "May I quote your figures in an article or report?",
      "Yes. Cite any figure from this site with attribution to MyDrivingCost.com and a link to the specific page it came from. You do not need to ask permission first. We ask one thing in return: carry the assumptions with the number. A five-year total of $58,928 means nothing without the $34,000 price, 12,000 annual miles, five-year hold and 7.2% APR that produced it, and quoting the total alone will mislead your reader.",
    ],
    [
      "Can I embed or copy one of your calculators?",
      "No. The calculator code, interface and design are not licensed for reuse, embedding or reimplementation. The underlying mathematics is another matter entirely — declining-balance depreciation and monthly loan amortization are standard formulas that belong to nobody, and we publish both in full on the methodology page precisely so that anyone can implement them. If you have a partnership in mind, write to press@mydrivingcost.com and describe it.",
    ],
    [
      "Do I need permission to link to you?",
      "No. Link to any page, from anywhere, without asking and without any nofollow requirement. We would rather you linked to the specific page carrying the figure you are referring to than to the homepage, because a deep link sends your reader to the assumptions as well as the number. Linking to a calculator with your own scenario in the query string works too, and reproduces your exact inputs for whoever follows it.",
    ],
    [
      "Are your calculator results financial advice?",
      "No. Every result is an estimate produced from assumptions, some yours and some our national defaults, and nothing on this site is financial, tax, legal, insurance or purchasing advice. We do not know your circumstances, we are not regulated to advise on them, and no output here is a quote, an offer, an appraisal or a recommendation. Use the numbers to frame a decision, then verify the ones that matter and consult a qualified professional.",
    ],
    [
      "What happens if a calculator gives me a wrong number?",
      "Tell us, and we will fix it. Verified factual and formula errors are corrected within days, every page repeating the figure is updated in the same pass, and the correction is noted. What we cannot do is accept liability for a decision made on the basis of an output, which is why the limitation of liability in section 5 exists. Send corrections to corrections@mydrivingcost.com with the page URL and your source.",
    ],
    [
      "Can these terms change without telling me?",
      "The version published on this page is always the version in force, and the last-updated date at the top reflects the most recent revision. Because there is no account and no mailing list, there is nobody for us to notify individually, so continued use after a revision constitutes acceptance. If you rely on these terms in a professional context, check the date on the page rather than assuming the version you read previously still applies.",
    ],
  ],
  cta: {
    h2: "The part that actually matters",
    p: "Every number here is an estimate. The disclaimer explains what that means for your decision, in plain language and at length.",
    btn: ["Read the disclaimer", "/disclaimer/"],
  },
  schemaExtra: [
    {
      "@type": "CreativeWork",
      "@id": SITE + "/terms/#document",
      name: "MyDrivingCost.com Terms of Use",
      genre: "Terms of use",
      inLanguage: "en",
      datePublished: "2026-01-15",
      dateModified: "2026-07-23",
      publisher: { "@id": SITE + "/#org" },
      isPartOf: { "@id": SITE + "/#website" },
      about: { "@type": "Thing", name: "Website terms and conditions" },
    },
  ],
};
