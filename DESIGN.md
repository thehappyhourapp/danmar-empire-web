---
name: Danmar Empire
description: A lawyer-led brokerage's website, set as a dossier on forest and cream.
colors:
  forest: "#0F3B2F"
  forest-deep: "#07241B"
  forest-soft: "#17513F"
  paper: "#EEE8E0"
  ink: "#12261F"
  brass: "#80642C"
  brass-light: "#CDB177"
typography:
  display:
    fontFamily: "Bodoni Moda, Bodoni Moda Fallback, Georgia, serif"
    fontSize: "clamp(2.75rem, 7.5vw, 6.5rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.015em"
  page-title:
    fontFamily: "Bodoni Moda, Bodoni Moda Fallback, Georgia, serif"
    fontSize: "clamp(2.4rem, 5.4vw, 4.6rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Bodoni Moda, Bodoni Moda Fallback, Georgia, serif"
    fontSize: "clamp(2.1rem, 4.8vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Bodoni Moda, Bodoni Moda Fallback, Georgia, serif"
    fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)"
    fontWeight: 500
    lineHeight: 1.1
  italic-line:
    fontFamily: "Bodoni Moda, Bodoni Moda Fallback, Georgia, serif"
    fontSize: "clamp(1.35rem, 2.4vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.1
  body:
    fontFamily: "Libre Franklin, Libre Franklin Fallback, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "Libre Franklin, Libre Franklin Fallback, system-ui, sans-serif"
    fontSize: "10.5px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.19em"
  figure:
    fontFamily: "Bodoni Moda, Bodoni Moda Fallback, Georgia, serif"
    fontWeight: 500
    letterSpacing: "0.012em"
rounded:
  base: "2px"
spacing:
  gutter-390: "16px"
  gutter-1440: "32px"
  margin-390: "16px"
  margin-1440: "48px"
  row-390: "32px"
  row-1440: "40px"
  chapter-390: "96px"
  chapter-1440: "160px"
components:
  text-link:
    textColor: "{colors.forest}"
    typography: "{typography.label}"
  row:
    backgroundColor: "{colors.paper}"
    padding: "40px 0"
  enquiry-field:
    textColor: "{colors.ink}"
    padding: "16px 0"
  control-button:
    textColor: "{colors.forest}"
    typography: "{typography.label}"
    padding: "16px 0"
  nav-cream:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.forest}"
    height: "74px"
  nav-forest:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.paper}"
    height: "74px"
---

# Design System: Danmar Empire

## Overview

**Creative North Star: "The Dossier"**

The site reads like a file a careful firm would hand across a desk: a few chapters, each with one argument, set in Bodoni on forest and cream, with the evidence laid out in ruled rows rather than cards. It refuses the hero photograph, the search portal and the card grid. Proof is given by property, figures carry their basis, and every page ends in an invitation the visitor chooses to accept.

Density is low and deliberate. A drawn twelve-column grid of hairlines sits behind every chapter, so the page always shows its structure; type sits on the column lines, and space is generous rather than decorative. Temperature, forest against cream, is the strongest move in the vocabulary and is rationed: Home makes exactly two cuts, inner pages hold one ground.

Motion is quiet and two-speed. Interface feedback is quick (180 to 300ms); narrative motion is slow (900ms to 1.6s); nothing sits between. Content is in the server HTML and readable with JavaScript off, and nothing waits on an animation.

**Key Characteristics:**
- Forest and cream grounds, brass only for labels, figures and the italic line.
- A drawn 12-column hairline grid on every chapter; full-width rows on 1px rules; no cards, shadows or fills.
- Bodoni Moda 500 display with manual optical size; Libre Franklin 400 text; tracked uppercase labels.
- Two motion clocks; temperature cuts that read as cuts, never fades.
- Own listings only; flat placeholder frames until real photography exists.

### Motion

