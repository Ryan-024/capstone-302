# Content Buddy Wrapped 🎉

An interactive, parallax-driven **"year in review"** website for a content creator — inspired by Spotify Wrapped. Scroll from **Chapter 01** to **Chapter 04** to unwrap the year's top posts, top platforms, revenue mix, and follower growth story.

> Wrapped-style storytelling for creators. Punk-zine aesthetic. Real charts. Zero backend.

---

## Features

- **Four themed chapters** with distinct backgrounds, floating parallax emojis, and staggered scroll-reveal animations.
- **Month filter dropdown** in the app bar — switch between the full year (`All Year`) or any individual month. Every stat, card, and chart re-filters live.
- **High-contrast accessibility toggle** (eye icon, top right) — forces all text to solid black for easier reading.
- **Responsive punk-sticker card layout** — chunky black borders, 6px offset shadows, hover nudge animation.
- **Interactive charts** (Chart.js): grouped bar chart, line chart, and doughnut chart with currency + percentage tooltips.
- **Emoji parallax** — section-relative scroll parallax so each chapter's floaty emojis animate independently as they enter the viewport.
- **Fake data only** — no API, no backend. Realistic 12 months of metrics for a ~150k-follower creator, stored in a local JSON file.

---

## Tech Stack

| Layer            | Tool                              |
| ---------------- | --------------------------------- |
| Framework        | [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) |
| Language         | [TypeScript](https://www.typescriptlang.org/) |
| UI library       | [Vuetify 3](https://vuetifyjs.com/) |
| Charts           | [Chart.js 4](https://www.chartjs.org/) via [vue-chartjs](https://vue-chartjs.org/) |
| Icons            | [Material Design Icons](https://pictogrammers.com/library/mdi/) (`@mdi/font`) |
| Build tool       | [Vite 6](https://vite.dev/) |
| Typography       | Fraunces (display) + Inter (body) |
| Data source      | Local `datametrics.json` (no network) |

---

## Getting Started

Requires **Node 18+** and **npm**.

```bash
# install
npm install

# run the dev server (Vite HMR at http://localhost:5173)
npm run dev

# type-check + production build
npm run build

# preview the production build locally
npm run preview
```

---

## Project Structure

```
src/
├── App.vue                      # Root — mounts AppBar + 5 sections, wires state
├── main.ts                      # Vue bootstrap
├── datametrics.json             # 12 months of fake creator metrics
├── types.ts                     # Shared TS interfaces
├── env.d.ts
│
├── plugins/
│   ├── vuetify.ts               # Vuetify theme (punk palette)
│   └── chart.ts                 # Chart.js global defaults + component registration
│
├── styles/
│   └── main.css                 # Global tokens, section gradients, high-contrast mode
│
├── composables/
│   ├── useMetrics.ts            # Computes derived stats + platform meta
│   └── useParallax.ts           # Scroll + reveal-on-scroll utilities
│
└── components/
    ├── AppBar.vue               # Brand + month picker + a11y toggle
    ├── MonthToggle.vue          # Pill dropdown that emits MonthSelection
    ├── FloatyEmojis.vue         # Section-relative parallax emoji layer
    │
    ├── charts/
    │   ├── BarChart.vue         # Grouped bars (views / revenue / follower flow)
    │   ├── LineChart.vue        # Yearly line (revenue, followers)
    │   └── DoughnutChart.vue    # Revenue mix (currency + % tooltip)
    │
    └── sections/
        ├── HeroSection.vue      # Chapter 00 — total views / followers / net growth
        ├── ObsessedSection.vue  # Chapter 01 — top post, top song, top comment
        ├── PlatformSection.vue  # Chapter 02 — IG / TikTok / YT breakdown
        ├── RevenueSection.vue   # Chapter 03 — total revenue, mix, over time
        └── FinaleSection.vue    # Chapter 04 — follower journey + sign-off
```

---

## The Story (Chapters)

| # | Section        | What it shows |
| - | -------------- | ------------- |
| 00 | **Hero**       | Big total-views stat, follower count, net growth for the selected scope. |
| 01 | **Obsessed**   | Top content, top song, top comment — the three things that lived rent-free in your feed. |
| 02 | **Platform**   | Instagram / TikTok / YouTube side-by-side with views, comments, shares, ad revenue. Bar chart of monthly views across platforms. |
| 03 | **Revenue**    | Total ad revenue, top post revenue, estimated song revenue, top platform. Doughnut mix + revenue-over-time line. |
| 04 | **Finale**     | Follower journey line chart + net-growth / audience-growth stats + sign-off. |

Every chapter respects the month filter — pick "March" and every stat, card, and chart re-computes for that month.

---

## Data Shape

`src/datametrics.json` is one big object of the form:

```jsonc
{
  "creator": { "name": "...", "handle": "@..." },
  "year": {
    "subscriberGrowth": { "start": ..., "end": ..., "net": ..., "percent": ... },
    "topPostOfYear":    { "title": "...", "platform": "instagram", "views": ..., "revenue": ... },
    "topSongOfYear":    { "title": "...", "artist": "...", "uses": ... },
    "topCommentOfYear": { ... },
    "topCommenterOfYear": { "handle": "@..." }
  },
  "months": [
    {
      "month": "January",
      "monthIndex": 1,
      "subscribers": { "total": ..., "gained": ..., "lost": ..., "net": ... },
      "platforms": {
        "instagram": { "views": ..., "comments": ..., "shares": ..., "adRevenue": ... },
        "tiktok":    { "views": ..., "comments": ..., "shares": ..., "adRevenue": ... },
        "youtube":   { "views": ..., "comments": ..., "shares": ..., "adRevenue": ... }
      },
      "topPost": { "title": "...", "platform": "youtube", "views": ..., "revenue": ... },
      "engagement": {
        "topCommenter": "@...",
        "topSong": { "title": "...", "artist": "...", "uses": ... }
      }
    }
    // ... 11 more
  ]
}
```

Realistic numbers for a ~150k follower creator with organic ups and downs.

---

## Design System

Punk-zine palette (defined in `main.css` + `plugins/vuetify.ts`):

| Token   | Color     | Usage |
| ------- | --------- | ----- |
| `--ink`     | `#0a0a0a` | Text, borders |
| `--paper`   | `#f4ecdc` | Base background |
| `--pink`    | `#ff2d87` | Hot punk pink |
| `--purple`  | `#b026ff` | Electric violet |
| `--gold`    | `#ffe600` | Acid yellow |
| `--blue`    | `#00d1ff` | Cyan (Instagram) |
| `--green`   | `#39ff14` | Neon lime (finale) |
| `--red`     | `#ff3d3d` | Blood red (YouTube) |

Signature card style: **white background · 2px black border · 6px offset black shadow**. Cards nudge diagonally on hover (`translate(-2px, -2px)` + `8px 8px` shadow).

Section gradients keep each chapter visually distinct:

- Hero → pink
- Obsessed → violet
- Platform → cyan
- Revenue → orange
- Finale → lime

---

## Accessibility

- **High-contrast toggle** in the AppBar forces all text (including gradient headlines) to solid black and lifts opacity on de-emphasized labels/eyebrows/subtitles. Backgrounds and charts stay intact.
- All toggles use `aria-pressed` and `aria-label` for screen readers.
- Charts include hover tooltips with formatted currency and percentages.

---

## Scripts

| Script            | What it does |
| ----------------- | ------------ |
| `npm run dev`     | Start Vite dev server at http://localhost:5173 with HMR |
| `npm run build`   | `vue-tsc --noEmit` type-check then production build to `dist/` |
| `npm run preview` | Serve the built `dist/` folder locally |

---

## License

Private / educational project — no license granted.
