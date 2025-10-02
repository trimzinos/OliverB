// Olive site enhancements: theme toggling, live year, and graceful HTMX behaviour
(function () {
  const root = document.documentElement;
  const themeColorTag = document.querySelector('meta[name="theme-color"]');
  const getStoredTheme = () => {
    try {
      return localStorage.getItem('olive-theme');
    } catch (_) {
      return null;
    }
  };

  const persistTheme = (theme) => {
    try {
      localStorage.setItem('olive-theme', theme);
    } catch (_) {
      /* storage might be unavailable; ignore */
    }
  };

  const applyTheme = (theme) => {
    root.classList.toggle('dark', theme === 'dark');
    root.dataset.theme = theme;
    if (themeColorTag) {
      themeColorTag.setAttribute('content', theme === 'dark' ? '#0f1a12' : '#f7fbf5');
    }
    persistTheme(theme);
    updateThemeToggle(theme);
  };

  let toggleButton;
  let iconTarget;
  let labelTarget;

  const updateThemeToggle = (theme) => {
    if (!toggleButton) return;
    if (iconTarget) {
      iconTarget.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
    if (labelTarget) {
      labelTarget.textContent = theme === 'dark' ? 'Dark mode' : 'Light mode';
    }
    toggleButton.setAttribute('aria-label', `Activate ${theme === 'dark' ? 'light' : 'dark'} mode`);
  };

  document.addEventListener('DOMContentLoaded', () => {
    const yearTarget = document.getElementById('year');
    if (yearTarget) {
      yearTarget.textContent = String(new Date().getFullYear());
    }

    toggleButton = document.querySelector('[data-theme-toggle]');
    iconTarget = toggleButton?.querySelector('[data-theme-icon]') ?? null;
    labelTarget = toggleButton?.querySelector('[data-theme-label]') ?? null;

    const storedTheme = getStoredTheme();
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);

    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        const nextTheme = root.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    }

    document.body.addEventListener('htmx:afterSwap', () => {
      // Re-apply theme after HTMX swaps to keep styling in sync
      applyTheme(root.classList.contains('dark') ? 'dark' : 'light');
    });
  });
})();
