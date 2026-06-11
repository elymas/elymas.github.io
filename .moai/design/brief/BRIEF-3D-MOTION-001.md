# BRIEF-3D-MOTION-001 — Dimensional Printing Press

_Design brief for `/moai design` Path B (code-based). Full redesign of elymas.github.io (Astro 6 + Tailwind 4 static hub) adding a comprehensive 3D motion and animation layer while preserving the Printing Press visual identity._

- Created: 2026-06-11
- Path: B (code-based, zero new runtime JS deps)
- Status: Draft
- Brand parent: `.moai/project/brand/` (constitutional; motion must not override it)

---

## Goal

Make the page feel **dimensional and alive** — as if printed sheets, ink stamps, and paper layers are physically moving in space — while keeping the editorial Printing Press identity intact and the static experience fully recoverable for users who prefer no motion.

The redesign is a **layout restructuring + a comprehensive motion/3D layer**, not a new color or type system. Every motion gesture must read as belonging to a printing press / letterpress / editorial world (ink-stamp reveals, paper-layer depth, typographic motion), never as generic SaaS slickness.

### Target outcomes (observable)

1. **Page-load sequence** — On first paint, the hero composes itself in an ordered, choreographed sequence (cloud mark → serif headline → subtitle → CTA), not a single simultaneous fade. The sequence reads as ink settling onto paper.
2. **Layered parallax hero** — The hero has depth: the blurred paper-tone orbs, the cloud mark, and the headline occupy distinct z-planes that shift at different rates relative to scroll or pointer, producing real parallax rather than a flat backdrop.
3. **3D tilt on project cards** — Each `ProjectCard` responds to pointer position with a subtle 3D tilt (perspective + `rotateX`/`rotateY`) and a depth lift, as though the card is a physical sheet being angled toward the light. Touch / no-pointer devices fall back to the existing flat hover.
4. **Scroll-entrance choreography** — Every major section (hero, divider, Projects heading, project grid) has an entrance animation triggered on scroll into view. Cards in the grid enter with a staggered cadence, not all at once.
5. **Hover micro-interactions** — Interactive elements (cards, CTA link, header nav, theme toggle) have refined hover motion consistent with the existing 200ms transition language, extended with depth/transform where it reinforces the press metaphor.

### Measurable acceptance criteria

- **AC-1 (entrance coverage):** Every major section on `index.astro` has a scroll-triggered or load-triggered entrance animation. Verifiable: each section root carries an entrance animation/class and is visually static (final state) before its trigger.
- **AC-2 (card 3D tilt):** On a pointer-capable device, moving the pointer across a project card produces a measurable `transform` change including a non-zero `rotateX`/`rotateY` component; leaving the card returns it to rest.
- **AC-3 (page-load sequence):** The hero elements animate in a defined order with staggered delays (cloud → h1 → subtitle → CTA), not identical timing.
- **AC-4 (parallax depth):** At least two hero layers move at different rates during scroll or pointer movement (distinct `translate`/`translateZ` per layer).
- **AC-5 (no CLS regression):** No animation introduces layout shift. All motion uses `transform` / `opacity` only — never animates `width`, `height`, `top`, `left`, `margin`, or other layout-affecting properties. Cumulative Layout Shift stays effectively 0.
- **AC-6 (reduced-motion fallback = current static experience):** Under `@media (prefers-reduced-motion: reduce)`, ALL entrance, parallax, tilt, and load-sequence motion is disabled and every element renders in its final resting state — visually equivalent to the current static site (the existing `-translate-y-0.5` color/transform hover may remain as the prior baseline subtle motion, or also be reduced).
- **AC-7 (dark mode unaffected):** All motion behaves identically and correctly in dark mode; no animation references a hardcoded light-mode color or breaks the class-based `.dark` toggle. Theme switching mid-animation does not corrupt state.
- **AC-8 (performance):** The static-site performance posture is preserved. No new runtime JS dependency is added. Any vanilla JS used (e.g. IntersectionObserver, pointer tilt) is minimal, dependency-free, and does not block first paint.

