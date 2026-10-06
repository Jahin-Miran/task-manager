# The "I'm Lost" Guide
Read this if you forgot what to do, or you're starting fresh. No coding
knowledge needed to follow these steps — just go one at a time.

---

## Part 1: The big picture (30 seconds)

Think of your project like a **school folder**:

- **GitHub** = the shelf where your folder lives forever, safely, online.
- **VS Code** = the desk where you actually open the folder and write in it.
- **Netlify** = the photocopier that takes what's in the folder and puts it on
  the internet so anyone can see it.
- **Supabase** = the filing cabinet that remembers your tasks and logins.
- **SPEC.md / STATUS.md** = two sticky notes on the folder: one says "the
  rules we're following," the other says "what we've done so far."

Every time you want help from an AI, you don't explain the whole project by
hand — you just hand it those two sticky notes (or the link to them).

---

## Part 2: Install the tools (one-time setup)

Do these in order. Each one takes a few minutes.

### Step 1 — Install VS Code
This is the "desk" where you'll write and edit files.
1. Go to https://code.visualstudio.com
2. Click the big **Download** button for your operating system.
3. Open the downloaded file and click Next → Next → Install → Finish.

### Step 2 — Install Git
This is the tool that lets VS Code talk to GitHub.
1. Go to https://git-scm.com/downloads
2. Download it for your operating system.
3. Install it with all the default options (just keep clicking Next).
4. To check it worked: open VS Code, press `` Ctrl+` `` (backtick, top-left
   of your keyboard) to open the terminal at the bottom, type `git --version`,
   press Enter. If you see a version number, it worked.

### Step 3 — Connect VS Code to GitHub
1. In VS Code, click the little icon on the far-left sidebar that looks like
   a branch (**Source Control**).
2. Click **Sign in with GitHub** if it's offered, or:
3. Open the Command Palette (`Ctrl+Shift+P` on Windows/Linux,
   `Cmd+Shift+P` on Mac), type "GitHub", choose **GitHub: Sign in**, and
   follow the browser prompt.

---

## Part 3: Create the project on GitHub

1. Go to https://github.com and log in.
2. Click the **+** icon (top right) → **New repository**.
3. Name it `task-manager`.
4. Set it to **Public** (this lets you paste raw links to any AI later — see
   Part 5. Don't worry, nothing secret ever goes in this repo).
5. Check **Add a README file**.
6. Click **Create repository**.

## Part 4: Bring it into VS Code

1. On your new GitHub repo page, click the green **Code** button, copy the
   HTTPS link (looks like `https://github.com/yourname/task-manager.git`).
2. In VS Code: Command Palette (`Ctrl+Shift+P`) → type "Git: Clone" → Enter.
3. Paste the link, press Enter.
4. Choose a folder on your computer to save it in (e.g. Desktop).
5. Click **Open** when VS Code asks if you want to open the cloned folder.

You now have the project on your computer, connected to GitHub.

---

## Part 5: The project map (what goes where)

The app is split into small files on purpose — each one is a tiny, separate
job, so a fresh AI chat (or even a free/basic model) can build just one of
them without needing to understand the whole app.

```
task-manager/
│
├── README.md               ← what this project is (GitHub shows this first)
│
├── docs/                   ← the "sticky notes" — planning & handoff files
│   ├── SPEC.md              ← the rules, architecture & file contracts (rarely changes)
│   ├── STATUS.md            ← a checklist, one row per file (update after each file)
│   ├── BEGINNER_GUIDE.md    ← this file
│   └── HANDOFF_PROMPT.md    ← the copy-paste template for new AI chats
│
└── app/                    ← the actual app — many small files
    ├── index.html            ← the single page that loads everything
    ├── css/
    │   └── style.css         ← all the styling
    └── js/
        ├── main.js            ← wires all the pieces together
        ├── supabase-client.js ← connects to the database
        ├── auth.js            ← login / logout
        ├── tasks-api.js       ← create / edit / delete tasks
        ├── recurrence.js      ← "every Monday" repeating logic
        ├── calendar-view.js   ← the calendar screen
        ├── kanban-view.js     ← the board screen
        ├── reminders.js       ← the "starting soon" popup
        ├── ui-effects.js      ← the nice animations
        └── utils.js           ← small helper functions
```

