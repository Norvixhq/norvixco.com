# Deploying to GitHub Pages

Read this if you are hosting on GitHub Pages. If you are on Netlify, Cloudflare Pages, Vercel or Apache, read `DEPLOY.md` instead — this file only covers GitHub's quirks.

---

## What went wrong the first time, and why

The whole package folder was pushed to the repository and GitHub Pages was set to publish from the repository root. Two things then happened, both of them predictable in hindsight:

**The root had no `index.html`, so GitHub rendered `README.md` as the website.** GitHub Pages runs Jekyll by default, and Jekyll's fallback when it finds no `index.html` is to render the README as the homepage. That is why `norvixco.com` showed the project's documentation — the heading, the "Read this first" warning box, the package tree — styled with GitHub's default Jekyll theme. It was never the site. The site had not been served at all.

**The real site was one directory too deep.** It was sitting at `norvixco.com/site/`, and it loaded — but unstyled, for the same underlying reason the local `file://` preview looks broken. Every asset on this site is referenced by a **root-absolute path**: `/assets/css/styles.css`. When the site lives at `/site/`, the browser still asks for `norvixco.com/assets/css/styles.css`, which does not exist, because the real file is at `norvixco.com/site/assets/css/styles.css`. Verified directly: the first URL returned 404, the second returned the stylesheet.

Every internal link fails the same way. `/calculators/true-cost-to-own/` would 404 while the page actually lived at `/site/calculators/true-cost-to-own/`.

**So there is one rule, and everything else follows from it: the contents of the site folder must sit at the root of what GitHub Pages publishes — not the folder itself, its contents.**

---

## The fix

GitHub Pages will only publish from two places on a branch: the repository root, or a folder named exactly `docs/`. It cannot publish from a folder called `site/`. So the site folder is renamed to `docs/`, and Pages is pointed at it.

The `mydrivingcost-github.zip` package is already laid out this way. Its contents are:

```
docs/              ← GitHub Pages publishes THIS. It is the site, renamed.
├── .nojekyll      ← turns Jekyll off. Required.
├── CNAME          ← your custom domain, one line.
├── index.html
├── 404.html
├── assets/  calculators/  guides/  …
generator/         ← dev tool. In the repo, never served.
preview.command    ← local viewer. In the repo, never served.
README.md  DEPLOY.md  MAINTENANCE.md  REMAINING-ITEMS.md  GITHUB-PAGES.md
```

`README.md` still renders on the repository's GitHub page, which is what a README is for. It is no longer the website, because `docs/` is what gets published and `docs/index.html` exists.

### Steps

1. **Delete everything currently in the repository.** A partial overwrite leaves the old `site/` folder behind and `norvixco.com/site/` keeps 404-ing assets forever.
2. **Unzip `mydrivingcost-github.zip` and push its contents to the repository root.** The repo root should contain `docs/`, `generator/`, `preview.command` and the four markdown files.
3. **Settings → Pages → Build and deployment.** Source: *Deploy from a branch*. Branch: `main`. Folder: **`/docs`**. Save.
4. **Settings → Pages → Custom domain.** Confirm it reads `norvixco.com`. If GitHub clears it, retype it and save — that writes `docs/CNAME` for you, and the file is already in the package anyway.
5. **Wait two to three minutes** for the Pages build, then hard-reload (Cmd-Shift-R). Browsers cache the old broken page aggressively.

### Confirming it worked

Visit `norvixco.com`. You should see the dark navy hero, the logo, and the nav bar — not a wall of documentation. Then check three things directly:

- `norvixco.com/assets/css/styles.css` returns CSS, not a 404. This is the single most diagnostic URL on the site; if it 404s, the folder is still nested.
- `norvixco.com/calculators/true-cost-to-own/` loads the flagship calculator with working sliders.
- `norvixco.com/this-page-does-not-exist` shows the custom 404 page, not GitHub's.

---

## Two files that exist only for GitHub

**`.nojekyll`** is an empty file that disables Jekyll processing entirely. Without it, Jekyll rebuilds the site on every push and strips any file or folder whose name begins with an underscore — which would silently delete `_headers` and `_redirects`. It also removes an unnecessary build step. This file is harmless on every other host, so it now ships in the standard package too.

**`CNAME`** contains your custom domain on a single line, with no protocol and no trailing slash:

```
norvixco.com
```

When you buy `mydrivingcost.com`, change this file to `mydrivingcost.com`, push, and point the DNS. Nothing else in the site needs to change.

---

## What GitHub Pages cannot do

This matters enough to be explicit about, because it is the reason I would not choose GitHub Pages for the production site.

GitHub Pages **ignores every host configuration file in this package.** `.htaccess`, `_redirects`, `_headers`, `netlify.toml` and `vercel.json` are all inert there. Concretely, you lose:

- **The Content-Security-Policy.** The site ships a strict `default-src 'self'` that makes it impossible for any third-party script to load. On GitHub Pages there is no CSP at all.
- **Every other security header** — `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`.
- **Cache-Control tuning.** Fonts and images are configured for a one-year immutable cache elsewhere; GitHub serves its own shorter defaults, so repeat visits are slower than they need to be.
- **The legacy `.html` → clean-URL redirects.** Low impact, since nothing on the site links with a `.html` extension, but any old inbound link would 404 rather than redirect.

What still works natively, without any config: **clean extensionless URLs** (they come from the directory structure, not from a rewrite rule), **trailing-slash redirects**, **HTTPS with an auto-issued certificate**, and the **custom 404 page** (GitHub picks up `404.html` automatically).

So the site is fully functional on GitHub Pages. It is just less hardened and slightly slower than it was designed to be.

### The better option, in about five minutes

**Cloudflare Pages** is free, and it reads `_redirects` and `_headers` — the two files already sitting in this package. You get the full CSP, all the security headers, the cache policy, and a considerably faster global CDN. Connect the same GitHub repository, set the build output directory to `docs`, leave the build command empty, and move the DNS. Netlify is equally good and reads `netlify.toml` on top of those two.

Nothing about the site changes. It is the same files, served by a host that honours the configuration they came with. Worth doing before you point `mydrivingcost.com` at anything — but not urgent, and not a reason to hold up seeing the site live today.

---

## While you are on norvixco.com

Every page carries `<link rel="canonical">` pointing at `https://mydrivingcost.com/...`, and `robots.txt` and `sitemap.xml` name that domain too. **Leave all of it alone.**

This is the correct behaviour for a temporary preview domain. It tells search engines that `norvixco.com` is not the address to index, which stops the preview from accumulating rankings you would then have to migrate — and, worse, from competing with the real domain later as duplicate content. When `mydrivingcost.com` goes live, the canonicals are already right and nothing needs rewriting.

The only file to touch when the real domain is ready is `docs/CNAME`.
