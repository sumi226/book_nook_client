# BookNook Client

The standalone Next.js frontend and Better Auth application for BookNook.
The Express API is maintained separately in the `book_nook_server` project.

## Requirements

- Node.js and npm
- MongoDB access for Better Auth
- The BookNook API running locally or a deployed API URL

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Set `MONGODB_URI` and replace `BETTER_AUTH_SECRET` with a private random
   secret of at least 32 characters. Keep `.env.local` private.
3. Set `NEXT_PUBLIC_API_URL` to the API origin (default: `http://localhost:4000`).
   Set the API's `FRONTEND_ORIGIN` to `http://localhost:3000`.
4. Optionally set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to enable Google
   sign-in.
5. Install dependencies and start the frontend:

   ```bash
   npm install
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Push as a separate GitHub repository

Create a separate empty GitHub repository for this client, then update the
existing `origin` remote and push the client branch:

```bash
git remote set-url origin https://github.com/<YOUR_USERNAME>/book_nook_client.git
git add .
git commit -m "Prepare BookNook client"
git push -u origin HEAD
```

The `.env.local` file is ignored by Git. Only `.env.example` should be shared.
