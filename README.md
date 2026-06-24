# Ahmed Lab Site

Static website for the Ahmed Research Group at the USC Mann School of Pharmacy and Pharmaceutical Sciences. Exported as plain HTML/CSS/JS (originally built with EditMySite/Weebly), so no build step or package manager is required.

This README has two parts:

1. **[Updating Members and Updates](#updating-members-and-updates-no-coding-required)** — for anyone in the lab who needs to add a new member or post a news update. No coding experience needed, just careful editing.
2. **[Technical structure](#technical-structure)** — for whoever maintains the site's code.

---

## Updating Members and Updates (no coding required)

The "Members" page and the "Updates" page are both powered by two simple text files. You **do not need to touch any HTML** to add, edit, or remove a member or a news post — you only need to edit one of these two files:

| To change... | Edit this file |
|---|---|
| Lab members (current or former) | `files/members-data.js` |
| News / updates posts | `files/updates-data.js` |

Open either file in any plain text editor (e.g. **TextEdit** on Mac in plain-text mode, **Notepad** on Windows, or VS Code). Do **not** open or edit them in Microsoft Word — Word will corrupt the file by adding formatting.

### Important ground rules before you start

- Every block of information is wrapped in `{ ... }` and separated from the next one by a comma `,`. **Don't remove or add curly braces or commas** — that's what keeps the file readable by the website. If you're ever unsure, copy an existing entry, paste it as a new one, and just change the text inside the quotes.
- All text must stay inside the straight double quotes `"like this"`.
- If your text itself needs an apostrophe ( ' ) or curly quote ( ’ ), type `&rsquo;` instead (e.g. `Dr. Ahmed&rsquo;s lab`). If you need an ampersand (&), type `&amp;`. This is just how the file avoids breaking on special characters — copy the pattern you see in existing entries.
- After saving, **always preview your change before publishing** (see [Previewing your changes](#previewing-your-changes) below). A small typo in punctuation (a missing comma or quote) can break the whole page.

### Adding or editing a lab member

Open `files/members-data.js`. You'll see two lists: `"current"` (current lab members) and `"former"` (former lab members). Each member looks like this:

```js
{
  "name": "JANE DOE",
  "role": "PHD STUDENT, USC MANN",
  "photo": "media/jane-doe.jpg",
  "bio": "I joined the lab in 2024 to study small-molecule drug design. Before USC, I completed my degree at..."
}
```

- **`name`** — shown in capital letters on the page automatically, type it however you like.
- **`role`** — their title/position, shown under their name in gold text.
- **`photo`** — the filename of their photo (see [Adding a photo](#adding-a-photo) below). If you don't have a photo yet, leave it as an empty string: `"photo": ""` and a placeholder silhouette will show instead.
- **`bio`** — their biography paragraph. Can be as long as you like.

**To add a new member:** copy an entire `{ ... }` block (including the curly braces), paste it right after an existing one inside the same list, separate the two blocks with a comma, and then edit the text inside the quotes.

**To mark someone as the Principal Investigator** (currently Dr. Ahmed), add a line `"pi": true,` right after their `"photo"` line — this gives their card a subtle gold highlight. Only one person should normally have this.

**To remove a member:** delete their entire `{ ... }` block, including the comma that follows it (or precedes it, if it's the last entry in the list).

**To move someone from "current" to "former"** (e.g. they graduated): cut their whole `{ ... }` block out of the `"current"` list and paste it into the `"former"` list.

#### Adding a photo

1. Add the photo file to the `media/` folder (e.g. `media/jane-doe.jpg`). Use a reasonably sized JPG or PNG (a few hundred KB to ~2MB is plenty — don't upload a 20MB raw camera file).
2. In `members-data.js`, set `"photo": "media/jane-doe.jpg"` (matching the exact filename, including capitalization).

### Adding or editing an Updates post

Open `files/updates-data.js`. You'll see a single list called `"posts"`. **The most recent post should be listed first** — newer entries go at the top. Each post looks like this:

```js
{
  "title": "Poster presentation award at Moving Targets conference",
  "date": "08/22/2024",
  "excerpt": "Nader Mostowfi was announced as one of the winners of the Young Investigators Award...",
  "body": "At the Moving Targets Conference on Thursday Aug. 22 on USC Health Science Campus, Nader Mostowfi is announced as one of the winners...",
  "images": [
    "media/photo-one.jpeg",
    "media/photo-two.jpeg"
  ]
}
```

- **`title`** — the headline of the post.
- **`date`** — shown under the title, in `MM/DD/YYYY` format.
- **`excerpt`** — a short 1–2 sentence summary. This is what shows in the small preview card on the home page, so keep it brief and punchy.
- **`body`** — the full text shown on the Updates page. Can be as long as you like.
- **`images`** — a list of photo filenames for this post (see [Adding a photo](#adding-a-photo) above — same idea). If the post has no photos, leave it as `"images": []`.

**Optional: linking to a PDF or external page.** If the post should include a button linking somewhere (e.g. a published paper), add a `link` entry after `images`:

```js
"link": {
  "label": "View Publication (PDF)",
  "url": "media/my-paper.pdf"
}
```

**To add a new post:** copy an entire `{ ... }` block, paste it at the **top** of the `"posts"` list (so it shows first as the newest), separate it from the next block with a comma, and edit the text.

**To remove a post:** delete its entire `{ ... }` block, including its trailing comma.

### Previewing your changes

Before publishing, double-check your edit didn't break anything:

1. Open the project folder.
2. Double-click `index.html` (or `members.html` / `updates.html`) to open it in your browser.
3. Check that the page looks right and your new/edited entry shows up correctly.

If the page looks blank or broken where your content should be, you likely have a missing comma, quote, or curly brace somewhere in the file you edited — compare carefully against the surrounding entries and try again.

### Publishing your changes

This site is hosted on GitHub Pages and automatically redeploys whenever changes are pushed to the `main` branch. If you're comfortable with GitHub Desktop or the `git` command line, commit your changed file and push to `main`. If not, ask whoever maintains the repository to push your edited file for you — just send them the updated `members-data.js` or `updates-data.js`.

---

## Technical structure

- `index.html` — Home page
- `members.html` — Lab members
- `updates.html` — News/updates
- `contact.html` — Contact page
- `media/` — Images, photos, and PDFs referenced by the pages
- `files/` — Stylesheets, scripts, and theme assets:
  - `main_style.css` — original Weebly/EditMySite theme styles (avoid editing directly)
  - `site-theme.css` — custom design system (typography, layout, components) layered on top of the theme
  - `theme-overrides.css` — targeted overrides of legacy theme rules
  - `members-data.js` / `updates-data.js` — the editable content described above, loaded as plain JS globals (`SITE_MEMBERS`, `SITE_UPDATES`) rather than fetched JSON, so the site also works when opened directly via `file://` without a web server
  - `members.js` / `updates.js` — render the data above into the DOM on `members.html`, `updates.html`, and the homepage's "Latest Updates" preview
  - `theme/` — original theme assets (mobile menu JS, plugin JS, images)
- `apps/` — Misc embedded assets (e.g. Flash audio player)
- `.github/workflows/static.yml` — GitHub Actions workflow that deploys the site to GitHub Pages on every push to `main`

### Running locally

This is a static site — open `index.html` directly in a browser, or serve the directory with any static file server, e.g.:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

### Notes for future edits

- Keep all internal asset paths (in CSS, HTML, and JS) **relative**, not absolute (`media/...`, not `/media/...`) — absolute paths break when the site is opened via `file://` without a server. Note that stylesheets inside `files/` need `../media/...` since `url()` paths in CSS resolve relative to the stylesheet's own location, not the site root.
- `files/templateArtifacts.js` is referenced in every page's `<head>` but intentionally does not exist locally — it's a Weebly editor-only script with no effect on the published site, and 404s harmlessly.
