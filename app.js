// Keep the page useful when JavaScript is unavailable.
const portrait = document.querySelector('#portrait');
if (portrait) {
  const showPortraitFallback = () => {
    portrait.hidden = true;
    portrait.closest('.portrait-image')?.classList.add('has-fallback');
  };
  portrait.addEventListener('error', showPortraitFallback);
  if (portrait.complete && !portrait.naturalWidth) showPortraitFallback();
}

// Motion is an enhancement: content remains visible without JavaScript.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reducedMotion.matches) {
  const revealTargets = document.querySelectorAll('.section-heading:not(.work-new > .section-heading), .work-row, .approach-list article, .experiment-card, .skill-item, .profile-band-inner, .credentials-disclosure, .contact-new-inner, .archive-entry, .archive-cards > *');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    revealTargets.forEach((element, index) => {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.style.setProperty('--reveal-delay', `${Math.min(index % 3 * 65, 130)}ms`);
        element.classList.add('will-reveal');
        observer.observe(element);
      }
    });
  }
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const visual = document.querySelector('.hero-visual');
    if (visual) {
      visual.addEventListener('pointermove', (event) => {
        const rect = visual.getBoundingClientRect();
        visual.style.setProperty('--pointer-x', `${((event.clientX - rect.left) / rect.width - .5) * 14}px`);
        visual.style.setProperty('--pointer-y', `${((event.clientY - rect.top) / rect.height - .5) * 14}px`);
      });
      visual.addEventListener('pointerleave', () => {
        visual.style.setProperty('--pointer-x', '0px');
        visual.style.setProperty('--pointer-y', '0px');
      });
    }
    document.querySelectorAll('.experiment-card, .credential-grid article').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--light-x', `${event.clientX - rect.left}px`);
        card.style.setProperty('--light-y', `${event.clientY - rect.top}px`);
      });
    });
  }
}
