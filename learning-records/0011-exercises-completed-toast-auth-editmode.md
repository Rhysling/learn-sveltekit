# Lesson 8 Exercises Completed

The user completed all three exercises from the shared state / context API lesson:

1. **Toast notification system** — module-state singleton using `$state` class pattern in `src/lib/state/toasts.svelte.ts`. Clean implementation with auto-dismiss via `setTimeout`, immutable array updates, and a global `Toast.svelte` component.

2. **Auth context** — type-safe context using `createContext<AuthTokenPayload>()` in `src/lib/context/auth.ts`.

3. **Edit-mode toggle** — reactive context using `createContext<EditMode>()` in `src/lib/context/edit-mode.ts`, with parent (`+page.svelte`) setting a `$state` object and child (`SubComp.svelte`) reading + toggling it.

**Implications**: The user has operational understanding of both module state (singletons) and the context API (per-component-tree). Both patterns are now implemented in the project and can be referenced in future lessons. Ready for topics that build on shared state — auth flows, database integration, or environment variables.
