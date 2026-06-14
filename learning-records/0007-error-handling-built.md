# Error Handling — Built and Working

The user completed lesson 5 and implemented the full error handling pattern: `+error.svelte` at the root (`src/routes/+error.svelte`) using `page.status` and `page.error?.message`; a scoped `(protected)/+error.svelte` with custom styling for dashboard errors; `notes/[id]/+page.server.ts` throwing `error(404, 'Note not found')` when a Prisma lookup returns null; and `handleError` in `hooks.server.ts` logging and sanitizing error messages.

**Evidence**: All four files exist in the project. The `(protected)/+error.svelte` uses SCSS and styled error output. The `handleError` export is in `hooks.server.ts`.

**Implications**: `+error.svelte` hierarchy (scoped vs root), the `error()` throw helper, `page.error` / `page.status`, and `handleError` are all operational knowledge. Next natural step: `invalidate()` and on-demand data refresh (ties directly to the admin image gallery which currently uses `onMount + manual fetch`).
