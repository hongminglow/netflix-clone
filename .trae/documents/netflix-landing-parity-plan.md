# Netflix Landing Parity Plan (my-en)

## Summary
Bring the public landing page (`https://www.netflix.com/my-en/`) closer to a 1:1 UI/UX clone inside this repo’s existing Vite + React app by matching section structure and key interactions:
- Top bar (logo, language, sign-in)
- Hero (headline, price line, email CTA)
- “Trending now” Top 10 ranked carousel with `<`/`>` navigation
- “More reasons to join” feature grid (4 items)
- FAQ accordion + bottom email CTA (Netflix-style)
- Footer link grid

This plan focuses on the landing page only (per user decision). Browse parity is explicitly out-of-scope for this pass.

## Current State Analysis
### What Netflix (my-en) contains (observed)
From live page inspection:
- Top bar: language selector + Sign In
- Hero: headline + “Starts at … Cancel anytime.” + email field + Get Started
- “Trending now”: Top 10 ranked carousel (numbered cards), horizontal scroll with arrow navigation
- “More reasons to join”: 4 feature blocks
- “Frequently Asked Questions”: accordion items (expand/collapse)
- Bottom: repeated email CTA
- Footer: “Questions? Contact us.” + dense link grid + language selector + region label

### What the current clone implements
- Landing hero with email CTA and language switch: [LandingPage.tsx](file:///Volumes/External%20Hardisk/Project/netflix-clone/src/pages/LandingPage.tsx)
- Trending row present, ranked style, but missing Netflix-like arrow navigation affordance: [TrendingRow.tsx](file:///Volumes/External%20Hardisk/Project/netflix-clone/src/components/TrendingRow.tsx)
- Features section exists but only 3 blocks, no “More reasons to join” heading, no kids profile block: [LandingPage.tsx](file:///Volumes/External%20Hardisk/Project/netflix-clone/src/pages/LandingPage.tsx)
- No FAQ accordion or bottom email CTA.
- Footer grid exists but is simpler than Netflix’s.

## Proposed Changes
### 1) Trending now carousel: add Netflix-like `<` / `>` navigation
**Goal:** user can click left/right to page through items (not only trackpad scroll).

- Update [TrendingRow.tsx](file:///Volumes/External%20Hardisk/Project/netflix-clone/src/components/TrendingRow.tsx)
  - Keep existing ranked cards.
  - Ensure arrow buttons are visible on hover/focus and work on mobile (tap targets).
  - Scroll behavior: `scrollBy({ left: scroller.clientWidth * 0.9 })`.
  - Optional: enable `scroll-snap` for cleaner stops.
- Update landing CSS in [App.css](file:///Volumes/External%20Hardisk/Project/netflix-clone/src/App.css)
  - Add `.trendingRail:hover .rowNav { opacity: 1; }` (currently only `.rowRail:hover .rowNav` exists).
  - Make nav gradient overlays match Netflix feel and cover the carousel height.
  - Keep accessibility: focus-visible shows nav.

**Acceptance checks**
- On desktop: hovering carousel reveals `<`/`>` buttons; clicking scrolls.
- On mobile: buttons visible (or always visible at reduced opacity) and tappable.

### 2) Match “More reasons to join” section structure (4 features)
**Goal:** have the same feature count and section framing as Netflix.

- Update [LandingPage.tsx](file:///Volumes/External%20Hardisk/Project/netflix-clone/src/pages/LandingPage.tsx)
  - Add a “More reasons to join” heading section wrapper.
  - Add 4th feature block: “Create profiles for kids”.
  - Keep imagery as sample/placeholder-safe (current generated images are fine).
- Update translations in [i18n.tsx](file:///Volumes/External%20Hardisk/Project/netflix-clone/src/i18n.tsx)
  - Add strings for the new “More reasons to join” heading and “kids profiles” feature title/body in en/bm/zh.

**Acceptance checks**
- Landing page shows a clear section heading + 4 feature blocks.
- Text switches correctly with language selector.

### 3) Implement FAQ accordion (Netflix-style) + bottom email CTA
**Goal:** replicate the interaction pattern: questions expand/collapse; CTA repeated below.

- Create new component: `src/components/FaqAccordion.tsx`
  - Data-driven list of FAQ items (question + answer).
  - Interaction: click toggles open/close; only one open at a time (Netflix-like).
  - Keyboard: Enter/Space toggles; proper `aria-expanded`, `aria-controls`.
- Update [LandingPage.tsx](file:///Volumes/External%20Hardisk/Project/netflix-clone/src/pages/LandingPage.tsx)
  - Insert FAQ section after “More reasons to join”.
  - Add bottom email CTA block (reuse existing email field + Get Started button styling).
- Update [App.css](file:///Volumes/External%20Hardisk/Project/netflix-clone/src/App.css)
  - Add FAQ styles: big clickable rows, plus/minus icon, smooth expand animation.
  - Add bottom CTA spacing consistent with Netflix.
- Update [i18n.tsx](file:///Volumes/External%20Hardisk/Project/netflix-clone/src/i18n.tsx)
  - Add translations for:
    - “Frequently Asked Questions”
    - FAQ questions/answers (at least 6 items) in en/bm/zh
    - Bottom CTA prompt line (reuse current hero hint or create a dedicated key)

**Acceptance checks**
- Accordion opens/closes correctly, with only one open at a time.
- Bottom CTA is visible and navigates to signup when clicked.
- All FAQ text responds to language switching.

### 4) Ensure “Trending now” thumbnails are “proper images”
**Goal:** all carousel items have real-looking images (no broken URLs).

- Keep using public sample image URLs already configured in [catalog.ts](file:///Volumes/External%20Hardisk/Project/netflix-clone/src/data/catalog.ts) (Google gtv bucket).
- If any image is missing/404, replace with another known-good sample image from the same bucket.

**Acceptance checks**
- No broken images in the landing Trending row.

## Assumptions & Decisions (Locked)
- Scope: landing page parity only (my-en).
- Data source: static demo catalog with sample MP4s and sample/public thumbnails (no TMDB).
- Carousel: Top 10 ranked style.
- FAQ: Netflix-style accordion + bottom email CTA.

## Verification Steps
- Run `npm run build` (TypeScript + Vite build) to ensure no type errors.
- Manual UI verification:
  - Language switch updates hero, trending label, features, FAQ content.
  - Trending row shows `<`/`>` on hover and scrolls in chunks.
  - FAQ accordion expands/collapses with keyboard and mouse.
  - Bottom email CTA button navigates to `/signup`.

