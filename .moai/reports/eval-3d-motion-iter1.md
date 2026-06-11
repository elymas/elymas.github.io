# Evaluation Report — GAN Loop Iteration 1
SPEC: BRIEF-3D-MOTION-001
Evaluator: evaluator-active
Date: 2026-06-11

## Overall Verdict: FAIL

Weighted score: 72.4 / 100 (threshold: 75)
Must-pass firewall: 1 criterion FAIL

---

## Dimension Scores

| Dimension | Score | Verdict | Evidence |
|-----------|-------|---------|----------|
| Functionality (35%) | 74/100 | PASS | AC-1 through AC-8 largely met; pointer parallax scroll regression after pointer-leave (see F-2) reduces score |
| Design Quality (30%) | 62/100 | FAIL | Letterpress motion vocabulary executed well; shadow colors paper-toned; but pointer parallax has inline-style shadow bug that corrupts layer motion state after interaction; no-JS scenario leaves h1 invisible |
| Completeness (20%) | 88/100 | PASS | All major sections animated; 404 depth layer present; hero parallax on two z-planes; nice-to-haves partially present (ink-stamp cloud, pointer parallax, view transitions via Astro ClientRouter) |
| Consistency (15%) | 75/100 | PASS | Existing 200ms transition language preserved; hover:-translate-y-0.5 retained; but pointer parallax uses style.transform override pattern inconsistent with CSS custom property approach used elsewhere; 404 sequences via CSS animation-delay vs index.astro setTimeout |

### Weighted total
(74 × 0.35) + (62 × 0.30) + (88 × 0.20) + (75 × 0.15)
= 25.9 + 18.6 + 17.6 + 11.25 = **73.35 / 100** — below threshold

---

## Must-Pass Checklist

