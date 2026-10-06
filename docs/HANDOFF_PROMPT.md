HOW TO USE THIS FILE
--------------------
1. Open docs/STATUS.md, find the next unchecked row in the file tracker.
2. Open a new chat (any LLM — see "Picking a model" below).
3. Paste the block below, filling in the ONE FILE from that row.
4. Paste in only what that row needs: the file's own current contents
   (it's just a stub) + its contract row from SPEC.md §4 + the data model
   (SPEC.md §5) if the file touches the database. That's usually it — you do
   NOT need to paste the whole SPEC.md or STATUS.md for most files.
5. When done, paste the finished code back into that file in VS Code, tick
   the row in STATUS.md, commit, push.

======================= COPY BELOW THIS LINE =======================

You are implementing exactly ONE file in a multi-file web app. Do not touch
any other file, do not redesign the contract, do not add features beyond
what's specified. A small, correct, self-contained file is the goal.

PROJECT: A free, self-hosted personal task manager (Supabase + Netlify,
plain HTML/CSS/JS loaded as native ES modules — no framework, no bundler, no
build step). Sibling project: https://leowash.netlify.app/ (same philosophy).

FILE TO BUILD: [e.g. "app/js/utils.js"]

CONTRACT for this file (from SPEC.md §4):
[paste just this file's row from the Module Map table — exports + depends-on]

CURRENT CONTENTS of this file (a stub — replace the throw/comment lines):
[paste the file's current content]

RELEVANT DATA MODEL (only if this file touches the database — from SPEC.md §5):
[paste only if relevant, otherwise delete this line]

Return the complete file, ready to paste back in. Keep it plain JS/CSS/HTML —
no imports beyond what the contract lists as dependencies.

======================= COPY ABOVE THIS LINE =======================

## Learning Mode (use this instead, if you want to write the code yourself)

Swap the template above for this one when you want to actually learn, not
just receive a finished file:

======================= COPY BELOW THIS LINE =======================

You are mentoring a bachelor's student in AI who is learning web development
by building this project. Do NOT write the full file for them. Instead:

1. Briefly explain the concepts this file needs (in plain terms, with a short
   example if useful) before they write anything.
2. Give them the function signatures (already in the contract) and ask them
   to attempt the implementation themselves, one function at a time.
3. When they share an attempt, review it like a mentor: point out what's
   right, what's wrong or fragile, and why — don't just hand over a fix.
   Ask a guiding question before giving the answer, if a hint would let them
   get there themselves.
4. Only write code for them if they explicitly ask you to, or after they've
   made a genuine attempt and are still stuck.
5. Keep explanations proportional to what's new — don't re-teach something
   they've already shown they know earlier in this file.

FILE TO BUILD: [e.g. "app/js/utils.js"]

CONTRACT for this file (from SPEC.md §4):
[paste just this file's row from the Module Map table]

MY CURRENT JAVASCRIPT LEVEL: [beginner / know the basics / comfortable but new to this pattern]

======================= COPY ABOVE THIS LINE =======================



Not every file needs your most powerful/expensive model:

- **No dependencies, pure logic** (`utils.js`, `recurrence.js`, `ui-effects.js`,
  `css/style.css`) → great fit for a free or cheap/small model. Small, testable,
  self-contained.
- **Touches Supabase/auth/data** (`supabase-client.js`, `auth.js`, `tasks-api.js`)
  → worth a stronger model once, since mistakes here are more expensive to debug.
- **Wires multiple files together** (`main.js`, later integration passes) →
  worth a stronger model with more context, since it needs to understand how
  pieces fit.

## Other ways to save tokens

- Test each file alone before wiring it in: open the browser console, paste
  a couple of calls to its exported functions, check the output. Cheaper than
  running the whole app to find one bug.
- Commit after every single file, not after every sprint. If a chat goes
  sideways, you only lose one small file's worth of context, not a whole sprint.
- Never paste this whole conversation history into a new chat — only the
  template above. That history is exactly what causes credits to burn fast.
