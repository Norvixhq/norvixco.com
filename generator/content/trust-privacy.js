const P = require("../page");
const { table, callout, bullets, sources, SITE } = P;

const body = `
<section class="section-tight">
  <div class="container container-narrow prose">

    <p class="text-muted"><strong>Last updated: July 2026.</strong> This policy describes how MyDrivingCost.com handles information. It is written to be read rather than to be legally impressive, and it describes what the site actually does — not what a template says a website might do.</p>

    <h2>The summary</h2>
    <p>MyDrivingCost.com is a static website. It has no accounts, no sign-in, no database of users and no server-side processing of anything you type. Every calculator runs entirely inside your own browser using JavaScript. The numbers you enter are computed on your device and displayed on your device. They are never transmitted to us, and there is no place on our side where they could be stored even if we wanted them.</p>

    ${callout(
      "In one paragraph",
      `<p style="margin:0">We do not ask for your name, your email address or any other personal detail, because no feature on this site needs one. Your calculator inputs never leave your browser. The only thing stored on your device by us is a light-or-dark theme preference. Our web host keeps standard access logs, as every web server does. The single genuine privacy consideration on this site is that the sharing feature puts your calculator inputs into the page URL — so a link you share contains the numbers you entered. That is explained in full below.</p>`
    )}

    <h2>What we do not collect</h2>
    <p>It is easier to start with the absences, because there are a lot of them.</p>

    ${bullets([
      "<strong>No accounts.</strong> There is no registration, no sign-in, no password and no profile. Nothing on this site is personalized to an identity, because we hold no identities.",
      "<strong>No email addresses.</strong> No calculator asks for one, and no result is gated behind one. There is no newsletter sign-up and no mailing list.",
      "<strong>No names, addresses or phone numbers.</strong> We never ask, and there is nowhere on the site to enter them.",
      "<strong>No payment information.</strong> The site is free and there is nothing to buy, so no payment details are ever handled.",
      "<strong>No lead generation.</strong> Using a calculator does not put you in touch with a dealer, lender, insurer or broker. We have no relationships with any of them and no mechanism for passing anything along. See our <a href=\"/editorial-standards/\">editorial standards</a>.",
      "<strong>No advertising or tracking networks.</strong> The site currently carries no advertising, no affiliate links, no third-party ad scripts, no marketing pixels, no session recorders and no cross-site tracking.",
      "<strong>No sale or sharing of personal information.</strong> We do not sell, rent, license or otherwise disclose personal information to anyone, for the straightforward reason that we do not hold any.",
    ])}

    <h2>How the calculators work, technically</h2>
    <p>This matters because it is the reason the rest of this policy is so short. When you open a calculator page, your browser downloads a JavaScript file. When you change an input, that script performs the arithmetic on your device and writes the result into the page. No request is made to our servers. No value you type is sent anywhere.</p>
    <p>You can verify this yourself: open your browser's developer tools, switch to the network tab, and change every input on any calculator. You will see no outgoing requests carrying your numbers. Disconnect from the internet after the page has loaded and the calculators keep working, because nothing they need is on our side.</p>

    ${table(
      ["What you do", "Where it happens", "What reaches us"],
      [
        ["Load a page", "Request to our web host", "A standard server log entry — see below"],
        ["Type a vehicle price, mileage or APR", "Your browser only", "Nothing"],
        ["A result is calculated and displayed", "Your browser only", "Nothing"],
        ["The URL updates with your inputs", "Your browser's address bar", "Nothing, unless you then share the link"],
        ["You switch between light and dark mode", "Your browser's localStorage", "Nothing"],
        ["You print or save a result", "Your device", "Nothing"],
      ]
    )}

    <h2>The query string: the one real consideration</h2>
    <p>Every calculator on this site writes your inputs into the page URL as a query string. That is what makes results shareable and bookmarkable — copy the address bar after running a calculation, send it to someone, and they see your exact scenario rather than the defaults.</p>

    ${callout(
      "Say it plainly: a shared link contains the numbers you entered",
      `<p style="margin:0 0 10px">If you calculate the cost of a $52,000 vehicle with a $9,000 down payment at 11.4% APR over 72 months and 22,000 miles a year, and then send someone that link, those figures travel with it. They are readable in the URL by anyone who receives it, and by anything that handles it in transit — a messaging platform, a forum, a corporate email filter, a browser-history sync, a bookmark backup.</p>
      <p style="margin:0">None of those numbers are personal data on their own, and none of them reach us. But taken together they can say something about your circumstances — what you can afford, what you drive, how far you commute. This is the one genuine privacy consideration on this site and we would rather flag it clearly than bury it. If you would prefer not to share your figures, take a screenshot of the result instead of sending the link, or edit the URL before you send it.</p>`,
      "warn"
    )}

    <p>The query string is a feature, not a leak. It exists so that you never have to re-enter fourteen values, and so that a calculation can be discussed with a partner, an adviser or a colleague without ambiguity about what was assumed. But a feature that puts your numbers in a shareable string deserves an explicit warning rather than a footnote, so here it is.</p>

    <h2>Local storage on your device</h2>
    <p>MyDrivingCost.com writes exactly one item to your browser's localStorage: your theme preference, light or dark, stored under the key <strong>mdc-theme</strong>. It exists so the site does not flash the wrong color scheme at you on every visit.</p>

    ${table(
      ["What is stored", "Where", "Why", "How to remove it"],
      [
        [
          "Theme preference (light or dark)",
          "Your browser's localStorage, on your device only",
          "So the site respects your choice between visits",
          "Clear site data in your browser settings, or use a private window",
        ],
      ]
    )}

    <p>This value never leaves your device, is not linked to any identifier, and tells us nothing because we never read it — only your own browser does. We do not use cookies for tracking, analytics or advertising. If your browser reports cookies from this domain, they are not ours.</p>

    <h2>Server logs</h2>
    <p>Like every website, MyDrivingCost.com is served by a web host that keeps standard access logs. These are generated automatically by the server software as part of delivering pages and are used for security, diagnostics and understanding aggregate traffic — nothing else.</p>

    ${bullets([
      "<strong>What a log entry typically contains:</strong> the IP address of the requesting device, the date and time, the page or file requested, the HTTP status code, the amount of data sent, the referring page if any, and the browser's user-agent string.",
      "<strong>What it is used for:</strong> detecting abuse and denial-of-service traffic, diagnosing errors, and seeing which pages are read. Nothing more.",
      "<strong>What it is not used for:</strong> building profiles of individuals, targeting advertising, or anything that leaves our host.",
      "<strong>Query strings and logs:</strong> because your calculator inputs live in the URL, they may appear in these access logs alongside the page request. They are not read, extracted, aggregated or analyzed. If this concerns you, note that the inputs are only written to the URL as you use the calculator — a request for the page itself carries no values.",
      "<strong>Retention:</strong> logs are retained on a short rolling basis by the host and then discarded. They are not exported, sold or shared with third parties, other than as required to operate the service or comply with the law.",
    ])}

    <h2>Third parties</h2>
    <p>One. There is exactly one third party involved in delivering this site, and we would rather name it than imply there are none.</p>

    ${table(
      ["Third party", "What it does", "What it receives"],
      [
        [
          "<strong>Our web host and CDN</strong>",
          "Stores and delivers the site's files to your browser",
          "The standard request data described above, as an unavoidable part of serving a page",
        ],
      ]
    )}

    <p>That is the whole list. Every asset the site loads — stylesheets, scripts, images, icons and the two typefaces — is served from mydrivingcost.com itself. Your browser makes no request to any other domain while a page is loading.</p>

    <p>The typefaces deserve a specific mention, because this is where most otherwise-clean sites leak. Inter and Sora are both open-license fonts commonly loaded from Google Fonts. Loading them that way would send your IP address and browser details to Google on every page view, which is why we host the font files ourselves instead. It is fractionally more work to maintain and it removes the only remaining third-party request on the site.</p>

    <p>Beyond the host, the site loads nothing from anywhere else — no analytics, no advertising, no social widgets, no embedded video, no comment system, no chat tool, no A/B testing platform. If you use a content blocker, nothing on this site will break, because there is nothing for it to block.</p>

    <h2>Links to other sites</h2>
    <p>Some pages link to external sources — published studies, government datasets, manufacturer specifications. Following such a link takes you to a site we do not control and whose privacy practices are their own. This policy stops at the edge of mydrivingcost.com.</p>

    <h2>If analytics is ever added</h2>
    <p>The site may eventually need aggregate traffic measurement in order to know which pages help people and which do not. If that happens, we are committing in advance to the following, and publishing it here so it can be held against us.</p>

    ${bullets([
      "<strong>This policy will be updated before the analytics goes live</strong>, not afterwards, and the last-updated date at the top of the page will change.",
      "<strong>The tool will be named here</strong>, along with what it collects and where the data is processed.",
      "<strong>We will prefer a privacy-respecting, cookieless option</strong> that reports aggregate page views without building profiles of individual visitors or tracking anyone across other websites.",
      "<strong>Calculator inputs will still never be transmitted.</strong> The client-side architecture of the tools is not up for negotiation, and no analytics implementation will be permitted to send the values you type.",
      "<strong>If any tool that sets cookies or tracks across sites were ever required</strong>, a consent mechanism would be implemented before it loaded, and it would default to off.",
    ])}

    <h2>Children</h2>
    <p>This site is a consumer finance tool intended for adults. It is not directed at children, does not knowingly collect information from anyone, and has no mechanism by which a child could provide personal information to us even if they tried.</p>

    <h2>Your rights, in plain English</h2>
    <p>Privacy laws such as the EU and UK General Data Protection Regulation and the California Consumer Privacy Act give you a set of rights over personal data that an organization holds about you. Most of them are inapplicable here, and the honest reason is not that we are exempt — it is that there is nothing to apply them to.</p>

    ${table(
      ["Your right", "How it applies here"],
      [
        [
          "<strong>To know what is collected</strong>",
          "This page. The calculators collect nothing; the host keeps standard access logs; your browser stores a theme preference.",
        ],
        [
          "<strong>To access a copy of your data</strong>",
          "There is no user record to produce. Your calculator inputs exist only in your own browser and your own URL.",
        ],
        [
          "<strong>To have data corrected</strong>",
          "There is nothing to correct, as we hold no profile, account or record of you.",
        ],
        [
          "<strong>To have data deleted</strong>",
          "You can delete everything this site has placed on your device by clearing site data in your browser. Server logs age out on their own.",
        ],
        [
          "<strong>To opt out of the sale or sharing of personal information</strong>",
          "We do not sell or share personal information with anyone, for any purpose, and there is no arrangement to opt out of. No &ldquo;Do Not Sell&rdquo; mechanism is required because no such activity occurs.",
        ],
        [
          "<strong>To object to profiling or automated decisions</strong>",
          "No profiling occurs. The calculators make no decisions about you; they perform arithmetic on numbers you supply and display the result.",
        ],
        [
          "<strong>To data portability</strong>",
          "Your calculation is already portable — it is the URL. Copy it and it goes with you.",
        ],
        [
          "<strong>Not to be discriminated against for exercising a right</strong>",
          "Everything on the site is free and unconditional. There is no tier of service to withhold.",
        ],
      ]
    )}

    <p>If you believe we hold personal data about you and want it dealt with, write to <a href="mailto:hello@mydrivingcost.com">hello@mydrivingcost.com</a> and we will respond. In almost every case the answer will be that no such data exists, and we will explain why rather than simply asserting it.</p>

    <h2>Security</h2>
    <p>The site is served over HTTPS, so traffic between your browser and our host is encrypted in transit. There is no user database to breach, no stored credentials, no payment records and no personal information at rest, which removes most of the risk surface that a policy like this usually has to address. Note that HTTPS encrypts the URL in transit, but the URL — including your query string — is still visible in your own browser history and to anyone you send it to.</p>

    <h2>Changes to this policy</h2>
    <p>If this policy changes, the last-updated date at the top of the page changes with it. Material changes — the introduction of analytics, advertising or any third-party script that receives data — will be described here explicitly rather than folded into a general revision. We will not weaken the commitments on this page quietly.</p>
    <p>Questions about anything here go to <a href="mailto:hello@mydrivingcost.com">hello@mydrivingcost.com</a>, or via the <a href="/contact/">contact page</a>.</p>

    ${sources([
      "This policy describes the site as built and deployed as of July 2026.",
      "Related pages: <a href=\"/terms/\">terms of use</a>, <a href=\"/disclaimer/\">disclaimer</a>, and <a href=\"/editorial-standards/\">editorial standards</a>, which covers our independence and funding position.",
      "Technical claims on this page can be verified in your own browser's developer tools; the calculators continue to function with the network disconnected.",
    ])}

  </div>
</section>
`;

