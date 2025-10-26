const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const yearSpan = document.getElementById('ano');

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    navToggle.setAttribute('aria-label', !isExpanded ? 'Fechar menu' : 'Abrir menu');
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.tagName === 'A') {
      navLinks.classList.remove('active');
      body.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu');
    }
  });
}

const observerElements = document.querySelectorAll('[data-animate]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && observerElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -80px 0px',
    }
  );

  observerElements.forEach((element) => observer.observe(element));
} else {
  observerElements.forEach((element) => element.classList.add('is-visible'));
}

if (navbar) {
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

const contactForm = document.getElementById('contato-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const feedback = contactForm.querySelector('.form-feedback');
    if (feedback) {
      feedback.textContent = 'Mensagem recebida! Responderemos em poucos minutos. 🍕';
    }
    contactForm.reset();
    setTimeout(() => {
      if (feedback) {
        feedback.textContent = '';
      }
    }, 5000);
  });
}

const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const feedback = newsletterForm.querySelector('.newsletter-feedback');
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (feedback) {
      feedback.textContent = 'Quase lá! Em breve você receberá nossas novidades crocantes.';
    }
    if (emailInput instanceof HTMLInputElement) {
      emailInput.value = '';
    }
    setTimeout(() => {
      if (feedback) {
        feedback.textContent = '';
      }
    }, 5000);
  });
}