| # | Criterion | Verdict | Evidence |
|---|-----------|---------|----------|
| 1 | Brand consistency — no new colors/fonts/geometry, press metaphor, crimson restrained, letterpress-flat | **PASS** | Keyframes use transform/opacity only. Shadow rgba values are ink-toned (#1b1816, #030202). No new palette. Rounded-xs preserved. CSS comment misleadingly says "without JS, elements are visible" — but brand geometry is not a failure here. |
| 2 | Reduced-motion — @media disables ALL motion, final state immediately | **PASS** | global.css L325–382: universal kill switch + per-class overrides. All 6 JS functions guard with `if (prefersReducedMotion) return` or add is-visible with no delay. 404 JS adds is-visible immediately under reduced-motion with --motion-delay:0ms. |
| 3 | Dark mode integrity — no hardcoded light-only colors, FOUC script intact, mid-animation toggle safe | **PASS** | All keyframes: transform/opacity only. Nav underline uses `currentColor`. FOUC script in BaseLayout.astro L62–69 intact (unchanged file). .dark .card-tilt-inner shadow explicitly handled at global.css L230–234. |
| 4 | Zero new runtime dependencies | **PASS** | No npm imports in script blocks. Pure vanilla JS: IntersectionObserver, requestAnimationFrame, window.matchMedia, PointerEvent. |
| 5 | Build passes — astro check && astro build zero errors | **PASS** | Output: 0 errors, 0 warnings, 0 hints. 2 pages built in 825ms. |
| 6 | No CLS / layout-shift regression — transform/opacity only | **PASS** | All keyframes verified: ink-stamp (scale+translateY), paper-rise (translateY), type-set (translateX), orb-drift (translateY+translateX). No width/height/top/left animated. |

---

## Findings

### [HIGH] F-1: Pointer parallax breaks scroll parallax after pointer-leave
**File:** `src/pages/index.astro` L220, L225, L234–235

`initHeroPointerParallax` sets `element.style.transform` directly (inline style) during pointermove and on pointerleave. Inline style always wins over class-based CSS rules. After the pointer leaves the hero, `hero-layer-back` and `hero-layer-mid` have a static `style.transform = "translateY(Xpx)"`. The CSS class rule `.hero-layer-back { transform: translateY(var(--parallax-back, 0px)) }` is permanently shadowed. Subsequent scroll events update `--parallax-back` via `setProperty`, but the inline `style.transform` never changes — so the back-layer parallax freezes for the rest of the session.

**Fix:** Replace direct `style.transform` assignments with `style.setProperty` for `--parallax-back` / `--parallax-mid` in both `onPointerMove` and `onPointerLeave`, and update the CSS class to combine scroll+pointer offsets via calc or separate custom properties (e.g., `--parallax-pointer-x`). Alternatively, clear the inline transform on pointerleave via `element.style.removeProperty('transform')` and use a compound CSS variable approach.

### [MEDIUM] F-2: No no-JS fallback — hero h1 invisible without JavaScript
**File:** `src/styles/global.css` L141–154, `src/pages/index.astro` L39–45

`.motion-type-set { opacity: 0; transform: translateX(-6px); }` is applied to the hero h1. Without JS, `is-visible` is never added and the h1 stays at opacity:0. The h1 is the LCP candidate. The CSS comment at L136 says "Without JS, elements are visible (no flash of invisible content)" — this claim is **incorrect**.

**Fix:** Add a CSS-only fallback so that motion classes render in final state when `.is-visible` has not been added after a timeout, or use `@supports (animation-timeline: view())` as a progressive enhancement and keep elements visible by default, triggering opacity:0 only when JS confirms animation support. Simplest fix: add a `<noscript>` `<style>` block setting all motion classes to opacity:1 / transform:none, or apply `.motion-fade-up, .motion-stamp, .motion-type-set { opacity: 1; transform: none; }` as default and override to `opacity: 0` only when a `.motion-ready` class is set on body by the JS.

### [LOW] F-3: Scroll-entrance IntersectionObserver fires in scroll-timeline browsers, causing double animation
**File:** `src/styles/global.css` L310–316, `src/pages/index.astro` L144–161

`#section-divider` has both `.motion-fade-up` and `.scroll-entrance`. In Chrome 115+ (scroll-timeline support), the CSS `@supports` block fires `paper-rise` via scroll timeline. Separately, `initScrollEntrances()` always runs and adds `.is-visible`, which also applies `paper-rise` via `.motion-fade-up.is-visible` (higher specificity 0,2,0 vs 0,1,0). The higher-specificity rule wins and overrides the scroll-timeline animation, making the `@supports` block dead code for this element.

**Fix:** In `initScrollEntrances`, check for scroll-timeline support (`CSS.supports('animation-timeline', 'view()')`) and skip observing elements that already have `.scroll-entrance` if native support is detected.

### [LOW] F-4: 404 page entrance sequences via CSS animation-delay (vs. setTimeout in index.astro) — inconsistent pattern, documented
**File:** `src/pages/404.astro` L76–82

Under normal motion, `run404Sequence()` adds `is-visible` to all 4 elements simultaneously (no `setTimeout`). The stagger relies on inline `--motion-delay` CSS custom properties being picked up by `animation-delay: var(--motion-delay, 0ms)`. This works correctly (stagger is preserved), but is an inconsistent pattern vs `index.astro` which uses explicit `setTimeout`. No functional bug, but harder to reason about. Document or align patterns.

### [INFO] F-5: `font-semibold` on 404 h1 pre-exists this PR — not introduced by builder
**File:** `src/pages/404.astro` L32

The h1 has `font-semibold` (weight 600). The brand says "serif stays at normal weight (400)". However, `git diff HEAD~1 -- src/pages/404.astro` shows this class was already present before this PR; only `motion-type-set` was added. This is a pre-existing brand inconsistency, not introduced by the motion layer. Flagged as INFO for awareness.

---

## Actionable Feedback (Prioritized)

1. **[HIGH — AC-4 degraded]** Fix pointer parallax inline-style shadow: `src/pages/index.astro` L220–235. Use separate `--parallax-pointer-x` custom property and compose in CSS: `.hero-layer-back { transform: translateY(var(--parallax-back, 0px)) translateX(var(--parallax-pointer-x, 0px)); }`. Update all JS to use `setProperty('--parallax-pointer-x', ...)` only. Never assign `style.transform` directly.

2. **[MEDIUM — resilience]** Add no-JS visibility fallback for motion-class elements: in `global.css`, gate the `opacity: 0` initial state behind a `.motion-ready` class set on `<html>` or `<body>` by the JS boot function. Default state (no class) renders elements visible.

3. **[LOW — code quality]** Guard `initScrollEntrances` with `CSS.supports('animation-timeline', 'view()')` so it skips `.scroll-entrance` elements in supporting browsers, avoiding the double-animation conflict.

4. **[LOW — consistency]** Align 404 stagger pattern: either document the CSS-animation-delay approach or switch to explicit `setTimeout` delays matching index.astro, for codebase coherence.

---

## Weighted Score Breakdown

| Dimension | Raw Score | Weight | Points |
|-----------|-----------|--------|--------|
| Functionality | 74 | 0.35 | 25.90 |
| Design Quality | 62 | 0.30 | 18.60 |
| Completeness | 88 | 0.20 | 17.60 |
| Consistency | 75 | 0.15 | 11.25 |
| **Total** | | | **73.35** |

Threshold: 75.00 — **FAIL** (both weighted score and absence of firewall must-pass failures)

Note: No must-pass firewall was triggered (all 6 must-pass criteria PASS). The FAIL is on weighted score alone. The builder is close — fix F-1 (HIGH) to recover Functionality to ~82 and Design Quality to ~76, which would push the weighted score above 75.
