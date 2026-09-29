# Portfolio Development Plan — Muhammed Rashid

## 1. Overview & Constraints

- **Developer**: Muhammed Rashid, Full Stack & Distributed Systems Developer from Kerala, India.
- **Tech Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Prisma + PostgreSQL, Upstash Redis, Zod.
- **Strict Data Integrity Rule**: **DO NOT invent any data**. No fabricated company names, metrics, roles, dates, or numbers. If user data is not yet provided, use standard placeholders: `[ADD COMPANY]`, `[ADD METRIC]`, `[ADD LINK]`, `[ADD DATE]`, `[ADD SUMMARY]`.
- **Accessibility Guarantee**: Respect `prefers-reduced-motion` across all animations, transitions, and canvas renderings.
- **Phasing Scope**:
  - **Core Phase (Active)**:
    - Root layout, Noise overlay, Theme provider & toggle (Light / Dark).
    - Floating Dock with hover magnification, keyboard shortcuts `[1]`-`[4]`, and route tooltips.
    - Home page with lightweight Canvas 2D network-node graph and bio.
    - Experience page with timeline & skills matrix.
    - Projects page with architecture blueprint cards.
    - Contact API (`/api/contact`) with Zod validation.
    - Playground page: Limited strictly to the **Redis Rate-Limiter Sandbox**.
  - **Deferred Phase (Later)**:
    - Sound effects / audio feedback (skipped for now).
    - Kerala interactive map (skipped for now).
    - SQL visualizer (skipped for now).

---

## 2. Design System

### 2.1 Color Tokens (Kerala Emerald & Obsidian Silicon)

```css
/* Light Mode - "Calicut Sand & Nordic Slate" */
--bg-primary: #F8F9FA;          /* Clean alabaster */
--bg-surface: #FFFFFF;          /* Pure white card surface */
--bg-card: rgba(255, 255, 255, 0.75);
--fg-primary: #0F172A;          /* Deep slate */
--fg-muted: #64748B;            /* Balanced slate gray */
--accent: #059669;              /* Deep Malabar Emerald */
--accent-glow: #10B981;         /* Bright Mint Emerald */
--accent-cyan: #0891B2;         /* Cloud telemetry cyan */
--border-subtle: rgba(15, 23, 42, 0.08);
--dock-bg: rgba(255, 255, 255, 0.85);

/* Dark Mode - "Obsidian & Bioluminescent Teal" */
--bg-primary: #090D12;          /* Deep obsidian midnight */
--bg-surface: #111720;          /* Gunmetal slate card */
--bg-card: rgba(17, 23, 32, 0.65);
--fg-primary: #F1F5F9;          /* Crisp porcelain white */
--fg-muted: #94A3B8;            /* Muted cool silver */
--accent: #10B981;              /* Bioluminescent Emerald */
--accent-glow: #34D399;         /* High-visibility mint */
--accent-cyan: #06B6D4;         /* Cloud cyan */
--border-subtle: rgba(241, 245, 249, 0.1);
--dock-bg: rgba(13, 18, 26, 0.85);
```

### 2.2 Typography
- **Primary Body & Interface**: `Plus Jakarta Sans` (`--font-sans`)
- **Technical & Monospace**: `JetBrains Mono` (`--font-mono`)
- **Editorial Headings**: `Fraunces` (`--font-serif`)
- **Handwritten / Signature Accents**: `Kalam` (`--font-handwriting`)

---

## 3. Page & Component Structure

### Shell & Navigation
- `FloatingDock`:
  - Fixed bottom-center ergonomic dock (`backdrop-blur-2xl`).
  - 4 Navigation items:
    - `[1]` Home (`/`)
    - `[2]` Experience (`/experience`)
    - `[3]` Projects (`/projects`)
    - `[4]` Playground (`/playground`)
  - Framer Motion spring hover magnification (`scale-115` to `scale-125`).
  - Monospace tooltip bubbles with shortcut keys `[1]`-`[4]`.
  - Global hotkeys listener navigating to routes on keypress `1`, `2`, `3`, `4`.
  - Theme toggle button (Sun/Moon icon with smooth rotation).
- `NoiseOverlay`: Grain texture overlay across viewport.

### Core Pages
1. **Home (`/`)**:
   - Lightweight Canvas 2D interactive node-graph (network topography, no Three.js).
   - Bio intro: Muhammed Rashid, Full Stack & Distributed Systems Developer from Kerala.
   - Status beacon ("Open to opportunities").
   - "Initiate Contact" interaction button.
2. **Experience (`/experience`)**:
   - Timeline track connecting real career stops.
   - Skills matrix grouped by Backend, Frontend, Cloud/DevOps.
3. **Projects (`/projects`)**:
   - Production systems & client architecture cards.
   - Live demo & source links with `[ADD LINK]` placeholders where missing.
4. **Playground (`/playground`)**:
   - Redis Rate-Limiter interactive simulation tool.

---

## 4. Backend Plan

- **API Route**: `POST /api/contact`
  - Validates name, email, message via Zod.
  - Upstash Redis sliding window rate-limiting.
  - Prisma client database storage (PostgreSQL).
- **Prisma Schema**: `Message`, `Project`, `Experience` models.

---

## 5. Phased Roadmap

- [x] **Step 1**: Project init, dependencies, Google Fonts, theme tokens, NoiseOverlay, FloatingDock with shortcuts `[1]`-`[4]`, ThemeToggle, root layout, 4 placeholder routes, dev server check.
- [ ] **Step 2**: Home page implementation (Canvas 2D node graph, bio, contact popover).
- [ ] **Step 3**: Experience page (Timeline & skills matrix with verified data).
- [ ] **Step 4**: Projects page (Blueprint system cards).
- [ ] **Step 5**: Backend setup (Prisma, PostgreSQL schema, contact API with Zod & Redis rate-limit).
- [ ] **Step 6**: Playground (Redis Rate-Limiter sandbox).
- [ ] **Step 7**: Polish, accessibility check (`prefers-reduced-motion`), mobile audit.
