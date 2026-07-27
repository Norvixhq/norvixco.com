/* Raster app icons, rendered from the same gauge mark as favicon.svg.
   The SVG favicon is authored on a 48×48 grid but the mark itself is wide and
   short (37 × 22.5 units), so a naive rasterisation leaves it hugging the top
   of a square PNG. Everything below re-centers the mark optically and renders
   through Chromium so the gradient matches the vector favicon exactly — an
   ImageMagick MSVG fallback flattens gradients and would ship a different logo
   at small sizes than the one in the tab. */

const fs = require("fs");
const path = require("path");
const { chromium } = require("/home/claude/node_modules/playwright");

const ROOT = process.env.MDC_SITE || path.resolve(__dirname, "..", "site");
const OUT = path.join(ROOT, "assets", "img");

/* Mark bounding box on the 48-unit grid: x 5.5→42.5, y 12.5→35. */
const BB = { x: 5.5, y: 12.5, w: 37, h: 22.5 };

/**
 * @param fill   fraction of the canvas width the mark should span
 * @param bg     background color, or null for transparent
 */
function markSvg(fill, bg) {
  const s = (48 * fill) / BB.w;
  const cx = BB.x + BB.w / 2;
  const cy = BB.y + BB.h / 2;
  /* translate to canvas center, scale, translate mark center to origin */
  const tx = 24 - cx * s;
  const ty = 24 - cy * s;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none" shape-rendering="geometricPrecision">
  <defs>
    <linearGradient id="g" x1="7" y1="0" x2="41" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#1466e0"/>
      <stop offset=".5" stop-color="#2f9bf4"/>
      <stop offset=".68" stop-color="#e5261c"/>
      <stop offset="1" stop-color="#e5261c"/>
    </linearGradient>
  </defs>
  ${bg ? `<rect width="48" height="48" fill="${bg}"/>` : ""}
  <g transform="translate(${tx.toFixed(4)} ${ty.toFixed(4)}) scale(${s.toFixed(6)})">
    <path d="M8 31 A16 16 0 0 1 40 31" stroke="url(#g)" stroke-width="5" stroke-linecap="round"/>
    <line x1="24" y1="31" x2="33.5" y2="19" stroke="#e5261c" stroke-width="3" stroke-linecap="round"/>
    <circle cx="24" cy="31" r="4" fill="#1466e0"/>
    <circle cx="24" cy="31" r="1.6" fill="${bg === "#0b1c3a" ? "#0b1c3a" : "#fff"}"/>
  </g>
</svg>`;
}

/* purpose:"any" icons carry their own white field so they never dissolve into a
   light launcher background; the maskable variant sits on brand navy with the
   mark inside the 80%-diameter safe circle so Android's crop can't clip it. */
const JOBS = [
  { file: "icon-192.png", size: 192, fill: 0.8, bg: "#ffffff" },
  { file: "icon-512.png", size: 512, fill: 0.8, bg: "#ffffff" },
  { file: "icon-maskable-512.png", size: 512, fill: 0.56, bg: "#0b1c3a" },
  { file: "apple-touch-icon.png", size: 180, fill: 0.76, bg: "#ffffff" },
];

(async () => {
  const browser = await chromium.launch({
    executablePath: "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell",
  });
  for (const j of JOBS) {
    const page = await browser.newPage({
      viewport: { width: j.size, height: j.size },
      deviceScaleFactor: 1,
    });
    await page.setContent(
      `<!doctype html><meta charset="utf-8"><style>
        html,body{margin:0;padding:0;background:transparent}
        svg{display:block;width:${j.size}px;height:${j.size}px}
      </style>${markSvg(j.fill, j.bg)}`
    );
    await page.screenshot({
      path: path.join(OUT, j.file),
      omitBackground: !j.bg,
      type: "png",
    });
    await page.close();
    const b = fs.statSync(path.join(OUT, j.file)).size;
    console.log("  " + j.file.padEnd(26) + j.size + "×" + j.size + "  " + b + " B");
  }
  await browser.close();
})();
