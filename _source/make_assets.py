"""Prepare brand assets: knock out the white background from the supplied logo
(flood fill from the border so interior white strokes survive), trim, and export
the sizes the site needs."""
from PIL import Image, ImageFilter
import numpy as np
from scipy.ndimage import binary_fill_holes, label

SRC = "/mnt/user-data/uploads/1000060841.png"
OUT = "/home/claude/rrr/assets/img"

im = Image.open(SRC).convert("RGB")
a = np.asarray(im).astype(np.int16)

# near-white mask
near_white = (a[:, :, 0] > 238) & (a[:, :, 1] > 238) & (a[:, :, 2] > 238)

# keep only white regions connected to the image border (the real background)
lab, n = label(near_white)
border_ids = set(lab[0, :]) | set(lab[-1, :]) | set(lab[:, 0]) | set(lab[:, -1])
border_ids.discard(0)
bg = np.isin(lab, list(border_ids))

alpha = np.where(bg, 0, 255).astype(np.uint8)
rgba = np.dstack([np.asarray(im), alpha])
out = Image.fromarray(rgba, "RGBA")

# soften the cut edge by one pixel so it doesn't alias on dark navy
edge = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(0.6))
out.putalpha(edge)

# trim to content
bbox = out.getbbox()
out = out.crop(bbox)
print("trimmed:", out.size)

# master + responsive sizes
out.save(f"{OUT}/logo.png", optimize=True)
for w in (520, 320, 200):
    h = round(out.height * w / out.width)
    out.resize((w, h), Image.LANCZOS).save(f"{OUT}/logo-{w}.png", optimize=True)

# square favicon / apple touch on transparent canvas
side = max(out.size)
sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
sq.paste(out, ((side - out.width) // 2, (side - out.height) // 2), out)
sq.resize((180, 180), Image.LANCZOS).save(f"{OUT}/apple-touch-icon.png", optimize=True)
navy = Image.new("RGBA", (side, side), (7, 20, 43, 255))
navy.alpha_composite(sq)
navy.resize((32, 32), Image.LANCZOS).convert("RGB").save(f"{OUT}/favicon.ico", sizes=[(32, 32)])
navy.resize((512, 512), Image.LANCZOS).save(f"{OUT}/icon-512.png", optimize=True)

# Open Graph card: logo centred on the brand navy with the hex-mesh feel
W, H = 1200, 630
og = Image.new("RGB", (W, H), (7, 20, 43))
px = og.load()
for y in range(H):
    for x in range(0, W, 1):
        t = (x / W) * 0.55 + (y / H) * 0.45
        px[x, y] = (int(7 + 12 * t), int(20 + 34 * t), int(43 + 62 * t))
lg = out.copy()
lgw = 760
lg = lg.resize((lgw, round(out.height * lgw / out.width)), Image.LANCZOS)
og.paste(lg, ((W - lg.width) // 2, (H - lg.height) // 2 - 30), lg)
og.save(f"{OUT}/og-image.jpg", quality=86, optimize=True)

print("done")
