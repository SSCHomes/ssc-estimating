/* ============================================================
   SSC Estimating — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ---- Scroll Reveal ---- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  /* ---- Smooth Scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const nav = document.querySelector('.nav');
      const offset = nav ? nav.offsetHeight + 16 : 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  /* ---- Active Nav ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Mobile Menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');

  function openMenu() {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMenu);
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---- Stat Counter Animation ---- */
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        if (isNaN(target)) return;
        const duration = 1600;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target).toLocaleString();
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target.toLocaleString();
        }
        requestAnimationFrame(tick);
        statObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll('.stat-number[data-target]').forEach((el) => statObserver.observe(el));

  /* ---- Gallery Filter ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item[data-category]');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      galleryItems.forEach((item) => {
        const cats = item.dataset.category || '';
        if (cat === 'all' || cats.split(' ').includes(cat)) {
          item.style.display = '';
          item.style.opacity = '0';
          requestAnimationFrame(() => {
            item.style.transition = 'opacity 0.3s ease';
            item.style.opacity = '1';
          });
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ---- Lightbox ---- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let lightboxImages = [];
  let lightboxIndex = 0;

  if (lightbox) {
    galleryItems.forEach((item, i) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;
        lightboxImages = Array.from(document.querySelectorAll('.gallery-item img'));
        lightboxIndex = lightboxImages.indexOf(img);
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') item.click();
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => {
      if (!lightboxImages.length) return;
      lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
      lightboxImg.src = lightboxImages[lightboxIndex].src;
      lightboxImg.alt = lightboxImages[lightboxIndex].alt;
    });
    if (lightboxNext) lightboxNext.addEventListener('click', () => {
      if (!lightboxImages.length) return;
      lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
      lightboxImg.src = lightboxImages[lightboxIndex].src;
      lightboxImg.alt = lightboxImages[lightboxIndex].alt;
    });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
      if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
    });
  }

  /* ---- Contact Form ---- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
      setTimeout(() => {
        contactForm.style.display = 'none';
        if (formSuccess) formSuccess.style.display = 'block';
        window.scrollTo({ top: contactForm.offsetTop - 100, behavior: 'smooth' });
      }, 800);
    });
  }

  /* ---- Estimate Calculator ---- */
  const calcBtn = document.getElementById('calcBtn');
  const calcResult = document.getElementById('calcResult');
  const calcLow = document.getElementById('calcLow');
  const calcHigh = document.getElementById('calcHigh');
  const calcNote = document.getElementById('calcNote');

  // Base rates per sq ft by project type (2026 Northern Utah)
  const baseRates = {
    custom:     { low: 175, high: 250 },
    semi:       { low: 145, high: 195 },
    spec:       { low: 120, high: 160 },
    reno:       { low: 85,  high: 175 },
    adu:        { low: 130, high: 185 },
    commercial: { low: 140, high: 210 },
  };

  const finishMultipliers = {
    standard: 0.88,
    mid:      1.00,
    high:     1.22,
    luxury:   1.55,
  };

  const storyMultipliers = { '1': 1.00, '1.5': 1.05, '2': 1.08, '3': 1.14 };

  const garageAdders = {
    none: 0, '1car': 18000, '2car': 32000, '3car': 48000, detached: 40000,
  };

  const basementAdders = {
    none: 0, crawl: 8000, unfinished: 18000, finished: 42000, walkout: 58000,
  };

  const contingencyPcts = { '5': 1.05, '10': 1.10, '15': 1.15, '20': 1.20 };

  function formatCurrency(n) {
    return '$' + (Math.round(n / 500) * 500).toLocaleString();
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const type = document.getElementById('projectType')?.value;
      const sqft = parseFloat(document.getElementById('sqft')?.value);
      const finish = document.getElementById('finishLevel')?.value || 'mid';
      const stories = document.getElementById('stories')?.value || '2';
      const garage = document.getElementById('garage')?.value || '2car';
      const basement = document.getElementById('basement')?.value || 'unfinished';
      const contingency = document.getElementById('contingency')?.value || '10';

      if (!type || !sqft || sqft < 200) {
        alert('Please select a project type and enter a valid square footage.');
        return;
      }

      const rates = baseRates[type] || baseRates.semi;
      const fMult = finishMultipliers[finish] || 1;
      const sMult = storyMultipliers[stories] || 1.08;
      const gAdd = garageAdders[garage] || 0;
      const bAdd = basementAdders[basement] || 0;
      const cMult = contingencyPcts[contingency] || 1.10;

      const baseLow = (rates.low * fMult * sMult * sqft + gAdd + bAdd) * cMult;
      const baseHigh = (rates.high * fMult * sMult * sqft + gAdd + bAdd) * cMult;

      calcLow.textContent = formatCurrency(baseLow);
      calcHigh.textContent = formatCurrency(baseHigh);
      calcNote.textContent =
        `${sqft.toLocaleString()} sq ft · ${finish} finish · ${contingency}% contingency included`;

      calcResult.style.display = 'block';
      calcResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

})();
