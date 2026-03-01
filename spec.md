# Specification

## Summary
**Goal:** Add a role-based login flow with per-role menu isolation so that each user type (Student, Teacher, Institute, Parent) sees only their relevant dashboard and navigation after logging in.

**Planned changes:**
- Create a landing page at `/` with four role selection cards (Student, Teacher, Institute, Parents), each linking to its own login route (`/login/student`, `/login/teacher`, `/login/institute`, `/login/parent`), using existing role accent color tokens and distinct icons.
- Create per-role login pages at each route, each showing a role-themed login form (username/password fields or a single "Enter as [Role]" button) with no real backend authentication.
- Add an `AuthContext` that stores the current role (`student | teacher | institute | parent | null`), exposes `login(role)` and `logout()` functions, and persists the role in `localStorage` or `sessionStorage`.
- Protect all dashboard routes so unauthenticated users are redirected to the landing page.
- Update the Navbar to conditionally render only the tab and sub-navigation belonging to the logged-in role; all other role tabs are hidden.
- Add a logout button to the Navbar that clears the role and redirects to the landing page.
- All existing dashboard components (StudentDashboard, FacultyIntelligenceHub, InstituteCommandCenter, ParentInsightPortal) remain intact.

**User-visible outcome:** Users land on a role selection page, pick their role, log in with a simple form, and then see only the dashboard and navigation menus relevant to their role. Logging out returns them to the role selection page.
