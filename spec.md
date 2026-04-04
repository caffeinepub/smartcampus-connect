# NIRGRANTHA

## Current State
- Academic Roadmaps section shows subject cards directly in a grid (no hide/reveal toggle)
- Exam Tracker already has expandable exam cards with dates, a "Subjects" box inside that reveals subject list with notes links, and ICA remark for Project/Assignment
- Notes links are already defined in `subjectNotesLinks` for all Sem 5 & 6 subjects
- Exam dates are already defined in `examDates` for both semesters

## Requested Changes (Diff)

### Add
- A "Subjects" square/pill button in the Academic section's Syllabus area — clicking it toggles visibility of the subject cards grid
- Notes link button on each subject card in the Academic section (linking to `subjectNotesLinks`)

### Modify
- Academic Roadmaps: Wrap the existing subjects grid with a collapsible toggle — subjects are hidden by default, shown after clicking the "Subjects" box
- Subjects grid header becomes a clickable square box styled consistently with the rest of the module

### Remove
- Nothing removed

## Implementation Plan
1. Add `showSubjectsGrid` state to `AcademicRoadmaps` component
2. Replace the static "Semester X Subjects" heading with a clickable square box button that toggles `showSubjectsGrid`
3. Conditionally render the subjects grid based on `showSubjectsGrid`
4. Add a "📝 Notes" link button on each subject card using `subjectNotesLinks`
5. Notes link should be derived from `subjectNotesLinks[subjectTitle]` (the name without the subject code)
