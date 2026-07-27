/* Build every calculator page from its content module. */
const C = require("./calcpage");

const MODULES = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [
      "./content/calc-cost-per-mile",
      "./content/calc-fuel-cost",
      "./content/calc-ev-charging",
      "./content/calc-auto-loan",
      "./content/calc-depreciation",
      "./content/calc-new-vs-used",
      "./content/calc-insurance-estimator",
      "./content/calc-maintenance-cost",
      "./content/calc-affordability",
      "./content/calc-trade-in-value",
      "./content/calc-ten-year-cost",
      "./content/calc-monthly-budget",
      "./content/calc-road-trip",
    ];

console.log("Building calculators…");
MODULES.forEach((m) => C.writeCalc(require(m)));
console.log("Done — " + MODULES.length + " calculator pages.");
