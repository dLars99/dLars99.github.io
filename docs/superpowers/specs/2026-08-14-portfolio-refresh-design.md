# Portfolio Refresh — Design Spec

## 1. System Overview

* **Site goal:** A high-density, editorial portfolio for a full-stack engineer, built around a persistent "system ledger" motif — the site presents David's career and projects as a live git-style audit log.
* **Core philosophy:** Low density visual noise, high scannability, precision typography, zero fluff. The site behaves like an active desktop application with a real-time-feeling status feed, even though its content is fully static.
* **Replaces:** The current single-page scrolling site (`Landing` → `About` → `Work` → `Projects`, anchor-linked, `NavBubble` floating nav, Panda CSS).

## 2. Architecture & Routing

* **Framework:** Astro, upgraded from 4.15.2 to **Astro 5**. The upgrade is bundled into this rebuild rather than done separately, since routing, styling, and content-collection code are all being rewritten anyway.
* **Routing:** Separate routed pages replace the single-page anchor scroll:
  * `/` — landing/hero (see §4). Reached via the `DAVID P. LARSEN` wordmark in the sidebar; not itself a nav item.
  * `/about`
  * `/projects` and `/projects/[slug]` (project detail)
  * `/work`
  * `/contact`
* **Transitions:** Astro 5's `<ClientRouter/>` provides View Transitions page swaps.
* **Persistent chrome:** The left sidebar nav and the Audit Log status bar both carry `data-astro-transition-persist`, so they never re-mount across route changes — only the content stage swaps.
* **Content collections:** Migrate `src/content/projects/*.md` (and the new audit-log collection, §6) from `Astro.glob()` to Astro 5's content-layer `getCollection()` API.
* **React islands:** React is kept only where real interactivity is needed:
  * The `react-routing-tabs` demo pages (`/react-routing-tabs`, `/react-routing-tabs/[tab]`) — unchanged, they showcase the actual npm package.
  * Small interactive chrome: mobile nav drawer, audit-log bottom sheet, `ExpandableChip`-style expand/collapse for ledger entries.
  * `NavBubble` (component, hooks, styles) is deleted outright — the sidebar replaces it entirely.

## 3. Design Tokens & Typography

| Token | Value | Usage |
|---|---|---|
| Canvas background | `#F3F1EC` | Page background |
| Accent (emerald) | `#10B981` | Active nav dot, links, audit-bar highlights, eyebrow labels |
| Text primary | `#111111` | Headings, active labels |
| Text secondary | `#666666` | Descriptions, muted metadata |
| Border/hairline | Light gray (e.g. `#DDDDDD`) | Card and panel dividers |
| Primary typeface | Geist Sans | Headings, body, nav |
| Monospace typeface | Geist Mono | Audit log text, bracket eyebrow labels (`[BIOGRAPHY]`, `[FRONTEND ARCHITECTURE & SYSTEMS]`), version tags, stat numbers |

Both fonts installed via `@fontsource`, replacing `@fontsource/nunito-sans`.

## 4. Navigation & Chrome

### Desktop (`> 768px`)

* Fixed 280px left sidebar: `DAVID P. LARSEN` wordmark (links to `/`), then ABOUT / PROJECTS / WORK / CONTACT. An emerald dot (`#10B981`) sits beside the active route and animates its position on navigation.
* Audit Log Status Bar fixed at the bottom of the content stage: version tag (e.g. `v4.2.0`) + rotating commit-style message, prev/next arrows to cycle recent entries, and a `[VIEW FULL LOG]` button that routes to `/work`.

### Mobile (`≤ 768px`)

Two independent, coexisting pieces of chrome:

* **Nav:** a hamburger icon that expands the full nav list (About/Projects/Work/Contact) as an overlay.
* **Audit Log:** a separate top ticker bar showing the rotating commit-style message; tapping it opens a spring-animated bottom-sheet drawer with recent entries and an `[EXPLORE FULL LOG ->]` button (also routing to `/work`).

These are not alternatives to each other — both exist simultaneously.

## 5. Pages

### Landing (`/`)

Self-referential hero content demonstrating the site's own build quality:

* Eyebrow tag, e.g. `[FRONTEND ARCHITECTURE & SYSTEMS]`
* Headline + subhead (e.g. "Engineering UI Systems with Zero Runtime Overhead")
* Three stat cards: render overhead, Lighthouse score, frame budget. **Static, hand-asserted content for v1** — not wired to a live Lighthouse CI run.
* "Capabilities & System Design Primitives" list (e.g. Design System Engine, High-Density Grids, Stateful Micro-Physics), each row linking out — for v1, pointed at the most relevant real project detail page rather than new dedicated routes.

