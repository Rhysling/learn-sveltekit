# hooks.server.ts — Learned and Demonstrated

The user completed all quiz questions and hands-on exercises for the hooks.server.ts lesson. Working implementation in the project: `src/hooks.server.ts` verifies the JWT cookie and sets `event.locals.user` on every request; `src/app.d.ts` types `App.Locals`; `/admin/+page.server.ts` was refactored to read from `locals.user` instead of doing its own cookie/JWT logic.

**Evidence**: All four exercises completed in the real project codebase.

**Implications**: `handle`, `event.locals`, `app.d.ts` typing, and the centralized auth pattern are all operational knowledge. Future lessons can treat `locals.user` as a known primitive. Next natural step: Svelte 5 runes depth ($state, $derived, $effect) or advanced data patterns (layout load functions, invalidation, streaming).
