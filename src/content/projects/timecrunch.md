---
id: "timecrunch"
title: "TimeCrunch"
description: "A realtime time tracker for development tasks"
image: "../../images/timecrunch/timecrunch.png"
imageAlt: "TimeCrunch app running on Windows"
initialCompletionDate: "2026-03-27"
lastUpdatedDate: "2026-04-23"
links:
  [
    {
      name: "TimeCrunch",
      url: "https://github.com/dLars99/timesheets",
      type: "github",
    },
  ]
tech: ["Tauri", "Rust", "React", "TypeScript", "SQLite", "Zustand", "Vite", "Azure"]
process: "Vibe coding at its finest: I wrote the requirements outline and a phased MVP plan up front, then built it with AI coding agents into a local-first Tauri desktop app, with signed macOS and Windows builds shipped from GitHub Actions, incorporating Azure to obtain the Windows application signature."
challenges: "The core problem to solve was keeping time accurate while constantly switching between tasks, making those transitions effortless for the user. Timer start and pause transitions live in the Rust backend behind Tauri IPC rather than in React state, so starting one task automatically pauses another and the totals are written straight to SQLite. If the app crashes mid-timer, the next launch detects the interrupted timer and asks whether to keep or discard the time instead of silently guessing, and closing the app warns first and logs anything still running."
---

TimeCrunch is a desktop time tracker built for days full of context switching.
Start a timer on a task, jump to another, and the first one pauses on its own.
At the end of the week, pull totals by project and export them for the
timesheet.

To solve a sudden need to track such things, this is vibe coding at its finest, begun and finished over the course of one weekend with only minor UI tweaks and bugfixes since.

It currently supports:

- Creating, editing, finishing, and reopening tasks, with an optional ticket number
- One-click switching between recent tasks
- Logging an interruption after the fact without pausing the current task
- User-defined projects, created inline
- Date-range totals by project, with CSV export of task rows and per-project summaries
- Crash recovery for timers that were running when the app went down

All data remains local to your machine thanks to a built-in SQLite database.