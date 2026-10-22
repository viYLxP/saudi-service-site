# Masar Services: Bilingual Service Company Website (Arabic / English)

A responsive, fully bilingual marketing website for a Saudi home and facility services company, built with **React, TypeScript and Vite**.

> **Portfolio demo.** "Masar Services" is a fictional company. The phone number, WhatsApp number and email are placeholders. See [Configuration](#configuration).

## Features

- **Sections:** Hero, Services, About (stats, values, coverage), How it works, Request a Quote form, FAQs, Contact, Footer
- **Responsive navigation:** sticky header, off-canvas mobile menu (slides in from the inline-end side, closes with Escape, the backdrop or a link), skip link
- **Contact and WhatsApp:** `tel:`, `mailto:` and `wa.me` links with a pre-filled greeting in the current language, plus a floating WhatsApp button
- **Request a Quote:** client-side validation (Saudi mobile numbers including Arabic-Indic digits, optional email, future date, description length), error summary, per-field errors, and a review step
- **Notifications:** accessible toasts (`role="status"`) for copy, hand-off and service selection

### Quote form: prototype behaviour (no backend)

The form **does not send data to a server** and the page says so. After validation the user reviews the request and chooses:

- **Send via WhatsApp:** opens `wa.me/<number>?text=…` with the full request
- **Send via email:** opens the email app with the subject and body filled in
- **Copy request:** copies the text to the clipboard

Nothing is sent until the user presses send in WhatsApp or their email app. To collect submissions directly, connect a form service or your own API in `src/components/QuoteForm.tsx` (`handleSubmit`). Keep any keys on the server, not in the frontend.

## Bilingual implementation

| Requirement | Where |
| --- | --- |
| Dictionaries (`en` defines the shape, `ar` must match it, enforced by TypeScript) | `src/i18n/locales/en.ts`, `src/i18n/locales/ar.ts` |
| Language context and hook (`useI18n()` → `t`, `lang`, `dir`, `toggleLang`, `formatNumber`, `formatDate`, `interpolate`) | `src/i18n/LanguageContext.tsx`, `src/i18n/useI18n.ts` |
| Updates `<html lang dir>`, `document.title` and the meta description | `LanguageContext.tsx` |
| Persists to `localStorage` (`masar-services.lang`), with try/catch for blocked storage | `src/i18n/storage.ts` |
| Initial language: saved choice, then browser language, then Arabic | `storage.ts` and an inline script in `index.html` that sets `lang`/`dir` before first paint |
| Locale-aware numbers and dates (`ar-SA` with the Gregorian calendar, `en-GB`) | `src/i18n/config.ts`, `src/i18n/format.ts` |
| Accessible switcher: a real `<button>`, visible target-language label with a matching `lang` attribute, and a descriptive hidden label | `src/components/LanguageSwitcher.tsx` |
| RTL/LTR styling with CSS logical properties (`margin-inline`, `inset-inline-end`, `text-align: start`, …) and mirrored directional arrows | `src/styles/global.css`, `Icon` `flip` prop |
| Phone numbers and emails stay LTR inside Arabic text (`dir="ltr"`, isolation, and a left-to-right mark in generated messages) | `.ltr-value`, `.ltr-input`, `src/lib/quoteMessage.ts` |
| Arabic font (IBM Plex Sans Arabic) and Latin font (Inter), self-hosted with system fallbacks | `src/main.tsx`, `:lang(ar)` rules |
| Switching language never resets the form. Values stay in state, and errors are stored as **codes** and translated at render time, so they re-translate too. Toasts and FAQ open state also survive a switch. | `QuoteForm.tsx`, `ToastProvider.tsx`, `Faq.tsx` |

To add a string, add it to `en.ts`. TypeScript then reports an error until `ar.ts` has it too. A unit test also checks that both dictionaries have the same keys and the same `{placeholders}`.

## Project structure

```
src/
  config/site.ts          # business details (placeholders), service/city/nav ids
  i18n/                   # translation system
    locales/en.ts, ar.ts
    config.ts, context.ts, LanguageContext.tsx, useI18n.ts, storage.ts, format.ts
  components/             # Header, Hero, Services, About, Process, QuoteForm, Faq, Contact, Footer, …
  lib/                    # validation, WhatsApp/mailto link builders, quote message builder
  styles/global.css
tests/e2e/site.spec.ts    # Playwright end-to-end tests (desktop + mobile)
```

## Getting started

Requirements: **Node.js 20.19+ or 22.12+** and npm.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint with oxlint |
| `npm test` | Unit tests (Vitest): validation, phone normalisation, dictionary parity |
| `npm run test:e2e` | End-to-end tests (Playwright) on desktop and mobile Chromium. Run `npx playwright install chromium` once first. |

## Configuration

Edit `src/config/site.ts`:

- `phoneE164Digits`, `phoneDisplay`, `whatsappDigits`: the real numbers (digits only, with country code, no `+`)
- `email`, `mapUrl`, `social`
- `isDemo: false`: hides the "demo / placeholder" notices

Company name, copy, services and FAQs live in `src/i18n/locales/*.ts`. Edit both languages.

## Publish to GitHub

```bash
git init
git add .
git commit -m "Initial commit: bilingual service company website"
git branch -M main
# Create an empty repository on github.com (no README), then:
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## Deploy for free

The site is fully static (`dist/`), so any static host works.

### Vercel (recommended)
1. Go to vercel.com, choose **Add New → Project**, and import the GitHub repository.
2. Vercel detects Vite. The build command is `npm run build` and the output directory is `dist`.
3. Deploy. Each push to `main` redeploys automatically.

### Netlify
1. Go to app.netlify.com, choose **Add new site → Import an existing project**, and pick the repository.
2. Set the build command to `npm run build` and the publish directory to `dist`.

### Cloudflare Pages
1. In the dashboard, choose **Workers & Pages → Create → Pages → Connect to Git**.
2. Choose the Vite preset (build command `npm run build`, output `dist`).

### GitHub Pages
The workflow `.github/workflows/deploy-pages.yml` lints, tests, builds with `BASE_PATH=/<repo-name>/`, and deploys.
1. Push to `main`.
2. In the repository, open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. The site is published at `https://<your-username>.github.io/<repo-name>/`.

This is a single page with hash links only, so no SPA rewrite rules are needed on any host.

## Security notes

- No API keys or secrets are used or required.
- External links use `rel="noopener noreferrer"`.
- No form data is stored or transmitted by the site itself.

## License

MIT. Replace this with your preferred license.
