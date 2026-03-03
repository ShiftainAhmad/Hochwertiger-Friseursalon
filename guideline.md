# SCHNITTSTELLE — Complete Website Design Prompt
### For use with Google Antigravity / AI Web Builders

---

## 01 · PROJECT OVERVIEW

**Client:** SCHNITTSTELLE Elsterstraße — Friseursalon (hair salon)
**Location:** Elsterstraße 7a, 04109 Leipzig, Germany
**Tone:** Dark luxury editorial. Think high-fashion magazine meets Awwwards-winning agency site. Sophisticated, cinematic, tactile. Not "cute salon" — think Maison Margiela meets a Berlin art gallery.
**Target audience:** Design-conscious Leipzig residents aged 22–45 who care about quality, aesthetics, and personal expression.
**Primary goal:** Convert visitors to booking appointments via StudioBookr.

---

## 02 · COLOR PALETTE

Use CSS custom properties throughout. Never hardcode hex values.

| Variable     | Hex       | Usage                                              |
|--------------|-----------|----------------------------------------------------|
| `--ink`      | `#0c0b09` | Primary background — almost black, warm undertone  |
| `--paper`    | `#f2ece0` | Full-screen menu background, light surfaces        |
| `--bone`     | `#e8dece` | Body text, headings on dark background             |
| `--gold`     | `#b8905a` | Accent color — labels, prices, decorative elements |
| `--rust`     | `#8c3a1e` | Hover states on light backgrounds (menu)           |
| `--muted`    | `#6b6457` | Secondary text, captions, metadata                 |

**Background:** Default dark (`--ink`). The fullscreen menu inverts to `--paper`. The team section and CTA use `#0f0e0c` (a slightly differentiated near-black) to create subtle section separation without borders.

