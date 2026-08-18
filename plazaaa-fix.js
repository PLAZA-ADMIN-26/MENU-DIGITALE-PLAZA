(function () {
  const q = s => document.querySelector(s);
  const qa = s => Array.from(document.querySelectorAll(s));

  // Toggle logo dropdown
  window.toggleLogoMenu = function () {
    const dd = q('.logo-dropdown');
    if (!dd) return;
    dd.style.display = dd.style.display === 'block' ? '' : 'block';
  };

  // Simple cart placeholder
  window.toggleCart = function () {
    console.log('toggleCart called');
    // implement actual cart UI if needed
  };

  // Language menu
  window.toggleLangMenu = function () {
    const dd = q('.lang-dropdown');
    if (!dd) return;
    dd.style.display = dd.style.display === 'block' ? '' : 'block';
  };
  window.setLang = function (lang) {
    const btn = q('.lang-selector > button');
    if (btn) btn.textContent = lang.toUpperCase();
    qa('.lang-option').forEach(o => o.classList.toggle('active', o.dataset.lang === lang));
    // if you have i18n strings, trigger update here
  };

  // Simple navigation scrolling
  window.andaA = function (id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  window.andaAHome = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search filter for dishes
  window.cercaPiatto = function (term) {
    term = (term || '').trim().toLowerCase();
    const piatti = qa('.piatto');
    piatti.forEach(p => {
      const name = (p.querySelector('.piatto-nome')?.textContent || '').toLowerCase();
      const ingr = (p.querySelector('.piatto-ingredienti')?.textContent || '').toLowerCase();
      const match = !term || name.includes(term) || ingr.includes(term);
      p.style.display = match ? '' : 'none';
    });
  };

  // Allergeni toggle (just toggles a class for CSS)
  window.toggleAllergeni = function () {
    const body = document.body;
    const btn = q('#allergeniBtn');
    const pressed = btn && btn.getAttribute('aria-pressed') === 'true';
    if (btn) btn.setAttribute('aria-pressed', String(!pressed));
    body.classList.toggle('show-allergeni');
    if (q('#allergeniBtnLabel')) {
      q('#allergeniBtnLabel').textContent = body.classList.contains('show-allergeni') ? 'Nascondi allergeni' : 'Mostra allergeni';
    }
  };

  // Tabs for menu sections
  window.mostraSezione = function (id, btn) {
    qa('.menu-sezione').forEach(s => s.classList.toggle('active', s.id === id));
    qa('.menu-tab-btn').forEach(b => b.classList.toggle('active', b === btn));
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  window.mostraViniSezione = function (id, btn) {
    qa('.vini-grid').forEach(s => s.classList.toggle('active', s.id === id));
    qa('#viniScrollNav .menu-tab-btn').forEach(b => b.classList.toggle('active', b === btn));
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Heart (favorite) toggle
  window.toggleHeart = function (btn) {
    btn = btn || event?.currentTarget;
    if (!btn) return;
    btn.classList.toggle('liked');
    // visual change: fill svg if liked
    const svg = btn.querySelector('svg');
    if (svg) svg.style.fill = btn.classList.contains('liked') ? 'var(--bordeaux)' : 'none';
  };

  // Insalata accordion
  window.toggleInsalata = function (btn) {
    btn = btn || event?.currentTarget;
    if (!btn) return;
    const card = btn.closest('.insalata-card');
    if (!card) return;
    const open = card.classList.toggle('open');
    const toggleBtn = card.querySelector('.insalata-toggle');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', String(open));
  };

  // Close language dropdown on outside click
  document.addEventListener('click', (ev) => {
    const langDd = q('.lang-dropdown');
    if (!langDd) return;
    if (!ev.target.closest('.lang-selector')) langDd.style.display = '';
  });

  // Close logo dropdown on outside click
  document.addEventListener('click', (ev) => {
    const logoDd = q('.logo-dropdown');
    if (!logoDd) return;
    if (!ev.target.closest('.nav-logo-selector')) logoDd.style.display = '';
  });

  // Small: hide search clear if empty on load
  document.addEventListener('DOMContentLoaded', function () {
    const s = q('#menuSearch');
    const clear = q('#searchClear');
    if (s && clear) clear.style.display = s.value ? 'flex' : 'none';
  });

})();
