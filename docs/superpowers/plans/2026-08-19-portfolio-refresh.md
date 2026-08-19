# Portfolio Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild davidplarsen.com from a single-page Panda-CSS scroll site into a routed Astro 5 site with a persistent left-sidebar nav and audit-log status bar (the "system ledger" motif), driven by Astro content collections.

**Architecture:** Astro 5 static site with `<ClientRouter/>` view transitions. Two chrome elements (`Sidebar.astro`, `AuditBar.astro`) carry `transition:persist` so they never remount across route changes. Two React islands (`MobileNav.tsx`, `AuditLogMobile.tsx`) handle the interactive mobile equivalents, hydrated only under `client:media="(max-width: 768px)"`. All content — projects and the resume-flavored "audit log" — comes from Astro 5 content-layer collections (`getCollection`), replacing `Astro.glob()` and `jobData.ts`. Panda CSS is removed in favor of a small `tokens.css` + `global.css` plus scoped `<style>` blocks (Astro) and co-located `.module.css` files (React).

**Tech Stack:** Astro 5, React 18 (islands only), `@fontsource/geist-sans` + `@fontsource/geist-mono`, `@radix-ui/react-collapsible` (kept, for `ExpandableChip`), `@react-icons/all-files` (kept, for tech-stack icons and existing icons), native CSS (custom properties + scoped `<style>` + CSS Modules). No new dependencies beyond the two Geist font packages.

**Spec:** `docs/superpowers/specs/2026-08-14-portfolio-refresh-design.md` (primary spec), informed by the raw wireframes/tokens in `.instructions/portfolio-refresh.md` and the two mockups `.instructions/Portfolio-desktop.png` / `.instructions/Portfolio-mobile.png`.

## Global Constraints

- **Astro:** upgrade `astro` from `4.15.2` to Astro **5**, bundled into this rebuild (spec §2).
- **No new test framework.** None exists today; verification is `astro check` (type-check) + manual browser QA (spec §9). Every task below ends with an `astro check` run and a described manual check instead of an automated test.
- **Panda CSS is removed entirely** by the end of this plan: `panda.config.ts`, `styled-system/`, `@pandacss/dev`, the `panda codegen` `prepare` step, `textStyles.ts`, `postcss.config.cjs` (spec §7). Removal happens only in Task 18, after nothing references it (see Task ordering note below).
- **Design tokens** (spec §3), exact values:
  | Token | Value |
  |---|---|
  | Canvas background | `#F3F1EC` |
  | Accent (emerald) | `#10B981` |
  | Text primary | `#111111` |
  | Text secondary | `#666666` |
  | Border/hairline | `#DDDDDD` |
  | Primary typeface | Geist Sans |
  | Monospace typeface | Geist Mono |
- **Fonts:** both installed via `@fontsource` (`@fontsource/geist-sans`, `@fontsource/geist-mono`), replacing `@fontsource/nunito-sans` (spec §3).
- **Breakpoint:** mobile chrome at `≤768px`, desktop chrome at `>768px` (spec §4).
- **Sidebar:** fixed `280px` width, persistent across navigation via `transition:persist` (compiles to `data-astro-transition-persist`) (spec §4).
- **React only where real interactivity is needed:** the existing `react-routing-tabs` demo pages (untouched), the mobile nav drawer, the audit-log bottom sheet, and `ExpandableChip`-style expand/collapse. Everything else — including the desktop sidebar's active-dot animation and the desktop audit bar's prev/next cycling — is plain Astro + a small inline script, not React (spec §2).
- **Non-goals:** no contact form/backend, no live Lighthouse CI wired to the landing stat cards, no CMS (spec §9).
- **Deployment unchanged:** GitHub Actions `withastro/action` → GitHub Pages, `davidplarsen.com` via `CNAME` (spec §8). Confirm Node version compatibility in Task 1; bump `deploy.yml`'s `node-version` only if Astro 5 requires it.
- **Accessibility:** keyboard focus order, `aria-current` on the active route, and focus trapping in the mobile drawer/sheet are built into the chrome components as they're written (Tasks 6, 8, 9), not bolted on later.

**Task ordering note:** Tasks 1–9 are additive (new files only; nothing is deleted, the old Panda-based site keeps building and running throughout). Tasks 10–16 cut the site over route by route from the old single-page composition to the new routed pages — both can coexist harmlessly in the repo during this window. Tasks 17–18 delete everything the old site used once nothing routes to it anymore, and remove Panda CSS. Task 19 is final verification. This ordering means `yarn build` succeeds after every single task in this plan.

---

### Task 1: Upgrade to Astro 5

**Files:**
- Modify: `package.json`
- Modify: `astro.config.mjs` (only if the upgrade tool or the build flags something)
- Modify: `.github/workflows/deploy.yml` (only if Node version needs bumping)

**Interfaces:**
- Produces: a working `astro@5.x` install that the rest of this plan builds on. No app code changes in this task.

- [ ] **Step 1: Run the official Astro upgrade tool**

```bash
yarn dlx @astrojs/upgrade
```

This bumps `astro` to the latest 5.x and updates `@astrojs/react`, `@astrojs/sitemap`, `@astrojs/mdx`, and `@astrojs/check` to versions compatible with Astro 5, all in one step (safer than hand-picking version numbers).

- [ ] **Step 2: Check Node version compatibility**

Astro 5 requires Node `^18.20.8 || ^20.3.0 || >=22.0.0`. Run:

```bash
node --version
```

`.github/workflows/deploy.yml` currently pins `node-version: 20` (resolves to latest Node 20.x via `actions/setup-node`, which satisfies `>=20.3.0`). No change is needed unless the upgrade tool or `astro check` reports otherwise — if it does, bump `node-version` in `.github/workflows/deploy.yml` to `22`.

- [ ] **Step 3: Build and type-check**

```bash
yarn build
```

Expected: succeeds (the `prepare` script still runs `panda codegen` at this point — leave it alone, Panda isn't removed until Task 18). If `astro.config.mjs`'s `image.service.entrypoint` config triggers a deprecation warning under Astro 5, remove that block (sharp is the default image service in Astro 5); otherwise leave `astro.config.mjs` untouched.

- [ ] **Step 4: Manual check**

Run `yarn dev` and load `http://localhost:4321/`. The existing single-page site should render exactly as before (no visual changes expected in this task).

- [ ] **Step 5: Commit**

```bash
git add package.json yarn.lock astro.config.mjs .github/workflows/deploy.yml
git commit -m "chore: upgrade to Astro 5"
```

---

### Task 2: Design tokens and global CSS foundation

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Modify: `package.json` (add `@fontsource/geist-sans`, `@fontsource/geist-mono`)

**Interfaces:**
- Produces: CSS custom properties consumed by every component written from Task 5 onward — `--color-canvas`, `--color-accent`, `--color-text-primary`, `--color-text-secondary`, `--color-border`, `--font-sans`, `--font-mono`, `--sidebar-width`, `--breakpoint-mobile-px` (documented only, media queries hardcode `768px` since CSS can't interpolate a custom property into a media query). Also produces the global keyframes `sheet-slide-up`, `sheet-slide-down`, `backdrop-fade-in`, consumed by Task 9 (`AuditLogMobile.tsx`) and Task 8 (`MobileNav.tsx`).
- This task does not wire these files into any page yet — that happens in Task 10 (`BaseLayout.astro`). Nothing existing is modified or removed.

- [ ] **Step 1: Install the Geist font packages**

```bash
yarn add @fontsource/geist-sans @fontsource/geist-mono
```

- [ ] **Step 2: Create the token file**

```css
/* src/styles/tokens.css */
:root {
  --color-canvas: #F3F1EC;
  --color-accent: #10B981;
  --color-text-primary: #111111;
  --color-text-secondary: #666666;
  --color-border: #DDDDDD;

  --font-sans: "Geist Sans", Arial, sans-serif;
  --font-mono: "Geist Mono", "Courier New", monospace;

  --sidebar-width: 280px;
}
```

- [ ] **Step 3: Create the global stylesheet**

```css
/* src/styles/global.css */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
}

body {
  background: var(--color-canvas);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
}

a {
  color: inherit;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Mobile drawer / bottom-sheet animations (Tasks 8-9) */
@keyframes sheet-slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes sheet-slide-down {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}

@keyframes backdrop-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

- [ ] **Step 4: Verify**

```bash
yarn astro check
```

Expected: no errors (these files aren't imported anywhere yet, so this just confirms nothing else broke).

- [ ] **Step 5: Commit**

```bash
git add src/styles package.json yarn.lock
git commit -m "feat: add design tokens and global CSS foundation"
```

---

### Task 3: Content collection config and projects data migration

**Files:**
- Create: `src/content/config.ts`
- Modify: `src/content/projects/barkeep.md`
- Modify: `src/content/projects/gearpatch.md`
- Modify: `src/content/projects/greener.md`
- Modify: `src/content/projects/portfolio.md`
- Modify: `src/content/projects/react-routing-tabs.md`

**Interfaces:**
- Produces: the `projects` collection (Astro 5 content-layer `glob()` loader), with schema fields `id, title, description, initialCompletionDate, lastUpdatedDate, links, tech, role, challenges` — consumed by Task 13 (list page) and Task 14 (detail page).
- Produces: the `auditLog` collection registration (schema defined here, entries authored in Task 4).
- The old `Astro.glob("../../content/projects/*.md")` call in `src/components/Projects/Projects.astro` (deleted in Task 17) is **not** touched by this task — it keeps working against the raw files' frontmatter shape until then, since none of the fields it reads (`id`, `title`, `links`, `lastUpdatedDate`) are removed, only added to.

- [ ] **Step 1: Write the content collection config**

```ts
// src/content/config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    initialCompletionDate: z.string(),
    lastUpdatedDate: z.string(),
    links: z.array(
      z.object({
        name: z.string(),
        url: z.string(),
        type: z.enum(["github", "npm"]),
      })
    ),
    tech: z.array(z.string()),
    role: z.string(),
    challenges: z.string(),
  }),
});

const auditLog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/audit-log" }),
  schema: z.object({
    version: z.string(),
    date: z.coerce.date(),
    message: z.string(),
    employer: z.string().optional(),
    location: z.string().optional(),
  }),
});

