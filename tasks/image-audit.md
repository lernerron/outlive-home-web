# Homepage Image Audit

Tracking legal status of all images used on the homepage.

## Status Legend
- **CLEARED** — legally usable, documented
- **REPLACE** — no license, needs replacement
- **DONE** — replaced with licensed image
- **REMOVED** — card removed from homepage

## Cleared Images (7)

| Image | Section | Source | License |
|---|---|---|---|
| `hero-bathroom.png` | Hero background | AI-generated (Gemini/OpenAI) by Ron | Commercial use per platform ToS |
| `home-universal-design.jpg` | Why Us — Universal Design | AI-generated (Gemini/OpenAI) by Ron | Commercial use per platform ToS |
| `why-us-craftsmanship.jpg` | Why Us — Craftsmanship | AI-generated (Gemini/OpenAI) by Ron | Commercial use per platform ToS |
| `shower-glass-enclosure.jpg` | Shower Conversions card | Unsplash | Unsplash License (free commercial) |
| `walkin-shower-modern.jpg` | Walk-in Solutions card | Unsplash | Unsplash License (free commercial) |
| `bathroom-remodel-modern.jpg` | Bathroom Remodels card | Unsplash (cropped) | Unsplash License (free commercial) |
| `bathroom-safety-accessible.jpg` | Bathroom Safety card | Motionspot.co.uk (cropped, watermarked) | Used with attribution |

## Still Needs Replacement (3)

| Image | Section | Status | Notes |
|---|---|---|---|
| `homelift-stiltz.png` | Home Elevators card (Expertise) | PENDING | Manufacturer image, no dealer agreement |
| `stairlift-bruno-elan.png` | Stair Lifts card (Expertise) | PENDING | Manufacturer image, no dealer agreement |
| `why-us-customer-service.jpg` | Why Us — Unparalleled Service | PENDING | Unknown origin |

## Removed from Homepage (3)

These cards were removed from the Expertise section (images no longer displayed):
- `ramp-modular.jpg` — Ramps card
- `grab-bars-handrails.jpg` — Grab Bars & Handrails card
- `wheelchair-lift-harmar.jpg` — Wheelchair Lifts card

Note: images still exist in `public/assets/` and `assets.js` — can be cleaned up later.

## Non-Homepage Image Audit (TODO)

Images on other pages still need the same licensing review:
- `homelifts` section in assets.js — heavy Stiltz branding (logos, product images, brochure PDF)
- `bathroomSafety` section — multiple images of unknown origin
- `stairLifts` section — Bruno manufacturer image

## Naming Convention

`{subject}-{descriptor}.{ext}` — lowercase, hyphens, no photographer names or IDs.
Source info belongs in LICENSES.md, not filenames.
