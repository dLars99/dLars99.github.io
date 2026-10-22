---
id: "portfolio"
title: "This Website"
description: "My personal developer portfolio site."
image: "../../images/portfolio/portfolio.png"
imageAlt: "Portfolio site"
initialCompletionDate: "2020-08-19"
links:
  [
    {
      name: "David Larsen Portfolio",
      url: "https://github.com/dLars99/dLars99.github.io",
      type: "github",
    },
  ]
tech: ["Astro", "React", "TypeScript"]
process: "For this third version, I started with agent-assisted wireframes and desktop/mobile mockups, wrote a design spec and a task-by-task implementation plan, then rebuilt the site with AI coding agents: upgrading from Astro 4 to 7, replacing Panda CSS with plain CSS Modules, and moving all content into Astro content collections."
challenges: "The main interface challenge was keeping the left sidebar and audit log bar visually persistent across routed page swaps instead of remounting on every navigation, while still shipping the rest of the page as plain static HTML. I used Astro's View Transitions persistence together with a small client-side script that updates the active-route state after each swap. To automate low-level maintenance, I set up workflow actions to auto-update the 'Last Updated Date' for each project."
---

Pretty self-explanatory, since you're looking at it! This is the third generation of this site. The first was a templated site, followed by a single-page scroller. The newest version gives a cleaner, more intuitive experience.

One of the more unique touches is a changelog for my career: a persistent sidebar, plus a status bar that cycles through recent milestones tagged with version numbers. The full history lives on the Log page. With a goal of speed and low overhead, I went with Astro, making sure the interactive parts stay small and only load where needed.