The interface clock runs 180 to 300ms on `cubic-bezier(0.25, 1, 0.5, 1)` (the `--ui` token): hairlines draw in 220ms, Collection rows swap in at 240ms (40ms apart, four steps at most), drawers slide from the right edge in 280ms and leave in 200ms, the client access dialog rises 8px in 200ms and leaves in 180ms, the mobile menu is drawn down from the top edge in 280ms and back up in 200ms, the SAVED badge settles from 1.12 to 1 in 240ms.

The narrative clock runs 900ms to 1.6s. Headings rise line by line inside masks (1.1s on `cubic-bezier(0.16, 1, 0.3, 1)`, 120ms per line); rows and paragraphs rise 24px (1.1s); on Home, type and frames under 600px also sharpen from blur (focus lands over 1.6s on `cubic-bezier(0.5, 1, 0.89, 1)`; 10px of blur, 6px at 390). A title and its paragraph reveal as one group. The two Home cuts are clip-path wipes: the old ground, grid and all, is carried off by a hard edge over 1.0s on `cubic-bezier(0.7, 0, 0.3, 1)`, the only symmetric curve on the site, fired when the boundary reaches 60% of the viewport, and the chapter's first heading rises as the edge passes it. Follow motion (the hero lift, Home's frame parallax) is damped with k = 8 and travels at most 8%.

Only transform, opacity, filter and clip-path animate. Every hidden start state hangs off `html[data-motion="on"]`, which is set after hydration and never under `prefers-reduced-motion: reduce`; under reduced motion every reveal resolves at once, overlays open and close without transition, and parallax is off.

**The Two Clocks Rule.** Interface motion is 180 to 300ms; narrative motion is 900ms to 1.6s; no duration falls between 300 and 900ms.

**The Cut Rule.** A change of ground is a hard edge, never a fade: the Home wipes, the nav on Home, and the nav on a route change all cut.

**The First Paint Rule.** No preloader, no splash, no WebGL or canvas, and the LCP element (the hero heading or hero image) never animates in.

## Colors

Two grounds and one metal: a deep conifer green, a warm unbleached paper, and an aged brass used as ink, never as paint.

### Primary
- **Forest** (forest): the brand ground. The Home hero, the practice pages for asset management and investments, the Firm page, the nav on those grounds, and forest type on cream.
- **Forest Deep** (forest-deep): the closing ground. Home's last chapter, the footer, the mobile menu, and the drawer backdrop at 60%.

### Secondary
- **Brass** (brass): labels, eyebrows, figures and the italic line on cream, and the hover hairline. Darkened from #8A6B2F on 5 Oct 2026, same hue, to reach 4.57:1 on cream.
- **Brass Light** (brass-light): the same roles on forest grounds (6.02:1 on forest).

### Neutral
- **Paper** (paper): the cream ground of every inner page and Home's middle chapters; paper type on forest.
- **Ink** (ink): running text on cream, at 80% for body and 70% for secondary text and labels.
- **Forest Soft** (forest-soft): the prototype notice bar only. It goes when the notice goes.

### Hairlines and grid
Content rules (row breaks, dividers, the lens bar) are forest at 14% on cream and paper at 12% on forest. The drawn column grid is forest at 6% on cream and paper at 5% on forest, so it sits behind the rules. Control edges (form fields, outlined buttons) are stronger, forest at 55% on cream and paper at 45% on forest, so they meet 3:1.

### Grounds per route
- Forest: `/asset-management`, `/investments`, `/firm`.
- Cream: `/executive-leasing`, `/collection` and every listing page, `/relocating`, `/track-record`, every person page under `/firm`, `/journal`, `/areas`, `/contact`, and the 404.
- Home: forest hero, three cream chapters, forest-deep close (two cuts).
- The footer is chrome, not a chapter, forest-deep on every page; it never counts as a cut.

**The Brass Ink Rule.** Brass is under 5% of any viewport: labels, figures, the italic line and the hairline. Never a fill, never a background.

**The One Ground Rule.** Inner pages hold one ground from the nav to the footer. Home alone makes two temperature cuts.

## Typography

**Display Font:** Bodoni Moda (with a metric-matched Georgia fallback)
**Body Font:** Libre Franklin (with a metric-matched Arial fallback)

