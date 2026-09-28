# Responsive Internship Board

A beginner-friendly, framework-free internship listing interface built with semantic HTML, responsive CSS and vanilla JavaScript.

## Features

- Responsive layout for mobile, tablet and desktop
- Internship cards rendered dynamically from JSON
- Search by role, company, location, domain, description and tags
- Domain filter populated from the data
- Empty-result state with reset action
- Error state and retry action when the JSON cannot be loaded
- Accessible labels, focus states, keyboard-friendly controls and live result updates
- No front-end framework

## Project structure

```text
internship-board/
├── index.html
├── styles.css
├── script.js
├── data/
│   └── internships.json
└── README.md
```

## Run locally

Because the page loads JSON with `fetch()`, use a local web server instead of opening `index.html` directly.

### Option 1 — VS Code Live Server
Open the folder in VS Code and start Live Server.

### Option 2 — Python
From this folder:

```bash
python -m http.server 5500
```

Then open `http://localhost:5500`.

## GitHub Pages deployment

1. Create a new **public** GitHub repository named `internship-board`.
2. Upload `index.html`, `styles.css`, `script.js`, `README.md`, and the `data` folder.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Save and wait for GitHub Pages to publish.
7. Your proof URL will look like:
   `https://YOUR-USERNAME.github.io/internship-board/`

## Submission checklist

- [ ] Public GitHub repository
- [ ] Deployed preview URL
- [ ] Search works
- [ ] Domain filter works
- [ ] Empty state works
- [ ] Error state/retry works
- [ ] Keyboard navigation and visible focus work
- [ ] Mobile/tablet/desktop layouts checked
- [ ] README updated with screenshots

## Screenshots

Add screenshots of:
1. Desktop view with several internship cards.
2. Search/filter result.
3. Mobile responsive view.

Place them in an `assets/` folder and update this section with Markdown image references before submission.
