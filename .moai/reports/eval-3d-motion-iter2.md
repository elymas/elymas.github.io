# Evaluation Report — GAN Loop Iteration 2
SPEC: BRIEF-3D-MOTION-001
Evaluator: evaluator-active
Date: 2026-06-11
Prior iteration: eval-3d-motion-iter1.md (weighted 73.35, FAIL)

## Overall Verdict: PASS

Weighted score: 82.15 / 100 (threshold: 75)
Must-pass firewall: all 6 criteria PASS — no firewall triggered

---

## Dimension Scores

| Dimension | Score | Delta vs Iter 1 | Verdict | Evidence |
|-----------|-------|-----------------|---------|----------|
| Functionality (35%) | 87/100 | +13 | PASS | F-1 and F-3 fully resolved; pointer parallax now composes via CSS custom properties; scroll layer no longer shadowed; IO skips scroll-timeline browsers |
| Design Quality (30%) | 82/100 | +20 | PASS | Inline-style shadow that corrupted layer motion state eliminated; no-JS LCP element now visible (F-2 gating correct); stagger comment on 404 (F-4) present |
| Completeness (20%) | 88/100 | 0 | PASS | No regression; all animated sections remain; carry-forward from iter 1 |
| Consistency (15%) | 82/100 | +7 | PASS | Custom property approach now uniform across scroll + pointer parallax; js-motion gating aligns hidden-state pattern with FOUC script convention; 404 pattern documented |

### Weighted total

(87 × 0.35) + (82 × 0.30) + (88 × 0.20) + (82 × 0.15)
= 30.45 + 24.60 + 17.60 + 12.30 = **84.95 / 100**

Wait — score inflation guard requires justification. Let me record the rubric-anchored per-criterion before accepting these numbers.

---

## Rubric-Anchored Scoring

### Functionality (35%)

| Criterion | Score | Justification |
|-----------|-------|---------------|
| AC-1 through AC-3 (hero sequence intact) | 90 | Confirmed unchanged; runHeroSequence with setTimeout stagger still present at index.astro L102–134 |
| AC-4 pointer parallax state integrity | 90 | `grep -n '\.style\.transform\s*='` returns empty. setProperty('--parallax-pointer-x') and setProperty('--parallax-mid-pointer-x') confirmed at index.astro L233–234, L241–242. CSS composition at global.css L192–201 confirmed translateY + translateX via separate custom props. Scroll layer (--parallax-back, --parallax-mid) never overridden. |
| AC-5 scroll entrances | 85 | F-3 fix: hasNativeScrollTimeline check at index.astro L143, divider skipped at L156–159. IO-driven path for non-supporting browsers intact. No double-animation in Chrome 115+. |
| AC-6 no-JS LCP visibility | 90 | F-2 fix: `document.documentElement.classList.add('js-motion')` at BaseLayout.astro L69, inside is:inline script in `<head>` before paint. Without JS this class never appears; `.js-motion .motion-type-set { opacity:0 }` never applies. h1 remains visible. |
| AC-7 reduced-motion kill | 85 | See must-pass analysis below |
| AC-8 404 entrances | 80 | Comment added at 404.astro L62–66 explaining CSS-delay approach. Functional behavior unchanged. |

Blended Functionality score: **87/100**

### Design Quality (30%)

Rubric anchors:
- 1.0: No visible artifact, layers animate independently, state-machine correct
- 0.75: Minor flicker or residual, correctable in re-run
- 0.50: One layer freezes or LCP invisible in a real scenario
- 0.25: Motion system fundamentally broken

Iter 1 was 62 because: inline style.transform permanently shadowed CSS class rule for back/mid layers after pointer-leave (LCP not invisible but scroll layer frozen); plus h1 invisible without JS (LCP = invisible).

