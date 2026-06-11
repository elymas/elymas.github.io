# Visual Identity

_Extracted from the implemented Printing Press design system (src/styles/global.css and component code) on 2026-06-11._

---

## Color Palette

<!-- Define your brand colors. Use hex codes for precision. -->

primary: "#c80027"
  # Crimson — the dominant brand color (--color-primary-500).
  # Used for hover accents on card titles/borders and inline link CTAs.
  # Full scale available: primary-50..900 derived from hsl(348, 100%, 39%).

secondary: "#1f6b3a"
  # Press green (--color-success-500). Supporting color used for
  # blog/tutorial type badges and success states.

accent: "#e5006d"
  # Pink accent (--color-accent). Used sparingly for landing/portfolio
  # type badges at 15-25% opacity tints.

neutral_scale:
  # Warm paper→ink scale (Printing Press surface tokens, not cool grays).
  50: "#faf8f3"
  100: "#f4efe6"
  200: "#ede6d8"
  300: "#e7dcca"
  400: "#c4b89e"
  500: "#9a8f82"
  600: "#7a7166"
  700: "#5a524a"
  800: "#38322d"
  900: "#1b1816"
  950: "#030202"

background: "#faf8f3"
  # Page background (surface-50) in light mode; #1b1816 (ink) in dark mode.
  # Hero sections use paper #f4efe6 directly.

surface: "#f4efe6"
  # Card and component background (paper / --color-paper).
  # Cards sit on the page with a 1px #ede6d8 (paper-2) border;
  # dark mode cards use surface-800 #38322d.

## Typography

<!-- Specify your typeface choices. -->

primary_font: "Newsreader"
  # Serif display family for h1-h6 and the wordmark (--font-serif).
  # Rendered at font-weight 400 with letter-spacing -0.025em.
  # Fallbacks: Iowan Old Style, Charter, Georgia, Times New Roman, serif.

secondary_font: "Geist"
  # Sans-serif body font (--font-sans). All paragraph/UI text.
  # Fallbacks: -apple-system, Helvetica Neue, system-ui, sans-serif.

mono_font: "Geist Mono"
  # Monospace for code and technical content (--font-mono).
  # Fallbacks: JetBrains Mono, SF Mono, ui-monospace, Menlo, monospace.

font_source: "google-fonts"
  # Loaded via fonts.googleapis.com with preconnect; variable axes
  # Newsreader ital,opsz,wght 6..72/200..800, Geist + Geist Mono 100..900.

## Logo

logo_file: "none (text-based)"
  # No standalone logo asset. The brand mark is an inline hand-drawn-style
  # cloud SVG (stroke-only, currentColor) paired with the serif wordmark
  # "float on" in Header.astro. Favicon: public/favicon.svg.

logo_dark_file: "same"
  # The cloud SVG uses currentColor strokes, so it adapts to dark mode
  # automatically. No separate dark variant.

logo_max_height: "24px"
  # Header cloud icon renders at h-6 (24px) beside the text wordmark.

## Layout Preferences

hero_layout: "centered"
  # Centered hero: cloud decoration, serif h1, muted subtitle, single
  # text-link CTA with chevron. Soft blurred paper-tone orbs in background.

section_rhythm: "bordered"
  # Single warm background throughout; sections separated by 1px
  # paper-2 (#ede6d8) border dividers rather than alternating backgrounds.
  # Generous vertical rhythm (py-20 to py-32), max-w-6xl container.

border_radius_style: "sharp"
  # Letterpress-flat geometry: cards use rounded-xs, badges and tech
  # chips use rounded-none. No pills, no large radii.

## Dark Mode

dark_mode_support: "manual"
  # Class-based toggle (@custom-variant dark on .dark) via ThemeToggle
  # button, persisted in localStorage with prefers-color-scheme as the
  # first-visit fallback. FOUC-prevention inline script in BaseLayout.

## Visual Do's and Don'ts

dos:
  - "Warm paper backgrounds (#faf8f3 / #f4efe6) — never pure white"
  - "Newsreader serif display headings at weight 400 with tight tracking"
  - "Restrained crimson (#c80027) reserved for hover states and key links"
  - "Flat, sharp-cornered cards with thin paper-tone borders (letterpress feel)"
  - "Uppercase tracked-out micro-labels (text-xs, tracking-wider) for badges"
  - "Hand-drawn-style stroke-only SVG illustrations using currentColor"
  - "Subtle motion only: 200ms color/transform transitions, -translate-y-0.5 card lift"
  - "Editorial monochrome base with pink (#e5006d) and green (#1f6b3a) as rare spot accents"

donts:
  - "Purple-to-blue SaaS gradients as backgrounds or buttons"
  - "Glassmorphism panels and heavy drop shadows"
  - "Pure white (#ffffff) or cool gray neutral scales"
  - "Large border radii, pill cards, or bubbly UI shapes"
  - "Generic stock icon sets or filled emoji-style icons"
  - "Bold heavy-weight display headings — serif stays at normal weight"
  - "Saturating the page with crimson; it is an accent, not a field color"

---

_Last updated: 2026-06-11_
_Populated by: code extraction (Printing Press design system)_
