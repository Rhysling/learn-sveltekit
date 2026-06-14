# `invalidate` Requires a Universal Load Function to Work Reliably

`invalidate(url)` tracks fetch URL dependencies at the **client** level. When `fetch('/api/images')` runs inside a `+page.server.ts` server load function, the dependency must be serialized from server → client as part of the initial HTML payload, and this handshake can silently fail. `invalidateAll()` bypasses the tracking entirely, which is why it worked while targeted invalidation didn't.

The fix: move any fetch that you'll need to invalidate into a `+page.ts` **universal** load function, where the fetch runs in the browser during client-side re-runs and SvelteKit tracks the URL dependency directly. You can coexist `+page.server.ts` (for auth/secrets/Prisma) and `+page.ts` (for invalidatable fetches) on the same route — SvelteKit merges the `data` from both.

**Evidence**: Admin image gallery broke with `depends('admin:images')` + `invalidate('admin:images')` in `+page.server.ts`. Moved fetch to `+page.ts`, URL-based `invalidate('/api/images')` worked immediately.

**Implications**: The rule going forward — if a load function's data needs to be refreshable client-side, it belongs in `+page.ts`. `+page.server.ts` is for auth guards, environment secrets, and direct Prisma queries where re-running in the browser isn't possible or needed.
