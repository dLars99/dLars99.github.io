---
id: "minne-me"
title: "Minne Me"
description: "A weekly email digest of upcoming Minneapolis events"
image: "../../images/minne-me/minne-me-icon.svg"
imageAlt: "Minne Me app icon"
initialCompletionDate: "2026-07-24"
lastUpdatedDate: "2026-10-11"
links: []
tech: ["Node.js", "JavaScript", "Cheerio", "Nodemailer", "GitHub Actions"]
process: "I evaluated the available event APIs, wrote the requirements and data-source research up front, then built it with AI coding agents into a zero-cost Node.js pipeline that runs on a GitHub Actions schedule and commits its own history back to the repo. I verified all code, including making security corrections where the agent-created code initially tried to include hard-coded PII."
challenges: "Minneapolis.org is the best source of civic and cultural events, but its pages don't provide much reliable structure. The schema.org markup has no dates and puts the event title in the address field, so the scraper reads labeled blocks out of the rendered HTML and runs the date text through a flexible normalizer for ranges, multiple showtimes, and dates that cross into the next year. Nothing on the site says which events are popular, so the main 'keystone' events come from a hardcoded list of recurring local institutions and the site's own seasonal roundups. A history file catches events that come back year after year. GitHub's scheduler can also start runs hours late, so the workflow fires twice to cover daylight saving time and checks the history to make sure only one digest goes out each week."
---

Minne Me is a personal, zero-cost email digest of what's happening in
Minneapolis over the next two weeks. Every Monday morning it scrapes
minneapolis.org, trims the calendar down to about twenty events, and sends a
card-style email.

Unfortunately, to maintain that zero-cost in the current operating structure, the repo must be private.

Ticketing APIs miss parades, festivals, and park board programming, and
aggregators missed major events like Aquatennial, so it goes straight to the
source the city itself publishes.

Each digest includes:

- A keystone tier at the top for major recurring events
- A category-diversified mix of smaller events, capped per category so no single type dominates
- Filtering based on Meet Minneapolis's own exclusion criteria
- Venue, dates, and a link back to the original listing for every event

It runs entirely on GitHub Actions and Gmail SMTP, with no servers or
databases. A small JSON history committed back to the repo is the only state.
