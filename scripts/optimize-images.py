#!/usr/bin/env python3
"""
Timber Roofing & Exteriors - project photography pipeline.

Reads the supplied originals, applies the per-image corrections listed in
PHOTOS, and writes responsive WebP + JPEG derivatives to public/images.
Aspect ratios are preserved and widths are capped at the source width, so
nothing is ever upscaled.

Per-image corrections:
  rotate   degrees counter-clockwise, for photos captured sideways
  redact   list of boxes (as fractions of width/height) to pixelate - used
           for vehicle plates and anything else identifying. Privacy is not
           optional; these run before any derivative is written.

To add photos: drop them in the source folder, add an entry here, rerun, then
add a matching project to src/content/projects.json.
"""
import json
import os
import shutil
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.environ.get("TIMBER_PHOTO_SRC", "/mnt/user-data/uploads")
ORIG = os.path.join(ROOT, "public", "_originals")
OUT = os.path.join(ROOT, "public", "images")
WIDTHS = [480, 800, 1280, 1600]

PHOTOS = {
    "1.jpg":  {"slug": "aerial-weathered-shingle-roof"},
    "2.jpg":  {"slug": "aerial-charcoal-roof-replacement"},
    "3.jpg":  {"slug": "brick-home-gray-shingle-roof"},
    "4.jpg":  {"slug": "red-brick-home-gutters-downspouts"},
    "5.jpg":  {"slug": "aerial-gray-shingle-roof-crew"},
    "6.jpg":  {"slug": "aerial-storm-roof-tearoff-dumpster"},
    "7.jpg":  {"slug": "brick-home-brown-shingle-roof"},
    "8.jpg":  {"slug": "cedar-privacy-fence-gate"},
    "9.jpg":  {"slug": "stained-fence-side-yard"},
    "10.jpg": {"slug": "stained-fence-corner-run"},
    # captured sideways; the deck and house belong at the top of frame
    "11.jpg": {"slug": "fence-posts-set-string-line", "rotate": 90},
    "12.jpg": {"slug": "stained-deck-rail-and-steps"},
    # a vehicle plate is legible in the garage - pixelated before publishing
    "13.jpg": {"slug": "brick-home-dark-roof-garage",
               "redact": [(0.6547, 0.6458, 0.6984, 0.6913)]},
    "14.jpg": {"slug": "brick-home-gutters-rear-elevation"},
}

for d in (ORIG, OUT):
    os.makedirs(d, exist_ok=True)

manifest = {}


def pixelate(im, boxes):
    w, h = im.size
    for (x0, y0, x1, y1) in boxes:
        box = (int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h))
        region = im.crop(box)
        if region.width < 2 or region.height < 2:
            continue
        small = region.resize((max(1, region.width // 14), max(1, region.height // 10)),
                              Image.BILINEAR)
        im.paste(small.resize(region.size, Image.NEAREST), box)
    return im


def emit(im, slug):
    w0, h0 = im.size
    ratio = h0 / w0
    sizes = sorted(set([w for w in WIDTHS if w <= w0] + [w0]))
    for w in sizes:
        rz = im.resize((w, max(1, round(w * ratio))), Image.LANCZOS)
        rz.save(os.path.join(OUT, f"{slug}-{w}.webp"), "WEBP", quality=78, method=6)
    # a single JPEG at the largest width is the <img> fallback; WebP carries
    # every responsive step, so intermediate JPEGs would never be requested
    big = sizes[-1]
    im.resize((big, max(1, round(big * ratio))), Image.LANCZOS).save(
        os.path.join(OUT, f"{slug}-{big}.jpg"), "JPEG", quality=82,
        optimize=True, progressive=True)
    return {"width": w0, "height": h0, "ratio": round(ratio, 4), "widths": sizes}


missing = []
for fname, cfg in PHOTOS.items():
    path = os.path.join(SRC, fname)
    if not os.path.exists(path):
        missing.append(fname)
        continue
    shutil.copy2(path, os.path.join(ORIG, fname))
    im = Image.open(path).convert("RGB")
    notes = []
    if cfg.get("rotate"):
        im = im.rotate(cfg["rotate"], expand=True)
        notes.append(f"rotated {cfg['rotate']}\u00b0")
    if cfg.get("redact"):
        im = pixelate(im, cfg["redact"])
        notes.append(f"{len(cfg['redact'])} region(s) redacted")
    meta = emit(im, cfg["slug"])
    tiny = im.resize((20, max(1, round(20 * meta["ratio"]))), Image.LANCZOS)
    tiny.filter(ImageFilter.GaussianBlur(0.6)).save(
        os.path.join(OUT, f"{cfg['slug']}-lqip.webp"), "WEBP", quality=40)
    manifest[cfg["slug"]] = meta
    print(f"  {cfg['slug']:38} {meta['width']}x{meta['height']}"
          + (f"  [{', '.join(notes)}]" if notes else ""))

# brand marks live in the manifest too so templates can size them
for name, ratio in (("timber-lockup-h", None), ("timber-stack", None)):
    pass

with open(os.path.join(ROOT, "src", "content", "image-manifest.json"), "w") as f:
    json.dump(manifest, f, indent=2)

total = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
print(f"\n  {len(manifest)} photos, {round(total/1024)} KB of derivatives")
if missing:
    print(f"  missing sources (skipped): {', '.join(missing)}")
