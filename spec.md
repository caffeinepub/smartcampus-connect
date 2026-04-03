# NIRGRANTHA

## Current State
- Student portal with 6 submenus: Academic Roadmaps, Skill-Based Teams, Marketplace, Competitive Exam Hub, Goals & Notifications, Anti-Trap Feedback
- AcademicRoadmaps.tsx has attendance references, Exam Tracker shows simple flat list of exams (Unit Test I, Unit Test II, Lab Assessment, ESE, NPTEL Quiz) with no subject breakdown per exam type
- CompetitiveExamHub.tsx handles competitive external exams (GATE, CAT, GRE) — this is NOT the exam tracker to modify
- The Exam Tracker section is inside AcademicRoadmaps.tsx
- No attendance data wall or verified report feature exists yet

## Requested Changes (Diff)

### Add
- **Exam Tracker redesign** inside AcademicRoadmaps: replace flat exam list with 8 expandable exam categories:
  1. ISE 1 (Internal Semester Exam 1)
  2. ISE 2 (Internal Semester Exam 2)
  3. ISE 3 (Internal Semester Exam 3)
  4. ESE (End Semester Exam)
  5. Practical Exam
  6. NPTEL (no subjects inside — just a placeholder card)
  7. Project
  8. Assignment Submissions
- For ISE 1, ISE 2, ISE 3, ESE: show only THEORY subjects for the selected semester
- For Practical Exam: show only LAB subjects for the selected semester
- For NPTEL: no subjects, just informational card
- For Project and Assignment Submissions: show all subjects (both theory and lab)
- Subject lists must be DYNAMIC based on currently selected semester (sem 5 or sem 6)
- Sem 5 theory subjects: Database Engineering, Design and Analysis of Algorithm, Operating Systems, Programme Elective I, Indian Knowledge System-II: Vedic Mathematics, Multidisciplinary Minor III, Open Elective III (MOOC)
- Sem 5 lab subjects: Database Engineering Lab, DAA Lab, OS Lab, Programme Elective I Lab, Advanced Java Programming
- Sem 6 theory subjects: Artificial Intelligence, System Software, Software Engineering, Programme Elective II, Programme Elective III, Multidisciplinary Minor IV
- Sem 6 lab subjects: AI Lab, System Software Lab, Programme Elective II Lab, Full Stack Development, Multidisciplinary Minor IV Lab
- Each exam category card is clickable and expands to show subjects with status badges (Scheduled / Completed / Upcoming)
- **Institute Data Wall**: add a privacy banner in AcademicRoadmaps explaining that detailed attendance data is controlled by the institute admin for privacy/compliance
- Remove any raw attendance display from the student section

### Modify
- AcademicRoadmaps.tsx: replace the old flat `exams` array and Exam Tracker rendering with the new expandable categorized exam tracker
- Remove any attendance-related state, UI, or data from the student-facing view

### Remove
- Old flat exam list (Unit Test I/II, Lab Assessment, End Semester Exam static entries)
- Any raw attendance display in student section

## Implementation Plan
1. Define sem-aware subject data: theorySubjects[5], theorySubjects[6], labSubjects[5], labSubjects[6]
2. Define 8 exam categories with type: 'theory' | 'lab' | 'all' | 'none'
3. Replace old `exams` array and Exam Tracker JSX with new expandable accordion-style exam tracker
4. Each expanded exam type shows subject rows with status chips and date placeholders
5. NPTEL card shows no subjects — just a "Link your NPTEL profile" prompt
6. Add institute data wall banner (indigo/navy) explaining attendance privacy policy
7. Remove all attendance-related code from AcademicRoadmaps.tsx
