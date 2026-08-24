---
id: "portfolio"
title: "This Website"
description: "My personal developer portfolio site"
initialCompletionDate: "2024-07-31"
lastUpdatedDate: "2024-07-31"
links:
  [
    {
      name: "David Larsen Portfolio",
      url: "https://github.com/dLars99/dLars99.github.io",
      type: "github",
    },
  ]
tech: ["Astro", "React", "TypeScript"]
role: "I designed and built this site solo: the routed Astro architecture, the persistent sidebar/audit-log chrome, the audit-log content collection, and every component in it."
challenges: "The main interface challenge was keeping the left sidebar and audit log bar visually persistent across routed page swaps instead of remounting on every navigation, while still shipping the rest of the page as plain static HTML. I used Astro's View Transitions persistence together with a small client-side script that updates the active-route state after each swap."
---

Pretty self-explanatory, since you're looking at it! After having a
templated site that I left untouched for several years, I rebuilt it
around a "system ledger" motif — a persistent sidebar and an audit-log
status bar that reads like a live git history of my career, even though
the site itself is fully static.

While I am not a designer, I wanted a couple of interactive touches that
still respected the site's zero-runtime-overhead goal. Mainly, that meant
the expandable ledger entries in Work and the mobile drawer/bottom-sheet
navigation, both scoped to exactly the routes that need them.