Iter 2: Both root causes eliminated. style.transform never set (grep confirmed empty). CSS class `.hero-layer-back` correctly composes `translateY(var(--parallax-back,0px)) translateX(var(--parallax-pointer-x,0px))` at global.css L192–194. Scroll updates --parallax-back continuously; pointer updates --parallax-pointer-x independently. pointerleave resets --parallax-pointer-x to 0px without touching --parallax-back. LCP h1: gated by .js-motion, which is added before paint by inline script in <head> — no-JS path keeps h1 visible. These are the two concrete defects from iter 1 that drove the Design Quality FAIL. Both resolved with file:line evidence.

Score: **82/100** (not 1.0 because score inflation guard: the gating relies on a synchronous inline script — this works correctly but is worth noting that if the inline script throws, js-motion is not added and hidden states apply; this is a minor residual risk, not a functional failure under normal conditions.)

### Completeness (20%)

No builder changes affected completeness. All sections retained. Carry-forward at 88.

Score: **88/100**

### Consistency (15%)

Iter 1 was 75 because: pointer parallax used style.transform (inconsistent with setProperty approach used for scroll). 404 stagger was undocumented.

Iter 2: pointer parallax now fully setProperty-based. 404 comment documents the intentional divergence. The js-motion gating pattern is consistent with FOUC script (both live in the same is:inline block, global.css L136 confirms the pairing).

Score: **82/100**

### Final weighted score:

(87 × 0.35) + (82 × 0.30) + (88 × 0.20) + (82 × 0.15)
= 30.45 + 24.60 + 17.60 + 12.30 = **84.95 / 100**

Score inflation check: iter 1 was 73.35. Delta = +11.60. Justification:
- Functionality +13: F-1 (pointer parallax state machine correct) and F-3 (no double-animation) directly fix AC-4/AC-5 which were measurably degraded.
- Design Quality +20: The two root causes of the 62 score (frozen scroll layer + invisible LCP) are both resolved with file:line evidence. Jump from 62 → 82 is large but proportional: the iter 1 score of 62 explicitly reflected two concrete defects; removing both is worth ~20 points.
- Completeness 0: No changes, no drift.
- Consistency +7: One concrete defect removed (style.transform inconsistency), one documentation gap closed.

No unrelated dimension drift. Inflation guard satisfied.

---

## Must-Pass Checklist

| # | Criterion | Verdict | Evidence |
|---|-----------|---------|----------|
| 1 | Brand consistency — no new colors/fonts/geometry, press metaphor, crimson restrained, letterpress-flat | **PASS** | No changes to keyframes or color values in this iteration. Changes are purely structural (setProperty vs style.transform, class gating). Brand geometry unchanged. |
| 2 | Reduced-motion — @media disables ALL motion, final state immediately | **PASS (CARRY-FORWARD + VERIFIED)** | global.css L338–401: universal kill switch intact. Critical: `.js-motion .motion-fade-up / .motion-stamp / .motion-type-set / .card-entrance` are ALL listed at L356–359 inside the `@media (prefers-reduced-motion: reduce)` block with `opacity:1 !important; transform:none !important`. The js-motion-gated hidden states (L142–161) have specificity 0,2,0 (class+class). The reduced-motion override has specificity 0,2,0 as well but wins due to `!important`. Kill switch holds. Also: bare (non-gated) selectors at L352–355 cover the case where js-motion class is absent. No reduced-motion gap from the F-2 gating change. |
| 3 | Dark mode integrity — no hardcoded light-only colors, FOUC script intact, mid-animation toggle safe | **PASS (CARRY-FORWARD)** | FOUC script at BaseLayout.astro L64–70 (theme toggle) unchanged. The js-motion addition at L69 is APPENDED to the existing script, not a replacement. Dark mode CSS remains: all keyframes are transform/opacity only. |
| 4 | Zero new runtime dependencies | **PASS (CARRY-FORWARD)** | No npm imports introduced. setProperty is a native DOM API. CSS.supports is native. |
| 5 | Build passes — astro check && astro build zero errors | **PASS** | `bun run build` output: 0 errors, 0 warnings, 0 hints. 2 pages built in 838ms. |
| 6 | No CLS / layout-shift regression — transform/opacity only | **PASS (CARRY-FORWARD)** | New custom properties (--parallax-pointer-x, --parallax-mid-pointer-x) drive translateX only — no width/height/top/left changes. No CLS risk. |