export const collections = { projects, auditLog };
```

Note: `src/content/audit-log/` doesn't exist yet — that's fine, the `glob()` loader over an empty/missing directory just yields zero entries until Task 4 adds files.

- [ ] **Step 2: Remove the `layout:` frontmatter field from all five project files**

Content-layer collections don't apply the old `layout:` frontmatter convention the way `Astro.glob()`-based pages did — it's inert now, so delete the `layout: "../../layouts/ProjectDescription.astro"` line from each of the five files in `src/content/projects/`.

- [ ] **Step 3: Add `role` and `challenges`, and clean up `tech`, on `barkeep.md`**

```yaml
tech: ["PostgreSQL", "TypeScript", "Express", "React"]
role: "I designed and built both the Express/PostgreSQL API and the React client end-to-end, including the ingredient-based search schema and the recipe data model."
challenges: "The core interface challenge was letting someone filter by a variable number of ingredients they already have on hand, then rank partial matches usefully instead of just showing exact matches. I solved it with a scored ingredient-overlap query rather than a strict WHERE-IN filter."
```

(Frontmatter is YAML — add these as new top-level keys alongside the existing ones, and replace the existing `tech` array value.)

- [ ] **Step 4: Add `role` and `challenges`, and clean up `tech`, on `gearpatch.md`**

```yaml
tech: ["SQL", "C#", ".NET", "React"]
role: "Fullstack solo build for my Nashville Software School capstone: a C#/.NET API backed by SQL, and the React client that consumes it, built in about ten days."
challenges: "Tracking a rental's lifecycle (requested, confirmed, returned) needed to update both the renter's and owner's views consistently without a real-time layer. I modeled rental status as a single source of truth on the server and re-fetched on every state-changing action to keep both sides honest."
```

- [ ] **Step 5: Add `role` and `challenges` on `greener.md`** (tech list is already clean)

```yaml
role: "Frontend capstone, solo build: a mobile-first React app for logging lawn care and surfacing weather-driven reminders."
challenges: "The trickiest interface problem was surfacing a seasonal task schedule and live weather alerts on one small screen without burying the log itself. I split the view into a persistent log with a collapsible alerts/schedule panel above it, prioritizing the data the user checks most often."
```

- [ ] **Step 6: Rewrite `portfolio.md`'s `tech`, body, `role`, and `challenges`**

This project's own copy describes this codebase, so it must reflect what this rebuild actually ships (Panda/Radix-styling and the nav "bubble" are both being removed by this plan):

```yaml
tech: ["Astro", "React", "TypeScript"]
role: "I designed and built this site solo: the routed Astro architecture, the persistent sidebar/audit-log chrome, the audit-log content collection, and every component in it."
challenges: "The main interface challenge was keeping the left sidebar and audit log bar visually persistent across routed page swaps instead of remounting on every navigation, while still shipping the rest of the page as plain static HTML. I used Astro's View Transitions persistence together with a small client-side script that updates the active-route state after each swap."
```

Body (replace the existing paragraph, which references the old nav bubble and PandaCSS):

```markdown
Pretty self-explanatory, since you're looking at it! After having a
templated site that I left untouched for several years, I rebuilt it
around a "system ledger" motif — a persistent sidebar and an audit-log
status bar that reads like a live git history of my career, even though
the site itself is fully static.

While I am not a designer, I wanted a couple of interactive touches that
still respected the site's zero-runtime-overhead goal. Mainly, that meant
the expandable ledger entries in Work and the mobile drawer/bottom-sheet
navigation, both scoped to exactly the routes that need them.
```

- [ ] **Step 7: Add `role` and `challenges` on `react-routing-tabs.md`** (tech list is already clean)

```yaml
role: "I designed and published react-routing-tabs as a standalone open-source package, including the accessibility model and the demo pages embedded on this site."
challenges: "Most tab libraries assume the tab index lives in component state; wiring that same state through a router without breaking WAI-ARIA tab semantics (roving tabindex, aria-selected, arrow-key navigation) took more care than the tabs UI itself."
```

- [ ] **Step 8: Verify**

```bash
yarn astro check
```

Expected: no errors. `astro check` will validate the new frontmatter against the Zod schema in `src/content/config.ts` — a missing `role`/`challenges` field on any file, or a `type` value outside `"github" | "npm"`, will fail here.

- [ ] **Step 9: Commit**

```bash
git add src/content
git commit -m "feat: add content collection schema, role/challenges to project data"
```

---

### Task 4: Audit-log entries and query helper

**Files:**
- Create: `src/content/audit-log/01-bootcamp-start.md`
- Create: `src/content/audit-log/02-greener-capstone.md`
- Create: `src/content/audit-log/03-gearpatch-capstone.md`
- Create: `src/content/audit-log/04-safe-health-join.md`
- Create: `src/content/audit-log/05-vcb-chatbot.md`
- Create: `src/content/audit-log/06-fanpower-join.md`
- Create: `src/content/audit-log/07-ad-platform-launch.md`
- Create: `src/content/audit-log/08-js-migration.md`
- Create: `src/content/audit-log/09-little-caesars-join.md`
- Create: `src/content/audit-log/10-admin-architecture.md`
- Create: `src/content/audit-log/11-senior-promotion.md`
- Create: `src/content/audit-log/12-portfolio-refresh.md`
- Create: `src/content/audit-log-utils.ts`

**Interfaces:**
- Consumes: the `auditLog` collection schema from Task 3 (`src/content/config.ts`).
- Produces: `getSortedAuditEntries(): Promise<AuditEntry[]>` and `getEmployerFacts(entries: AuditEntry[]): EmployerFacts[]`, where `AuditEntry = CollectionEntry<"auditLog">` and `EmployerFacts = { employer: string; location?: string; startDate: Date; endDate?: Date }`. Consumed by Task 7 (`AuditBar.astro`), Task 9 (`AuditLogMobile.tsx`), and Task 15 (`/work` page + `FactsTable.astro`).

- [ ] **Step 1: Author the twelve audit-log entries**

Each file has this frontmatter shape, with the values below. Body text (below the `---`) is the longer detail shown when a ledger entry is expanded on `/work`.

`01-bootcamp-start.md`:
```markdown
---
version: "v0.1.0"
date: "2020-05-15"
employer: "Nashville Software School"
location: "Nashville, TN"
message: "Enrolled in a full-stack engineering bootcamp; began building foundational patterns in JavaScript, React, and relational data modeling."
---

Started the program with zero professional software experience, coming
from IT support and full-time music. Focused early coursework on
JavaScript fundamentals, relational database design, and pairing on small
full-stack exercises.
```

`02-greener-capstone.md`:
```markdown
---
version: "v0.4.0"
date: "2020-08-17"
employer: "Nashville Software School"
message: "Shipped frontend capstone: a mobile-first lawn-care tracker with automated seasonal scheduling and live weather alerts."
---

Built solo in about two weeks. The app logs lawn-care chores, runs a
fully-automated schedule of seasonal tasks with reminders, and pulls live
weather data to flag when watering is or isn't needed.
```

`03-gearpatch-capstone.md`:
```markdown
---
version: "v0.9.0"
date: "2020-11-16"
employer: "Nashville Software School"
message: "Shipped fullstack capstone: a peer-to-peer equipment rental marketplace with a C#/.NET API and React client, built in 10 days."
---

Musicians request rental gear from other musicians; owners confirm the
request and the rental's status is tracked through their inventory. Full
stack, solo, roughly ten days from empty repo to demo.
```

`04-safe-health-join.md`:
```markdown
---
version: "v1.0.0"
date: "2020-11-15"
employer: "SAFE Health"
location: "Los Angeles, CA"
message: "Joined SAFE Health as Software Engineer. Began building the Virtual Consult Builder's core React interface."
---

First professional engineering role. Paired with a small
cross-functional team to align API routes with frontend requirements for
the Virtual Consult Builder (VCB) product.
```

`05-vcb-chatbot.md`:
```markdown
---
version: "v1.4.0"
date: "2021-06-01"
employer: "SAFE Health"
message: "Shipped a natural-language chatbot prototype, pairing a new C#/.NET API with a React UI integrated into the Virtual Consult Builder."
---

Built the chatbot's React front end and its .NET backend end-to-end, then
wired the prototype into the existing VCB flow so it could be evaluated
alongside the production builder.
```

`06-fanpower-join.md`:
```markdown
---
version: "v2.0.0"
date: "2021-08-15"
employer: "FanPower"
location: "New York, NY"
message: "Joined FanPower (formerly Pickup) as Software Engineer / Team Lead. Took ownership of engineering scope for a new internal ad platform."
---

Stepped into a team-lead role, defining engineering scope and supervising
an Agile team building a new internal ad-management platform on a
Node.js/Express REST backend with a React frontend.
```

`07-ad-platform-launch.md`:
```markdown
---
version: "v2.3.0"
date: "2022-01-10"
employer: "FanPower"
message: "Launched the internal ad-management platform, unlocking more targeted engagement through the core product."
---

Also led development of a companion admin app in Retool, cutting the
number of interactions needed to generate new content by roughly 60%.
```

`08-js-migration.md`:
```markdown
---
version: "v2.6.0"
date: "2022-05-01"
employer: "FanPower"
message: "Migrated the core content picker off Rails onto an all-JavaScript stack, cutting page load times by up to 50%."
---

Wrote the REST API routes and React UI components that let the whole
engineering team contribute to a single JavaScript codebase instead of
splitting work across Rails and React. Also wrote the embeddable
JavaScript snippet that syndicates FanPower's core product onto partner
sites.
```

`09-little-caesars-join.md`:
```markdown
---
version: "v3.0.0"
date: "2022-09-15"
employer: "Little Caesars"
location: "Detroit, MI"
message: "Joined Little Caesars as Software Engineer. Picked up long-term frontend ownership across two product teams."
---

Started contributing to shared React component libraries and taking on
frontend requirements across two concurrent project teams from day one.
```

`10-admin-architecture.md`:
```markdown
---
version: "v3.5.0"
date: "2023-04-01"
employer: "Little Caesars"
message: "Architected new admin UI component patterns, cutting time spent on new features and maintenance by up to 75%."
---

Rebuilt key shared components with accessibility best practices baked in,
and scoped the frontend requirements for a set of security improvements
needed to satisfy an external partnership.
```

`11-senior-promotion.md`:
```markdown
---
version: "v4.0.0"
date: "2024-01-15"
employer: "Little Caesars"
message: "Promoted to Senior Software Engineer. Took on principal engineering duties for React and dependency upgrades across both platforms."
---

Directed framework and dependency upgrades across both platforms,
eliminating deprecated packages, and began mentoring engineers of varying
experience levels on React and TypeScript best practices.
```

`12-portfolio-refresh.md`:
```markdown
---
version: "v4.2.0"
date: "2026-08-19"
message: "Refreshed entire site architecture, improved navigation physics."
---

