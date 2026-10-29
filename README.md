# Exam Countdown BD

A free, fully offline exam-countdown dashboard for Bangladeshi students.
Add your exams, watch the next one tick down live (days / hours / minutes /
seconds), and see at a glance which exam needs attention first.

No account, no server, no tracking. Your exams live only in your browser's
localStorage — nothing is uploaded anywhere.

## Features

1. **Live ticking countdown** — the nearest upcoming exam counts down every
   second, with a big day/hour/minute/second display.
2. **Exam list with urgency bands** — under 3 days (red), under 7 days
   (amber), otherwise on track; past exams are marked overdue.
3. **Progress bar** — shows how much of the time since you added an exam has
   elapsed toward its date.
4. **Full CRUD + search/filter** — add, edit, delete, search by name, and
   filter All / Upcoming / Past.
5. **JSON export & strict import** — back up your exams or move them to
   another browser; malformed imports are rejected, never half-applied.
6. **Bilingual UI** — English / বাংলা toggle (persisted), with Bengali
   digits in Bangla mode. Responsive down to 390px wide.

## Stack

Plain HTML + CSS + vanilla JavaScript. Zero dependencies, zero build step,
zero network requests. Pure logic lives in `logic.js` so it can be unit
tested in Node; `app.js` owns the DOM.

## Run locally

Open `index.html` in any modern browser, or serve the folder:

```sh
npx serve .
# or
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Testing

```sh
node tests/countdown.test.mjs
```

The suite covers countdown math, urgency bands, progress percentage,
exam sorting, form validation, strict import parsing, and Bengali digit
conversion. A headless-Chrome smoke check (page loads, no console errors,
hero renders, add-exam flow works) was run against the local build before
release.

## Deployment

Static site — publish the folder as-is on GitHub Pages (main branch, root),
Netlify Drop, or any static host. No environment variables, no secrets.

## Limitations

- Data lives in one browser's localStorage; clearing site data deletes
  exams (use Export JSON for backups).
- Countdowns use the device clock — a wrong device clock means a wrong
  countdown.
- No reminders/notifications: the page must be open to see the countdown.
- Dates are entered by hand; the app cannot know your institution's real
  exam schedule — always double-check against your official routine.

## Status

MVP, complete and tested. Built as MUSE Project Factory run #177
(2026-10-29, 16:00 Asia/Dhaka slot).
