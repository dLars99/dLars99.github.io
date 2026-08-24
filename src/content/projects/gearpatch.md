---
id: "gearpatch"
title: "GearPatch"
description: "A peer-to-peer network for renting musical equipment"
initialCompletionDate: "2020-11-04"
lastUpdatedDate: "2020-11-16"
links:
  [
    {
      name: "GearPatch - NSS Final Capstone",
      url: "https://github.com/dLars99/GearPatch",
      type: "github",
    },
  ]
tech: ["SQL", "C#", ".NET", "React"]
role: "Fullstack solo build for my Nashville Software School capstone: a C#/.NET API backed by SQL, and the React client that consumes it, built in about ten days."
challenges: "Tracking a rental's lifecycle (requested, confirmed, returned) needed to update both the renter's and owner's views consistently without a real-time layer. I modeled rental status as a single source of truth on the server and re-fetched on every state-changing action to keep both sides honest."
---

GearPatch is a platform for musicians to make some money on their extra
equipment by renting it to other musicians. A user can request a rental,
which is then confirmed by the owner. The status of that rental is tracked
in the owner's inventory.

This was my fullstack capstone for Nashville Software School, right as I
was starting my software career. The full project was built in about ten
days.