module.exports = {
  url: "/privacy/",
  title: "Privacy Policy | MyDrivingCost",
  desc:
    "How MyDrivingCost handles information: no accounts, no personal data collected, every calculation runs in your browser, and one theme preference stored.",
  eyebrow: "Legal",
  h1: "Privacy policy",
  h1short: "Privacy",
  lead:
    "No accounts, no email capture, no tracking. Your calculator inputs are computed in your browser and never transmitted to us. Here is exactly what that means, including the one place it deserves a caveat.",
  crumb: [],
  heroStats: [
    ["Personal data collected", "None", "by any calculator on the site"],
    ["Accounts", "None", "no sign-in exists"],
    ["Items in localStorage", "One", "your light or dark theme"],
    ["Last updated", "July 2026", "changes are dated here"],
  ],
  heroCta: [
    ["Terms of use", "/terms/", "btn-ghost"],
    ["Contact us", "/contact/", "btn-ghost"],
  ],
  body,
  faqTitle: "Privacy questions",
  faq: [
    [
      "Do the calculators send my numbers to your server?",
      "No. Every calculator runs entirely in your browser using JavaScript downloaded with the page. The arithmetic happens on your device and the result is written into the page on your device. Nothing you type is transmitted to us, and there is no database on our side that could store it. You can confirm this in your browser's developer tools: change every input and watch the network tab stay silent, or disconnect from the internet after the page loads and keep calculating.",
    ],
    [
      "What is in the URL when I share a calculation?",
      "Every value you entered. The query string carries your vehicle price, down payment, APR, term, annual mileage, fuel price and every other input, which is what makes a link reproduce your exact scenario rather than the defaults. That is deliberate and useful, but it means a shared link discloses your figures to whoever receives it and to any system that handles it. If you would rather not share them, send a screenshot of the result instead.",
    ],
    [
      "Do you use cookies?",
      "No. The site sets no cookies for tracking, analytics or advertising, and it has no login session to maintain. The single thing stored on your device is a theme preference in localStorage, under the key mdc-theme, so the site does not show you the wrong color scheme on every visit. It never leaves your device and we never read it. If your browser reports cookies on this domain, they did not come from us.",
    ],
    [
      "Do you use Google Analytics or any tracking script?",
      "Not at present. The site loads no analytics, no advertising scripts, no marketing pixels, no session recorders, no social widgets and no A/B testing tools. It loads no external resources of any kind: the stylesheets, scripts, images and both typefaces are served from this domain, so your browser contacts no other company while a page renders. If analytics is ever added, this policy will be updated before it goes live, the tool will be named, and calculator inputs will still never be transmitted.",
    ],
    [
      "Can I use the site without JavaScript or with a content blocker?",
      "A content blocker will not break anything, because there is nothing on this site for it to block — no trackers, no ads, and no third-party requests at all. JavaScript is required for the calculators themselves, since that is where the arithmetic happens; with it disabled the guides and articles remain fully readable but the tools will not compute. That trade-off is the direct consequence of doing everything client-side rather than on a server.",
    ],
    [
      "What rights do I have over my data under GDPR or CCPA?",
      "All the usual ones — access, correction, deletion, portability, and objection to profiling — but there is almost nothing for them to attach to. We hold no account, no profile and no record of you. You can delete everything this site placed on your device by clearing site data in your browser. We do not sell or share personal information, so no opt-out mechanism is required. If you think we hold data about you, write to hello@mydrivingcost.com and we will explain precisely what exists.",
    ],
  ],
  cta: {
    h2: "Nothing to sign up for",
    p: "No account, no email, no data collected. Open a calculator and get a number.",
    btn: ["Open the calculators", "/calculators/"],
  },
  schemaExtra: [
    {
      "@type": "CreativeWork",
      "@id": SITE + "/privacy/#document",
      name: "MyDrivingCost.com Privacy Policy",
      genre: "Privacy policy",
      inLanguage: "en",
      datePublished: "2026-01-15",
      dateModified: "2026-07-23",
      publisher: { "@id": SITE + "/#org" },
      isPartOf: { "@id": SITE + "/#website" },
      about: { "@type": "Thing", name: "Website privacy practices" },
    },
  ],
};
