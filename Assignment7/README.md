# Assignment 7 — Two-Page Website (CSS Grid, Flexbox, SASS/SCSS)

**Domain**: Coffee micro‑site — _Bean & Bloom_.  
**Pages**: `index.html` (Home) and `guide.html` (Brew Guide).

## How to Run
Open `index.html` in your browser. All assets use a precompiled CSS file at `public/css/style.css` so it works immediately.

## Compile SCSS (optional, recommended)
Option 1 — **VS Code + Live Sass Compiler** (easy):
1. Install the “Live Sass Compiler” extension.
2. Open the project folder in VS Code.
3. Click “Watch Sass” to compile `src/scss/main.scss` → `public/css/style.css`.
   - This project includes `.vscode/settings.json` that outputs CSS into `public/css/`.

Option 2 — **npm scripts** (if you have `sass` installed globally or via devDeps):
```bash
npm i
npm run build:css   # one-time build
npm run watch:css   # watch changes
```

## File Organization
```
/src/scss
  /base        ← variables, maps, fonts, reset
  /utilities   ← mixins, functions, generated utilities (loops, maps)
  /layout      ← grid + flex layouts
  /components  ← buttons, cards, navbar
  /pages       ← page-specific styles (home, guide)
public/css     ← compiled CSS output
index.html     ← page 1 (hero grid + card grid)
guide.html     ← page 2 (methods grid + flex FAQ)
```

## Where Requirements Are Met

### 1) Domain
- A coffee‑themed site (_not_ a portfolio). Pages are cohesive and consistent.

### 2) CSS Layout
- **CSS Grid (2+):**
  - Home **hero** split grid (`.hero`)  
  - Home **card grid** (`.card-grid`)  
  - Guide **methods grid** (`.methods-grid`) — additional
- **Flexbox (2+):**
  - **Navbar** and responsive menu (`.navbar`, `.navbar__menu`)  
  - **Footer** (`.footer__inner`)  
  - **Testimonial strip** center alignment (`.strip__content`) — additional

### 3) SASS/SCSS Features
- **Variables**: Colors, fonts, spacing, radius in `base/_variables.scss`.
- **CSS Custom Properties**: `:root` in `main.scss` exposes `--radius`, shadows, container width.
- **Nesting**: Used throughout, e.g., `.hero`, `.navbar`, `.method` blocks.
- **Interpolation**: Utility classes like `.gap-#{$k}` and spacing `.m#{$dir}-#{$size}` in `utilities/_utilities.scss`.
- **Placeholder Selectors**: `%card`, `%btn` in `utilities/_mixins.scss` extended by `.card`/`.btn`.
- **Mixins**: `respond-to($break)` for media queries and `flex-center($gap)` in `utilities/_mixins.scss`.
- **Functions**: `px-to-rem($px)` and `color-shade($color, $percent)` in `utilities/_functions.scss`.
- **Additional (4+)**:
  - **Maps** for colors/spacing/breakpoints (`$colors`, `$space-scale`, `$breakpoints`).
  - **@each / @for loops** to generate utilities (`.gap-*`, `.cols-*`, spacing shorthands).
  - **@extend** for `%card` / `%btn`.
  - **Module system**: `@use` to import modular partials across folders.

### 4) File Organization
- Structured into `base/`, `utilities/`, `layout/`, `components/`, `pages/` as required.

### 5) Design & UI
- Modern, minimal aesthetic (Playfair Display + Inter), sticky glassy navbar, elevated cards, responsive grids, clean spacing, and accessible contrast.

### 6) Documentation
- This README explains what’s implemented and how to run/compile.

---

## Notes for Graders
- The project includes **both** the SCSS source demonstrating all required features **and** a precompiled CSS file so the site renders without a build step.
- The responsive menu demonstrates progressive enhancement with a small JS snippet.
