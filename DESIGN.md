# DESIGN.md — Outlive Homes Website

Version 1.0. Design system source of truth for the Outlive Homes marketing website. Inherits brand identity from `~/.claude/rules/brand.md` and extends it with component patterns, spacing, motion, and implementation details specific to this project.

## Color Palette

Tokens configured in `tailwind.config.cjs` under `theme.extend.colors`. Never hardcode hex values.

| Token | Hex | Tailwind Class | Role |
|---|---|---|---|
| `anchor` | `#051C2C` | `bg-anchor`, `text-anchor` | Heroes, headings, nav, footer, primary buttons |
| `navy` | `#24477F` | `bg-navy`, `text-navy` | Section backgrounds, icon gradients, secondary buttons, hover states |
| `blue` | `#1A6FAD` | `bg-blue`, `text-blue` | Links, focus rings, interactive states |
| `warm` | `#C4724A` | `bg-warm`, `text-warm` | CTAs, eyebrow labels, star ratings. **Max 10-15% of color area.** |
| `bg-gray` | `#F2F4F7` | `bg-bg-gray` | Alternating section backgrounds |
| `warm-gray` | `#B0A99F` | `text-warm-gray` | Borders, dividers, disabled states. **Never body text.** |
| `text-body` | `#1F2937` | `text-text-body` | All body copy |
| `white` | `#FFFFFF` | `bg-white`, `text-white` | Cards, reversed text on dark backgrounds |

### Opacity Patterns

| Pattern | Usage |
|---|---|
| `text-white/75` | Secondary text on dark backgrounds |
| `text-white/60` | Tertiary text on dark backgrounds |
| `text-text-body/70` | Secondary body text on light backgrounds |
| `border-white/5` | Subtle dividers on dark backgrounds |
| `border-gray-100` | Card borders on light backgrounds |

### Color by Page Context

| Context | Background | Headings | CTAs | Avoid |
|---|---|---|---|---|
| Homepage hero | Neutral dark gradient (black) | White | Blue (primary) | Colored tints over photos |
| Service landing pages | Neutral dark gradient (hero), alternating white/bg-gray | Anchor | Blue | Colored tints over photos |
| Partner page | Anchor (hero), white/bg-gray | Anchor | Blue | Heavy terracotta |
| Blog | White/bg-gray | Anchor | Blue links | Dark backgrounds |
| Forms on dark bg | Anchor | White | Blue submit button | Generic red |
| Trust/safety sections | Anchor | White | Navy accents | Warm accent colors |

## Typography

| Role | Font | Classes | Usage |
|---|---|---|---|
| H1 (hero) | Playfair Display | `text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05]` | One per page, hero headline |
| H2 (section) | Playfair Display | `text-4xl sm:text-5xl font-bold tracking-tight` | Section headings |
| H3 (card/subsection) | Playfair Display | `text-xl font-bold` or `text-2xl sm:text-3xl font-bold` | Card titles, step headings |
| Eyebrow (dark bg) | DM Sans | `text-sm font-bold tracking-[0.2em] uppercase text-white` + `textShadow: '0 1px 3px rgba(0,0,0,0.4)'` | Section labels on hero/dark backgrounds |
| Eyebrow (light bg) | DM Sans | `text-sm font-semibold tracking-[0.15em] uppercase text-warm` | Section labels on white/gray backgrounds |
| Body large | DM Sans | `text-lg sm:text-xl leading-relaxed` | Hero descriptions, section intros |
| Body | DM Sans | `text-base leading-relaxed` | Default paragraph text |
| Caption | DM Sans | `text-sm` | Supporting text, disclaimers |
| Step label | DM Sans | `text-xs font-bold tracking-[0.15em] uppercase text-warm` | Process step numbers |

### Typography Rules

- Headings always use Playfair Display (`font-serif` / `var(--font-playfair)`)
- Body always uses DM Sans (default `font-sans` / `var(--font-dm-sans)`)
- Never use pure black `#000000` — use `text-body` (`#1F2937`)
- Font weights: `font-bold` (700) for headings, `font-semibold` (600) for eyebrows/labels, `font-medium` (500) for buttons
- Line heights: `leading-[1.05]` for H1, `leading-tight` for H2/H3, `leading-relaxed` for body

## Buttons