Rebuilt this portfolio on Astro 5 with routed pages, a persistent sidebar
and audit-log status bar, and a content-collection-driven data model —
replacing the old single-page scroll and PandaCSS styling system
entirely.
```

Note this last entry has no `employer` field — it's tagged to the site itself, not a job, so it's excluded from the employer facts table computed below.

- [ ] **Step 2: Write the query helper**

```ts
// src/content-audit-log-utils.ts  -- actually: src/content/audit-log-utils.ts
import { getCollection, type CollectionEntry } from "astro:content";

export type AuditEntry = CollectionEntry<"auditLog">;

export async function getSortedAuditEntries(): Promise<AuditEntry[]> {
  const entries = await getCollection("auditLog");
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export type EmployerFacts = {
  employer: string;
  location?: string;
  startDate: Date;
  endDate?: Date; // undefined means "Present"
};

export function getEmployerFacts(entries: AuditEntry[]): EmployerFacts[] {
  const tagged = entries
    .filter((entry) => entry.data.employer)
    .slice()
    .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());

  const order: string[] = [];
  const byEmployer = new Map<string, AuditEntry[]>();

  for (const entry of tagged) {
    const employer = entry.data.employer as string;
    if (!byEmployer.has(employer)) {
      byEmployer.set(employer, []);
      order.push(employer);
    }
    byEmployer.get(employer)!.push(entry);
  }

  return order.map((employer, index) => {
    const group = byEmployer.get(employer)!;
    const nextEmployer = order[index + 1];
    const nextGroup = nextEmployer ? byEmployer.get(nextEmployer)! : undefined;
    return {
      employer,
      location: group.find((entry) => entry.data.location)?.data.location,
      startDate: group[0].data.date,
      endDate: nextGroup ? nextGroup[0].data.date : undefined,
    };
  });
}
```

Save this at `src/content/audit-log-utils.ts` (not inside `src/content/audit-log/`, so the `glob()` loader in Task 3 doesn't try to parse it as a content entry).

- [ ] **Step 3: Verify**

```bash
yarn astro check
```

Expected: no errors — all twelve entries validate against the `auditLog` schema.

- [ ] **Step 4: Commit**

```bash
git add src/content/audit-log src/content/audit-log-utils.ts
git commit -m "feat: author audit-log entries and query helper"
```

---

### Task 5: Shared `EyebrowLabel` component

**Files:**
- Create: `src/components/shared/EyebrowLabel.astro`

**Interfaces:**
- Produces: `<EyebrowLabel text="FRONTEND ARCHITECTURE & SYSTEMS" />` — renders `[FRONTEND ARCHITECTURE & SYSTEMS]` in Geist Mono, accent-colored. Consumed by Task 11 (Landing), Task 12 (About's `[BIOGRAPHY]` / `[ENGINEERING FOCUS]`), and Task 15 (Work ledger).

- [ ] **Step 1: Write the component**

```astro
---
// src/components/shared/EyebrowLabel.astro
interface Props {
  text: string;
  as?: "span" | "h2" | "h3";
}

const { text, as: Tag = "span" } = Astro.props;
---

<Tag class="eyebrow">[{text}]</Tag>

<style>
  .eyebrow {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--color-accent);
    text-transform: uppercase;
  }
</style>
```

- [ ] **Step 2: Verify**

```bash
yarn astro check
```

Expected: no errors (unused-but-valid component, not imported anywhere yet).

- [ ] **Step 3: Commit**

```bash
git add src/components/shared/EyebrowLabel.astro
git commit -m "feat: add EyebrowLabel shared component"
```

---

### Task 6: Desktop `Sidebar.astro`

**Files:**
- Create: `src/components/Nav/Sidebar.astro`

**Interfaces:**
- Produces: `<Sidebar />` — a `280px` fixed left nav with an animated active-route dot and `aria-current="page"` management. Consumed by Task 10 (`BaseLayout.astro`).
- No props: it derives the active route from `window.location.pathname` at runtime (see script below), because it's a `transition:persist` element and won't re-render server-side data across client-side navigations.

- [ ] **Step 1: Write the component**

```astro
---
// src/components/Nav/Sidebar.astro
const navItems = [
  { label: "ABOUT", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "WORK", href: "/work" },
  { label: "CONTACT", href: "/contact" },
];
---

<nav class="sidebar" transition:persist data-sidebar-nav aria-label="Primary">
  <a class="wordmark" href="/">DAVID P. LARSEN</a>

  <ul class="nav-list">
    <span class="dot" data-nav-dot aria-hidden="true"></span>
    {
      navItems.map((item) => (
        <li>
          <a class="nav-link" href={item.href} data-nav-link>
            {item.label}
          </a>
        </li>
      ))
    }
  </ul>
</nav>

<style>
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: var(--sidebar-width);
    height: 100vh;
    padding: 2.5rem 2rem;
    display: none;
    flex-direction: column;
    gap: 3rem;
  }

  @media (min-width: 769px) {
    .sidebar {
      display: flex;
    }
  }

  .wordmark {
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 0.02em;
    text-decoration: none;
    color: var(--color-text-primary);
  }

  .nav-list {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .nav-list li {
    height: 2.5rem;
    display: flex;
    align-items: center;
  }

  .nav-link {
    text-decoration: none;
    font-family: var(--font-sans);
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    padding-left: 1.25rem;
  }

  .nav-link[aria-current="page"] {
    color: var(--color-text-primary);
    font-weight: 700;
  }

  .dot {
    position: absolute;
    left: 0;
    top: 1.1rem;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-accent);
    transform: translateY(calc(var(--active-index, 0) * 2.5rem));
    transition: transform 200ms ease;
    display: none;
  }
</style>

<script>
  const routes = ["/about", "/projects", "/work", "/contact"];

  function updateActiveNav() {
    const nav = document.querySelector<HTMLElement>("[data-sidebar-nav]");
    if (!nav) return;

    const path = window.location.pathname.replace(/\/$/, "") || "/";
    const activeIndex = routes.findIndex(
      (route) => path === route || path.startsWith(`${route}/`)
    );

    nav.style.setProperty("--active-index", String(Math.max(activeIndex, 0)));

    const dot = nav.querySelector<HTMLElement>("[data-nav-dot]");
    if (dot) dot.style.display = activeIndex === -1 ? "none" : "block";

    nav.querySelectorAll<HTMLAnchorElement>("[data-nav-link]").forEach((link, index) => {
      if (index === activeIndex) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  updateActiveNav();
  document.addEventListener("astro:page-load", updateActiveNav);
</script>
```

- [ ] **Step 2: Verify**

```bash
yarn astro check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav/Sidebar.astro
git commit -m "feat: add persistent desktop Sidebar with animated active-route dot"
```

---

### Task 7: Desktop `AuditBar.astro`

**Files:**
- Create: `src/components/AuditLog/AuditBar.astro`

**Interfaces:**
- Consumes: `getSortedAuditEntries()` from `src/content/audit-log-utils.ts` (Task 4).
- Produces: `<AuditBar />` — fixed bottom bar showing version + message, prev/next arrows to manually cycle the 5 most recent entries, and a `[VIEW FULL LOG]` link to `/work`. Consumed by Task 10 (`BaseLayout.astro`).

- [ ] **Step 1: Write the component**

```astro
---
// src/components/AuditLog/AuditBar.astro
import { getSortedAuditEntries } from "../../content/audit-log-utils";

const entries = (await getSortedAuditEntries()).slice(0, 5).map((entry) => ({
  version: entry.data.version,
  message: entry.data.message,
}));
---

<div class="audit-bar" transition:persist data-audit-bar>
  <div class="entry">
    <span class="version" data-audit-version>{entries[0]?.version}</span>
    <span class="message" data-audit-message>{entries[0]?.message}</span>
  </div>

  <div class="controls">
    <button type="button" class="arrow" data-audit-prev aria-label="Previous entry">◀</button>
    <button type="button" class="arrow" data-audit-next aria-label="Next entry">▶</button>
    <a class="view-log" href="/work">[VIEW FULL LOG]</a>
  </div>
</div>

<style>
  .audit-bar {
    display: none;
    position: fixed;
    left: var(--sidebar-width);
    right: 0;
    bottom: 0;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 2rem;
    border-top: 1px solid var(--color-border);
    background: var(--color-canvas);
    font-family: var(--font-mono);
    font-size: 0.8125rem;
  }

  @media (min-width: 769px) {
    .audit-bar {
      display: flex;
    }
  }

  .entry {
    display: flex;
    gap: 0.75rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .version {
    color: var(--color-accent);
    font-weight: 700;
  }

  .message {
    color: var(--color-text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  }

  .arrow {
    background: none;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    cursor: pointer;
    padding: 0.15rem 0.5rem;
    font-family: var(--font-mono);
  }

  .view-log {
    color: var(--color-accent);
    text-decoration: none;
    font-weight: 700;
  }
</style>

<script define:vars={{ entries }}>
  let index = 0;

  function render() {
    const bar = document.querySelector("[data-audit-bar]");
    if (!bar) return;
    const entry = entries[index];
    bar.querySelector("[data-audit-version]").textContent = entry.version;
    bar.querySelector("[data-audit-message]").textContent = entry.message;
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target.closest("[data-audit-prev]")) {
      index = (index - 1 + entries.length) % entries.length;
      render();
    } else if (target.closest("[data-audit-next]")) {
      index = (index + 1) % entries.length;
      render();
    }
  });
</script>
```

- [ ] **Step 2: Verify**

```bash
yarn astro check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/AuditLog/AuditBar.astro
git commit -m "feat: add persistent desktop AuditBar with manual entry cycling"
```

---

### Task 8: `MobileNav.tsx` (hamburger overlay)

**Files:**
- Create: `src/components/Nav/MobileNav.tsx`
- Create: `src/components/Nav/MobileNav.module.css`

**Interfaces:**
- Produces: `<MobileNav client:media="(max-width: 768px)" />` (default export) — hamburger trigger fixed to the viewport that expands a full-screen nav overlay (About/Projects/Work/Contact) with focus trapping and Escape-to-close. Consumed by Task 10 (`BaseLayout.astro`).

- [ ] **Step 1: Write the CSS module**

```css
/* src/components/Nav/MobileNav.module.css */
.trigger {
  display: none;
  position: fixed;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 40;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-canvas);
  font-size: 1.25rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .trigger {
    display: block;
  }
}

.backdrop {
  position: fixed;
  inset: 0;
  z-index: 30;
  background: rgba(17, 17, 17, 0.4);
  animation: backdrop-fade-in 150ms ease-out;
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 35;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 5rem 2rem 2rem;
  background: var(--color-canvas);
}

.link {
  font-family: var(--font-sans);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  text-decoration: none;
}

.link[aria-current="page"] {
  color: var(--color-accent);
}
```

- [ ] **Step 2: Write the component**

```tsx
// src/components/Nav/MobileNav.tsx
import { useEffect, useRef, useState, type FC } from "react";
import styles from "./MobileNav.module.css";

const navItems = [
  { label: "ABOUT", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "WORK", href: "/work" },
  { label: "CONTACT", href: "/contact" },
];

const MobileNav: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const overlay = overlayRef.current;
    const focusable = overlay?.querySelectorAll<HTMLElement>("a[href], button");
    focusable?.[0]?.focus();

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab" || !focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) triggerRef.current?.focus();
  }, [isOpen]);

  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-overlay"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {isOpen && (
        <>
          <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
          <div
            id="mobile-nav-overlay"
            ref={overlayRef}
            className={styles.overlay}
            role="dialog"
            aria-modal="true"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                className={styles.link}
                href={item.href}
                aria-current={currentPath.startsWith(item.href) ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default MobileNav;
```

- [ ] **Step 3: Verify**

```bash
yarn astro check
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav/MobileNav.tsx src/components/Nav/MobileNav.module.css
git commit -m "feat: add MobileNav overlay with focus trap"
```

---

### Task 9: `AuditLogMobile.tsx` (ticker + bottom sheet)

**Files:**
- Create: `src/components/AuditLog/AuditLogMobile.tsx`
- Create: `src/components/AuditLog/AuditLogMobile.module.css`

**Interfaces:**
- Consumes: a plain-data `entries: { version: string; message: string }[]` prop (server-fetched via `getSortedAuditEntries()` wherever this island is mounted, per Astro's islands-need-serializable-props rule).
- Produces: `<AuditLogMobile client:media="(max-width: 768px)" entries={...} />` (default export) — a top ticker bar that auto-rotates through entries (paused when `prefers-reduced-motion` is set), tappable to open a spring-eased bottom sheet listing recent entries with an `[EXPLORE FULL LOG ->]` link to `/work`, with focus trapping. Consumed by Task 10 (`BaseLayout.astro`).

- [ ] **Step 1: Write the CSS module**

```css
/* src/components/AuditLog/AuditLogMobile.module.css */
.ticker {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-canvas);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .ticker {
    display: flex;
  }
}

