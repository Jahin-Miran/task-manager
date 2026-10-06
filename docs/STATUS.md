# Task Manager — Status
Last updated: 2026-08-11
Current version: v0.0 (pre-Sprint-0, planning complete, file skeleton created)

## Where things stand

Planning and architecture are locked (see SPEC.md). All files exist as empty
"contract stubs" (just function signatures, no logic) — see the table below.

## File-by-file build tracker

Work one row at a time. Each row is small enough to hand to a fresh chat —
paste that file's contract from SPEC.md §4, nothing else needed.

| File | Status | Sprint | Depends on (must be done first) |
|---|---|---|---|
| `js/utils.js` | ☐ not started | 0 | none |
| `js/supabase-client.js` | ☐ not started | 0 | none |
| `js/auth.js` | ☐ not started | 0 | supabase-client.js |
| `css/style.css` (base) | ☐ not started | 0 | none |
| `js/main.js` (bare shell: login only) | ☐ not started | 0 | auth.js |
| `js/tasks-api.js` | ☐ not started | 1 | supabase-client.js |
| `js/ui-effects.js` (ripple, checkboxDraw, staggerIn) | ☐ not started | 1 | none |
| `js/calendar-view.js` | ☐ not started | 1 | ui-effects.js, utils.js |
| `js/kanban-view.js` | ☐ not started | 2 | ui-effects.js, utils.js |
| `js/ui-effects.js` (confettiBurst, undo snackbar) | ☐ not started | 2 | none |
| `js/recurrence.js` | ☐ not started | 3 | none |
| `js/ui-effects.js` (springToggle) | ☐ not started | 3 | none |
| `js/reminders.js` | ☐ not started | 4 | utils.js |
| attachments + comments (extend tasks-api.js) | ☐ not started | 5 | tasks-api.js |
| polish + theming decision | ☐ not started | 6 | everything above |

## Next action

Start with the Sprint 0 row: `js/utils.js`. It has zero dependencies, so it's
the easiest possible first task and a good one to test the handoff workflow on.

## Open decisions (need your answer before the relevant sprint)

1. EN/DE toggle — carry over from laundry, or English-only for v1?

## Resolved decisions

- Light mode = "Nordic Minimal", dark mode = "Terminal Precision" (see SPEC.md §7 for exact colors)
   (Needed before Sprint 6.)

## Key links (fill in as they're created)

- GitHub repo: [ADD LINK]
- Supabase project: [ADD LINK]
- Netlify site: [ADD LINK]
- Sibling project (reference): https://leowash.netlify.app/
