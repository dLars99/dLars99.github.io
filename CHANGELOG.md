# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-09-14

### Changed

**BREAKING** -- Rebuilt the site around a routed "system ledger" motif: persistent
left-sidebar navigation and an audit-log status bar replace the old single-page
anchor-scroll layout.

- Upgraded Astro 4.15.2 → Astro 7
- Replaced the single-page scroll layout with routed pages (`/`, `/about`,
  `/projects`, `/projects/[slug]`, `/work`, `/contact`)
- Replaced `Astro.glob()` content loading with Astro content-layer
  collections; added a new audit-log collection driving the persistent
  status bar, the mobile ticker/sheet, and the `/work` page
- Removed Panda CSS entirely in favor of CSS custom properties, scoped
  `<style>` blocks, and CSS Modules
- Removed the `NavBubble` component

### Removed

- `jobData.ts`, replaced by the audit-log content collection

## [1.2.2] - 2025-04-14

### Fixed

- Fixed missing label on back buttons

## [1.2.1] - 2025-04-14

### Changed

- Updated downloadable resume

## [1.2.0] = 2025-04-11

### Changed

- Updated resume to reflect promotion

## [1.1.0] - 2024-09-09

### Changed

- Resume updates

## [1.0.0] - 2024-09-05

### Added

**BREAKING** -- New portfolio construction based around Astro and React. This replaces the old site, which was built on an HTML/JQuery template

- NPM init
- Astro init with Typescript
- React plugin for Astro
- All new components for new portfolio sections: Landing, About, Work, Projects
- Secondary page to demo react-routing-tabs
- Styles with PandaCSS
- GitHub Action for deployment
- This Changelog

### Changed

- README updated for new structure

### Removed

- All files used by the old static site

[unreleased]: https://github.com/dlars99/dLars99.github.io/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/dlars99/dLars99.github.io/releases/tag/v1.0.0
