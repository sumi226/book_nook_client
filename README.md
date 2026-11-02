# BookNook Client

The standalone Next.js frontend and Better Auth application for BookNook.
The Express API is maintained separately in the `book_nook_server` project.

## Requirements

- Node.js and npm
- MongoDB access for Better Auth
- The BookNook API running locally or a deployed API URL

## Local setup

1. Create `.env.local` and set `MONGODB_URI`, `MONGODB_DB`,
   `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_AUTH_URL`,
   `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_API_URL`, and
   `NEXT_PUBLIC_IMGBB_API_KEY`.
2. Replace `BETTER_AUTH_SECRET` with a private random
   secret of at least 32 characters. Keep `.env.local` private.
3. Set `NEXT_PUBLIC_API_URL` to the API origin (default: `http://localhost:4000`).
   For a Vercel serverless API, include its `/api` path (for example,
   `https://booknook-api.vercel.app/api`). Set the API's `FRONTEND_ORIGIN` to
   `http://localhost:3000`.
4. Optionally set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to enable Google
   sign-in.
5. Create an ImgBB API key and set it as `NEXT_PUBLIC_IMGBB_API_KEY`. Image
   uploads happen from the browser, so this key is visible to users; use an
   ImgBB key dedicated to this app and monitor its usage.
6. Install dependencies and start the frontend:

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

## Deploy to Vercel

Import this folder as its own Vercel project and set the Root Directory to the
client project. Do not upload `.env`; add its values in Vercel's Environment
Variables settings instead. Configure `MONGODB_URI`, `BETTER_AUTH_SECRET`
(at least 32 characters), `BETTER_AUTH_URL`, `NEXT_PUBLIC_AUTH_URL`,
`NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_API_URL`, and
`NEXT_PUBLIC_IMGBB_API_KEY`. The three URL values for the
client must use its deployed origin, and `NEXT_PUBLIC_API_URL` must use the
deployed API origin, including `/api` for a Vercel serverless API. Add
`MONGODB_DB` if using a database name other than
`booknook`; add both Google OAuth variables only when enabling Google sign-in.

Set the server's `FRONTEND_ORIGIN` to this same client origin and register the
deployed auth callback URL with Google when OAuth is enabled. `NEXT_PUBLIC_*`
values are embedded during the build, so redeploy after changing them.

## Push as a separate GitHub repository

Create a separate empty GitHub repository for this client, then update the
existing `origin` remote and push the client branch:

```bash
git remote set-url origin https://github.com/<YOUR_USERNAME>/book_nook_client.git
git add .
git commit -m "Prepare BookNook client"
git push -u origin HEAD
```

The `.env.local` file is ignored by Git. Never commit real environment values.
