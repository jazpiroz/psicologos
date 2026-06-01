// ── 1. Header sticky (clase "scrolled" al bajar 60px) ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// ── 2. Menú mobile (toggle hamburguesa) ────────────────
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
});
document.addEventListener('click', (e) => {
  if (!header.contains(e.target)) nav.classList.remove('open');
});

// ── 3. Fade-in con IntersectionObserver ────────────────
const DELAYS = [0, 100, 200, 300, 400, 500];
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = DELAYS[+entry.target.dataset.delay] || 0;
    setTimeout(() => entry.target.classList.add('visible'), delay);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── 4. Smooth scroll para links internos ───────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    nav.classList.remove('open');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
