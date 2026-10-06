# Learning Plan — What Each File Teaches You

Use this alongside STATUS.md. Each row is one concept cluster you'll actually
be able to explain in an interview after building it — that's the bar.

| File | Core concept(s) you'll practice | Interview-ready talking point |
|---|---|---|
| `utils.js` | Pure functions, JS Date handling, closures (for `debounce`) | "I understand why debounce needs a closure over a timer variable" |
| `supabase-client.js` | API clients, environment config, why keys are split (anon vs service role) | "I know the difference between a public and a privileged API key and why" |
| `auth.js` | Async/await, Promises, auth session lifecycle | "I can explain what a JWT session is and how Supabase Auth manages it" |
| `tasks-api.js` | CRUD, REST-ish patterns, Postgres Row Level Security | "I designed RLS policies so users can only ever see their own data" |
| `recurrence.js` | Algorithm design (date-range expansion), pure logic, edge cases | "I can walk through how I generate recurring instances without duplicates" |
| `calendar-view.js` | DOM manipulation, rendering from data, date math | "I built a calendar renderer without any UI framework" |
| `kanban-view.js` | Drag-and-drop APIs, event handling, optimistic UI updates | "I implemented drag-and-drop with the native HTML5 API, no library" |
| `reminders.js` | Browser Notification API, timers | "I used the native Notifications API instead of a paid service" |
| `ui-effects.js` | CSS transitions/animations, requestAnimationFrame basics | "I built spring-like motion without an animation library" |
| Sprint 0 setup | Git/GitHub workflow, environment variables, deployment | "I can explain my full deploy pipeline end to end" |
| (Later) AI feature | Prompt design, parsing structured output from an LLM | "I connected a small LLM feature end-to-end into a real product" |
| (Later) Tests + CI | Unit testing, GitHub Actions | "I have CI running tests automatically on every push" |

## How we'll work together in each session

1. I explain the concept briefly, with an example if it's new to you.
2. You attempt the function yourself.
3. You share what you wrote — I review it like a mentor, not a compiler:
   what's right, what's fragile, what you'd get asked about it in an interview.
4. We fix it together. I only write it for you if you're stuck after trying.

This is also what `HANDOFF_PROMPT.md`'s "Learning Mode" template sets up for
any other chat/LLM you use — so the teaching style stays consistent no
matter where you continue.
