---
id: "jsbasic"
title: "jsBASIC"
description: "An in-browser BASIC interpreter for no reason whatsoever"
image: "../../images/jsbasic/jsbasic.png"
imageAlt: "jsBASIC editor"
initialCompletionDate: "2026-02-17"
lastUpdatedDate: "2026-05-01"
links:
  [
    {
      name: "jsBASIC",
      url: "https://github.com/dLars99/jbasic",
      type: "github",
    },
  ]
tech: ["React", "TypeScript", "Vite", "jsep", "Vitest"]
role: "Solo build: I scaffolded the MVP with AI coding agents, then refactored it by hand into a typed, modular interpreter with per-statement handlers, a hardened expression evaluator, and a React runtime window."
challenges: "The interesting problem was running user programs safely in the browser. Expressions are parsed with jsep into an AST and evaluated against a whitelist of operators instead of using eval, and the interpreter yields to the event loop every few hundred steps with a configurable instruction limit, so an infinite GOTO loop can't freeze the tab. Programs run in a separate popup window that talks to the editor over origin-checked postMessage, with INPUT bridged back as a promise that resolves when the user answers."
---

jsBASIC is a small BASIC interpreter that runs entirely in the browser. Write a
program with line numbers in the editor, click Run, and it executes in its own
runtime window, just like the old days (minus the beige keyboard).

It currently supports:

- `PRINT`, `LET`, and `INPUT`
- `FOR` / `NEXT` loops
- `IF ... THEN` and `GOTO`
- Arithmetic, comparison, and logical (`AND`, `OR`, `NOT`) expressions
- A configurable instruction limit to keep runaway programs in check

It started as a quick experiment in building with AI agents, then became a
chance to clean up and harden the result by hand. Try it at
<a href="https://jsbasic.dev" target="_blank">jsbasic.dev</a>.
