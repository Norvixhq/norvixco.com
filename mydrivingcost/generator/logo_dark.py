"""Rebuild the dark-theme logo variants.

The previous pass flattened every navy pixel to near-white (#eaf1fb), which made
the car silhouette and the word "Driving" glare off the navy surface while the
blue and red stayed saturated -- the mismatch is why it read as pasted on.

This pass maps each brand colour to a purpose-chosen dark-surface counterpart
using soft inverse-distance weighting between anchors, so anti-aliasing and
internal shading survive intact:

  navy ink      -> soft periwinkle (sits ON the navy, does not shout)
  brand blue    -> the dark-theme brand blue (#3b8bf4) for AA contrast
  accent red    -> the dark-theme accent (#ff5b52)
  gauge greys   -> muted slate that recedes instead of glaring
"""
import numpy as np
from PIL import Image

# The mark and the wordmark get different navy targets on purpose.
#
# In the light logo the navy is the DARKEST element, so it carries the most
# visual weight. Inverting that on a navy surface means the navy has to become
# the LIGHTEST element -- but a large filled silhouette (the car) at full
# brightness glares, while small text at reduced brightness goes mushy. So the
# car/gauge navy lands on a soft periwinkle and the wordmark navy lands on a
# crisp off-white. Same ink in the source, two different jobs on screen.

_SHARED = [
    ((10, 125, 215),  (59, 139, 244)),    # brand blue -> dark-theme brand
    ((10, 80, 165),   (44, 112, 210)),    # mid blue
    ((0, 96, 192),    (52, 126, 226)),
    ((238, 30, 12),   (255, 91, 82)),     # accent red -> dark-theme accent
    ((216, 26, 26),   (232, 74, 68)),     # deeper red
    ((248, 248, 248), (92, 112, 145)),    # gauge arc grey -> recedes
    ((240, 240, 240), (88, 108, 141)),
    ((120, 120, 144), (74,  92, 122)),    # mid grey
    ((255, 255, 255), (104, 124, 156)),   # pure white highlights
]

MARK_ANCHORS = [
    ((11, 28, 58),    (176, 196, 225)),   # car body / gauge outline
    ((4, 8, 40),      (158, 180, 214)),
    ((6, 46, 96),     (146, 173, 213)),
] + _SHARED

WORD_ANCHORS = [
    ((11, 28, 58),    (232, 239, 250)),   # "Driving" / ".com" -> crisp off-white
    ((4, 8, 40),      (219, 229, 245)),
    ((6, 46, 96),     (203, 219, 242)),
] + _SHARED

POWER = 3.2          # falloff sharpness between anchors
EPS = 1e-6


def _remap(rgb, alpha, anchors):
    SRC = np.array([a for a, _ in anchors], dtype=np.float64)
    DST = np.array([b for _, b in anchors], dtype=np.float64)
    h, w, _ = rgb.shape
    flat = rgb.reshape(-1, 3).copy()
    vis = alpha.reshape(-1) > 2
    px = flat[vis]
    if px.size:
        d = np.linalg.norm(px[:, None, :] - SRC[None, :, :], axis=2)
        wgt = 1.0 / (np.power(d, POWER) + EPS)
        wgt /= wgt.sum(axis=1, keepdims=True)
        flat[vis] = wgt @ DST
    return flat.reshape(h, w, 3)


def recolor(path_in, path_out, anchors=MARK_ANCHORS):
    im = Image.open(path_in).convert("RGBA")
    arr = np.array(im).astype(np.float64)
    rgb, alpha = arr[:, :, :3], arr[:, :, 3]
    out = _remap(rgb, alpha, anchors)
    res = np.concatenate([out, alpha[:, :, None]], axis=2)
    Image.fromarray(np.clip(res, 0, 255).astype(np.uint8), "RGBA").save(path_out)
    print("wrote", path_out)


def trim(img):
    na = np.array(img)
    ys, xs = np.where(na[:, :, 3] > 8)
    return Image.fromarray(na[ys.min():ys.max() + 1, xs.min():xs.max() + 1])


def lockup(mark, word, H=150, gap=34, wordfrac=0.46):
    """Horizontal nav lockup — same geometry as the light logo-h.png."""
    mh = H
    mw = int(mark.width * mh / mark.height)
    wh = int(H * wordfrac)
    ww = int(word.width * wh / word.height)
    canvas = Image.new("RGBA", (mw + gap + ww, H), (0, 0, 0, 0))
    canvas.alpha_composite(mark.resize((mw, mh)), (0, 0))
    canvas.alpha_composite(word.resize((ww, wh)), (mw + gap, (H - wh) // 2))
    return trim(canvas)


def recolor_stacked(path_in, path_out):
    """The full stacked logo keeps its original composition — we just apply the
    mark map to the upper band and the wordmark map to the lower band."""
    im = Image.open(path_in).convert("RGBA")
    arr = np.array(im).astype(np.float64)
    rgb, alpha = arr[:, :, :3], arr[:, :, 3]

    # find the horizontal gap between the icon band and the wordmark band
    rows = (alpha > 18).sum(axis=1)
    thr = max(rows.max() * 0.02, 3)
    content = rows > thr
    runs, s = [], None
    for i, v in enumerate(content):
        if v and s is None:
            s = i
        if (not v) and s is not None:
            runs.append((s, i - 1)); s = None
    if s is not None:
        runs.append((s, len(content) - 1))
    runs = [r for r in runs if (r[1] - r[0]) > 8]
    split = (runs[0][1] + runs[1][0]) // 2 if len(runs) >= 2 else rgb.shape[0]

    top = _remap(rgb[:split], alpha[:split], MARK_ANCHORS)
    bot = _remap(rgb[split:], alpha[split:], WORD_ANCHORS)
    out = np.concatenate([top, bot], axis=0)
    res = np.concatenate([out, alpha[:, :, None]], axis=2)
    Image.fromarray(np.clip(res, 0, 255).astype(np.uint8), "RGBA").save(path_out)
    print("wrote", path_out, "(band split at row", split, ")")


if __name__ == "__main__":
    base = "/home/claude/mydrivingcost/assets/img/"
    recolor(base + "mark.png", base + "mark-dark.png", MARK_ANCHORS)
    recolor(base + "wordmark.png", base + "wordmark-dark.png", WORD_ANCHORS)

    md = Image.open(base + "mark-dark.png").convert("RGBA")
    wd = Image.open(base + "wordmark-dark.png").convert("RGBA")
    lockup(md, wd).save(base + "logo-h-dark.png")
    print("wrote logo-h-dark.png")
    recolor_stacked(base + "logo.png", base + "logo-dark.png")
