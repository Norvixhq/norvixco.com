# Deploying MyDrivingCost.com

## Before anything else: how to look at it

**Do not judge the site by double-clicking `site/index.html`.** It will render as unstyled HTML with a giant blue logo, on every page, and it will look completely broken. It is not.

Every asset is referenced by a root-absolute path (`/assets/css/styles.css`) because that is what keeps the live URLs clean and extension-free. Under `file://` the browser looks for those files at the root of your hard drive. Over HTTP — on any host, or on a local server — they resolve and the page is correct.

**Double-click `preview.command` in the package root** to see the real thing. It starts a local server and opens your browser. On macOS, a file downloaded from the internet may need **right-click → Open → Open** the first time; if it will not run, `chmod +x preview.command` once in Terminal. The manual equivalent is:

```bash
cd site
python3 -m http.server 8811     # then visit http://localhost:8811
```

Nothing about deployment depends on this — it is purely so you can see what you are uploading. Every page also shows a small explanatory banner if it is opened as a file; that banner is gated on `location.protocol === 'file:'` and can never appear on the live site.

---

This package contains two folders and one helper script.

- **`site/` is the website.** Plain static files: no build step, no framework, no database, no server-side code. Upload its contents to any static host and it works.
- **`generator/` is a development tool.** Node scripts that produce most of the pages. It must never be uploaded.
- **`preview.command` is the local viewer** described above. It must never be uploaded either.

Everything below refers to `site/` unless it says otherwise. For how the site stays accurate over time without regular maintenance, read `MAINTENANCE.md` — that is the short one, and it is the one to read first.

## The one thing that matters: clean URLs

Every page on this site lives at `<directory>/index.html`, which means the URL a visitor sees is always clean, slash-terminated and extension-free:

```
https://mydrivingcost.com/
https://mydrivingcost.com/calculators/
https://mydrivingcost.com/calculators/true-cost-to-own/
https://mydrivingcost.com/methodology/
```

No page URL ends in `.html`. No navigation uses a `#` fragment. Calculator state travels in the query string (`?price=34000&apr=7.2`) and is written with `history.replaceState`, so sharing a link preserves the numbers without polluting the address bar with a hash.

The only `#` references anywhere in the markup are the "skip to content" links every page carries for keyboard and screen-reader users. Those are required for accessibility, and the JavaScript intercepts them so the fragment never reaches the address bar. Leave them alone.

Config files for the four common host types are included in `site/` and each enforces this. Use whichever matches your host and delete the rest, or leave them all — each host ignores the others.

| Host | File it reads | Already configured |
|---|---|---|
| Netlify | `netlify.toml` | Redirects, security headers, cache policy |
| Vercel | `vercel.json` | `cleanUrls`, `trailingSlash`, headers |
| Cloudflare Pages | `_redirects` + `_headers` | Redirects and headers |
| Apache / cPanel / shared hosting | `.htaccess` | HTTPS forcing, extension stripping, headers, compression |

All four permanently redirect any legacy `.html` URL to its clean equivalent, so old links and anything already indexed will not break.

## Deploying

**Netlify or Cloudflare Pages.** Drag the `site/` folder onto the dashboard, or connect a Git repository and set the publish directory to `site` with an empty build command.

**Vercel.** `vercel --prod` from inside `site/`, or connect the repository, choose "Other" as the framework preset and set the root directory to `site`.

**Apache, cPanel or any shared host.** Upload the entire contents of `site/` to `public_html` (or your document root), including the dotfile `.htaccess` — most FTP clients hide dotfiles by default, so enable "show hidden files" or the clean URLs will not work. Confirm `mod_rewrite` is enabled.

**GitHub Pages.** Works, but with a caveat: GitHub Pages ignores all four config files, so you get clean URLs (because of the directory structure) but no custom headers and no `.html` redirects. Acceptable for a preview, not ideal for production.

## After the domain is pointed

1. **Verify HTTPS** is active and that `http://` redirects to `https://`. Every host above issues a certificate automatically; Apache needs one installed.
2. **Pick a canonical hostname.** Decide between `mydrivingcost.com` and `www.mydrivingcost.com` and redirect the other to it at the host level. The `<link rel="canonical">` tags in the HTML all point at the bare domain, so redirect `www` → apex unless you change them.
3. **Submit the sitemap** at `https://mydrivingcost.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools. It lists all 31 indexable pages.
4. **Spot-check the redirects.** Request `https://mydrivingcost.com/about.html` and confirm it 301s to `/about/`.
5. **Check the 404.** Request a URL that does not exist and confirm you land on the custom error page rather than the host's default. Netlify, Vercel and Cloudflare pick up `404.html` automatically; the `.htaccess` sets `ErrorDocument` for Apache.
6. **Check the security headers** at securityheaders.com. The Content-Security-Policy is deliberately strict.