---

## Audience

Reference personas from `.moai/project/brand/target-audience.md`:

- **Hana the Hiring Engineer** (primary) — senior engineer / engineering manager forming a fast, accurate impression of the author's technical range and craft within 1–2 minutes. The motion layer must signal **attention to detail and craft** (she "judges attention to detail through the polish of the hub itself") without slowing her scan or hiding the actual projects. Motion serves credibility, not spectacle.
  > source: .moai/project/brand/target-audience.md
- **Dev the Fellow Builder** (secondary) — working developer exploring how things are built. He will notice the technique: CSS-only 3D, scroll-driven animations, zero-dependency implementation. The "how it was built" should itself be impressive — clean, modern CSS, no heavy libraries.
  > source: .moai/project/brand/target-audience.md
- **Rae the Returning Visitor** (tertiary) — bookmarks the hub and checks back for new projects. Motion must not become tiresome on repeat visits; it should feel calm and earned, not loud.
  > source: .moai/project/brand/target-audience.md

Audience vocabulary to honor: "side project", "live demo", "tech stack", "static site", "GitHub Pages". The motion must reinforce that these are **real, working, maintained** projects — never decorate over broken or vague content.
> source: .moai/project/brand/target-audience.md

---

## Brand

Brand context is constitutional. The motion/3D layer inherits — and must not override — the Printing Press identity. Motion belongs to a **printing press / editorial / letterpress world**: ink-stamp reveals, paper-layer depth, typographic motion. Avoid generic SaaS slickness.

### Voice and tone constraints (motion must feel like this)

- Tone is "concise, craftsmanlike, and quietly confident — editorial calm with a light poetic touch ... grounded by plain technical description." Motion should be **understated and editorial**, not flashy.
  > source: .moai/project/brand/brand-voice.md
- Register: serious_playful = 2 (mostly serious, understated); playfulness appears only in the brand name and cloud motif, not in body copy. Motion playfulness, likewise, should live in the cloud mark and reveal gestures — not in bouncy, over-animated UI.
  > source: .moai/project/brand/brand-voice.md
- Avoided framing: "innovative", "cutting-edge", "seamless", "supercharge". The motion must not *look* like those words either — no gratuitous "wow" transitions that read as marketing hype.
  > source: .moai/project/brand/brand-voice.md

### Visual constraints (motion must respect these)

- **Color/type frozen:** Keep warm paper/ink monochrome (`#faf8f3` / `#f4efe6` page, `#1b1816` ink), crimson `#c80027` as a restrained accent only, Newsreader serif (weight 400, tracking −0.025em) + Geist. Motion introduces NO new colors and NO new fonts.
  > source: .moai/project/brand/visual-identity.md
- **Restrained accent:** Crimson is "reserved for hover states and key links" and must not saturate the page. Motion must not turn crimson into a field color or a flashing highlight.
  > source: .moai/project/brand/visual-identity.md
- **Letterpress-flat geometry:** "Flat, sharp-cornered cards with thin paper-tone borders." Cards use `rounded-xs`; badges/chips `rounded-none`. The 3D tilt adds *depth and angle* but must preserve sharp, flat letterpress geometry — no glassmorphism, no large radii, no bubbly shapes introduced by motion.
  > source: .moai/project/brand/visual-identity.md
