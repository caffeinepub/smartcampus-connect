# Specification

## Summary
**Goal:** Add a full-screen welcome landing page branded as "NIRGRANTHA" that appears before the existing role selection/login flow.

**Planned changes:**
- Create a new `WelcomePage` component displaying "Welcome to NIRGRANTHA" as the hero heading with the brand name styled prominently
- Apply a visually rich design with deep gradients, elegant typography, and subtle decorative background elements using a hero background image and NIRGRANTHA wordmark logo
- Add a "Get Started" / "Enter Portal" call-to-action button that navigates to the role selection/login page
- Update `App.tsx` navigation flow so the initial view state is `welcome`, followed by role selection/login, then role-specific dashboards
- Ensure logging out returns the user to the welcome page
- Page is fully responsive for desktop and mobile

**User-visible outcome:** When users first visit the site, they see a polished NIRGRANTHA branded welcome page. Clicking the CTA takes them to the existing role selection/login page, after which the appropriate dashboard is shown as before.
