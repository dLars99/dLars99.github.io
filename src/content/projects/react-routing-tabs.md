---
id: "rrt"
title: "React Routing Tabs"
description: "An open-source tab library of my creation"
image: "../../images/rrt/rrt.png"
imageAlt: "React Routing Tabs demo"
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
process: "I designed and published react-routing-tabs as a standalone open-source package, including the accessibility model and the demo pages embedded on this site."
challenges: "Most tab libraries assume the tab index lives in component state; wiring that same state through a router without breaking WAI-ARIA tab semantics (roving tabindex, aria-selected, arrow-key navigation) took more care than the tabs UI itself."
---

Creating tabs for your router is easy. Making them meet WAI-ARIA
accessibility standards is not.

Lots of tab libraries gave you accessible tabs. Connecting them to your
router, though, meant jumping through lots of hoops. React Routing Tabs gave you accessible tabs that connect to your router
with minimal effort.

Nowadays, modern frameworks and routers have simplified or eliminated the need for a library such as this. It is no longer actively maintained.