.tickerVersion {
  color: var(--color-accent);
  font-weight: 700;
  flex-shrink: 0;
}

.tickerMessage {
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text-secondary);
}

.backdrop {
  position: fixed;
  inset: 0;
  z-index: 30;
  background: rgba(17, 17, 17, 0.4);
  animation: backdrop-fade-in 150ms ease-out;
}

.sheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 35;
  max-height: 60vh;
  overflow-y: auto;
  padding: 1.5rem;
  border-radius: 16px 16px 0 0;
  background: var(--color-canvas);
  animation: sheet-slide-up 320ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.entry {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
  font-family: var(--font-mono);
  font-size: 0.875rem;
}

.entryVersion {
  color: var(--color-accent);
  font-weight: 700;
  margin-right: 0.5rem;
}

.exploreLink {
  display: inline-block;
  margin-top: 1rem;
  color: var(--color-accent);
  font-weight: 700;
  text-decoration: none;
}
```

- [ ] **Step 2: Write the component**

```tsx
// src/components/AuditLog/AuditLogMobile.tsx
import { useEffect, useRef, useState, type FC } from "react";
import styles from "./AuditLogMobile.module.css";

export interface AuditLogEntry {
  version: string;
  message: string;
}

interface Props {
  entries: AuditLogEntry[];
}

const ROTATE_INTERVAL_MS = 4000;

const AuditLogMobile: FC<Props> = ({ entries }) => {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (entries.length <= 1) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setTickerIndex((index) => (index + 1) % entries.length);
    }, ROTATE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [entries.length]);

  useEffect(() => {
    if (!isOpen) return;

    const sheet = sheetRef.current;
    const focusable = sheet?.querySelectorAll<HTMLElement>("a[href], button");
    focusable?.[0]?.focus();

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab" || !focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) triggerRef.current?.focus();
  }, [isOpen]);

  const current = entries[tickerIndex];

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.ticker}
        aria-expanded={isOpen}
        aria-controls="audit-log-sheet"
        aria-label="Open audit log"
        onClick={() => setIsOpen(true)}
      >
        <span className={styles.tickerVersion}>{current?.version}</span>
        <span className={styles.tickerMessage}>{current?.message}</span>
        <span aria-hidden="true">▶</span>
      </button>

      {isOpen && (
        <>
          <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
          <div
            id="audit-log-sheet"
            ref={sheetRef}
            className={styles.sheet}
            role="dialog"
            aria-modal="true"
            aria-label="Audit log"
          >
            {entries.map((entry) => (
              <div className={styles.entry} key={entry.version}>
                <span className={styles.entryVersion}>{entry.version}</span>
                {entry.message}
              </div>
            ))}
            <a className={styles.exploreLink} href="/work">
              [EXPLORE FULL LOG -&gt;]
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default AuditLogMobile;
```

- [ ] **Step 3: Verify**

```bash
yarn astro check
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/AuditLog/AuditLogMobile.tsx src/components/AuditLog/AuditLogMobile.module.css
git commit -m "feat: add AuditLogMobile ticker and bottom sheet with focus trap"
```

---

### Task 10: `BaseLayout.astro` and route skeletons

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/pages/about.astro` (skeleton)
- Create: `src/pages/projects/index.astro` (skeleton)
- Create: `src/pages/projects/[slug].astro` (skeleton)
- Create: `src/pages/work.astro` (skeleton)
- Create: `src/pages/contact.astro` (skeleton)

**Interfaces:**
- Consumes: `Sidebar.astro` (Task 6), `AuditBar.astro` (Task 7), `MobileNav.tsx` (Task 8), `AuditLogMobile.tsx` + `getSortedAuditEntries()` (Task 9, Task 4), `Head.astro` (existing, untouched), `src/styles/tokens.css` + `src/styles/global.css` (Task 2).
- Produces: `<BaseLayout title={string} description={string}><slot /></BaseLayout>` — consumed by every page task from here on (11–16). `src/pages/index.astro` is **not** touched in this task (it still renders the old single-page site) — it's rewritten in Task 11 alongside the real landing content, since rewriting it now would delete the only working route before its replacement exists.
- This task does not touch `src/pages/react-routing-tabs.astro` or `src/pages/react-routing-tabs/[tab].astro` — those stay on their own standalone `<html>` shell permanently (spec: "unchanged").

- [ ] **Step 1: Write `BaseLayout.astro`**

```astro
---
// src/layouts/BaseLayout.astro
import { ClientRouter } from "astro:transitions";
import Head from "./Head.astro";
import Sidebar from "../components/Nav/Sidebar.astro";
import AuditBar from "../components/AuditLog/AuditBar.astro";
import MobileNav from "../components/Nav/MobileNav.tsx";
import AuditLogMobile from "../components/AuditLog/AuditLogMobile.tsx";
import { getSortedAuditEntries } from "../content/audit-log-utils";
import "../styles/tokens.css";
import "../styles/global.css";
import "@fontsource/geist-sans";
import "@fontsource/geist-mono";

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;

const mobileEntries = (await getSortedAuditEntries()).slice(0, 5).map((entry) => ({
  version: entry.data.version,
  message: entry.data.message,
}));
---

<html lang="en">
  <Head title={title} description={description}>
    <ClientRouter />
  </Head>

  <body>
    <Sidebar />
    <MobileNav client:media="(max-width: 768px)" />
    <AuditLogMobile client:media="(max-width: 768px)" entries={mobileEntries} />

    <main class="content-stage">
      <slot />
    </main>

    <AuditBar />
  </body>
</html>

<style>
  .content-stage {
    min-height: 100vh;
    padding: 4rem 2rem 6rem;
  }

  @media (min-width: 769px) {
    .content-stage {
      margin-left: var(--sidebar-width);
      padding: 3rem 3rem 5rem;
    }
  }
</style>
```

Note: `Head.astro` currently renders a `<slot />` at the end of its own markup (see `src/layouts/Head.astro:25`), which is exactly where `<ClientRouter />` needs to land — no change to `Head.astro` required.

- [ ] **Step 2: Write route skeletons**

Each of these five files follows the same shape — a `BaseLayout` wrapper with a placeholder heading, enough to verify chrome/persistence before Task 11–16 fill in real content:

```astro
---
// src/pages/about.astro
import BaseLayout from "../layouts/BaseLayout.astro";
---

<BaseLayout title="About — David P Larsen" description="About David Larsen, full-stack engineer.">
  <h1>About (placeholder)</h1>
</BaseLayout>
```

```astro
---
// src/pages/projects/index.astro
import BaseLayout from "../../layouts/BaseLayout.astro";
---

<BaseLayout title="Projects — David P Larsen" description="Projects by David Larsen, full-stack engineer.">
  <h1>Projects (placeholder)</h1>
</BaseLayout>
```

```astro
---
// src/pages/projects/[slug].astro
import BaseLayout from "../../layouts/BaseLayout.astro";
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const projects = await getCollection("projects");
  return projects.map((project) => ({
    params: { slug: project.data.id },
  }));
}

const { slug } = Astro.params;
---

<BaseLayout title={`${slug} — David P Larsen`} description="Project detail.">
  <h1>Project detail (placeholder): {slug}</h1>
</BaseLayout>
```

```astro
---
// src/pages/work.astro
import BaseLayout from "../layouts/BaseLayout.astro";
---

<BaseLayout title="Work — David P Larsen" description="Work history and audit log for David Larsen.">
  <h1>Work (placeholder)</h1>
</BaseLayout>
```

```astro
---
// src/pages/contact.astro
import BaseLayout from "../layouts/BaseLayout.astro";
---

<BaseLayout title="Contact — David P Larsen" description="Contact David Larsen.">
  <h1>Contact (placeholder)</h1>
</BaseLayout>
```

- [ ] **Step 3: Verify types and build**

```bash
yarn astro check && yarn build
```

Expected: no errors. (`src/pages/index.astro` still uses the old Panda-based composition and still builds fine — untouched in this task.)

- [ ] **Step 4: Manual check — persistence across navigation**

Run `yarn dev`. Visit `http://localhost:4321/about`, then click through to Projects, Work, and Contact via the sidebar.

- The sidebar and (once you resize below 768px) the mobile chrome must **not** flash or remount between pages — open browser DevTools, right-click the `<nav class="sidebar">` element, "Break on... subtree modifications," and confirm no break fires on navigation.
- The active-route dot in the sidebar must move smoothly to the clicked item and `aria-current="page"` must land on the correct link (inspect the DOM).
- At `≤768px` viewport width: the hamburger button opens/closes the nav overlay; the top ticker is tappable and opens the bottom sheet; Escape closes both; Tab cycles only within the open overlay/sheet.
- The desktop audit bar's prev/next arrows cycle through the 5 most recent audit-log entries; `[VIEW FULL LOG]` and `[EXPLORE FULL LOG ->]` both navigate to `/work`.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/BaseLayout.astro src/pages/about.astro src/pages/projects src/pages/work.astro src/pages/contact.astro
git commit -m "feat: add BaseLayout with persistent chrome and route skeletons"
```

---

### Task 11: Landing page (`/`)

**Files:**
- Create: `src/components/Landing/Hero.astro`
- Create: `src/components/Landing/StatCards.astro`
- Create: `src/components/Landing/CapabilitiesList.astro`
- Modify: `src/pages/index.astro` (full rewrite)

**Interfaces:**
- Consumes: `BaseLayout.astro` (Task 10), `EyebrowLabel.astro` (Task 5).
- Produces: the `/` route as the routed landing page. This is the task that removes the old single-page composition's entry point — `src/pages/index.astro` no longer imports `Landing.astro`, `About.astro`, `Work.astro`, or `Projects.astro` after this task (those old component trees still exist on disk, unreferenced, until Task 17 deletes them — leaving them in place for now avoids a giant unreviewable diff).

- [ ] **Step 1: Write `Hero.astro`**

```astro
---
// src/components/Landing/Hero.astro
import EyebrowLabel from "../shared/EyebrowLabel.astro";
---

<div class="hero">
  <EyebrowLabel text="FRONTEND ARCHITECTURE & SYSTEMS" />
  <h1>Engineering UI Systems with Zero Runtime Overhead</h1>
  <p class="subhead">
    A static-first portfolio built on Astro 5, with persistent routed chrome
    and zero client-side framework overhead on the content — React is
    reserved for the handful of places it actually earns its keep.
  </p>
</div>

<style>
  .hero {
    max-width: 42rem;
    margin-bottom: 3rem;
  }

  h1 {
    font-family: var(--font-sans);
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.15;
    margin: 0.75rem 0 1rem;
    color: var(--color-text-primary);
  }

  .subhead {
    font-size: 1.0625rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
  }
</style>
```

- [ ] **Step 2: Write `StatCards.astro`**

```astro
---
// src/components/Landing/StatCards.astro
const stats = [
  { label: "RENDER OVERHEAD", value: "0KB JS", caption: "Zero client JS shipped by default per route" },
  { label: "LIGHTHOUSE SCORE", value: "100/100", caption: "Performance score, static routes" },
  { label: "FRAME BUDGET", value: "<16ms", caption: "Held during nav-dot and drawer transitions" },
];
---

<div class="stat-grid">
  {
    stats.map((stat) => (
      <div class="stat-card">
        <span class="stat-label">[{stat.label}]</span>
        <span class="stat-value">{stat.value}</span>
        <span class="stat-caption">{stat.caption}</span>
      </div>
    ))
  }
</div>

<style>
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .stat-card {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    padding: 1.25rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
  }

  .stat-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-accent);
  }

  .stat-value {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text-primary);
  }

  .stat-caption {
    font-size: 0.8125rem;
    color: var(--color-text-secondary);
  }
