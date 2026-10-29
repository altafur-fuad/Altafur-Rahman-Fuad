# Altafur Rahman Fuad — Personal Portfolio & Academic Research Showcase

Welcome to the official repository for **Altafur Rahman Fuad's Personal Portfolio**.

- **Live URL**: [https://altafur-rahman-fuad.vercel.app/](https://altafur-rahman-fuad.vercel.app/)
- **GitHub**: [https://github.com/altafur-fuad](https://github.com/altafur-fuad)
- **Design Theme**: Warm cream (`#faf7f2`), deep forest green (`#1a4d2e`), and gold (`#d4a039`) accents.

---

## 1. Modular Source Architecture

The website is organized into clean, independent modular files under `src/`. You can edit any individual section or stylesheet without touching thousands of lines of unrelated code. The production entry point (`index.html`) is compiled automatically by a lightweight build script.

```text
Altafur-Rahman-Fuad/
│
├── index.html                  # Generated production entry point (do not edit directly)
├── package.json                # Build and local preview scripts
├── vercel.json                 # Vercel deployment configuration
├── README.md                   # Repository documentation
│
├── src/                        # EDITABLE SOURCE CODE
│   ├── index.template.html     # HTML layout shell and include points
│   │
│   ├── sections/               # Section-by-section HTML templates
│   │   ├── navbar.html         # Header & navigation links
│   │   ├── hero.html           # Hero intro, stats bar & marquee
│   │   ├── about.html          # Bento grid personal biography
│   │   ├── services.html       # Engineering capabilities
│   │   ├── education.html      # BGC Trust University milestones
│   │   ├── research.html       # CrossMamba-Agri research & publication card
│   │   ├── projects.html       # Projects showcase wrapper
│   │   ├── skills.html         # Tech stacks & toolchain
│   │   ├── vision.html         # Philosophy & goals
│   │   ├── resume.html         # CV & Resume download cards
│   │   ├── contact.html        # Contact links & CTA banner
│   │   └── footer.html         # Footer, back-to-top & toast
│   │
│   ├── styles/                 # Modular CSS stylesheets
│   │   ├── tokens.css          # Design tokens & CSS variables
│   │   ├── base.css            # Base resets, selection, scrollbar
│   │   ├── layout.css          # Container wraps, cards, section headers
│   │   ├── components.css      # Buttons, badges, animations, toasts
│   │   ├── main.css            # Master stylesheet with CSS imports
│   │   └── sections/           # Section-specific styles
│   │       ├── navbar.css
│   │       ├── hero.css
│   │       ├── about.css
│   │       ├── services.css
│   │       ├── education.css
│   │       ├── research.css
│   │       ├── projects.css
│   │       ├── skills.css
│   │       ├── vision.css
│   │       ├── resume.css
│   │       ├── contact.css
│   │       └── footer.css
│   │
│   ├── scripts/                # Modular JavaScript (by responsibility)
│   │   ├── main.js             # App orchestration on DOM ready
│   │   ├── navigation.js       # Mobile drawer, scroll-spy, back-to-top
│   │   ├── animations.js       # Typing text, scroll reveals, counter easing, 3D tilt
│   │   ├── downloads.js        # CV, Resume & paper download handlers + toasts
│   │   └── project-links.js    # External link security & interaction helpers
│   │
│   └── data/                   # Structured content (edit data without touching HTML)
│       ├── profile.json        # Personal info, contact handles, bio stats
│       ├── projects.json       # Project list, display order, links, tech tags
│       └── research.json       # CrossMamba-Agri metrics, architecture & paper state
│
├── scripts/
│   └── build.mjs               # Lightweight Node.js build script (zero dependencies)
│
├── assets/                     # Authentic media & documents
│   ├── fuad-photo.jpeg         # Hero portrait
│   ├── crossmamba-agri-thesis-proposal.pdf # Undergraduate thesis proposal
│   ├── docs/                   # CV & Resume documents (README.md)
│   ├── papers/                 # Future publication PDF directory (README.md)
│   └── projects/               # Authentic project UI screenshots
│
└── dist/                       # Standalone deployable production bundle
    ├── index.html
    ├── css/style.css
    ├── js/bundle.js
    └── assets/
```

---

## 2. Quick Edit Guide

### To edit HTML sections
Open the corresponding file in `src/sections/`:
- **Bio & Tagline**: `src/sections/hero.html` and `src/sections/about.html`
- **Education Details**: `src/sections/education.html`
- **Research Presentation**: `src/sections/research.html`
- **CV / Resume Card Text**: `src/sections/resume.html`
- **Contact & Email**: `src/sections/contact.html`

### To edit styling
Open the corresponding CSS file in `src/styles/`:
- **Colors, Fonts, Spacing**: `src/styles/tokens.css`
- **Project Card Styling**: `src/styles/sections/projects.css`
- **Research Card & Metric Badges**: `src/styles/sections/research.css`
- **Navbar & Navigation Drawer**: `src/styles/sections/navbar.css`
- **Global Reset & Scrollbars**: `src/styles/base.css`

### To update projects (Title, Description, Order, Links)
Edit `src/data/projects.json`.
- The display order in this JSON array determines the order rendered on the website.
- **Asrar-E-Tibb** is #1, followed by **Aupa** #2, **Payment Chaser** #3, **Lumio** #4, **Medilens** #5, **Taqwa Tracker** #6, **CrossMamba-Agri Tracker** #7, **ApplyX** #8, and **DSA Practice** #9.
- Each item contains:
  ```json
  {
    "id": "asrar-e-tibb",
    "title": "ASRAR-E-TIBB",
    "icon": "💊",
    "featured": true,
    "status": "Live",
    "isLive": true,
    "description": "Comprehensive healthcare ecosystem...",
    "tags": ["Medicine Catalog", "Farmacia Checkout", "TibbNews Feed", "Rust Axum"],
    "stack": "Flutter · Next.js 14 · Rust Axum · Supabase Realtime",
    "image": "assets/projects/asrar-farmacia.png",
    "liveUrl": "https://asrar-e-tibb.vercel.app/",
    "githubUrl": "https://github.com/altafur-fuad/Asrar-E-Tibb",
    "apkUrl": null,
    "apkBadge": "APK Coming Soon"
  }
  ```
- To add a real Android APK download, set `"apkUrl": "assets/downloads/app.apk"`. If null, keep `"apkBadge": "APK Coming Soon"`.

### To update research information
Edit `src/data/research.json`:
- Contains the official manuscript title: **CrossMamba-Agri: A Vision Mamba-Based Framework for Joint Crop Disease and Pest Classification**.
- CCMT dataset parameters (22 categories across Cashew, Cassava, Maize, and Tomato: 17 plant-condition/disease classes and 5 pest classes).
- Architecture specs: 38.61M parameters (38,608,399 parameters across 8 SSM layers).
- Honest Parent Split results: 89.20% accuracy (87.39% plant condition, 97.58% pest, ROC-AUC 0.993 / 0.998).
- Data leakage audit: 7.41% duplicate leakage detected in standard Karthik benchmark via pHash.

---

## 3. Adding Future PDF Documents

### A. Academic CV & Industry Resume
1. Save your CV PDF to: `assets/docs/cv.pdf`
2. Save your Resume PDF to: `assets/docs/resume.pdf`
3. Run `npm run build` and commit the files.
The download buttons on the live site will automatically detect the files and activate. Until then, an honest "Coming Soon" badge is displayed.

### B. CrossMamba-Agri Published Paper PDF
1. Save your approved paper PDF to: `assets/papers/crossmamba-agri-paper.pdf`
2. Open `src/data/research.json` and set `"isPublished": true`, update `"statusBadge"`, and add official `"doi"` and `"venue"` when assigned.
3. Run `npm run build` and commit the changes.
*(Note: The unpublished draft PDF is withheld and not publicly linked).*

---

## 4. Local Development & Build Workflow

This project uses modern Node.js built-in modules (`node:fs`, `node:path`) with zero external npm dependencies.

### Build the website
Assemble the modular source files into production-ready output:
```bash
npm run build
```
*(Or directly: `node scripts/build.mjs`)*

The build script will:
1. Validate that all section files exist.
2. Render project cards from `src/data/projects.json`.
3. Compile all CSS into `dist/css/style.css`.
4. Bundle JavaScript into `dist/js/bundle.js`.
5. Sync assets to `dist/assets/`.
6. Generate both `dist/index.html` and the root `index.html`.
7. Verify project ordering and ensure no unapproved draft PDFs are referenced.

### Preview locally
Start a local HTTP preview server:
```bash
npm run preview
```
Then open: [http://localhost:3000](http://localhost:3000)

Alternatively, using Python:
```bash
python -m http.server 8000
```
Then open: [http://localhost:8000](http://localhost:8000)

---

## 5. Deployment (Vercel & GitHub Pages)

- **Vercel**: Configuration is pre-wired in `vercel.json`:
  ```json
  {
    "buildCommand": "npm run build",
    "outputDirectory": ".",
    "cleanUrls": true
  }
  ```
  Whether Vercel uses the build command or serves the committed root `index.html` (preset **Other**), deployment works seamlessly out of the box with zero manual configuration needed.
- **GitHub Pages**: Root `index.html` is kept compiled and ready, allowing direct deployment from the `main` branch root folder.

---

## 6. Research Verification Summary

The research content is audited against the official manuscript draft:
- **Title**: *CrossMamba-Agri: A Vision Mamba-Based Framework for Joint Crop Disease and Pest Classification*
- **Author**: Altafur Rahman Fuad (Dept. of Computer Science & Engineering, BGC Trust University Bangladesh)
- **Publication Record**: 0 Published Papers Currently · 1 Ongoing Research Project
- **Dataset**: CCMT (Cashew, Cassava, Maize, Tomato — 22 classes total: 17 disease/healthy + 5 pest)
- **Evaluation**: 89.20% Clean Parent Split accuracy (87.39% disease, 97.58% pest), demonstrating robustness against the 7.41% data leakage flaw identified in standard benchmarks.
