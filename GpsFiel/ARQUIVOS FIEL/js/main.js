/**
 * GPS Fiel – Landing Page v3
 * Main JavaScript: Interações, animações, simulador de ganhos, FAQ, Swiper
 */

console.log('%c GPS FIEL v3 – Seu Guardião em Tempo Real ', 'background:#2d0057;color:#f0c040;font-weight:bold;padding:6px 12px;border-radius:4px;');

// ═══════════════════════════════════════════════════
// 1. DOM READY
// ═══════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHamburger();
  initSwiper();
  initCounters();
  initFAQ();
  initProfitSimulator();
  initScrollAnimations();
  initSmoothScroll();
  initHeroVideo();

  const loadTime = Math.round(performance.now()) / 1000;
  console.log(`⚡ Page loaded in ${loadTime.toFixed(2)}s`);
});

// ═══════════════════════════════════════════════════
// 2. HEADER – Scroll shadow + active nav
// ═══════════════════════════════════════════════════
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNav();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function updateActiveNav() {
  const sections = ['inicio', 'solucoes', 'tecnologia', 'planos', 'revendedor'];
  const navLinks = document.querySelectorAll('.main-nav a');

  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.scrollY >= el.offsetTop - 120) {
      current = id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ═══════════════════════════════════════════════════
// 3. HAMBURGER MENU
// ═══════════════════════════════════════════════════
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
  });

  // Close on nav link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
    }
  });
}

// ═══════════════════════════════════════════════════
// 4. SWIPER – Solution cards (mobile carousel)
// ═══════════════════════════════════════════════════
function initSwiper() {
  const SwiperLib = window.Swiper;
  if (!SwiperLib) return;

  const isMobile = window.innerWidth <= 900;

  // Swiper das soluções (cards de audiência) — só mobile
  if (isMobile) {
    new SwiperLib('#solSwiper', {
      slidesPerView: 1.1,
      spaceBetween: 16,
      centeredSlides: true,
      pagination: {
        el: '#solPagination',
        clickable: true,
      },
      breakpoints: {
        480: { slidesPerView: 1.2 },
        640: { slidesPerView: 1.6 },
        768: { slidesPerView: 2.1 },
      }
    });
  }

  // Swiper do checkout — ativo só em mobile; desktop mantém grid CSS
  if (isMobile) {
    new SwiperLib('#checkoutSwiper', {
      slidesPerView: 1.05,
      spaceBetween: 16,
      centeredSlides: true,
      initialSlide: 1,   // Começa no card "Kit Revendedor" (destaque)
      pagination: {
        el: '#checkoutPagination',
        clickable: true,
      },
      breakpoints: {
        480: { slidesPerView: 1.15 },
        640: { slidesPerView: 1.5, centeredSlides: false },
        768: { slidesPerView: 1.8, centeredSlides: false },
      }
    });
  }
}

// ═══════════════════════════════════════════════════
// 5. ANIMATED COUNTERS
// ═══════════════════════════════════════════════════
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, 0, target, 1800);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, start, end, duration) {
  const startTime = performance.now();
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const update = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(start + (end - start) * easeOut(progress));
    el.textContent = value;
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

// ═══════════════════════════════════════════════════
// 6. FAQ ACCORDION
// ═══════════════════════════════════════════════════
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(i => {
        i.classList.remove('open');
        const a = i.querySelector('.faq-a');
        if (a) a.style.display = 'none';
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        answer.style.display = 'block';
        // Animate open
        answer.style.opacity = '0';
        answer.style.transform = 'translateY(-8px)';
        requestAnimationFrame(() => {
          answer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          answer.style.opacity = '1';
          answer.style.transform = 'translateY(0)';
        });
      }
    });
  });
}

// ═══════════════════════════════════════════════════
// 7. PROFIT SIMULATOR
// ═══════════════════════════════════════════════════
function initProfitSimulator() {
  const slider = document.getElementById('simSlider');
  const unitsEl = document.getElementById('simUnits');
  const revenueEl = document.getElementById('simRevenue');
  const costEl = document.getElementById('simCost');
  const profitEl = document.getElementById('simProfit');
  const marginEl = document.getElementById('simMargin');

  if (!slider) return;

  const SALE_PRICE = 900;   // preço de venda (R$)
  const BUY_PRICE = 700;    // preço de compra revendedor (R$)
  const PROFIT_PER = SALE_PRICE - BUY_PRICE; // R$ 200

  const fmt = n => `R$ ${n.toLocaleString('pt-BR')}`;

  const update = () => {
    const units = parseInt(slider.value, 10);
    const revenue = units * SALE_PRICE;
    const cost = units * BUY_PRICE;
    const profit = units * PROFIT_PER;
    const margin = Math.round((profit / revenue) * 100);

    unitsEl.textContent = units;
    revenueEl.textContent = fmt(revenue);
    costEl.textContent = fmt(cost);
    profitEl.textContent = fmt(profit);
    marginEl.textContent = `${margin}%`;

    // Update slider fill
    const pct = ((units - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min))) * 100;
    slider.style.background = `linear-gradient(to right, #c9a84c 0%, #c9a84c ${pct}%, rgba(255,255,255,0.15) ${pct}%)`;

    // Pulse profit element
    profitEl.classList.remove('profit-pulse');
    void profitEl.offsetWidth; // reflow
    profitEl.classList.add('profit-pulse');
  };

  slider.addEventListener('input', update);
  update(); // Initial render
}

