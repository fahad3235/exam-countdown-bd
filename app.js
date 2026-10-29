/* exam-countdown-bd \u2014 UI. All user-visible text comes from I18N below. */
(function () {
  'use strict';
  var L = window.ExamCountdown;

  var I18N = {
    en: {
      tagline: 'Never miss an exam date again.',
      heroLabel: 'Next exam',
      heroEmpty: 'No upcoming exams. Add your first exam below.',
      days: 'days', hours: 'hours', mins: 'mins', secs: 'secs',
      ago: 'ago', overdue: 'Overdue', critical: 'Under 3 days!', soon: 'Under 7 days', ok: 'On track',
      addTitle: 'Add an exam', namePh: 'Exam name (e.g. ENG 102 Mid)',
      dateLabel: 'Date & time', addBtn: 'Add exam', cancelEdit: 'Cancel edit',
      editBtn: 'Edit', delBtn: 'Delete', confirmDel: 'Delete this exam?',
      searchPh: 'Search exams\u2026', filterAll: 'All', filterUp: 'Upcoming', filterPast: 'Past',
      emptyList: 'No exams yet. Add one above to start the countdown.',
      emptySearch: 'No exams match your search.',
      exportBtn: 'Export JSON', importBtn: 'Import JSON', importOk: 'imported',
      importBad: 'That file is not a valid exam list.',
      errEmptyName: 'Please type an exam name.', errBadDate: 'Please pick a valid date & time.',
      errPastDate: 'The exam date must be in the future.',
      saved: 'Saved.', deleted: 'Deleted.', edited: 'Updated.',
      progressLabel: 'Time elapsed', totalExams: 'exams', upcomingCount: 'upcoming',
      footer: 'Offline personal tool. Your exams stay in this browser only \u2014 nothing is uploaded.',
      langBtn: '\u09ac\u09be\u0982\u09b2\u09be'
    },
    bn: {
      tagline: '\u0986\u09b0 \u0995\u09cb\u09a8\u09cb \u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u09be\u09b0 \u09a4\u09be\u09b0\u09bf\u0996 \u09ae\u09bf\u09b8 \u09b9\u09ac\u09c7 \u09a8\u09be\u0964',
      heroLabel: '\u09aa\u09b0\u09ac\u09b0\u09cd\u09a4\u09c0 \u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u09be',
      heroEmpty: '\u0995\u09cb\u09a8\u09cb \u0986\u09b8\u09a8\u09cd\u09a8 \u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u09be \u09a8\u09c7\u0987\u0964 \u09a8\u09bf\u099a\u09c7 \u09aa\u09cd\u09b0\u09a5\u09ae \u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u09be\u099f\u09bf \u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8\u0964',
      days: '\u09a6\u09bf\u09a8', hours: '\u0998\u09a3\u09cd\u099f\u09be', mins: '\u09ae\u09bf\u09a8\u09bf\u099f', secs: '\u09b8\u09c7\u0995\u09c7\u09a8\u09cd\u09a1',
      ago: '\u0986\u0997\u09c7', overdue: '\u09b8\u09ae\u09af\u09bc \u09aa\u09be\u09b0 \u09b9\u09af\u09bc\u09c7 \u0997\u09c7\u099b\u09c7', critical: '\u09e9 \u09a6\u09bf\u09a8\u09c7\u09b0 \u0995\u09ae \u09ac\u09be\u0995\u09bf!', soon: '\u09ed \u09a6\u09bf\u09a8\u09c7\u09b0 \u0995\u09ae \u09ac\u09be\u0995\u09bf', ok: '\u09a0\u09bf\u0995 \u0986\u099b\u09c7',
      addTitle: '\u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u09be \u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8', namePh: '\u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u09be\u09b0 \u09a8\u09be\u09ae (\u09af\u09c7\u09ae\u09a8: ENG 102 \u09ae\u09bf\u09a1)',
      dateLabel: '\u09a4\u09be\u09b0\u09bf\u0996 \u0993 \u09b8\u09ae\u09af\u09bc', addBtn: '\u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u09be \u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8', cancelEdit: '\u09b8\u09ae\u09cd\u09aa\u09be\u09a6\u09a8\u09be \u09ac\u09be\u09a4\u09bf\u09b2',
      editBtn: '\u09b8\u09ae\u09cd\u09aa\u09be\u09a6\u09a8\u09be', delBtn: '\u09ae\u09c1\u099b\u09c1\u09a8', confirmDel: '\u098f\u0987 \u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u09be\u099f\u09bf \u09ae\u09c1\u099b\u09ac\u09c7\u09a8?',
      searchPh: '\u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u09be \u0996\u09c1\u0981\u099c\u09c1\u09a8\u2026', filterAll: '\u09b8\u09ac', filterUp: '\u0986\u09b8\u09a8\u09cd\u09a8', filterPast: '\u0985\u09a4\u09c0\u09a4',
      emptyList: '\u098f\u0996\u09a8\u09cb \u0995\u09cb\u09a8\u09cb \u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u09be \u09a8\u09c7\u0987\u0964 \u0995\u09be\u0989\u09a8\u09cd\u099f\u09a1\u09be\u0989\u09a8 \u09b6\u09c1\u09b0\u09c1 \u0995\u09b0\u09a4\u09c7 \u0989\u09aa\u09b0\u09c7 \u098f\u0995\u099f\u09bf \u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8\u0964',
      emptySearch: '\u0996\u09c1\u0981\u099c\u09c7 \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf\u0964',
      exportBtn: 'JSON \u098f\u0995\u09cd\u09b8\u09aa\u09cb\u09b0\u09cd\u099f', importBtn: 'JSON \u0987\u09ae\u09aa\u09cb\u09b0\u09cd\u099f', importOk: '\u099f\u09bf \u0987\u09ae\u09aa\u09cb\u09b0\u09cd\u099f \u09b9\u09af\u09bc\u09c7\u099b\u09c7',
      importBad: '\u098f\u0987 \u09ab\u09be\u0987\u09b2\u099f\u09bf \u09b8\u09a0\u09bf\u0995 \u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u09be\u09b0 \u09a4\u09be\u09b2\u09bf\u0995\u09be \u09a8\u09af\u09bc\u0964',
      errEmptyName: '\u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u09be\u09b0 \u09a8\u09be\u09ae \u09b2\u09bf\u0996\u09c1\u09a8\u0964', errBadDate: '\u09b8\u09a0\u09bf\u0995 \u09a4\u09be\u09b0\u09bf\u0996 \u0993 \u09b8\u09ae\u09af\u09bc \u09ac\u09c7\u099b\u09c7 \u09a8\u09bf\u09a8\u0964',
      errPastDate: '\u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u09be\u09b0 \u09a4\u09be\u09b0\u09bf\u0996 \u09ad\u09ac\u09bf\u09b7\u09cd\u09af\u09a4\u09c7\u09b0 \u09b9\u09a4\u09c7 \u09b9\u09ac\u09c7\u0964',
      saved: '\u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09bf\u09a4\u0964', deleted: '\u09ae\u09cb\u099b\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964', edited: '\u0986\u09aa\u09a1\u09c7\u099f \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964',
      progressLabel: '\u09b8\u09ae\u09af\u09bc \u0985\u09a4\u09bf\u09ac\u09be\u09b9\u09bf\u09a4', totalExams: '\u099f\u09bf \u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u09be', upcomingCount: '\u099f\u09bf \u0986\u09b8\u09a8\u09cd\u09a8',
      footer: '\u0985\u09ab\u09b2\u09be\u0987\u09a8 \u09ac\u09cd\u09af\u0995\u09cd\u09a4\u09bf\u0997\u09a4 \u099f\u09c1\u09b2\u0964 \u0986\u09aa\u09a8\u09be\u09b0 \u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u09be\u09b0 \u09a4\u09a5\u09cd\u09af \u09b6\u09c1\u09a7\u09c1 \u098f\u0987 \u09ac\u09cd\u09b0\u09be\u0989\u099c\u09be\u09b0\u09c7\u0987 \u09a5\u09be\u0995\u09c7 \u2014 \u0995\u09bf\u099b\u09c1\u0987 \u0986\u09aa\u09b2\u09cb\u09a1 \u09b9\u09af\u09bc \u09a8\u09be\u0964',
      langBtn: 'English'
    }
  };

  var KEY = 'exam-countdown-bd-v1';
  var LANG_KEY = 'exam-countdown-bd-lang';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function save(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} }

  var state = {
    exams: load(),
    lang: localStorage.getItem(LANG_KEY) || 'en',
    filter: 'all',
    query: '',
    editingId: null
  };

  function t(k) { return I18N[state.lang][k]; }
  function n(v) { return L.localizeNumber(v, state.lang); }

  var $ = function (id) { return document.getElementById(id); };

  function fmtDate(ms) {
    var d = new Date(ms);
    var pad = function (x) { return (x < 10 ? '0' : '') + x; };
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var s = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
    return state.lang === 'bn' ? L.toBnDigits(s.replace(/[A-Za-z]+/, function (m) {
      var bn = { Jan: '\u099c\u09be\u09a8\u09c1', Feb: '\u09ab\u09c7\u09ac\u09cd\u09b0\u09c1', Mar: '\u09ae\u09be\u09b0\u09cd\u099a', Apr: '\u098f\u09aa\u09cd\u09b0\u09bf\u09b2', May: '\u09ae\u09c7', Jun: '\u099c\u09c1\u09a8', Jul: '\u099c\u09c1\u09b2\u09be\u0987', Aug: '\u0986\u0997\u09b8\u09cd\u099f', Sep: '\u09b8\u09c7\u09aa\u09cd\u099f\u09c7', Oct: '\u0985\u0995\u09cd\u099f\u09cb', Nov: '\u09a8\u09ad\u09c7', Dec: '\u09a1\u09bf\u09b8\u09c7' };
      return bn[m] || m;
    })) : s;
  }

  function toast(msg) {
    var el = $('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.classList.remove('show'); }, 2500);
  }

  function render() {
    var now = Date.now();
    var sorted = L.sortExams(state.exams, now);
    var upcoming = sorted.filter(function (e) { return e.targetMs > now; });
    var past = sorted.filter(function (e) { return e.targetMs <= now; });

    // Static labels
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      el.placeholder = t(el.getAttribute('data-i18n-ph'));
    });
    $('langBtn').textContent = t('langBtn');
    $('stats').textContent = n(state.exams.length) + ' ' + t('totalExams') + ' \u00b7 ' + n(upcoming.length) + ' ' + t('upcomingCount');

    // Hero
    var hero = $('hero');
    if (!upcoming.length) {
      hero.innerHTML = '<p class="hero-empty">' + t('heroEmpty') + '</p>';
    } else {
      var next = upcoming[0];
      var d = L.diffParts(next.targetMs, now);
      var u = L.urgency(d.totalMs);
      var badge = u === 'critical' ? t('critical') : u === 'soon' ? t('soon') : t('ok');
      var pct = L.progressPct(next.createdMs, next.targetMs, now);
      hero.innerHTML =
        '<p class="hero-label">' + t('heroLabel') + ' \u00b7 <span class="badge ' + u + '">' + badge + '</span></p>' +
        '<h2 class="hero-name">' + escapeHtml(next.name) + '</h2>' +
        '<p class="hero-date">' + fmtDate(next.targetMs) + '</p>' +
        '<div class="hero-digits">' +
        digit(d.days, t('days')) + digit(d.hours, t('hours')) +
        digit(d.mins, t('mins')) + digit(d.secs, t('secs')) + '</div>' +
        (pct === null ? '' : '<p class="hero-progress-label">' + t('progressLabel') + ': ' + n(pct) + '%</p>' +
          '<div class="bar"><div class="bar-fill" style="width:' + pct + '%"></div></div>');
    }

    // List
    var list = $('list');
    var shown = sorted.filter(function (e) {
      if (state.filter === 'up' && e.targetMs <= now) return false;
      if (state.filter === 'past' && e.targetMs > now) return false;
      if (state.query && e.name.toLowerCase().indexOf(state.query.toLowerCase()) === -1) return false;
      return true;
    });
    if (!state.exams.length) {
      list.innerHTML = '<p class="empty">' + t('emptyList') + '</p>';
    } else if (!shown.length) {
      list.innerHTML = '<p class="empty">' + t('emptySearch') + '</p>';
    } else {
      list.innerHTML = shown.map(function (e) {
        var d = L.diffParts(e.targetMs, now);
        var u = L.urgency(d.totalMs);
        var line = d.past
          ? t('overdue') + ' \u00b7 ' + n(d.days) + ' ' + t('days') + ' ' + n(d.hours) + ' ' + t('hours') + ' ' + t('ago')
          : n(d.days) + ' ' + t('days') + ' ' + n(d.hours) + ' ' + t('hours') + ' ' + n(d.mins) + ' ' + t('mins') + ' ' + t('secs');
        return '<article class="card ' + u + '" data-id="' + e.id + '">' +
          '<div class="card-main"><h3>' + escapeHtml(e.name) + '</h3>' +
          '<p class="card-date">' + fmtDate(e.targetMs) + '</p>' +
          '<p class="card-count">' + line + '</p></div>' +
          '<div class="card-actions"><button class="btn small" data-act="edit">' + t('editBtn') + '</button>' +
          '<button class="btn small danger" data-act="del">' + t('delBtn') + '</button></div></article>';
      }).join('');
    }
    document.querySelectorAll('#filters .btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-filter') === state.filter);
    });
    $('formTitle').textContent = state.editingId ? t('editBtn') : t('addTitle');
    $('submitBtn').textContent = state.editingId ? t('edited') : t('addBtn');
    $('cancelEditBtn').style.display = state.editingId ? '' : 'none';
  }

  function digit(v, label) {
    return '<div class="digit"><span>' + n(v) + '</span><small>' + label + '</small></div>';
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function toDatetimeLocal(ms) {
    var d = new Date(ms);
    var pad = function (x) { return (x < 10 ? '0' : '') + x; };
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  $('examForm').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var name = $('nameInput').value.trim();
    var targetMs = new Date($('dateInput').value).getTime();
    var err = L.validateExam(name, targetMs, Date.now());
    if (err === 'empty-name') return toast(t('errEmptyName'));
    if (err === 'bad-date') return toast(t('errBadDate'));
    if (err === 'past-date') return toast(t('errPastDate'));
    if (state.editingId) {
      var ex = state.exams.find(function (e) { return e.id === state.editingId; });
      if (ex) { ex.name = name; ex.targetMs = targetMs; }
      state.editingId = null;
      toast(t('edited'));
    } else {
      state.exams.push({ id: 'e' + Date.now() + Math.floor(Math.random() * 1000), name: name, targetMs: targetMs, createdMs: Date.now() });
      toast(t('saved'));
    }
    save(state.exams);
    $('nameInput').value = '';
    $('dateInput').value = '';
    render();
  });

  $('cancelEditBtn').addEventListener('click', function () {
    state.editingId = null;
    $('nameInput').value = '';
    $('dateInput').value = '';
    render();
  });

  $('list').addEventListener('click', function (ev) {
    var btn = ev.target.closest('button[data-act]');
    if (!btn) return;
    var card = ev.target.closest('.card');
    var id = card.getAttribute('data-id');
    if (btn.getAttribute('data-act') === 'del') {
      if (!confirm(t('confirmDel'))) return;
      state.exams = state.exams.filter(function (e) { return e.id !== id; });
      save(state.exams);
      toast(t('deleted'));
    } else {
      var ex = state.exams.find(function (e) { return e.id === id; });
      if (!ex) return;
      state.editingId = id;
      $('nameInput').value = ex.name;
      $('dateInput').value = toDatetimeLocal(ex.targetMs);
      $('nameInput').focus();
    }
    render();
  });

  $('langBtn').addEventListener('click', function () {
    state.lang = state.lang === 'en' ? 'bn' : 'en';
    try { localStorage.setItem(LANG_KEY, state.lang); } catch (e) {}
    document.documentElement.lang = state.lang;
    render();
  });

  $('searchInput').addEventListener('input', function () {
    state.query = $('searchInput').value.trim();
    render();
  });

  $('filters').addEventListener('click', function (ev) {
    var b = ev.target.closest('button[data-filter]');
    if (!b) return;
    state.filter = b.getAttribute('data-filter');
    render();
  });

  $('exportBtn').addEventListener('click', function () {
    var blob = new Blob([JSON.stringify(state.exams.map(function (e) {
      return { name: e.name, targetMs: e.targetMs };
    }), null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'exam-countdown-bd.json';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  $('importFile').addEventListener('change', function () {
    var f = $('importFile').files[0];
    if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var parsed = L.parseImport(JSON.parse(r.result));
        if (!parsed) throw new Error('bad');
        state.exams = state.exams.concat(parsed);
        save(state.exams);
        toast(parsed.length + ' ' + t('importOk'));
        render();
      } catch (e) { toast(t('importBad')); }
    };
    r.readAsText(f);
    $('importFile').value = '';
  });

  document.documentElement.lang = state.lang;
  render();
  setInterval(render, 1000);
})();
