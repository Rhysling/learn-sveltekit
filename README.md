# SvelteKit + SQLite + JWT Starter

This project is a minimal SvelteKit full-stack starter with:

- SvelteKit + Svelte 5 with TypeScript
- SQLite via Prisma for local development
- JWT authentication with HttpOnly cookies
- Vercel-ready deployment settings

## Setup

1. Copy `.env.example` to `.env`.
2. Set `JWT_SECRET` to a secure random string.
3. Run:

```bash
npm install
npx prisma migrate dev --name init
npm run dev
```

## How it works

- `src/lib/server/db.ts` initializes Prisma.
- `src/lib/types/auth.ts` contains shared TypeScript interfaces for auth payloads and route data.
- `src/lib/server/auth.ts` hashes passwords and issues JWTs.
- `src/routes/api/register/+server.ts` and `src/routes/api/login/+server.ts` handle authentication.
- The token is stored in an HttpOnly cookie named `token`.
- `src/routes/+page.server.ts` reads and validates the JWT on page load.

## Fly.io deployment notes

This starter is now configured for Fly.io with a persistent volume for SQLite and image storage.

- `@sveltejs/adapter-node` is used so the app runs as a long-lived Node server.
- Local SQLite writes are persisted on Fly using a mounted volume at `/data`.
- Uploaded images are stored in a persistent directory and served through the app.

To deploy on Fly.io:

1. Install `flyctl`.
2. Create an app and a persistent volume:
   - `fly launch --name your-app-name --no-deploy`
   - `fly volumes create data --size 1 --region <region>`
3. Set required secrets:
   - `fly secrets set JWT_SECRET="your-secret"`
   - `fly secrets set DATABASE_URL="file:/data/sqlite.db"`
4. Deploy:
   - `fly deploy`

The app stores image uploads at `IMAGE_STORAGE_PATH` and the SQLite file at `DATABASE_URL`.

For local development, continue using `.env` and `npm run dev`.
