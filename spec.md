# NIRGRANTHA — Complete Color Grading & Visual Theme System

## Current State
The platform has role-based portals (Student, Teacher, Institute, Parent) with:
- Login page: Left branding panel has dark gradient, right panel is plain white `bg-background`
- Dashboards: Header has colored background via CSS vars, but interior content uses white cards on single-tone colored bg
- No semantic accent colors per module type
- No gradient progress bars
- No interactive hover/active glow states on cards/buttons
- No glass/layered surface depth system

## Requested Changes (Diff)

### Add
- Login page right panel: rich layered gradient background (role-specific) instead of plain white, with glassmorphism card floating in center
- Complete semantic module accent system:
  - Academic/Learning: emerald-teal (#008080 family)
  - Exams/Assessments: amber-orange
  - Goals/Productivity: violet-purple
  - Collaboration/Teams: sky-blue
  - Marketplace/Resources: rose-coral
  - Alerts/Feedback/Risk: red-rose
- Gradient progress bars across all dashboards (low=red, medium=amber, high=green gradient)
- Card hover states: lift shadow + subtle glow border
- Active/selected menu tabs: strong contrast indicator with gradient underline
- Background layer hierarchy: page bg → section bg → card → elevated card with shadow
- CSS tokens for all semantic module colors
- Focus rings for accessibility on interactive elements

### Modify
- `index.css`: Add module semantic tokens + gradient utilities + interactive state utilities
- `RoleLoginPage.tsx`: Right panel becomes a richly styled gradient background with glass card for the form
- `StudentDashboard.tsx` and sub-tabs: Apply semantic accents per section (Academic=emerald, Exam=amber, Goals=violet, Teams=sky, Marketplace=rose, Feedback=red)
- `FacultyIntelligenceHub.tsx` and sub-tabs: Apply indigo-based layering with module-specific accents
- `InstituteCommandCenter.tsx` and sub-tabs: Apply navy-based layering with distinct section accents
- `ParentInsightPortal.tsx` and sub-tabs: Apply sky-blue layering with module accents
- All progress bar components: Use gradient fills
- All stat/metric cards: Add hover glow, glass effect on elevated cards

### Remove
- Plain white right panel backgrounds on login pages
- Flat single-color card backgrounds without depth

## Implementation Plan
1. Enhance `index.css` with full semantic token system:
   - Module accent tokens (academic, exam, goals, teams, marketplace, alerts)
   - Glass surface utilities
   - Status color tokens (low/medium/high performance)
   - Interactive state tokens
2. Update `RoleLoginPage.tsx` right panel with role-specific gradient + glass form card
3. Update all sub-tab components to use semantic accent colors for:
   - Section headers with colored left borders or gradient top bars
   - Progress bars with gradient fills matching status
   - Stat cards with module-specific accent glow on hover
   - Active tab indicators with gradient underlines
4. Apply background layer hierarchy throughout: page→section→card depth
