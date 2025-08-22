// ===============================
// Theme Toggle with Persistence
// ===============================
(function(){
  const toggle = document.getElementById('themeToggle');
  const key = 'pref-theme';
  const root = document.documentElement;

  const setTheme = (t) => {
    if (t === 'light') { root.classList.add('light'); }
    else { root.classList.remove('light'); }
    localStorage.setItem(key, t);
  };

  // Initialize theme
  const saved = localStorage.getItem(key);
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  setTheme(saved || (prefersLight ? 'light' : 'dark'));

  // Glyph swap for fun
  const setGlyph = () => toggle.textContent = root.classList.contains('light') ? '◐' : '●';
  setGlyph();

  toggle.addEventListener('click', () => {
    const next = root.classList.contains('light') ? 'dark' : 'light';
    setTheme(next);
    setGlyph();
  });
})();

// ===============================
// Scroll Reveal Animation
// ===============================
(function(){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

// ===============================
// Dynamic Footer Year
// ===============================
document.getElementById('year').textContent = new Date().getFullYear();

// ===============================
// 3D Tilt Effect for Cards
// ===============================
(function(){
  const tiltElements = document.querySelectorAll('.card, .stat-card');

  tiltElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 6; // tilt intensity
      const rotateY = ((x - centerX) / centerX) * -6;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    });
  });
})();

// ===============================
// Button Glow Parallax
// ===============================
(function(){
  const btns = document.querySelectorAll('.btn');
  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.background = `radial-gradient(circle at ${x}px ${y}px, #60a5fa, #38bdf8)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.background = 'linear-gradient(135deg, var(--accent), #60a5fa)';
    });
  });
})();
