# NIRGRANTHA

## Current State
All 4 portal dashboards (Student, Faculty, Institute, Parent) have white header backgrounds (`--student-header: oklch(1 0 0)`, etc). The top-tab horizontal navigation is correctly in place. NIRGRANTHA branding is present. CSV import exists.

## Requested Changes (Diff)

### Add
- Nothing new to add

### Modify
- Make all 4 portal headers use vibrant, fully saturated colored backgrounds (NOT white):
  - Student: rich emerald green (oklch ~0.35 0.18 160)
  - Faculty/Teacher: deep vibrant indigo (oklch ~0.35 0.22 260)
  - Institute: vibrant royal navy blue (oklch ~0.33 0.20 258)
  - Parent: vibrant sky blue (oklch ~0.40 0.18 238)
- Update text/icon colors in headers to white/light variants so they remain readable on colored backgrounds
- Make the subnav tab bar (horizontal top tabs) also sit on the same colored header background
- Active tab highlight: use slightly lighter/semi-transparent variant of the portal color
- Role cards on the landing page must always show their colored backgrounds (not just on hover)
- Fix AuthContext storage key from "edumanage_role" to "nirgrantha_role"
- Fix Navbar logo: show NIRGRANTHA text, not the old SmartCampus logo image

### Remove
- Nothing to remove

## Implementation Plan
1. Update `index.css` CSS variables: change all `--*-header` tokens to vibrant colors, update `--*-heading` and `--*-muted` tokens to light/white variants for readability on colored backgrounds
2. Update `RoleSelectionLanding.tsx`: ensure role cards always show colored backgrounds (remove opacity-0 from the background div, make it always visible)
3. Update `Navbar.tsx`: show NIRGRANTHA brand text/logo properly
4. Update `AuthContext.tsx`: change storage key from "edumanage_role" to "nirgrantha_role"
5. Validate and build
