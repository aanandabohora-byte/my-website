// ---------- Theme toggle (remembers choice) ----------
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');

try {
  const saved = localStorage.getItem('theme');
  if (saved) root.dataset.theme = saved;
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) root.dataset.theme = 'dark';
} catch (e) {}

toggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// ---------- Typing effect ----------
const roles = ['HR training & development', 'retail operations', 'business systems', 'digital projects'];
const typed = document.getElementById('typed');
let r = 0, c = 0, deleting = false;

function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, c);
  if (!deleting && c === word.length) { deleting = true; return setTimeout(type, 1400); }
  if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; }
  c += deleting ? -1 : 1;
  setTimeout(type, deleting ? 40 : 75);
}
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) type();
else typed.textContent = roles[0];

// ---------- Skill bars fill when visible ----------
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelector('i').style.width = entry.target.dataset.level + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });
document.querySelectorAll('.skill').forEach(s => skillObserver.observe(s));

// ---------- Project filter ----------
const chips = document.querySelectorAll('.chip');
const projects = document.querySelectorAll('.project');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  const filter = chip.dataset.filter;
  projects.forEach(project => project.classList.toggle('hide', filter !== 'all' && project.dataset.type !== filter));
}));

// ---------- Contact form validation ----------
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll('input, textarea').forEach(field => {
    const ok = field.value.trim() !== '' && field.checkValidity();
    field.classList.toggle('invalid', !ok);
    if (!ok) valid = false;
  });
  msg.className = 'form-msg ' + (valid ? 'ok' : 'error');
  msg.textContent = valid
    ? 'Your message details are valid. Connect an email/form service to send it from this portfolio.'
    : 'Please fill in every field with valid details.';
});
document.getElementById('year').textContent = new Date().getFullYear();
