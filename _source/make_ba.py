# -*- coding: utf-8 -*-
"""Stylised interior scene rendered twice — damaged and restored — so the
before/after slider demos correctly until real job photography is dropped in."""

OUT = "/home/claude/rrr/assets/img"

def scene(kind):
    dark = kind == "before"
    if dark:
        wall_a, wall_b = "#4A4034", "#2E2A24"
        floor_a, floor_b = "#3A3229", "#241F1A"
        light = "#6B5B45"
        ceil = "#3B352C"
        trim = "#5A5045"
        sky = "#586A78"
    else:
        wall_a, wall_b = "#F2EEE7", "#DFD8CD"
        floor_a, floor_b = "#C99A63", "#A8783F"
        light = "#FFF6E2"
        ceil = "#FBF8F3"
        trim = "#FFFFFF"
        sky = "#BFE0F2"

    water = """
    <g opacity=".82">
      <path d="M0 560 Q 200 540 420 556 T 840 552 T 1200 562 L1200 750 L0 750 Z" fill="#2F3B44"/>
      <path d="M0 578 Q 240 560 470 574 T 900 570 T 1200 580 L1200 750 L0 750 Z" fill="#3C4C58" opacity=".8"/>
      <ellipse cx="330" cy="640" rx="210" ry="26" fill="#5D7788" opacity=".45"/>
      <ellipse cx="820" cy="690" rx="260" ry="30" fill="#5D7788" opacity=".35"/>
      <path d="M120 612 q60 -10 120 0" stroke="#8FB4C6" stroke-width="3" fill="none" opacity=".5"/>
      <path d="M700 660 q80 -12 160 0" stroke="#8FB4C6" stroke-width="3" fill="none" opacity=".45"/>
    </g>"""

    damage = """
    <g>
      <path d="M300 150 q40 60 10 130 q-50 30 -96 -10 q-14 -80 26 -122 z" fill="#6E5B3E" opacity=".75"/>
      <path d="M318 170 q26 44 4 96 q-34 20 -66 -8" fill="#54452E" opacity=".7"/>
      <path d="M880 120 q54 70 18 160 q-64 26 -108 -20 q-6 -92 40 -140 z" fill="#6E5B3E" opacity=".6"/>
      <path d="M0 300 h1200" stroke="#2B241C" stroke-width="0" />
      <rect x="470" y="300" width="150" height="230" fill="#241F1A" opacity=".55"/>
      <path d="M470 300 l150 230 M620 300 l-150 230" stroke="#151210" stroke-width="4" opacity=".5"/>
    </g>"""

    fresh = """
    <g>
      <rect x="470" y="292" width="168" height="250" rx="6" fill="#E8DFD2" stroke="#C9BCA9" stroke-width="3"/>
      <rect x="492" y="314" width="124" height="206" rx="4" fill="#F7F2E9"/>
      <g fill="#8FA98C"><circle cx="554" cy="392" r="34"/><circle cx="524" cy="430" r="26"/><circle cx="586" cy="432" r="24"/></g>
      <rect x="536" y="452" width="36" height="60" rx="4" fill="#B98A5A"/>
    </g>"""

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" width="1200" height="750" role="img">
  <defs>
    <linearGradient id="w" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="{wall_a}"/><stop offset="100%" stop-color="{wall_b}"/>
    </linearGradient>
    <linearGradient id="f" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="{floor_a}"/><stop offset="100%" stop-color="{floor_b}"/>
    </linearGradient>
    <radialGradient id="glow" cx="52%" cy="18%" r="62%">
      <stop offset="0%" stop-color="{light}" stop-opacity=".55"/>
      <stop offset="100%" stop-color="{light}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="750" fill="url(#w)"/>
  <rect width="1200" height="96" fill="{ceil}"/>
  <rect y="540" width="1200" height="210" fill="url(#f)"/>
  <rect y="524" width="1200" height="18" fill="{trim}" opacity=".85"/>
  <rect width="1200" height="750" fill="url(#glow)"/>

  <!-- window -->
  <rect x="112" y="176" width="250" height="230" rx="8" fill="{sky}" stroke="{trim}" stroke-width="10"/>
  <path d="M237 176 v230 M112 291 h250" stroke="{trim}" stroke-width="8"/>

  <!-- floor boards -->
  <g stroke="{'#1C1814' if dark else '#8E6534'}" stroke-width="2" opacity=".5">
    <path d="M0 590 h1200 M0 640 h1200 M0 696 h1200"/>
  </g>

  {damage if dark else fresh}
  {water if dark else ''}

  <!-- sofa -->
  <g>
    <rect x="760" y="424" width="330" height="118" rx="18" fill="{'#463B31' if dark else '#3F5D74'}"/>
    <rect x="778" y="398" width="294" height="60" rx="16" fill="{'#544639' if dark else '#4E7189'}"/>
    <rect x="800" y="542" width="18" height="30" fill="{'#2A2219' if dark else '#7A5433'}"/>
    <rect x="1032" y="542" width="18" height="30" fill="{'#2A2219' if dark else '#7A5433'}"/>
  </g>

  <rect width="1200" height="750" fill="{'#0B1220' if dark else '#FFFFFF'}" opacity="{'.34' if dark else '.05'}"/>
</svg>"""


for k in ("before", "after"):
    with open(f"{OUT}/ba-{k}.svg", "w", encoding="utf-8") as f:
        f.write(scene(k))
print("wrote ba-before.svg, ba-after.svg")
