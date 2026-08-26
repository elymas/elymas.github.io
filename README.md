# GitHub Pages Hosting Hub

A personal portfolio hub built with Astro 6, serving as a central gateway to all sub-projects hosted under [elymas.github.io](https://elymas.github.io).

![Astro](https://img.shields.io/badge/Astro-6.x-FF5D01?logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub_Pages-222?logo=github&logoColor=white)

**Live site**: https://elymas.github.io

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Astro](https://astro.build) | ^6.0.8 | Static site framework (SSG) |
| [Tailwind CSS](https://tailwindcss.com) | ^4.2.2 | Utility-first CSS (via @tailwindcss/vite) |
| [TypeScript](https://www.typescriptlang.org) | ^6.0.2 | Type safety |
| [pnpm](https://pnpm.io) | 9.x+ | Package manager |
| GitHub Actions | - | CI/CD pipeline |
| GitHub Pages | - | Static hosting |

---

## Quick Start

### Prerequisites

- Node.js 22.x or later
- pnpm 9.x or later

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Opens a local dev server at `http://localhost:4321`.

### Build

```bash
pnpm build
```

Runs type checking (`astro check`) and builds the site to `dist/`.

### Preview

```bash
pnpm preview
```

Previews the production build locally.

---

## Adding a New Sub-Project

Sub-projects are managed through a single JSON file. To add a new project:

1. Open `src/data/projects.json`
2. Add a new entry to the array — **new entries go at the top** (the grid renders in file order, so newest-first is a free convention):

```json
{
  "name": "My New Project",
  "description": "A short description of what this project does.",
  "url": "https://elymas.github.io/my-new-project",
  "type": "landing",
  "techStack": ["React", "TypeScript"],
  "tags": ["threejs", "visualization"],
  "status": "active"
}
```

3. Commit and push to `main` — the site redeploys automatically.

### Field reference

| Field | Required | Description |
|---|---|---|
| `name` | ✓ | Display title (serif headline on the card) |
| `description` | ✓ | Short description, clamped to 3 lines on the card |
| `url` | ✓ | Primary link — live site, or the repository if there is no site (repo links automatically get a GitHub mark) |
| `type` | ✓ | Category — drives the filter chips and card badge (see below) |
| `techStack` | ✓ | Tech chips shown in mono at the card bottom |
| `repository` | – | Secondary source-code link; renders a small code icon on the card |
| `tags` | – | Free-form keywords, included in search only |
| `status` | – | `"active"` (default), `"coming-soon"` (badge, no link), `"archived"` (dimmed) |

### Project types

Known `type` values (each gets its own icon, dot color, and filter chip): `"app"`, `"blog"`, `"docs"`, `"landing"`, `"game"`, `"tutorial"`, `"portfolio"`.

Any other string also works — it falls back to a generic badge and still appears as a filter chip, so you never have to touch code to ship a new project. To give a new type a proper icon/color, register it in `src/utils/project-meta.ts`.

### Filters & search

The projects section ships a toolbar with type filter chips and a text search (name, description, tech, tags). Both are pure client-side enhancements — the full grid is server-rendered, so it works without JavaScript too. Press `/` anywhere to focus the search box. Adding or removing projects updates the chip counts automatically at build time.

---

## Deployment

Deployment is fully automated via GitHub Actions.

**Trigger**: Any push to the `main` branch
**Pipeline**: `pnpm install` → `astro check` → `astro build` → deploy `dist/` to GitHub Pages
**Node.js version**: 22 (required by Astro 6)

The workflow file is located at `.github/workflows/deploy.yml`.

To enable GitHub Pages for this repository:
1. Go to **Settings > Pages**
2. Set **Source** to `GitHub Actions`

---

## Directory Structure

```
github-pages/
├── src/
│   ├── components/        # Astro components (Header, Footer, ProjectCard, ProjectGrid, ThemeToggle)
│   │                       # ProjectGrid includes the filter/search toolbar
│   ├── layouts/           # Base page layout
│   ├── pages/             # index.astro (home page)
│   ├── data/              # projects.json (project registry)
│   ├── types/             # TypeScript interfaces
│   ├── utils/             # Data loading utilities + type registry (project-meta.ts)
│   └── styles/            # global.css (Tailwind CSS v4)
├── public/
│   └── favicon.svg
├── astro.config.mjs       # Astro configuration
├── package.json
└── tsconfig.json
```

---

## Sub-Projects Architecture

This hub uses the **Multi-Repository Static Site Hub** pattern:

```
elymas.github.io              (this repository - main hub)
elymas.github.io/blog         (separate repository: blog)
elymas.github.io/docs         (separate repository: docs)
elymas.github.io/learn-react  (separate repository: learn-react)
```

Each sub-project is an independent repository with its own GitHub Actions deployment pipeline. The main hub only links to sub-projects; it does not control their deployment.

---

## License

MIT
