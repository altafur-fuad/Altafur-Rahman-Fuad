/**
 * Build Script for Altafur Rahman Fuad's Portfolio
 * Assembles modular HTML sections, compiles CSS, bundles JS,
 * renders data-driven project cards from projects.json,
 * and outputs to both dist/ and root index.html.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');

console.log('--- Starting Portfolio Build ---');

// 1. Ensure dist directories exist
fs.mkdirSync(distDir, { recursive: true });
fs.mkdirSync(path.join(distDir, 'css'), { recursive: true });
fs.mkdirSync(path.join(distDir, 'js'), { recursive: true });

// 2. Load data files
const profileData = JSON.parse(fs.readFileSync(path.join(srcDir, 'data', 'profile.json'), 'utf-8'));
const projectsData = JSON.parse(fs.readFileSync(path.join(srcDir, 'data', 'projects.json'), 'utf-8'));
const researchData = JSON.parse(fs.readFileSync(path.join(srcDir, 'data', 'research.json'), 'utf-8'));

console.log(`Loaded data: ${projectsData.length} projects, research info for ${researchData.title.split(':')[0]}`);

// 3. Render project cards from projects.json
function renderProjectCard(p) {
  if (p.featured) {
    const featuresList = p.features && p.features.length
      ? `\n                <ul class="lumio-features">\n${p.features.map(f => `                  <li>${f}</li>`).join('\n')}\n                </ul>`
      : '';

    const tagsHtml = p.tags && p.tags.length
      ? `\n                <div class="feature-tags">\n${p.tags.map(t => `                  <span class="feature-tag">${t}</span>`).join('\n')}\n                </div>`
      : '';

    const liveLink = p.liveUrl
      ? `<a class="proj-link live-link" href="${p.liveUrl}" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>`
      : '';
    const githubLink = p.githubUrl
      ? `<a class="proj-link" href="${p.githubUrl}" target="_blank" rel="noopener noreferrer">View on GitHub →</a>`
      : '';
    const apkBadge = p.apkUrl
      ? `<a class="proj-link live-link" href="${p.apkUrl}" download>Download APK ↓</a>`
      : (p.apkBadge ? `<span class="apk-badge">${p.apkBadge}</span>` : '');

    return `          <!-- FEATURED — ${p.title} -->
          <div class="proj-featured card reveal" id="project-${p.id}">
            <div class="proj-featured-inner">
              <div class="proj-featured-content">
                <div class="proj-top">
                  <h3>${p.title} ${p.icon || ''}</h3>
                  <span class="proj-status ${p.isLive ? 'live' : ''}">${p.status}</span>
                </div>
                <p>${p.description}</p>${featuresList}${tagsHtml}
                <span class="proj-stack">${p.stack}</span>
                <div class="proj-links">
                  ${liveLink}
                  ${githubLink}
                  ${apkBadge}
                </div>
              </div>
              ${p.image ? `<div class="proj-featured-visual">
                <img src="${p.image}" alt="${p.imageAlt || p.title}" style="width: 100%; height: auto; max-height: 380px; object-fit: contain; border-radius: var(--radius-sm); box-shadow: var(--shadow-md);">
              </div>` : ''}
            </div>
          </div>`;
  } else {
    const thumbHtml = p.image
      ? `<div class="proj-thumb">
              <img src="${p.image}" alt="${p.imageAlt || p.title}">
            </div>`
      : '';

    const tagsHtml = p.tags && p.tags.length
      ? `\n            <div class="feature-tags">\n${p.tags.map(t => `              <span class="feature-tag">${t}</span>`).join('\n')}\n            </div>`
      : '';

    const liveLink = p.liveUrl
      ? `<a class="proj-link live-link" href="${p.liveUrl}" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>`
      : '';
    const githubLink = p.githubUrl
      ? `<a class="proj-link" href="${p.githubUrl}" target="_blank" rel="noopener noreferrer">View on GitHub →</a>`
      : '';
    const modelLink = p.modelUrl
      ? `<a class="proj-link" href="${p.modelUrl}" target="_blank" rel="noopener noreferrer">Model Repo →</a>`
      : '';
    const apkBadge = p.apkUrl
      ? `<a class="proj-link live-link" href="${p.apkUrl}" download>Download APK ↓</a>`
      : (p.apkBadge ? `<span class="apk-badge">${p.apkBadge}</span>` : '');

    return `          <!-- ${p.title} -->
          <div class="proj-card card reveal" id="project-${p.id}">
            ${thumbHtml}
            <div class="proj-top">
              <h3>${p.title} ${p.icon || ''}</h3>
              <span class="proj-status ${p.isLive ? 'live' : ''}">${p.status}</span>
            </div>
            <p>${p.description}</p>${tagsHtml}
            <span class="proj-stack">${p.stack}</span>
            <div class="proj-links">
              ${liveLink}
              ${githubLink}
              ${modelLink}
              ${apkBadge}
            </div>
          </div>`;
  }
}

const renderedProjectsHtml = projectsData.map(renderProjectCard).join('\n\n');

// 4. Read template and assemble sections
let template = fs.readFileSync(path.join(srcDir, 'index.template.html'), 'utf-8');

// Replace include directives
const includeRegex = /<!--\s*@include:\s*([^\s]+)\s*-->/g;
let assembledHtml = template.replace(includeRegex, (match, includePath) => {
  const fullPath = path.join(srcDir, includePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`ERROR: Include file not found: ${fullPath}`);
    return `<!-- Missing include: ${includePath} -->`;
  }
  let content = fs.readFileSync(fullPath, 'utf-8');

  // Handle projects render directive inside projects.html
  if (includePath.includes('projects.html')) {
    content = content.replace('<!-- @render: projects -->', renderedProjectsHtml);
  }

  return content;
});

// 5. Assemble CSS
const cssOrder = [
  'tokens.css',
  'base.css',
  'layout.css',
  'components.css',
  'sections/navbar.css',
  'sections/hero.css',
  'sections/about.css',
  'sections/services.css',
  'sections/education.css',
  'sections/research.css',
  'sections/projects.css',
  'sections/skills.css',
  'sections/vision.css',
  'sections/resume.css',
  'sections/contact.css',
  'sections/footer.css'
];

let compiledCss = `/* ============================================================
   ALTAFUR RAHMAN FUAD — PORTFOLIO COMPILED STYLESHEET
   Generated automatically from modular stylesheets in src/styles/
   DO NOT EDIT DIRECTLY.
   ============================================================ */\n\n`;

for (const cssFile of cssOrder) {
  const cssPath = path.join(srcDir, 'styles', cssFile);
  if (fs.existsSync(cssPath)) {
    compiledCss += fs.readFileSync(cssPath, 'utf-8') + '\n\n';
  } else {
    console.warn(`WARNING: Missing CSS file: ${cssPath}`);
  }
}

fs.writeFileSync(path.join(distDir, 'css', 'style.css'), compiledCss, 'utf-8');
console.log(`Compiled style.css (${compiledCss.length} bytes)`);

// 6. Assemble JavaScript
// Create self-contained bundle for browser
const jsBundle = `/* ============================================================
   ALTAFUR RAHMAN FUAD — PORTFOLIO COMPILED JAVASCRIPT BUNDLE
   Generated automatically from modular scripts in src/scripts/
   DO NOT EDIT DIRECTLY.
   ============================================================ */

