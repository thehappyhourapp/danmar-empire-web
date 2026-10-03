<!-- https://residences.loamhouse.com.au/ : Captured 2026-10-02 at 1440x900, landing page only. GSAP 3.13 with ScrollTrigger, SplitText and ScrollSmoother; tween eases and durations read from gsap.globalTimeline. -->

# Design Map

## Spacing Scale
- scale: [8, 10, 14, 22, 26, 40, 63]
- base_unit: none strict (mixed 2px steps)
- chapter_height: 900px (one viewport)

## Font Hierarchy
- h1 display: 122.4px / 0.74, 300, Cormorant Garamond, tracking -0.045em
- h2 display: 100.8px / 0.85, 400, Cormorant Garamond, tracking -0.03em
- figure: 69.12px, 300, Cormorant Garamond
- second line: same as headline, 300 italic, Cormorant Garamond, gold ~#C9A46A (screenshot estimate)
- lead: 18.72px, 400, DM Sans
- label caps: 10-11px, 600, DM Sans, tracking 0.16em

## Color Palette
- cream ground / nav: #F1EEE7
- ink chapters: #1E211D
- map chapter: #B9CDD0
- text on dark: #FFFFFF at 0.5 / 0.6 / 0.72 / 0.9
- italic accent: ~#C9A46A (approx, from screenshot)

## Image Ratios
- full-bleed chapter: 2.17:1, 2.04:1, 1.78:1, 1.38:1 at 1440px

## Component Tokens
- radius: 999px (pill CTAs only), 0px elsewhere
- shadows: none
- grid: 3-col hero (671 / 400 / 80px), text inset 86px columns, gutter 57.6px, max width none (full-bleed)

## Motion
- blur_reveal: filter blur(8-16px) to 0, power1.out, 1.6-4.5s
- rise: y / opacity, power3.out, 1.4-2.6s
- stagger: 0.12-0.15s
- chapters: 12 ScrollTriggers, one per 900px section, scrub 2.5
- ui: 0.3-0.5s, cubic-bezier(0.65,0,0.35,1)
- nav_hover: blur(3px) over 0.35s
- overlay: scanlines at opacity 0.2
- preloader: yes (wordmark + percentage on #1E211D)
- webgl: no
- reduced_motion_css: True
- focus_visible: False
- lcp: 532ms, H1 text (server-rendered)

---

# Taste DNA

### Focus arrives after position
- **Trigger**: When revealing a headline or image as it enters the viewport
- **Decision**: Chose to run the blur-to-sharp filter on a slower, gentler curve (power1.out, 1.6-4.5s) than the rise and fade (power3.out, 1.4-2.6s) over animating all properties on one tween
- **Reason**: The element lands, then comes into focus, the way a camera racks focus after the frame settles; one combined tween reads as a fade
- **Evidence**: filter tweens: blur(8-16px) to 0 on power1.out at 1.6, 2.2, 2.9, 3.05, 4.5s; paired y/opacity tweens on power3.out at 1.4-2.6s; stagger 0.12-0.15s

### One chapter, one viewport
- **Trigger**: When sequencing proposition, size, storage, finishes, precinct, place and contact
- **Decision**: Chose ten equal 900px chapters, each with its own scrubbed ScrollTrigger, over sections sized to their content
- **Reason**: Equal-length chapters give the scroll a metronome; the reader learns that one flick of the wheel equals one idea
- **Evidence**: ScrollTrigger start/end pairs: 450-1350, 1350-2250, 2250-3150 ... 7650-8550; scrub 2.5 on every chapter; document height 9000px = 10 x 900

### Temperature as the section break
- **Trigger**: When separating chapters without rules or headers
- **Decision**: Chose to change ground temperature (cream #F1EEE7 to ink #1E211D to map blue #B9CDD0 and back to cream) over dividers or repeated section titles
- **Reason**: A shift from warm light to dark is felt before it is read, so the reader knows a new chapter has started without being told
- **Evidence**: background sequence while scrolling: #F1EEE7 at 450px, #1E211D from 900px, #B9CDD0 at 6300px, #1E211D at 7200px, #F1EEE7 at 8100px; 0 box-shadows on the page

### No surfaces, only photographs and type
- **Trigger**: When presenting specifications and amenities
- **Decision**: Chose full-bleed imagery with type set directly on it, zero shadows and no cards, over boxed feature tiles
- **Reason**: Cards would turn a residence into a product listing; type on the photograph keeps it a place
- **Evidence**: shadows: none; radii: 999px pills only (8 uses); images rendered at 1440px wide in every chapter
