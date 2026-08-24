---
id: "rrt"
title: "React Routing Tabs"
description: "An open-source tab library of my creation"
initialCompletionDate: "2024-05-17"
lastUpdatedDate: "2024-05-20"
links:
  [
    {
      name: "React Routing Tabs",
      url: "https://www.npmjs.com/package/react-routing-tabs",
      type: "npm",
    },
    {
      name: "React Routing Tabs",
      url: "https://github.com/dLars99/react-routing-tabs",
      type: "github",
    },
  ]
tech: ["React"]
role: "I designed and published react-routing-tabs as a standalone open-source package, including the accessibility model and the demo pages embedded on this site."
challenges: "Most tab libraries assume the tab index lives in component state; wiring that same state through a router without breaking WAI-ARIA tab semantics (roving tabindex, aria-selected, arrow-key navigation) took more care than the tabs UI itself."
---

Creating tabs for your router is easy. Making them meet WAI-ARIA
accessibility standards is not.

Lots of tab libraries give you accessible tabs. Connecting them to your
router, though, means jumping through lots of hoops.

React Routing Tabs gives you accessible tabs that connect to your router
with minimal effort.
