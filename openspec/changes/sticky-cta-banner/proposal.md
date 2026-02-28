## Why

Visitors who scroll past the hero section have shown intent but may not scroll all the way to the bottom inline form. A sticky CTA banner that appears when scrolling down (and fades on scroll up) keeps the conversion action visible at all times — similar to premier-homepros.com. This is a proven conversion optimization pattern for lead-gen sites.

## What Changes

- Add a sticky CTA banner component that slides in from the top when the user scrolls past the hero section
- Banner contains a compact inline lead capture form (name, zip, phone, email) on a single row
- Banner fades/slides out when the user scrolls back up toward the hero
- Banner sits below the existing fixed navigation header
- Reuses the existing `submitLead` API flow — no backend changes needed

## Capabilities

### New Capabilities
- `sticky-cta-banner`: A scroll-triggered sticky banner with an inline lead form that appears below the nav when the user scrolls past the hero, and hides when scrolling back up

### Modified Capabilities

## Impact

- **Components**: New `StickyCtaBanner` client component in `src/components/`
- **Layout**: Integrated into `src/components/Layout.jsx` (already owns the fixed header and lead form state)
- **Dependencies**: None new — uses existing `submitLead` from `@/api/leads`
- **Performance**: One additional scroll listener (can share with existing `isScrolled` handler in Layout)
- **Accessibility**: Must remain keyboard-navigable and not trap focus; respects `prefers-reduced-motion`
