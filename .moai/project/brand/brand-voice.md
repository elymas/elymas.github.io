# Brand Voice

_Extracted from the implemented Printing Press design system and live site copy (index.astro, projects.json) on 2026-06-11._

---

## Tone

<!-- Describe the overall emotional register of your brand communication.
Examples: "confident and direct", "warm and approachable", "technical and authoritative", "playful yet professional" -->

tone: "concise, craftsmanlike, and quietly confident — editorial calm with a light poetic touch ('Archive for floating thoughts'), grounded by plain technical description"

## Register Spectrum

<!-- Where does your brand sit on each axis? Use a 1–5 scale or descriptive labels. -->

formal_informal: 3
  # Neutral-professional. No slang, but no corporate stiffness either.
serious_playful: 2
  # Mostly serious and understated; playfulness appears only in the
  # brand name ("float on") and the cloud motif, not in body copy.
technical_accessible: 4
  # Comfortable with developer terminology (tech stacks named plainly),
  # but descriptions stay readable in one or two sentences.

## Vocabulary Preferences

<!-- List words or phrases that ARE and ARE NOT part of your brand voice. -->

preferred_terms:
  - "projects" (not "solutions")
  - "browse" / "explore" (not "discover the power of")
  - "archive" / "collection" / "hub" (curatorial framing)
  - "built with" / "hosted on" (plain factual attribution)
  - "experiments" (honest framing for side work)
  - "interactive" / "practical" (concrete qualities, not hype)

avoided_terms:
  - "innovative"
  - "cutting-edge"
  - "game-changing"
  - "revolutionary"
  - "seamless"
  - "leverage"
  - "unlock"
  - "supercharge"
  - "world-class"

## Audience Familiarity

<!-- How much does your audience know about your domain? -->

jargon_level: medium
  # Developer audience: framework names (Astro, Three.js, Supabase),
  # GitHub Pages, CSV export, etc. are used without explanation,
  # but copy never assumes deep specialist knowledge.

assumed_knowledge: "Readers know what GitHub and a tech stack are, recognize common framework names, and understand what a personal project hub is. No explanation of basic web concepts is needed; no expectation of expertise in any single framework."

## Example Phrases

<!-- Provide 3–5 example phrases that capture your brand voice.
These will be used as stylistic anchors during copy generation. -->

examples:
  - "Archive for floating thoughts."
  - "A central hub for projects, blogs, and experiments hosted on GitHub Pages."
  - "Browse the collection of sites and applications."
  - "Interactive 3D solar system simulator with realistic planetary orbits, textures, and camera controls."
  - "Written with practical examples and deep-dive tutorials."

## Anti-Examples

<!-- Phrases that do NOT sound like your brand. -->

anti_examples:
  - "Unlock your potential with our revolutionary platform."
  - "In today's fast-paced digital landscape, innovation is everything."
  - "Supercharge your workflow with cutting-edge, AI-powered solutions!"
  - "We're passionate about delivering world-class digital experiences."
  - "Discover the seamless synergy of design and technology."

---

_Last updated: 2026-06-11_
_Populated by: code extraction (Printing Press design system)_
