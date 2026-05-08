/* ============================================================
   components.js - Shared Navbar & Footer Injection
   ============================================================ */

const NAV_LINKS = [
  { href: 'index.html', label: 'Home' },
  { href: 'home2.html', label: 'Home 2' },
  { href: 'about.html', label: 'About' },
  { href: 'services.html', label: 'Services' },
  { href: 'pricing.html', label: 'Pricing' },
  { href: 'sample-reviews.html', label: 'Sample Reviews' },
  { href: 'contact.html', label: 'Contact' },
  { href: 'dashboard.html', label: 'Dashboard' },
];

function buildNavbar() {
  const el = document.getElementById('navbar-placeholder');
  if (!el) return;
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = NAV_LINKS.map(l =>
    `<a href="${l.href}" class="nav-link${currentPage === l.href ? ' active' : ''}">${l.label}</a>`
  ).join('');
  el.innerHTML = `
  <nav class="navbar" id="main-navbar">
    <div class="navbar-inner">
      <a href="index.html" class="nav-logo">
        <div class="logo-icon" style="position:relative">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="position:relative;z-index:2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          <div class="sparkles" style="position:absolute;inset:0;pointer-events:none">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--accent)" style="position:absolute;top:-4px;right:-4px"><path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"/></svg>
            <svg width="6" height="6" viewBox="0 0 24 24" fill="var(--accent)" style="position:absolute;bottom:2px;left:-3px;opacity:.8"><path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"/></svg>
          </div>
        </div>
        <span>GrantReview<span style="color:var(--secondary)">Pro</span><span style="color:var(--accent)">.</span></span>
      </a>
      <div class="nav-links">${links}</div>
      <div class="nav-right">
        <button class="nav-icon-btn" data-theme-toggle title="Toggle theme">
          <span class="theme-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </span>
        </button>
        <button class="nav-icon-btn" data-rtl-toggle title="Toggle RTL" style="font-weight:700;font-size:.7rem">RTL</button>
        <a href="signup.html" class="nav-cta-secondary">Submit Proposal</a>
      </div>
      <button class="hamburger" id="hamburger-btn" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="mobile-menu" id="mobile-menu">
    ${NAV_LINKS.map(l => `<a href="${l.href}" class="nav-link${currentPage === l.href ? ' active' : ''}">${l.label}</a>`).join('')}
    <div class="mobile-menu-actions">
      <a href="signup.html" class="btn btn-primary w-full" style="justify-content:center">Submit Proposal</a>
    </div>
    <div class="mobile-menu-utils">
      <button class="nav-icon-btn" data-theme-toggle><span class="theme-icon"></span></button>
        <button class="nav-icon-btn" data-rtl-toggle title="Toggle RTL" style="font-weight:700;font-size:.7rem">RTL</button>
    </div>
  </div>`;

  // Hamburger wiring is handled by initNavbar() in main.js
  // Call it here to ensure it runs after DOM injection
  if (typeof initNavbar === 'function') initNavbar();
}

function buildFooter() {
  const el = document.getElementById('footer-placeholder');
  if (!el) return;
  el.innerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="nav-logo" style="color:var(--text-primary);margin-bottom:16px">
            <div class="logo-icon" style="position:relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="position:relative;z-index:2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              <div class="sparkles" style="position:absolute;inset:0;pointer-events:none">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--accent)" style="position:absolute;top:-4px;right:-4px"><path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"/></svg>
              </div>
            </div>
            <span>GrantReview<span style="color:var(--secondary)">Pro</span><span style="color:var(--accent)">.</span></span>
          </div>
          <p>Expert grant proposal review services helping nonprofits secure funding with professional, structured feedback and guidance.</p>
          <div class="footer-social">
            <a href="#" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
            <a href="#" aria-label="Twitter"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a>
            <a href="#" aria-label="Email"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Services</h5>
          <a href="services.html">Full Proposal Review</a>
          <a href="services.html">Section-by-Section</a>
          <a href="services.html">Editing & Proofreading</a>
          <a href="services.html">Consultation Calls</a>
          <a href="pricing.html">Pricing Plans</a>
        </div>
        <div class="footer-col">
          <h5>Platform</h5>
          <a href="dashboard.html">Client Dashboard</a>
          <a href="sample-reviews.html">Sample Reviews</a>
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
          <a href="login.html">Login</a>
        </div>
        <div class="footer-col">
          <h5>Contact</h5>
          <a href="mailto:hello@grantreviewpro.com">hello@grantreviewpro.com</a>
          <a href="tel:+15551234567">+1 (555) 123-4567</a>
          <a href="#">Schedule a Call</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="footer-bottom">
        <span>© 2026 GrantReviewPro. All rights reserved.</span>
        <div class="footer-bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </div>
  </footer>`;
}

document.addEventListener('DOMContentLoaded', () => {
  buildNavbar();  // also calls initNavbar() after injection
  buildFooter();
});