- **Subtle motion baseline (extend, don't replace the spirit):** The existing language is "Subtle motion only: 200ms color/transform transitions, −translate-y-0.5 card lift." The new layer extends this depth vocabulary while keeping the same restrained, craftsmanlike feel.
  > source: .moai/project/brand/visual-identity.md
- **Don'ts that constrain motion:** No "purple-to-blue SaaS gradients", no "glassmorphism panels and heavy drop shadows", no pure white, no large border radii / pill cards. Depth shadows used for the 3D effect must stay paper-toned and restrained, never the heavy drop shadows the brand forbids.
  > source: .moai/project/brand/visual-identity.md
- **Surface metaphor:** Warm paper backgrounds, hand-drawn stroke-only `currentColor` SVG (the cloud mark) — motion should treat surfaces as paper sheets and ink, reinforcing the press metaphor (e.g. ink-stamp reveal = `scale`/`opacity` settle; paper-layer depth = `translateZ` planes).
  > source: .moai/project/brand/visual-identity.md
- **Dark mode is manual, class-based** (`@custom-variant dark`, ThemeToggle, FOUC-prevention inline script). All motion must remain correct across the toggle.
  > source: .moai/project/brand/visual-identity.md

---

## Must-Pass Criteria

These are firewall criteria — failing any one fails the brief regardless of other quality.

1. **Brand consistency** — No new colors, no new fonts, no new geometry language. Motion reads as printing-press / editorial / letterpress (ink-stamp reveals, paper-layer depth, typographic motion), not generic SaaS. Crimson stays a restrained accent; letterpress-flat sharp geometry preserved; none of the visual-identity "don'ts" introduced. (Maps to Brand section citations.)
2. **Reduced-motion support** — `@media (prefers-reduced-motion: reduce)` disables ALL added motion (entrance, parallax, 3D tilt, load sequence) and renders every element in its final resting state, equivalent to the current static experience. (AC-6)
3. **Dark mode integrity** — Every animation works identically and correctly in dark mode; no hardcoded light-only colors; the `.dark` class toggle and FOUC script remain intact; mid-animation theme switch does not break visuals. (AC-7)
4. **Zero new runtime dependencies** — No Three.js, no GSAP, no new npm runtime package. Implementation uses CSS 3D (`perspective`, `transform-style: preserve-3d`, `@keyframes`), scroll-driven animations (`animation-timeline: view()/scroll()`), View Transitions, and minimal vanilla JS (IntersectionObserver / pointer tilt) only where CSS scroll-timeline support is insufficient. (AC-8)
5. **Build passes** — `astro check && astro build` completes with zero errors. Scope limited to: `src/pages/index.astro`, `src/pages/404.astro`, `src/layouts/BaseLayout.astro`, `src/components/` (Header, ProjectCard, ProjectGrid, Footer, ThemeToggle), `src/styles/global.css`. No other file modified.
6. **No CLS / layout-shift regression** — All motion animates `transform` / `opacity` only. Cumulative Layout Shift stays effectively 0. (AC-5)

---

## Nice-to-Have

- **Typographic motion on the headline** — the serif "Archive for floating thoughts." reveals per-word or per-line as if type is being set, reinforcing the press metaphor.
- **Ink-stamp reveal for the cloud mark** — the stroke-only cloud SVG appears with a stamped-on settle (scale + opacity) rather than a plain fade.
- **View Transitions between pages** (index ↔ 404) for a cohesive paper-turn feel, where browser support allows, with graceful fallback.
- **Staggered grid choreography refinement** — cards enter in reading order (left-to-right, top-to-bottom) with a gentle paper-settle, tuned so dense grids never feel like a slot-machine cascade.
- **Pointer-driven parallax on the hero orbs** in addition to scroll parallax, for desktop pointer users (disabled under reduced-motion and on touch).
- **Subtle depth on the 404 page** consistent with the hero, so the error page feels like part of the same printed world.
- **Scroll-progress affordance** that reads as an editorial / press detail rather than a generic progress bar.
- **`will-change` / GPU-compositing hints** applied judiciously to keep animations smooth without harming first paint.

---

## Exclusions (What NOT to Build)

- No new color palette or typeface — Printing Press color/type system is frozen.
- No Three.js, WebGL, canvas 3D, GSAP, Framer Motion, or any new runtime JS dependency.
- No glassmorphism, heavy drop shadows, large radii, pill cards, or SaaS gradients introduced under cover of "motion".
- No content/IA rewrite of project data or copy — this brief is layout restructuring + motion, not a copy project.
- No changes to files outside the listed scope (e.g. build config, `projects.json` schema, utils) unless strictly required to wire motion and approved.

---

_Brand parent: `.moai/project/brand/` — on any conflict between this brief and brand context, brand wins._
