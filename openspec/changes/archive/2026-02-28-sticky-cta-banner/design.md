## Context

The site currently has two lead capture paths: a modal dialog (triggered by CTA buttons) and an inline form near the page bottom. The fixed header at `z-50` already tracks scroll position via `isScrolled` (fires at `scrollY > 80`). The hero section is `min-h-[85vh]`. Layout.jsx owns the lead form state and the `submitLead` integration.

## Goals / Non-Goals

**Goals:**
- Show a compact lead form banner when user scrolls past the hero
- Hide the banner when user scrolls back toward the hero
- Smooth animation (slide + fade) that feels polished
- Reuse existing form submission infrastructure
- Accessible and mobile-friendly

**Non-Goals:**
- No new API endpoints or backend changes
- No analytics tracking beyond existing `trackEvent` calls
- No A/B testing framework — just ship the banner
- No cookie/localStorage to remember dismissal (keep it simple for v1)

## Decisions

### 1. Placement: Below the fixed header, not replacing it
**Choice:** Banner renders as a separate fixed element below the `64px` header.
**Why:** The nav must remain accessible at all times. Stacking below it is simpler than merging into the header and avoids layout shifts.
**Alternative:** Embed the form inside the header on scroll — rejected because it would complicate the header component and conflict with mobile menu behavior.

### 2. Scroll detection: Extend existing `isScrolled` handler in Layout
**Choice:** Add a second threshold (`pastHero`) to the existing scroll listener in Layout.jsx rather than creating a new component with its own listener.
**Why:** Avoids duplicate scroll listeners. Layout already owns the scroll state and the header — the banner is logically related.
**Alternative:** Standalone component with its own `useEffect` scroll listener — rejected to avoid redundant listeners and state management.

### 3. Show/hide logic: Scroll direction + position
**Choice:** Show when `scrollY > heroThreshold` AND scrolling down. Hide when scrolling up past a small debounce distance (50px).
**Why:** Matches the premier-homepros.com pattern. Showing on scroll-down-past-hero and hiding on scroll-up provides a non-intrusive UX.
**Alternative:** IntersectionObserver on the hero element — cleaner API but harder to combine with scroll-direction detection. The scroll listener approach is more straightforward here.

### 4. Form fields: Match InlineLeadForm (4 fields)
**Choice:** Name, zip code, phone, email — same as `InlineLeadForm.jsx`.
**Why:** These are the minimum fields needed to qualify a lead. Keeping it compact is critical for a banner that shouldn't feel intrusive. The `source` field will be `"sticky-banner"` for attribution.
**Alternative:** Full LeadCaptureForm fields — rejected because 6 fields won't fit in a single-row banner.

### 5. Animation: CSS transitions with Tailwind classes
**Choice:** Use Tailwind `transition-all duration-300` with `translate-y` and `opacity` toggling.
**Why:** No extra dependencies. Consistent with existing animation patterns in the codebase (`transition-all duration-300` is already used on the header).
**Alternative:** Framer Motion — overkill for a simple show/hide animation.

### 6. Mobile layout: Stack fields vertically, show only CTA button
**Choice:** On mobile (`< lg`), show a simplified banner with just a CTA button that opens the existing modal form instead of inline fields.
**Why:** 4 input fields don't fit on a mobile banner. A "Get Free Estimate" button that opens the existing modal is a better mobile UX.

## Risks / Trade-offs

- **Double scroll listeners** → Mitigated by combining into the existing handler in Layout
- **Banner covers content** → Mitigated by using a compact height (~60px) and hiding on scroll-up
- **Form duplication** → The banner form shares logic with InlineLeadForm but is a separate component for layout reasons. Could extract shared form logic later if needed.
- **Reduced motion** → Must respect `prefers-reduced-motion` by disabling animations for users who prefer it