**Character:** a high-contrast didone for the voice of the firm, held at weight 500 so its hairlines survive on cream, against a plain, even grotesque for everything that has to be read. Both are self-hosted woff2 and preloaded; the optical-size axis is set by hand (16 for display, 10 for figures), never left on auto.

### Hierarchy
- **Display** (500, clamp(2.75rem, 7.5vw, 6.5rem), 0.98): the Home hero heading only. It is the LCP element.
- **Page title** (500, clamp(2.4rem, 5.4vw, 4.6rem), 1.02): the H1 of every inner page.
- **Headline** (500, clamp(2.1rem, 4.8vw, 3.75rem), 1): chapter and section heads, set one authored line per mask.
- **Title** (500, clamp(1.4rem, 2.2vw, 1.9rem), 1.1): row titles (listings, people, transactions, areas, questions).
- **Italic line** (Bodoni italic, clamp(1.35rem, 2.4vw, 2rem), 1.1): the one brass second voice under a page title.
- **Body** (400, 15 to 16px, 1.8 to 1.85): running text at a 48ch measure (at most 75 characters a line).
- **Label** (500, 10.5px, 0.19em, uppercase): `.meta` labels, eyebrows, footnotes at a 60ch measure. The one exception to the 14px floor at 390.
- **Figure** (Bodoni 500, opsz 10, lining tabular numerals): prices, totals and indexes, in brass.

**The Single Weight Rule.** Display is always 500; hierarchy comes from size and leading, never from weight. Running text is always 400.

**The One Italic Rule.** At most one italic brass line per page (Home: one in the hero, one in the ownership chapter). Never on a section title.

**The Balanced Head Rule.** Headings balance their lines, so none ends on a single orphaned word where the column allows it.

## Layout

Twelve columns, 1440px wide at most. Margins are 16px at 390 and 48px from md; gutters 16px and 32px. The grid is drawn: twelve 1px column lines run the full height of every chapter, and the footer continues them. Text blocks start on a column line; lists of practices, services, offices, people and records are full-width rows with the title in columns 1 to 5 and the text in columns 7 to 12, a 1px rule above each.

Home's chapters pad 96px at 390 and 160px from lg, top and bottom, and run to at least the viewport's height. Inner pages set the visible gap between the bottom of the fixed nav and the H1 to 64px at 390 and 96px from lg (the listing page measures it from the bottom of its hero band), and close on 96px and 160px. The header's height is a token (`--nav-h`, 70px at 390 and 74px from md) and both the top padding and the sticky lens bar read it.

Spacing is on an 8px scale. Rows pad 32px at 390 and 40px from md. At 390 a row's title takes the full width above its text; between md and lg a row's figure sits under its text, and only from lg in the right-hand two columns.

**The Drawn Grid Rule.** The grid is drawn on every chapter of a page or on none; never skipped on a dark chapter.

**The Rows Not Cards Rule.** Collections of things are full-width rows on rules, never a grid of cards.

## Elevation & Depth

Flat. There are no shadows anywhere on the site. Depth comes from temperature (forest against cream), from the drawn grid sitting behind the content rules, and from the one overlay layer: drawers and the client access dialog over a forest-deep backdrop at 60%.

**The No Shadow Rule.** Nothing casts a shadow; a surface is separated by ground or by a rule.

## Shapes

Square. The base radius is 2px and is barely used; there are no pills and no rounded cards. Image frames are plain rectangles at 4:5 and 3:4 (portrait rows) and 21:10 (the listing hero band), and until photography exists each is a flat block (forest at 10% on cream, paper at 5% on forest). The SAVED count is the one round element.

## Components

### Text links
- **Character:** a word with a rule under it.
- **Style:** a resting hairline at 35% of the link's colour, 3px under the text.
- **Hover / Focus:** a second 1px hairline draws over it from the left in brass (paper on forest) in 220ms and retracts to the right; keyboard focus also draws it and adds a 1px outline. The link's hit area reaches 4px above and below, so a 10.5px label link is a 24px target.
- **Active:** an active lens, the current nav page and a saved listing keep the hairline drawn.

