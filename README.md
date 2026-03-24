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
2. Add a new entry to the array:

```json
{
  "name": "My New Project",
  "description": "A short description of what this project does.",
  "url": "https://elymas.github.io/my-new-project",
  "type": "landing",
  "techStack": ["React", "TypeScript"]
}
```

3. Commit and push to `main` — the site redeploys automatically.

**Available `type` values**: `"portfolio"`, `"blog"`, `"docs"`, `"landing"`, `"tool"`, `"demo"`

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
│   ├── layouts/           # Base page layout
│   ├── pages/             # index.astro (home page)
│   ├── data/              # projects.json (project registry)
│   ├── types/             # TypeScript interfaces
│   ├── utils/             # Data loading utilities
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
