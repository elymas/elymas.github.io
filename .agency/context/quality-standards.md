<!-- 
  Agency Brand Context: Quality Standards
  
  This file is part of the Agency Brand Context (constitution).
  It is NOT auto-modified by the learner agent.
  Changes require manual editing by the user.
  It serves as the foundation for all agency skill evolution.
  
  Fill this file during the first `/agency brief` run via client interview.
-->

# Quality Standards

## Performance Targets

### Core Web Vitals

LCP (Largest Contentful Paint): < 1.5s
<!-- Lightweight static site with no images or external fonts -->

INP (Interaction to Next Paint): < 100ms
<!-- Minimal JavaScript; only theme toggle interaction -->

CLS (Cumulative Layout Shift): < 0.05
<!-- No dynamic content loading, no external fonts, no layout shifts -->

### Lighthouse Scores

Performance: >= 95
<!-- Static site with system fonts and no external resources should score near-perfect -->

Accessibility: >= 95
<!-- Semantic HTML, aria labels on icons, proper heading hierarchy -->

Best Practices: >= 95
<!-- HTTPS via GitHub Pages, no deprecated APIs, SVG favicon -->

SEO: >= 95
<!-- Meta tags, OG tags, canonical URLs, sitemap.xml via @astrojs/sitemap -->

### Bundle Size Budgets

Initial JS: < 10KB gzipped
<!-- Only inline theme toggle script and Astro runtime; no framework JS shipped -->

Per-Route JS: < 5KB gzipped
<!-- Static pages with minimal client-side interactivity -->

Total CSS: < 20KB gzipped
<!-- Tailwind CSS with purging; only used utilities are included -->

## Accessibility Requirements

WCAG Level: WCAG 2.2 AA
<!-- Standard accessibility compliance level -->

Key Requirements:
- All interactive elements must be keyboard accessible
- Color contrast ratio minimum 4.5:1 for normal text, 3:1 for large text
- All decorative SVG icons must have aria-hidden="true" (already implemented)
- Focus indicators must be visible and consistent
- Reduced motion support via prefers-reduced-motion for transitions
- Semantic HTML with proper heading hierarchy (h1 > h2 > h3)

<!-- Example:
- All interactive elements must be keyboard accessible
- Color contrast ratio minimum 4.5:1 for normal text, 3:1 for large text
- All images must have descriptive alt text
- Focus indicators must be visible and consistent
- Screen reader tested with VoiceOver (macOS) and NVDA (Windows)
- Reduced motion support via prefers-reduced-motion
-->

## SEO Requirements

Meta Tags: title, description, og:type, og:url, og:title, og:description, og:site_name, og:image, twitter:card, twitter:title, twitter:description, twitter:image required on every page
<!-- Implemented in BaseLayout.astro head section -->

Structured Data: None currently implemented
<!-- Opportunity: JSON-LD for WebSite and ItemList schemas -->

Sitemap: Auto-generated sitemap.xml via @astrojs/sitemap integration
<!-- Configured in astro.config.mjs with site URL -->

Robots: Default allow-all (no robots.txt override)
<!-- GitHub Pages default behavior; all pages are indexable -->

Canonical URLs: Self-referencing canonical on every page
<!-- Implemented in BaseLayout.astro via Astro.url.pathname + Astro.site -->

Page Speed: All pages must load in under 1.5s on 4G connection
<!-- Static HTML with system fonts; no external resource blocking -->

## Browser and Device Support

### Browsers

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

<!-- No IE11 support. Modern browsers only. -->

### Devices

- Mobile: 360px minimum width (responsive px-4 padding)
- Tablet: sm breakpoint (640px) for layout adjustments
- Desktop: max-w-6xl (1152px) content width with lg:px-8 padding

<!-- Responsive design uses Tailwind sm:/lg: prefixes throughout -->

### Responsive Breakpoints

- Tailwind 4 default breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

<!-- Currently using sm: and lg: breakpoints in components -->

## Code Quality Standards

### Linting and Formatting

Linter: astro check (TypeScript type checking via @astrojs/check)
<!-- No ESLint configured; relies on TypeScript strict mode -->

Formatter: Prettier 3.x (semi, singleQuote, trailingComma: all, printWidth: 100, tabWidth: 2)
<!-- prettier-plugin-astro for .astro file support -->

Pre-commit Hooks: None configured
<!-- No Husky or lint-staged; build-time checking via astro check -->

### Code Review

Review Required: Single developer project; no formal PR review process
<!-- Direct push to main with GitHub Actions CI/CD -->

Auto-merge: N/A (single developer workflow)
<!-- No branch protection or required reviews configured -->

### Naming Conventions

Components: PascalCase (ProjectCard.astro, ThemeToggle.astro)
<!-- Astro component files in src/components/ -->

Utilities: camelCase (getAllProjects in src/utils/projects.ts)
<!-- TypeScript utility functions -->

Constants: camelCase for object literals (typeColors in ProjectCard)
<!-- No standalone constants file; inline configuration -->

CSS Classes: Tailwind utility-first, no custom class names or BEM
<!-- All styling via Tailwind utilities in class attributes -->

## Testing Requirements

### Coverage Targets

Unit Tests: No unit tests currently (static site with minimal logic)
<!-- Opportunity: test project data utilities if complexity grows -->

Integration Tests: Build success via astro check && astro build
<!-- TypeScript type checking serves as integration validation -->

E2E Tests: None currently configured
<!-- Opportunity: Playwright for visual regression and link validation -->

### Testing Tools

Unit/Integration: None configured
<!-- Consider Vitest if utility functions grow in complexity -->

E2E: None configured
<!-- Consider Playwright for cross-browser validation -->

Visual Regression: None configured
<!-- Consider Percy or Chromatic if design system becomes more complex -->

### Testing Rules

- Build must pass (astro check && astro build) before deploy
- TypeScript strict mode catches type errors at build time
- No runtime testing infrastructure; quality ensured via static analysis and build checks

<!-- Example:
- All new components must have at least one test
- All bug fixes must include a regression test
- E2E tests must run in CI before merge to main
- No skipped tests allowed in main branch
-->

## Security Requirements

### Authentication

- N/A (static site with no user accounts or API routes)

<!-- No authentication required; purely public static content -->

### Data Protection

- All traffic served over HTTPS via GitHub Pages
- No PII collected or stored
- No cookies set (theme preference stored in localStorage only)

<!-- Minimal attack surface due to static architecture -->

### Headers and Policies

- GitHub Pages default security headers
- No custom Content-Security-Policy (opportunity to add via _headers file)
- HTTPS enforced by GitHub Pages

<!-- Static hosting limits header customization; default GitHub Pages headers apply -->

### Dependency Security

- pnpm-lock.yaml committed and tracked
- Minimal dependency tree (Astro, Tailwind, Prettier only)
- GitHub Dependabot available for vulnerability scanning

<!-- Small dependency surface reduces security risk -->

### Compliance

- No analytics or tracking; no cookie consent required
- No PII collection; no GDPR obligations beyond hosting
- No commercial terms of service needed

<!-- Personal project with minimal compliance requirements -->
