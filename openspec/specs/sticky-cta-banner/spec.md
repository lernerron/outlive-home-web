# sticky-cta-banner Specification

## Purpose
TBD - created by archiving change sticky-cta-banner. Update Purpose after archive.
## Requirements
### Requirement: Banner appears on scroll past hero
The system SHALL display a sticky CTA banner when the user scrolls past the hero section (approximately 85vh).

#### Scenario: User scrolls down past hero
- **WHEN** user scrolls down and viewport passes the hero section bottom
- **THEN** banner slides in from above, positioned below the fixed navigation header

#### Scenario: User is at top of page
- **WHEN** page loads or user is within the hero section
- **THEN** banner SHALL NOT be visible

### Requirement: Banner hides on scroll up
The system SHALL hide the sticky CTA banner when the user scrolls back up toward the hero section.

#### Scenario: User scrolls up after banner is visible
- **WHEN** user scrolls up more than 50px while the banner is showing
- **THEN** banner fades/slides out of view

#### Scenario: User scrolls down again after hiding
- **WHEN** user reverses direction and scrolls down again past the hero threshold
- **THEN** banner reappears with the slide-in animation

### Requirement: Banner contains compact lead form on desktop
The system SHALL display an inline lead capture form within the banner on screens `lg` and above.

#### Scenario: Desktop user sees banner
- **WHEN** banner is visible on a screen >= 1024px wide
- **THEN** banner displays name, zip code, phone, and email fields in a single row with a submit button

#### Scenario: User submits the banner form
- **WHEN** user fills all required fields and submits
- **THEN** lead is submitted via the existing `/api/leads` endpoint with `source: "sticky-banner"`

### Requirement: Banner shows CTA button on mobile
The system SHALL display a simplified CTA button on screens below `lg` breakpoint instead of inline form fields.

#### Scenario: Mobile user sees banner
- **WHEN** banner is visible on a screen < 1024px wide
- **THEN** banner displays a "Get Free Estimate" button only (no form fields)

#### Scenario: Mobile user taps CTA button
- **WHEN** user taps the CTA button in the mobile banner
- **THEN** the existing lead capture modal dialog opens

### Requirement: Banner animation respects reduced motion preference
The system SHALL disable animations for users who prefer reduced motion.

#### Scenario: User has prefers-reduced-motion enabled
- **WHEN** banner visibility changes and user has `prefers-reduced-motion: reduce` set
- **THEN** banner appears/disappears instantly without slide or fade animation

### Requirement: Banner is accessible
The system SHALL be keyboard-navigable and screen-reader friendly.

#### Scenario: Keyboard navigation
- **WHEN** user tabs through the page
- **THEN** banner form fields are reachable via keyboard and focus is visible

#### Scenario: Screen reader
- **WHEN** banner becomes visible
- **THEN** banner region is announced appropriately (uses landmark role or aria attributes)

