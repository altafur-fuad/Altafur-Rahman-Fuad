/**
 * Animations Module
 * Handles typing effect on hero, intersection observer reveals,
 * number counter easing, and 3D card tilt effects.
 */

export function initAnimations() {
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
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

