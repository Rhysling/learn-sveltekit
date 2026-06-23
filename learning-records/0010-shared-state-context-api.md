# Shared State & Context API — Lesson Delivered

The user received lesson 8 covering three patterns for sharing reactive state in Svelte 5: module state (`.svelte.ts` files with `$state` class/object patterns), the Context API (`setContext`/`getContext`/`createContext`), and the decision framework for choosing between them. Legacy writable/readable stores were excluded per user preference — only runes-based patterns were covered.

**Key concepts taught**: `.svelte.ts` file extension requirement for runes, class-based singleton pattern, the "can't export reassignable $state" trap, `$state.raw` for large data, SSR module state isolation risk, all four context functions, `createContext<T>()` (Svelte 5.40+), reactive context via `$state` objects, the "broken link" trap (mutate properties, never reassign), context per-instance scoping vs module singleton.

**Implications**: Module state and context are now in the knowledge base. Exercises guide the user through building a toast notification system (module state), auth context with `createContext` (type-safe context), and a reactive edit-mode toggle (context + `$state`). Completion of exercises will confirm operational understanding. The existing `dummy-store.svelte.ts` in the project was referenced as a prior example.