## Content-Security-Policy — read before adding anything

The CSP is `default-src 'self'`, which means the browser will refuse to load **anything from any other domain**. This is possible because the site genuinely loads nothing externally — stylesheets, scripts, images, icons and both typefaces are all served from this origin.

If you later add Google Analytics, an ad script, an embedded video, a chat widget or a font from a CDN, **it will be silently blocked** until you add that domain to the policy in whichever config file your host reads. This is a feature, not a bug: it means nothing can start phoning home without a deliberate change.

Note also that the privacy policy makes an explicit factual claim that the site loads no third-party resources. If you add one, update `/privacy/` — the page names the commitment precisely so that breaking it is visible.

## Fonts

Inter and Sora are self-hosted in `assets/fonts/` as `woff2`, with `unicode-range` splitting so a typical visitor downloads only the Latin subsets actually rendered — roughly 100 KB rather than the 376 KB on disk. They are not loaded from Google Fonts. This removes the last third-party request, drops two DNS lookups and two TLS handshakes from the critical render path, and avoids sending visitor IP addresses to a third party. Browsers have partitioned their HTTP cache by origin since 2020, so the old "shared CDN cache" argument for using Google Fonts no longer applies.

Both are open-licence: Inter under the SIL Open Font License 1.1, Sora under the SIL Open Font License 1.1. Both permit self-hosting and commercial use.

## Images

`assets/img/` is deliberately small — the whole directory is under 100 KB. The logo files are stored at roughly three times their rendered size (enough for a Retina display and no more) and palette-quantised, and the social-share card is a progressive JPEG rather than a PNG. If you replace any of them, resize before uploading: dropping the original 1329-pixel-wide logo back in would add most of a megabyte to every single page load, because both the light and dark variants are fetched regardless of the active theme.

Every image carries explicit `width` and `height` attributes so the browser reserves the correct space before the file arrives. Keep those in sync with the real dimensions or the layout will shift while loading.

## Rebuilding content

Most pages are generated from the Node modules in `generator/`. That directory is not part of the deployable site and must not be uploaded.

Run the scripts from inside `generator/`, with `site/` as their output target:

```
export MDC_SITE=/absolute/path/to/site
node build.js         # topic hubs, trust and legal pages, the calculator directory, 404
node build-calcs.js   # the 13 generated calculator pages
node sitemap.js       # regenerates sitemap.xml and robots.txt from what is on disk
```

`export` the variable rather than prefixing it onto the first command only — otherwise the later scripts write to the wrong directory. The scripts also default to `../site` relative to `generator/`, so if the two folders stay siblings you can omit the variable entirely.

Three pages inside `site/` are hand-maintained and are **not** regenerated by those scripts — edit them directly:

- `index.html` (the homepage)
- `calculators/true-cost-to-own/index.html`
- `calculators/lease-vs-buy/index.html`

`assets/css/styles.css`, `assets/css/fonts.css` and the host config files are also edited directly. So is `assets/js/tco.js`, `assets/js/lvb.js`, `assets/js/main.js` and `assets/js/calc-kit.js`.

**Everything else in `assets/js/` is generated.** The other thirteen calculator scripts are written by `build-calcs.js` from the modules in `generator/content/calc-*.js`. Editing them in `site/` looks like it works and is silently undone by the next build. If you need to change how a calculator behaves, change the module.

Run `node sitemap.js` after adding or removing any page. It walks the directory tree and rebuilds the sitemap from what actually exists, so it cannot drift out of sync.

## Verification tooling

Two scripts in `generator/` check the site. They need Playwright (`npm install playwright`, then `npx playwright install chromium`) — a development dependency only; nothing about the site itself requires Node.

Serve the site locally first:

```
cd site && python3 -m http.server 8811
```

Then, from `generator/`:

```
node audit.js       # crawls all pages: broken links, .html or # in hrefs, JS errors,
                    # title and description lengths, duplicate metadata, canonical
                    # correctness, JSON-LD validity, missing alt text, thin pages
node verify.js <url>...   # renders a calculator and checks every output computed
```

`audit.js` exits non-zero if anything fails. Run it before every deploy.

## What is deliberately absent

No analytics, no cookie banner (there are no cookies to consent to), no newsletter modal, no affiliate links, no ads, no lead capture and no contact form. The contact page uses `mailto:` addresses rather than a form, because a form on a static site requires a third-party handler and would contradict the privacy policy.

If you add analytics later, the privacy policy already commits in advance to naming the tool and updating the page before it goes live. Honour that — the site's entire value proposition is that its claims can be checked.
