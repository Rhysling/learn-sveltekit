# Environment Variables & Config — Exercises Completed

The user completed all three exercises from lesson 10:

1. **Fixed `storage.ts`** — replaced `process.env.IMAGE_STORAGE_PATH` and `process.env.NODE_ENV` with `$env/dynamic/private` and `dev` from `$app/environment`.

2. **Fixed cookie `secure` flag** — both `login/+server.ts` and `register/+server.ts` now use `import { dev } from '$app/environment'` and `secure: !dev` instead of `process.env.NODE_ENV === 'production'`.

3. **Added `PUBLIC_APP_NAME`** — set to `"SvelteKit + SQLite Tutorials"` in both `.env` and `.env.example`, imported from `$env/static/public` in `+layout.svelte`, and used in the nav header.

**Implications**: The project now has zero `process.env` usage for app config (only the `NODE_ENV` check in `db.ts` dev singleton guard remains, which is a Vite-handled special case). The user understands the four `$env` modules, the `PUBLIC_` prefix convention, and `$app/environment`. Ready for topics that build on this: testing, pagination, or advanced auth patterns.
