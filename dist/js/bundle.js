/* ============================================================
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
