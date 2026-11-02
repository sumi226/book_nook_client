# BookNook Frontend Project Plan

**Status**: Approved for implementation by the user on 2026-11-02  
**Created**: 2026-11-02  
**Mode**: Frontend-only

## 1. Project Summary

Plan a complete, responsive BookNook bookstore and borrowing-library frontend with a premium editorial feel. Build on the existing Next.js App Router, React, TypeScript, and Tailwind CSS 4 repository. This plan covers frontend work only; use mock data until backend integration is separately planned and approved.

The existing landing-page work is the visual starting point, not evidence that the full route set or requested interactions are complete. No application code is authorized by this planning document before explicit plan approval.

## 2. Requirements & Scope

- **In scope**: Responsive discovery/home, complete book catalog, book details, mock login/register screens, add/manage books, personal bookshelf, borrowed-books, and return experiences, plus a custom not-found page.
- **Interactions**: Mock-backed search, category/filter and sorting controls, detail navigation, form validation/feedback, borrow and return demonstrations, and clear empty/loading/error states as appropriate to the frontend prototype.
- **Data boundary**: Use typed local mock fixtures/adapters only. Login/register are visual frontend demonstrations and do not authenticate users; borrow, return, and book-management changes are demonstrative and must not imply server persistence. No API calls or external data integration.
- **Explicitly out of scope**: Backend/API, real authentication, database or durable persistence, deployment, real borrowing transactions, checkout/payments, and provider integrations.
- **Stack**: Retain Next.js App Router, React, TypeScript, and Tailwind CSS 4; add Framer Motion for restrained interface motion and Lucide icons for consistent iconography. Check installed-version compatibility before any future dependency changes.
- **Responsive/accessibility expectations**: Mobile-first layouts, semantic controls and headings, keyboard operation and visible focus, meaningful labels, adequate contrast, reduced-motion support, and graceful image fallbacks.

## 3. Services & Data

- **Service**: One `frontend` service using the existing Next.js App Router application.
- **Routes**:
  - `/` — editorial discovery landing page and featured collections.
  - `/books` — browsable catalog with search, category filters, and sorting.
  - `/books/[id]` — book detail and mock availability/borrow action.
  - `/login` and `/register` — polished UI-only account screens with no real authentication.
  - `/add-book` and `/edit-book/[id]` — mock-only book form prototypes.
  - `/my-books` — the current reader's mock bookshelf and book-management actions.
  - `/my-borrows` — borrowed shelf, due-date presentation, and return actions.
  - Custom 404 page for unknown routes and book IDs.
- **Homepage**: Premium responsive navigation, hero banner with at least three Swiper slides, latest six books, category browsing, borrowing guide, reader reviews, newsletter signup prototype, and professional footer.
- **Mock model**: Typed book and borrowing fixtures, with a small UI-facing data adapter to keep future API replacement separate from page components. Any prototype mutations remain in-memory and resettable.
- **Data stores**: No datastore required for this plan. No Azure resource or backend is proposed.
- **Authentication**: No sign-in or application API features in scope. Existing auth-related repository files are not included in this frontend work.

## 4. Architecture & User Experience

- Use the existing App Router and shared root layout for global typography, metadata, navigation, and footer.
- Build reusable, responsive primitives for book cards, cover imagery, collection sections, search/filter controls, status badges, and form feedback.
- Keep route-level UI and mock fixtures separated; use typed view models and a mock data adapter so the later backend can be integrated without presenting mock behavior as live.
- Provide clear navigation among discovery, catalog, authentication screens, book details, book management, and the borrowed shelf. Display unavailable/borrowed states and confirmation feedback without creating real records.
- Keep motion subtle and purposeful (such as page/section transitions and interaction feedback); respect reduced-motion preferences. Ensure essential content and functionality do not depend on animation.
- Do not assume remote image sources or real catalog metadata. Use approved local/placeholder mock imagery with fallbacks unless image sourcing is separately approved.

## 5. Delivery & Acceptance

1. Establish the shared shell and visual tokens using the current project stack.
2. Deliver the responsive discovery and catalog views with mock content and usable search/filter/sort controls.
3. Deliver book detail and add/manage prototypes with accessible form feedback and explicit mock-only behavior.
4. Deliver borrowed-books and return prototypes, including representative available, borrowed, empty, and error/feedback states.
5. Review all planned routes at mobile and desktop widths; check keyboard navigation, focus, semantic markup, reduced motion, and image fallback behavior.
6. Run the repository's available lint/build checks after implementation is separately authorized; report any environment limitations honestly.

**Frontend acceptance gate**: All planned routes render responsively, primary mock interactions behave consistently, visual states are complete, and accessibility/reduced-motion checks pass. This gate does not approve backend/auth work.

**Approval boundary**: The user approved building the project on 2026-11-02. This plan authorizes only the mock-data frontend described above; it does not authorize backend, real authentication, or deployment work.

## 6. Design System & UI

- **Visual direction**: Premium editorial bookstore—warm paper-like neutrals, restrained ink/earth accents, expressive serif display typography paired with a highly legible sans-serif, generous whitespace, confident cover-art presentation, and carefully composed editorial grids. Preserve the existing BookNook landing-page direction where it fits.
- **Component Library**: Follow the existing project stack and reuse its components; add only the UI primitives needed for the requested pages and interactions.
- **Styling**: Continue Tailwind CSS 4 and define consistent color, type, spacing, border, and responsive-layout tokens rather than one-off page styles.
- **Icons**: Lucide icons; pair icons with accessible names or visible labels as appropriate.
- **Motion**: Framer Motion for restrained transitions and micro-interactions only, with reduced-motion behavior.
- **Responsive behavior**: Reflow editorial grids and navigation intentionally across phone, tablet, and desktop sizes; maintain readable line lengths and usable touch targets.
