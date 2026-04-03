<!-- 
  Agency Brand Context: Visual Identity
  
  This file is part of the Agency Brand Context (constitution).
  It is NOT auto-modified by the learner agent.
  Changes require manual editing by the user.
  It serves as the foundation for all agency skill evolution.
  
  Fill this file during the first `/agency brief` run via client interview.
-->

# Visual Identity

## Color Palette

### Primary Colors

Primary: #2c3e50 (charcoal, primary-700)
<!-- Full scale: 50:#f0f4f7, 100:#d9e2e8, 200:#b3c5d1, 300:#8da8ba, 400:#678ba3, 500:#476a82, 600:#3a5a70, 700:#2c3e50, 800:#1f2d3a, 900:#131c24 -->

Primary Light: #476a82 (primary-500)
<!-- Mid-range for hover states and secondary emphasis -->

Primary Dark: #131c24 (primary-900)
<!-- Deep charcoal for dark mode backgrounds and strong contrast -->

### Secondary Colors

Secondary: #f5f5dc (cream, brand-cream)
<!-- The warm counterpart to charcoal; used as surface/background color -->

Secondary Light: #fafaf5 (surface-50)
<!-- Lightest cream tone for light mode backgrounds -->

Secondary Dark: #ece8ca (surface-200)
<!-- Deeper cream for borders and subtle differentiation -->

### Accent Colors

Accent: #678ba3 (primary-400)
<!-- Muted steel-blue used for interactive hover states and links -->

### Neutral Colors

Background: #fafaf5 (surface-50, light mode), #141c24 (surface-950, dark mode)
<!-- Set via body class: bg-surface-50 / dark:bg-surface-950 -->

Surface: #f5f5dc (cream/surface-100, light mode), #1e2a36 (surface-900, dark mode)
<!-- Used for header, footer, cards: bg-cream / dark:bg-surface-800 -->

Text Primary: #2c3e50 (charcoal, light mode), #f5f5dc (cream, dark mode)
<!-- Set via body class: text-charcoal / dark:text-cream -->

Text Secondary: #7a7560 (surface-500, light mode), #a09b82 (surface-400, dark mode)
<!-- Used for descriptions and muted copy -->

Border: #ece8ca (surface-200, light mode), #2c3e50 (surface-800, dark mode)
<!-- Subtle warm borders matching the cream/charcoal palette -->

### Semantic Colors

Success: Tailwind emerald (emerald-100/700 light, emerald-900/400 dark)
<!-- Used in ProjectCard type badges for "blog" type -->

Warning: Tailwind amber (amber-100/700 light, amber-900/400 dark)
<!-- Used in ProjectCard type badges for "tutorial" type -->

Error: Tailwind rose (rose-100/700 light, rose-900/400 dark)
<!-- Used in ProjectCard type badges for "portfolio" type -->

Info: primary-100/700 light, primary-900/400 dark
<!-- Used in ProjectCard type badges for "docs" type -->

## Typography

### Heading Font

Family: Georgia, Cambria, 'Times New Roman', serif
<!-- System serif stack; no custom web fonts loaded. letter-spacing: -0.01em on headings -->

Weights: 600 (semibold) for card titles and section headings, 400 (normal) for brand name in header
<!-- Hero h1 uses default weight with font-serif class -->

### Body Font

Family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
<!-- System sans-serif stack set on body element; no custom web fonts loaded -->

Weight: 400 (regular)
<!-- Normal weight throughout body text -->

Line Height: Tailwind default (1.5)
<!-- No custom line-height override in global.css -->

### Monospace Font

Family: System default (no monospace font explicitly defined)
<!-- No code blocks or monospace usage in current site -->

### Size Scale

Base: 16px (browser default)
<!-- No custom base font-size set in CSS -->

Scale Ratio: Tailwind default scale
<!-- Uses Tailwind text-xs through text-6xl utility classes -->

<!-- Example scale:
- xs: 12px
- sm: 14px
- base: 16px
- lg: 18px
- xl: 20px
- 2xl: 24px
- 3xl: 30px
- 4xl: 36px
-->

## Logo Usage

Primary Logo: Inline SVG cloud icon + "float on" text in Georgia serif (horizontal lockup in header)
<!-- Cloud SVG path with stroke-only rendering (no fill), paired with text span -->

Minimum Size: Cloud icon h-6 w-9 (24px height) in header, paired with text
<!-- Smallest usage in footer at h-4 w-6 (16px height) -->

Clear Space: gap-2.5 (10px) between cloud icon and text in header
<!-- Consistent spacing maintained via flex gap utility -->

Dark Background Variant: Same SVG with currentColor stroke; text inherits text-cream on dark backgrounds
<!-- Automatic color inversion via dark: class variants -->

Favicon: SVG favicon (favicon.svg)
<!-- Referenced as link rel="icon" type="image/svg+xml" -->

## Imagery Style

Photography: None used; the site relies on typography and whitespace instead of imagery
<!-- Pure typographic/structural design approach -->

Illustrations: None; visual identity is carried by the cloud SVG motif and color palette
<!-- No illustration library or custom illustrations -->

Icons: Custom inline SVG icons (cloud motif, GitHub icon); stroke-only style with stroke-width 1.2-2, stroke-linecap round, stroke-linejoin round
<!-- No icon library; hand-crafted SVG paths embedded directly in components -->

Decorative Elements: Soft radial blurs (rounded-full + blur-3xl) using surface-300 at 5-10% opacity; cloud SVG wind lines at 40-50% opacity
<!-- Hero section uses background blur circles; cloud icon includes subtle wind path -->

## Layout Preferences

Grid System: Single-column centered layout, max-w-6xl (1152px), responsive padding px-4 sm:px-6 lg:px-8
<!-- No multi-column grid; project cards use CSS grid via ProjectGrid component -->

Spacing Scale: Tailwind default 4px base (py-24, py-20, py-8, gap-2.5, gap-6, mb-8, mb-10)
<!-- Generous vertical spacing: hero py-24 sm:py-32, sections py-20, footer py-8 -->

Border Radius: rounded-xl (12px) for cards, rounded-full for badges, rounded-lg (8px) for buttons, rounded-md (6px) for tech tags
<!-- Consistent rounded aesthetic throughout -->

Content Density: Very generous whitespace; airy, breathing layout with large vertical padding between sections
<!-- Minimal content per viewport; emphasis on negative space -->

Card Style: 1px border (border-surface-200/800), bg-cream/surface-800 fill, rounded-xl, p-6 padding; hover:shadow-lg + hover:-translate-y-0.5 lift on interaction
<!-- No default shadow; shadow appears only on hover -->

## Design Anti-Patterns

<!-- Things to explicitly avoid in all design work. -->

- No bright or saturated accent colors; palette is strictly cream/charcoal with muted steel-blue
- No heavy drop shadows; shadow only appears on hover states (shadow-lg maximum)
- No custom web fonts or font loading; system stacks only
- No photography, stock images, or complex illustrations; visual identity is typographic
- No flashy animations; transitions limited to opacity, color, and subtle translate-y
- No more than 2 font families (serif for headings/brand, sans-serif for body)

<!-- Example:
- No rainbow or multi-color gradients
- No heavy drop shadows (max shadow-md)
- No text over busy images without overlay
- No rounded corners larger than 16px
- No more than 3 font weights on a single page
- No centered body text longer than 3 lines
-->
