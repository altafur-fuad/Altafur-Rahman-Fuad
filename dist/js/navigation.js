/**
 * Navigation Module
 * Handles mobile hamburger toggle, header scroll shadow, scroll-spy navigation active states,
 * and smooth back-to-top scrolling.
 */

export function initNavigation() {
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
}

