# Bea Teixeira · Creator portfolio

A responsive, bilingual English / Brazilian Portuguese portfolio for @beateixeira. Built with plain HTML, CSS, and JavaScript. No build tools, accounts, API keys, or package installation are required.

## Local development

From this checkout:

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

Open the site through your development environment's supported browser routing. Translation loading requires HTTP rather than opening `index.html` as a local file.

- English is the first-visit default. The top language button switches to Brazilian Portuguese and updates the URL. Language is dictated by the URL, not stored browser preferences.
- Share a specific language with `?lang=en` or `?lang=pt-br`.
- Edit copy in `index.html` and `translations.json` together. The latter holds both languages.
- After editing CSS, JavaScript, or translations, run `python3 scripts/version_assets.py` before committing. It adds content hashes to asset URLs so visitors get matching files instead of stale cached versions.
- Topic buttons update a bilingual creative-approach panel with three brand concepts and filter the photo-based content gallery. The chosen topic remains selected when changing languages.
- Contact buttons open an email addressed to `beateixeiraoficial@gmail.com`.
- Images are extracted from Bea's supplied HTML; no invented testimonials or brand partnerships are included.
- Audience figures come from the original portfolio, with an explicit reporting-date caveat. Confirm them before using the portfolio for outreach.
- The photo gallery introduces content themes. The selected Reels section uses Instagram’s official blockquotes and embed.js to embed five videos supplied by Bea, including her SHEIN collaboration. Instagram controls frame height; do not apply fixed heights or a guessed aspect ratio to its generated iframes. Each embed has a direct Instagram fallback link. Instagram controls playback availability and may require sign-in. Photos are not presented as video thumbnails. Social cards link to Bea’s confirmed Instagram, TikTok, and YouTube profiles.

## Free hosting

**GitHub Pages:** In this repository's Settings → Pages, select “Deploy from a branch”, `main`, and `/ (root)`, then Save. The expected project URL is:

`https://hectorferronato.github.io/beateixeira_portifolio_website/`

**Cloudflare Pages:** Connect this repository, choose no framework, leave the build command empty, and set the output directory to `.`. Request a project name such as `beateixeira` or `bybeateixeira`; the free URL would be `https://beateixeira.pages.dev` or `https://bybeateixeira.pages.dev` if available. Hosting and name availability must be confirmed in your account.

A custom domain such as `beateixeira.com` or `bybeateixeira.com` is a polished upgrade, but domain registration is usually paid. Availability has not been checked.

## Assets and privacy

Photos are served locally. Typography uses the native system font stack, including Apple system fonts on Apple devices; no external fonts are requested. The site adds no analytics or form submissions. Embedded Instagram players contact Instagram and may use cookies or require sign-in; playback depends on Instagram and the visitor’s browser settings. Email uses the visitor's mail application. Confirm photo permissions and contact details before publishing.
