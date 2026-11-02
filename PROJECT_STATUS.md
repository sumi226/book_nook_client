# Book Nook — Project Status

**Status:** Frontend and Express/MongoDB API implemented; verification pending  
**Updated:** 2026-11-02

## Delivered

- Premium responsive editorial bookstore design with shared navigation, footer, typography, and accessible skip link.
- Home page with three-slide Swiper hero, latest six titles, category browsing, borrowing guide, reader reviews, and newsletter demo.
- All requested pages: `/`, `/books`, `/books/[id]`, `/login`, `/register`, `/add-book`, `/my-books`, `/edit-book/[id]`, `/my-borrows`, and a custom 404.
- Consistent illustrated book cards and responsive catalog with search, category filters, sorting, loading feedback, and empty results.
- UI-only login/register and book-management forms; borrow and delete confirmation dialogs; return-book demo interaction.
- Typed, realistic local fixtures only. Demo actions are in-memory and do not call an API or persist data.
- Added Framer Motion, Lucide React, and Swiper dependencies.
- Added a standalone Express.js API in `server/` for the books and borrowing
  routes, with MongoDB models, validation, centralized errors, rate limiting,
  CORS/CSRF origin checks, and Better Auth session authorization.
- Book writes are owner-scoped; borrow history is user-scoped. Borrow and
  return inventory changes use MongoDB transactions, active borrow uniqueness,
  and guarded `$inc` updates. Books with active borrows cannot be deleted.
- Added API setup, route, and security notes in `server/README.md`.
- Added integration tests for all requested routes using an ephemeral MongoDB
  replica set; test execution is pending.

## Scope and limitations

- Login and registration are mock screens only; no real authentication is performed.
- Borrowing, returns, newsletter signup, and book changes are demonstrations and are not persisted.
- The frontend still uses local demo data and its forms do not call the API.
- The existing Next.js Better Auth configuration must be pointed at the same
  Atlas database and `BETTER_AUTH_SECRET` configured for `server/` before the
  frontend's session cookies can authorize API requests.
- Local mock book covers are CSS illustrations and require no third-party image service.
- Dependency installation reported 16 moderate audit findings. No automatic audit fixes were applied.

## Verification

- Frontend verification previously stalled; see the frontend setup above.
- Backend build and route tests are pending.
