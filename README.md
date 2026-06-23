# Ahmed Lab Site

Static website for the Ahmed Research Group at the USC Mann School of Pharmacy and Pharmaceutical Sciences. Exported as plain HTML/CSS/JS (originally built with EditMySite/Weebly), so no build step or package manager is required.

## Structure

- `index.html` — Home page
- `members.html` — Lab members
- `updates.html` — News/updates
- `contact.html` — Contact page
- `files/` — Stylesheets and theme assets (`main_style.css`, `site-theme.css`, `theme-overrides.css`, `theme/`)
- `uploads/` — Images, photos, and PDFs referenced by the pages
- `apps/` — Misc embedded assets (e.g. Flash audio player)

## Running locally

This is a static site — open `index.html` directly in a browser, or serve the directory with any static file server, e.g.:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