### About (`/about`)

Two-column layout:

* `[BIOGRAPHY]` — existing bio prose, carried over from `Bio.astro`.
* `[ENGINEERING FOCUS]` — a paired key/value table of real skills (e.g. State Management → React/Context, API Design → Node/Express & REST, Data → PostgreSQL/MongoDB, Languages → TypeScript), replacing the placeholder table text from the mockups.

### Projects (`/projects`, `/projects/[slug]`)

* List page: the 5 real projects (Barkeep, GearPatch, Greener, Portfolio, React Routing Tabs) as cards — headline, description, real project screenshot, `[VIEW DETAILS]`.
* Detail page: existing screenshot carousel (`StaggeredImages`) in the main stage; right panel adds `My Role & Approach` / `Interface Challenges & Solutions` prose (new content-collection fields, first-pass copy drafted from existing project bodies) and a `Tech Stack` icon row driven by the existing `tech: []` frontmatter.

### Work (`/work`)

The full Audit Log. A chronological ledger of hand-authored, resume-flavored "commit" entries (role changes, shipped features, promotions) — **not** generated from real git/CHANGELOG history. This is the same data source the persistent Audit Log bar rotates through; `[VIEW FULL LOG]` and `[EXPLORE FULL LOG ->]` both land here. Entries can carry an employer/tag for grouping so the page still reads as a work history. Right panel: a facts table (company/dates/location). Entries expand/collapse via the existing `ExpandableChip` pattern.

### Contact (`/contact`)

GitHub + LinkedIn links only (moved out of About). No email address, no contact form.

## 6. Data Model

* **Audit Log collection** (new — `src/content/audit-log/*.md`, matching the existing `content/projects/*.md` pattern): frontmatter for version tag, date, message, optional employer/tag; Markdown body for longer entry detail shown when expanded on `/work`. Feeds the persistent bar, the mobile ticker/sheet, and the `/work` full ledger — one source, three surfaces. Replaces `jobData.ts`, which is retired in favor of this collection.
* **Projects collection** (`src/content/projects/*.md`): existing fields (`id`, `title`, `description`, dates, `links`, `tech`) unchanged; adds `role` and `challenges`.

## 7. Styling Migration

Panda CSS is removed entirely:

* Delete `panda.config.ts`, `styled-system/`, `@pandacss/dev`, the `panda codegen` prepare step, `textStyles.ts`, and `postcss.config.cjs` (confirm nothing else depends on PostCSS before removing it).
* Add `src/styles/tokens.css` (custom properties per §3) and `src/styles/global.css` (reset, shared keyframes for the nav-dot transition and drawer animations).
* Astro components use scoped `<style>` blocks. React islands use co-located `.module.css` files.
* `cva()`-based variant components (e.g. `Header.astro`) are rewritten as plain CSS with data-attribute or class-based variants.

## 8. Deployment

No change from the current setup: GitHub Actions (`withastro/action`) → GitHub Pages, same custom domain (`davidplarsen.com` via `CNAME`). Confirm during implementation whether Astro 5 raises the minimum Node version and bump `deploy.yml`'s `node-version` if so.

## 9. Testing & Non-Goals

* **Testing:** `astro check` for type-checking (already in the build script). Manual QA of view-transition persistence (sidebar/audit-bar must not remount or flash on navigation). Accessibility pass on the new nav — keyboard focus order, `aria-current` on the active route, focus trapping in the mobile drawer/sheet — continuing the a11y discipline established in recent commits (e.g. back-button a11y). No new automated test framework is being introduced; none exists in the repo today.
* **Non-goals for this pass:** no contact form or backend, no live Lighthouse CI wired to the landing-page stat cards, no CMS. Content stays in local Markdown/JSON, as today.

## 10. Component Carryover

| Component | Fate |
|---|---|
| `Landing/NavBubble/*` | Removed |
| `Landing/Intro`, `Landing/Skills` | Content folds into new `/` landing page |
| `About/*` | Restructured into `/about` two-column layout; content (Bio, links) carries over |
| `Work/*`, `jobData.ts` | Replaced by the audit-log-driven `/work` ledger |
| `Projects/*`, `content/projects/*.md` | Restructured into list + detail pages; schema extended |
| `RrtDemo/*`, `react-routing-tabs` pages | Unchanged |
| `ExpandableChip` | Reused for audit-log entry expand/collapse |
| `styled-system/`, `panda.config.ts`, `textStyles.ts` | Removed |
