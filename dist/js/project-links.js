/**
 * Project Links Module
 * Handles safe external link behavior and optional link telemetry/analytics.
 */

export function initProjectLinks() {
  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  externalLinks.forEach(link => {
    if (!link.getAttribute('rel')) {
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

