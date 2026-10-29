/**
 * Downloads & Documents Module
 * Handles non-breaking downloads for CV, Resume, and research publications with toast notifications.
 */

// === Toast notification system ===
export function showPortfolioToast(msg) {
  const toast = document.getElementById('portfolioToast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3800);
}

// === CV & Resume PDF Handler ===
export function handleDocDownload(e, docType, filePath) {
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
          showPortfolioToast(`${docType} PDF is being prepared. Check back soon or email altafur.rahman.fuad@gmail.com!`);
        }
      })
      .catch(() => {
        showPortfolioToast(`${docType} PDF is being prepared. Check back soon or email altafur.rahman.fuad@gmail.com!`);
      });
  }
}

// === Publication Paper Download Handler ===
export function handlePaperDownload(e, filePath) {
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

// Expose handlers to window for inline onclick attributes
if (typeof window !== 'undefined') {
  window.handleDocDownload = handleDocDownload;
  window.handlePaperDownload = handlePaperDownload;
  window.showPortfolioToast = showPortfolioToast;
}
