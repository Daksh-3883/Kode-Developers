if (!window.kodeCommonLoaded) {
  // ===================== 1. THEME TOGGLE ENGINE =====================
  const themeToggleBtn = document.getElementById('theme-toggle');

  // Helper to update the button icon based on current theme
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      if (themeToggleBtn) themeToggleBtn.textContent = '☀️'; // Sun for dark mode
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      if (themeToggleBtn) themeToggleBtn.textContent = '🌙'; // Moon for light mode
    }
  }

  // Check local storage for saved theme preference (default to dark)
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  // Listen for clicks on the toggle button
  themeToggleBtn?.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });

  // ===================== 2. FADE-UP ON SCROLL =====================
  const fadeEls = document.querySelectorAll('.fade-up');

  // Intersection Observer to trigger animations when elements enter viewport
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // Stop observing once shown
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => observer.observe(el));
}
