# NIRGRANTHA

## Current State
- Academic Roadmaps shows all 8 semester syllabus buttons freely navigable; student defaults to Sem 3 but can access any semester
- Organize Hackathon wizard has 4 steps: Event Details → Assign Judges → Fees & Prizes → Review & Publish; no HOD permission flow exists
- Find Hackathons tab is read-only static list with no ability to add new hackathons

## Requested Changes (Diff)

### Add
- HOD permission request flow in Organize Hackathon: before the 4-step wizard opens, student must first submit a HOD permission request (event name, description, expected participants); show a pending/approved/rejected status; only approved students can proceed to the wizard
- "Request HOD Permission" form with fields: Hackathon Title, Brief Description, Expected Participants, Proposed Date
- HOD approval simulation: after submitting, show a "Pending Approval" state; include a demo "Simulate HOD Approval" button so the flow can be tested
- "+ Add New Hackathon" button in Find Hackathons tab that opens a form to add a new hackathon to the list
- Add New Hackathon form fields: Title, Domain, Date, Mode (Online/Offline/Hybrid), Prize Pool, Registration Fee, Description, Registration Link

### Modify
- Academic Roadmaps syllabus: restrict visible semesters to only the student's current academic year (2 semesters). Student in Sem 3 or 4 sees only Sem 3 & 4. Student in Sem 5 or 6 sees only Sem 5 & 6. etc. Show a clear label explaining "Showing Year 2 Syllabus (Sem 3 & 4) — Syllabus is updated annually"
- The semester timeline buttons should only show the 2 semesters for the current year, not all 8

### Remove
- Free navigation to all 8 semesters from Academic Roadmaps (replaced by year-scoped view)

## Implementation Plan
1. Edit AcademicRoadmaps.tsx: Add logic to compute `currentYear` from `selectedSem` (default 3 → year 2), derive `allowedSems = [year*2-1, year*2]`, filter semester timeline to only show those 2 buttons, add info banner explaining annual update policy
2. Edit SkillBasedTeams.tsx: Add `hodPermission` state with values `idle | pending | approved | rejected`; render HOD permission request form when `hodPermission === 'idle'`; render pending screen when `pending`; only render OrganizeWizard when `approved`
3. Edit SkillBasedTeams.tsx: Add `addHackathonOpen` state and form in Find Hackathons tab; on submit append to a `customHackathons` state array merged with `HACKATHONS` for display
