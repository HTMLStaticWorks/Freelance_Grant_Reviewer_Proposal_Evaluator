/* ============================================================
   MAIN JavaScript - main.js
   Grant Reviewer Platform
   ============================================================ */

'use strict';

/* ── Theme ── */
const ThemeManager = {
  key: 'grantReviewerTheme',
  init() {
    const saved = localStorage.getItem(this.key) || 'light';
    this.apply(saved);
  },
  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.key, theme);
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      const icon = btn.querySelector('.theme-icon');
      if (icon) icon.innerHTML = theme === 'dark' ? sunIcon() : moonIcon();
      btn.setAttribute('title', theme === 'dark' ? 'Switch to Light' : 'Switch to Dark');
    });
  },
  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    this.apply(current === 'dark' ? 'light' : 'dark');
  }
};

/* ── RTL ── */
const RTLManager = {
  key: 'grantReviewerRTL',
  init() {
    const saved = localStorage.getItem(this.key) === 'true';
    this.apply(saved);
  },
  apply(rtl) {
    document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
    localStorage.setItem(this.key, rtl);
    document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
      btn.setAttribute('title', rtl ? 'Switch to LTR' : 'Switch to RTL');
      btn.classList.toggle('active', rtl);
    });
  },
  toggle() {
    const current = document.documentElement.getAttribute('dir') === 'rtl';
    this.apply(!current);
  }
};

/* ── Icons ── */
function moonIcon() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}
function sunIcon() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
}

/* ── Navbar ── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const scrolled = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', scrolled, { passive: true });
  scrolled();

  // Hamburger
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Active nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ── Scroll Reveal ── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}

/* ── Progress Bars ── */
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill[data-width]');
  if (!bars.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => observer.observe(b));
}

/* ── Counter Animation ── */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 2000;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = prefix + (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

/* ── Tabs ── */
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(container => {
    const tabs = container.querySelectorAll('[data-tab]');
    const panels = container.querySelectorAll('[data-panel]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => {
          p.classList.toggle('hidden', p.dataset.panel !== target);
          p.classList.toggle('active', p.dataset.panel === target);
        });
        tab.classList.add('active');
      });
    });
  });
}

/* ── Accordion / FAQ ── */
function initAccordion() {
  document.querySelectorAll('.accordion-item').forEach(item => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');
    if (!header || !body) return;
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-body').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ── Modal ── */
function initModals() {
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(btn.dataset.modalOpen);
      if (modal) openModal(modal);
    });
  });
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) closeModal(modal);
    });
  });
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', () => closeModal(backdrop.closest('.modal')));
  });
}
function openModal(modal) {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(modal) {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── File Upload ── */
function initFileUpload() {
  document.querySelectorAll('.upload-zone').forEach(zone => {
    const input = zone.querySelector('input[type="file"]');
    zone.addEventListener('click', () => input && input.click());
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('dragover');
      if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files, zone);
    });
    if (input) {
      input.addEventListener('change', () => {
        if (input.files.length) handleFiles(input.files, zone);
      });
    }
  });
}
function handleFiles(files, zone) {
  const info = zone.querySelector('.upload-info');
  if (info) {
    const names = Array.from(files).map(f => f.name).join(', ');
    info.textContent = `Selected: ${names}`;
    info.style.color = 'var(--secondary)';
  }
}

/* ── Password Toggle ── */
function initPasswordToggle() {
  document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const field = btn.closest('.password-field').querySelector('input');
      if (!field) return;
      const isText = field.type === 'text';
      field.type = isText ? 'password' : 'text';
      btn.innerHTML = isText
        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
    });
  });
}

/* ── Toast ── */
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${message}</span><button onclick="this.parentElement.remove()">×</button>`;
  const container = document.getElementById('toast-container') || createToastContainer();
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('show'); }, 10);
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 4000);
}
function createToastContainer() {
  const c = document.createElement('div');
  c.id = 'toast-container';
  c.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
  document.body.appendChild(c);
  return c;
}

/* ── Smooth Scroll ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ── Pricing Toggle ── */
function initPricingToggle() {
  const toggle = document.querySelector('#pricing-toggle');
  if (!toggle) return;
  toggle.addEventListener('change', () => {
    const isAnnual = toggle.checked;
    document.querySelectorAll('[data-price-monthly]').forEach(el => {
      el.textContent = isAnnual ? el.dataset.priceAnnual : el.dataset.priceMonthly;
    });
    document.querySelectorAll('.pricing-period').forEach(el => {
      el.textContent = isAnnual ? '/year' : '/month';
    });
  });
}

/* ── Main Init ── */
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  RTLManager.init();
  // initNavbar() is called by components.js buildNavbar() after DOM injection
  initScrollReveal();
  initProgressBars();
  initCounters();
  initTabs();
  initAccordion();
  initModals();
  initFileUpload();
  initPasswordToggle();
  initSmoothScroll();
  initPricingToggle();

  // Theme toggle buttons
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => ThemeManager.toggle());
  });

  // RTL toggle buttons
  document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
    btn.addEventListener('click', () => RTLManager.toggle());
  });

  // Form submissions
  document.querySelectorAll('form[data-ajax]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
      setTimeout(() => {
        showToast('Message sent successfully! We\'ll respond within 24 hours.', 'success');
        form.reset();
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.originalText || 'Submit'; }
      }, 1500);
    });
  });
});

/* ── Toast CSS injection ── */
const toastStyle = document.createElement('style');
toastStyle.textContent = `
.toast {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 14px 18px;
  display: flex; align-items: center; gap: 12px;
  box-shadow: var(--shadow-lg);
  font-size: .875rem;
  font-weight: 500;
  min-width: 280px;
  opacity: 0;
  transform: translateX(20px);
  transition: all .3s ease;
  color: var(--text-primary);
}
.toast.show { opacity: 1; transform: translateX(0); }
.toast-success { border-left: 4px solid var(--secondary); }
.toast-error { border-left: 4px solid #EF4444; }
.toast button { margin-left: auto; color: var(--text-muted); font-size: 1.1rem; line-height: 1; }
.modal { display: none; position: fixed; inset: 0; z-index: 2000; align-items: center; justify-content: center; }
.modal.open { display: flex; }
.modal-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,.6); backdrop-filter: blur(4px); }
.modal-box { position: relative; z-index: 1; background: var(--surface); border-radius: var(--radius-xl); padding: 40px; max-width: 540px; width: 90%; max-height: 90vh; overflow-y: auto; }
.accordion-body { max-height: 0; overflow: hidden; transition: max-height .4s ease; }
.accordion-item.open .accordion-chevron { transform: rotate(180deg); }
.accordion-chevron { transition: transform .3s ease; }
[data-panel]:not(.active) { display: none; }
[data-panel].active { display: block; }
`;
document.head.appendChild(toastStyle);