### Primary CTA (Blue)

```
bg-blue hover:bg-blue/90 text-white px-8 py-6 text-base font-semibold rounded-full
shadow-lg shadow-blue/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300
```

Use for: main conversion actions (Get Free Assessment, Request Quote, Schedule Consultation).

### Secondary CTA (Anchor)

```
bg-anchor hover:bg-navy text-white px-8 py-6 text-base rounded-full
shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300
```

Use for: secondary actions next to a primary CTA (Learn More, Call Us).

### Ghost Button (Outlined)

```
border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-base rounded-full
transition-all duration-300
```

Use for: secondary actions on dark backgrounds.

### Link Button

```
text-sm font-semibold text-white/80 hover:text-white flex items-center gap-2 transition-colors
```

Use for: subtle navigation actions (View All, See More).

### Button Rules

- All buttons use `rounded-full` (pill shape)
- Standard size: `px-8 py-6` (large enough for aging users — 48px+ touch target)
- Always include `transition-all duration-300` for smooth hover
- Primary CTA gets `shadow-lg shadow-warm/20` glow
- Hover lift: `hover:-translate-y-0.5` on prominent buttons
- Never use generic `bg-blue-600` — always use brand tokens

## Form Fields

### Input Base

```
w-full px-4 py-3 rounded-xl border border-warm-gray/30 bg-white
text-text-body placeholder:text-warm-gray
focus:outline-none focus:ring-2 focus:ring-blue focus:border-blue
transition-colors duration-200
```

### Input on Dark Background

```
w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10
text-white placeholder:text-white/50
focus:outline-none focus:ring-2 focus:ring-warm focus:border-warm
transition-colors duration-200
```

### Select/Dropdown

Same as input base, plus `appearance-none` with custom chevron icon.

### Error State

```
border-warm text-warm         (border + message color — NOT red)
```

Error messages: `text-sm text-warm mt-1`

### Success State

```
bg-anchor/10 border-anchor text-anchor   (NOT green)
```

### Labels

```
text-sm font-medium text-text-body mb-1.5
```

On dark backgrounds: `text-sm font-medium text-white/80 mb-1.5`

### Form Rules

- Use brand colors for all states — no generic red/green/blue
- Error = `warm` (terracotta), Success = `anchor` (dark blue), Focus = `blue` (calm blue)
- Minimum input height: 48px (touch target for aging users)
- Always use `rounded-xl` for inputs (matches card aesthetic)
- Labels above inputs, not floating/inline

## Cards

### Service/Product Card

```
bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl
transition-shadow duration-500 border border-gray-100
```

- Image: `h-56 object-cover` with `transition-transform duration-700 group-hover:scale-110`
- Content padding: `p-7` or `p-8`
- Hover lift: `whileHover={{ y: -6, transition: { duration: 0.3 } }}`

### Info/Feature Card

```
bg-white rounded-2xl p-8 shadow-sm border border-gray-100
hover:shadow-2xl transition-all duration-500
```

### Card on Dark Background

```
bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10
```

### Card Rules

- Always `rounded-2xl` (1rem border radius)
- Default shadow: `shadow-sm`, hover: `shadow-xl` or `shadow-2xl`
- Content padding: `p-7` or `p-8`
- Image cards use `overflow-hidden` with zoom-on-hover

## Spacing

### Section Spacing

| Element | Classes |
|---|---|
| Section vertical padding | `py-24 sm:py-32` |
| Section horizontal padding | `px-6 lg:px-8` |
| Container max-width | `max-w-7xl mx-auto` |
| Heading to description gap | `mb-4` or `mb-6` |
| Section header to content gap | `mt-16` or `mt-20` |

### Component Spacing

| Element | Classes |
|---|---|
| Grid gap (cards) | `gap-8` |
| Grid gap (compact) | `gap-5` |
| Card internal padding | `p-7` or `p-8` |
| Icon to text gap | `gap-3` or `gap-4` |
| Button group gap | `gap-4` |
| Form field gap | `space-y-4` |
| List item gap | `space-y-3` |

## Grid Layouts

### 3-Column (Services, Features)

```
grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3
```

### 3-Column Compact (Showcase)

```
grid grid-cols-1 md:grid-cols-3 gap-5
```

### 2-Column (Content + Image)

