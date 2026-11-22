// BillingServer â€” Enterprise SaaS Interaction Engine

// Immediate Redirection to Official Production Domain
if (window.location.hostname.includes('github.io')) {
  var cleanPath = window.location.pathname.replace(/^\/website/, '');
  if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
  window.location.replace('https://billingserver.in' + cleanPath + window.location.search + window.location.hash);
}

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const bgVideo = document.getElementById('bgVideo');

  // 1. Fail-Safe Autoplay Engine
  if (bgVideo) {
    bgVideo.muted = true;
    bgVideo.defaultMuted = true;
    bgVideo.playsInline = true;

    const startPlayback = () => {
      const promise = bgVideo.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Handled via user interaction listener
        });
      }
    };

    startPlayback();
    bgVideo.addEventListener('loadedmetadata', startPlayback);
    bgVideo.addEventListener('canplay', startPlayback);

    const unlockPlaybackEvents = ['click', 'touchstart', 'scroll', 'keydown'];
    const unlockHandler = () => {
      if (bgVideo.paused) {
        startPlayback();
      }
      unlockPlaybackEvents.forEach(evt => window.removeEventListener(evt, unlockHandler));
    };
    unlockPlaybackEvents.forEach(evt => window.addEventListener(evt, unlockHandler, { passive: true, once: true }));
  }

  // 2. Header Scroll State
  const onScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 3. Mobile Navigation Drawer
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      mobileToggle.classList.toggle('active', !isOpen);
      mobileMenu.classList.toggle('open', !isOpen);
    });

    // Mobile dropdown toggle
    document.querySelectorAll('.mobile-dropdown-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = btn.closest('.mobile-dropdown');
        if (parent) {
          parent.classList.toggle('open');
        }
      });
    });

    document.querySelectorAll('.mobile-link, .mobile-sublink, .mobile-menu-cta a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // 4. Clean Single-Expansion Accordion
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const headerBtn = item.querySelector('.accordion-header');
    if (!headerBtn) return;

    headerBtn.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');

      // Collapse all
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBtn = otherItem.querySelector('.accordion-header');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      // Expand clicked item if it was closed
      if (!wasActive) {
        item.classList.add('active');
        headerBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 6. Interactive POS Table Matrix Selection
  const tableCells = document.querySelectorAll('.tbl-cell');
  tableCells.forEach(cell => {
    cell.addEventListener('click', () => {
      tableCells.forEach(c => c.style.outline = 'none');
      cell.style.outline = '2px solid var(--c-red)';
    });
  });

  // 7. Grand Brand Watermark Outro Animation on Scroll
  const brandWatermark = document.getElementById('brandWatermark');
  if (brandWatermark) {
    const watermarkObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          brandWatermark.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    watermarkObserver.observe(brandWatermark);
  }
  // 8. Universal Scroll Reveal Animation Engine (Emerge one-by-one)
  const revealSelectors = [
    '.section-header-center',
    '.section-header-left',
    '.advantage-card',
    '.solution-card',
    '.industry-card',
    '.roadmap-step',
    '.intro-editorial',
    '.intro-media',
    '.testimonial-card',
    '.trust-item'
  ];

  const revealNodes = document.querySelectorAll(revealSelectors.join(', '));
  revealNodes.forEach(node => node.classList.add('reveal'));

  // Stagger children within grids (emerge one-by-one)
  document.querySelectorAll('.advantage-grid, .solutions-grid, .industries-grid, .roadmap-grid, .intro-grid').forEach(grid => {
    Array.from(grid.children).forEach((child, index) => {
      child.style.transitionDelay = (((index % 4) * 0.12).toFixed(2)) + 's';
    });
  });

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealNodes.forEach(node => scrollObserver.observe(node));

  // 9. Client Testimonial Auto-Slider
  const testimonialTrack = document.getElementById('testimonialTrack');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');

  if (testimonialTrack && slides.length > 0) {
    let currentSlide = 0;
    let autoSlideInterval = null;

    // Create indicator dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot' + (idx === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to testimonial slide ' + (idx + 1));
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
      });
    }

    const updateSlider = () => {
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentSlide);
      });
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentSlide);
        });
      }
    };

    const goToSlide = (n) => {
      currentSlide = (n + slides.length) % slides.length;
      updateSlider();
      resetInterval();
    };

    const nextSlide = () => goToSlide(currentSlide + 1);
    const prevSlide = () => goToSlide(currentSlide - 1);

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    const startInterval = () => {
      if (!autoSlideInterval) {
        autoSlideInterval = setInterval(nextSlide, 3800);
      }
    };

    const stopInterval = () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    };

    const resetInterval = () => {
      stopInterval();
      startInterval();
    };

    testimonialTrack.addEventListener('mouseenter', stopInterval);
    testimonialTrack.addEventListener('mouseleave', startInterval);
    testimonialTrack.addEventListener('touchstart', stopInterval, { passive: true });
    testimonialTrack.addEventListener('touchend', startInterval, { passive: true });

    startInterval();
  }
});