Every file already exists as an empty "contract" — a few sentences saying
what it's supposed to do, but no actual logic yet. That's intentional: it
means picking your next task is as easy as opening `docs/STATUS.md` and
finding the next unchecked box.

**Why this shape:** `docs/` never gets touched by whichever AI is writing
code — it's just the map. `app/` is where all real building happens, one
small file at a time. This is also what makes the "different chat, different
AI, don't waste tokens" workflow possible — see Part 7.

I've attached this exact folder (zipped, with all the empty files already in
place) at the end of this guide — unzip it straight into your cloned repo
folder instead of typing it all by hand.

---

## Part 6: Your day-to-day loop

This is what you'll repeat every time you (or an AI) makes progress:

1. **Open** VS Code, open the `task-manager` folder.
2. **Work** — either you edit files, or you paste the handoff prompt (Part 7)
   into an AI chat and paste back whatever code it gives you into the `app/`
   folder.
3. **Save** your files (`Ctrl+S`).
4. **Commit & push** — this is how changes get saved to GitHub forever:
   - Click the **Source Control** icon (left sidebar).
   - You'll see a list of changed files. Click the **+** next to each (or the
     one **+** at the top to stage everything).
   - Type a short message in the box at the top, e.g. `Sprint 1: task list view`.
   - Click the blue **Commit** button, then click **Sync Changes** (or
     **Push**) to send it to GitHub.
5. **Update STATUS.md** — a couple of lines about what changed. Commit and
   push again.

That's the whole loop. Nothing fancier than that.

---

## Part 7: Starting a new AI chat without wasting credits

The project is built one small file at a time. Every time you're ready for
the next file (or your current chat is getting slow/expensive):

1. Open `docs/STATUS.md`, find the next unchecked row in the file table.
2. Open a new chat with any AI — see "Picking a model" in
   `docs/HANDOFF_PROMPT.md` for which kind of AI/model suits that particular
   file (some files are simple enough for a free model).
3. Open `docs/HANDOFF_PROMPT.md`, copy everything below the line.
4. Paste it into the new chat, filling in just that one file's name and its
   contract row from `SPEC.md` §4 — you do not need to paste the whole
   project's history or documents, just that one small slice.
5. When the AI gives you the finished file, paste it into that file in VS
   Code, tick the row in `STATUS.md`, then commit and push (Part 6).
6. **Instead of pasting file contents by hand**, you can just give the AI
   the GitHub **raw** link, if it can browse the web:
   - Go to the file on GitHub, click **Raw**, copy that URL.
   - It looks like:
     `https://raw.githubusercontent.com/yourname/task-manager/main/docs/STATUS.md`
   - Paste that link in your message instead of the file contents. Any AI
     that can fetch web pages will read it directly — no copy-paste needed.
   - If the AI can't browse, just paste the file's text instead. Both work.

---

## Part 8: If you're completely stuck

- **"I don't know what to do next"** → open `docs/STATUS.md`, read "Next
  action," that's your answer.
- **"I broke something"** → in VS Code's Source Control panel, you can right-
  click a file and choose "Discard Changes" to undo everything since your
  last commit. Nothing is ever truly lost as long as you commit often.
- **"The website looks broken after I changed something"** → check
  `docs/STATUS.md` → Sprint 0 will explain how deploys work once it's done;
  in short, changes only show up after you push to GitHub (and Netlify picks
  it up automatically once we connect them in Sprint 0).
- **"I want a human/AI to just tell me what to click"** → paste this exact
  question, plus a screenshot if you can, into a new AI chat along with the
  handoff prompt. That's exactly what it's for.

You've got this. One sprint at a time.