</style>
```

- [ ] **Step 3: Write `CapabilitiesList.astro`**

```astro
---
// src/components/Landing/CapabilitiesList.astro
const capabilities = [
  {
    name: "Design System Engine",
    description: "A token-driven CSS system with zero utility-class runtime, persistent routed chrome, and view-transition-safe state.",
    href: "/projects/portfolio",
  },
  {
    name: "High-Density Grids",
    description: "Ingredient-filtered search over a dense relational recipe schema, ranked by partial match instead of exact filters.",
    href: "/projects/barkeep",
  },
  {
    name: "Stateful Micro-Physics",
    description: "A mobile-first log and alerts panel driven by live weather state, prioritized for the data checked most often.",
    href: "/projects/greener",
  },
  {
    name: "Accessible Routing Primitives",
    description: "Roving-tabindex tab components wired to a router without breaking WAI-ARIA tab semantics.",
    href: "/projects/rrt",
  },
];
---

<div class="capabilities">
  <h2>Capabilities &amp; System Design Primitives</h2>
  <ul>
    {
      capabilities.map((capability) => (
        <li>
          <a href={capability.href}>
            <span class="name">{capability.name}</span>
            <span class="description">{capability.description}</span>
          </a>
        </li>
      ))
    }
  </ul>
</div>

<style>
  h2 {
    font-size: 1.125rem;
    color: var(--color-text-primary);
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--color-border);
  }

  li {
    border-bottom: 1px solid var(--color-border);
  }

  a {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem 0;
    text-decoration: none;
  }

  .name {
    font-weight: 700;
    color: var(--color-text-primary);
  }

  .description {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }
</style>
```

- [ ] **Step 4: Rewrite `src/pages/index.astro`**

```astro
---
// src/pages/index.astro
import BaseLayout from "../layouts/BaseLayout.astro";
import Hero from "../components/Landing/Hero.astro";
import StatCards from "../components/Landing/StatCards.astro";
import CapabilitiesList from "../components/Landing/CapabilitiesList.astro";
---

<BaseLayout
  title="David P Larsen: JavaScript Software Engineer"
  description="JavaScript web portfolio for software engineer David Larsen"
>
  <Hero />
  <StatCards />
  <CapabilitiesList />
</BaseLayout>
```

- [ ] **Step 5: Verify**

```bash
yarn astro check && yarn build
```

Expected: no errors. Note `astro build` may now warn about unused old components (`Landing.astro` etc. are still present but no longer imported by any page) — that's expected and resolved in Task 17.

- [ ] **Step 6: Manual check**

`yarn dev`, visit `http://localhost:4321/`. Confirm the eyebrow tag, headline/subhead, three stat cards, and capabilities list render, and that each capability row links to the correct (still-placeholder) project detail page.

- [ ] **Step 7: Commit**

```bash
git add src/components/Landing/Hero.astro src/components/Landing/StatCards.astro src/components/Landing/CapabilitiesList.astro src/pages/index.astro
git commit -m "feat: rebuild landing page on BaseLayout"
```

---

### Task 12: About page (`/about`)

**Files:**
- Create: `src/components/About/EngineeringFocus.astro`
- Modify: `src/components/About/Bio/Bio.astro` (Panda → plain CSS)
- Modify: `src/components/About/BioBlock/BioBlock.astro` (Panda → plain CSS)
- Modify: `src/pages/about.astro` (fill in real content)

**Interfaces:**
- Consumes: `EyebrowLabel.astro` (Task 5), `Bio.astro` + `BioBlock.astro` (rewritten, content unchanged).
- Produces: the real `/about` two-column layout.

- [ ] **Step 1: Rewrite `BioBlock.astro`'s styling** (content/slot API unchanged, so `Bio.astro`'s usage doesn't need to change)

```astro
---
// src/components/About/BioBlock/BioBlock.astro
---

<div class="bio-block">
  <p><slot /></p>
</div>

<style>
  .bio-block {
    width: 100%;
    max-width: 60ch;
    margin-bottom: 1rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
  }
</style>
```

- [ ] **Step 2: Rewrite `Bio.astro`'s styling** (paragraph content unchanged from the existing file)

```astro
---
// src/components/About/Bio/Bio.astro
import BioBlock from "../BioBlock/BioBlock.astro";
---

<div class="bio">
  <BioBlock>
    <p>Hi. I'm David.</p>
  </BioBlock>

  <BioBlock>
    I am a fullstack developer with over 4 years' experience developing
    professional applications utilizing JavaScript/Typescript frameworks.
  </BioBlock>

  <BioBlock>
    I have extensive experience using React for frontend development, along with
    a variety of styling frameworks. I also have experience developing backends
    in Node/Express, with a tiny bit of C#/.NET experience. I have utilized SQL
    and NoSQL databases, particularly through PostgreSQL and MongoDB.
  </BioBlock>

  <BioBlock>
    Before I was a developer, I split time between IT Support and professional
    music, including 5 years pursuing music full-time. Support gave me a superb
    troubleshooting and problem solving skills. Music gave me the creative itch
    to move beyond support into development.
  </BioBlock>

  <BioBlock>
    I also love to disconnect with a good book or by getting outdoors or playing
    with my golden retriever. Actually, he insists on playing.
  </BioBlock>
</div>

<style>
  .bio {
    max-width: 60ch;
  }
</style>
```

- [ ] **Step 3: Write `EngineeringFocus.astro`**

```astro
---
// src/components/About/EngineeringFocus.astro
import EyebrowLabel from "../shared/EyebrowLabel.astro";

const focusAreas = [
  { key: "State Management", value: "React/Context" },
  { key: "API Design", value: "Node/Express & REST" },
  { key: "Data", value: "PostgreSQL/MongoDB" },
  { key: "Languages", value: "TypeScript" },
];
---

<div class="engineering-focus">
  <EyebrowLabel as="h2" text="ENGINEERING FOCUS" />
  <dl>
    {
      focusAreas.map((area) => (
        <div class="row">
          <dt>{area.key}</dt>
          <dd>{area.value}</dd>
        </div>
      ))
    }
  </dl>
</div>

<style>
  .engineering-focus {
    max-width: 60ch;
    margin-top: 2rem;
  }

  dl {
    margin: 1rem 0 0;
  }

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--color-border);
  }

  dt {
    font-weight: 700;
    color: var(--color-text-primary);
  }

  dd {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }
</style>
```

- [ ] **Step 4: Fill in `src/pages/about.astro`**

```astro
---
// src/pages/about.astro
import BaseLayout from "../layouts/BaseLayout.astro";
import EyebrowLabel from "../components/shared/EyebrowLabel.astro";
import Bio from "../components/About/Bio/Bio.astro";
import EngineeringFocus from "../components/About/EngineeringFocus.astro";
---

<BaseLayout title="About — David P Larsen" description="About David Larsen, full-stack engineer.">
  <div class="about-grid">
    <div class="column">
      <EyebrowLabel as="h2" text="BIOGRAPHY" />
      <Bio />
    </div>
    <div class="column">
      <EngineeringFocus />
    </div>
  </div>
</BaseLayout>

<style>
  .about-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  @media (min-width: 769px) {
    .about-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
```

- [ ] **Step 5: Verify**

