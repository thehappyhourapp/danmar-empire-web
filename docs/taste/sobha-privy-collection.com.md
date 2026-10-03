<!-- https://sobha-privy-collection.com/ : Captured 2026-10-02 at 1440x900, landing page only. Virtual scroller (document height = 900px), so section order comes from screenshots, not scroll offsets. -->

# Design Map

## Spacing Scale
- scale: [8, 10, 30, 60, 180]
- base_unit: 10
- page_margin: 30px
- section_gap: 180px

## Font Hierarchy
- script overlay: 100-114px, 400, altesse-std-64pt
- h1 display caps: 80px / 85px, 300, TT Ramillas, tracking 0.02em
- h2: 50px / 50px, 300, TT Ramillas, tracking 0.02em
- h3: 28px / 35px, 300, TT Ramillas
- nav / UI: 13px, 500, TT Commons Pro
- label caps: 11px / 15px, 600, TT Commons Pro

## Color Palette
- dark band: #1A1919
- hero / video ground: #000000
- light band: #FFFFFF
- secondary text: #717170
- accent: none (colour comes only from photography)

## Image Ratios
- full-bleed band: 1.85:1 and 16:9 at 1440px
- collage portrait: 0.70-0.80:1 at 360-720px

## Component Tokens
- radius: 0px (layout), 15px (cookie bar, map widget only)
- shadows: none perceptible
- grid: none: absolute/flex collage, 30px side margins columns, gutter ~10px between collage frames, max width none (1440 full-bleed)

## Motion
- primary_curve: cubic-bezier(0.7, 0, 0.3, 1) (29 uses)
- durations: 0.4s UI, 1s fades, 1.6s reveals
- reveals: line-wrap clip-path mask polygon(0 -17%, 105% -17%, 105% 110%, 0 110%); text starts at opacity 0.005
- parallax: translateY -68 to -300px on images
- scroll: virtual (custom) scroller
- preloader: yes (logo on #1A1919)
- webgl: no (hero is video, 14 video files)
- reduced_motion_css: False
- focus_visible: True

---

# Taste DNA

### Achromatic house, colour on loan from the photographs
- **Trigger**: When choosing a palette for a luxury residential brand that needs to feel rarefied
- **Decision**: Chose black #000, near-black #1A1919, white and one grey #717170 with no accent hue over a signature brand colour (gold, navy) applied to type and buttons
- **Reason**: Interiors carry warm marble, brass and greenery; an accent colour in the chrome would compete with the product instead of framing it
- **Evidence**: 3 background colours cover 100% of surface: #1A1919 83.3%, #FFFFFF 14%, #000 2.7%; text colours: #1A1919, #FFF, #717170 only; buttons: 0px radius, no fill colour

### Two voices in one headline
- **Trigger**: When a headline has to say both what and how it feels
- **Decision**: Chose light (300) display capitals overlapped by a calligraphic script line over a stacked headline plus a separate subheading
- **Reason**: The overlap reads as a single gesture, like an engraved card with a signature across it; a subheading under the headline reads as marketing copy
- **Evidence**: 'The art' script over 'OF THE SUBLIME' caps; 'of fine living' script crossing 'CONNOISSEURS'; TT Ramillas 300 at 80px/85px, altesse script at 100-114px

### One curve for every reveal
- **Trigger**: When choosing easing for fades, masks and colour changes
- **Decision**: Chose a single symmetric in-out curve cubic-bezier(0.7,0,0.3,1) at 1s-1.6s over per-component easings
- **Reason**: A slow start and slow settle makes every reveal feel like the same hand drawing a curtain, which is what makes long scroll feel paced rather than busy
- **Evidence**: cubic-bezier(0.7,0,0.3,1) used 29 times, next curve 7 times; durations: 0.4s x14, 1s x10, 1.6s x7; line masks via clip-path polygon

### Asymmetric collage over a grid
- **Trigger**: When showing several interiors in sequence
- **Decision**: Chose portrait frames of different sizes offset vertically around a centred tall image, with 180px of white between groups, over an even card grid
- **Reason**: Offset frames make the eye travel like walking through rooms; a grid of equal cards reads as inventory
- **Evidence**: portrait ratios 0.70-0.80:1 at 360, 410, 600 and 720px wide; no CSS grid on the page (gridCount 0); 180px spacing value x7; full-bleed 1.85:1 bands between collages
