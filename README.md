# Altafur Rahman Fuad — Portfolio Website

Static single-page site (plain HTML/CSS/JS — no build step needed). Theme: dark green
"field ledger," consistent with the CrossMamba-Agri tracker.

## Files

```
portfolio/
├── index.html                # everything — layout, styles, and script are in this one file
├── assets/
│   ├── fuad-photo.jpeg                       # hero portrait
│   ├── crossmamba-agri-thesis-proposal.pdf   # linked from the Research section
│   ├── docs/
│   │   ├── README.md                         # guide for adding CV and Resume PDFs
│   │   ├── cv.pdf                            # future CV document (academic/research)
│   │   └── resume.pdf                        # future Resume document (industry/software)
│   └── projects/                             # authentic project screenshot assets
│       ├── payment-chaser-preview.png        # live Payment Chaser UI
│       ├── aupa-preview.png                  # live Aupa delivery UI
│       ├── lumio-preview.png                 # Lumio desktop/mobile UI
│       ├── asrar-farmacia.png                # Asrar-E-Tibb medicine store UI
│       ├── taqwa-tracker-preview.png         # live Taqwa Tracker UI
│       └── crossmamba-tracker-preview.png    # live CrossMamba-Agri tracker UI
└── README.md
```

## Adding CV and Resume Documents

The portfolio includes pre-configured buttons and cards for your CV and Resume.
1. Save your academic CV PDF to: `assets/docs/cv.pdf`
2. Save your industry Resume PDF to: `assets/docs/resume.pdf`
3. Commit and push the changes.

When the PDF files exist at these exact paths, the download buttons automatically become active. Until then, an honest "Coming Soon" status badge is shown so no broken 404 links are served.

## Editing content

Everything lives in `index.html`. To change text, search for the section by its
`id` (`hero`, `about`, `education`, `research`, `projects`, `skills`, `resume`, `contact`) and
edit the text directly — no build tools, no npm install, just save and refresh.

Common edits:
- **Tagline / bio** — inside `<section class="hero">` and `<section id="about">`
- **Projects** — each is a `<div class="proj-card">` block under `<section id="projects">`
- **Research** — `<section id="research">` (reflects 0 published papers and ongoing CrossMamba-Agri thesis)
- **CV / Resume** — `<section id="resume">` (points to `assets/docs/cv.pdf` and `assets/docs/resume.pdf`)
- **Contact info / social links** — `<section id="contact">` (email: `altafur.rahman.fuad@gmail.com`)
- **Colors** — all defined once at the top of the `<style>` block under `:root { ... }`

## Running locally

No install needed — just open `index.html` in a browser. For live-reload while editing,
you can optionally run a simple local server:

```bash
cd portfolio
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy (GitHub + Vercel)

1. Push this folder to a new GitHub repo:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/altafur-fuad/portfolio.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com), import the repo.
3. Framework preset: **Other** (it's static HTML — no build command, no output directory needed).
4. Deploy. Vercel will give you a live URL; add a custom domain later if you want.

## What's using placeholder/default content

- **Tagline** — used your draft as-is: *"Flutter developer & CS undergrad — building
  AI-powered agriculture research and full-stack mobile apps."* Change it in the hero
  section if you want something different.
- **About bio** — I wrote this from the info you gave me since you hadn't drafted one.
  Worth a read-through to make sure it sounds like you.
- **Location string** ("Chattogram, Bangladesh") — used your general location; update
  if you'd rather show the university's district (Chandanaish) or something else.

Everything else (education, thesis, projects, skills, contact, socials) is exactly
what you provided.
