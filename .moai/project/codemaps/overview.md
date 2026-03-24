# GitHub Pages Hosting Hub - Architecture Overview

## Project Goals

- Multi-repository static site hub using GitHub Pages
- Main hub at elymas.github.io (Astro 6 SSG)
- Sub-projects at elymas.github.io/{repo-name} (framework-agnostic)
- Automated deployment via GitHub Actions

## Architecture Pattern

**Multi-Repository Static Site Hub**

The main hub (`github-pages` repository) serves as a central portal. Each sub-project is an independent repository with its own deployment pipeline. The hub links to sub-projects but does not control them.

## Status

**Implemented** - Live at https://elymas.github.io

Build: 0 TypeScript errors, 0 warnings, ~867ms build time
Output: `dist/` (index.html, sitemap-index.xml, favicon.svg, robots.txt)

---

## Component Architecture

The hub contains 5 Astro components:

| Component | File | Responsibility |
|---|---|---|
| Header | `src/components/Header.astro` | Site header with logo and navigation |
| Footer | `src/components/Footer.astro` | Site footer |
| ProjectCard | `src/components/ProjectCard.astro` | Individual project card display |
| ProjectGrid | `src/components/ProjectGrid.astro` | Card grid layout container |
| ThemeToggle | `src/components/ThemeToggle.astro` | Dark/light theme switch button |

Supporting files:

| File | Responsibility |
|---|---|
| `src/layouts/BaseLayout.astro` | Base HTML layout (head, header, main, footer) |
| `src/pages/index.astro` | Home page entry point |
| `src/data/projects.json` | Sub-project registry (static data) |
| `src/types/project.ts` | TypeScript Project interface definition |
| `src/utils/projects.ts` | Project data loading and filtering utilities |
| `src/styles/global.css` | Tailwind CSS v4 import and global styles |

---

## Data Flow

```
src/data/projects.json
        |
        v
src/utils/projects.ts   (load + filter)
        |
        v
src/pages/index.astro   (passes data to components)
        |
        v
src/components/ProjectGrid.astro
        |
        v
src/components/ProjectCard.astro  (renders each project)
```

---

## Build Pipeline

```
pnpm build
    |
    +-- astro check   (TypeScript type checking - 0 errors required)
    |
    +-- astro build   (static site generation)
            |
            v
        dist/
          ├── index.html
          ├── sitemap-index.xml
          ├── favicon.svg
          └── robots.txt
```

**Build time**: ~867ms
**Build result**: 0 errors, 0 warnings

---

## Deployment Pipeline

```
git push origin main
        |
        v
GitHub Actions (.github/workflows/deploy.yml)
        |
        +-- actions/checkout@v4
        +-- actions/setup-node@v4  (Node.js 22)
        +-- pnpm/action-setup@v4
        +-- pnpm install
        +-- pnpm build
        +-- actions/upload-pages-artifact@v3  (dist/)
        +-- actions/deploy-pages@v4
        |
        v
https://elymas.github.io
```

---

## Technology Stack (Actual)

| Package | Version | Integration Method |
|---|---|---|
| astro | ^6.0.8 | Core framework |
| tailwindcss | ^4.2.2 | via @tailwindcss/vite (NOT @astrojs/tailwind) |
| @astrojs/sitemap | ^3.7.1 | Astro integration |
| @astrojs/check | ^0.9.8 | Build-time type checking |
| typescript | ^6.0.2 | Type safety |
| prettier | ^3.8.1 | Code formatting |
| prettier-plugin-astro | ^0.14.1 | Astro file formatting |

**Runtime requirement**: Node.js 22.x+ (Astro 6 requirement)
**Package manager**: pnpm 9.x+
