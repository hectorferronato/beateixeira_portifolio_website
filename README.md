# Bea Teixeira · Creator portfolio

A responsive, bilingual English / Brazilian Portuguese portfolio for @beateixeira. Built with plain HTML, CSS, and JavaScript. No build tools, accounts, API keys, or package installation are required.

## Local development

From this checkout:

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

Open the site through your development environment's supported browser routing. Translation loading requires HTTP rather than opening `index.html` as a local file.

- English is the first-visit default. The top language button switches to Brazilian Portuguese and remembers the choice.
- Share a specific language with `?lang=en` or `?lang=pt`.
- Edit copy in `index.html` and `translations.json` together. The latter holds both languages.
- Category buttons filter the photo-based content gallery.
- Contact buttons open an email addressed to `contato@assessoriamelo.com`.
- Images are extracted from Bea's supplied HTML; no invented testimonials or brand partnerships are included.
- Audience figures come from the original portfolio, with an explicit reporting-date caveat. Confirm them before using the portfolio for outreach.
- The gallery contains photos, not video case studies. Replace with actual approved video examples when available.

## Free hosting

**GitHub Pages:** In this repository's Settings → Pages, select “Deploy from a branch”, `main`, and `/ (root)`, then Save. The expected project URL is:

`https://hectorferronato.github.io/beateixeira_portifolio_website/`

**Cloudflare Pages:** Connect this repository, choose no framework, leave the build command empty, and set the output directory to `.`. Request a project name such as `beateixeira` or `bybeateixeira`; the free URL would be `https://beateixeira.pages.dev` or `https://bybeateixeira.pages.dev` if available. Hosting and name availability must be confirmed in your account.

A custom domain such as `beateixeira.com` or `bybeateixeira.com` is a polished upgrade, but domain registration is usually paid. Availability has not been checked.

## Assets and privacy

Photos are served locally. Google Fonts is requested for the editorial typefaces, with system fallbacks if unavailable. There are no analytics, tracking scripts, or form submissions. Email uses the visitor's mail application. Confirm photo permissions and contact details before publishing.
