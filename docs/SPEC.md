# Task Manager — Project Specification
Version: 0.2 (living document — update only when a decision actually changes)
Owner: [your name]
Sibling project: Dorm Laundry Booking System (https://leowash.netlify.app/)

---

## 1. Purpose

A free, self-hosted task manager for personal use now, extendable to team use later,
built on the same "zero ongoing cost, no third-party branding" philosophy as the
Dorm Laundry Booking System.

## 2. Core Requirements (locked decisions)

- **Auth**: Email + password (Supabase Auth). Real password reset via email — no admin-key hack.
- **Scheduling horizon**: tasks can be scheduled 3–4 weeks in advance.
- **MVP scope**: personal tasks only. Team functionality is Phase 2 — schema is
  designed team-ready from day one, but not exposed in the UI until Phase 2.
- **Views (MVP)**: both a Calendar/Timeline view (like laundry's day timeline) and
  a Kanban board (To Do / In Progress / Done).
- **Task richness**: title, description, priority, tags, start/end time, status,
  comments, attachments, assignee (defaults to self until teams ship).
- **Recurring tasks**: must-have in v1 (e.g. "every Monday").
- **Reminders**: browser notification only for now (like laundry). Email reminders
  explicitly deferred — do not build until re-requested.
- **Cost**: must remain free indefinitely (same constraint as laundry project).
- **Codebase shape**: multiple small files, not one giant HTML file — see §3 and §4.
  This is a deliberate choice so any single file can be built or fixed in a fresh
  chat, by any LLM, using only that file's contract (not the whole app) as context.

## 3. Architecture

| Layer | Technology | Role |
|---|---|---|
| Frontend | Multiple plain HTML/CSS/JS files, loaded as native ES modules (`<script type="module">`) — **no bundler, no build step**. The browser loads files directly over HTTPS. | Login, calendar view, kanban view, task detail |
| Hosting | Netlify (free tier) | Serves the `/app` folder permanently; deploy = push to GitHub (auto-deploy) |
| Auth | Supabase Auth | Email/password, password reset emails |
| Database | Supabase (free-tier PostgreSQL) | Tasks, series, attachments, comments — RLS enabled |
| Storage | Supabase Storage (free tier) | Task attachments, size-capped |
| Source control | GitHub (public repo — see BEGINNER_GUIDE.md §3 for why public is fine here) | Single source of truth for code |

**Why native ES modules instead of a bundler:** browsers have supported
`import`/`export` directly for years. As long as every `<script>` tag has
`type="module"` and import paths include the `.js` extension, this works with
zero build tooling — you edit a file, refresh the browser, done. This is what
makes the multi-file split possible without adding Webpack/Vite/etc.

## 4. Module Map & File Contracts

This is the most important section for working across multiple chats/LLMs.
**Each file has an "interface" — the functions it exports and what they take
in/return — and a "depends on" list of other files' interfaces only (never
their internal implementation).** A new chat building `tasks-api.js` only
needs this table's `tasks-api.js` row plus the data model (§5) — nothing else.

```
app/
├── index.html              entry point — loads main.js as a module
├── css/
│   └── style.css           all styling (plain CSS, no preprocessor)
└── js/
    ├── main.js              wires everything together, handles page routing
    ├── supabase-client.js   creates & exports the one shared Supabase client
    ├── auth.js               sign up / sign in / sign out / session state
    ├── tasks-api.js          all task CRUD + realtime subscription
    ├── recurrence.js         expands a recurring series into instances
    ├── calendar-view.js      renders the calendar/day-timeline view
    ├── kanban-view.js        renders the kanban board + drag/drop
    ├── reminders.js          checks upcoming tasks, fires browser notifications
    ├── ui-effects.js         reusable motion helpers (ripple, confetti, spring toggle, etc.)
    └── utils.js              date formatting, debounce, small shared helpers
```

| File | Exports (contract) | Depends on (interfaces only) |
|---|---|---|
| `supabase-client.js` | `supabase` (initialized client instance) | — |
| `auth.js` | `signUp(email, pw)`, `signIn(email, pw)`, `signOut()`, `getSession()`, `onAuthChange(callback)` | `supabase-client.js` |
| `tasks-api.js` | `createTask(task)`, `updateTask(id, changes)`, `deleteTask(id)`, `listTasks(rangeStart, rangeEnd)`, `subscribeToTasks(callback)` | `supabase-client.js` |
| `recurrence.js` | `expandSeries(series, rangeStart, rangeEnd)` → returns an array of task instances | none (pure logic, no imports needed) |
| `calendar-view.js` | `renderCalendar(containerEl, tasks)`, `renderDayTimeline(containerEl, tasks, date)` | `ui-effects.js`, `utils.js` |
| `kanban-view.js` | `renderKanban(containerEl, tasks, onStatusChange)` | `ui-effects.js`, `utils.js` |
| `reminders.js` | `checkUpcomingReminders(tasks)` | `utils.js` |
| `ui-effects.js` | `rippleEffect(el)`, `confettiBurst(el)`, `springToggle(el)`, `checkboxDraw(el)`, `staggerIn(containerEl)` | none (pure DOM/CSS helpers) |
| `utils.js` | `formatDate(date)`, `formatTime(date)`, `debounce(fn, ms)` | none |
| `main.js` | (no exports — it's the entry point) | imports all of the above and wires them to `index.html` |

**Rule for any file you're about to build:** if it's not in that file's own
row of the table, you don't need it. This is what keeps a single-file task
small enough to hand to a fresh, low-context chat or a free-tier model.

## 5. Data Model (draft — refine in Sprint 0)

```
users            (managed by Supabase Auth)

tasks
  id, user_id, team_id (null for now), title, description,
  status (todo | in_progress | done), priority (low | med | high),
  tags text[], start_time, end_time, series_id (nullable), assignee_id (defaults to user_id)

series            -- recurrence templates
  id, user_id, freq (daily|weekly|custom), interval, until_date, template_title, template_duration

attachments
  id, task_id, storage_path, filename, size_bytes

comments
  id, task_id, user_id, body, created_at
```

RLS policy on all four tables: a row is readable/writable only if `auth.uid() = user_id`
(or, once teams ship, if `auth.uid()` is a member of `team_id`).

## 6. Free-tier watchpoints

- Supabase Storage: 1GB free — cap individual attachments (e.g. 5MB) and prune
  attachments on tasks completed >X months ago, same spirit as laundry's auto-cleanup.
- Supabase DB pauses after ~1 week of no activity — same known limitation as laundry,
  same fix (manual resume or a free ping service).
- Netlify: 300 build credits/month — irrelevant for static files; watch if
  GitHub auto-deploy is set up (each push = 1 build).

## 7. Visual Design & Motion

Inspiration source: https://kinetics.colorion.co/ (a library of spring-physics
micro-interactions, each shipped as copy-pasteable CSS/React). We are not
importing the library — we're hand-picking specific effects and re-implementing
them in plain CSS/JS inside `ui-effects.js` (see §4). Effects are assigned to
the file/sprint that introduces the relevant UI, not bolted on at the end.

| Effect (from Kinetics) | Where it's used | Lives in | Sprint |
|---|---|---|---|
| Checkbox Draw (tick draws itself via SVG stroke) | Marking a task done | `ui-effects.js` | Sprint 1 |
| Stagger Entrance (list items rise in on load) | Task list / calendar appearing | `ui-effects.js` | Sprint 1 |
| Reorderable List (drag, others shift with a spring) | Dragging cards between Kanban columns | `kanban-view.js` | Sprint 2 |
| Confetti Burst | Completing a task | `ui-effects.js` | Sprint 2 |
| Toast/Undo Snackbar (slide up, timed drain bar) | "Task deleted — Undo" | `ui-effects.js` | Sprint 2 |
| Ripple Feedback | All primary buttons | `ui-effects.js` | Sprint 1 |
| Switch Spring (overshooting toggle knob) | Recurring-task on/off, settings toggles | `ui-effects.js` | Sprint 3 |
| Skeleton Sweep | Loading state while fetching tasks | `ui-effects.js` | Sprint 1 |
| Squish Button (press/release spring) | All buttons, base interaction feel | `css/style.css` | Sprint 1 |

### Locked theme decision

- **Light mode** = "Nordic Minimal": bg `#f4f5f7`, surface `#ffffff`, text `#1c1e22`,
  accent `#2f5dff`, accent2 `#00b37e`, font Inter.
- **Dark mode** = "Terminal Precision": bg `#0a0b0d`, surface `#111316`/`#161a19`,
  text `#d7f5df`, accent `#39ff8f`, accent2 `#ffb454`, font JetBrains Mono for
  technical/monospace accents (labels, tags), Inter for body text.
- Implemented as CSS custom properties on `:root`, swapped via a `data-theme`
  attribute — same mechanism as the design-comparison prototype. `ui-effects.js`
  should not hardcode colors; always read CSS variables.
- **Progress visualization** (for subject/topic mastery tracking, e.g. study
  prep grouped by chapter): **Progress Ring** — an SVG circle with animated
  `stroke-dashoffset`, percentage in the center. Chosen over a speedometer,
  segmented dial, or fuel-gauge alternative for being the cleanest and most
  reusable at different sizes (dashboard badge vs full-screen view).

Rule of thumb: motion should confirm an action (done, deleted, saved) or ease a
transition (list appearing, dragging), never be decorative-only.

## 10. Portfolio & Career Extensions (optional, sequenced after MVP)

Added because this project is also a portfolio piece for Werkstudent
applications in Germany. Priority: working MVP first, then these, in order:

1. **Unit tests** for `utils.js` and `recurrence.js` (Vitest, free) — these
   are pure functions, the easiest and highest-value place to start testing.
2. **GitHub Actions CI** (free on public repos) — run tests on every push.
3. **Natural-language task input** — parse something like "remind me to
   submit report every Friday" into a structured task. Use **Groq** or
   **Google Gemini API** (both free-tier, sustainable long-term, not just
   trial credits) for the LLM call — one `fetch()` request, no SDK needed.
   Standout feature for AI-track roles — directly uses the degree.
3b. **Semantic task search** — use **Transformers.js** to generate text
   embeddings **directly in the browser** (no server, no API key, zero
   ongoing cost) and store them in Supabase's free **pgvector** extension.
   Lets users search by meaning, not just keywords.
3c. **Weekly AI summary** — one Groq/Gemini call a week, turning completed
   tasks into a short natural-language recap. Cheap, good "data → insight" demo.
4. **README polish**: screenshot/GIF, architecture diagram, a short
   "engineering decisions" section (why ES modules not React, why Supabase
   RLS not a custom backend), a "what I learned" section.
5. **Accessibility pass**: keyboard-operable kanban drag, ARIA labels.
6. **Lighthouse score** in the README — small files + no framework should
   score well with little extra work.

See docs/LEARNING_PLAN.md for how each core file maps to a concept and an
interview-ready talking point.

## 11. Explicitly out of scope for now

- Teams, invites, roles, shared boards, activity feed (Phase 2)
- Email reminders (deferred, not forgotten)
- Multilingual (EN/DE) — still unconfirmed, resolve before Sprint 6.

## 12. Versioning convention

Semantic-ish: v0.x = pre-teams MVP increments, v1.0 = MVP complete and stable,
v1.x = MVP refinements, v2.0 = teams launch. Each version bump = one sprint's
worth of shipped, working functionality — not a work-in-progress commit.
