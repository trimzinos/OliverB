// FluxDrop minimal enhancements
document.addEventListener('DOMContentLoaded', () => {
  const yearTarget = document.getElementById('year');
  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }

  // Scroll cue: add subtle border when hero leaves viewport
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  if (header && hero && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        header.classList.toggle('elevated', !entry.isIntersecting);
      });
    }, { threshold: 0.02 });
    io.observe(hero);
  }
});







