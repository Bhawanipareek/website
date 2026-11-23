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

  // ========================================================
  // 10. LIVE THERMAL RECEIPT PRINTER & SERVICE INTAKE ENGINE
  // ========================================================
  (function initReceiptPrinterEngine() {
    const bookingForm = document.getElementById('serviceBookingForm');
    const receiptPaper = document.getElementById('receiptPaper');
    if (!bookingForm || !receiptPaper) return;

    // State
    let soundEnabled = false;
    let livePrintMode = true;
    let isPrintingAnimation = false;
    let audioCtx = null;

    function initAudio() {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
        }
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }

    function playPrintMotorSound(durationMs = 180) {
      if (!soundEnabled) return;
      try {
        initAudio();
        if (!audioCtx) return;

        const bufferSize = audioCtx.sampleRate * (durationMs / 1000);
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
          const step = Math.sin(i / 11) > 0 ? 1 : -0.75;
          output[i] = (Math.random() * 2 - 1) * 0.35 * step;
        }

        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1600, audioCtx.currentTime);
        filter.Q.setValueAtTime(4.0, audioCtx.currentTime);

        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.38, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + (durationMs / 1000));

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        whiteNoise.start();
      } catch (e) {}
    }

    function playPaperCutSound() {
      if (!soundEnabled) return;
      try {
        initAudio();
        if (!audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(130, audioCtx.currentTime + 0.16);

        gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.16);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.16);
      } catch (e) {}
    }

    function playBeepSound(freq = 620, type = 'sine', duration = 0.08) {
      if (!soundEnabled) return;
      try {
        initAudio();
        if (!audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch (e) {}
    }

    // DOM References - Form
    const fullNameInput = document.getElementById('fullName');
    const emailIdInput = document.getElementById('emailId');
    const mobileNumberInput = document.getElementById('mobileNumber');
    const serviceDropdown = document.getElementById('serviceDropdown');
    const aboutBusinessInput = document.getElementById('aboutBusiness');
    const sampleDataBtn = document.getElementById('sampleDataBtn');
    const soundToggle = document.getElementById('soundToggle');
    const dispatchWhatsAppBtn = document.getElementById('dispatchWhatsAppBtn');

    // DOM References - Receipt
    const recInvoiceNo = document.getElementById('recInvoiceNo');
    const recTime = document.getElementById('recTime');
    const recDate = document.getElementById('recDate');

    const recClientName = document.getElementById('recClientName');
    const recClientPhone = document.getElementById('recClientPhone');
    const recClientEmail = document.getElementById('recClientEmail');
    const recEmailRow = document.getElementById('recEmailRow');

    const recServiceBox = document.getElementById('recServiceBox');
    const recAboutBizBlock = document.getElementById('recAboutBizBlock');
    const recAboutText = document.getElementById('recAboutText');

    const posPrinterDevice = document.querySelector('.pos-printer-device');
    const ledPrint = document.getElementById('ledPrint');
    const cutterBlade = document.getElementById('cutterBlade');
    const slotThermalGlow = document.getElementById('slotThermalGlow');

    const toastPopup = document.getElementById('toastPopup');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');

    // Update Date and Time
    function updateCurrentDateTime() {
      const now = new Date();
      const optionsDate = { day: '2-digit', month: 'short', year: 'numeric' };
      const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      
      if (recDate) recDate.textContent = now.toLocaleDateString('en-IN', optionsDate);
      if (recTime) recTime.textContent = now.toLocaleTimeString('en-IN', optionsTime);
    }

    // Sync Form to Receipt Paper
    function syncFormToReceipt() {
      if (!fullNameInput || !mobileNumberInput || !serviceDropdown) return;

      const fullName = fullNameInput.value.trim();
      const mobile = mobileNumberInput.value.trim();
      const email = emailIdInput ? emailIdInput.value.trim() : '';
      const service = serviceDropdown.value;
      const about = aboutBusinessInput ? aboutBusinessInput.value.trim() : '';

      if (recClientName) recClientName.textContent = fullName || '---';
      if (recClientPhone) recClientPhone.textContent = mobile || '---';

      if (recEmailRow && recClientEmail) {
        if (email) {
          recEmailRow.style.display = 'flex';
          recClientEmail.textContent = email;
        } else {
          recEmailRow.style.display = 'none';
        }
      }

      if (recServiceBox) {
        if (service) {
          recServiceBox.textContent = service;
          recServiceBox.style.color = '#000000';
        } else {
          recServiceBox.textContent = 'Awaiting Selection...';
          recServiceBox.style.color = '#777777';
        }
      }

      if (recAboutBizBlock && recAboutText) {
        if (about) {
          recAboutBizBlock.style.display = 'block';
          recAboutText.textContent = about;
        } else {
          recAboutBizBlock.style.display = 'none';
        }
      }
    }

    // Tactile Stepped Feeding on Keystrokes
    let feedBounceTimer = null;
    function triggerLiveFeedStep(targetElement = null, soundDuration = 180) {
      if (isPrintingAnimation || !receiptPaper) return;

      if (ledPrint) ledPrint.classList.add('printing');
      if (slotThermalGlow) slotThermalGlow.classList.add('active');
      if (posPrinterDevice) posPrinterDevice.classList.add('printer-stepper-active');
      playPrintMotorSound(soundDuration);

      receiptPaper.classList.remove('idle-sway', 'paper-feed-bounce');
      void receiptPaper.offsetWidth;
      receiptPaper.classList.add('paper-feed-bounce');

      if (targetElement) {
        targetElement.classList.remove('fresh-thermal-ink');
        void targetElement.offsetWidth;
        targetElement.classList.add('fresh-thermal-ink');
      }

      clearTimeout(feedBounceTimer);
      feedBounceTimer = setTimeout(() => {
        if (posPrinterDevice) posPrinterDevice.classList.remove('printer-stepper-active');
        if (ledPrint) ledPrint.classList.remove('printing');
        if (slotThermalGlow) slotThermalGlow.classList.remove('active');
        receiptPaper.classList.remove('paper-feed-bounce');
        receiptPaper.classList.add('idle-sway');
      }, 230);
    }

    // Full Cinematic Print Animation
    function executeFullPrintAnimation(callback) {
      if (isPrintingAnimation || !receiptPaper) return;
      isPrintingAnimation = true;

      initAudio();
      playBeepSound(950, 'sine', 0.1);

      receiptPaper.classList.remove('idle-sway', 'paper-feed-bounce', 'cinematic-printing');
      void receiptPaper.offsetWidth;

      if (ledPrint) ledPrint.classList.add('printing');
      if (slotThermalGlow) slotThermalGlow.classList.add('active');
      if (posPrinterDevice) posPrinterDevice.classList.add('printer-stepper-active');
      receiptPaper.classList.add('cinematic-printing');

      let soundStep = 0;
      const soundInterval = setInterval(() => {
        soundStep++;
        playPrintMotorSound(150);
        if (soundStep >= 7) {
          clearInterval(soundInterval);
        }
      }, 190);

      setTimeout(() => {
        playPaperCutSound();
        if (cutterBlade) cutterBlade.classList.add('cutter-cut-flash');

        setTimeout(() => {
          if (cutterBlade) cutterBlade.classList.remove('cutter-cut-flash');
          if (ledPrint) ledPrint.classList.remove('printing');
          if (slotThermalGlow) slotThermalGlow.classList.remove('active');
          if (posPrinterDevice) posPrinterDevice.classList.remove('printer-stepper-active');
          receiptPaper.classList.remove('cinematic-printing');
          receiptPaper.classList.add('idle-sway');
          isPrintingAnimation = false;

          playBeepSound(1300, 'sine', 0.12);
          if (callback) callback();
        }, 280);
      }, 1450);
    }

    // Toast Notification
    function showToast(title, msg) {
      if (!toastPopup) return;
      if (toastTitle) toastTitle.textContent = title;
      if (toastMessage) toastMessage.textContent = msg;

      toastPopup.classList.add('show');
      setTimeout(() => {
        toastPopup.classList.remove('show');
      }, 4500);
    }

    // Download Receipt Image
    async function downloadReceiptImage() {
      try {
        showToast('Preparing Receipt Image...', 'Please wait a moment...');

        receiptPaper.classList.remove('idle-sway', 'paper-feed-bounce', 'cinematic-printing');
        const originalTransform = receiptPaper.style.transform;
        receiptPaper.style.transform = 'none';

        if (typeof html2canvas === 'function') {
          const canvas = await html2canvas(receiptPaper, {
            scale: 2.5,
            backgroundColor: null,
            useCORS: true,
            logging: false
          });

          receiptPaper.style.transform = originalTransform;
          receiptPaper.classList.add('idle-sway');

          const invoiceNo = recInvoiceNo ? recInvoiceNo.textContent : 'INV-1089';
          const clientName = fullNameInput.value.trim().replace(/\s+/g, '_') || 'Client';
          const fileName = `BillingServer_Bill_${invoiceNo}_${clientName}.png`;

          const link = document.createElement('a');
          link.download = fileName;
          link.href = canvas.toDataURL('image/png');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          showToast('Receipt Downloaded! ✅', `File: ${fileName}`);
        } else {
          showToast('Notice', 'Canvas capture unavailable. Contact +91 9783883297');
        }
      } catch (err) {
        console.error("html2canvas error:", err);
        showToast('Inquiry Recorded', 'Details saved successfully. Connecting to WhatsApp!');
      }
    }

    // Dispatch details to WhatsApp
    function dispatchToWhatsApp() {
      const name = fullNameInput.value.trim() || 'Client';
      const phone = mobileNumberInput.value.trim() || '---';
      const email = emailIdInput ? emailIdInput.value.trim() : '';
      const service = serviceDropdown.value || 'Custom Software / Billing System';
      const about = aboutBusinessInput ? aboutBusinessInput.value.trim() : '';

      let text = `*New Service Inquiry — BillingServer.in*\n\n`;
      text += `👤 *Name:* ${name}\n`;
      text += `📱 *Phone:* ${phone}\n`;
      if (email) text += `📧 *Email:* ${email}\n`;
      text += `⚡ *Service Required:* ${service}\n`;
      if (about) text += `📝 *Project Details:* ${about}\n`;
      text += `\n_Generated via Live Thermal Receipt Printer on billingserver.in_`;

      const whatsappUrl = `https://wa.me/919783883297?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }

    // Handle Form Submit
    window.handleReceiptSubmit = function() {
      if (!fullNameInput.value.trim()) {
        alert('Please enter your Full Name');
        fullNameInput.focus();
        return;
      }

      if (!mobileNumberInput.value.trim()) {
        alert('Please enter your Mobile Number');
        mobileNumberInput.focus();
        return;
      }

      if (!serviceDropdown.value) {
        alert('Please select a Service');
        serviceDropdown.focus();
        return;
      }

      syncFormToReceipt();
      executeFullPrintAnimation(() => {
        downloadReceiptImage();
      });
    };

    // Load Sample Data
    function loadSampleData() {
      if (fullNameInput) fullNameInput.value = 'Vikramaditya Rathore';
      if (emailIdInput) emailIdInput.value = 'vikram.rathore@techcorp.in';
      if (mobileNumberInput) mobileNumberInput.value = '9820198765';
      if (serviceDropdown) serviceDropdown.value = 'Custom Software Development';
      if (aboutBusinessInput) aboutBusinessInput.value = 'We run a retail distribution chain and need an automated custom software, billing & inventory management system.';

      updateCurrentDateTime();
      syncFormToReceipt();
      executeFullPrintAnimation();
    }

    // Attach Event Listeners
    if (fullNameInput) {
      fullNameInput.addEventListener('input', () => {
        syncFormToReceipt();
        if (livePrintMode) triggerLiveFeedStep(recClientName);
      });
    }

    if (mobileNumberInput) {
      mobileNumberInput.addEventListener('input', () => {
        syncFormToReceipt();
        if (livePrintMode) triggerLiveFeedStep(recClientPhone);
      });
    }

    if (emailIdInput) {
      emailIdInput.addEventListener('input', () => {
        syncFormToReceipt();
        if (livePrintMode) triggerLiveFeedStep(recClientEmail);
      });
    }

    if (serviceDropdown) {
      serviceDropdown.addEventListener('change', () => {
        syncFormToReceipt();
        if (livePrintMode) triggerLiveFeedStep(recServiceBox, 240);
      });
    }

    if (aboutBusinessInput) {
      aboutBusinessInput.addEventListener('input', () => {
        syncFormToReceipt();
        if (livePrintMode) triggerLiveFeedStep(recAboutText);
      });
    }

    if (sampleDataBtn) {
      sampleDataBtn.addEventListener('click', loadSampleData);
    }

    if (dispatchWhatsAppBtn) {
      dispatchWhatsAppBtn.addEventListener('click', dispatchToWhatsApp);
    }

    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
          soundToggle.classList.add('active');
          soundToggle.querySelector('.label').textContent = 'Sound: ON';
          soundToggle.querySelector('.icon').textContent = '🔊';
          playBeepSound(800, 'sine', 0.08);
        } else {
          soundToggle.classList.remove('active');
          soundToggle.querySelector('.label').textContent = 'Sound: OFF';
          soundToggle.querySelector('.icon').textContent = '🔇';
        }
      });
    }

    window.addEventListener('click', () => {
      initAudio();
    }, { once: true });

    // Initial setup - Clean state with placeholders only
    updateCurrentDateTime();
    setInterval(updateCurrentDateTime, 60000);

    if (fullNameInput) fullNameInput.value = '';
    if (emailIdInput) emailIdInput.value = '';
    if (mobileNumberInput) mobileNumberInput.value = '';
    if (serviceDropdown) serviceDropdown.selectedIndex = 0;
    if (aboutBusinessInput) aboutBusinessInput.value = '';

    syncFormToReceipt();
  })();
});