```bash
yarn astro check
```

Expected: no errors.

- [ ] **Step 6: Manual check**

`yarn dev`, visit `/about`. Confirm the two-column layout (biography left, engineering focus table right on desktop; stacked on mobile) and that all bio prose carried over correctly.

- [ ] **Step 7: Commit**

```bash
git add src/components/About src/pages/about.astro
git commit -m "feat: build real About page content"
```

---

### Task 13: Projects list page (`/projects`)

**Files:**
- Create: `src/components/Projects/ProjectCard.astro`
- Modify: `src/pages/projects/index.astro` (fill in real content)

**Interfaces:**
- Consumes: the `projects` collection (Task 3).
- Produces: `<ProjectCard project={CollectionEntry<"projects">} />`, consumed only here.

- [ ] **Step 1: Write `ProjectCard.astro`**

```astro
---
// src/components/Projects/ProjectCard.astro
import type { CollectionEntry } from "astro:content";

interface Props {
  project: CollectionEntry<"projects">;
}

const { project } = Astro.props;
const { title, description, id } = project.data;
---

<article class="card">
  <h2>{title}</h2>
  <p>{description}</p>
  <a class="details-link" href={`/projects/${id}`}>[VIEW DETAILS]</a>
</article>

<style>
  .card {
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--color-border);
  }

  h2 {
    font-size: 1.25rem;
    margin: 0 0 0.5rem;
    color: var(--color-text-primary);
  }

  p {
    margin: 0 0 0.75rem;
    color: var(--color-text-secondary);
  }

  .details-link {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--color-accent);
    text-decoration: none;
  }
</style>
```

Note: the spec calls for "real project screenshot" on each card. The existing per-project screenshots live under `src/images/<project>/*.png` with no single frontmatter field pointing at a canonical "card" image. Adding a `cardImage` field to the schema and picking one screenshot per project is a reasonable follow-up, but is **out of scope for this task** — ship the card without an image for v1, matching the "static, hand-asserted content for v1" spirit already established for the landing stat cards. (If a screenshot is wanted before shipping, that's a one-field schema addition plus five frontmatter edits, cleanly layered on top of Task 3 — flag it to the user rather than guessing which screenshot best represents each project.)

- [ ] **Step 2: Fill in `src/pages/projects/index.astro`**

```astro
---
// src/pages/projects/index.astro
import BaseLayout from "../../layouts/BaseLayout.astro";
import ProjectCard from "../../components/Projects/ProjectCard.astro";
import { getCollection } from "astro:content";

const projects = (await getCollection("projects")).sort(
  (a, b) => (a.data.lastUpdatedDate < b.data.lastUpdatedDate ? 1 : -1)
);
---

<BaseLayout title="Projects — David P Larsen" description="Projects by David Larsen, full-stack engineer.">
  <p class="intro">
    Though I consider myself an engineer far more than I consider myself a
    designer, and I don't get a lot of time for side projects, I am able to
    dabble once in a while. Here are some of those dabblings.
  </p>
  {projects.map((project) => <ProjectCard project={project} />)}
</BaseLayout>

<style>
  .intro {
    max-width: 60ch;
    color: var(--color-text-secondary);
    margin-bottom: 2rem;
  }
</style>
```

- [ ] **Step 3: Verify**

```bash
yarn astro check
```

Expected: no errors.

- [ ] **Step 4: Manual check**

`yarn dev`, visit `/projects`. Confirm all 5 projects (Barkeep, GearPatch, Greener, This Website, React Routing Tabs) render as cards, sorted newest-first by `lastUpdatedDate`, each `[VIEW DETAILS]` link pointing at `/projects/<id>`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects/ProjectCard.astro src/pages/projects/index.astro
git commit -m "feat: build real Projects list page"
```

---

### Task 14: Project detail page (`/projects/[slug]`)

**Files:**
- Create: `src/components/Projects/TechStack/TechStack.astro`
- Create: `src/components/Projects/TechStack/techIconMap.ts`
- Modify: `src/components/Projects/ProjectLinks/ProjectLinks.astro` (Panda → plain CSS)
- Modify: `src/layouts/StaggeredImages.astro` (Panda → plain CSS)
- Modify: `src/pages/projects/[slug].astro` (fill in real content)

**Interfaces:**
- Consumes: the `projects` collection + `render()` (Task 3), `demoMap` (existing, untouched — still keyed by frontmatter `id`), `ProjectLinks.astro`'s existing `ProjectLink` type (unchanged shape).
- Produces: `<TechStack tech={string[]} />`, consumed only here.

- [ ] **Step 1: Write `techIconMap.ts`**

```ts
// src/components/Projects/TechStack/techIconMap.ts
import { SiReact } from "@react-icons/all-files/si/SiReact";
import { SiTypescript } from "@react-icons/all-files/si/SiTypescript";
import { SiPostgresql } from "@react-icons/all-files/si/SiPostgresql";
import { SiExpress } from "@react-icons/all-files/si/SiExpress";
import { SiCsharp } from "@react-icons/all-files/si/SiCsharp";
import { SiDotnet } from "@react-icons/all-files/si/SiDotnet";
import { SiJavascript } from "@react-icons/all-files/si/SiJavascript";
import { SiCss3 } from "@react-icons/all-files/si/SiCss3";
import { SiAstro } from "@react-icons/all-files/si/SiAstro";

export type TechIcon = typeof SiReact;

export const techIconMap: Record<string, TechIcon> = {
  react: SiReact,
  typescript: SiTypescript,
  postgresql: SiPostgresql,
  express: SiExpress,
  "c#": SiCsharp,
  ".net": SiDotnet,
  javascript: SiJavascript,
  css: SiCss3,
  astro: SiAstro,
};

export function getTechIcon(tech: string): TechIcon | undefined {
  return techIconMap[tech.toLowerCase()];
}
```

If any of these `@react-icons/all-files/si/*` import paths don't exist in the installed package version, delete that one mapping entry — `TechStack.astro` (below) falls back to a text-only chip automatically, so a missing icon never breaks the build.

- [ ] **Step 2: Write `TechStack.astro`**

```astro
---
// src/components/Projects/TechStack/TechStack.astro
import { getTechIcon } from "./techIconMap";

interface Props {
  tech: string[];
}

const { tech } = Astro.props;
---

<ul class="tech-stack">
  {
    tech.map((name) => {
      const Icon = getTechIcon(name);
      return (
        <li class="chip">
          {Icon ? <Icon aria-hidden="true" /> : null}
          <span>{name}</span>
        </li>
      );
    })
  }
</ul>

<style>
  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    margin: 1rem 0 0;
    padding: 0;
  }

  .chip {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.625rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-text-secondary);
  }

  .chip :global(svg) {
    width: 14px;
    height: 14px;
  }
</style>
```

- [ ] **Step 3: Rewrite `ProjectLinks.astro`'s styling** (props/markup shape unchanged)

```astro
---
// src/components/Projects/ProjectLinks/ProjectLinks.astro
import { Image } from "astro:assets";
import npmImage from "../../../images/icons/npm.png";
import githubImage from "../../../images/icons/github.png";

export type ProjectLink = {
  name: string;
  url: string;
  type: LinkType;
};

type LinkType = "github" | "npm";

interface Props {
  links: ProjectLink[];
}

const { links } = Astro.props;

const images = {
  npm: npmImage,
  github: githubImage,
};

const linkDisplayNames = {
  github: "GitHub",
  npm: "NPM",
};
const getAltText = (name: string, type: LinkType) =>
  `Link to ${name} on ${linkDisplayNames[type]}`;
---

{
  links.length > 0 && (
    <div class="links">
      {links.map((link) => (
        <a href={link.url} target="_blank" rel="noreferrer">
          <Image alt={getAltText(link.name, link.type)} src={images[link.type]} width={32} height={32} />
        </a>
      ))}
    </div>
  )
}

<style>
  .links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin: 1rem 0;
  }
</style>
```

- [ ] **Step 4: Rewrite `StaggeredImages.astro`'s styling** (props/markup shape unchanged)

```astro
---
// src/layouts/StaggeredImages.astro
import type { ImageMetadata } from "astro";
import { Image } from "astro:assets";

export type DisplayImage = {
  src: ImageMetadata;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
};

interface Props {
  firstPosition?: "left" | "right";
  images: DisplayImage[];
}

const { firstPosition = "left", images } = Astro.props;
const leftIndicator = firstPosition === "left" ? 0 : 1;
---

<div class="stack">
  {
    images.map((image, index) => (
      <figure class:list={["figure", index % 2 === leftIndicator ? "align-start" : "align-end"]}>
        <Image alt={image.alt} height={image.height} src={image.src} width={image.width} />
        <figcaption class:list={{ "text-right": index % 2 !== leftIndicator }}>
          {image.caption || image.alt}
        </figcaption>
      </figure>
    ))
  }
</div>

<style>
  .stack {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .figure {
    margin: 0 0 1rem;
  }

  .align-start {
    align-self: flex-start;
  }

  .align-end {
    align-self: flex-end;
  }

  figcaption {
    margin-top: 0.25rem;
    font-size: 0.8125rem;
    color: var(--color-text-secondary);
  }

  .text-right {
    text-align: right;
  }
</style>
```

- [ ] **Step 5: Fill in `src/pages/projects/[slug].astro`**

```astro
---
// src/pages/projects/[slug].astro
import BaseLayout from "../../layouts/BaseLayout.astro";
import EyebrowLabel from "../../components/shared/EyebrowLabel.astro";
import ProjectLinks from "../../components/Projects/ProjectLinks/ProjectLinks.astro";
import TechStack from "../../components/Projects/TechStack/TechStack.astro";
import { demoMap } from "../../components/Projects/Demos/demoMap";
import { getCollection, render } from "astro:content";

export async function getStaticPaths() {
  const projects = await getCollection("projects");
  return projects.map((project) => ({
    params: { slug: project.data.id },
    props: { project },
  }));
}

const { project } = Astro.props;
const { Content } = await render(project);
const { title, description, role, challenges, tech, links, id } = project.data;
const Demo = demoMap[id];
---

<BaseLayout title={`${title} — David P Larsen`} description={description}>
  <EyebrowLabel as="h2" text={title.toUpperCase()} />
  <p class="description">{description}</p>

  <ProjectLinks links={links} />

  <div class="detail-grid">
    <div class="stage">
      {Demo ? <Demo firstPosition="left" /> : null}
    </div>

    <div class="panel">
      <section>
        <h3>My Role &amp; Approach</h3>
        <p>{role}</p>
      </section>

      <section>
        <h3>Interface Challenges &amp; Solutions</h3>
        <p>{challenges}</p>
      </section>

      <TechStack tech={tech} />
    </div>
  </div>

  <div class="body">
    <Content />
  </div>
</BaseLayout>

<style>
  .description {
    max-width: 60ch;
    color: var(--color-text-secondary);
    margin: 0.5rem 0 1.5rem;
  }

  .detail-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 1.5rem;
  }

  @media (min-width: 769px) {
    .detail-grid {
      grid-template-columns: 1.4fr 1fr;
    }
  }

  .panel section {
    margin-bottom: 1.5rem;
  }

  .panel h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .body {
    max-width: 60ch;
    margin-top: 2rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
  }
</style>
```

- [ ] **Step 6: Verify**

```bash
yarn astro check
```

Expected: no errors.

- [ ] **Step 7: Manual check**

`yarn dev`, visit `/projects/barkeep`, `/projects/rrt`, and the other three. Confirm the screenshot carousel renders (where a demo exists), the role/challenges panel shows real prose, the tech-stack row shows icons where mapped and plain-text chips otherwise, and GitHub/npm links open in a new tab.

- [ ] **Step 8: Commit**

```bash
git add src/components/Projects/TechStack src/components/Projects/ProjectLinks/ProjectLinks.astro src/layouts/StaggeredImages.astro src/pages/projects/[slug].astro
git commit -m "feat: build real Project detail page"
```

---

### Task 15: Work page (`/work`)

**Files:**
- Modify: `src/components/ExpandableChip/index.tsx` (Panda → CSS module)
- Create: `src/components/ExpandableChip/ExpandableChip.module.css`
- Create: `src/components/Work/LedgerEntry.astro`
- Create: `src/components/Work/FactsTable.astro`
- Modify: `src/pages/work.astro` (fill in real content)

**Interfaces:**
- Consumes: `getSortedAuditEntries()` + `getEmployerFacts()` (Task 4), `EyebrowLabel.astro` (Task 5).
- Produces: `<LedgerEntry entry={CollectionEntry<"auditLog">} />` and `<FactsTable facts={EmployerFacts[]} />`, consumed only here.

- [ ] **Step 1: Write `ExpandableChip.module.css`** (keyframes moved from Panda's `theme.extend.keyframes` config, now component-local)

```css
/* src/components/ExpandableChip/ExpandableChip.module.css */
.root {
  margin: 1.5rem 0;
  border: 1px solid var(--color-border);
  border-radius: 6px;
}

.innerFlex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
}

