(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const nav = document.getElementById('nav');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');
  const reveals = document.querySelectorAll('.reveal');

  /* Navbar scroll effect */
  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  }

  /* Active nav link on scroll */
  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* Mobile menu */
  function toggleMenu() {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    nav.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', toggleMenu);

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Smooth scroll for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMenu();
    });
  });

  /* Scroll reveal with Intersection Observer */
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* Stagger feature cards */
  const featureCards = document.querySelectorAll('.feature-card.reveal');
  featureCards.forEach(function (card, i) {
    card.style.transitionDelay = i * 0.08 + 's';
  });

  const benefitItems = document.querySelectorAll('.benefit-item.reveal');
  benefitItems.forEach(function (item, i) {
    item.style.transitionDelay = i * 0.1 + 's';
  });

  /* Parallax subtle on hero orbs */
  const orbs = document.querySelectorAll('.hero__orb');
  if (orbs.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener(
      'scroll',
      function () {
        const y = window.scrollY * 0.15;
        orbs[0].style.transform = 'translate(' + y * 0.3 + 'px, ' + y + 'px)';
        if (orbs[1]) {
          orbs[1].style.transform = 'translate(' + -y * 0.2 + 'px, ' + -y * 0.5 + 'px)';
        }
      },
      { passive: true }
    );
  }

  /* Init */
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* Show hero elements immediately */
  const heroReveals = document.querySelectorAll('.hero .reveal');
  setTimeout(function () {
    heroReveals.forEach(function (el) {
      el.classList.add('visible');
    });
  }, 200);
})();