**Do NOT use:** Pure black (#000), pure white (#fff), purple gradients, blue accents, or any saturated colors outside the palette above.

---

## 03 · TYPOGRAPHY

### Font Stack

```css
--serif: 'Bodoni Moda', Georgia, serif;
--sans:  'Syne', sans-serif;
```

Load from Google Fonts:
```
https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,300;0,6..96,400;0,6..96,700;1,6..96,300;1,6..96,400&family=Syne:wght@400;500;700;800&display=swap
```

### Type Scale & Rules

| Role                  | Font         | Size (clamp)                    | Weight | Style   | Color          |
|-----------------------|--------------|---------------------------------|--------|---------|----------------|
| Hero headline         | Bodoni Moda  | `clamp(50px, 9.5vw, 140px)`     | 300    | Mixed   | `--paper`      |
| Section headlines     | Bodoni Moda  | `clamp(32px, 5vw, 68px)`        | 300    | Normal  | `--paper`      |
| Philosophy quote      | Bodoni Moda  | `clamp(26px, 3.5vw, 52px)`      | 300    | Normal  | `--paper`      |
| Full menu items       | Bodoni Moda  | `clamp(36px, 6vw, 84px)`        | 300    | Mixed   | `--ink`        |
| Service row names     | Bodoni Moda  | `clamp(18px, 2.2vw, 28px)`      | 300    | Normal  | `--bone` 82%   |
| Review text           | Bodoni Moda  | `clamp(13px, 1.3vw, 16px)`      | 300    | Italic  | `--bone`       |
| Team member names     | Bodoni Moda  | `21px`                          | 300    | Normal  | `--paper`      |
| Opening hours         | Bodoni Moda  | `17px`                          | 300    | Normal  | `--bone`       |
| Contact values        | Bodoni Moda  | `17px`                          | 300    | Normal  | `--bone`       |
| Preloader word        | Bodoni Moda  | `clamp(36px, 7vw, 90px)`        | 300    | Normal  | `--paper`      |
| Rating number         | Bodoni Moda  | `clamp(56px, 8vw, 96px)`        | 300    | Normal  | `--gold`       |
| Ghost/background text | Bodoni Moda  | `clamp(80px, 9vw, 130px)`       | 300    | Normal  | 5% opacity     |
| Section labels        | Syne         | `9px`                           | 700    | Normal  | `--gold`       |
| Navigation logo       | Bodoni Moda  | `15px`                          | 700    | Normal  | `#fff` (blend) |
| Nav links             | Syne         | `10px`                          | 500    | Normal  | `#fff` 50%     |
| Body copy             | Syne         | `12–13px`                       | 400    | Normal  | `--bone` 52–55%|
| CTA button text       | Syne         | `10px`                          | 700    | Normal  | `--ink`        |
| Ticker items          | Bodoni Moda  | `13px`                          | 300    | Italic  | `--bone` 30%   |

### Typography Rules

- **Letter spacing for section labels:** `.4em` (very wide)
- **Letter spacing for body:** `.02em` (subtle)
- **Line height for body copy:** `2` (generous)
- **Line height for headlines:** `0.9–1.05` (tight)
- **Headline letter spacing:** `-.01em` to `-.02em` (slightly tight)
- **Italic = gold accent:** Whenever italic is used in a headline (via `<em>`), apply `color: var(--gold)`
- **Section labels format:** Always uppercase, 9px Syne 700, `--gold`, with a 26px gold horizontal rule before the text (`::before` pseudo-element)
- **Ghost numbers** (decorative large numerals behind sections): Bodoni Moda 300, ~5% opacity of `--bone`, positioned absolutely, non-interactive

---

## 04 · TEXTURE & ATMOSPHERE

Apply a persistent grain overlay to the entire page:

```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9000;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.032;
  mix-blend-mode: overlay;
}
```

This adds a tactile printed quality to the dark background.

---

## 05 · INTERACTIVE DETAILS

### Custom Cursor (desktop only)
- Small 10px gold dot (`--gold`) that follows mouse
- Scales up 3× on hover over interactive elements (links, buttons, cards)
- Hidden on touch devices (`@media (pointer: coarse)`)

### Scroll Progress Bar
- 2px tall, `--gold` color, fixed to very top of viewport
- Width tracks scroll percentage from 0% → 100%

### Magnetic Buttons
- CTA buttons subtly follow cursor movement on hover (max 32% of offset)
- Elastic snap back on mouse leave using spring easing

---

## 06 · ANIMATION SYSTEM

Use **GSAP 3** (CDN: `cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js`) + **ScrollTrigger** plugin.
Use **Lenis** for smooth scrolling (CDN: `cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js`).

### Lenis Config
```javascript
new Lenis({
  duration: 1.3,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
})
```

### Preloader Sequence
1. Letters of "SCHNITT" cascade up from below (stagger: 55ms each, translateY 110% → 0%)
2. Simultaneously: percentage counter climbs 0→100, gold line grows 0%→100% width
3. Letters exit upward (translateY 0% → -110%)
4. Curtain split: top half slides up, bottom half slides down, revealing site
5. Hero headline lines animate in (stagger: 120ms)
6. Hero eyebrow and footer fade in

### Scroll Reveal Classes
Three utility classes trigger on scroll entry (`top 85-87%`):
- `.r-up` — `opacity: 0; transform: translateY(48px)` → fully visible
- `.r-left` — `opacity: 0; transform: translateX(-48px)` → fully visible
- `.r-right` — `opacity: 0; transform: translateX(48px)` → fully visible

All use `power3.out` easing, ~0.9–1s duration.

### Hero Parallax
Hero background image moves at 22% of scroll speed (`scrub: true`).

### Gallery Horizontal Scroll
The gallery section pins and the image track translates horizontally as user scrolls down. Duration: `500vh` of scrollable space.

### Counter Animation
Stats (e.g. "64 reviews") count up from 0 when scrolled into view.

---

## 07 · PAGE STRUCTURE & SECTIONS

### Fixed Elements
- **Progress bar** — top of viewport, 2px gold line
- **Custom cursor** — gold dot
- **Navigation bar** — fixed, `mix-blend-mode: difference` so text inverts against any background
- **Fullscreen menu overlay** — covers entire viewport, `clip-path` reveal animation

---

### Section 1: Preloader
Full-viewport dark overlay. Centered content: animated letters + counter + growing line.

---

### Section 2: Navigation

**Layout:** Flex row, `justify-content: space-between`, `align-items: center`
**Left:** Logo "SCHNITT**STELLE**" — second half at 50% opacity
**Right:** "TERMIN BUCHEN" text link + hamburger button (2 lines, 28px and 18px wide)

Navigation uses `mix-blend-mode: difference` so it remains readable on any background (dark or light).

---

### Section 3: Fullscreen Menu

**Trigger:** Hamburger button — `clip-path: inset(0 0 100% 0)` → `inset(0 0 0% 0)`

**Layout:** Full viewport, `--paper` background, `flex-direction: column`, `justify-content: space-between`
**Top padding:** 80–110px (clears the nav bar so first item is never hidden)
**Bottom padding:** 32–56px

**Menu items (5 links):**
Each item = row with small number `(01–05)` in Syne + large Bodoni Moda text
Each item separated by a top border (`rgba(12,11,9,.12)`)
Italic portions in Bodoni Moda italic (same color as roman on dark, turns `--rust` on hover)

```
01  Über uns
02  Leistungen
03  Galerie
04  Bewertungen
05  Kontakt
```

**Bottom bar:** Phone + Instagram + address on left | "TERMIN BUCHEN" dark CTA button on right

---

### Section 4: Hero

**Height:** `100svh`
**Background:** Full-bleed Unsplash hair salon photo, dark gradient overlay (94% at bottom, 25% at top)

**Layout (content at bottom-left):**
1. Eyebrow line — small gold text with preceding 30px gold rule: "Friseursalon · Leipzig · Seit 2010"
2. H1 headline (3 lines, each in overflow-hidden wrapper so letters animate up):
   - Line 1: "Dein Haar."
   - Line 2: "Dein *Ausdruck.*" (italic = gold)
   - Line 3: "Dein *Moment.*" (italic = gold)
3. Footer row: left = description text | right = CTA button + "Scroll" hint with vertical line

**Decorative ghost number** "01" — huge, 3–4% opacity, positioned right side, vertically centered

---

### Section 5: Ticker / Marquee

Continuous horizontal scroll of service names, separated by gold `✦` diamonds and vertical rules.

Services listed: Haarschnitt · Balayage · Babylights · Crazy Color · Coloration · Strähnentechniken · Blondierung · Haarverdichtung · Keratin · Olaplex (and repeat)

**Borders:** 1px top and bottom at 9% opacity of `--bone`
**Animation:** CSS `@keyframes ticker`, `translateX(-50%)`, 26s duration, linear infinite

---

### Section 6: Philosophy / About

**Layout:** CSS Grid, `1fr 2fr`, large gap

**Left column:**
- Section label "Über uns"
- Ghost number "02" (decorative, large, faint)

**Right column:**
- Large blockquote in Bodoni Moda italic: *"Wir machen nicht nur Haare — wir formen Identitäten."*
- Body paragraph text (2 paragraphs about the salon ethos and product brands used)
- Stats row (3 stats separated by flex gap):
  - `64` — Google Reviews (animated counter)
  - `5.0` — Sterne Rating
  - `10+` — Jahre Erfahrung

**Stats styling:** Large Bodoni Moda 300 number in `--gold`, small Syne uppercase label below, separated by top border

---

### Section 7: Services

**Layout:** Full-width list of 6 service rows

**Header:** Left = section label + H2 "Was wir für *dich tun.*" | Right = "— 06 Leistungen"
Separated by bottom border from the list.

**Each row (CSS Grid: 4 columns on desktop):**
- Column 1: Number (01–06) — Bodoni Moda italic, `--muted`
- Column 2: Service name in large Bodoni Moda with `→` arrow that translates right on hover
- Column 3: Short description — hidden on mobile
- Column 4: Price — Bodoni Moda italic `--gold`, right-aligned

**Hover effect:** Gold tinted background wash fills from left (`::before` pseudo-element, `width: 0 → 100%`); name letter-spacing expands slightly; arrow translates 6px right and turns gold

**Services:**
| # | Name | Description | Price |
|---|------|-------------|-------|
| 01 | Haarschnitt | Präzise Schnitte für Damen & Herren | ab 28 € |
| 02 | Balayage | Handgemalte Lichter, natürlicher Effekt | Anfrage |
| 03 | Babylights | Feinste Highlights, leuchtender Look | Anfrage |
| 04 | Crazy Color | Von Mint über Lila bis Kupfer | Anfrage |
| 05 | Coloration | Professionelle Farbe & Blondierungen | ab 45 € |
| 06 | Farbberatung | Kostenloses Beratungsgespräch | kostenlos |

---

### Section 8: Horizontal Gallery (Pinned)

**Mechanism:** Section has `500vh` of scroll height. The inner container is `position: sticky; top: 0; height: 100svh`. As user scrolls, GSAP translates the image track horizontally.

**Gallery track structure:**
1. **Label panel** (38vw wide) — Section label "Galerie" + H2 "Unsere *Arbeit* spricht." + "Scroll →" hint
2. **5 image panels** (varying widths: 46vw, 38vw, 52vw, 36vw, 46vw)

**Image treatment:** All images `filter: saturate(0.12) brightness(0.75)` by default. On hover: `filter: saturate(1) brightness(1)` — full color reveals on hover. Caption fades in at bottom-left on hover.

**Image sources (Unsplash, hair salon themed):**
1. `photo-1562322140-8baeececf3df` — Haarschnitt & Styling
2. `photo-1634449571010-02389ed0f9b0` — Balayage Technik
3. `photo-1605497788044-5a32c7078486` — Salon Atmosphäre
4. `photo-1522337360788-8b13dee7a37e` — Farb & Schnitt
5. `photo-1626015349952-34c3b3b48d82` — Crazy Color

---

### Section 9: Reviews

**Header:** Left = section label + H2 "Was Leipzig *sagt.*" | Right = large `5.0` rating + stars + review count

**Layout:** CSS Grid, 3 columns, 2px gap (creates thin dark lines between cards)

**Each card:**
- Background `#111`, subtle gold top border on hover (scale-in animation)
- Large decorative `"` quote mark (Bodoni Moda, 44px, 30% gold opacity)
- Review text in Bodoni Moda italic
- Author name in 9px uppercase Syne, `--gold`
- Date in 9px Syne, `--muted`

**Real reviews (6 total):**
1. Lilly Anzer — highlights perfectly natural
2. Caro Seil — first visit, Irena's advice
3. Nati Nat Nerf — Paul's color consultation
4. Claudia — Fadi's curl-aware technique
5. Karina Thomas — blonde hair restored
6. Nikita Solberg — online booking, perfect execution

---

### Section 10: Team

**Background:** `#0f0e0c` (slightly different from default `--ink`)
**Layout:** CSS Grid, 4 equal columns, 2px gap

**Each card:**
- `aspect-ratio: 2/3` (portrait orientation)
- Image: grayscale 80% + brightness 75% by default; full color + scale-1.0 on hover (was scale 1.04)
- Name overlay at bottom: slides up on hover (translateY 38px → 0)
- Name in Bodoni Moda 300, role in 9px uppercase Syne `--gold`

**Team members:**
| Name | Role |
|------|------|
| Irena | Locken & Highlights |
| Paul | Schnitt & Coloration |
| Fadi | Curl Expert |
| Nadine | Senior Stylistin |

---

### Section 11: Hours & Contact (2-column)

**Layout:** CSS Grid, `1fr 1fr`, large gap

**Left column — Opening Hours:**
- Section label + H2 "Wann wir *für dich da sind.*"
- 7 rows (Mon–Sun), each row: day name (Syne 10px uppercase `--muted`) + time (Bodoni Moda 17px `--bone`)
- Sunday marked as "Geschlossen" at ~18% opacity italic
- Gold-bordered note box below about June 2025 schedule change

**Right column — Contact:**
- Section label + H2 "Wir sind *in Leipzig.*"
- 4 contact rows, each: small square icon container + label + value
- Values are links styled in Bodoni Moda 300, hover turns `--gold`

**Contact data:**
| Icon | Label | Value |
|------|-------|-------|
| 📍 | Adresse | Elsterstraße 7a, 04109 Leipzig |
| 📞 | Telefon | 0341 4895991 |
| 💬 | WhatsApp | 0157 30 80 51 97 |
| 📸 | Instagram | @schnittstelle_elsterstrasse |

---

### Section 12: CTA (Booking)

**Background:** `#0f0e0c`

**Large ghost text** "SCHNITTSTELLE" behind content — Bodoni Moda, ~2.2% opacity, kinetic horizontal parallax (moves slightly on scroll)

**Content (centered):**
- Section label "— Nächster Schritt"
- H2 "Bereit für deinen *neuen Look?*"
- Subline in small muted text
- Two buttons side by side:
  - Primary (gold fill): "Online Termin buchen" → links to StudioBookr
  - Secondary (ghost/outline): "Anrufen: 0341 4895991" → tel link

---

### Section 13: Footer

**Layout:** Flex row, space-between, border-top at 8% opacity

- **Left:** Logo "SCHNITT**STELLE**" (gold for second half)
- **Center:** Copyright line in small muted text
- **Right:** 3 text links — Instagram · Buchen · Telefon

---

## 08 · RESPONSIVE BREAKPOINTS

| Breakpoint | Key Changes |
|------------|-------------|
| `max-width: 1024px` | Team grid → 2×2; service description column hidden |
| `max-width: 768px` | Hamburger only nav; philosophy → single column; info → single column; reviews → single column; gallery panel widths increase to 72–85vw; footer stacks vertically |
| `max-width: 540px` | Services → single column; team → 2 columns; stats → vertical stack; CTA buttons → full width |

---

## 09 · BUSINESS DATA

```
Salon Name:     SCHNITTSTELLE Elsterstraße
Owner:          Yvonne Hoppe
Address:        Elsterstraße 7a, 04109 Leipzig
Phone:          0341 4895991
WhatsApp:       0157 30 80 51 97
Instagram:      @schnittstelle_elsterstrasse
Booking URL:    https://www.studiobookr.com/schnittstelle-elsterstrasse-62121
Google Maps:    https://maps.google.com/?q=Elsterstraße+7a+04109+Leipzig
Google Rating:  5.0 stars · 64+ reviews

Opening Hours:
  Monday–Friday:  09:00–18:30
  Saturday:       09:00–12:00
  Sunday:         Closed
  Note (June 2025+): 1st & 3rd week: 9–15 Uhr · 2nd & 4th week: 12–18 Uhr
```

---

## 10 · LIBRARIES & CDN DEPENDENCIES

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,300;0,6..96,400;0,6..96,700;1,6..96,300;1,6..96,400&family=Syne:wght@400;500;700;800&display=swap" rel="stylesheet"/>

<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

<!-- Lenis Smooth Scroll -->
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js"></script>
```

---

## 11 · ADDITIONAL DESIGN DIRECTIVES

- **No drop shadows** — use opacity, borders, and background differentiation instead
- **No rounded corners** — all elements are sharp/rectangular (brutalist precision)
- **No colored backgrounds on cards** — use `#111` or `#0f0e0c` only
- **Borders are always thin** — 1px only, at 7–12% opacity of `--bone` on dark, 12–15% of `--ink` on light
- **Spacing uses clamp()** — all section padding scales fluidly with viewport
- **Images load with `loading="lazy"`** except hero
- **All text links styled via class** — never default browser link styling
- **Cursor: none on body** — always use custom cursor on desktop
- **`overflow-x: hidden` on body** — prevents horizontal scroll from animations
- **`100svh` not `100vh`** — use small viewport height unit for mobile browser chrome safety