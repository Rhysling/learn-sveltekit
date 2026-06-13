# Layout Load Functions & Protected Route Groups — Built and Working

The user completed lesson 4 and has a working `(protected)` route group with `src/routes/(protected)/+layout.server.ts` that checks `locals.user` and redirects unauthenticated visitors to `/`, passing user data down to all child pages. The `/dashboard` page renders `data.user.name` and `data.user.email` correctly.

**Evidence**: `(protected)/+layout.server.ts` uses `redirect(302, '/')` and returns `{ user: locals.user }`. The dashboard page reads `data.user` via `$props()`.

**Implications**: Layout load functions (server-only), protected route groups, and how `data` cascades from layout → page are all operational knowledge. `locals.user` as the auth primitive is firmly understood. Future lessons can treat protected routes as a known pattern. Next natural steps: error handling (`+error.svelte`, `handleError`) or advanced data patterns (`invalidate`, `applyAction`).