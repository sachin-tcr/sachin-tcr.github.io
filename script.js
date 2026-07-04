/* ============================================
   LOADER
=============================================== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 400);
});

/* ============================================
   AOS INIT
=============================================== */
if (window.AOS) {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60
  });
}

/* ============================================
   TYPED.JS HERO TEXT
=============================================== */
if (window.Typed) {
  new Typed('#typed-text', {
    strings: [
      'Python Developer',
      'Django Developer',
      'REST API Developer',
      'Backend Developer',
      'Full Stack Learner'
    ],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 1400,
    startDelay: 300,
    loop: true,
    showCursor: false
  });
}

/* ============================================
   NAVBAR SCROLL STATE + SCROLL PROGRESS
=============================================== */
const mainNav = document.getElementById('mainNav');
const progressBar = document.getElementById('scrollProgressBar');
const backToTop = document.getElementById('backToTop');
// add
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
// ------------

function onScroll() {
  const scrollY = window.scrollY;
  mainNav.classList.toggle('scrolled', scrollY > 40);
  backToTop.classList.toggle('show', scrollY > 500);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';

  updateActiveNav();
}
window.addEventListener('scroll', onScroll);
onScroll();

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   ACTIVE NAV LINK ON SCROLL
=============================================== */
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

function updateActiveNav() {
  let currentId = '';
  const scrollPos = window.scrollY + 140;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      currentId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
  });
}

/* Collapse mobile menu on link click */
document.querySelectorAll('#navMenu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('navMenu');
    if (nav.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(nav);
      bsCollapse.hide();
    }
  });
});

/* ============================================
   ANIMATED COUNTERS (About stats)
=============================================== */
const counters = document.querySelectorAll('.stat-number');
let countersStarted = false;

function animateCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    let current = 0;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / Math.max(target, 1)), 20);
    const step = () => {
      current += 1;
      counter.textContent = current;
      if (current < target) {
        setTimeout(step, stepTime);
      } else {
        counter.textContent = target;
      }
    };
    step();
  });
}

/* ============================================
   SKILL BAR FILL ANIMATION
=============================================== */
const skillFills = document.querySelectorAll('.skill-bar-fill');
function animateSkillBars() {
  skillFills.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width + '%';
  });
}

/* ============================================
   INTERSECTION OBSERVERS (trigger once visible)
=============================================== */
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statsObserver.observe(statsSection);
}

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  let skillsAnimated = false;
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        animateSkillBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  skillsObserver.observe(skillsSection);
}

/* ============================================
   BUTTON RIPPLE EFFECT
=============================================== */
document.querySelectorAll('.btn-gradient, .btn-outline-glass').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.classList.add('ripple');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});

/* ============================================
   CONTACT FORM (front-end only, no backend)
=============================================== */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const contactSubmit = document.getElementById('contactSubmit');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    const originalHTML = contactSubmit.innerHTML;
    contactSubmit.innerHTML = '<span class="btn-text"><i class="bi bi-check-lg"></i> Sent!</span>';
    contactSubmit.disabled = true;
    formSuccess.classList.add('show');

    setTimeout(() => {
      contactForm.reset();
      contactSubmit.innerHTML = originalHTML;
      contactSubmit.disabled = false;
    }, 2200);
  });
}

/* ============================================
   FOOTER YEAR
=============================================== */
document.getElementById('year').textContent = new Date().getFullYear();
