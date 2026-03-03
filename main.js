/* =============================================
   SCHNITTSTELLE — main.js
   GSAP + Lenis + All Interactions
   ============================================= */

gsap.registerPlugin(ScrollTrigger);

/* =============================================
   LENIS SMOOTH SCROLL
   ============================================= */
const lenis = new Lenis({
  duration: 1.3,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* =============================================
   SCROLL PROGRESS BAR
   ============================================= */
const scrollBar = document.getElementById('scrollBar');
lenis.on('scroll', ({ progress }) => {
  scrollBar.style.width = (progress * 100) + '%';
});

/* =============================================
   CUSTOM CURSOR
   ============================================= */
const cursor = document.getElementById('cursor');
let cursorX = 0, cursorY = 0;
let hasMoved = false;

document.addEventListener('mousemove', e => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  if (!hasMoved) { hasMoved = true; cursor.style.opacity = '1'; }
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
});

document.querySelectorAll('a, button, .svc-row, .review-card, .team-card, .gallery-img-panel, .menu-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

cursor.style.opacity = '0';
cursor.style.transition = 'opacity .3s, left .08s, top .08s, width .25s, height .25s';

/* =============================================
   PRELOADER
   ============================================= */
(function runPreloader() {
  const preloader = document.getElementById('preloader');
  const letters = document.querySelectorAll('#preLetters span');
  const preLine = document.getElementById('preLine');
  const preCounter = document.getElementById('preCounter');
  const curtainTop = document.getElementById('curtainTop');
  const curtainBot = document.getElementById('curtainBot');

  // Phase 1 — letters cascade up
  const tl = gsap.timeline();

  tl.to(letters, {
    y: '0%',
    stagger: 0.055,
    duration: 0.7,
    ease: 'power3.out'
  });

  // Simultaneously: counter + line
  let count = 0;
  const counterInterval = setInterval(() => {
    count = Math.min(count + Math.ceil(Math.random() * 8 + 2), 100);
    preCounter.textContent = count;
    gsap.to(preLine, { width: count + '%', duration: .15, ease: 'none' });
    if (count >= 100) clearInterval(counterInterval);
  }, 28);

  // Phase 2 — letters exit up
  tl.to(letters, {
    y: '-110%',
    stagger: 0.04,
    duration: 0.55,
    ease: 'power3.in',
    delay: 1.2
  });

  // Phase 3 — curtain split
  tl.to(curtainTop, { y: '-100%', duration: 0.7, ease: 'power3.inOut' }, '-=0.1');
  tl.to(curtainBot, { y: '100%', duration: 0.7, ease: 'power3.inOut' }, '<');

  // Hide preloader + start hero animations
  tl.call(() => {
    preloader.style.pointerEvents = 'none';
    setTimeout(() => { preloader.style.display = 'none'; }, 100);
    startHeroAnimation();
  });
})();

/* =============================================
   HERO ANIMATION
   ============================================= */
function startHeroAnimation() {
  const lines = document.querySelectorAll('.hero .line');
  const eyebrow = document.querySelector('.hero-eyebrow');
  const heroFooter = document.querySelector('.hero-footer');

  const tl = gsap.timeline();

  tl.to(lines, {
    y: '0%',
    stagger: 0.12,
    duration: 1,
    ease: 'power3.out'
  });

  tl.to([eyebrow, heroFooter], {
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.4');
}

/* =============================================
   NAVBAR SCROLL EFFECT
   ============================================= */
gsap.fromTo('.nav',
  { backgroundColor: 'rgba(12, 11, 9, 0.7)', backdropFilter: 'blur(12px)', webkitBackdropFilter: 'blur(12px)' },
  {
    backgroundColor: 'rgba(12, 11, 9, 0)',
    backdropFilter: 'blur(0px)',
    webkitBackdropFilter: 'blur(0px)',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  }
);

/* =============================================
   HERO PARALLAX
   ============================================= */
gsap.to('#heroBg', {
  yPercent: 22,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

/* =============================================
   HORIZONTAL GALLERY
   ============================================= */
(function initGallery() {
  const track = document.getElementById('galleryTrack');
  const outer = document.querySelector('.gallery-outer');

  if (!track || !outer) return;

  const getTrackWidth = () => track.scrollWidth - window.innerWidth;

  let ctx = gsap.context(() => {
    gsap.to(track, {
      x: () => -getTrackWidth(),
      ease: 'none',
      scrollTrigger: {
        trigger: outer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
  });
})();

/* =============================================
   SCROLL REVEAL (.r-up, .r-left, .r-right)
   ============================================= */
function initScrollReveals() {
  const revealEls = document.querySelectorAll('.r-up, .r-left, .r-right');

  revealEls.forEach(el => {
    let fromVars = { opacity: 0 };
    if (el.classList.contains('r-up')) fromVars.y = 48;
    if (el.classList.contains('r-left')) fromVars.x = -48;
    if (el.classList.contains('r-right')) fromVars.x = 48;

    gsap.fromTo(el, fromVars, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 87%',
        toggleActions: 'play none none none'
      }
    });
  });
}

/* Run scroll reveals after preloader (slight delay) */
setTimeout(initScrollReveals, 2200);

/* =============================================
   COUNTER ANIMATION
   ============================================= */
function animateCounter(el, target) {
  let start = 0;
  const duration = 1800;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    start = Math.round(ease * target);
    el.textContent = start;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

document.querySelectorAll('.stat-num[data-target]').forEach(el => {
  const target = parseInt(el.dataset.target);
  let triggered = false;

  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    onEnter: () => {
      if (!triggered) {
        triggered = true;
        animateCounter(el, target);
      }
    }
  });
});

/* =============================================
   MAGNETIC BUTTONS
   ============================================= */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: x * 0.32,
      y: y * 0.32,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0, y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)'
    });
  });
});

/* =============================================
   FULLSCREEN MENU TOGGLE
   ============================================= */
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  nav.classList.toggle('nav-menu-open', isOpen);
  burger.classList.toggle('active', isOpen);
  burger.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');

  if (isOpen) {
    lenis.stop();
    gsap.to(nav, { backgroundColor: '#f2ece0', duration: 0.6, ease: 'power3.out' });
  } else {
    lenis.start();
    // ScrollTrigger will automatically take over the background color on the next scroll event or tick
    // However, if we are at the top, we might want to manually set it back or just let it refresh
    ScrollTrigger.refresh();
  }
});

/* Close menu on link click */
document.querySelectorAll('.menu-item').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    burger.classList.remove('active');
    lenis.start();
  });
});

/* =============================================
   CTA GHOST PARALLAX
   ============================================= */
gsap.to('.cta-ghost', {
  x: 80,
  ease: 'none',
  scrollTrigger: {
    trigger: '.cta',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1
  }
});
