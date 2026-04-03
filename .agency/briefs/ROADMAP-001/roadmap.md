# float on - Improvement Roadmap

**Project**: GitHub Pages Hosting Hub (float on)
**URL**: https://elymas.github.io
**Created**: 2026-04-03
**Based on**: Website audit analysis (2026-04-03)

---

## Current State Summary

### Tech Stack
- Astro 6 + Tailwind CSS 4 + TypeScript
- GitHub Actions CI/CD → GitHub Pages
- pnpm 9, Node.js 22

### Source Files (12 files)
- 5 components (Header, Footer, ProjectCard, ProjectGrid, ThemeToggle)
- 2 pages (index.astro, 404.astro)
- 1 layout (BaseLayout.astro)
- 1 data file (projects.json - 3 projects, all "Coming Soon")
- 1 type definition, 1 utility, 1 global CSS

### Completed Fixes (2026-04-03, commit 957faa7)
- [x] Custom 404 page with brand design
- [x] Mobile navigation links visible
- [x] Coming Soon cards: `<a>` -> `<div>` for accessibility
- [x] `<meta name="theme-color">` for light/dark

### Performance Baseline
- Total load: 859ms, TTFB: 216ms
- Network: 2 requests (HTML 13KB + CSS 50KB)
- Console errors: 0

---

## Roadmap Phases

### Phase 1: Brand Foundation
**Goal**: Establish brand identity so all future work has a design anchor.
**Estimated Scope**: 5 files modified
**Priority**: HIGH
**Dependency**: None

| # | Task | File(s) | Description |
|---|------|---------|-------------|
| 1.1 | Fill brand voice context | `.agency/context/brand-voice.md` | Define voice attributes, tone spectrum, language rules, sample phrases for "float on" brand |
| 1.2 | Fill visual identity context | `.agency/context/visual-identity.md` | Document existing cream/charcoal palette, Georgia serif typography, cloud motif, spacing scale |
| 1.3 | Fill target audience context | `.agency/context/target-audience.md` | Define primary persona (developer managing multiple GitHub Pages sites) |
| 1.4 | Fill tech preferences context | `.agency/context/tech-preferences.md` | Document Astro 6, Tailwind CSS 4, pnpm, GitHub Pages stack |
| 1.5 | Fill quality standards context | `.agency/context/quality-standards.md` | Set performance targets, accessibility requirements, browser support |

**How to execute**: `/agency brief` (triggers client interview flow)

---

### Phase 2: UX Polish
**Goal**: Fix remaining HIGH-priority visual and interaction issues.
**Estimated Scope**: 4 files modified
**Priority**: HIGH
**Dependency**: None (can run parallel with Phase 1)