.title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
}

.button {
  background: transparent;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
}

.contentAnimation {
  overflow: hidden;
}

.contentAnimation[data-state="open"] {
  animation: chip-slide-down 250ms ease-in-out;
}

.contentAnimation[data-state="closed"] {
  animation: chip-slide-up 250ms ease-in-out;
}

@keyframes chip-slide-down {
  from {
    height: 0;
  }
  to {
    height: var(--radix-collapsible-content-height);
  }
}

@keyframes chip-slide-up {
  from {
    height: var(--radix-collapsible-content-height);
  }
  to {
    height: 0;
  }
}
```

- [ ] **Step 2: Rewrite `ExpandableChip/index.tsx`** (props/behavior unchanged, styling swapped to the CSS module)

```tsx
// src/components/ExpandableChip/index.tsx
import React, { useState, type FC, type ReactNode } from "react";
import { FaExpand } from "@react-icons/all-files/fa/FaExpand";
import { FaWindowMinimize } from "@react-icons/all-files/fa/FaWindowMinimize";
import * as Collapsible from "@radix-ui/react-collapsible";
import styles from "./ExpandableChip.module.css";

export interface ExpandableChipProps {
  children?: ReactNode;
  name: string;
}

const ExpandableChip: FC<ExpandableChipProps> = ({ children, name }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen} className={styles.root}>
      <div className={styles.innerFlex}>
        <h3 className={styles.title}>{name}</h3>

        <Collapsible.Trigger asChild>
          <button className={styles.button} aria-label={isOpen ? `Collapse ${name}` : `Expand ${name}`}>
            {isOpen ? <FaWindowMinimize /> : <FaExpand />}
          </button>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content className={styles.contentAnimation}>{children}</Collapsible.Content>
    </Collapsible.Root>
  );
};

export default ExpandableChip;
```

- [ ] **Step 3: Write `FactsTable.astro`**

```astro
---
// src/components/Work/FactsTable.astro
import type { EmployerFacts } from "../../content/audit-log-utils";
import { format } from "date-fns";

interface Props {
  facts: EmployerFacts[];
}

const { facts } = Astro.props;
const dateFormat = "MMMM y";
---

<table class="facts-table">
  <thead>
    <tr>
      <th>Company</th>
      <th>Dates</th>
      <th>Location</th>
    </tr>
  </thead>
  <tbody>
    {
      facts
        .slice()
        .reverse()
        .map((fact) => (
          <tr>
            <td>{fact.employer}</td>
            <td>
              {format(fact.startDate, dateFormat)} –{" "}
              {fact.endDate ? format(fact.endDate, dateFormat) : "Present"}
            </td>
            <td>{fact.location ?? "—"}</td>
          </tr>
        ))
    }
  </tbody>
</table>

<style>
  .facts-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.8125rem;
  }

  th {
    text-align: left;
    font-family: var(--font-mono);
    color: var(--color-text-secondary);
    font-weight: 600;
    padding: 0.5rem 0.75rem 0.5rem 0;
    border-bottom: 1px solid var(--color-border);
  }

  td {
    padding: 0.6rem 0.75rem 0.6rem 0;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text-primary);
  }
</style>
```

- [ ] **Step 4: Write `LedgerEntry.astro`**

```astro
---
// src/components/Work/LedgerEntry.astro
import type { CollectionEntry } from "astro:content";
import { render } from "astro:content";
import { format } from "date-fns";
import ExpandableChip from "../ExpandableChip";

interface Props {
  entry: CollectionEntry<"auditLog">;
}

const { entry } = Astro.props;
const { Content } = await render(entry);
const { version, date, message, employer } = entry.data;
---

<ExpandableChip client:visible name={`${version} — ${message}`}>
  <div class="entry-body">
    <p class="meta">
      {format(date, "MMMM d, y")}
      {employer ? ` · ${employer}` : null}
    </p>
    <div class="content">
      <Content />
    </div>
  </div>
</ExpandableChip>

<style>
  .entry-body {
    padding: 0 1.25rem 1.25rem;
  }

  .meta {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-text-secondary);
    margin: 0 0 0.75rem;
  }

  .content {
    color: var(--color-text-secondary);
    line-height: 1.6;
  }
</style>
```

- [ ] **Step 5: Fill in `src/pages/work.astro`**

```astro
---
// src/pages/work.astro
import BaseLayout from "../layouts/BaseLayout.astro";
import EyebrowLabel from "../components/shared/EyebrowLabel.astro";
import LedgerEntry from "../components/Work/LedgerEntry.astro";
import FactsTable from "../components/Work/FactsTable.astro";
import { getSortedAuditEntries, getEmployerFacts } from "../content/audit-log-utils";

const entries = await getSortedAuditEntries();
const facts = getEmployerFacts(entries);
---

<BaseLayout title="Work — David P Larsen" description="Work history and audit log for David Larsen.">
  <div class="work-grid">
    <div class="ledger">
      <EyebrowLabel as="h2" text="AUDIT LOG" />
      {entries.map((entry) => <LedgerEntry entry={entry} />)}
    </div>

    <div class="panel">
      <EyebrowLabel as="h2" text="COMPANIES" />
      <FactsTable facts={facts} />
    </div>
  </div>
</BaseLayout>

<style>
  .work-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  @media (min-width: 769px) {
    .work-grid {
      grid-template-columns: 1.4fr 1fr;
    }
  }

  .panel {
    align-self: flex-start;
  }
</style>
```

- [ ] **Step 6: Verify**

```bash
yarn astro check
```

Expected: no errors.

- [ ] **Step 7: Manual check**

`yarn dev`, visit `/work`. Confirm all 12 ledger entries render newest-first, each expands/collapses on click with the entry's body text and date/employer meta, and the facts table on the right lists 4 companies (Nashville Software School, SAFE Health, FanPower, Little Caesars) with correct date ranges (Little Caesars showing "Present").

- [ ] **Step 8: Commit**

```bash
git add src/components/ExpandableChip src/components/Work src/pages/work.astro
git commit -m "feat: build real Work audit-log page"
```

---

### Task 16: Contact page (`/contact`)

**Files:**
- Create: `src/components/Contact/ContactLinks.astro`
- Modify: `src/pages/contact.astro` (fill in real content)

**Interfaces:**
- Produces: `<ContactLinks />`, consumed only here. Replaces `src/components/About/Links/AboutLinks.astro` (deleted in Task 17) — GitHub + LinkedIn only, per spec ("moved out of About. No email address, no contact form").

- [ ] **Step 1: Write `ContactLinks.astro`**

```astro
---
// src/components/Contact/ContactLinks.astro
import { Image } from "astro:assets";
import GitHubImage from "../../images/icons/github.png";
import LinkedInImage from "../../images/icons/linkedin.png";
---

<div class="links">
  <a class="link" href="https://www.github.com/dlars99">
    <Image src={GitHubImage} alt="" width={32} height={32} />
    <span>GitHub</span>
  </a>

  <a class="link" href="https://www.linkedin.com/in/david-larsen-nashville">
    <Image src={LinkedInImage} alt="" width={32} height={32} />
    <span>LinkedIn</span>
  </a>
</div>

<style>
  .links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 20rem;
  }

  .link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    text-decoration: none;
    color: var(--color-text-primary);
    font-weight: 600;
  }
</style>
```

Note: `alt=""` because each link's adjacent text (`GitHub`, `LinkedIn`) already names the destination — the icon is decorative in this layout, unlike the old `AboutLinks.astro` where the icon was the only visible label.

- [ ] **Step 2: Fill in `src/pages/contact.astro`**

```astro
---
// src/pages/contact.astro
import BaseLayout from "../layouts/BaseLayout.astro";
import EyebrowLabel from "../components/shared/EyebrowLabel.astro";
import ContactLinks from "../components/Contact/ContactLinks.astro";
---

<BaseLayout title="Contact — David P Larsen" description="Contact David Larsen.">
  <EyebrowLabel as="h2" text="CONTACT" />
  <div class="contact-body">
    <ContactLinks />
  </div>
</BaseLayout>

<style>
  .contact-body {
    margin-top: 1.5rem;
  }
