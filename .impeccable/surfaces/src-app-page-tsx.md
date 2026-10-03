---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/views/Home.tsx"]
---

# Home (/) surface brief

Scope: src/app/page.tsx and the components it renders. Visitor mode: Persuade. Audience: HNW families, relocating principals, family offices and their advisors. Job: decide whether this firm's judgement is worth a private conversation. Action: the enquiry (nav), /contact and /relocating in the close. Proof: ownership position, own listings, the properties behind the $1B+ figure. Constraints: CLAUDE.md Design DNA and PRODUCT.md are binding; two temperature cuts, footer excluded; grid drawn on every chapter; no preloader; LCP headline never animates; readable with JavaScript off.

## Direction contract

THESIS: Home is a dossier read in five chapters, not a portal. It refuses the hero photograph, the search bar and the card grid; proof is given by property, and the page ends in an invitation rather than a capture.

OWN-WORLD: forest #0F3B2F opening, forest-deep #07241B closing into the footer, cream #EEE8E0 between; Bodoni Moda 500 display at opsz 16, Libre Franklin 400 body, .meta labels; brass only as the two italic lines and the figures; a drawn 12-column hairline grid on every chapter (forest/10 on cream, paper/8 on dark); full-width rows on 1px rules; no cards, shadows, fills or pills.

STORY: the visitor learns the firm is lawyer-led and owns in its markets, sees its own listings and the houses behind the number, and is invited to say what they are trying to do.

FIRST VIEWPORT: forest, 100svh. Eyebrow top-left. H1 "Lawyer-led real estate." at clamp(2.75rem, 7.5vw, 6.5rem) across columns 1 to 11, with the italic brass-light line "Our own capital in the markets we advise on." beneath. Sub-line in columns 1 to 5. Cream seal, 160px, columns 10 to 12, bottom right. A 40px hairline and "Scroll" at the bottom left. Primary action: Enquire in the nav; the close chapter carries the links.

FORM: pinned by the user's c1 brief (five chapters, two cuts, rows not cards). No concept-seed roll: precisely specified request. Seed key: none. Signature interaction: the two 1.0s temperature wipes on cubic-bezier(0.7, 0, 0.3, 1); blur-to-sharp type and damped 8% parallax below the fold.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved
- /contact does not exist until c5; the close links to it anyway (user decision).
- Listing photography: /public/photos/{id}.jpg, none present yet; flat forest/10 blocks until then.
