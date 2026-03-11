// ============================================================
//  CHAITANYA PATWARI — PORTFOLIO SCRIPTS
// ============================================================

// ── LOADER
window.addEventListener('load', () => {
  setTimeout(() => { document.getElementById('loader').classList.add('hidden'); }, 2000);
});

// ── CUSTOM CURSOR
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
});
function animRing() {
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,.skill-tag,.project-card,.service-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width='6px'; cursor.style.height='6px'; ring.style.width='50px'; ring.style.height='50px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width='12px'; cursor.style.height='12px'; ring.style.width='36px'; ring.style.height='36px'; });
});

// ── PARTICLES CANVAS
const canvas = document.getElementById('particles-canvas');
const ctx    = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
const particles = [];
for (let i = 0; i < 80; i++) {
  particles.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height,
    vx: (Math.random()-.5)*.3, vy: (Math.random()-.5)*.3,
    r: Math.random()*1.5+.5, alpha: Math.random()*.4+.1 });
}
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(0,229,255,${p.alpha})`; ctx.fill();
    particles.slice(i+1).forEach(p2 => {
      const dx=p.x-p2.x, dy=p.y-p2.y, d=Math.sqrt(dx*dx+dy*dy);
      if (d < 120) {
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p2.x,p2.y);
        ctx.strokeStyle=`rgba(0,229,255,${.08*(1-d/120)})`; ctx.lineWidth=.5; ctx.stroke();
      }
    });
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── NAVBAR SCROLL
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ── MOBILE MENU
function toggleMenu() { document.getElementById('navLinks').classList.toggle('open'); }
document.querySelectorAll('#navLinks a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'))
);

// ── TYPED TEXT
const phrases = ['Software Developer 🚀','Python Enthusiast 🐍','AI/ML Explorer 🤖','Problem Solver 💡','Open Source Contributor 🌍','Future Google Engineer 🎯'];
let pi = 0, ci = 0, deleting = false;
function type() {
  const ph = phrases[pi];
  const el = document.getElementById('typed-text');
  if (!deleting) {
    el.textContent = ph.slice(0, ++ci);
    if (ci === ph.length) { deleting = true; setTimeout(type, 2000); return; }
  } else {
    el.textContent = ph.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 40 : 80);
}
setTimeout(type, 2500);
setInterval(() => { const c=document.getElementById('typed-cursor'); c.style.opacity=c.style.opacity==='0'?'1':'0'; }, 500);

// ── SCROLL REVEAL
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── SKILL BARS
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar => { bar.style.width = bar.dataset.width + '%'; });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-bar-section').forEach(s => barObserver.observe(s));

// ── CONTACT FORM
function showToast(msg, bg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.style.background = bg;
  t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 3000);
}
function sendMessage() {
  const n  = document.getElementById('name').value;
  const em = document.getElementById('email').value;
  const s  = document.getElementById('subject').value;
  const m  = document.getElementById('message').value;
  if (!n || !em || !m) { showToast('Please fill all fields.', '#e74c3c'); return; }
  const mailto = `mailto:patwarichaitanya97@gmail.com?subject=${encodeURIComponent(s||'Portfolio Contact: '+n)}&body=${encodeURIComponent('Name: '+n+'\nEmail: '+em+'\n\n'+m)}`;
  window.location.href = mailto;
  document.getElementById('formSuccess').style.display = 'block';
  showToast('Opening email client... ✉', 'var(--cyan)');
}

// ── ACTIVE NAV HIGHLIGHT
const allSections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  allSections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
  allNavLinks.forEach(a => { a.style.color = a.getAttribute('href')==='#'+current ? 'var(--white)' : ''; });
});

// ── COUNTER ANIMATION
function animCount(el, target, duration) {
  let start = 0;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target) + '+';
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const statEl = document.getElementById('stat-projects');
if (statEl) {
  const heroObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) animCount(statEl, 8, 1000);
  }, { threshold: 0.5 });
  heroObs.observe(statEl.closest('section'));
}