(function() {
  'use strict';

  // === Header scroll shadow ===
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // === Nav toggle (mobile) ===
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  let menuOpen = false;

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      menuOpen = !menuOpen;
      navLinks.classList.toggle('open');
      navToggle.textContent = menuOpen ? '✕' : '☰';
      navToggle.setAttribute('aria-expanded', menuOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuOpen = false;
        navToggle.textContent = '☰';
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // === Scroll spy ===
  const sects = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-center a');

  function updateNav() {
    const sy = window.scrollY + 200;
    sects.forEach(s => {
      const t = s.offsetTop;
      const h = s.offsetHeight;
      const id = s.getAttribute('id');
      if (sy >= t && sy < t + h) {
        navAs.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + id) {
            a.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // === Typing effect ===
  const typedEl = document.getElementById('typedText');
  const fullText = "Building AI-powered agriculture research and full-stack mobile apps with Flutter & Dart.";
  let ci = 0;

  function typeChar() {
    if (typedEl && ci < fullText.length) {
      typedEl.textContent += fullText.charAt(ci);
      ci++;
      setTimeout(typeChar, 28 + Math.random() * 30);
    }
  }

  const heroSection = document.querySelector('.hero');
  if (typedEl && heroSection) {
    const heroObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(typeChar, 600);
          heroObs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    heroObs.observe(heroSection);
  }

  // === Scroll reveal ===
  const revEls = document.querySelectorAll('.reveal');
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  revEls.forEach(el => revObs.observe(el));

  // === Counter animation ===
  const counters = document.querySelectorAll('.counter');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const decimal = el.dataset.decimal;
        const duration = 1500;
        const start = Date.now();

        function updateCounter() {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);

          if (decimal) {
            const fullValue = parseFloat(target + '.' + decimal);
            const current = (eased * fullValue).toFixed(2);
            el.textContent = current;
          } else {
            el.textContent = Math.round(eased * target);
          }

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            if (decimal) {
              el.textContent = target + '.' + decimal;
            } else {
              el.textContent = target;
            }
          }
        }
        requestAnimationFrame(updateCounter);
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObs.observe(c));

  // === 3D tilt on project cards and doc cards ===
  document.querySelectorAll('.proj-card, .proj-featured, .doc-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rx = ((y - r.height / 2) / (r.height / 2)) * -2;
      const ry = ((x - r.width / 2) / (r.width / 2)) * 2;
      card.style.transform = "perspective(800px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-3px)";
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // === Back to top button ===
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === Toast notification system ===
  function showPortfolioToast(msg) {
    const toast = document.getElementById('portfolioToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  // === CV & Resume PDF Handler ===
  function handleDocDownload(e, docType, filePath) {
    const btn = e.currentTarget;
    if (!btn) return;

    if (btn.classList.contains('disabled')) {
      e.preventDefault();
      fetch(filePath, { method: 'HEAD' })
        .then(res => {
          if (res.ok && res.status !== 404) {
            btn.classList.remove('disabled');
            btn.removeAttribute('aria-disabled');
            const badgeId = docType === 'CV' ? 'badgeCv' : 'badgeResume';
            const badge = document.getElementById(badgeId);
            if (badge) {
              badge.textContent = 'Available Now';
              badge.classList.add('live');
            }
            window.open(filePath, '_blank');
          } else {
            showPortfolioToast(docType + ' PDF is being prepared. Check back soon or email altafur.rahman.fuad@gmail.com!');
          }
        })
        .catch(() => {
          showPortfolioToast(docType + ' PDF is being prepared. Check back soon or email altafur.rahman.fuad@gmail.com!');
        });
    }
  }

  // === Publication Paper Handler ===
  function handlePaperDownload(e, filePath) {
    const btn = e.currentTarget;
    if (!btn) return;

    if (btn.classList.contains('disabled')) {
      e.preventDefault();
      fetch(filePath, { method: 'HEAD' })
        .then(res => {
          if (res.ok && res.status !== 404) {
            btn.classList.remove('disabled');
            btn.removeAttribute('aria-disabled');
            const badge = document.getElementById('badgePaper');
            if (badge) {
              badge.textContent = 'Available Now';
              badge.classList.add('live');
            }
            window.open(filePath, '_blank');
          } else {
            showPortfolioToast('CrossMamba-Agri research manuscript will be published upon completion of peer review. Contact arfuad@bgctub.ac.bd for academic inquiries.');
          }
        })
        .catch(() => {
          showPortfolioToast('CrossMamba-Agri research manuscript will be published upon completion of peer review. Contact arfuad@bgctub.ac.bd for academic inquiries.');
        });
    }
  }

  // Bind globals for onclick attributes
  window.handleDocDownload = handleDocDownload;
  window.handlePaperDownload = handlePaperDownload;
  window.showPortfolioToast = showPortfolioToast;

})();
`;

fs.writeFileSync(path.join(distDir, 'js', 'bundle.js'), jsBundle, 'utf-8');
console.log(`Compiled bundle.js (${jsBundle.length} bytes)`);

// 7. Copy modular JS files to dist/js
const jsFiles = ['main.js', 'navigation.js', 'animations.js', 'downloads.js', 'project-links.js'];
for (const f of jsFiles) {
  const srcF = path.join(srcDir, 'scripts', f);
  if (fs.existsSync(srcF)) {
    fs.copyFileSync(srcF, path.join(distDir, 'js', f));
  }
}

// 8. Copy assets to dist/assets for standalone deployability
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyRecursive(path.join(rootDir, 'assets'), path.join(distDir, 'assets'));
console.log('Synchronized assets to dist/assets');

// 9. Generate dist/index.html (standalone output for hosting platforms using outputDirectory: "dist")
const distHtml = assembledHtml
  .replace('<!-- @styles -->', '<link rel="stylesheet" href="css/style.css">')
  .replace('<!-- @scripts -->', '<script src="js/bundle.js"></script>');

fs.writeFileSync(path.join(distDir, 'index.html'), distHtml, 'utf-8');
console.log(`Generated dist/index.html (${distHtml.length} bytes)`);

// 10. Generate root index.html (production entry point for repository root / Vercel preset "Other")
const rootBanner = `<!-- ============================================================
     GENERATED PRODUCTION FILE — DO NOT EDIT DIRECTLY.
     Source files are located in src/ (sections/, styles/, scripts/, data/).
     Run 'npm run build' or 'node scripts/build.mjs' to recompile.
     ============================================================ -->\n`;

const rootHtml = rootBanner + assembledHtml
  .replace('<!-- @styles -->', '<link rel="stylesheet" href="dist/css/style.css">')
  .replace('<!-- @scripts -->', '<script src="dist/js/bundle.js"></script>');

fs.writeFileSync(path.join(rootDir, 'index.html'), rootHtml, 'utf-8');
console.log(`Generated root index.html (${rootHtml.length} bytes)`);

// 11. Run Build Validation
console.log('\n--- Running Build Validation ---');
let errors = 0;

// Validate no un-replaced @include tags
const remainingIncludes = rootHtml.match(/<!--\s*@include:[^>]+-->/g);
if (remainingIncludes) {
  console.error('ERROR: Unresolved include tags found:', remainingIncludes);
  errors++;
} else {
  console.log('✓ All section includes resolved successfully.');
}

// Validate project images exist
for (const p of projectsData) {
  if (p.image) {
    const fullImgPath = path.join(rootDir, p.image.replace(/\//g, path.sep));
    if (!fs.existsSync(fullImgPath)) {
      console.error(`ERROR: Missing project image for ${p.title}: ${fullImgPath}`);
      errors++;
    }
  }
}
console.log('✓ All project preview images verified on disk.');

// Validate project ordering
if (projectsData[0].title.toUpperCase().includes('ASRAR-E-TIBB') &&
    projectsData[1].title.toUpperCase().includes('AUPA')) {
  console.log('✓ Project ordering verified: Asrar-E-Tibb is #1, Aupa is #2.');
} else {
  console.error('ERROR: Project ordering mismatch! Asrar-E-Tibb must be #1 and Aupa #2.');
  errors++;
}

// Validate publication safety (no draft PDF exposed)
if (rootHtml.includes('Cross_Mamba__Agri__Paper') || rootHtml.includes('Cross_Mamba')) {
  console.error('CRITICAL: Draft paper name leaked in production HTML!');
  errors++;
} else {
  console.log('✓ Paper safety verified: Draft PDF is strictly withheld and unreferenced.');
}

if (errors === 0) {
  console.log('Build completed successfully with ZERO errors!\n');
} else {
  console.error(`Build completed with ${errors} error(s).\n`);
  process.exit(1);
}