### Rows
- **Character:** the site's only container. A listing, person, transaction, area, question or office.
- **Structure:** a 1px rule above, 32px (390) or 40px padding, the frame in columns 1 to 3 stepping one column in on alternate rows, title and text from column 5, the figure in columns 11 and 12 from lg.
- **Hover:** hovering any link in a row draws the hairline under its title.

### Inputs / Fields
- **Style:** a single bottom rule (forest at 55%), no box, 16px vertical padding, labels as `.meta` above.
- **Focus:** the rule darkens to ink.
- **States:** the enquiry form has idle, sending, sent, unavailable and failed states; unavailable and failed show the desk address as selectable text, never a mailto link.

### Buttons
- **Shape:** square outlines, 1px, forest at 55% on cream or paper at 45% on forest; `.meta` label.
- **Hover:** fill with the opposite ground. Most actions are text links instead; the site has no filled buttons at rest.

### Navigation
- **Header:** the 30px building emblem and "DANMAR EMPIRE" in Bodoni, never the registered name; the full seal only at 120px or larger (the Home hero corner and the footer). Seven items, then SAVED and Enquire.
- **Ground:** the nav takes the ground of the page: forest on forest pages, cream on cream pages, transparent over the top of the Home hero. On Home it takes the ground of the chapter beneath it and changes as that boundary passes under it. The change is a cut, in the same frame as the page.
- **Mobile:** a forest-deep sheet drawn down from the top edge, numbered items in Bodoni, focus held inside, Escape closes.
- **Footer:** forest-deep, the full seal at 120px, the registered name, a link to every route, the offices, and the CREA and RECO disclosure set in three columns at 1440.

### Overlays
- **Drawers** (Enquire, Saved): from the right edge, 520px and 440px, cream. **Client access**: a centred 440px dialog. Each moves focus in as it opens, holds it, returns it on close, and closes on Escape.

## Do's and Don'ts

### Do:
- **Do** keep brass to labels, figures, the italic line and the hairline, under 5% of a viewport.
- **Do** draw the 12-column grid on every chapter, forest/6 on cream and paper/5 on forest, with content rules at forest/14 and paper/12.
- **Do** set running text at 48ch and labels at 60ch, so no line passes 75 characters.
- **Do** keep text at 14px or larger at 390, `.meta` labels (10.5px) excepted.
- **Do** keep figures in Bodoni 500 with lining tabular numerals, and give every figure its basis.
- **Do** use flat frames until real photography exists, and serve photography through `next/image` with `priority` on the LCP image.

### Don't:
- **Don't** add a preloader, splash, WebGL, canvas, count-up, marquee or scroll-driven hero scale.
- **Don't** animate layout properties, blur any image 600px or wider, or put any duration between 300 and 900ms.
- **Don't** use cards, shadows, gradients, pills, fills or glassmorphism.
- **Don't** put the registered name in the header, or the full seal under 120px.
- **Don't** show an MLS search, a map, or anything about an off-market listing beyond its area, type and tier.
- **Don't** set display type lighter than 500 or running text heavier than 400.

## Copy

Canadian spelling (colour, neighbourhood, centre, licence as a noun) and no em dashes. Nothing negative about other brokers, firms or advisors, anywhere. RECO: no unsubstantiated superlatives, and no sold prices without written consent; the track record shows list prices only. "UHNW" and "ultra-high-net-worth" appear in metadata only, and once in the body of the asset management and relocating pages. Own listings only: the firm signs the TRREB DLA, not IDX or VOW. The full rules live in CLAUDE.md under Copy rules and are binding.

## Launch-blocking

What must be resolved before this site goes live is kept in `docs/launch-blocking.md`: the form backend (Resend keys and the sending domain), the "$1B+ transacted" claim and its methodology, and the placeholder content (listings, transactions, journal articles, photography) that the prototype notice covers until then.
