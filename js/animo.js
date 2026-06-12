/* ── SCROLL REVEAL ─────────────────────────────────────────── */
(function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

  function initReveal() {
    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── STAT COUNTER ────────────────────────────────────────── */
  function animateCount(el, target) {
    var start = null;
    var duration = 1400;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(ease * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  var statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var target = parseInt(e.target.dataset.count, 10);
        animateCount(e.target, target);
        statObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });

  function initCounters() {
    document.querySelectorAll('[data-count]').forEach(function (el) {
      el.textContent = '0';
      statObserver.observe(el);
    });
  }

  /* ── SCROLL PROGRESS BAR ─────────────────────────────────── */
  function initProgressBar() {
    var bar = document.createElement('div');
    bar.style.cssText = [
      'position:fixed', 'top:52px', 'left:0', 'height:2px',
      'background:#E84A2A', 'z-index:9998', 'width:0%',
      'transition:width 0.08s linear', 'pointer-events:none',
      'will-change:width'
    ].join(';');
    document.body.appendChild(bar);
    window.addEventListener('scroll', function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? Math.min(window.scrollY / max * 100, 100) : 0) + '%';
    }, { passive: true });
  }

  /* ── BACK TO TOP ─────────────────────────────────────────── */
  function initBackToTop() {
    var btn = document.createElement('button');
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 14V4M4 9l5-5 5 5" stroke="#F4F0EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    btn.style.cssText = [
      'position:fixed', 'bottom:32px', 'right:32px',
      'width:44px', 'height:44px',
      'background:#1C1C1C', 'border:1px solid #2A2A2A',
      'border-radius:2px', 'cursor:pointer',
      'display:flex', 'align-items:center', 'justify-content:center',
      'opacity:0', 'pointer-events:none',
      'transition:opacity 0.3s, border-color 0.2s, transform 0.2s',
      'z-index:8888'
    ].join(';');
    document.body.appendChild(btn);
    btn.addEventListener('mouseenter', function () {
      btn.style.borderColor = '#E84A2A';
      btn.style.transform = 'translateY(-2px)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.borderColor = '#2A2A2A';
      btn.style.transform = 'none';
    });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', function () {
      var show = window.scrollY > 600;
      btn.style.opacity = show ? '1' : '0';
      btn.style.pointerEvents = show ? 'auto' : 'none';
    }, { passive: true });
  }

  /* ── MOBILE NAV ──────────────────────────────────────────── */
  function initMobileNav() {
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        var nav = document.getElementById('main-nav');
        if (nav) nav.classList.remove('open');
      });
    });
  }

  /* ── ACTIVE NAV ON SCROLL (homepage only) ────────────────── */
  function initActiveNav() {
    var sections = document.querySelectorAll('section[id], div[id]');
    if (!sections.length) return;
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.id;
          document.querySelectorAll('.nav-links a').forEach(function (a) {
            var href = a.getAttribute('href') || '';
            a.classList.toggle('active', href === '#' + id || href.endsWith('#' + id));
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ── INIT ────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initCounters();
    initProgressBar();
    initBackToTop();
    initMobileNav();
    initActiveNav();
  });
}());
