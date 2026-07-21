# Resuma brand

## Name
Resuma

## Concept
Document + checkmark mark = "your resume, done." Teal reads fresh/growth without the generic indigo-SaaS look; orange accent warms it up for a friends-and-community product rather than a corporate tool.

## Color tokens

| Token | Hex | Use |
|---|---|---|
| primary-600 (base) | #0D9488 | Header/nav accents, primary buttons, links, logo mark |
| primary-500 (light mode hover/lighter accents) | #14B8A6 | Hover states, dark-mode logo mark |
| primary-700 (pressed/dark text on light) | #0F766E | Pressed button state |
| accent | #FB923C | Secondary CTA, badges, checkmark highlight |
| neutral-900 (text) | #0F172A | Body text, wordmark on light backgrounds |
| neutral-50 (bg) | #F8FAFC | Light backgrounds |

Map these onto whatever the app's existing primary/accent CSS variables or Tailwind theme keys are (found by the codebase scan) rather than introducing new token names — swap values, keep structure.

## Assets
- `icon.svg` — square mark, use for favicon / app icons / PWA icons (re-export to the required PNG sizes)
- `logo-horizontal.svg` — full lockup for light backgrounds (header, docs)
- `logo-horizontal-dark.svg` — full lockup for dark backgrounds (dark mode header, footer)
