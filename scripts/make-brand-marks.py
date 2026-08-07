#!/usr/bin/env python3
"""
Brand marks — Timber Roofing & Exteriors (2026 identity).

The 2026 logo is flat vector-style artwork in navy and red on white, which
means it keys cleanly and reads at any size. That removes the problem the
previous chrome artwork had: its detail collapsed below about 70px.

Three marks are produced, each for a specific job:

  timber-header-*  emblem + TIMBER + ROOFING & EXTERIORS, horizontal.
                   Built for a navigation bar: the tagline and DFW badge are
                   left out because they are unreadable at header height.
  timber-mark-*    emblem alone, for narrow mobile headers and favicons.
  timber-full-*    the complete stacked logo, for the loader, footer, About.

Nothing is cropped from a band boundary that cuts through artwork: the white
field is removed from the whole image first, then bands are sliced from the
already-transparent result.
"""
import os
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "logo")
SRC = os.environ.get("TIMBER_LOGO",
                     os.path.join(ROOT, "public", "_originals", "timber-logo-2026.png"))
os.makedirs(OUT, exist_ok=True)

# measured from the artwork's ink coverage profile
BANDS = {
    "emblem": (0.015, 0.480),
    "type":   (0.478, 0.755),   # TIMBER + ROOFING & EXTERIORS
}


def key_white(img, cutoff=238):
    """White field -> transparent. Alpha follows luminance, so the navy and red
    edges keep their antialiasing instead of going ragged."""
    rgb = img.convert("RGB")
    w, h = rgb.size
    out = Image.new("RGBA", (w, h))
    px, po = rgb.load(), out.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            lum = (r * 299 + g * 587 + b * 114) // 1000
            if lum >= cutoff:
                po[x, y] = (0, 0, 0, 0)
            else:
                a = 255 if lum < cutoff - 26 else int(255 * (cutoff - lum) / 26)
                po[x, y] = (r, g, b, a)
    return out


def trim(img):
    bb = img.split()[-1].getbbox()
    return img.crop(bb) if bb else img


def band(img, key):
    w, h = img.size
    y0, y1 = BANDS[key]
    return trim(img.crop((0, int(h * y0), w, int(h * y1))))


def to_h(img, h):
    return img.resize((max(1, round(img.width * h / img.height)), h), Image.LANCZOS)


def save(img, name, widths, png=False):
    ratio = img.height / img.width
    for w in widths:
        rz = img.resize((w, max(1, round(w * ratio))), Image.LANCZOS)
        rz.save(os.path.join(OUT, f"{name}-{w}.webp"), "WEBP", quality=94, method=6)
        if png:
            rz.save(os.path.join(OUT, f"{name}-{w}.png"), "PNG", optimize=True)
    print("  %-16s %5dx%-5d ratio %.2f -> %s" % (name, img.width, img.height, img.width / img.height, widths))
    return img


master = key_white(Image.open(SRC))
full = trim(master)
emblem = band(master, "emblem")
wordmark = band(master, "type")


def horizontal(eh=420, gap=0.09, pad=0.015, word=0.72):
    """Emblem left, wordmark right, optically centred on a transparent canvas."""
    em = to_h(emblem, eh)
    wm = to_h(wordmark, round(eh * word))
    g, p = round(eh * gap), round(eh * pad)
    w = p * 2 + em.width + g + wm.width
    h = p * 2 + max(em.height, wm.height)
    c = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    c.alpha_composite(em, (p, (h - em.height) // 2))
    c.alpha_composite(wm, (p + em.width + g, (h - wm.height) // 2))
    return trim(c)


print("Brand marks (2026 identity)")
save(horizontal(), "timber-header", [320, 480, 640, 800])
save(emblem, "timber-mark", [96, 144, 192], png=True)
save(full, "timber-full", [360, 540, 720], png=True)

# favicon: emblem on white, which is how it was drawn
em = to_h(emblem, 460)
side = max(em.size) + 52
sq = Image.new("RGBA", (side, side), (255, 255, 255, 255))
sq.alpha_composite(em, ((side - em.width) // 2, (side - em.height) // 2))
for px in (32, 180, 512):
    sq.resize((px, px), Image.LANCZOS).convert("RGB").save(
        os.path.join(OUT, f"favicon-{px}.png"), "PNG", optimize=True)

# social card: full mark on warm white
card = Image.new("RGBA", (1200, 630), (252, 251, 249, 255))
s = to_h(full, 470)
card.alpha_composite(s, ((1200 - s.width) // 2, 80))
card.convert("RGB").save(os.path.join(OUT, "timber-social.jpg"), "JPEG", quality=90, optimize=True)
print("  favicons + social card")

def to_light(img):
    """Navy -> white for use on dark surfaces.

    The mark is flat two-colour art, so the navy and the red separate cleanly on
    the red/blue ratio. Navy becomes white; the red is lifted to the on-dark red
    so it still reads against a navy panel. Alpha is preserved, which means the
    knocked-out star and window stay as holes and pick up the background.
    """
    out = img.copy()
    px = out.load()
    w, h = out.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if r > b + 40:                      # red family
                px[x, y] = (226, 88, 94, a)
            else:                               # navy family
                px[x, y] = (255, 255, 255, a)
    return out


print("Dark-surface variants")
save(to_light(full), "timber-full-light", [360, 540, 720], png=True)
save(to_light(horizontal()), "timber-header-light", [320, 480, 640, 800])
