<!-- https://leome-and-partners.com/ : Captured 2026-10-02 at 1440x900 across 3 pages: landing, /about.html, /services.html. Webflow + GSAP 3.13/3.15 (SplitText, DrawSVG) + Lenis. Inner pages are the reference; the landing hero is not. -->

# Design Map

## Spacing Scale
- scale: [8, 12, 16, 24, 28, 32, 48, 72, 112]
- base_unit: 8
- section_padding: 112px
- grid_gap: 48px row / 32px column

## Font Hierarchy
- h1: 88px / 1.05, 500, Brockmann, tracking -0.02em
- h2: 48-64px / 1.05, 500, Brockmann, tracking -0.02em
- h3 / row title: 32px / 1.15, 500, Brockmann, tracking -0.02em
- lead: 24-28px / 1.4, 400, Brockmann
- body: 16-19.2px / 1.5, 400, Brockmann
- meta: 12px, 500, Brockmann

## Color Palette
- page field: #052824
- footer / deep field: #021D1A
- text + accent: #B1F9E1
- secondary text: #FFFFFF
- rare block (about page only): #FF5D2B

## Image Ratios
- team portrait: ~0.8:1 at 421px
- full-bleed parallax: 1.33-1.41:1 at 1440px

## Component Tokens
- radius: 0px
- shadows: none
- grid: 12 columns, gutter 32px (48px row gap), max width 1360px inside 40px margins

## Motion
- line_reveal: SplitText lines from translateY 39-67px, transform 0.6s cubic-bezier(0.625, 0.05, 0, 1)
- stagger: transition-delay 0.01s steps
- menu: clip-path 1s cubic-bezier(0.9, 0, 0.1, 1)
- parallax: scrub 1 on background images
- scroll: Lenis
- preloader: yes (landing)
- lcp: 212ms, text
- reduced_motion_css: False
- focus_visible: False

---

# Taste DNA

### Rows, not cards
- **Trigger**: When listing practice areas and services on an inner page
- **Decision**: Chose full-width rows separated by a 1px rule, title in the left half and description from column 7, over a grid of service cards
- **Reason**: A legal client compares areas by reading down a list; cards break that into tiles to scan and make each area look like a product
- **Evidence**: services page: 1px divider above each row at x=40 to 1400; 12-col grid, 48px row gap / 32px column gap; radius 0, no shadows on all three pages

### One field colour per page
- **Trigger**: When separating sections on interior pages
- **Decision**: Chose a single deep green #052824 field for the whole page, with hierarchy from mint #B1F9E1 vs white text, over alternating section backgrounds
- **Reason**: Interior pages are for reading; holding one ground lets type do the work and keeps the eye on the content rather than on the transitions
- **Evidence**: #052824 covers 66.8-71.2% of surface on every page; text: #B1F9E1 148-164 nodes, #FFF 10-27 nodes

### One family, one heading weight
- **Trigger**: When building heading hierarchy
- **Decision**: Chose Brockmann at 500 for every heading with size and -0.02em tracking as the only variables, over weight contrast
- **Reason**: Weight changes add noise; a steady weight reads as composed, which suits a firm selling judgement
- **Evidence**: one family on all 3 pages (400-436 nodes); h1 88px, h2 48-64px, h3 24-32px, all weight 500, all -0.02em

### Short, front-loaded line rises
- **Trigger**: When revealing paragraphs and headings on inner pages
- **Decision**: Chose a 0.6s rise per split line on cubic-bezier(0.625, 0.05, 0, 1) over long fades or blur
- **Reason**: Interior text has to be readable quickly; a short rise acknowledges arrival without making the reader wait
- **Evidence**: gsap_split_line spans start at translateY 39.2px and 67.2px; transform 0.6s cubic-bezier(0.625,0.05,0,1) with 0.01s step delays
