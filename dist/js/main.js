/**
 * Main Application Orchestrator
 * Coordinates modules on DOM ready.
 */

import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initProjectLinks } from './project-links.js';
import './downloads.js';

function init() {
  initNavigation();
  initAnimations();
  initProjectLinks();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
