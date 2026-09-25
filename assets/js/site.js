/* ahmedoglu.github.io: small progressive enhancements. The site works without JavaScript. */
(function () {
  'use strict';
  var root = document.documentElement;

  /* ---------- Light / dark theme ---------- */
  var themeBtn = document.querySelector('.theme-toggle');
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  function activeTheme() {
    return root.getAttribute('data-theme') || (darkQuery.matches ? 'dark' : 'light');
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = activeTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------- Mobile navigation ---------- */
  var navBtn = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  function setMenu(open) {
    if (!navBtn || !menu) return;
    navBtn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  }
  if (navBtn && menu) {
    navBtn.addEventListener('click', function () {
      setMenu(navBtn.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); navBtn.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (menu.classList.contains('is-open') && !e.target.closest('.site-nav')) setMenu(false);
    });
  }

  /* ---------- Clipboard ---------- */
  function copyText(text, btn) {
    function done() {
      if (!btn) return;
      var label = btn.querySelector('span:not(.visually-hidden)');
      var old = label ? label.textContent : null;
      btn.classList.add('is-copied');
      if (label) label.textContent = 'Copied';
      setTimeout(function () {
        btn.classList.remove('is-copied');
        if (label) label.textContent = old;
      }, 1800);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(); done(); });
    } else { fallback(); done(); }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) { /* ignore */ }
      document.body.removeChild(ta);
    }
  }

  /* ---------- Delegated clicks: panels, copy, print ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target;
    var toggle = t.closest('[data-toggle]');
    if (toggle) {
      var panel = document.getElementById(toggle.getAttribute('data-toggle'));
      if (panel) {
        var open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!open));
        panel.hidden = open;
      }
      return;
    }
    var copy = t.closest('[data-copy]');
    if (copy) {
      var src = document.querySelector(copy.getAttribute('data-copy'));
      if (src) copyText(src.textContent.trim(), copy);
      return;
    }
    var copyAttr = t.closest('[data-copy-text]');
    if (copyAttr) { copyText(copyAttr.getAttribute('data-copy-text'), copyAttr); return; }
    if (t.closest('[data-print]')) window.print();
  });

  /* Print the CV with every collapsed section expanded */
  var reopened = [];
  window.addEventListener('beforeprint', function () {
    reopened = Array.prototype.filter.call(document.querySelectorAll('.cv-body details'), function (d) { return !d.open; });
    reopened.forEach(function (d) { d.open = true; });
  });
  window.addEventListener('afterprint', function () {
    reopened.forEach(function (d) { d.open = false; });
    reopened = [];
  });

  /* ---------- Writing page: search and topic filters ---------- */
  var list = document.getElementById('post-list');
  if (list) {
    var input = document.getElementById('post-search');
    var chips = Array.prototype.slice.call(document.querySelectorAll('.chip-btn[data-topic]'));
    var rows = Array.prototype.slice.call(list.querySelectorAll('.post-row'));
    var groups = Array.prototype.slice.call(list.querySelectorAll('.year-group'));
    var empty = document.querySelector('.no-results');
    var status = document.querySelector('.filter-status');
    var topic = '';

    var params = new URLSearchParams(window.location.search);
    if (params.get('topic')) topic = params.get('topic');
    if (params.get('q') && input) input.value = params.get('q');

    function apply() {
      var q = input ? input.value.trim().toLowerCase() : '';
      var shown = 0;
      rows.forEach(function (row) {
        var okTopic = !topic || row.getAttribute('data-topics').indexOf('|' + topic + '|') !== -1;
        var okText = !q || row.getAttribute('data-search').indexOf(q) !== -1;
        row.hidden = !(okTopic && okText);
        if (!row.hidden) shown++;
      });
      groups.forEach(function (g) { g.hidden = !g.querySelector('.post-row:not([hidden])'); });
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-topic') === topic)); });
      if (empty) empty.hidden = shown !== 0;
      if (status) status.textContent = (topic || q) ? shown + ' of ' + rows.length + ' essays' : '';
      var url = new URL(window.location.href);
      if (topic) url.searchParams.set('topic', topic); else url.searchParams.delete('topic');
      if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
    chips.forEach(function (c) {
      c.addEventListener('click', function () { topic = c.getAttribute('data-topic'); apply(); });
    });
    if (input) input.addEventListener('input', apply);
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-reset-filters]')) { topic = ''; if (input) input.value = ''; apply(); }
    });
    apply();
  }

  /* ---------- Table of contents: open state and current-section highlight ---------- */
  var tocNav = document.querySelector('.has-toc .toc');
  if (tocNav) {
    var links = Array.prototype.slice.call(tocNav.querySelectorAll('.toc-list a'));
    var heads = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
    var details = tocNav.querySelector('details');
    var wide = window.matchMedia('(min-width: 70rem)');
    function syncOpen() { if (details) details.open = wide.matches; }
    syncOpen();
    if (wide.addEventListener) wide.addEventListener('change', syncOpen);
    tocNav.addEventListener('click', function (e) {
      if (e.target.closest('a') && !wide.matches && details) details.open = false;
    });
    if ('IntersectionObserver' in window) {
      var current = null;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var link = links[heads.indexOf(en.target)];
          if (!link) return;
          if (current) current.classList.remove('is-active');
          current = link;
          current.classList.add('is-active');
        });
      }, { rootMargin: '0px 0px -70% 0px' });
      heads.forEach(function (h) { if (h) io.observe(h); });
    }
  }

  /* ---------- Photo galleries: group consecutive image-only paragraphs ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.talk-body'), function (body) {
    var paras = Array.prototype.filter.call(body.children, function (el) {
      return el.tagName === 'P' && el.children.length === 1 && el.firstElementChild.tagName === 'IMG' && !el.textContent.trim();
    });
    var run = [];
    function flush() {
      if (run.length >= 2) {
        var g = document.createElement('div');
        g.className = 'gallery';
        run[0].parentNode.insertBefore(g, run[0]);
        run.forEach(function (p) {
          var img = p.firstElementChild;
          var a = document.createElement('a');
          a.href = img.currentSrc || img.src;
          a.title = 'Open photo in full size';
          img.loading = 'lazy';
          a.appendChild(img); g.appendChild(a);
          p.parentNode.removeChild(p);
        });
      }
      run = [];
    }
    paras.forEach(function (p) {
      if (run.length && run[run.length - 1].nextElementSibling !== p) flush();
      run.push(p);
    });
    flush();
  });
})();