// ═══════════════════════════════════════════════════
// 8. SCROLL ANIMATIONS (Intersection Observer)
// ═══════════════════════════════════════════════════
function initScrollAnimations() {
  // Add fade-in-up to key elements
  const targets = [
    '.sol-card',
    '.pillar-card',
    '.plan-card',
    '.auth-num',
    '.trust-seals',
    '.faq-item',
    '.tech-video-block',
    '.tech-pillars',
    '.profit-sim',
    '.reseller-text',
    '.section-header',
    '.qs-item',
    '.spec-badge',
  ];

  targets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('fade-in-up');
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}

// ═══════════════════════════════════════════════════
// 9. SMOOTH SCROLL
// ═══════════════════════════════════════════════════
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      if (target === '#') return;
      const el = document.querySelector(target);
      if (!el) return;
      e.preventDefault();
      const headerH = document.getElementById('header')?.offsetHeight || 72;
      const top = el.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ═══════════════════════════════════════════════════
// 10. VIDEO AUTOPLAY (fallback for mobile)
// ═══════════════════════════════════════════════════
(function autoplayVideos() {
  const videos = document.querySelectorAll('video[autoplay]:not(#heroVideo)');
  videos.forEach(v => {
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => {});
    });
  });
})();



// ═══════════════════════════════════════════════════
// CSS: Add active nav style
// ═══════════════════════════════════════════════════
const style = document.createElement('style');
style.textContent = `
  .main-nav a.active { color: #c9a84c !important; }
  .main-nav a.active::after { width: 100% !important; }
  @keyframes profit-pulse {
    0% { transform: scale(1); }
    40% { transform: scale(1.15); color: #2ecc71; }
    100% { transform: scale(1); }
  }
  .profit-pulse { animation: profit-pulse 0.4s ease; }
`;
document.head.appendChild(style);

// ═══════════════════════════════════════════════════
// 12. HERO VIDEO - Mobile sound control
// ═══════════════════════════════════════════════════
function initHeroVideo() {
  const video = document.getElementById('heroVideo');
  const soundBtn = document.getElementById('videoSoundBtn');
  
  if (!video) return;
  
  // Não repetir o vídeo
  video.loop = false;
  video.controls = false;
  
  // WORKAROUND ESPECÍFICO PARA ANDROID:
  // Android Chrome bloqueia a mídia de forma irrecuperável se tentarmos iniciar unmuted direto;
  // logo iniciamos mudo por default apenas neste SO. Desktop/iOS lidam bem com a exceção (Promise catch).
  const isAndroid = /Android/i.test(navigator.userAgent);

  if (isAndroid) {
    video.muted = true;
    video.autoplay = true;
    if (soundBtn) {
      soundBtn.innerHTML = '<i class="fas fa-volume-xmark"></i><span>Ativar áudio</span>';
      soundBtn.classList.remove('active');
      soundBtn.style.display = 'flex';
    }
    video.play().catch(() => {});
  } else {
    // Tentar iniciar com áudio
    video.muted = false;
    video.autoplay = true;
    
    if (soundBtn) {
      soundBtn.innerHTML = '<i class="fas fa-volume-up"></i><span>Áudio ativo</span>';
      soundBtn.classList.add('active');
    }

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Bloqueado (Safari/Chrome Desktop sem engajamento)
        video.muted = true;
        video.play().catch(() => {});
        
        if (soundBtn) {
          soundBtn.innerHTML = '<i class="fas fa-volume-xmark"></i><span>Ativar áudio</span>';
          soundBtn.classList.remove('active');
          soundBtn.style.display = 'flex';
        }
      });
    }
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      if (video.muted) {
        video.muted = false;
        video.play().catch(() => {});
        soundBtn.innerHTML = '<i class="fas fa-volume-up"></i><span>Áudio ativo</span>';
        soundBtn.classList.add('active');
      } else {
        video.muted = true;
        soundBtn.innerHTML = '<i class="fas fa-volume-xmark"></i><span>Ativar áudio</span>';
        soundBtn.classList.remove('active');
      }
    });
  }
}
