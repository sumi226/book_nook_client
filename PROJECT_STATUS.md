# Book Nook — Project Status

**Status:** Better Auth integration implemented; local configuration and end-to-end verification pending  
**Updated:** 2026-11-02

## Delivered

- Premium responsive editorial bookstore design with shared navigation, footer, typography, and accessible skip link.
- Home page with three-slide Swiper hero, latest six titles, category browsing, borrowing guide, reader reviews, and newsletter demo.
- All requested pages: `/`, `/books`, `/books/[id]`, `/login`, `/register`, `/add-book`, `/my-books`, `/edit-book/[id]`, `/my-borrows`, and a custom 404.
- Consistent illustrated book cards and responsive catalog with search, category filters, sorting, loading feedback, and empty results.
- Better Auth email/password registration and login backed by the official MongoDB adapter; Google OAuth support when provider credentials are configured.
- Registration validates a photo URL and requires a six-character password containing uppercase and lowercase letters; successful registration directs readers to sign in.
- Persistent session-aware navigation with login/register links when signed out and a user-photo dropdown with profile and logout when signed in.
- Server-protected `/add-book`, `/my-books`, `/my-borrows`, `/books/[id]`, `/edit-book/[id]`, and `/my-profile` pages; unauthenticated visitors are sent to login with a safe callback path.
- JWT plugin tokens are requested for Express API calls and verified with the configured Better Auth JWKS, issuer, audience, and EdDSA algorithm. API identity and ownership are derived only from verified token claims.
- UI-only forgot-password message; password reset is intentionally not implemented.
- Book-management forms, borrow and delete confirmation dialogs, and return-book demo interaction.
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

- Borrowing, returns, newsletter signup, and book changes are demonstrations and are not persisted.
- Book/catalog/borrow/return/newsletter features still use local demo data and do not call the API; Better Auth identity and sessions are persisted independently.
- Configure the client and API with the same MongoDB database and matching
  Better Auth URL, JWKS endpoint, issuer, audience, and frontend origin before
  exercising the live authentication/API flow. Configure Google OAuth
  credentials to enable Google sign-in.
- Local mock book covers are CSS illustrations and require no third-party image service.
- Dependency installation reported 16 moderate audit findings. No automatic audit fixes were applied.

## Verification

- Express TypeScript build passes.
- The initial Next.js production build passed before the latest navigation/session changes; a final build and lint run are pending.
- API integration tests could not start their MongoDB replica set in this environment (`mongodb-memory-server` timed out), so route integration assertions remain unverified here.
- End-to-end registration, login, Google OAuth, page reload, and logout verification requires a configured local MongoDB instance and Google OAuth credentials.
