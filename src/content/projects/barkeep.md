---
id: "barkeep"
title: "Barkeep"
description: "A cocktail catalog for personal use"
initialCompletionDate: "2022-07-12"
lastUpdatedDate: "2022-12-30"
links:
  [
    {
      name: "Barkeep Backend",
      url: "https://github.com/dLars99/barkeep",
      type: "github",
    },
    {
      name: "Barkeep Frontend",
      url: "https://github.com/dLars99/barkeep-frontend",
      type: "github",
    },
  ]
tech: ["PostgreSQL", "TypeScript", "Express", "React"]
role: "I designed and built both the Express/PostgreSQL API and the React client end-to-end, including the ingredient-based search schema and the recipe data model."
challenges: "The core interface challenge was letting someone filter by a variable number of ingredients they already have on hand, then rank partial matches usefully instead of just showing exact matches. I solved it with a scored ingredient-overlap query rather than a strict WHERE-IN filter."
---

Several years ago, my wife got into mixology, especially tiki cocktails. A
typical tiki drink includes many ingredients. This presents two
challenges:

- Keeping track of drink recipes from many different sources
- Finding a recipe that matches the ingredients you have

Barkeep is our in-home solution to these problems. At its core is a
database of drink recipes we have collected. They can be searched by
regular searches, but also filtered by one or more ingredients to find the
right recipe for the moment.

Since this is for my personal use, and due to legal implications around
alcohol, it is not publicly deployed. I run this in a Docker container on
a home
<a href="https://unraid.net" target="_blank">
UnRaid
</a>
server.

<!-- style link? -->
