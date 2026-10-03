<!-- https://oryzo.ai/ : Captured 2026-10-02 at 1440x900, landing page only. Motion is JS-driven (Astro bundle, no GSAP); easing read from the 1.1MB bundle. Scroll covered 40,500 of 56,691px. -->

# Design Map

## Spacing Scale
- scale: [7.5, 14.4, 18, 22.5, 24, 30.6, 40.5, 48, 204]
- base_unit: 4.5
- page_margin: 45px
- gutter: 18px

## Font Hierarchy
- wordmark: 409.5px, 500, halyard-display-variable
- h2: 51px / 0.9, 500, halyard-display-variable
- h3: 33.75px / 1, 500, halyard-display-variable
- lead: 18px, 500, halyard-display-variable
- body / nav: 13.5px and 12px, 500 / 400, halyard-display-variable

## Color Palette
- cream ground: #F6E0C6
- olive mat: #445231
- brown dark: #382416
- text light: #FFEDD7
- text dark: #100904
- accent: #DC5000

## Image Ratios
- gallery: 0.77:1 at 195px, centre frame ~0.77:1 at 556px

## Component Tokens
- radius: 0px, 22.5px (pill buttons), 36px (one panel)
- shadows: none
- grid: 16 columns, gutter 18px, max width 1440px

## Motion
- reveal_curve: exponentialOut: 1 - 2^(-10t)
- follow: frame-rate independent damping: lerp(a, b, 1 - exp(-dt * k))
- text: split per character, each resolving from blur and offset
- ui: 0.18s, 0.2s, 0.25s, 0.3s
- narrative: 1s
- webgl: yes, WebGL2 full-viewport canvas + Rive canvases
- preloader: yes (canvas)
- lcp: 7,096ms at 1440 desktop
- reduced_motion_css: False
- focus_visible: False

---

# Taste DNA

### Two clocks and nothing between
- **Trigger**: When timing hover feedback against story-telling motion
- **Decision**: Chose two separated duration bands, 0.18-0.3s for interface feedback and ~1s for narrative reveals, over a continuous spread of 0.4-0.8s values
- **Reason**: Feedback that answers inside 300ms feels like the object responded; story motion that takes a second feels intended; the middle band feels like lag
- **Evidence**: durations: 0.18s x5, 0.3s x5, 0.2s x4, 0.25s x2, 1s x4, almost no values between 0.5s and 1s

### Exponential settle, frame-rate independent
- **Trigger**: When an element follows scroll or pointer
- **Decision**: Chose exponential easing (1 - 2^(-10t)) for reveals and time-based damping lerp(a, b, 1 - exp(-dt * k)) for follow motion over fixed per-frame lerp factors
- **Reason**: Exponential out gets most of the way at once and then settles, so content is legible early; time-based damping moves at the same speed on a 60Hz phone and a 120Hz laptop
- **Evidence**: bundle: Math.pow(2,-10*e) x4, exponentialOut(v_showRatio); bundle: lerp(n,e,1-Math.exp(-t*i))

### The construction lines are left in
- **Trigger**: When framing a product as designed
- **Decision**: Chose visible drafting marks (dashed 1px guides, ruler ticks, bezier handles on the wordmark) over hiding the grid
- **Reason**: Showing the measurement makes the claim of care checkable; it reads as engineering, not decoration
- **Evidence**: dashed 1px outline around gallery frame; 16-column grid, 18px gutter, 45px margins; wordmark drawn with anchor points and handles

### One family for every role
- **Trigger**: When setting display, body, labels and buttons
- **Decision**: Chose halyard-display-variable at weight 500 for 265 of 354 text nodes over a display/body pairing
- **Reason**: With motion and 3D carrying the spectacle, a single family keeps the page from feeling assembled from parts
- **Evidence**: families on page: halyard-display-variable 559 nodes, Arial 26 (form defaults); weights: 500 x265, 400 x89