| # | Task | File(s) | Description |
|---|------|---------|-------------|
| 2.1 | Improve dark mode card contrast | `src/components/ProjectCard.astro`, `src/styles/global.css` | Increase contrast between card background (`surface-900`) and page background (`surface-950`). Make tech stack badges more distinguishable in dark mode. |
| 2.2 | Fix tablet grid asymmetry | `src/components/ProjectGrid.astro` | 3 items in 2-column grid leaves 1 orphan card. Options: (A) force 1-col on tablet, (B) add a "suggest a project" placeholder 4th card, (C) use `grid-cols-1 md:grid-cols-3` to skip 2-col entirely. |
| 2.3 | Enhance hero section | `src/pages/index.astro` | Add a subtitle/description below the heading. Add a subtle CTA (e.g., "Browse projects" anchor link to #projects). Enlarge cloud SVG for more visual weight. |
| 2.4 | Add View Transitions | `src/layouts/BaseLayout.astro` | Add Astro View Transitions for smooth page navigation (404 -> home, future pages). Import `ViewTransitions` from `astro:transitions`. |

---

### Phase 3: Content & First Active Project
**Goal**: Transform from placeholder to functional hub with at least one live sub-project.
**Estimated Scope**: New repository + hub updates
**Priority**: HIGH
**Dependency**: Phase 2 recommended (but not blocking)

| # | Task | File(s) / Scope | Description |
|---|------|-----------------|-------------|
| 3.1 | Create first sub-project repository | New repo: `elymas/blog` or `elymas/learn-react` | Create and deploy one actual sub-project to have a live link. Priority target from product.md: educational one-page or tech blog. |
| 3.2 | Update projects.json | `src/data/projects.json` | Change first project status from "coming-soon" to "active" with real URL. |
| 3.3 | Add project thumbnail support | `src/components/ProjectCard.astro`, `src/types/project.ts` | Implement optional `thumbnail` field rendering. Screenshots or preview images make cards more engaging. |
| 3.4 | Add "featured" visual distinction | `src/components/ProjectCard.astro` | Featured projects (`featured: true`) get a subtle visual indicator (e.g., border accent, star icon). Currently the flag exists in data but has no visual effect. |

---

### Phase 4: SEO & Social
**Goal**: Optimize for search engines and social media sharing.
**Estimated Scope**: 3-5 files modified
**Priority**: MEDIUM
**Dependency**: Phase 3 (need real content for SEO value)

| # | Task | File(s) | Description |
|---|------|---------|-------------|
| 4.1 | Verify OG image dimensions | `public/banner.png` | Ensure 1200x630px for optimal social sharing. Regenerate if needed with brand design. |
| 4.2 | Add JSON-LD structured data | `src/layouts/BaseLayout.astro` | Add Organization and WebSite schema for rich search results. |
| 4.3 | Add individual project OG tags | `src/pages/index.astro` or future project pages | Per-project social previews if individual project pages are added. |
| 4.4 | Verify sitemap accuracy | `astro.config.mjs` | Confirm sitemap includes all pages (index + 404 should be excluded from sitemap). |

---

### Phase 5: Advanced Features
**Goal**: Implement product vision features from product.md.
**Estimated Scope**: Multiple files, possible new pages
**Priority**: MEDIUM-LOW
**Dependency**: Phases 1-3

| # | Task | File(s) / Scope | Description |
|---|------|-----------------|-------------|
| 5.1 | Project filtering/sorting | `src/pages/index.astro`, `src/components/ProjectGrid.astro` | Filter by type (blog, docs, tutorial, etc.) and sort by status. Useful when project count grows beyond 5. |
| 5.2 | About/Contact page | `src/pages/about.astro` | Optional personal/brand page. Adds depth to the hub. |
| 5.3 | RSS feed for project updates | `astro.config.mjs`, new integration | Notify subscribers when new projects are added. |
| 5.4 | Template system documentation | New docs page or README section | Document how to create new sub-projects with basePath auto-configuration per framework. |
| 5.5 | Animation & micro-interactions | Various components | Subtle entrance animations for cards, smooth scroll, hover states. Consider `prefers-reduced-motion`. |

---

## Quick Wins (Can Do Anytime)

These are small, independent improvements with no phase dependency:

| Task | Effort | Impact |
|------|--------|--------|
| Add `loading="lazy"` to future images | 5 min | Performance |
| Add `rel="me"` to GitHub link for Mastodon verification | 2 min | Social proof |
| Add `robots.txt` exclusion for 404 page | 2 min | SEO |
| Add keyboard focus styles for project cards | 10 min | Accessibility |
| Add `prefers-reduced-motion` media query | 10 min | Accessibility |

---

## Execution Recommendations

### Recommended Order
```
Phase 1 (Brand) ──────────┐
                           ├──> Phase 3 (Content) ──> Phase 4 (SEO)
Phase 2 (UX Polish) ──────┘                              │
                                                          v
                                                    Phase 5 (Advanced)
```

Phases 1 and 2 can run in parallel. Phase 3 benefits from both being complete but is not strictly blocked.

### Agency Pipeline Usage
- **Phase 1**: `/agency brief` (client interview for brand context)
- **Phase 2**: `/agency build` with BRIEF targeting UX fixes
- **Phase 3**: Manual repo creation + `/agency build` for hub updates
- **Phase 4-5**: `/agency build` per feature set

### Metrics to Track
- Lighthouse scores (target: 90+ across all categories)
- Number of active projects (target: 3+ within 3 months)
- Core Web Vitals (maintain current excellent baseline)
