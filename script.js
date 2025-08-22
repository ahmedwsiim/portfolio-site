// Minimal interactions: theme toggle, scroll reveal, dynamic year

// Theme toggle with localStorage persistence
(function(){
  const toggle = document.getElementById('themeToggle');
  const key = 'pref-theme';
  const root = document.documentElement;

  const setTheme = (t) => {
    if(t === 'light'){ root.classList.add('light'); }
    else { root.classList.remove('light'); }
    localStorage.setItem(key, t);
  };

  // initialize
  const saved = localStorage.getItem(key);
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  setTheme(saved || (prefersLight ? 'light' : 'dark'));

  // glyph swap for fun
  const setGlyph = () => toggle.textContent = root.classList.contains('light') ? '◐' : '●';
  setGlyph();

  toggle.addEventListener('click', () => {
    const next = root.classList.contains('light') ? 'dark' : 'light';
    setTheme(next);
    setGlyph();
  });
})();

// IntersectionObserver for reveal-on-scroll
(function(){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