</style>
```

- [ ] **Step 3: Verify**

```bash
yarn astro check
```

Expected: no errors.

- [ ] **Step 4: Manual check**

`yarn dev`, visit `/contact`. Confirm GitHub and LinkedIn links render and point to the correct profiles, and no email/contact form is present.

- [ ] **Step 5: Commit**

```bash
git add src/components/Contact src/pages/contact.astro
git commit -m "feat: build real Contact page"
```

---

### Task 17: Delete legacy components

**Files:**
- Delete: `src/components/Landing/` (entire directory: `Landing.astro`, `NavBubble/`, `Intro/`, `Skills/`)
- Delete: `src/components/About/About.astro`
- Delete: `src/components/About/Links/` (moved to `Contact/ContactLinks.astro` in Task 16)
- Delete: `src/components/Work/Work.astro`, `src/components/Work/ResumeJob/`, `src/components/Work/JobContent/`, `src/components/Work/jobData.ts`
- Delete: `src/components/Projects/Projects.astro`
- Delete: `src/layouts/Header.astro`, `src/layouts/Section.astro`, `src/layouts/Project.astro`, `src/layouts/ProjectDescription.astro`
- Delete: `src/utilities/useBreakpoint.ts`, `src/utilities/index.ts`
- Modify: `package.json` (remove `use-breakpoint` dependency)
- Modify: `src/assets/files/` — no change (resume PDF import moves nowhere; see Step 3 note)

**Interfaces:**
- No new interfaces. This task only removes code nothing references anymore. Every route already renders from the Task 10–16 component tree.

- [ ] **Step 1: Confirm nothing still imports the files to be deleted**

```bash
grep -rln "components/Landing\|components/About/About\|components/About/Links\|components/Work/Work\|components/Work/ResumeJob\|components/Work/JobContent\|components/Work/jobData\|components/Projects/Projects\|layouts/Header\|layouts/Section\|layouts/Project\b\|layouts/ProjectDescription\|utilities/useBreakpoint\|utilities\"" src --include="*.astro" --include="*.ts" --include="*.tsx"
```

Expected: no matches outside the files being deleted themselves. If anything unexpected shows up, stop and investigate before deleting — don't blindly proceed.

- [ ] **Step 2: Delete the files**

```bash
git rm -r src/components/Landing
git rm src/components/About/About.astro
git rm -r src/components/About/Links
git rm src/components/Work/Work.astro
git rm -r src/components/Work/ResumeJob src/components/Work/JobContent
git rm src/components/Work/jobData.ts
git rm src/components/Projects/Projects.astro
git rm src/layouts/Header.astro src/layouts/Section.astro src/layouts/Project.astro src/layouts/ProjectDescription.astro
git rm src/utilities/useBreakpoint.ts src/utilities/index.ts
```

- [ ] **Step 3: Handle the downloadable-resume link**

The deleted `Work.astro` was the only place that linked to the downloadable resume PDF (`src/assets/files/David Larsen Resume Downloadable.pdf`, imported via `FaFilePdf` + a download link). Nothing in the new site links to it. Add it to the Work page instead of dropping it silently — edit `src/pages/work.astro` to import the PDF and render a download link near the top of the ledger column:

```astro
---
// add to existing frontmatter in src/pages/work.astro
import { FaFilePdf } from "@react-icons/all-files/fa/FaFilePdf";
import resume from "../assets/files/David Larsen Resume Downloadable.pdf";
---
```

```astro
<!-- add inside <div class="ledger">, before the EyebrowLabel -->
<a class="resume-link" href={resume} download>
  <FaFilePdf aria-hidden="true" /> Downloadable resume
</a>
```

```css
/* add to the existing <style> block in src/pages/work.astro */
.resume-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--color-accent);
  text-decoration: none;
}
```

- [ ] **Step 4: Remove the now-unused `use-breakpoint` dependency**

```bash
yarn remove use-breakpoint
```

- [ ] **Step 5: Verify**

```bash
yarn astro check && yarn build
```

Expected: no errors, no dangling imports.

- [ ] **Step 6: Manual check**

`yarn dev`, click through all six routes (`/`, `/about`, `/projects`, `/projects/barkeep`, `/work`, `/contact`) plus `/react-routing-tabs`. Confirm nothing regressed, and that the downloadable-resume link on `/work` works.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: delete legacy single-page components and layouts"
```

---

### Task 18: Remove Panda CSS

**Files:**
- Delete: `panda.config.ts`, `styled-system/`, `textStyles.ts`, `postcss.config.cjs`
- Modify: `package.json` (remove `@pandacss/dev` dependency, remove the `prepare` script, remove the `yarn prepare &&` prefix from the `build` script, remove `@fontsource/nunito-sans`)

**Interfaces:**
- No new interfaces. This is the final removal of the old styling system, safe now that Tasks 2–17 have moved every component off it.

- [ ] **Step 1: Confirm nothing still imports Panda output**

```bash
grep -rln "styled-system\|from \"../textStyles\"\|from \"./textStyles\"\|@fontsource/nunito-sans" src
```

Expected: no matches. If anything shows up, go fix that file first — it was missed in an earlier task.

- [ ] **Step 2: Delete the files**

```bash
git rm -r panda.config.ts styled-system textStyles.ts postcss.config.cjs
```

- [ ] **Step 3: Update `package.json`**

Remove the `prepare` script entirely (it only ran `panda codegen`), and remove `yarn prepare && ` from the front of the `build` script:

```json
"scripts": {
  "dev": "astro dev",
  "start": "astro dev",
  "build": "astro check && astro build",
  "preview": "astro preview",
  "astro": "astro"
}
```

Remove `@pandacss/dev` from `devDependencies` and `@fontsource/nunito-sans` from `dependencies`:

```bash
yarn remove @pandacss/dev @fontsource/nunito-sans
```

- [ ] **Step 4: Verify**

```bash
yarn build
```

Expected: succeeds without running `panda codegen` at all.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove Panda CSS entirely"
```

---

### Task 19: Final accessibility and production build verification

**Files:** none (verification only)

**Interfaces:** none — this task consumes the finished site and confirms it against spec §9's testing requirements.

- [ ] **Step 1: Full production build and preview**

```bash
yarn build && yarn preview
```

Expected: build succeeds; visit every route (`/`, `/about`, `/projects`, `/projects/barkeep`, `/projects/gearpatch`, `/projects/greener`, `/projects/portfolio`, `/projects/rrt`, `/work`, `/contact`, `/react-routing-tabs`) in the preview server and confirm each renders without console errors.

- [ ] **Step 2: Keyboard-only walkthrough**

Using only Tab/Shift+Tab/Enter/Escape (no mouse):

- From `/`, tab through the sidebar links in order (About → Projects → Work → Contact), confirm visible focus rings and that Enter navigates.
- On `/work`, tab to a ledger entry's expand button, press Enter, confirm it expands and focus stays sensible; collapse it the same way.
- Resize the viewport to `≤768px`. Tab to the hamburger button, press Enter, confirm focus moves into the overlay and Tab cycles only within it (doesn't escape to content behind the backdrop), and Escape closes it and returns focus to the hamburger button.
- Tab to the mobile audit ticker, press Enter, confirm the same focus-trap behavior in the bottom sheet, and that `[EXPLORE FULL LOG ->]` is reachable and navigates to `/work`.

- [ ] **Step 3: `aria-current` and reduced-motion check**

- With DevTools open, click through all four sidebar routes and confirm exactly one `<a data-nav-link>` carries `aria-current="page"` at a time, matching the visibly active route.
- In DevTools, enable "Emulate CSS media feature prefers-reduced-motion: reduce," reload at `≤768px`, and confirm the mobile audit ticker no longer auto-rotates (it should stay on the first entry until tapped).

- [ ] **Step 4: View-transition persistence smoke test**

Add a temporary `console.log("sidebar mounted")` at the top of `Sidebar.astro`'s `<script>` block, reload the site, and click through all six main routes. The log should print exactly once (confirming the element truly isn't remounting), not once per navigation. Remove the temporary log line afterward.

- [ ] **Step 5: Confirm no regressions in `git status`**

```bash
git status
```

Expected: clean tree (all work from this task was verification-only, nothing to commit) other than the temporary console.log added and removed in Step 4, which should already be reverted.

- [ ] **Step 6: Update `CHANGELOG.md`**

This rebuild is a breaking change to the site's structure, matching the precedent set by the `[1.0.0]` entry. Add a new entry above the existing top entry:

```markdown
## [2.0.0] - 2026-08-19

### Changed

**BREAKING** -- Rebuilt the site around a routed "system ledger" motif: persistent
left-sidebar navigation and an audit-log status bar replace the old single-page
anchor-scroll layout.

- Upgraded Astro 4.15.2 → Astro 5
- Replaced the single-page scroll layout with routed pages (`/`, `/about`,
  `/projects`, `/projects/[slug]`, `/work`, `/contact`)
- Replaced `Astro.glob()` content loading with Astro 5 content-layer
  collections; added a new audit-log collection driving the persistent
  status bar, the mobile ticker/sheet, and the `/work` page
- Removed Panda CSS entirely in favor of CSS custom properties, scoped
  `<style>` blocks, and CSS Modules
- Removed the `NavBubble` component

### Removed

- `jobData.ts`, replaced by the audit-log content collection
```

```bash
git add CHANGELOG.md
git commit -m "docs: log 2.0.0 portfolio refresh in changelog"
```

---

## Self-Review Notes

- **Spec coverage:** every numbered section of the design spec maps to a task — §2 routing/transitions/content-layer (Tasks 3, 10), §2 React-island scoping (Tasks 6–9 split desktop/mobile), §3 tokens/fonts (Task 2), §4 nav/chrome desktop+mobile (Tasks 6–9), §5 all five pages (Tasks 11–16), §6 data model (Tasks 3–4), §7 styling migration (Tasks 2, 12, 14, 15, 18), §8 deployment (Task 1, confirmed unchanged), §9 testing/a11y/non-goals (Task 19; non-goals deliberately not built anywhere), §10 component carryover (Task 17's deletions map 1:1 to the carryover table's "Removed"/"Replaced" rows).
- **Type consistency:** `AuditEntry`/`EmployerFacts` (Task 4) are used with matching shapes in Tasks 7, 9, 15. `ProjectLink`/`LinkType` (Task 14) match the existing `demoMap` and collection schema (Task 3). `CollectionEntry<"projects">` and `CollectionEntry<"auditLog">` prop types are consistent everywhere they're consumed.
- **Known deferred decision:** Task 13 explicitly flags that project-card screenshots are out of scope for v1 rather than guessing — surfaced to the user, not silently dropped.
