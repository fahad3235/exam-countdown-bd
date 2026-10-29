/* exam-countdown-bd — pure logic, no DOM. UMD-style: works in browser and Node. */
(function (root) {
  'use strict';

  var BN_DIGITS = ['\u09e6', '\u09e7', '\u09e8', '\u09e9', '\u09ea', '\u09eb', '\u09ec', '\u09ed', '\u09ee', '\u09ef'];

  function toBnDigits(str) {
    return String(str).replace(/[0-9]/g, function (d) { return BN_DIGITS[+d]; });
  }

  function localizeNumber(n, lang) {
    var s = String(n);
    return lang === 'bn' ? toBnDigits(s) : s;
  }

  // Returns { past, days, hours, mins, secs, totalMs } for target - now.
  function diffParts(targetMs, nowMs) {
    var total = targetMs - nowMs;
    var past = total <= 0;
    var abs = Math.abs(total);
    var days = Math.floor(abs / 86400000);
    var hours = Math.floor((abs % 86400000) / 3600000);
    var mins = Math.floor((abs % 3600000) / 60000);
    var secs = Math.floor((abs % 60000) / 1000);
    return { past: past, days: days, hours: hours, mins: mins, secs: secs, totalMs: total };
  }

  // Urgency band for an upcoming exam (totalMs > 0).
  function urgency(totalMs) {
    if (totalMs <= 0) return 'overdue';
    if (totalMs < 3 * 86400000) return 'critical';
    if (totalMs < 7 * 86400000) return 'soon';
    return 'ok';
  }

  // Percent of the window [createdMs, targetMs] already elapsed at nowMs.
  // Returns null when the window is degenerate (target <= created).
  function progressPct(createdMs, targetMs, nowMs) {
    if (targetMs <= createdMs) return null;
    if (nowMs <= createdMs) return 0;
    if (nowMs >= targetMs) return 100;
    return Math.round(((nowMs - createdMs) / (targetMs - createdMs)) * 100);
  }

  function sortExams(exams, nowMs) {
    var upcoming = exams.filter(function (e) { return e.targetMs > nowMs; })
      .sort(function (a, b) { return a.targetMs - b.targetMs; });
    var past = exams.filter(function (e) { return e.targetMs <= nowMs; })
      .sort(function (a, b) { return b.targetMs - a.targetMs; });
    return upcoming.concat(past);
  }

  function validateExam(name, targetMs, nowMs) {
    if (!name || !name.trim()) return 'empty-name';
    if (!targetMs || isNaN(targetMs)) return 'bad-date';
    if (targetMs <= nowMs) return 'past-date';
    return null;
  }

  // Strict import: array of {name, targetMs} with sane values, capped at 200.
  function parseImport(data) {
    if (!Array.isArray(data)) return null;
    var out = [];
    for (var i = 0; i < data.length && out.length < 200; i++) {
      var e = data[i];
      if (!e || typeof e.name !== 'string' || !e.name.trim()) continue;
      var t = Number(e.targetMs);
      if (!isFinite(t) || t <= 0) continue;
      out.push({ name: e.name.trim().slice(0, 120), targetMs: t, createdMs: Date.now() });
    }
    return out;
  }

  var api = {
    toBnDigits: toBnDigits,
    localizeNumber: localizeNumber,
    diffParts: diffParts,
    urgency: urgency,
    progressPct: progressPct,
    sortExams: sortExams,
    validateExam: validateExam,
    parseImport: parseImport
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.ExamCountdown = api;
})(typeof window !== 'undefined' ? window : globalThis);
