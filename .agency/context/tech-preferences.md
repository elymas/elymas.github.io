<!-- 
  Agency Brand Context: Tech Preferences
  
  This file is part of the Agency Brand Context (constitution).
  It is NOT auto-modified by the learner agent.
  Changes require manual editing by the user.
  It serves as the foundation for all agency skill evolution.
  
  Fill this file during the first `/agency brief` run via client interview.
-->

# Tech Preferences

## Frontend Framework

Framework: Astro 6
<!-- Static site generator with component islands architecture -->

Version: ^6.0.8 (latest stable)
<!-- Defined in package.json -->

Rendering Strategy: Static output (output: 'static' in astro.config.mjs)
<!-- Fully pre-rendered at build time; no server-side rendering -->

## Styling

Approach: Tailwind CSS 4 (via @tailwindcss/vite plugin)
<!-- Configured as Vite plugin in astro.config.mjs, not as Astro integration -->

CSS Architecture: Utility-first with @theme custom properties for brand colors; @layer base for font stack overrides
<!-- Custom color scales defined in src/styles/global.css using @theme block -->

Theme System: CSS custom properties for design tokens, dark mode via class strategy (@custom-variant dark)
<!-- FOUC prevention script applies .dark class before paint based on localStorage or system preference -->

## Component Library

Library: None; all components are hand-written Astro components
<!-- No external component library; 6 custom .astro components in src/components/ -->

Customization Level: Full ownership; all components, layouts, and pages are bespoke
<!-- Header, Footer, ThemeToggle, ProjectGrid, ProjectCard, BaseLayout -->

Animation Library: None; CSS transitions only (transition-colors, transition-opacity, transition-all duration-200)
<!-- Subtle hover effects and color transitions via Tailwind utility classes -->

## Language

Language: TypeScript 6.x
<!-- ^6.0.2 in devDependencies; used for Astro component frontmatter and utilities -->

Strict Mode: Yes, extends astro/tsconfigs/strict
<!-- Path aliases configured: @/* maps to src/* -->

Linting: No ESLint configured (no .eslintrc or eslint.config in project root)
<!-- Relies on TypeScript strict checking and astro check -->

Formatting: Prettier 3.x with prettier-plugin-astro
<!-- Config: semi, singleQuote, trailingComma: all, printWidth: 100, tabWidth: 2 -->

## Build Tool

Bundler: Vite (via Astro's built-in Vite integration)
<!-- Tailwind CSS configured as Vite plugin -->

Package Manager: pnpm 9
<!-- Lock file: pnpm-lock.yaml -->

Monorepo Tool: N/A (single-project repository)
<!-- Each GitHub Pages sub-site is a separate repository -->

## Hosting and Deployment

Platform: GitHub Pages (static hosting)
<!-- Free hosting tied to elymas GitHub account -->

CI/CD: GitHub Actions (automated build and deploy on push to main)
<!-- Astro build includes astro check + astro build -->

Environment Strategy: Single environment (production only); local dev via astro dev
<!-- No staging or preview deployment infrastructure -->

Domain: elymas.github.io (GitHub Pages default domain)
<!-- Configured as site URL in astro.config.mjs -->

## External Integrations

### Analytics

Provider: None
<!-- No analytics integration; static site with no tracking -->

### CMS

Provider: TypeScript data file (src/utils/projects.ts)
<!-- Project data is hardcoded in source; no external CMS -->

### Authentication

Provider: None (static site, no user accounts)
<!-- No authentication required -->

### Database

Provider: None (static site, no server-side data)
<!-- All data is build-time static -->

ORM: N/A
<!-- No database -->

### Email

Provider: None
<!-- No email functionality -->

### Payments

Provider: None
<!-- No monetization -->

### Error Tracking

Provider: None
<!-- No error tracking; static site with no runtime server -->

### Feature Flags

Provider: None
<!-- No feature flags -->

## Development Environment

IDE: Claude Code (terminal-based AI development)
<!-- MoAI-ADK agent system configured in .claude/ and .moai/ directories -->

Node Version: 22 LTS
<!-- No .nvmrc file; version inferred from package.json engine compatibility -->

OS Targets: macOS primary (Darwin), Linux CI (GitHub Actions)
<!-- Development on macOS; deployment via GitHub Actions Linux runners -->
