## 1. Scroll Detection

- [x] 1.1 Extend the scroll handler in `src/components/Layout.jsx` to track `pastHero` state (scrollY > window.innerHeight * 0.85) and scroll direction (up/down with 50px debounce)

## 2. Banner Component

- [x] 2.1 Create `src/components/StickyCtaBanner.jsx` client component with compact inline form (name, zip, phone, email) for desktop (lg+)
- [x] 2.2 Add mobile variant: CTA button only (< lg) that triggers the existing lead capture modal
- [x] 2.3 Wire form submission to `submitLead` from `@/api/leads` with `source: "sticky-banner"`
- [x] 2.4 Style with brand tokens: anchor blue background, white text, matching existing CTA patterns

## 3. Animation

- [x] 3.1 Add slide-down/fade-in animation using Tailwind `transition-all duration-300` with `translate-y` and `opacity`
- [x] 3.2 Respect `prefers-reduced-motion` — disable transitions when enabled

## 4. Integration

- [x] 4.1 Render `StickyCtaBanner` in `Layout.jsx` below the header, passing `pastHero`, scroll direction, and `setLeadFormOpen` for mobile CTA
- [x] 4.2 Set z-index to `z-40` (below header's `z-50`) to layer correctly

## 5. Accessibility

- [x] 5.1 Add `role="complementary"` and `aria-label` to the banner region
- [x] 5.2 Ensure form fields are keyboard-navigable with visible focus states

## 6. Verification

- [ ] 6.1 Test scroll behavior: banner appears past hero, hides on scroll up, reappears on scroll down
- [ ] 6.2 Test mobile: CTA button opens modal, no inline fields shown
- [ ] 6.3 Test form submission: lead arrives via `/api/leads` with correct source
- [x] 6.4 Run `npm run build` — zero errors