```
grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center
```

### Responsive Rules

- Mobile-first: single column by default
- `md:` breakpoint (768px): 2-column grids
- `lg:` breakpoint (1024px): 3-column grids, side-by-side layouts
- Phone numbers: always `tel:` links on mobile (tap-to-call)
- Minimum touch target: 48px (WCAG 2.5.5)

## Motion & Animation

### Framer Motion Variants

**Fade Up (default entrance):**
```js
hidden: { opacity: 0, y: 50 }
visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
```

**Stagger Container:**
```js
visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
```

**Stagger Item:**
```js
hidden: { opacity: 0, y: 40 }
visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
```

### Hover Animations

| Element | Animation |
|---|---|
| Cards | `whileHover={{ y: -6, transition: { duration: 0.3 } }}` |
| Images in cards | `transition-transform duration-700 group-hover:scale-110` |
| Buttons | `hover:-translate-y-0.5 transition-all duration-300` |

### Scroll Reveal

- Use `viewport={{ once: true, margin: "-60px" }}` for standard sections
- Use `margin: "-80px"` for counters/stats (trigger earlier)
- All animations fire once only (`once: true`)

### Motion Rules

- Easing: `[0.22, 1, 0.36, 1]` (custom ease-out) for all entrance animations
- Duration: 0.7-0.8s for entrances, 0.3s for hovers, 0.5-0.7s for transitions
- Stagger delay: 0.15s between children
- CSS transitions: `duration-300` (hover), `duration-500` (card shadows), `duration-700` (image zoom)
- Never use jarring or fast animations — our audience includes aging users

## Section Patterns

### Hero (Full-bleed, dark)

```
<section className="relative min-h-[90vh] flex items-center overflow-hidden">
  {/* Background image with gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
  <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full">
    {/* Eyebrow → H1 → Description → CTA buttons */}
  </div>
</section>
```

### Content Section (alternating)

Alternate between `bg-white` and `bg-bg-gray` backgrounds:
```
<section className="bg-white py-24 sm:py-32">   {/* or bg-bg-gray */}
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    {/* Centered eyebrow + H2 + description → grid content */}
  </div>
</section>
```

### Dark CTA Section

```
<section className="bg-anchor py-24 sm:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    {/* White text + warm CTA or inline form */}
  </div>
</section>
```

### Trust Bar

```
<div className="bg-anchor py-4">
  <div className="mx-auto max-w-7xl px-6 flex items-center justify-center gap-8 text-white/80 text-sm">
    {/* Credential items separated by dividers */}
  </div>
</div>
```

## Icons

- Library: `lucide-react`
- Size: `w-6 h-6` (standard), `w-5 h-5` (compact), `w-8 h-8` (featured)
- Color: `text-white` on dark/gradient backgrounds, `text-warm` for accents
- Icon containers: `w-14 h-14 rounded-2xl flex items-center justify-center` with navy→anchor gradient background

## Shadows

| Token | Usage |
|---|---|
| `shadow-sm` | Default card state |
| `shadow-lg` | Buttons, elevated elements |
| `shadow-xl` | Card hover state |
| `shadow-2xl` | Featured card hover |
| `shadow-lg shadow-blue/20` | Primary CTA glow |

## Accessibility

- **WCAG AA minimum, AAA where feasible** — aging audience with reduced visual acuity
- Minimum touch target: 48px (buttons, links, form fields)
- Never use color alone to convey information
- All images require meaningful `alt` text
- Form fields must have visible labels (no placeholder-only labels)
- Focus states must be visible: `focus:ring-2 focus:ring-blue`
- See `~/.claude/rules/brand.md` for contrast ratio table

## Anti-Patterns — NEVER Do This

- Never use generic Tailwind colors (`bg-blue-600`, `text-gray-700`, `text-red-600`) — always use brand tokens
- Never hardcode hex values in JSX — use Tailwind classes with brand tokens
- Never use `bg-green-*` for success or `bg-red-*` for errors — use `anchor` and `warm`
- Never use `#000000` for text — use `text-body`
- Never place warm (terracotta) on navy backgrounds
- Never use warm-gray as body text
- Never skip hover/focus states on interactive elements
- Never use animations faster than 300ms (jarring for aging users)
- Never use auto-playing carousels or rapid transitions
