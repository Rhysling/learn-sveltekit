# Prior knowledge established from existing project

The user has already built a working SvelteKit project with the following capabilities in place:

- **File-based routing**: uses `+page.svelte`, `+page.server.ts`, `+layout.svelte`, `+layout.ts` correctly
- **Load functions**: server-only (`+page.server.ts`) and universal (`+layout.ts`) load functions
- **API routes**: `+server.ts` files with typed `RequestHandler` exports (POST, GET)
- **Cookies**: SvelteKit `cookies` API used in server context for JWT storage
- **Prisma + SQLite**: database access via a singleton PrismaClient in `$lib/server/db.ts`
- **JWT auth**: full register/login/logout flow using httpOnly cookies
- **Svelte 5 syntax**: `$props()` rune in use; project is on Svelte 5

**What this means for future sessions**: don't re-teach routing basics or load functions from scratch. The user's mental model is solid. Focus on gaps: form actions, `hooks.server.ts` middleware, Svelte 5 runes depth, and advanced data patterns.

**Background**: Vue/Nuxt experience. SvelteKit analogies to Nuxt patterns (asyncData, server middleware, `useRoute`) are useful as bridges.
