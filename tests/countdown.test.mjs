import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const L = require('../logic.js');

const DAY = 86400000;

// diffParts
{
  const d = L.diffParts(2 * DAY + 3 * 3600000 + 4 * 60000 + 5000, 0);
  assert.equal(d.past, false);
  assert.deepEqual([d.days, d.hours, d.mins, d.secs], [2, 3, 4, 5]);
  const p = L.diffParts(0, DAY);
  assert.equal(p.past, true);
  assert.equal(p.days, 1);
  const zero = L.diffParts(1000, 1000);
  assert.equal(zero.past, true);
  assert.equal(zero.secs, 0);
}

// urgency bands
assert.equal(L.urgency(-1), 'overdue');
assert.equal(L.urgency(2 * DAY), 'critical');
assert.equal(L.urgency(3 * DAY - 1), 'critical');
assert.equal(L.urgency(3 * DAY), 'soon');
assert.equal(L.urgency(6 * DAY), 'soon');
assert.equal(L.urgency(7 * DAY), 'ok');
assert.equal(L.urgency(30 * DAY), 'ok');

// progressPct
assert.equal(L.progressPct(0, 100, 25), 25);
assert.equal(L.progressPct(0, 100, 0), 0);
assert.equal(L.progressPct(0, 100, 100), 100);
assert.equal(L.progressPct(0, 100, 150), 100);
assert.equal(L.progressPct(100, 100, 100), null);
assert.equal(L.progressPct(100, 50, 75), null);

// sortExams: upcoming ascending, then past descending
{
  const now = 1000;
  const exams = [
    { name: 'past-old', targetMs: 100 },
    { name: 'up-late', targetMs: 5000 },
    { name: 'past-new', targetMs: 900 },
    { name: 'up-soon', targetMs: 2000 },
  ];
  assert.deepEqual(L.sortExams(exams, now).map((e) => e.name),
    ['up-soon', 'up-late', 'past-new', 'past-old']);
}

// validateExam
assert.equal(L.validateExam('', 2000, 1000), 'empty-name');
assert.equal(L.validateExam('  ', 2000, 1000), 'empty-name');
assert.equal(L.validateExam('X', NaN, 1000), 'bad-date');
assert.equal(L.validateExam('X', 500, 1000), 'past-date');
assert.equal(L.validateExam('X', 1000, 1000), 'past-date');
assert.equal(L.validateExam('X', 2000, 1000), null);

// parseImport: strict, caps, trims
{
  assert.equal(L.parseImport({}), null);
  assert.equal(L.parseImport('nope'), null);
  const out = L.parseImport([
    { name: '  ENG 102  ', targetMs: 5000 },
    { name: '', targetMs: 5000 },
    { name: 'Bad', targetMs: -5 },
    { name: 'NoTime' },
    { name: 'OK', targetMs: '6000' },
  ]);
  assert.equal(out.length, 2);
  assert.equal(out[0].name, 'ENG 102');
  assert.equal(out[1].targetMs, 6000);
}

// Bengali digits
assert.equal(L.toBnDigits('2026-10-29'), '\u09e8\u09e6\u09e8\u09ec-\u09e7\u09e6-\u09e8\u09ef');
assert.equal(L.localizeNumber(5, 'en'), '5');
assert.equal(L.localizeNumber(5, 'bn'), '\u09eb');

console.log('All countdown logic tests passed.');
