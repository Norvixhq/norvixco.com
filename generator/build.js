const P = require("./page");

const MODULES = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [
      "./content/fuel-and-ev",
      "./content/insurance",
      "./content/depreciation",
      "./content/maintenance",
      "./content/buying-guides",
      "./content/guides",
      "./content/calculators",
      "./content/about",
      "./content/trust-methodology",
      "./content/trust-editorial",
      "./content/trust-contact",
      "./content/trust-faq",
      "./content/trust-privacy",
      "./content/trust-terms",
      "./content/trust-disclaimer",
    ];

console.log("Building pages...");
for (const m of MODULES) {
  const cfg = require(m.startsWith(".") ? m : "./content/" + m);
  P.write(cfg.url, P.build(cfg));
}

/* 404.html is not in MODULES because it is not a URL — it is the document the
   host returns for every unmatched path, so it writes to the root rather than
   to <dir>/index.html. It still shares the shell, which is the whole point:
   the error page must never be the one page that looks unfinished. Skipped
   when a subset of modules is named on the command line. */
if (!process.argv.slice(2).length) require("./error404");

console.log("done —", MODULES.length, "pages");