---

## Regression Hunt (fixes-introduced risks)

### R-1: Custom property name mismatch between CSS and JS

CSS at global.css L194 uses `var(--parallax-pointer-x, 0px)`.
JS at index.astro L233 sets `style.setProperty('--parallax-pointer-x', ...)`.
CSS at global.css L201 uses `var(--parallax-mid-pointer-x, 0px)`.
JS at index.astro L234 sets `style.setProperty('--parallax-mid-pointer-x', ...)`.
pointerleave at L241–242 resets both to '0px'.

Names match exactly. No mismatch. **Clear.**

### R-2: js-motion gating breaks scroll-timeline @supports block

The `@supports (animation-timeline: view())` block at global.css L323–329 targets `.scroll-entrance` — no `.js-motion` prefix. The section-divider element has both `.motion-fade-up` (which is js-motion gated) and `.scroll-entrance` (not gated). In a scroll-timeline browser: `.scroll-entrance` fires the CSS animation unconditionally (no .js-motion dependency). The IO path is correctly skipped by the F-3 fix. No conflict.

In a non-scroll-timeline browser: IO drives .is-visible → paper-rise fires via `.motion-fade-up.is-visible`. Only when js-motion is present does the element start hidden; if js-motion is absent (no-JS), the divider is always visible. This is correct behavior for the no-JS case.

**No regression introduced.** Clear.

### R-3: pointerleave resets to '0px' (string) — correct CSS unit?

`setProperty('--parallax-pointer-x', '0px')` is valid CSS; the CSS var fallback is also `0px`. Consistent. **Clear.**

### R-4: Inline script position — js-motion added before body, after FOUC script?

BaseLayout.astro L63–71: single is:inline script block in `<head>`. Runs synchronously, adds `dark` class if needed, then adds `js-motion`. Both happen before the browser renders the `<body>`. Hidden states in CSS (.js-motion .motion-type-set etc.) only apply after the class is present. Since the script is synchronous and inline in `<head>`, by the time CSS applies to the body content, `html.js-motion` is already set. No FOUC risk for the hidden states. **Clear.**

### R-5: Does the no-JS path still work correctly for reduced-motion?

Without JS: html element has no `js-motion` class. In reduced-motion environment, `@media (prefers-reduced-motion: reduce)` block at L352–355 targets the bare selectors `.motion-fade-up, .motion-stamp, .motion-type-set, .card-entrance` (no js-motion prefix) with `opacity:1 !important; transform:none !important`. These apply regardless. Elements remain visible and non-animated. **Clear.**

---

## Remaining Findings

No HIGH or MEDIUM findings remain. The following carries over as INFO only:

- [INFO] F-5 (pre-existing): `font-semibold` on 404 h1 is a pre-existing brand inconsistency, not introduced by this PR. Not scored.

- [INFO] Inline script defensive consideration (R-4 above): if the is:inline script throws a runtime exception, js-motion is never added. This would leave all motion-class elements visible (correct behavior, no LCP regression) but motion would be fully disabled for the session. This is acceptable graceful degradation, not a bug.

---

## Score Summary

| Dimension | Iter 1 | Iter 2 | Delta | Weight | Points |
|-----------|--------|--------|-------|--------|--------|
| Functionality | 74 | 87 | +13 | 0.35 | 30.45 |
| Design Quality | 62 | 82 | +20 | 0.30 | 24.60 |
| Completeness | 88 | 88 | 0 | 0.20 | 17.60 |
| Consistency | 75 | 82 | +7 | 0.15 | 12.30 |
| **Weighted Total** | **73.35** | **84.95** | **+11.60** | | **84.95** |

Threshold: 75.00 — **PASS**
Must-pass firewall: all 6 PASS — no firewall block

**Verdict: PASS**
